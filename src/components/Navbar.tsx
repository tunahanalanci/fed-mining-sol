'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Globe, LogIn, LayoutDashboard, Shield, LogOut } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useQuote } from '@/context/QuoteContext';

interface SessionUser {
  id: string;
  email: string;
  companyName: string;
  contactPerson: string;
  role: string;
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { basket, setIsBasketOpen } = useQuote();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(r => r.json())
      .then(d => setUser(d.user || null))
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };

  const basketCount = basket.reduce((s, i) => s + i.quantity, 0);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/parts', label: t('nav.parts') },
    { href: '/drifters', label: t('nav.drifters') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '70px',
        background: scrolled
          ? 'rgba(11, 15, 25, 0.96)'
          : 'rgba(11, 15, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255,192,61,0.15)' : '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 40, height: 40, background: 'var(--primary)', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 14, color: '#0b0f19', letterSpacing: '-0.5px'
          }}>FED</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-white)', lineHeight: 1.1 }}>
              FED Mining
            </div>
            <div style={{ fontSize: 10, color: 'var(--primary)', letterSpacing: '0.08em', fontWeight: 600 }}>
              SOLUTIONS & PARTS
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '7px 14px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                color: pathname === link.href ? 'var(--primary)' : 'var(--text-muted)',
                background: pathname === link.href ? 'rgba(255,192,61,0.1)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 10px', borderRadius: 6,
              border: '1px solid var(--border-color)',
              fontSize: 12, fontWeight: 600,
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Globe size={13} />
            {language === 'tr' ? 'TR' : 'EN'}
          </button>

          {/* Quote Basket */}
          <button
            onClick={() => setIsBasketOpen(true)}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 38, height: 38, borderRadius: 8,
              border: '1px solid var(--border-color)',
              color: basketCount > 0 ? 'var(--primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ShoppingCart size={16} />
            {basketCount > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                background: 'var(--primary)', color: '#0b0f19',
                width: 17, height: 17, borderRadius: '50%',
                fontSize: 9, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{basketCount}</span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Link
                href={user.role === 'admin' ? '/admin' : '/dashboard'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 12px', borderRadius: 6,
                  fontSize: 13, fontWeight: 600,
                  color: 'var(--primary)',
                  border: '1px solid rgba(255,192,61,0.3)',
                }}
              >
                {user.role === 'admin' ? <Shield size={14} /> : <LayoutDashboard size={14} />}
                <span className="desktop-nav">{user.role === 'admin' ? t('nav.admin') : t('nav.dashboard')}</span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '7px 10px', borderRadius: 6,
                  fontSize: 12, color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn btn-primary"
              style={{ padding: '7px 16px', fontSize: 13, gap: 6, borderRadius: 6 }}
            >
              <LogIn size={14} />
              <span className="desktop-nav">{t('nav.login')}</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 6, border: '1px solid var(--border-color)',
              color: 'var(--text-main)', cursor: 'pointer',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: 70, left: 0, right: 0,
          background: 'rgba(11, 15, 25, 0.98)',
          borderBottom: '1px solid var(--border-color)',
          padding: '12px 20px 20px',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '12px 0',
                borderBottom: '1px solid var(--border-color)',
                fontSize: 15, fontWeight: 500,
                color: pathname === link.href ? 'var(--primary)' : 'var(--text-main)',
              }}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href={user.role === 'admin' ? '/admin' : '/dashboard'}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '12px 0',
                borderBottom: '1px solid var(--border-color)',
                fontSize: 15, fontWeight: 500,
                color: 'var(--primary)',
              }}
            >
              {user.role === 'admin' ? t('nav.admin') : t('nav.dashboard')}
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
