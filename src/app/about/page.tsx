'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Users, Award, Globe2, Wrench, CheckCircle2, ArrowRight, Shield, Package } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

const TEAM_STATS = [
  { value: '30+',     tr: 'Uzman Çalışan',       en: 'Expert Staff',       icon: Users },
  { value: '10+',     tr: 'Yıl Deneyim',          en: 'Years Experience',   icon: Award },
  { value: '3',       tr: 'Global Operasyon',     en: 'Global Operations',  icon: Globe2 },
  { value: '30.000+', tr: 'Parça Numarası',      en: 'Part Referencing',   icon: Package },
];

const OPERATIONS = [
  {
    flag: '🇹🇷',
    countryTr: 'Türkiye',
    countryEn: 'Turkey',
    city: 'Denizli',
    roleTr: 'Genel Merkez & Üretim',
    roleEn: 'Headquarters & Manufacturing',
    descTr: 'Ana üretim tesisi, Ar-Ge ve idari merkez. Tüm parçalar global dağıtıma gönderilmeden önce burada üretilip test edilmektedir.',
    descEn: 'Main manufacturing plant, R&D, and administrative center. All parts are produced and tested here before being dispatched for global distribution.',
    color: '#ef4444',
    img: '/about-us.png',
  },
  {
    flag: '🇨🇱',
    countryTr: 'Şili',
    countryEn: 'Chile',
    city: 'Santiago',
    roleTr: 'Güney Amerika Operasyonları',
    roleEn: 'South American Operations',
    descTr: 'Şili, Peru ve Arjantin genelinde bakır ve lityum madencilik şirketlerine hizmet veren bölgesel operasyonlar.',
    descEn: 'Regional operations serving copper and lithium mining companies across Chile, Peru, and Argentina.',
    color: '#f59e0b',
    img: '/about-us-2.png',
  },
  {
    flag: '🇬🇭',
    countryTr: 'Gana',
    countryEn: 'Ghana',
    city: 'Accra',
    roleTr: 'Afrika Operasyonları',
    roleEn: 'African Operations',
    descTr: 'Sahra Altı Afrika genelinde altın ve boksit madenciliği operasyonlarını destekleyen Batı Afrika merkezi.',
    descEn: 'West African hub supporting gold and bauxite mining operations across Sub-Saharan Africa.',
    color: '#10b981',
    img: '/hero-image.png',
  },
];

const WHY_CHOOSE = [
  {
    icon: Shield,
    titleTr: 'Endüstriyel Uzmanlık',
    titleEn: 'Industrial Expertise',
    descTr: 'Üç kıtada madencilik ekipmanı üretimi, onarımı ve saha hizmetlerinde derin bilgiye sahip 30+ çalışan.',
    descEn: 'Deep knowledge in mining equipment manufacturing, repair, and field service across three continents with 30+ staff.',
    color: '#ffc03d',
  },
  {
    icon: CheckCircle2,
    titleTr: 'Güvenilir Çözümler',
    titleEn: 'Reliable Solutions',
    descTr: 'Dayanıklı ve verimli ürünler teslim etme konusunda kanıtlanmış sicil. Parçalar teslimattan önce orijinal OEM test makinelerinde test edilir.',
    descEn: 'Proven track record of delivering durable and efficient products. Parts are tested on original OEM test rigs before shipment.',
    color: '#10b981',
  },
  {
    icon: Wrench,
    titleTr: 'Kapsamlı Destek',
    titleEn: 'Comprehensive Support',
    descTr: 'Sorun giderme, bakım planlama ve yedek parçalar için özel teknik ekip. Makine saatlerinizi sizin yerinize takip ediyoruz.',
    descEn: 'Dedicated technical team for troubleshooting, maintenance planning, and spare parts. We track your machine hours for you.',
    color: '#60a5fa',
  },
  {
    icon: Package,
    titleTr: 'Stok Yönetimi',
    titleEn: 'Inventory Management',
    descTr: 'Drifter çalışma saatlerinizi izliyor ve 400s/800s/1200s revizyon kitlerini sizin adınıza önceden stokta tutuyoruz.',
    descEn: 'We monitor your drifter working hours and pre-stock 400h/800h/1200h overhaul kits under your name.',
    color: '#a78bfa',
  },
];

