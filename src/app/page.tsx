'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Clock, Globe2, Headphones, ChevronRight, Zap, Package, Wrench, CheckCircle2, Star } from 'lucide-react';
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
  { icon: Shield,     title: 'OEM Uyumlu Kalite',    desc: 'Orijinal spesifikasyonlara gore uretilmis, induksiyon sertlestirilmis alasiimli celik parcalar.',    color: '#ffc03d', bg: 'rgba(255,192,61,0.1)',   border: 'rgba(255,192,61,0.25)' },
  { icon: Clock,      title: 'Hizli Teslimat',        desc: '48 saat icinde hazirlanan stoktan teslim. Kritik duraklamalari minimuma indiriyoruz.',              color: '#10b981', bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.25)' },
  { icon: Globe2,     title: 'Dunya Geneli Gonderim', desc: 'Turkiye, Sili ve Gana merkezlerimizden 50+ ulkeye sevkiyat yapiyoruz.',                             color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',   border: 'rgba(96,165,250,0.25)' },
  { icon: Headphones, title: '7/24 Teknik Destek',   desc: '30+ uzman mühendis kadromuzla WhatsApp ve e-posta üzerinden kesintisiz teknik destek.',             color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)' },
];

const STATS = [
  { value: '30.000+', label: 'Erisebilir Parca Numarasi', icon: Package },
  { value: '56+',     label: 'Is Ortagi',                  icon: Star },
  { value: '3',       label: 'Ulke: TR / CL / GH',         icon: Globe2 },
  { value: '400s',    label: 'Revizyon Garantisi',          icon: CheckCircle2 },
];

