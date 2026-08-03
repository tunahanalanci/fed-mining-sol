'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const isTr = language === 'tr';

  const productRangeLinks = [
    { href: '/product-range-engine-units', label: isTr ? 'Motor Üniteleri' : 'Engine Units' },
    { href: '/parts?category=Gear%20%26%20Shaft', label: isTr ? 'Güç Aktarımı' : 'Powertrain' },
    { href: '/parts?category=Valve', label: isTr ? 'Hidrolik' : 'Hydraulic' },
    { href: '/productrange', label: isTr ? 'Şasi Gövdesi' : 'Frame Body' },
    { href: '/productrange', label: isTr ? 'İş Ekipmanları' : 'Work Equipment' },
    { href: '/productrange', label: isTr ? 'Cam' : 'Glass' },
    { href: '/productrange', label: isTr ? 'Fren' : 'Brake' },
    { href: '/product-range-undercarriage', label: isTr ? 'Soğutma' : 'Cooling' },
    { href: '/product-range-undercarriage', label: isTr ? 'Alt Takım' : 'Undercarriage' },
    { href: '/product-range-drifter', label: isTr ? 'Kaya Delici ve Matkap Parçaları' : 'Drifter and Driller Parts' },
  ];

  return (
    <footer style={{
      background: '#212d45',
      borderTop: '3px solid rgba(255,192,61,0.3)',
      paddingTop: 80,
      paddingBottom: 40,
      color: '#ffffff',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 60, marginBottom: 60 }} className="responsive-footer-grid">

          {/* Column 1: Brand & Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 25 }}>
              <Image
                src="/logo.png"
                alt="FED Mining"
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>FED Mining</div>
                <div style={{ fontSize: 11, color: '#ffc03d', letterSpacing: '0.08em', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  SOLUTIONS &amp; PARTS
                </div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '320px', marginBottom: 25 }}>
              {isTr 
                ? "Türkiye'den dünya geneline OEM uyumlu drifter yedek parçaları. Sandvik ve Epiroc için 400 saatlik revizyon kitleri."
                : "OEM compatible drifter spare parts shipped globally from Turkey. 400-hour overhaul kits for Sandvik and Epiroc."}
            </p>
          </div>

          {/* Column 2: Product Range */}
          <div>
            <h5 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 25,
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {isTr ? 'Ürün Yelpazesi' : 'Product Range'}
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
              {productRangeLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffc03d'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h5 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 25,
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {isTr ? 'Bize Ulaşın' : 'Contact Us'}
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={18} color="#ffc03d" style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  <strong>FED Mining Solutions and Parts</strong><br />
                  Address: Zumrut Mah. 2031 Sok. No:12/3 Denizli/Turkey
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Mail size={18} color="#ffc03d" />
                <a
                  href="mailto:info@fedminingsolutions.com"
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffc03d'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                  info@fedminingsolutions.com
                </a>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Phone size={18} color="#ffc03d" />
                <a
                  href="tel:+905061208706"
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffc03d'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                  +90 506 120 87 06
                </a>
              </div>

              <a
                href="https://wa.me/905061208706"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginTop: 10,
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#128C7E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
              >
                <span>WhatsApp 24/7</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 30,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            Copyright &copy; {new Date().getFullYear()} FED Mining Solutions and Parts
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 15 }}>
            <a
              href="https://www.facebook.com/FedMiningSolutionsandParts/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#557dbc';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="Facebook"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/fedminingsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8a3ab9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="Instagram"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/company/fed-mining-solutions-and-parts"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1c86c6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .responsive-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