const SERVICES = [
  {
    img: '/service-1.png',
    titleTr: 'Yedek Parça Temini',
    titleEn: 'Spare Parts Supply',
    descTr: 'Sandvik ve Epiroc drifterlar için OEM uyumlu tüm yedek parçalar. 30.000+ parça numarasına erişim.',
    descEn: 'OEM-compatible spare parts for Sandvik and Epiroc drifters. Access to over 30,000 part numbers.',
  },
  {
    img: '/service-2.png',
    titleTr: 'Revizyon Kitleri',
    titleEn: 'Overhaul Kits',
    descTr: '400s, 800s ve 1200s revizyon kitleri. İndüksiyon sertleştirilmiş alaşımlı çelik, orijinal spesifikasyonlarda.',
    descEn: '400h, 800h, and 1200h overhaul kits. Induction-hardened alloy steel built to original specifications.',
  },
  {
    img: '/service-3.png',
    titleTr: 'Teknik Destek',
    titleEn: 'Technical Support',
    descTr: 'WhatsApp ve e-posta üzerinden 7/24 teknik destek. 30+ uzman mühendis ekibimizle her zaman yanınızdayız.',
    descEn: '24/7 technical support via WhatsApp and email. Always by your side with our team of 30+ expert engineers.',
  },
];

