'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Login failed. Please check your credentials.');
      return;
    }

    router.push(data.user?.role === 'admin' ? '/admin' : '/dashboard');
    router.refresh();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 20px 40px',
      background: 'radial-gradient(circle at 50% 40%, rgba(255,192,61,0.05) 0%, transparent 60%)',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
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
          <h2 style={{ marginBottom: 6, fontSize: 20 }}>{t('auth.loginTitle')}</h2>
          <p style={{ fontSize: 13, marginBottom: 28 }}>{t('auth.loginSub')}</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                {t('auth.email')}
              </label>
              <input
                type="email" required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  width: '100%', padding: '11px 14px',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8, fontSize: 14,
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                {t('auth.password')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '11px 42px 11px 14px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8, fontSize: 14,
                    color: 'var(--text-main)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)', cursor: 'pointer',
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '10px 14px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 6, fontSize: 13,
                color: 'var(--danger)',
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: '13px', fontSize: 15, marginTop: 4 }}
            >
              <LogIn size={16} />
              {loading ? t('general.loading') : t('auth.loginBtn')}
            </button>
          </form>

          <div style={{
            marginTop: 24, paddingTop: 20,
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center', fontSize: 14,
          }}>
            <span style={{ color: 'var(--text-muted)' }}>{t('auth.noAccount')} </span>
            <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              {t('nav.register')}
            </Link>
          </div>
        </div>

        {/* Demo Info */}
        <div style={{
          marginTop: 16, padding: '14px 16px',
          background: 'rgba(255,192,61,0.06)',
          border: '1px solid rgba(255,192,61,0.15)',
          borderRadius: 8, fontSize: 12,
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}>
          <strong style={{ color: 'var(--primary)' }}>Demo:</strong> admin@fedmining.com / admin123 · customer@miningco.com / customer123
        </div>
      </div>
    </div>
  );
}
