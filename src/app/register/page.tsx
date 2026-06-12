'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [form, setForm] = useState({
    companyName: '', contactPerson: '',
    email: '', phone: '', password: '', confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: form.companyName,
        contactPerson: form.contactPerson,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Registration failed.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  const update = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '134px 20px 40px',
      background: 'radial-gradient(circle at 50% 40%, rgba(255,192,61,0.05) 0%, transparent 60%)',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{
              width: 48, height: 48, background: 'var(--primary)', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 16, color: '#0b0f19',
            }}>FED</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-white)' }}>FED Mining</div>
              <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.06em' }}>SOLUTIONS & PARTS</div>
            </div>
          </Link>
        </div>

        <div className="card" style={{ padding: 36 }}>
          <h2 style={{ marginBottom: 6, fontSize: 20 }}>{t('auth.registerTitle')}</h2>
          <p style={{ fontSize: 13, marginBottom: 28 }}>
            Register to track your drifters and receive 400h maintenance alerts.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  {t('auth.companyName')} *
                </label>
                <input
                  type="text" required
                  value={form.companyName}
                  onChange={e => update('companyName', e.target.value)}
                  placeholder="Mining Corp Ltd."
                  style={{
                    width: '100%', padding: '10px 12px',
                    background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                    borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  {t('auth.contactPerson')} *
                </label>
                <input
                  type="text" required
                  value={form.contactPerson}
                  onChange={e => update('contactPerson', e.target.value)}
                  placeholder="John Smith"
                  style={{
                    width: '100%', padding: '10px 12px',
                    background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                    borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                {t('auth.email')} *
              </label>
              <input
                type="email" required
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="contact@company.com"
                style={{
                  width: '100%', padding: '10px 12px',
                  background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                  borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                {t('auth.phone')}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="+1 234 567 8900"
                style={{
                  width: '100%', padding: '10px 12px',
                  background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                  borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  {t('auth.password')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'} required
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    placeholder="Min. 6 characters"
                    style={{
                      width: '100%', padding: '10px 36px 10px 12px',
                      background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                      borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                    }}
                  />
                  <button
                    type="button" onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                  Confirm Password *
                </label>
                <input
                  type={showPass ? 'text' : 'password'} required
                  value={form.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  style={{
                    width: '100%', padding: '10px 12px',
                    background: 'var(--bg-main)', border: '1px solid var(--border-color)',
                    borderRadius: 7, fontSize: 13, color: 'var(--text-main)',
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{
                padding: '10px 14px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 6, fontSize: 13, color: 'var(--danger)',
              }}>{error}</div>
            )}

            <button
              type="submit" disabled={loading}
              className="btn btn-primary"
              style={{ padding: '13px', fontSize: 15, marginTop: 4 }}
            >
              <UserPlus size={16} />
              {loading ? t('general.loading') : t('auth.registerBtn')}
            </button>
          </form>

          <div style={{
            marginTop: 24, paddingTop: 20,
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center', fontSize: 14,
          }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('auth.hasAccount')} </span>
            <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              {t('auth.loginBtn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