export default function AboutPage() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  return (
    <div style={{ paddingTop: 104 }}>

      {/* ═══ HERO BANNER ═══ */}
      <section style={{
        position: 'relative',
        background: '#212d45',
        padding: '72px 0 64px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(33,45,69,0.95) 0%, rgba(33,45,69,0.7) 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,192,61,0.12)',
            border: '1px solid rgba(255,192,61,0.35)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffc03d', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#ffc03d', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
              {isTr ? 'HAKKIMIZDA' : 'ABOUT US'}
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: 20,
            lineHeight: 1.1,
            textTransform: 'uppercase',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.01em',
          }}>
            FED Mining Solutions<br />&amp; Parts
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, maxWidth: 620, color: 'rgba(255,255,255,0.75)', marginBottom: 0 }}>
            {isTr 
              ? 'Tasarla, Başar ve İlham Ver — Türkiye merkezli, dünya geneline hizmet veren lider madencilik ekipmanları yedek parça tedarikçisi.'
              : 'Achieve Your Dream and Inspire — Turkey-based, globally operating leading supplier of mining equipment spare parts.'}
          </p>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {TEAM_STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{
                  textAlign: 'center', padding: '28px 20px',
                  borderRight: i < TEAM_STATS.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(255,192,61,0.1)',
                    border: '1px solid rgba(255,192,61,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}>
                    <Icon size={20} color="#ffc03d" />
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    {isTr ? s.tr : s.en}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHO WE ARE + IMAGE ═══ */}
      <section style={{ padding: '88px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>

            <ScrollReveal direction="left">
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(33,45,69,0.18)' }}>
                  <Image
                    src="/about-us.png"
                    alt="FED Mining - Manufacturing Facility"
                    width={580}
                    height={420}
                    style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                {/* Floating badge */}
                <div style={{
                  position: 'absolute', bottom: -20, right: -20,
                  background: '#212d45',
                  border: '3px solid #ffc03d',
                  borderRadius: 12, padding: '16px 24px',
                  boxShadow: '0 12px 32px rgba(33,45,69,0.35)',
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#ffc03d', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>10+</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                    {isTr ? 'Yıl Deneyim' : 'Years Experience'}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                color: '#ffc03d', marginBottom: 16, textTransform: 'uppercase',
                padding: '4px 14px', background: 'rgba(255,192,61,0.1)',
                border: '1px solid rgba(255,192,61,0.25)', borderRadius: 99,
                fontFamily: 'var(--font-heading)',
              }}>
                {isTr ? 'KİM OLDUĞUMUZ' : 'WHO WE ARE'}
              </span>
              <h2 style={{ marginBottom: 20, lineHeight: 1.2, fontFamily: 'var(--font-heading)' }}>
                {isTr ? (
                  <>Madencilik Endüstrisi için<br />Yenilikçi Çözümler</>
                ) : (
                  <>Innovative Solutions for the<br />Mining Industry</>
                )}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 16, color: 'var(--text-main)' }}>
                {isTr ? (
                  <>FED Mining Solutions and Parts (resmi adı: <strong style={{ color: 'var(--text-main)' }}>FED MADENCİLİK MAKİNA İTH. İHR. SAN. TİC. LTD.</strong>), Türkiye merkezli lider bir madencilik ekipman bileşenlerinin uyumlu üreticisi ve ihracatçısıdır.</>
                ) : (
                  <>FED Mining Solutions and Parts (official name: <strong style={{ color: 'var(--text-main)' }}>FED MADENCILIK MAKINA ITH. IHR. SAN. TIC. LTD.</strong>) is a leading Turkey-based manufacturer and exporter of compatible mining equipment components.</>
                )}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 16, color: 'var(--text-muted)' }}>
                {isTr ? (
                  <>Temel ürün hattımız; yüzey ve yeraltı madenciliğinde kullanılan Sandvik ve Epiroc (Atlas Copco / Tamrock) kaya delme ekipmanları için <strong style={{ color: 'var(--text-main)' }}>uyumlu drifterlar ve yedek parçalardan</strong> oluşmaktadır.</>
                ) : (
                  <>Our primary product line comprises <strong style={{ color: 'var(--text-main)' }}>compatible drifters and spare parts</strong> for Sandvik and Epiroc (Atlas Copco / Tamrock) rock drilling equipment used in surface and underground mining operations.</>
                )}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 32, color: 'var(--text-muted)' }}>
                {isTr ? (
                  <>Türkiye, Şili ve Gana olmak üzere üç ülkede <strong style={{ color: 'var(--text-main)' }}>üretim ve tamir atölyeleri</strong> ile mühendisler, ustabaşılar ve saha teknisyenlerinden oluşan 30+ kişilik deneyimli bir ekiple operasyonlarımızı sürdürüyoruz.</>
                ) : (
                  <>We run our operations with <strong style={{ color: 'var(--text-main)' }}>manufacturing and repair workshops</strong> across three countries (Turkey, Chile, Ghana) powered by an experienced team of over 30 engineers, foremen, and field technicians.</>
                )}
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/parts" className="btn btn-primary" style={{ fontSize: 14, padding: '11px 24px' }}>
                  {isTr ? 'Parçaları İncele' : 'Browse Spare Parts'} <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn btn-secondary" style={{ fontSize: 14, padding: '11px 24px' }}>
                  {isTr ? 'Bizimle Çalışın' : 'Work With Us'}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ WHY FED MINING ═══ */}
      <section style={{ padding: '88px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: '#ffc03d', marginBottom: 12, textTransform: 'uppercase',
              padding: '4px 14px', background: 'rgba(255,192,61,0.1)',
              border: '1px solid rgba(255,192,61,0.25)', borderRadius: 99,
              fontFamily: 'var(--font-heading)',
            }}>{isTr ? 'NEDEN FED MINING' : 'WHY FED MINING'}</span>
            <h2 style={{ marginBottom: 14, marginTop: 8, fontFamily: 'var(--font-heading)' }}>
              {isTr ? 'Neden Bizi Seçmelisiniz?' : 'Why Choose Us?'}
            </h2>
            <p style={{ maxWidth: 500, margin: '0 auto', fontSize: 16, color: 'var(--text-muted)' }}>
              {isTr 
                ? 'Endüstriyel standartları aşın ve operasyonlarınızı optimize etmek için gelişmiş tekniklerimize güvenin.'
                : 'Exceed industrial standards and trust our advanced engineering practices to optimize your operations.'}
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {WHY_CHOOSE.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 80} className="card" style={{
                  borderTop: `3px solid ${item.color}`,
                  padding: 28, textAlign: 'center',
                  background: '#ffffff',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    <Icon size={24} color={item.color} />
                  </div>
                  <h3 style={{ fontSize: 16, marginBottom: 10, fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                    {isTr ? item.titleTr : item.titleEn}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                    {isTr ? item.descTr : item.descEn}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section style={{ padding: '88px 0', background: '#ffffff' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: '#ffc03d', marginBottom: 12, textTransform: 'uppercase',
              padding: '4px 14px', background: 'rgba(255,192,61,0.1)',
              border: '1px solid rgba(255,192,61,0.25)', borderRadius: 99,
              fontFamily: 'var(--font-heading)',
            }}>{isTr ? 'KALİTELİ HİZMETLER' : 'QUALITY SERVICES'}</span>
            <h2 style={{ marginBottom: 14, marginTop: 8, fontFamily: 'var(--font-heading)' }}>
              {isTr ? 'Hizmetlerimiz' : 'Our Services'}
            </h2>
            <p style={{ maxWidth: 500, margin: '0 auto', fontSize: 16, color: 'var(--text-muted)' }}>
              {isTr 
                ? 'Madencilik operasyonlarınızın verimliliği için kapsamlı çözümler sunuyoruz.'
                : 'We provide comprehensive solutions to maintain the efficiency of your mining operations.'}
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={i} delay={i * 100} className="card" style={{ padding: 0, overflow: 'hidden', background: '#ffffff' }}>
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <Image
                    src={svc.img}
                    alt={isTr ? svc.titleTr : svc.titleEn}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(transparent 30%, rgba(33,45,69,0.85))',
                  }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                    <h3 style={{ fontSize: 18, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: 0, fontWeight: 700 }}>
                      {isTr ? svc.titleTr : svc.titleEn}
                    </h3>
                  </div>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16, color: 'var(--text-muted)' }}>
                    {isTr ? svc.descTr : svc.descEn}
                  </p>
                  <Link href="/parts" style={{ fontSize: 13, color: '#ffc03d', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isTr ? 'Daha Fazla' : 'Learn More'} <ArrowRight size={13} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT SPECS ═══ */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>

            <ScrollReveal direction="left">
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                color: '#ffc03d', marginBottom: 16, textTransform: 'uppercase',
                padding: '4px 14px', background: 'rgba(255,192,61,0.1)',
                border: '1px solid rgba(255,192,61,0.25)', borderRadius: 99,
                fontFamily: 'var(--font-heading)',
              }}>{isTr ? 'ÜRÜNLERİMİZ' : 'OUR PRODUCTS'}</span>
              <h2 style={{ marginBottom: 20, lineHeight: 1.2, fontFamily: 'var(--font-heading)' }}>
                {isTr ? (
                  <>Komple Drifterlar &amp;<br />Yedek Parçalar</>
                ) : (
                  <>Complete Drifters &amp;<br />Spare Parts</>
                )}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 24, color: 'var(--text-muted)' }}>
                {isTr 
                  ? 'Temel ürün grubumuz; komple kaya delici (drifter) üniteleri ve yedek parçalarından oluşur. Orijinal ekipmanlarla birebir aynı tolerans ve montaj ölçülerine sahiptir. Ağır bakım servis aralığımız ise sahada doğrulanmış 400 saattir.'
                  : 'Our main focus is on complete replacement drifters and their matching spare parts. They possess identical tolerances and mounting dimensions to the original units. Our verified overhaul maintenance warranty is 400 operational rock drilling hours.'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
                {[
                  {
                    titleTr: 'Dayanıklılık',
                    titleEn: 'Durability',
                    color: '#ffc03d',
                    descTr: 'İndüksiyonla sertleştirilmiş alaşımlı çelik, OEM standartlarında.',
                    descEn: 'Induction-hardened alloy steel, built to strict OEM standards.'
                  },
                  {
                    titleTr: 'Yüksek Verim',
                    titleEn: 'High Efficiency',
                    color: '#10b981',
                    descTr: 'Orijinallerle aynı delme süreleri, düşük işletme maliyeti.',
                    descEn: 'Identical penetration rates to originals, lower operating costs.'
                  },
                  {
                    titleTr: 'Kolay Bakım',
                    titleEn: 'Easy Service',
                    color: '#60a5fa',
                    descTr: 'Orijinal OEM yedek parçalarıyla tam uyumlu tasarım.',
                    descEn: 'Perfect dimensional compliance with original OEM spare parts.'
                  },
                  {
                    titleTr: 'Stok Yönetimi',
                    titleEn: 'Stock Reserve',
                    color: '#a78bfa',
                    descTr: 'Çalışma saatlerini biz takip ediyor, kitlerinizi rezerve ediyoruz.',
                    descEn: 'We track working hours and keep overhaul kits stocked on your name.'
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 10, padding: '14px 16px',
                    borderLeft: `3px solid ${item.color}`,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6, fontFamily: 'var(--font-heading)' }}>
                      {isTr ? item.titleTr : item.titleEn}
                    </div>
                    <p style={{ fontSize: 12, lineHeight: 1.6, margin: 0, color: 'var(--text-muted)' }}>
                      {isTr ? item.descTr : item.descEn}
                    </p>
                  </div>
                ))}
              </div>

              <Link href="/drifters" className="btn btn-primary" style={{ fontSize: 14, padding: '11px 24px' }}>
                {isTr ? 'Tüm Drifterlara Bak' : 'View All Drifters'} <ArrowRight size={15} />
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(33,45,69,0.18)' }}>
                <Image
                  src="/drifter.png"
                  alt="FED Mining - Rock Drill Drifters"
                  width={560}
                  height={420}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ COMPATIBLE MODELS ═══ */}
      <section style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
              {isTr ? 'Uyumlu Modeller' : 'Compatible Drill Models'}
            </h2>
            <p style={{ maxWidth: 500, margin: '0 auto', fontSize: 16, color: 'var(--text-muted)' }}>
              {isTr 
                ? 'Aşağıdaki kaya delici markaları ve modelleri için uyumlu drifter ve parça imalatı yapıyoruz:'
                : 'We manufacture compatible drifters and parts for the following rock drill brands and models:'}
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              {
                brand: 'Epiroc / Atlas Copco',
                color: '#f59e0b',
                models: 'COP1132, COP1238, COP1638, COP1838, COP1840, COP2150, COP2550, COP2160, COP2560, MD20, COP3060, COP4050',
                rigs: 'BOOMER 282, S1D, L2D, T1D, ROC D7, ROC T35, ROC D7-11',
              },
              {
                brand: 'Sandvik / Tamrock',
                color: '#ef4444',
                models: 'HL500, HL600, HL700, HL800, HL1000, HL1500, HLX5, RD520, RD525, RD314',
                rigs: 'Pantera, Ranger, DX, DD, DT series',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.brand} delay={i * 100} className="card" style={{
                borderTop: `3px solid ${item.color}`,
                padding: 28,
                background: '#ffffff',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: 6, padding: '5px 12px', marginBottom: 16,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-heading)' }}>{item.brand}</span>
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-main)', marginBottom: 10, lineHeight: 1.6 }}>
                  <strong>{isTr ? 'Modeller:' : 'Models:'}</strong> {item.models}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <strong>{isTr ? 'Rigler:' : 'Rigs:'}</strong> {item.rigs}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL OPERATIONS ═══ */}
      <section style={{ padding: '88px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: '#ffc03d', marginBottom: 12, textTransform: 'uppercase',
              padding: '4px 14px', background: 'rgba(255,192,61,0.1)',
              border: '1px solid rgba(255,192,61,0.25)', borderRadius: 99,
              fontFamily: 'var(--font-heading)',
            }}>{isTr ? 'GLOBAL OPERASYONLAR' : 'GLOBAL OPERATIONS'}</span>
            <h2 style={{ marginBottom: 14, marginTop: 8, fontFamily: 'var(--font-heading)' }}>
              {isTr ? '3 Ülkede Üretim & Operasyon' : 'Production & Support Across 3 Countries'}
            </h2>
            <p style={{ maxWidth: 500, margin: '0 auto', fontSize: 16, color: 'var(--text-muted)' }}>
              {isTr 
                ? 'Üç kıtada yer alan atölyelerimiz, uzman mühendis ekibimiz ve hızlı saha hizmetimizle küresel madencilere tam destek.'
                : 'Full support to global mining sites via workshops, specialized engineering teams, and fast field support in three continents.'}
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {OPERATIONS.map((op, i) => (
              <ScrollReveal key={i} delay={i * 100} className="card" style={{
                padding: 0, overflow: 'hidden',
                borderTop: `3px solid ${op.color}`,
                background: '#ffffff',
              }}>
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <Image
                    src={op.img}
                    alt={isTr ? op.countryTr : op.countryEn}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(transparent 20%, rgba(33,45,69,0.9))',
                  }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: op.color, fontFamily: 'var(--font-heading)', marginBottom: 4 }}>
                      {isTr ? op.roleTr : op.roleEn}
                    </div>
                    <h3 style={{ fontSize: 18, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                      {op.city}, {isTr ? op.countryTr : op.countryEn}
                    </h3>
                  </div>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0, color: 'var(--text-muted)' }}>
                    {isTr ? op.descTr : op.descEn}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER CONTACT INFO ═══ */}
      <section style={{
        background: 'linear-gradient(135deg, #1a2438 0%, #212d45 100%)',
        padding: '56px 0',
        borderTop: '3px solid rgba(255,192,61,0.25)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 8, color: '#ffffff', fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>
            {isTr ? 'Kayıtlı Şirket Bilgileri' : 'Registered Office Details'}
          </h2>
          <p style={{ marginBottom: 28, color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
            FED Mining Solutions and Parts &mdash; {isTr ? 'Türkiye' : 'Turkey'}
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              <MapPin size={16} color="#ffc03d" />
              Denizli, {isTr ? 'Türkiye' : 'Turkey'}
            </div>
            <a href="tel:+905061208706" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
              <Phone size={16} color="#ffc03d" />
              +90 506 120 87 06
            </a>
            <a href="mailto:Info@FedMiningSolutions.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
              <Mail size={16} color="#ffc03d" />
              Info@FedMiningSolutions.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
