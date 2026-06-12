'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function UndercarriageProductRange() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const title = isTr ? 'Yürüyüş Alt Takımı & Bileşenleri' : 'Undercarriage & Components';
  const subtitle = isTr
    ? 'Paletli deliciler ve iş makineleri için birinci sınıf tahrik dişlileri, yürüyüş makaraları ve komple alt takımlar.'
    : 'Premium drive sprockets, rollers, and complete undercarriage systems for crawler machines.';

  const components = isTr
    ? ['Avara Tekerlekler (Idlers)', 'Palet Pabuçları (Track Shoes)', 'Palet Zincirleri (Track Chains)']
    : ['Idlers', 'Track Shoes', 'Track Chains'];

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
            
            {/* Left: Description & Sections */}
            <div>
              <ScrollReveal>
                <h2 style={{ fontSize: 22, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 16 }}>
                  {isTr ? 'Yürüyüş Aksamı ve Ağır Hizmet Makaraları' : 'Undercarriage and Components'}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 28 }}>
                  {isTr
                    ? 'FED Mining Solutions and Parts olarak, küresel çapta tanınan üreticilerden tedarik edilen ve piyasadaki en kapsamlı garantiyle desteklenen yürüyüş alt takım bileşenleri sunuyoruz. Bu güvence, bileşenlerimizin kalitesine ve güvenilirliğine olan inancımızı yansıtmaktadır.'
                    : 'Undercarriage components sourced from a prominent, globally recognized manufacturer, offering unparalleled technical coverage and the most comprehensive warranty in the market. This assurance instills a high level of confidence in the quality and reliability of the components.'}
                </p>

                {/* Drive Sprockets */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>
                    {isTr ? 'TAHRİK DİŞLİLERİ' : 'DRIVE SPROCKETS'}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>
                    {isTr
                      ? 'Döküm veya sıcak dövme dişlilerimiz, tüm diş profili boyunca indüksiyonla sertleştirme işlemine tabi tutulur. Ardından, CNC tezgahlarında hassas bir şekilde delinir ve işlenir. Bu süreç, aşınmayı ve bakım maliyetlerini önemli ölçüde azaltarak servis ömrünü uzatır.'
                      : 'Sprockets, whether cast or hot-forged, undergo a thorough production process involving induction hardening across the entire tooth profile. Subsequently, they are meticulously processed and drilled using CNC machines in advanced machining centers.'}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {components.map(c => (
                      <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-main)', fontWeight: 600 }}>
                        <CheckCircle2 size={15} color="var(--primary)" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rollers Components */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>
                    {isTr ? 'MAKARALAR VE BİLEŞENLER' : 'ROLLERS COMPONENTS'}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>
                    {isTr
                      ? 'Buldozerler ve 1 ila 330 ton ağırlığındaki ekskavatörler için tek flanşlı, çift flanşlı ve iç flanşlı makaralar sunuyoruz. Zorlu koşullarda dayanıklılık sağlamak amacıyla -50°Cye varan ekstrem soğuklar için özel modellerimiz mevcuttur.'
                      : 'We provide a diverse range of rollers tailored for various equipment and applications. Our offerings include single-flange, double-flange, and inner flange rollers suitable for bulldozers and excavators spanning a weight range from 1 to 330 tons.'}
                  </p>
                </div>

                {/* Complete Undercarriages */}
                <div>
                  <h3 style={{ fontSize: 18, color: 'var(--text-main)', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>
                    {isTr ? 'KOMPLE ALT TAKIM SİSTEMLERİ' : 'COMPLETE UNDERCARRIAGES'}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 0 }}>
                    {isTr
                      ? 'Münferit yürüyüş parçalarının yanı sıra Türkiye ve Korede tasarlanmış, kuruluma hazır komple yürüyüş sistemleri sunuyoruz. Mini ekskavatörlerden büyük kaya delme makinelerine kadar geniş bir yelpazede hizmet sunmaktayız.'
                      : 'In addition to manufacturing individual undercarriage components, we offer fully assembled undercarriage systems designed in Turkey and Korea, ready for seamless installation. Our product spectrum spans from mini excavators to crawler drilling rigs.'}
                  </p>
                </div>

              </ScrollReveal>
            </div>

            {/* Right: Image & Action Card */}
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
                  src="/undercarriage.png"
                  alt="FED Mining - Alt Takim Bileşenleri"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                <h4 style={{ fontSize: 16, marginBottom: 10, color: 'var(--text-main)' }}>
                  {isTr ? 'Alt Takım Fiyat Teklifi Alın' : 'Get Undercarriage Quote'}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                  {isTr
                    ? 'İhtiyacınız olan makara, zincir veya komple yürüyüş takımını belirterek uzman ekibimizden fiyat teklifi isteyebilirsiniz.'
                    : 'Submit your undercarriage components list to get a custom quote and stock check from Turkey.'}
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link href="/parts?brand=All" className="btn btn-primary" style={{ flexGrow: 1, fontSize: 13 }}>
                    {isTr ? 'Parçalara Git' : 'Browse Parts'}
                  </Link>
                  <Link href="/contact" className="btn btn-secondary" style={{ flexGrow: 1, fontSize: 13 }}>
                    {isTr ? 'İletişime Geç' : 'Contact Us'}
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
