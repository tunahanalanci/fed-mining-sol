'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Clock, Globe2, Headphones, ChevronRight, Zap, Package, Wrench } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

const SANDVIK_DRIFTERS = [
  { model: 'HL700', type: 'Underground', rig: 'DT821 / DD series', weight: '185 kg' },
  { model: 'HL1000', type: 'Underground', rig: 'DD422i / DT1131i', weight: '240 kg' },
  { model: 'HLX5', type: 'Surface', rig: 'Pantera / Leopard DI', weight: '260 kg' },
  { model: 'RD525', type: 'Surface', rig: 'Ranger / Pantera DP', weight: '195 kg' },
  { model: 'HL500', type: 'Underground', rig: 'DT series light', weight: '145 kg' },
  { model: 'RD314', type: 'Surface', rig: 'Surface light rigs', weight: '142 kg' },
];

const EPIROC_DRIFTERS = [
  { model: 'COP1838', type: 'Underground', rig: 'Boomer / ROC D7', weight: '175 kg' },
  { model: 'COP2560', type: 'Underground', rig: 'Boomer XL / L2D', weight: '270 kg' },
  { model: 'COP4050', type: 'Surface', rig: 'ROC D7-11 series', weight: '380 kg' },
  { model: 'COP1638', type: 'Underground', rig: 'Boomer M2 / L2D', weight: '160 kg' },
  { model: 'COP3060', type: 'Surface', rig: 'Large surface rigs', weight: '295 kg' },
  { model: 'MD20', type: 'Surface', rig: 'ROC series surface', weight: '210 kg' },
];

const ADVANTAGES = [
  {
    icon: Shield,
    titleKey: 'home.adv1Title',
    descKey: 'home.adv1Desc',
    color: 'var(--primary)',
  },
  {
    icon: Clock,
    titleKey: 'home.adv2Title',
    descKey: 'home.adv2Desc',
    color: '#10b981',
  },
  {
    icon: Globe2,
    titleKey: 'home.adv3Title',
    descKey: 'home.adv3Desc',
    color: '#60a5fa',
  },
  {
    icon: Headphones,
    titleKey: 'home.adv4Title',
    descKey: 'home.adv4Desc',
    color: '#a78bfa',
  },
];

