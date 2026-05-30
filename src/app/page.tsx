'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Clock, Globe2, Headphones, ChevronRight, Zap, Package, Wrench, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

const SANDVIK_DRIFTERS = [
  { model: 'HL700',  type: 'Underground', rig: 'DT821 / DD series',     weight: '185 kg' },
  { model: 'HL1000', type: 'Underground', rig: 'DD422i / DT1131i',      weight: '240 kg' },
  { model: 'HLX5',   type: 'Surface',     rig: 'Pantera / Leopard DI',  weight: '260 kg' },
  { model: 'RD525',  type: 'Surface',     rig: 'Ranger / Pantera DP',   weight: '195 kg' },
  { model: 'HL500',  type: 'Underground', rig: 'DT series light',       weight: '145 kg' },
  { model: 'RD314',  type: 'Surface',     rig: 'Surface light rigs',    weight: '142 kg' },
];

const EPIROC_DRIFTERS = [
  { model: 'COP1838', type: 'Underground', rig: 'Boomer / ROC D7',      weight: '175 kg' },
  { model: 'COP2560', type: 'Underground', rig: 'Boomer XL / L2D',      weight: '270 kg' },
  { model: 'COP4050', type: 'Surface',     rig: 'ROC D7-11 series',     weight: '380 kg' },
  { model: 'COP1638', type: 'Underground', rig: 'Boomer M2 / L2D',      weight: '160 kg' },
  { model: 'COP3060', type: 'Surface',     rig: 'Large surface rigs',   weight: '295 kg' },
  { model: 'MD20',    type: 'Surface',     rig: 'ROC series surface',   weight: '210 kg' },
];

