'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Settings, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function DrifterProductRange() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const title = isTr ? 'Drifter & Delici Üniteleri' : 'Drifter & Driller Components';
  const subtitle = isTr
    ? 'Yeraltı ve yerüstü deliciler için yüksek mukavemetli komple drifter üniteleri ve yedek parçalar.'
    : 'High-strength complete drifter units and spare parts for underground and surface rock drills.';

  const surfaceMachines = [
    'Crawler Hydraulic', 'PANTER', 'RANGER', 'TIGER', 'DX700', 'DP1500I', 'DX800', 'DX800C1', 'DG710'
  ];

  const undergroundMachines = [
    'TAMROCK-SONDAJ MACHINE DD421', 'DL331', 'DS311', 'DD320S', 'JUMBO', 'DD321', 'DD411', 'DS421'
  ];

  const drifterModels = [
    'RDX5', 'RD1840C', 'RD1635CF', 'RD900', 'RD535', 'RD525', 'RD520', 'RD414', 'RD314', 'RD106',
    'HLX5', 'HL1560T', 'HL1560ST', 'HL1060T', 'HL820T', 'HL710S', 'HL710', 'HL650', 'HF820T', 'HL510',
    'HL300', 'HL200'
  ];

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

      {/* Main Content */}
      <section style={{ padding: '64px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}>
            
            {/* Left Column: Description & Compatibility */}
            <div>
              <ScrollReveal>
                <h2 style={{ fontSize: 22, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 16 }}>
                  {isTr ? 'Drifter & Kaya Delici Çözümleri' : 'Drifter & Driller Components'}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 28 }}>
                  {isTr
                    ? 'Madencilik ve tünel açma sektöründe hızlı bir büyüme yaşayan FED Mining Solutions and Parts, yeraltı ve yerüstü delici yükleyici makinelerinin yanı sıra drifter makineleri için yenilikçi ve verimli çözümler üretmeye odaklanmıştır. Sektörde lider olmayı hedefleyerek, alternatif ve hızlı çözümler sunma konusunda öncüyüz. Uzman teknik ekibimiz, müşterilerimizin işlerinin kesintisiz sürmesini sağlamak için yüksek kaliteli uyumlu yedek parçalar ve revizyon hizmetleri sunar.'
                    : 'FED Mining Solutions and Parts, experiencing rapid growth in the mining and tunneling industry, has embarked on producing innovative and efficient solutions for underground and surface drilling loader machines as well as drifter machines. Aspiring to lead the sector, we aim to be pioneers in delivering alternative and swift solutions. Our dedicated professional team takes pride in offering spare parts and services to ensure our valued customers experience uninterrupted business operations.'}
                </p>

                {/* Surface Machines */}
                <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 12 }}>
                  {isTr ? 'Yer Üstü Sondaj Makineleri' : 'Surface Mining Machines'}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>
                  {isTr 
                    ? 'Açık ocak madenciliğinin zorlu gereksinimlerini karşılamak, yüksek verimlilik ve güvenlik sunmak üzere tasarlanmış makineler:' 
                    : 'Designed to meet the demanding requirements of open-pit mining, offering high productivity, reliability, and safety:'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                  {surfaceMachines.map(m => (
                    <span key={m} style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.18)', borderRadius: 4, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>{m}</span>
                  ))}
                </div>

                {/* Underground Machines */}
                <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 12 }}>
                  {isTr ? 'Yer Altı Sondaj Makineleri' : 'Underground Mining Machines'}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                  {undergroundMachines.map(m => (
                    <span key={m} style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#d97706', border: '1px solid rgba(245, 158, 11, 0.18)', borderRadius: 4, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>{m}</span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Drifter Models Grid */}
            <ScrollReveal direction="right" className="card" style={{ padding: 32 }}>
              <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Settings size={18} color="var(--primary)" />
                {isTr ? 'Uyumlu Drifter Modelleri' : 'Compatible Drifters'}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                {isTr
                  ? 'Aşağıdaki drifter modelleri ile uyumlu komple revizyon kitleri, pistonlar, conta takımları ve diğer mekanik parçaları üretiyoruz.'
                  : 'We supply high-quality replacement parts, pistons, seal kits, and overhaul components for the following rock drill models.'}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: 8,
                maxHeight: 480,
                overflowY: 'auto',
                paddingRight: 10,
                marginBottom: 24
              }}>
                {drifterModels.map(model => (
                  <div key={model} style={{
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    padding: '8px 10px',
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {model}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/parts?brand=All" className="btn btn-primary" style={{ width: '100%' }}>
                  {isTr ? 'Yedek Parça Araması Yap' : 'Search Spare Parts'}
                  <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn btn-secondary" style={{ width: '100%' }}>
                  {isTr ? 'Teklif İste' : 'Request Quote'}
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
