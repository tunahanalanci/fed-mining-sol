'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      paddingTop: 48,
      paddingBottom: 24,
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, background: 'var(--primary)', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 15, color: '#0b0f19',
              }}>FED</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-white)' }}>FED Mining</div>
                <div style={{ fontSize: 10, color: 'var(--primary)', letterSpacing: '0.08em', fontWeight: 600 }}>
                  SOLUTIONS & PARTS
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 240 }}>
              {t('home.heroSub').substring(0, 100)}...
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a
                href="https://wa.me/905061208706"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: '#25D366', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}
                title="WhatsApp"
              >📱</a>
              <a
                href="mailto:Info@FedMiningSolutions.com"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'var(--secondary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, border: '1px solid var(--border-color)',
                }}
                title="Email"
              >✉️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-white)', marginBottom: 16, textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            {[
              { href: '/parts', label: t('nav.parts') },
              { href: '/drifters', label: t('nav.drifters') },
              { href: '/about', label: t('nav.about') },
              { href: '/contact', label: t('nav.contact') },
              { href: '/dashboard', label: t('nav.dashboard') },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: 'block', fontSize: 14, color: 'var(--text-muted)',
                  marginBottom: 8, transition: 'color 0.2s',
                }}
              >{l.label}</Link>
            ))}
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-white)', marginBottom: 16, textTransform: 'uppercase' }}>
              Products
            </h4>
            {[
              'Complete Drifters',
              'Pistons & Cylinders',
              'Seal Kits (400h / 800h)',
              'Shank Adapters',
              'Rotation Motors',
              'Valve Assemblies',
            ].map(p => (
              <div key={p} style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>
                {p}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-white)', marginBottom: 16, textTransform: 'uppercase' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={15} color="var(--primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Turkey
                </span>
              </div>
              <a href="tel:+905061208706" style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                <Phone size={15} color="var(--primary)" />
                +90 506 120 87 06
              </a>
              <a href="mailto:Info@FedMiningSolutions.com" style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                <Mail size={15} color="var(--primary)" />
                Info@FedMiningSolutions.com
              </a>
              <a
                href="https://wa.me/905061208706"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#25D366', color: '#fff',
                  padding: '8px 16px', borderRadius: 6,
                  fontSize: 13, fontWeight: 600,
                  marginTop: 4,
                }}
              >
                WhatsApp 24/7 Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: 12, color: 'var(--text-dark)' }}>
            © {new Date().getFullYear()} FED Mining Solutions and Parts (FED MADENCİLİK MAKİNA İTH. İHR. SAN. TİC. LTD.). All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-dark)' }}>
            Turkey — Worldwide Shipping
          </p>
        </div>
      </div>
    </footer>
  );
}