const PRODUCT_CATEGORIES = [
  { name: 'Drifterlar',       img: '/drifter.png',        desc: 'Komple Sandvik & Epiroc' },
  { name: 'Conta Kitleri',    img: '/friction-disc.png',  desc: '400s / 800s revizyon' },
  { name: 'Alt Takim',        img: '/undercarriage.png',  desc: 'Paletli ekipman' },
  { name: 'Sogutma',          img: '/cooling.png',        desc: 'Sogutma sistemleri' },
  { name: 'Cam & Kabin',      img: '/glass.png',          desc: 'Operatör kabini' },
  { name: 'Alt Takim 2',      img: '/undercarriage2.png', desc: 'Tahrik sistemi' },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: 0 }}>

      {/* ═══════════════════════════════════════════════════
          HERO — WordPress'ten esinlenen gorselle birlesik karanlik bolum
      ═══════════════════════════════════════════════════ */}
      <section className="dark-section" style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#212d45',
      }}>
        {/* Arkaplan gorsel (WordPress hero-section-min.jpg) */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-section.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
        }} />
        {/* Animasyonlu glow blobs */}
        <div className="hero-animated-bg" />
        {/* Scan cizgisi */}
        <div className="hero-scan" />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,192,61,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,192,61,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        {/* Alt gecis */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, #F2F5F7)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 140, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
            <div style={{ maxWidth: 680 }}>
              {/* Rozet */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,192,61,0.12)',
                border: '1px solid rgba(255,192,61,0.35)',
                borderRadius: 99, padding: '7px 18px',
                marginBottom: 28,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffc03d', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ffc03d', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                  TURKEY &mdash; WORLDWIDE SHIPPING
                </span>
              </div>

              {/* Baslik — WordPress gibi buyuk ve bold */}
              <h1 style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.06,
                marginBottom: 24,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
              }}>
                {t('home.heroTitle')}
              </h1>

              {/* Alt baslik */}
              <p style={{
                fontSize: 18, lineHeight: 1.75,
                maxWidth: 560, marginBottom: 16,
                color: 'rgba(255,255,255,0.7)',
              }}>
                Achieve Your Dream and Inspire
              </p>
              <p style={{
                fontSize: 15, lineHeight: 1.7,
                maxWidth: 560, marginBottom: 40,
                color: 'rgba(255,255,255,0.55)',
              }}>
                {t('home.heroSub')}
              </p>

              {/* Guven maddeleri */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', marginBottom: 40 }}>
                {['OEM uyumlu spesifikasyonlar', '400 saatlik revizyon garantisi', '30+ uzman mühendis'].map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                    <CheckCircle2 size={14} color="#ffc03d" />
                    {b}
                  </div>
                ))}
              </div>

              {/* CTA butonlari */}
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
                  href="https://wa.me/905061208706?text=Merhaba%2C%20fiyat%20teklifi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px', borderRadius: 6,
                    background: '#25D366', color: '#fff',
                    fontSize: 15, fontWeight: 600,
                    transition: 'all 0.2s ease', textDecoration: 'none',
                  }}
                >
                  WhatsApp 24/7
                </a>
              </div>
            </div>

            {/* Sag taraf — hero gorsel */}
            <div className="desktop-nav" style={{ width: 340, flexShrink: 0 }}>
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '2px solid rgba(255,192,61,0.3)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                position: 'relative',
              }}>
                <Image
                  src="/hero-mining.png"
                  alt="FED Mining - Drifter parcalari"
                  width={340}
                  height={420}
                  style={{ objectFit: 'cover', display: 'block' }}
                  priority
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(33,45,69,0.95))',
                  padding: '32px 20px 20px',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#ffc03d', fontFamily: 'var(--font-heading)', marginBottom: 4 }}>
                    SANDVIK &amp; EPIROC
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                    OEM uyumlu yedek parca uzmani
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS BAR
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
                  <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          URUN KATEGORILERI — WordPress gorselleriyle
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
              fontFamily: 'var(--font-heading)',
            }}>Parca Yelpazesi</span>
            <h2 style={{ marginBottom: 14, marginTop: 8 }}>Urun Kategorilerimiz</h2>
            <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 16 }}>
              Induction sertlestirilmis alasiimli celikten orijinal spesifikasyonlara gore uretilmis tum parcalar.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {PRODUCT_CATEGORIES.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 80}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(transparent 40%, rgba(33,45,69,0.85))',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 12, left: 14,
                    }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{cat.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{cat.desc}</div>
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/parts" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                      Parcalari Goster
                    </Link>
                    <ChevronRight size={16} color="var(--primary)" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MARKA SECIMI — Sandvik / Epiroc
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
              fontFamily: 'var(--font-heading)',
            }}>OEM Uyumlu Urunler</span>
            <h2 style={{ marginBottom: 14, marginTop: 8 }}>{t('home.brandTitle')}</h2>
            <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 16 }}>{t('home.brandSub')}</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>

            {/* Sandvik Karti */}
            <ScrollReveal direction="left" className="card" style={{
              position: 'relative', overflow: 'hidden',
              borderTop: '3px solid #ef4444',
              padding: 32,
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180, background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(40%, -40%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 6, padding: '6px 14px', marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)' }}>SANDVIK / TAMROCK</span>
                </div>
                <h3 style={{ marginBottom: 8, fontSize: 20 }}>Sandvik Rock Drills</h3>
                <p style={{ fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
                  HL serisi yeralti &amp; RD/HLX yuzey drifterlari. Uyumlu yedek parcalar ve komple revizyon uniteleri.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {['HL500', 'HL700', 'HL1000', 'HLX5', 'RD520', 'RD525'].map(m => (
                    <span key={m} style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 4, padding: '3px 9px', fontSize: 12, fontWeight: 600, color: '#dc2626', fontFamily: 'var(--font-heading)' }}>{m}</span>
                  ))}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '3px 4px' }}>+daha fazla</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link href="/parts?brand=Sandvik" className="btn btn-sandvik" style={{ fontSize: 13, padding: '9px 18px' }}>Parcalara Goz At</Link>
                  <Link href="/drifters?brand=sandvik" className="btn btn-secondary" style={{ fontSize: 13, padding: '9px 18px' }}>Drifterlari Goster</Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Epiroc Karti */}
            <ScrollReveal delay={120} direction="right" className="card" style={{
              position: 'relative', overflow: 'hidden',
              borderTop: '3px solid #f59e0b',
              padding: 32,
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180, background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(40%, -40%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, padding: '6px 14px', marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#d97706', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)' }}>EPIROC / ATLAS COPCO</span>
                </div>
                <h3 style={{ marginBottom: 8, fontSize: 20 }}>Epiroc COP Serisi</h3>
                <p style={{ fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
                  COP serisi yeralti Boomer &amp; yuzey ROC drifterlari. Orijinal OEM spesifikasyonlariyla tam uyumlu parcalar.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {['COP1838', 'COP2560', 'COP1638', 'COP4050', 'MD20', 'COP3060'].map(m => (
                    <span key={m} style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 4, padding: '3px 9px', fontSize: 12, fontWeight: 600, color: '#b45309', fontFamily: 'var(--font-heading)' }}>{m}</span>
                  ))}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '3px 4px' }}>+daha fazla</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link href="/parts?brand=Epiroc" className="btn btn-epiroc" style={{ fontSize: 13, padding: '9px 18px' }}>Parcalara Goz At</Link>
                  <Link href="/drifters?brand=epiroc" className="btn btn-secondary" style={{ fontSize: 13, padding: '9px 18px' }}>Drifterlari Goster</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          AVANTAJLARIMIZ — Neden FED Mining
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '88px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
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
              fontFamily: 'var(--font-heading)',
            }}>Neden FED Mining</span>
            <h2 style={{ marginBottom: 14, marginTop: 8 }}>Rekabetsiz Basarilarimiz</h2>
            <p style={{ maxWidth: 500, margin: '0 auto', fontSize: 16 }}>
              Operasyonlarinizi optimize etmenin daha verimli bir yolunu mu ariyorsunuz? Uzmanligigimizla yaninizdayiz.
            </p>
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
                  <h3 style={{ fontSize: 16, marginBottom: 10 }}>{adv.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7 }}>{adv.desc}</p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ONE CIKAN DRIFTERLAR
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                Komple Kaya Deliciler
              </span>
              <h2 style={{ marginBottom: 0 }}>Drifter Serimiz</h2>
            </div>
            <Link href="/drifters" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Tamamini Goster <ChevronRight size={16} />
            </Link>
          </div>

          {/* Sandvik */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 12, fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
              SANDVIK
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              {SANDVIK_DRIFTERS.map(d => (
                <Link key={d.model} href={`/drifters?brand=sandvik&model=${d.model}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '16px 18px', cursor: 'pointer' }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4, fontFamily: 'var(--font-heading)' }}>{d.model}</div>
                    <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, marginBottom: 8, background: d.type === 'Surface' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)', color: d.type === 'Surface' ? '#3b82f6' : '#8b5cf6' }}>{d.type}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{d.rig}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dark)' }}>{d.weight}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Epiroc */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 12, fontWeight: 700, color: '#d97706', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
              EPIROC / ATLAS COPCO
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              {EPIROC_DRIFTERS.map(d => (
                <Link key={d.model} href={`/drifters?brand=epiroc&model=${d.model}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '16px 18px', cursor: 'pointer' }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4, fontFamily: 'var(--font-heading)' }}>{d.model}</div>
                    <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, marginBottom: 8, background: d.type === 'Surface' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)', color: d.type === 'Surface' ? '#3b82f6' : '#8b5cf6' }}>{d.type}</div>
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
          HAKKIMIZDA — About Us mini bolumu (WordPress icerigiyle)
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '88px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(33,45,69,0.2)' }}>
                <Image
                  src="/about-us.png"
                  alt="FED Mining - Hakkimizda"
                  width={580}
                  height={400}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(33,45,69,0.9))',
                  padding: '40px 24px 24px',
                }}>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: '#ffc03d', fontFamily: 'var(--font-heading)' }}>30.000+</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Parca Numarasi</div>
                    </div>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: '#ffc03d', fontFamily: 'var(--font-heading)' }}>56+</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Is Ortagi</div>
                    </div>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: '#ffc03d', fontFamily: 'var(--font-heading)' }}>5+</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Gunluk Islem</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                color: 'var(--primary)', marginBottom: 16, textTransform: 'uppercase',
                padding: '4px 14px', background: 'rgba(255,192,61,0.1)',
                border: '1px solid rgba(255,192,61,0.25)', borderRadius: 99,
                fontFamily: 'var(--font-heading)',
              }}>Rekabetsiz Basarilarimiz</span>
              <h2 style={{ marginBottom: 20, lineHeight: 1.2 }}>
                Operasyonlarinizi Optimize<br />Etmenin Daha Akilli Yolu
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>
                Uzmanligigimiz ve deneyimimize guvenerek size basari icin gerekli olagan ustu parcalari teslim ediyoruz. Operasyonlarinizi bir ust seviyeye tasimaniza yardimci olalim.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
                FED Mining Solutions and Parts olarak; Turkiye, Sili ve Gana&apos;daki merkezlerimizden 50&apos;den fazla ulkeye hizmet veriyor, her parca icin 400 saatlik revizyon garantisi sunuyoruz.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/about" className="btn btn-primary" style={{ fontSize: 14, padding: '11px 24px' }}>
                  Hakkimizda Daha Fazla
                  <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn btn-secondary" style={{ fontSize: 14, padding: '11px 24px' }}>
                  Bizimle Calisin
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA BANNER — karanlik lacivert
      ═══════════════════════════════════════════════════ */}
      <section className="dark-section" style={{
        padding: '88px 0',
        background: 'linear-gradient(135deg, #1a2438 0%, #212d45 100%)',
        borderTop: '3px solid rgba(255,192,61,0.25)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,192,61,0.1)',
            border: '1px solid rgba(255,192,61,0.3)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 24,
          }}>
            <Zap size={12} color="var(--primary)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}>
              MUSTERI PORTALI &mdash; MAKINE SAATI TAKIBI
            </span>
          </div>

          <h2 style={{ marginBottom: 18, fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', color: '#ffffff' }}>
            Drifterlarinizi Takip Edin &amp;<br />400 Saatlik Revizyon Zamanini Hic Kacirmayin
          </h2>
          <p style={{ maxWidth: 520, margin: '0 auto 40px', fontSize: 16, color: 'rgba(255,255,255,0.65)' }}>
            Makinelerinizi kaydedin. Saatleri biz takip ediyoruz ve revizyon kitlerinizi siz daha ihtiyac duymadan hazirliyor, sizinle paylasiyoruz.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 30px' }}>
              Hesap Olustur
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-secondary-light" style={{ fontSize: 15, padding: '14px 30px' }}>
              Satis Ekibiyle Iletisime Gecin
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
