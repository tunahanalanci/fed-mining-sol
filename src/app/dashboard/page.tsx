'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Clock, AlertTriangle, CheckCircle, XCircle, Package, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface User {
  id: string;
  email: string;
  companyName: string;
  contactPerson: string;
  role: string;
}

interface Drifter {
  id: string;
  drifterModel: string;
  serialNumber: string;
  currentHours: number;
  averageWeeklyHours: number;
  lastOverhaulHours: number;
  lastUpdatedAt: string;
}

const DRIFTER_MODELS = [
  'COP1132', 'COP1238', 'COP1638', 'COP1838', 'COP1840',
  'COP2150', 'COP2550', 'COP2160', 'COP2560', 'MD20', 'COP3060', 'COP4050',
  'HL500', 'HL600', 'HL700', 'HL800', 'HL1000', 'HL1500', 'HLX5', 'RD520', 'RD525', 'RD314',
];

function getStatus(current: number, lastOverhaul: number) {
  const hoursSince = current - lastOverhaul;
  if (hoursSince >= 400) return 'urgent';
  if (hoursSince >= 360) return 'warning';
  return 'safe';
}

function hoursUntilService(current: number, lastOverhaul: number) {
  const hoursSince = current - lastOverhaul;
  return Math.max(0, 400 - hoursSince);
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [drifters, setDrifters] = useState<Drifter[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState<string | null>(null);
  const [newHours, setNewHours] = useState('');

  const [newDrifter, setNewDrifter] = useState({
    drifterModel: 'COP1838',
    serialNumber: '',
    currentHours: '',
    averageWeeklyHours: '',
  });

  useEffect(() => {
    fetch('/api/auth/session')
      .then(r => r.json())
      .then(d => {
        if (!d.user) { router.push('/login'); return; }
        setUser(d.user);
        return fetch('/api/drifters');
      })
      .then(r => r?.json())
      .then(d => {
        setDrifters(d?.drifters || []);
        setLoading(false);
      })
      .catch(() => { router.push('/login'); });
  }, [router]);

  const handleAddDrifter = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/drifters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        drifterModel: newDrifter.drifterModel,
        serialNumber: newDrifter.serialNumber,
        currentHours: parseFloat(newDrifter.currentHours) || 0,
        averageWeeklyHours: parseFloat(newDrifter.averageWeeklyHours) || 0,
      }),
    });
    if (res.ok) {
      const d = await res.json();
      setDrifters(prev => [d.drifter, ...prev]);
      setAddOpen(false);
      setNewDrifter({ drifterModel: 'COP1838', serialNumber: '', currentHours: '', averageWeeklyHours: '' });
    }
  };

  const handleUpdateHours = async (id: string) => {
    const res = await fetch(`/api/drifters/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentHours: parseFloat(newHours) }),
    });
    if (res.ok) {
      const d = await res.json();
      setDrifters(prev => prev.map(dr => dr.id === id ? d.drifter : dr));
      setUpdateOpen(null);
      setNewHours('');
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: 12 }} />
        <p>{t('general.loading')}</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const urgentCount = drifters.filter(d => getStatus(d.currentHours, d.lastOverhaulHours) === 'urgent').length;
  const warningCount = drifters.filter(d => getStatus(d.currentHours, d.lastOverhaulHours) === 'warning').length;

  return (
    <div style={{ paddingTop: 120 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '32px 0',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase' }}>
                {t('dash.title')}
              </p>
              <h1 style={{ fontSize: 24 }}>{t('dash.welcome')} {user?.contactPerson}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{user?.companyName}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/parts" className="btn btn-secondary" style={{ fontSize: 13, padding: '9px 16px' }}>
                <Package size={14} /> Browse Parts
              </Link>
              <button
                onClick={() => setAddOpen(true)}
                className="btn btn-primary"
                style={{ fontSize: 13, padding: '9px 16px' }}
              >
                <Plus size={14} /> {t('dash.addDrifter')}
              </button>
            </div>
          </div>

          {/* Alert Bar */}
          {(urgentCount > 0 || warningCount > 0) && (
            <div style={{
              marginTop: 20, padding: '12px 16px', borderRadius: 8,
              background: urgentCount > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)',
              border: `1px solid ${urgentCount > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 14,
              color: urgentCount > 0 ? 'var(--danger)' : 'var(--warning)',
            }}>
              <AlertTriangle size={16} />
              {urgentCount > 0
                ? `⚠️ ${urgentCount} drifter(s) are OVERDUE for 400h maintenance!`
                : `${warningCount} drifter(s) are approaching 400h service interval.`
              }
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '32px 20px' }}>
        {/* Drifters */}
        <h2 style={{ marginBottom: 20, fontSize: 18 }}>{t('dash.activeDrifters')} ({drifters.length})</h2>

        {drifters.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 48,
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: 12, marginBottom: 32,
          }}>
            <Clock size={36} style={{ color: 'var(--text-dark)', marginBottom: 12 }} />
            <p style={{ marginBottom: 16 }}>{t('dash.noDrifters')}</p>
            <button onClick={() => setAddOpen(true)} className="btn btn-primary">
              <Plus size={14} /> {t('dash.addDrifter')}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 40 }}>
            {drifters.map(d => {
              const status = getStatus(d.currentHours, d.lastOverhaulHours);
              const remaining = hoursUntilService(d.currentHours, d.lastOverhaulHours);
              const hoursSince = d.currentHours - d.lastOverhaulHours;
              const pct = Math.min(100, (hoursSince / 400) * 100);

              const statusColor = status === 'urgent' ? 'var(--danger)' : status === 'warning' ? 'var(--warning)' : 'var(--success)';
              const statusBg = status === 'urgent' ? 'rgba(239,68,68,0.1)' : status === 'warning' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)';
              const statusLabel = status === 'urgent' ? t('dash.statusUrgent') : status === 'warning' ? t('dash.statusWarning') : t('dash.statusSafe');
              const StatusIcon = status === 'urgent' ? XCircle : status === 'warning' ? AlertTriangle : CheckCircle;

              return (
                <div key={d.id} className="card" style={{ borderColor: status !== 'safe' ? `${statusColor}30` : undefined }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 20, marginBottom: 2 }}>{d.drifterModel}</h3>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>S/N: {d.serialNumber}</p>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99,
                      background: statusBg, color: statusColor,
                    }}>
                      <StatusIcon size={12} />
                      {status === 'safe' ? 'OK' : status === 'warning' ? 'WARN' : 'URGENT'}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                      <span style={{ color: 'var(--text-muted)' }}>Since last overhaul: {hoursSince.toFixed(0)}h / 400h</span>
                      <span style={{ color: statusColor }}>{pct.toFixed(0)}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--bg-main)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        width: `${pct}%`,
                        background: statusColor,
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                    {[
                      { label: 'Total Hours', value: `${d.currentHours.toFixed(0)}h` },
                      { label: 'Avg/Week', value: `${d.averageWeeklyHours.toFixed(0)}h` },
                      { label: t('dash.nextDue'), value: remaining === 0 ? 'NOW' : `${remaining.toFixed(0)}h` },
                      { label: t('dash.status'), value: statusLabel.split('(')[0].trim() },
                    ].map(s => (
                      <div key={s.label} style={{
                        background: 'var(--bg-main)', borderRadius: 6,
                        padding: '8px 10px', fontSize: 11,
                      }}>
                        <div style={{ color: 'var(--text-dark)', marginBottom: 2 }}>{s.label}</div>
                        <div style={{ color: 'var(--text-white)', fontWeight: 700 }}>{s.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    {updateOpen === d.id ? (
                      <div style={{ flex: 1, display: 'flex', gap: 6 }}>
                        <input
                          type="number"
                          placeholder="New hours"
                          value={newHours}
                          onChange={e => setNewHours(e.target.value)}
                          style={{
                            flex: 1, padding: '8px 10px',
                            background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                            borderRadius: 6, fontSize: 13, color: 'var(--text-main)',
                          }}
                        />
                        <button onClick={() => handleUpdateHours(d.id)} className="btn btn-primary" style={{ padding: '8px 12px', fontSize: 12 }}>
                          Save
                        </button>
                        <button onClick={() => setUpdateOpen(null)} className="btn btn-secondary" style={{ padding: '8px 10px' }}>✕</button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => { setUpdateOpen(d.id); setNewHours(String(d.currentHours)); }}
                          className="btn btn-secondary"
                          style={{ flex: 1, fontSize: 12, padding: '9px' }}
                        >
                          <RefreshCw size={12} /> {t('dash.updateHours')}
                        </button>
                        <Link
                          href={`/parts?compatibility=${d.drifterModel}`}
                          className="btn btn-primary"
                          style={{ flex: 1, fontSize: 12, padding: '9px', justifyContent: 'center' }}
                        >
                          <Package size={12} /> {t('dash.preorderKit')}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Drifter Modal */}
      {addOpen && (
        <>
          <div onClick={() => setAddOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000 }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(480px, 95vw)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 16, padding: 32, zIndex: 2001,
          }}>
            <h3 style={{ marginBottom: 20 }}>{t('dash.addDrifter')}</h3>
            <form onSubmit={handleAddDrifter} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  {t('dash.model')}
                </label>
                <select
                  value={newDrifter.drifterModel}
                  onChange={e => setNewDrifter(p => ({ ...p, drifterModel: e.target.value }))}
                  style={{
                    width: '100%', padding: '10px 12px',
                    background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                    borderRadius: 7, fontSize: 14, color: 'var(--text-main)',
                  }}
                >
                  {DRIFTER_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              {[
                { key: 'serialNumber', label: t('dash.serial'), placeholder: 'EP-1838-2024-001', type: 'text' },
                { key: 'currentHours', label: t('dash.currentHours'), placeholder: '250', type: 'number' },
                { key: 'averageWeeklyHours', label: t('dash.weeklyHours'), placeholder: '40', type: 'number' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type} required
                    placeholder={f.placeholder}
                    value={(newDrifter as any)[f.key]}
                    onChange={e => setNewDrifter(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: '100%', padding: '10px 12px',
                      background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                      borderRadius: 7, fontSize: 14, color: 'var(--text-main)',
                    }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="button" onClick={() => setAddOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <Plus size={14} /> {t('dash.saveBtn')}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
