'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Globe, LogIn, LayoutDashboard, Shield, LogOut, Phone, Mail, ChevronDown } from 'lucide-react';
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

  const isTransparent = pathname === '/';

  const navbarBg = isTransparent && !scrolled ? 'transparent' : 'rgba(255, 255, 255, 0.97)';
  const navbarBorder = isTransparent && !scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid var(--border-color)';
  const logoTextColor = isTransparent && !scrolled ? '#ffffff' : 'var(--text-main)';
  const navLinkColor = isTransparent && !scrolled ? 'rgba(255, 255, 255, 0.9)' : '#4b4f58';
  const navLinkActiveBg = isTransparent && !scrolled ? 'rgba(255, 192, 61, 0.25)' : 'rgba(255, 192, 61, 0.12)';
  const controlBtnBorder = isTransparent && !scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border-color)';
  const controlBtnColor = isTransparent && !scrolled ? 'rgba(255, 255, 255, 0.9)' : 'var(--text-muted)';

  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const isDropdownActive = (items: { href: string }[]) => {
    return items.some(item => {
      const [path] = item.href.split('?');
      return pathname === path;
    });
  };

  const menuStructure: Array<
    | { type: 'link'; href: string; label: string }
    | { type: 'dropdown'; id: string; label: string; items: Array<{ href: string; label: string }> }
  > = [
    {
      type: 'dropdown',
      id: 'product-range',
      label: t('nav.productrange'),
      items: [
        { href: '/drifters', label: t('nav.drifters') },
        { href: '/productrange', label: t('nav.machinespareparts') },
        { href: '/parts?category=Shank%20Adapter', label: t('nav.drilling') },
        { href: '/parts?category=Valve', label: t('nav.hyraulicbreaker') },
      ]
    },
    {
      type: 'dropdown',
      id: 'services',
      label: t('nav.services'),
      items: [
        { href: '/operations', label: t('nav.driftertestbench') },
        { href: '/about', label: t('nav.mobileconteiner') },
        { href: language === 'tr' ? 'https://www.persotr.com' : 'https://www.persotr.com/en/', label: t('nav.software') },
      ]
    },
    { type: 'link', href: '/parts', label: t('nav.parts') },
    {
      type: 'dropdown',
      id: 'contact-dropdown',
      label: t('nav.contact'),
      items: [
        { href: '/contact', label: t('nav.contact') },
        { href: '/about', label: t('nav.about') },
      ]
    },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>

      {/* Top Info Bar — WordPress kurumsal site kimliginden esinlendi */}
      <div style={{
        background: '#212d45',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '6px 0',
        display: scrolled ? 'none' : 'block',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%', maxWidth: '95%', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="tel:+905061208706" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 400, textDecoration: 'none' }}>
              <Phone size={11} color="#ffc03d" />
              +90 506 120 87 06
            </a>
            <a href="mailto:Info@FedMiningSolutions.com" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 400, textDecoration: 'none' }} className="desktop-nav">
              <Mail size={11} color="#ffc03d" />
              Info@FedMiningSolutions.com
            </a>
          </div>
          <div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
              {language === 'tr' ? 'Türkiye — Dünya Geneli Gönderim' : 'Turkey — Worldwide Shipping'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav style={{
        height: '70px',
        background: navbarBg,
        backdropFilter: isTransparent && !scrolled ? 'none' : 'blur(16px)',
        borderBottom: navbarBorder,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '95%', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '16px', paddingRight: '16px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Image
              src="/logo.png"
              alt="FED Mining Solutions and Parts"
              width={44}
              height={44}
              style={{ borderRadius: 6, objectFit: 'contain' }}
              priority
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: logoTextColor, lineHeight: 1.1, fontFamily: 'var(--font-heading)', transition: 'color 0.3s ease' }}>
                FED Mining
              </div>
              <div style={{ fontSize: 10, color: 'var(--primary)', letterSpacing: '0.08em', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                SOLUTIONS &amp; PARTS
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {menuStructure.map(item => {
              if (item.type === 'link') {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: 'var(--font-heading)',
                      color: isActive ? 'var(--primary)' : navLinkColor,
                      background: isActive ? navLinkActiveBg : 'transparent',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              }

              // Dropdown
              const isDropdownOpen = hoveredDropdown === item.id;
              const isActive = isDropdownActive(item.items);

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredDropdown(item.id)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                  style={{ position: 'relative', padding: '10px 0' }}
                >
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: 'var(--font-heading)',
                      color: isActive ? 'var(--primary)' : navLinkColor,
                      background: isActive ? navLinkActiveBg : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>

                  {/* Dropdown Menu Container */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#ffffff',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                      padding: '8px 0',
                      minWidth: '220px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      zIndex: 100,
                      opacity: isDropdownOpen ? 1 : 0,
                      transform: isDropdownOpen ? 'translateY(0)' : 'translateY(8px)',
                      pointerEvents: isDropdownOpen ? 'auto' : 'none',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    {item.items.map(subItem => {
                      const isExternal = subItem.href.startsWith('http');
                      const isSubActive = !isExternal && pathname === subItem.href.split('?')[0];
                      const Tag = isExternal ? 'a' : Link;
                      const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
                      return (
                        <Tag
                          key={subItem.href}
                          href={subItem.href}
                          {...extraProps}
                          style={{
                            padding: '10px 16px',
                            fontSize: 13,
                            fontWeight: 500,
                            color: isSubActive ? 'var(--primary)' : '#212d45',
                            background: isSubActive ? 'rgba(255, 192, 61, 0.08)' : 'transparent',
                            transition: 'all 0.15s ease',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 192, 61, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isSubActive ? 'rgba(255, 192, 61, 0.08)' : 'transparent';
                          }}
                        >
                          {subItem.label}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 10px', borderRadius: 6,
                border: controlBtnBorder,
                fontSize: 12, fontWeight: 600,
                color: controlBtnColor,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: 'transparent',
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
                border: controlBtnBorder,
                color: basketCount > 0 ? 'var(--primary)' : controlBtnColor,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: 'transparent',
              }}
            >
              <ShoppingCart size={16} />
              {basketCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  background: 'var(--primary)', color: '#212d45',
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
                    fontSize: 12, color: controlBtnColor,
                    border: controlBtnBorder,
                    cursor: 'pointer',
                    background: 'transparent',
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
                borderRadius: 6, border: controlBtnBorder,
                color: logoTextColor, cursor: 'pointer',
                background: 'transparent',
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
            background: 'rgba(255,255,255,0.99)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            padding: '12px 20px 20px',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto',
          }}>
            {menuStructure.map(item => {
              if (item.type === 'link') {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block', padding: '12px 0',
                      borderBottom: '1px solid var(--border-color)',
                      fontSize: 15, fontWeight: 600,
                      fontFamily: 'var(--font-heading)',
                      color: isActive ? 'var(--primary)' : '#4b4f58',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              } else {
                const isSubOpen = mobileDropdownOpen === item.id;
                const isActive = isDropdownActive(item.items);
                return (
                  <div key={item.id} style={{ borderBottom: '1px solid var(--border-color)', padding: '12px 0' }}>
                    <button
                      onClick={() => setMobileDropdownOpen(isSubOpen ? null : item.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', background: 'none', border: 'none', padding: 0,
                        fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-heading)',
                        color: isActive ? 'var(--primary)' : '#4b4f58', cursor: 'pointer',
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={16} style={{
                        transform: isSubOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s ease',
                        color: '#4b4f58',
                      }} />
                    </button>
                    {isSubOpen && (
                      <div style={{ paddingLeft: 12, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {item.items.map(subItem => {
                          const isExternal = subItem.href.startsWith('http');
                          const isSubActive = !isExternal && pathname === subItem.href.split('?')[0];
                          const Tag = isExternal ? 'a' : Link;
                          const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
                          return (
                            <Tag
                              key={subItem.href}
                              href={subItem.href}
                              {...extraProps}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: 'block', padding: '8px 0',
                                fontSize: 14, fontWeight: 500,
                                color: isSubActive ? 'var(--primary)' : 'var(--text-muted)',
                                textDecoration: 'none',
                              }}
                            >
                              {subItem.label}
                            </Tag>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
            })}
            {user && (
              <Link
                href={user.role === 'admin' ? '/admin' : '/dashboard'}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '12px 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: 15, fontWeight: 600,
                  color: 'var(--primary)',
                }}
              >
                {user.role === 'admin' ? t('nav.admin') : t('nav.dashboard')}
              </Link>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}
