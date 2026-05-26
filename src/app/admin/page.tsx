'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Users, FileText, AlertTriangle, Plus, RefreshCw, CheckCircle, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Stats {
  totalParts: number;
  totalUsers: number;
  openQuotes: number;
  urgentAlerts: number;
}

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  items: { quantity: number; part: { name: string; partNumber: string } }[];
}

interface DrifterAlert {
  id: string;
  drifterModel: string;
  serialNumber: string;
  currentHours: number;
  user: { companyName: string; email: string; phone: string | null };
}

export default function AdminPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [alerts, setAlerts] = useState<DrifterAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'quotes' | 'parts' | 'alerts'>('quotes');

  // New Part Form
  const [newPart, setNewPart] = useState({
    partNumber: '', name: '', brand: 'Sandvik', category: 'Piston',
    oemReference: '', compatibleDrifters: '', description: '',
  });
  const [partSaving, setPartSaving] = useState(false);
  const [partError, setPartError] = useState('');
  const [partSuccess, setPartSuccess] = useState('');

  useEffect(() => {
    fetch('/api/auth/session')
      .then(r => r.json())
      .then(async d => {
        if (!d.user || d.user.role !== 'admin') {
          router.push('/login');
          return;
        }

        // Fetch stats in parallel
        const [partsRes, quotesRes] = await Promise.all([
          fetch('/api/parts?limit=1'),
          fetch('/api/quotes?limit=50'),
        ]);

        const partsData = await partsRes.json();
        const quotesData = await quotesRes.json();

        setStats({
          totalParts: partsData.pagination?.totalCount || 0,
          totalUsers: 0,
          openQuotes: quotesData.quotes?.filter((q: Quote) => q.status === 'pending').length || 0,
          urgentAlerts: 0,
        });

        setQuotes(quotesData.quotes || []);
        setLoading(false);
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const handleStatusChange = async (quoteId: string, status: string) => {
    await fetch(`/api/quotes/${quoteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setQuotes(prev => prev.map(q => q.id === quoteId ? { ...q, status } : q));
  };

  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartSaving(true); setPartError(''); setPartSuccess('');
    const res = await fetch('/api/parts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPart),
    });
    const data = await res.json();
    setPartSaving(false);
    if (!res.ok) { setPartError(data.error); return; }
    setPartSuccess(`Part "${data.part.name}" added successfully!`);
    setNewPart({ partNumber: '', name: '', brand: 'Sandvik', category: 'Piston', oemReference: '', compatibleDrifters: '', description: '' });
    if (stats) setStats(prev => prev ? { ...prev, totalParts: prev.totalParts + 1 } : null);
  };

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      pending: { bg: 'rgba(245,158,11,0.15)', color: 'var(--warning)' },
      contacted: { bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
      completed: { bg: 'rgba(16,185,129,0.15)', color: 'var(--success)' },
    };
    return map[status] || map.pending;
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: 12 }} />
        <p>Loading Admin Panel...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 86 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '32px 0',
      }}>
        <div className="container">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase' }}>
            Administration
          </p>
          <h1 style={{ fontSize: 24 }}>{t('admin.title')}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>FED Mining Solutions — Backend Management</p>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 20px' }}>
        {/* Stats Cards */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 36 }}>
            {[
              { icon: Package, label: t('admin.totalParts'), value: stats.totalParts, color: 'var(--primary)' },
              { icon: FileText, label: t('admin.openQuotes'), value: stats.openQuotes, color: '#60a5fa' },
              { icon: AlertTriangle, label: 'Pending Quotes', value: quotes.filter(q => q.status === 'pending').length, color: 'var(--warning)' },
              { icon: CheckCircle, label: 'Completed', value: quotes.filter(q => q.status === 'completed').length, color: 'var(--success)' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{s.label}</p>
                      <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                    </div>
                    <div style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: `${s.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color={s.color} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-color)', marginBottom: 28 }}>
          {([
            { key: 'quotes', label: t('admin.quoteList'), icon: FileText },
            { key: 'parts', label: t('admin.partsTitle'), icon: Package },
          ] as const).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 18px', fontSize: 14, fontWeight: 600,
                  borderBottom: activeTab === tab.key ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer', marginBottom: -1,
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quote List Tab */}
        {activeTab === 'quotes' && (
          <div>
            {quotes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)' }}>
                <FileText size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p>No quote requests yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {quotes.map(q => {
                  const { bg, color } = statusBadge(q.status);
                  return (
                    <div key={q.id} className="card" style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                            <h4 style={{ fontSize: 16, margin: 0 }}>{q.name}</h4>
                            <span style={{
                              fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                              background: bg, color,
                            }}>{q.status.toUpperCase()}</span>
                          </div>
                          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                            {q.email} {q.phone && `· ${q.phone}`}
                          </p>
                          {q.message && (
                            <p style={{ fontSize: 13, maxWidth: 500, lineHeight: 1.5 }}>{q.message}</p>
                          )}
                          {q.items && q.items.length > 0 && (
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                              {q.items.slice(0, 4).map((item, i) => (
                                <span key={i} style={{
                                  fontSize: 11, padding: '2px 8px', borderRadius: 4,
                                  background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                                  color: 'var(--text-muted)',
                                }}>
                                  {item.part?.partNumber || 'Part'} ×{item.quantity}
                                </span>
                              ))}
                              {q.items.length > 4 && (
                                <span style={{ fontSize: 11, color: 'var(--text-dark)' }}>+{q.items.length - 4} more</span>
                              )}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, color: 'var(--text-dark)' }}>
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {(['pending', 'contacted', 'completed'] as const).map(s => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(q.id, s)}
                                style={{
                                  fontSize: 11, fontWeight: 600,
                                  padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                                  background: q.status === s ? statusBadge(s).bg : 'transparent',
                                  color: q.status === s ? statusBadge(s).color : 'var(--text-dark)',
                                  border: `1px solid ${q.status === s ? statusBadge(s).color + '40' : 'var(--border-color)'}`,
                                  transition: 'all 0.2s',
                                }}
                              >{s}</button>
                            ))}
                          </div>
                          <a
                            href={`mailto:${q.email}`}
                            style={{
                              fontSize: 11, padding: '4px 10px', borderRadius: 5,
                              background: 'var(--primary)', color: '#0b0f19',
                              fontWeight: 700,
                            }}
                          >✉ Reply</a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Parts Management Tab */}
        {activeTab === 'parts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0 }}>{t('admin.addPart')}</h3>
              <Link href="/parts" className="btn btn-secondary" style={{ fontSize: 13, padding: '8px 14px' }}>
                <Eye size={13} /> View Catalog
              </Link>
            </div>

            <div className="card" style={{ padding: 28 }}>
              {partSuccess && (
                <div style={{
                  padding: '12px 16px', borderRadius: 8, marginBottom: 16,
                  background: 'rgba(16,185,129,0.1)', border: '1px solid var(--success)',
                  color: 'var(--success)', fontSize: 14,
                }}>✅ {partSuccess}</div>
              )}
              {partError && (
                <div style={{
                  padding: '12px 16px', borderRadius: 8, marginBottom: 16,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid var(--danger)',
                  color: 'var(--danger)', fontSize: 14,
                }}>{partError}</div>
              )}

              <form onSubmit={handleAddPart} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { key: 'partNumber', label: t('admin.partNo'), placeholder: '550-312-10', required: true },
                  { key: 'name', label: t('admin.partName'), placeholder: 'PISTON - Type A', required: true },
                  { key: 'oemReference', label: t('admin.oemLabel'), placeholder: 'SAND-154216', required: false },
                  { key: 'compatibleDrifters', label: t('admin.compatLabel'), placeholder: 'HL700, HL1000', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                      {f.label} {f.required && '*'}
                    </label>
                    <input
                      type="text" required={f.required}
                      placeholder={f.placeholder}
                      value={(newPart as any)[f.key]}
                      onChange={e => setNewPart(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{
                        width: '100%', padding: '10px 12px',
                        background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                        borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {t('admin.brandLabel')} *
                  </label>
                  <select
                    value={newPart.brand}
                    onChange={e => setNewPart(p => ({ ...p, brand: e.target.value }))}
                    style={{
                      width: '100%', padding: '10px 12px',
                      background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                      borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                    }}
                  >
                    <option>Sandvik</option>
                    <option>Epiroc</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {t('admin.catLabel')} *
                  </label>
                  <select
                    value={newPart.category}
                    onChange={e => setNewPart(p => ({ ...p, category: e.target.value }))}
                    style={{
                      width: '100%', padding: '10px 12px',
                      background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                      borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                    }}
                  >
                    {['Piston', 'Seal Kit', 'Bushing', 'Valve', 'Accumulator', 'Shank Adapter', 'Gear & Shaft', 'Hardware'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {t('admin.descLabel')}
                  </label>
                  <textarea
                    rows={2}
                    value={newPart.description}
                    onChange={e => setNewPart(p => ({ ...p, description: e.target.value }))}
                    style={{
                      width: '100%', padding: '10px 12px',
                      background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                      borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <button type="submit" disabled={partSaving} className="btn btn-primary" style={{ padding: '12px 24px' }}>
                    <Plus size={15} />
                    {partSaving ? t('general.loading') : t('admin.savePart')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
