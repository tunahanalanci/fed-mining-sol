'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProductRangePage() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const title = isTr ? 'Ürün Yelpazesi' : 'Product Range';
  const subtitle = isTr
    ? 'Tüm madencilik ve sondaj ihtiyaçlarınız için OEM uyumlu geniş parça yelpazemiz.'
    : 'Our extensive range of OEM-compatible parts for all your mining and drilling needs.';

  const categories = [
    {
      title: isTr ? 'DRIFTER VE MATKAP PARÇALARI' : 'DRIFTER & DRILLER PARTS',
      desc: isTr
        ? 'Kaya deliciler (drifterlar) için komple revizyon üniteleri ve yedek parçalar. Sandvik HL ve Epiroc COP serileri ile uyumlu.'
        : 'Rock drill drifters and spare parts built for high performance. Compatible with Sandvik HL & Epiroc COP series.',
      img: '/drifter.png',
      link: '/product-range-drifter'
    },
    {
      title: isTr ? 'MOTOR ÜNİTELERİ' : 'ENGINE UNITS',
      desc: isTr
        ? 'Ağır hizmet motor blokları, krank milleri, eksantrik milleri, astar kitleri, yağ pompaları, soğutucular ve burçlar.'
        : 'Heavy-duty motor blocks, crankshafts, camshafts, liner kits, oil pumps, coolers, and bushings.',
      img: '/engine_unit.png',
      link: '/product-range-engine-units'
    },
    {
      title: isTr ? 'ALT TAKIM BİLEŞENLERİ' : 'UNDERCARRIAGE COMPONENTS',
      desc: isTr
        ? 'Paletli deliciler ve yükleyiciler için tek/çift flanşlı makaralar, tahrik dişlileri, avara tekerlekler, track chains ve komple yürüyüş alt takımları.'
        : 'Single/double flange rollers, drive sprockets, idlers, track chains, and complete undercarriage systems.',
      img: '/undercarriage.png',
      link: '/product-range-undercarriage'
    },
    {
      title: isTr ? 'ŞANZIMAN VE GÜÇ AKTARIMI' : 'POWERTRAIN',
      desc: isTr
        ? 'Şanzıman bileşenleri, dişliler, diferansiyel parçaları ve ağır iş makineleri için özel güç aktarma organları.'
        : 'Transmission components, gears, differential parts, and powertrain products for heavy machinery.',
      img: '/about-us-2.png',
      link: '/parts?category=Gear%20%26%20Shaft'
    },
    {
      title: isTr ? 'HİDROLİK SİSTEMLER' : 'HYDRAULIC',
      desc: isTr
        ? 'Hidrolik pompalar, valfler, silindirler, hortumlar ve drifter hidrolik valf grupları için sızdırmazlık kitleri.'
        : 'Hydraulic pumps, valves, cylinders, hoses, and seal kits tested for high pressure efficiency.',
      img: '/service-1.png',
      link: '/parts?category=Valve'
    },
    {
      title: isTr ? 'FREN SİSTEMLERİ' : 'BRAKE',
      desc: isTr
        ? 'Delici makineler için yüksek sürtünmeli fren diskleri, kaliperler, balatalar ve endüstriyel rulmanlar.'
        : 'High-friction brake discs, calipers, brake pads, and industrial bearings for safety.',
      img: '/friction-disc.png',
      link: '/parts?category=Hardware'
    },
    {
      title: isTr ? 'BİTLER, ŞANKLAR VE RODLAR' : 'BITS, SHANKS & RODS',
      desc: isTr
        ? 'Yüksek kaliteli top hammer deliciler, matkap ucları, şank adaptörleri ve delme rodları (T38, T45, T51).'
        : 'High-quality rock drill bits, shank adapters, and extension rods for top hammer drilling.',
      img: '/service-2.png',
      link: '/parts?category=Shank%20Adapter'
    },
    {
      title: isTr ? 'SOĞUTMA GRUPLARI' : 'COOLING',
      desc: isTr
        ? 'Makineleriniz için motor ve hidrolik yağ soğutucuları, radyatörler and fanlar.'
        : 'Engine and hydraulic oil coolers, radiators, and cooling fan systems for thermal control.',
      img: '/cooling.png',
      link: '/parts?category=Hardware'
    },
    {
      title: isTr ? 'KABİN CAMLARI' : 'GLASS',
      desc: isTr
        ? 'İş makineleri ve deliciler için darbeye ve sarsıntıya dayanıklı kabin camları ve emniyet camı çözümleri.'
        : 'High-durability safety glasses, windshields, and cabin glass panels for operator safety.',
      img: '/glass.png',
      link: '/parts?category=Hardware'
    }
  ];

  return (
    <div style={{ paddingTop: 104 }}>
      {/* Header */}
      <section style={{
        position: 'relative',
        background: '#212d45',
        padding: '72px 0 64px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-section.png)',
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
              PRODUCTS
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
          }}>{title}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, maxWidth: 620, color: 'rgba(255,255,255,0.75)', marginBottom: 0 }}>
            {subtitle}
          </p>
        </div>
      </section>

      {/* Grid Categories */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 30
          }}>
            {categories.map((cat, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: 200, width: '100%' }}>
                    <Image
                      src={cat.img.startsWith('/public') ? cat.img.replace('/public', '') : cat.img}
                      alt={cat.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      onError={(e: any) => {
                        // Fallback image in case the specific file doesn't exist
                        e.target.src = '/hero-image.png';
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(transparent 50%, rgba(33,45,69,0.85))',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 16, left: 20, right: 20
                    }}>
                      <h3 style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: '#ffffff',
                        fontFamily: 'var(--font-heading)',
                        margin: 0,
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}>{cat.title}</h3>
                    </div>
                  </div>
                  
                  <div style={{ padding: 24, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 20 }}>
                      {cat.desc}
                    </p>
                    <Link 
                      href={cat.link}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        color: 'var(--primary)', fontWeight: 700, fontSize: 14,
                        textDecoration: 'none',
                        marginTop: 'auto'
                      }}
                    >
                      {isTr ? 'İncele' : 'View Details'}
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