const ADVANTAGES = [
  { icon: Shield,     titleKey: 'home.adv1Title', descKey: 'home.adv1Desc', color: '#ffc03d', bg: 'rgba(255,192,61,0.1)',   border: 'rgba(255,192,61,0.25)' },
  { icon: Clock,      titleKey: 'home.adv2Title', descKey: 'home.adv2Desc', color: '#10b981', bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.25)' },
  { icon: Globe2,     titleKey: 'home.adv3Title', descKey: 'home.adv3Desc', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',   border: 'rgba(59,130,246,0.25)' },
  { icon: Headphones, titleKey: 'home.adv4Title', descKey: 'home.adv4Desc', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',   border: 'rgba(139,92,246,0.25)' },
];

const STATS = [
  { value: '186+',  label: 'Spare Parts in Catalog', icon: Package },
  { value: '30+',   label: 'Experienced Staff',       icon: Shield },
  { value: '3',     label: 'Countries  TR · CL · GH', icon: Globe2 },
  { value: '400h',  label: 'Overhaul Warranty',       icon: CheckCircle2 },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: 70 }}>

      {/* ═══════════════════════════════════════════════════
          HERO — dark + animated background
      ═══════════════════════════════════════════════════ */}
      <section className="dark-section" style={{
        position: 'relative',
        minHeight: '91vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0b0e18',
      }}>
        {/* Animated glow blobs */}
        <div className="hero-animated-bg" />
        {/* Scan line */}
        <div className="hero-scan" />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,192,61,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,192,61,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        {/* Bottom fade into next section */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, #f0f3f8)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 48, paddingBottom: 80 }}>
          <div style={{ maxWidth: 720 }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,192,61,0.12)',
              border: '1px solid rgba(255,192,61,0.35)',
              borderRadius: 99, padding: '7px 18px',
              marginBottom: 32,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffc03d', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#ffc03d', letterSpacing: '0.14em' }}>
                🇹🇷 TURKEY — WORLDWIDE SHIPPING
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: 28,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>
              {t('home.heroTitle')}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 18, lineHeight: 1.75,
              maxWidth: 580, marginBottom: 42,
              color: 'rgba(255,255,255,0.65)',
            }}>
              {t('home.heroSub')}
            </p>

            {/* Trust bullets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', marginBottom: 40 }}>
              {['OEM-compatible specs', '400h overhaul warranty', '30+ engineers on staff'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  <CheckCircle2 size={14} color="#ffc03d" />
                  {b}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/parts" className="btn btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
                <Package size={18} />
                {t('home.ctaParts')}
                <ArrowRight size={16} />
              </Link>
              <Link href="/drifters" className="btn btn-secondary-light" style={{ fontSize: 15, padding: '13px 28px' }}>
                <Wrench size={18} />
                {t('nav.drifters')}
              </Link>
              <a
                href="https://wa.me/905061208706?text=Hello%2C%20I%20need%20a%20quote%20for%20drifter%20parts."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 6,
                  background: '#25D366', color: '#fff',
                  fontSize: 15, fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                📱 WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS BAR — white card strip
      ═══════════════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        padding: '0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          }}>
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '28px 20px',
                  borderRight: i < STATS.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(255,192,61,0.1)',
                    border: '1px solid rgba(255,192,61,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}>
                    <Icon size={18} color="var(--primary)" />
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--text-main)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BRAND SELECTION — white bg
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '88px 0', background: '#ffffff' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: 'var(--primary)', marginBottom: 12,
              textTransform: 'uppercase',
              padding: '4px 14px',
              background: 'rgba(255,192,61,0.1)',
              border: '1px solid rgba(255,192,61,0.25)',
              borderRadius: 99,
            }}>OEM-Compatible Products</span>
            <h2 style={{ marginBottom: 14, marginTop: 8 }}>{t('home.brandTitle')}</h2>
            <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 16 }}>{t('home.brandSub')}</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>

            {/* Sandvik Card */}
            <ScrollReveal direction="left" className="card" style={{
              position: 'relative', overflow: 'hidden',
              borderTop: '3px solid #ef4444',
              padding: 32,
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 180, height: 180,
                background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(40%, -40%)',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 6, padding: '6px 14px', marginBottom: 20,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em' }}>SANDVIK / TAMROCK</span>
                </div>
                <h3 style={{ marginBottom: 8, fontSize: 20 }}>Sandvik Rock Drills</h3>
                <p style={{ fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
                  HL series underground & RD/HLX surface drifters. Compatible spare parts and complete rebuild units.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {['HL500', 'HL700', 'HL1000', 'HLX5', 'RD520', 'RD525'].map(m => (
                    <span key={m} style={{
                      background: 'rgba(239,68,68,0.07)',
                      border: '1px solid rgba(239,68,68,0.18)',
                      borderRadius: 4, padding: '3px 9px',
                      fontSize: 12, fontWeight: 600, color: '#dc2626',
                    }}>{m}</span>
                  ))}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '3px 4px' }}>+more</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link href="/parts?brand=Sandvik" className="btn btn-sandvik" style={{ fontSize: 13, padding: '9px 18px' }}>
                    Browse Parts
                  </Link>
                  <Link href="/drifters?brand=sandvik" className="btn btn-secondary" style={{ fontSize: 13, padding: '9px 18px' }}>
                    View Drifters
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Epiroc Card */}
            <ScrollReveal delay={120} direction="right" className="card" style={{
              position: 'relative', overflow: 'hidden',
              borderTop: '3px solid #f59e0b',
              padding: 32,
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 180, height: 180,
                background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(40%, -40%)',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  borderRadius: 6, padding: '6px 14px', marginBottom: 20,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#d97706', letterSpacing: '0.06em' }}>EPIROC / ATLAS COPCO</span>
                </div>
                <h3 style={{ marginBottom: 8, fontSize: 20 }}>Epiroc COP Series</h3>
                <p style={{ fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
                  COP series underground Boomer & surface ROC drifters. Fully compatible parts with original OEM specifications.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {['COP1838', 'COP2560', 'COP1638', 'COP4050', 'MD20', 'COP3060'].map(m => (
                    <span key={m} style={{
                      background: 'rgba(245,158,11,0.07)',
                      border: '1px solid rgba(245,158,11,0.18)',
                      borderRadius: 4, padding: '3px 9px',
                      fontSize: 12, fontWeight: 600, color: '#b45309',
                    }}>{m}</span>
                  ))}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '3px 4px' }}>+more</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link href="/parts?brand=Epiroc" className="btn btn-epiroc" style={{ fontSize: 13, padding: '9px 18px' }}>
                    Browse Parts
                  </Link>
                  <Link href="/drifters?brand=epiroc" className="btn btn-secondary" style={{ fontSize: 13, padding: '9px 18px' }}>
                    View Drifters
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED DRIFTERS — light grey bg
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.14em', color: 'var(--primary)',
                marginBottom: 8, textTransform: 'uppercase',
              }}>Complete Rock Drills</span>
              <h2 style={{ marginBottom: 0 }}>Our Drifter Series</h2>
            </div>
            <Link href="/drifters" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 14, fontWeight: 600 }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {/* Sandvik */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              fontSize: 12, fontWeight: 700, color: '#ef4444',
              letterSpacing: '0.06em',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
              SANDVIK
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              {SANDVIK_DRIFTERS.map(d => (
                <Link key={d.model} href={`/drifters?brand=sandvik&model=${d.model}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '16px 18px', cursor: 'pointer' }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>{d.model}</div>
                    <div style={{
                      display: 'inline-block', fontSize: 10, fontWeight: 700,
                      padding: '2px 7px', borderRadius: 4, marginBottom: 8,
                      background: d.type === 'Surface' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)',
                      color: d.type === 'Surface' ? '#3b82f6' : '#8b5cf6',
                    }}>{d.type}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{d.rig}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dark)' }}>{d.weight}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Epiroc */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              fontSize: 12, fontWeight: 700, color: '#d97706',
              letterSpacing: '0.06em',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
              EPIROC / ATLAS COPCO
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              {EPIROC_DRIFTERS.map(d => (
                <Link key={d.model} href={`/drifters?brand=epiroc&model=${d.model}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '16px 18px', cursor: 'pointer' }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>{d.model}</div>
                    <div style={{
                      display: 'inline-block', fontSize: 10, fontWeight: 700,
                      padding: '2px 7px', borderRadius: 4, marginBottom: 8,
                      background: d.type === 'Surface' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)',
                      color: d.type === 'Surface' ? '#3b82f6' : '#8b5cf6',
                    }}>{d.type}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{d.rig}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dark)' }}>{d.weight}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ADVANTAGES — white bg with accent border cards
      ═══════════════════════════════════════════════════ */}
      <section style={{
        padding: '88px 0',
        background: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: 'var(--primary)', marginBottom: 12,
              textTransform: 'uppercase',
              padding: '4px 14px',
              background: 'rgba(255,192,61,0.1)',
              border: '1px solid rgba(255,192,61,0.25)',
              borderRadius: 99,
            }}>Why FED Mining</span>
            <h2 style={{ marginBottom: 14, marginTop: 8 }}>{t('home.advTitle')}</h2>
            <p style={{ maxWidth: 500, margin: '0 auto', fontSize: 16 }}>{t('home.advSub')}</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {ADVANTAGES.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <ScrollReveal key={i} delay={i * 90} className="card" style={{
                  textAlign: 'center',
                  borderTop: `3px solid ${adv.color}`,
                  padding: 28,
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: adv.bg,
                    border: `1px solid ${adv.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    <Icon size={24} color={adv.color} />
                  </div>
                  <h3 style={{ fontSize: 16, marginBottom: 10 }}>{t(adv.titleKey)}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7 }}>{t(adv.descKey)}</p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PART CATEGORIES — light grey bg
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '88px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: 'var(--primary)', marginBottom: 12,
              textTransform: 'uppercase',
              padding: '4px 14px',
              background: 'rgba(255,192,61,0.1)',
              border: '1px solid rgba(255,192,61,0.25)',
              borderRadius: 99,
            }}>Spare Parts Catalog</span>
            <h2 style={{ marginBottom: 14, marginTop: 8 }}>Parts We Supply</h2>
            <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 16 }}>
              All parts manufactured to original specifications with induction-hardened alloy steel.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
            {[
              { name: 'Pistons',          icon: '⚙️',  count: '24 models' },
              { name: 'Seal Kits',        icon: '🔩',  count: '400h / 800h kits' },
              { name: 'Bushings',         icon: '🔧',  count: 'Guide & Chuck' },
              { name: 'Valve Assemblies', icon: '🔌',  count: 'Distributor types' },
              { name: 'Accumulators',     icon: '💡',  count: 'HP & LP types' },
              { name: 'Shank Adapters',   icon: '🔩',  count: 'T38 / T45 / T51' },
              { name: 'Gears & Shafts',   icon: '⚙️',  count: 'Rotation gear sets' },
              { name: 'Hardware',         icon: '🔧',  count: 'Bolts & tension bars' },
            ].map(cat => (
              <Link
                key={cat.name}
                href={`/parts?category=${encodeURIComponent(cat.name.split(' ')[0])}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card" style={{
                  padding: '22px 18px', textAlign: 'center', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cat.count}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/parts" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 34px' }}>
              <Package size={18} />
              Browse All 186+ Parts
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA BANNER — keep dark / navy
      ═══════════════════════════════════════════════════ */}
      <section className="dark-section" style={{
        padding: '88px 0',
        background: 'linear-gradient(135deg, #0d1320 0%, #1a2540 100%)',
        borderTop: '3px solid rgba(255,192,61,0.2)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,192,61,0.1)',
            border: '1px solid rgba(255,192,61,0.3)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 24,
          }}>
            <Zap size={12} color="var(--primary)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em' }}>
              CLIENT PORTAL — MACHINE HOUR TRACKING
            </span>
          </div>

          <h2 style={{ marginBottom: 18, fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', color: '#ffffff' }}>
            Track Your Drifters &amp;<br />Never Miss a 400h Overhaul
          </h2>
          <p style={{ maxWidth: 520, margin: '0 auto 40px', fontSize: 16, color: 'rgba(255,255,255,0.65)' }}>
            Register your machines. We monitor the hours and prepare your overhaul kits before you even need them.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>
              Create Account
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-secondary-light" style={{ fontSize: 15, padding: '14px 30px' }}>
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
