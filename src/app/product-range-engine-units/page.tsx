'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function EngineProductRange() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const title = isTr ? 'Motor Üniteleri & Parçaları' : 'Engine Units & Components';
  const subtitle = isTr
    ? 'Duruş sürelerini en aza indirmek ve makine performansını optimize etmek için ağır hizmet motor parçaları.'
    : 'Heavy-duty engine parts designed to minimize downtime and optimize machinery performance.';

  const blocks = isTr 
    ? ['Kısa Bloklar (Short Blocks)', 'Uzun Bloklar (Long Blocks)', 'Silindir Kafaları (Cylinder Heads)']
    : ['Short Blocks', 'Long Blocks', 'Cylinder Heads'];

  const shafts = isTr
    ? ['Krank Milleri (Crankshafts)', 'Eksantrik Milleri (Camshafts)', 'Gömlek Kitleri (Liner kits)']
    : ['Crankshafts', 'Camshafts', 'Liner kits'];

  const accessories = isTr
    ? ['Yağ Pompaları (Oil Pumps)', 'Yağ ve Su Soğutucuları (Coolers)', 'Motor Burçları (Bushings)']
    : ['Oil Pumps', 'Coolers', 'Bushings'];

  return (
    <div style={{ paddingTop: 104 }}>
      {/* Header */}
      <section style={{
        position: 'relative',
        background: '#212d45',
        padding: '56px 0 48px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-section.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/productrange" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#ffc03d', fontSize: 13, fontWeight: 700,
            textDecoration: 'none', marginBottom: 16,
            textTransform: 'uppercase', letterSpacing: '0.08em'
          }}>
            <ArrowLeft size={14} />
            {isTr ? 'Ürün Yelpazesine Dön' : 'Back to Product Range'}
          </Link>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: 12,
            fontFamily: 'var(--font-heading)',
          }}>{title}</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', maxWidth: 600 }}>{subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '64px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
            
            {/* Left: Text Details */}
            <div>
              <ScrollReveal>
                <h2 style={{ fontSize: 22, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 16 }}>
                  {isTr ? 'Yüksek Performanslı Motor Blokları ve Bileşenleri' : 'Engine Units'}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 28 }}>
                  {isTr
                    ? 'FED Mining Solutions and Parts olarak odak noktamız, etkili revizyonlar ve onarımlar yoluyla duruş sürelerini en aza indirmek ve makine performansını optimize etmektir. Kısa ve uzun bloklarımızın yanı sıra titizlikle monte edilmiş silindir kafalarımız, yatırımınızı en üst düzeye çıkarmak için ideal seçenekler olarak öne çıkar. Markamız güvenilirlik sağlamayı ve ürünlerimizi sağlam bir garantiyle desteklemeyi taahhüt eder.'
                    : 'At Fed Mining Solutions and Parts, our focus is on minimizing downtime and optimizing machine performance and speed through effective overhauls and repairs. Our short and long blocks, along with meticulously assembled cylinder heads, stand out as the ideal choices for maximizing your investment. Rest assured, our brand is committed to providing reliability and backing our products with a solid guarantee.'}
                </p>

                {/* Motor Blocks */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>
                    {isTr ? 'MOTOR BLOKLARI' : 'MOTOR BLOKS'}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>
                    {isTr
                      ? 'Dökme demir veya alüminyumdan üretilen bloklarımız, döküm ve üretimlerinin her aşamasında teknik mühendislerimiz tarafından sıkı kalite kontrollerinden geçirilir.'
                      : 'Manufactured from cast iron or aluminum, our blocks go through stringent quality controls overseen by our technical engineers at every stage of their development, molding, and production.'}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {blocks.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-main)', fontWeight: 600 }}>
                        <CheckCircle2 size={15} color="var(--primary)" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shaft Components */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>
                    {isTr ? 'MİL BİLEŞENLERİ' : 'SHAFT COMPONENTS'}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>
                    {isTr
                      ? 'Dövme çelikten üretilen bileşenlerimiz, titreşimleri azaltmak için hassas işleme ve titiz balanslama işlemlerinden geçer. Krank ve yatak muylularını güçlendirerek aşınmayı en aza indiriyoruz.'
                      : 'Crafted from forged steel, our components undergo subsequent treatments, precision machining, and meticulous balancing to mitigate vibrations. We emphasize the reinforcement of supports and main bearing journals.'}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {shafts.map(s => (
                      <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-main)', fontWeight: 600 }}>
                        <CheckCircle2 size={15} color="var(--primary)" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>
                    {isTr ? 'Soğutucu, Yağ Pompası ve Burçlar' : 'Cooler, Oil Pump, Bushings'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {accessories.map(a => (
                      <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-main)', fontWeight: 600 }}>
                        <CheckCircle2 size={15} color="var(--primary)" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

              </ScrollReveal>
            </div>

            {/* Right: Image & Action card */}
            <ScrollReveal direction="right">
              <div style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(33,45,69,0.18)',
                height: 340,
                marginBottom: 30
              }}>
                <Image
                  src="/hero-image.png"
                  alt="FED Mining - Motor Bloklari"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                <h4 style={{ fontSize: 16, marginBottom: 10, color: 'var(--text-main)' }}>
                  {isTr ? 'Motor Yedek Parça Teklifi Alın' : 'Get Engine Spare Parts Quote'}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                  {isTr
                    ? 'Motor modelinizi veya parça numaranızı belirterek satış ekibimizden hızlıca fiyat teklifi talep edebilirsiniz.'
                    : 'Submit your engine model number or part codes to get a custom quote within 24 hours.'}
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link href="/parts?category=Piston" className="btn btn-primary" style={{ flexGrow: 1, fontSize: 13 }}>
                    {isTr ? 'Parçalara Git' : 'Browse Parts'}
                  </Link>
                  <Link href="/contact" className="btn btn-secondary" style={{ flexGrow: 1, fontSize: 13 }}>
                    {isTr ? 'Bize Yazın' : 'Contact Us'}
                  </Link>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
