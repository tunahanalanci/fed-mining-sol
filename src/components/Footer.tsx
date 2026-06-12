'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const isTr = language === 'tr';

  return (
    <footer style={{
      background: '#212d45',
      borderTop: '3px solid rgba(255,192,61,0.3)',
      paddingTop: 56,
      paddingBottom: 28,
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Image
                src="/logo.png"
                alt="FED Mining"
                width={44}
                height={44}
                style={{ borderRadius: 8, objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>FED Mining</div>
                <div style={{ fontSize: 10, color: 'var(--primary)', letterSpacing: '0.08em', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  SOLUTIONS &amp; PARTS
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 240, color: 'rgba(255,255,255,0.6)' }}>
              {isTr 
                ? "Türkiye'den dünya geneline OEM uyumlu drifter yedek parçaları. Sandvik ve Epiroc için 400 saatlik revizyon kitleri."
                : "OEM compatible drifter spare parts shipped globally from Turkey. 400-hour overhaul kits for Sandvik and Epiroc."}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a
                href="https://wa.me/905061208706"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: '#25D366', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, textDecoration: 'none',
                }}
                title="WhatsApp"
              >&#128241;</a>
              <a
                href="mailto:Info@FedMiningSolutions.com"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, border: '1px solid rgba(255,255,255,0.15)',
                  textDecoration: 'none',
                }}
                title="Email"
              >&#9993;</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#ffc03d', marginBottom: 16, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              {isTr ? 'Hızlı Bağlantılar' : 'Quick Links'}
            </h4>
            {[
              { href: '/productrange', label: t('nav.productrange') },
              { href: '/parts', label: t('nav.parts') },
              { href: '/drifters', label: t('nav.drifters') },
              { href: '/operations', label: t('nav.operations') },
              { href: '/industries', label: t('nav.industries') },
              { href: '/about', label: t('nav.about') },
              { href: '/contact', label: t('nav.contact') },
              { href: '/dashboard', label: t('nav.dashboard') },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.55)',
                  marginBottom: 8, transition: 'color 0.2s', textDecoration: 'none',
                }}
              >{l.label}</Link>
            ))}
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#ffc03d', marginBottom: 16, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              {isTr ? 'Ürünler' : 'Products'}
            </h4>
            {[
              isTr ? 'Komple Drifterlar' : 'Complete Drifters',
              isTr ? 'Pistonlar ve Silindirler' : 'Pistons & Cylinders',
              isTr ? 'Conta Kitleri (400s / 800s)' : 'Seal Kits (400h / 800h)',
              isTr ? 'Sap Adaptörler' : 'Shank Adapters',
              isTr ? 'Dönüş Motorları' : 'Rotation Motors',
              isTr ? 'Valf Asemblajları' : 'Valve Assemblies',
            ].map(p => (
              <div key={p} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                {p}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#ffc03d', marginBottom: 16, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              {isTr ? 'İletişim' : 'Contact'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={15} color="#ffc03d" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                  Denizli, Turkey
                </span>
              </div>
              <a href="tel:+905061208706" style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                <Phone size={15} color="#ffc03d" />
                +90 506 120 87 06
              </a>
              <a href="mailto:Info@FedMiningSolutions.com" style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                <Mail size={15} color="#ffc03d" />
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
                  marginTop: 4, textDecoration: 'none',
                }}
              >
                WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            &copy; {new Date().getFullYear()} FED Mining Solutions and Parts. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            {isTr ? 'Türkiye — Dünya Geneli Gönderim' : 'Turkey — Worldwide Shipping'}
          </p>
        </div>
      </div>
    </footer>
  );
}
