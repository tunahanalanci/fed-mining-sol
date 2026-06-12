'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Shield, Sparkles, Warehouse, ArrowRight, Truck, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function OperationsPage() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const title = isTr ? 'Operasyonlarımız' : 'Our Operations';
  const subtitle = isTr 
    ? 'Tedarik zincirimizin her aşamasında mükemmellik, dayanıklılık ve yüksek verimlilik.' 
    : 'Supply chain excellence, durability, and high efficiency at every stage of production.';

  const sections = [
    {
      icon: Sparkles,
      title: isTr ? 'Başarı İçin Ortaklık' : 'Partnering for Success',
      desc: isTr
        ? 'Mükemmel yedek parçalar üretmenin temelinde yüksek kaliteli hammadde ve bileşenlerin yattığını biliyoruz. Güvenilir ve sektör standartlarını aşan ham maddeleri tedarik etmek için kalitemize ortak olan tedarikçilerle güçlü ilişkiler kuruyoruz.'
        : 'Our journey begins with meticulous sourcing. We understand the critical role that top-grade raw materials and components play in crafting exceptional mining machine parts. We forge strong relationships with reliable suppliers who share our commitment to quality.',
      bullets: isTr 
        ? ['Güvenilir Tedarikçiler', 'Birinci Sınıf Hammaddeler', 'Uyumlu Bileşenler'] 
        : ['Reliable Suppliers', 'Top-Grade Raw Materials', 'Compatible Components'],
      img: '/about-us-2.png'
    },
    {
      icon: Shield,
      title: isTr ? 'Her Aşamada Kalite Mükemmelliği' : 'Excellence at Every Stage',
      desc: isTr
        ? 'Kalite, üretim sürecimizin temel taşıdır. Her yedek parçanın mükemmelliğini garanti altına almak için sıkı kalite kontrol önlemleri her aşamaya sorunsuz bir şekilde entegre edilmiştir. Uzman ekibimiz, her bir parçanın en yüksek dayanıklılık standartlarını karşılamasını sağlar.'
        : 'Quality is the cornerstone of our manufacturing process. Rigorous quality control measures are seamlessly integrated at every stage to guarantee the excellence of our products. Our dedicated team of professionals ensures that each mining machine part meets stringent quality standards.',
      bullets: isTr
        ? ['Sıkı Kalite Kontrolü', 'Garantili Dayanıklılık', 'Orijinal Tolerans Değerleri']
        : ['Rigorous Quality Control', 'Guaranteed Durability', 'OEM Tolerance Matching'],
      img: '/service-1.png'
    },
    {
      icon: Warehouse,
      title: isTr ? 'Verimliliğin Hassasiyetle Buluştuğu Yer' : 'Where Efficiency Meets Precision',
      desc: isTr
        ? 'Son teknolojiye sahip depolarımız sadece depolama alanları değil, aynı zamanda çok çeşitli madencilik yedek parçalarını verimli bir şekilde yönetmek için tasarlanmış stratejik merkezlerdir. Geniş depolama alanlarımızda parçaların uzun ömürlü ve kaliteli kalması için en uygun koşulları koruyoruz.'
        : 'Our state-of-the-art warehouses are more than just storage spaces – they are strategic hubs designed to handle diverse mining machine parts efficiently. Equipped with the latest technology, our spacious facilities maintain optimal conditions for storage.',
      bullets: isTr
        ? ['Modern Depolama Alanları', 'Etkin Envanter Yönetimi', 'Zamanında Teslimatlar']
        : ['Storage Facilities', 'Inventory Management', 'Timely Deliveries'],
      img: '/service-3.png'
    }
  ];

  return (
    <div style={{ paddingTop: 104 }}>
      {/* Hero Header */}
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
              OPERATIONS
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

      {/* Main Operations Sections */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            const isEven = i % 2 === 0;

            return (
              <div 
                key={i} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                  gap: 64, 
                  alignItems: 'center' 
                }}
              >
                {/* Text Block */}
                <ScrollReveal direction={isEven ? 'left' : 'right'} style={{ order: isEven ? 1 : 2 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 52, height: 52, borderRadius: 12,
                    background: 'rgba(255, 192, 61, 0.1)',
                    border: '1px solid rgba(255, 192, 61, 0.2)',
                    marginBottom: 24
                  }}>
                    <Icon size={24} color="#ffc03d" />
                  </div>
                  <h2 style={{ fontSize: 26, marginBottom: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                    {sec.title}
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 24 }}>
                    {sec.desc}
                  </p>
                  
                  {/* Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {sec.bullets.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-main)', fontWeight: 600 }}>
                        <CheckCircle2 size={16} color="var(--primary)" />
                        {b}
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Image Block */}
                <ScrollReveal direction={isEven ? 'right' : 'left'} style={{ order: isEven ? 2 : 1 }}>
                  <div style={{
                    position: 'relative',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 20px 48px rgba(33,45,69,0.12)',
                    height: 380
                  }}>
                    <Image
                      src={sec.img}
                      alt={sec.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #1a2438 0%, #212d45 100%)',
        padding: '72px 0',
        borderTop: '3px solid rgba(255,192,61,0.25)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: '#ffffff', fontSize: 28, marginBottom: 16 }}>
            {isTr ? 'Tedarik Zincirinde Mükemmelliği Deneyimleyin' : 'Experience Supply Chain Excellence'}
          </h2>
          <p style={{ maxWidth: 540, margin: '0 auto 32px', color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
            {isTr 
              ? 'Müşteri memnuniyetini garanti altına almak için en kaliteli malzemeleri ve en iyi lojistik kanallarını kullanıyoruz.' 
              : 'We utilize the highest quality raw materials and efficient logistics to guarantee customer satisfaction.'}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/parts" className="btn btn-primary">
              {isTr ? 'Kataloğumuza Git' : 'Browse Catalog'}
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-secondary-light">
              {isTr ? 'Bizimle Çalışın' : 'Work With Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