const STATS = [
  { value: '186+', label: 'Spare Parts in Catalog' },
  { value: '30+', label: 'Experienced Staff' },
  { value: '3', label: 'Countries (TR · CL · GH)' },
  { value: '400h', label: 'Overhaul Warranty' },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: 70 }}>
      {/* ─── HERO ─── */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--bg-main) 0%, #0d1424 60%, #0f1929 100%)',
      }}>
        {/* Animated background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,192,61,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,192,61,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '20%', right: '-10%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(255,192,61,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ maxWidth: 700 }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,192,61,0.1)',
              border: '1px solid rgba(255,192,61,0.3)',
              borderRadius: 99, padding: '6px 16px',
              marginBottom: 28,
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.12em' }}>
                🇹🇷 TURKEY — WORLDWIDE SHIPPING
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.6rem)',
              fontWeight: 900, lineHeight: 1.1,
              marginBottom: 24,
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,192,61,0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {t('home.heroTitle')}
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 580, marginBottom: 36, color: 'var(--text-muted)' }}>
              {t('home.heroSub')}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/parts" className="btn btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
                <Package size={18} />
                {t('home.ctaParts')}
                <ArrowRight size={16} />
              </Link>
              <Link href="/drifters" className="btn btn-secondary" style={{ fontSize: 15, padding: '13px 28px' }}>
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

      {/* ─── STATS BAR ─── */}
      <section style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '24px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 0,
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '12px 20px',
                borderRight: i < STATS.length - 1 ? '1px solid var(--border-color)' : 'none',
              }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--primary)' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND SELECTION ─── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase' }}>
              OEM-Compatible Products
            </p>
            <h2 style={{ marginBottom: 12 }}>{t('home.brandTitle')}</h2>
            <p style={{ maxWidth: 520, margin: '0 auto' }}>{t('home.brandSub')}</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Sandvik Card */}
            <ScrollReveal direction="left" className="card" style={{
              position: 'relative', overflow: 'hidden',
              borderColor: 'rgba(239,68,68,0.3)',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 200, height: 200,
                background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(40%, -40%)',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 6, padding: '6px 14px', marginBottom: 20,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#ef4444' }}>SANDVIK / TAMROCK</span>
                </div>
                <h3 style={{ marginBottom: 8 }}>Sandvik Rock Drills</h3>
                <p style={{ fontSize: 14, marginBottom: 20 }}>
                  HL series underground & RD/HLX surface drifters. Compatible spare parts and complete rebuild units.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                  {['HL500', 'HL700', 'HL1000', 'HLX5', 'RD520', 'RD525'].map(m => (
                    <span key={m} style={{
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 4, padding: '3px 8px',
                      fontSize: 12, fontWeight: 600, color: '#ef4444',
                    }}>{m}</span>
                  ))}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '3px 4px' }}>+more</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
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
              borderColor: 'rgba(245,158,11,0.3)',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 200, height: 200,
                background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(40%, -40%)',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: 6, padding: '6px 14px', marginBottom: 20,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>EPIROC / ATLAS COPCO</span>
                </div>
                <h3 style={{ marginBottom: 8 }}>Epiroc COP Series</h3>
                <p style={{ fontSize: 14, marginBottom: 20 }}>
                  COP series underground Boomer & surface ROC drifters. Fully compatible parts with original OEM specifications.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                  {['COP1838', 'COP2560', 'COP1638', 'COP4050', 'MD20', 'COP3060'].map(m => (
                    <span key={m} style={{
                      background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                      borderRadius: 4, padding: '3px 8px',
                      fontSize: 12, fontWeight: 600, color: '#f59e0b',
                    }}>{m}</span>
                  ))}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '3px 4px' }}>+more</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
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

      {/* ─── FEATURED DRIFTERS ─── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase' }}>
                Complete Rock Drills
              </p>
              <h2 style={{ marginBottom: 0 }}>Our Drifter Series</h2>
            </div>
            <Link href="/drifters" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 14, fontWeight: 600 }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {/* Sandvik Drifters */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              fontSize: 13, fontWeight: 700, color: '#ef4444',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
              SANDVIK
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {SANDVIK_DRIFTERS.map(d => (
                <Link key={d.model} href={`/drifters?brand=sandvik&model=${d.model}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 16, cursor: 'pointer' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-white)', marginBottom: 4 }}>{d.model}</div>
                    <div style={{
                      display: 'inline-block', fontSize: 10, fontWeight: 700,
                      padding: '2px 6px', borderRadius: 4, marginBottom: 8,
                      background: d.type === 'Surface' ? 'rgba(96,165,250,0.15)' : 'rgba(167,139,250,0.15)',
                      color: d.type === 'Surface' ? '#60a5fa' : '#a78bfa',
                    }}>{d.type}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{d.rig}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dark)' }}>{d.weight}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Epiroc Drifters */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              fontSize: 13, fontWeight: 700, color: '#f59e0b',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
              EPIROC / ATLAS COPCO
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {EPIROC_DRIFTERS.map(d => (
                <Link key={d.model} href={`/drifters?brand=epiroc&model=${d.model}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 16, cursor: 'pointer' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-white)', marginBottom: 4 }}>{d.model}</div>
                    <div style={{
                      display: 'inline-block', fontSize: 10, fontWeight: 700,
                      padding: '2px 6px', borderRadius: 4, marginBottom: 8,
                      background: d.type === 'Surface' ? 'rgba(96,165,250,0.15)' : 'rgba(167,139,250,0.15)',
                      color: d.type === 'Surface' ? '#60a5fa' : '#a78bfa',
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

      {/* ─── ADVANTAGES ─── */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(21,27,38,0.5) 100%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase' }}>
              Why FED Mining
            </p>
            <h2 style={{ marginBottom: 12 }}>{t('home.advTitle')}</h2>
            <p style={{ maxWidth: 520, margin: '0 auto' }}>{t('home.advSub')}</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {ADVANTAGES.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <ScrollReveal key={i} delay={i * 90} className="card" style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: `rgba(${adv.color.includes('primary') ? '255,192,61' : adv.color.includes('10b981') ? '16,185,129' : adv.color.includes('60a5fa') ? '96,165,250' : '167,139,250'},0.12)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: `1px solid rgba(${adv.color.includes('primary') ? '255,192,61' : adv.color.includes('10b981') ? '16,185,129' : adv.color.includes('60a5fa') ? '96,165,250' : '167,139,250'},0.2)`,
                  }}>
                    <Icon size={24} color={adv.color} />
                  </div>
                  <h3 style={{ fontSize: 16, marginBottom: 10 }}>{t(adv.titleKey)}</h3>
                  <p style={{ fontSize: 14 }}>{t(adv.descKey)}</p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PART CATEGORIES ─── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase' }}>
              Spare Parts Catalog
            </p>
            <h2 style={{ marginBottom: 12 }}>Parts We Supply</h2>
            <p style={{ maxWidth: 520, margin: '0 auto' }}>
              All parts are manufactured to original specifications with induction-hardened alloy steel.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { name: 'Pistons', icon: '⚙️', count: '24 models' },
              { name: 'Seal Kits', icon: '🔩', count: '400h / 800h kits' },
              { name: 'Bushings', icon: '🔧', count: 'Guide & Chuck' },
              { name: 'Valve Assemblies', icon: '🔌', count: 'Distributor types' },
              { name: 'Accumulators', icon: '💡', count: 'HP & LP types' },
              { name: 'Shank Adapters', icon: '🔩', count: 'T38 / T45 / T51' },
              { name: 'Gears & Shafts', icon: '⚙️', count: 'Rotation gear sets' },
              { name: 'Hardware', icon: '🔧', count: 'Bolts & tension bars' },
            ].map(cat => (
              <Link
                key={cat.name}
                href={`/parts?category=${encodeURIComponent(cat.name.split(' ')[0])}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card" style={{
                  padding: '20px 16px', textAlign: 'center', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-white)', marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cat.count}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/parts" className="btn btn-primary" style={{ fontSize: 15, padding: '13px 32px' }}>
              <Package size={18} />
              Browse All 186+ Parts
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, var(--secondary) 0%, #1a2540 100%)',
        borderTop: '1px solid var(--border-color)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,192,61,0.1)',
            border: '1px solid rgba(255,192,61,0.3)',
            borderRadius: 99, padding: '5px 14px', marginBottom: 20,
          }}>
            <Zap size={12} color="var(--primary)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em' }}>
              CLIENT PORTAL — MACHINE HOUR TRACKING
            </span>
          </div>
          <h2 style={{ marginBottom: 16, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
            Track Your Drifters &<br />Never Miss a 400h Overhaul
          </h2>
          <p style={{ maxWidth: 500, margin: '0 auto 36px', fontSize: 16 }}>
            Register your machines. We monitor the hours and prepare your overhaul kits before you even need them.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
              Create Account
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-secondary" style={{ fontSize: 15, padding: '13px 28px' }}>
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
