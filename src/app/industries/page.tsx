'use client';

import Link from 'next/link';
import { Pickaxe, Construction, Tractor, Settings, Truck, Trees, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function IndustriesPage() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const title = isTr ? 'Faaliyet Alanlarımız' : 'Industries We Serve';
  const subtitle = isTr 
    ? 'Ağır sanayi, madencilik, tarım ve lojistik sektörlerinde dünya standartlarında yedek parça tedariği.' 
    : 'World-class spare parts supply for heavy industry, mining, agriculture, and logistics sectors.';

  const industries = [
    {
      icon: Pickaxe,
      title: isTr ? 'Maden Ekipmanı Parçaları' : 'Mining Equipment Parts',
      desc: isTr
        ? 'Fed Madencilik Çözümleri, madencilik operasyonlarının verimliliğini ve karlılığını güvence altına alırken en yüksek endüstri standartlarını karşılayan kaya delicileri ve maden ekipmanı yedek parçalarını dünya çapında tedarik eder.'
        : 'Fed Mining Solutions supplies high-quality spare parts for mining equipment worldwide, meeting the highest industry standards while ensuring efficiency and profitability of mining operations.',
      color: '#ffc03d'
    },
    {
      icon: Construction,
      title: isTr ? 'İnşaat Ekipmanı Parçaları' : 'Construction Equipment Parts',
      desc: isTr
        ? 'FED Madencilik Çözümleri, ağır inşaat ekipmanları için geniş bir yüksek kaliteli yedek parça yelpazesi sunar. 30\'un üzerinde lider markanın orijinal ve yan sanayi yedek parça seçeneklerini tedarik etmekteyiz. Amacımız, motor bileşenleri, hidrolik sistemler, yürüyüş grupları ve aşınma parçaları dahil olmak üzere geniş envanterimizle ekipman duruş sürelerini en aza indirmektir.'
        : 'FED Mining Solutions offers a wide selection of high-quality spare parts for heavy construction equipment. We carry over 30 top brands and provide genuine parts and aftermarket options. Our goal is to minimize construction equipment downtime by stocking a large inventory of parts, including engine components, hydraulic systems, undercarriages, and ground engaging tools.',
      color: '#ff9f43'
    },
    {
      icon: Tractor,
      title: isTr ? 'Tarım Ekipmanları' : 'Farm Equipment',
      desc: isTr
        ? 'Fed Madencilik Çözümleri\'nde bir düzineden fazla marka için uyumlu tarım makineleri yedek parçalarını bulun. Yüksek kalite standartlarını karşılayan orijinal ve yan sanayi seçeneklerine sahibiz. Ekibimizin tüm süreci sorunsuz yönetmesiyle en iyi müşteri deneyimini yaşayın. Ekipmanınızın sorunsuz ve verimli çalışması için bize güvenin.'
        : 'Find compatible agricultural machinery spare parts from over a dozen brands at Fed Mining Solutions. We have genuine and aftermarket options that meet high quality standards. Get the best customer experience as our team ensures the entire process is hassle-free. Trust us to keep your equipment running smoothly and efficiently.',
      color: '#10b981'
    },
    {
      icon: Settings,
      title: isTr ? 'Motor ve Şanzıman Parçaları' : 'Engines & Transmissions',
      desc: isTr
        ? 'FED Madencilik Çözümleri, endüstriler arası motorlar ve şanzımanlar (aktarma organları) için lider bir yedek parça tedarikçisidir. Ağır makinelerin verimli çalışmasının önemini anlıyor ve müşterilerimizin iş kaybını en aza indirmek için güvenilir üreticilerden yüksek kaliteli parçalar sağlıyoruz.'
        : 'FED Mining Solutions is a leading supplier of spare parts for motors and transmissions across industries. We understand the significance of keeping heavy machinery running efficiently and provide high-quality parts from reliable manufacturers to minimize downtime for our customers.',
      color: '#60a5fa'
    },
    {
      icon: Truck,
      title: isTr ? 'Kamyon Aksesuarları ve Parçaları' : 'Truck Accessories & Parts',
      desc: isTr
        ? 'FED Madencilik Çözümleri, Amerikan ve Avrupa kamyon markaları için yüksek kaliteli kamyon aksesuarları ve yedek parçaları sunar. Kaliteli, uyumlu ve uygun fiyatlı ürünlerden oluşan geniş bir katalog sunmak için lider üreticilerle güçlü ilişkiler sürdürüyoruz.'
        : 'FED Mining Solutions offers high-quality truck accessories and parts for American and European truck brands. We maintain strong relationships with leading manufacturers to provide an extensive catalog of quality, compatible, and affordable products.',
      color: '#a78bfa'
    },
    {
      icon: Trees,
      title: isTr ? 'Ormancılık Ekipmanları' : 'Forestry Equipment',
      desc: isTr
        ? 'Ormancılık makineleriniz için yedek parçaları FED Madencilik Çözümleri\'nden alın. Tigercat, Caterpillar, John Deere ve Komatsu gibi sektör liderlerinin geniş bir yedek parça yelpazesini taşıyoruz. Uzmanlığımızla ekipmanlarınızı hızla onarmanıza ve bakımını yapmanıza yardımcı olabilir, arıza sürelerini en aza indirebiliriz. Güvenilir ve kaliteli yedek parçalar için bize güvenin.'
        : 'Get replacement parts for your forestry machines at FED Mining Solutions. We carry a wide range of spare parts from industry leaders such as Tigercat, Caterpillar, John Deere, and Komatsu. With our expertise, we can help you quickly repair and maintain your equipment, minimizing downtime. Trust us for reliable, high-quality spare parts.',
      color: '#ee5253'
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
          backgroundImage: 'url(/hero-mining.png)',
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
              INDUSTRIES &amp; SERVICES
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

      {/* Main Grid */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32
          }}>
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <ScrollReveal key={i} delay={i * 80} className="card" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 32,
                  borderRadius: 16,
                  borderTop: `4px solid ${ind.color}`,
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(33,45,69,0.03)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{
                      width: 56, height: 56, borderRadius: 12,
                      background: `${ind.color}15`,
                      border: `1px solid ${ind.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 24,
                    }}>
                      <Icon size={26} color={ind.color} />
                    </div>
                    <h3 style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      marginBottom: 16,
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {ind.title}
                    </h3>
                    <p style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: 'var(--text-muted)',
                      marginBottom: 24,
                    }}>
                      {ind.desc}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: ind.color,
                    textDecoration: 'none'
                  }}>
                    <span>{isTr ? 'Bilgi Al' : 'Request Info'}</span>
                    <ArrowRight size={14} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Banner */}
      <section style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                color: '#ffc03d', marginBottom: 12, textTransform: 'uppercase',
                padding: '4px 14px', background: 'rgba(255,192,61,0.1)',
                border: '1px solid rgba(255,192,61,0.25)', borderRadius: 99,
                fontFamily: 'var(--font-heading)',
              }}>{isTr ? 'GÜVENİLİR ORTAK' : 'TRUSTED PARTNER'}</span>
              <h2 style={{ fontSize: 32, lineHeight: 1.2, marginBottom: 20, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                {isTr ? 'Neden FED Madencilik?' : 'Why FED Mining Solutions?'}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 24 }}>
                {isTr 
                  ? 'Madencilik, inşaat ve ormancılık gibi zorlu endüstrilerde duruş süresi kayıplarının maliyetini çok iyi biliyoruz. FED Madencilik olarak, tüm faaliyet alanlarımızda orijinal ekipman özelliklerine tam uyum sağlayan yedek parçalar tedarik ediyor, operasyonel sürekliliğinizi en üst düzeyde koruyoruz.'
                  : 'We know how costly equipment downtime is in challenging sectors like mining, construction, and forestry. As FED Mining, we supply spare parts that fully comply with original equipment specifications across all our fields of operations, maximizing your operational continuity.'}
              </p>
              <div style={{ display: 'flex', gap: 16 }}>
                <Link href="/contact" className="btn btn-primary">
                  {isTr ? 'İletişime Geçin' : 'Contact Us'}
                </Link>
                <Link href="/parts" className="btn btn-secondary">
                  {isTr ? 'Kataloğu Keşfet' : 'Explore Catalog'}
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                {
                  title: isTr ? 'Hızlı ve Güvenilir Lojistik' : 'Fast & Reliable Logistics',
                  desc: isTr ? 'Türkiye\'den tüm maden ve şantiyelere doğrudan ekspres küresel sevkiyat sunuyoruz.' : 'We provide direct express global shipments from Turkey straight to mining and construction sites.',
                },
                {
                  title: isTr ? 'Geniş Stok Hacmi' : 'Large Inventory Depth',
                  desc: isTr ? '30.000\'den fazla parça referansına erişim ve sürekli güncellenen envanterimiz ile hızlı tedarik sağlıyoruz.' : 'We provide rapid supply with access to over 30,000 part references and a constantly updated stock.',
                },
                {
                  title: isTr ? 'Müşteri Odaklı Hizmet' : 'Client-Centric Approach',
                  desc: isTr ? 'B2B portalımız üzerinden drifter çalışma saatlerinizi takip ederek ağır bakım kitlerini adınıza rezerve ediyoruz.' : 'Through our B2B portal, we track your drifter hours and reserve overhaul kits specifically for you.',
                }
              ].map((adv, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 16 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    flexShrink: 0
                  }}>
                    <ShieldCheck size={20} color="#10b981" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6, fontFamily: 'var(--font-heading)' }}>{adv.title}</h4>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{adv.desc}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{
        background: 'linear-gradient(135deg, #1a2438 0%, #212d45 100%)',
        padding: '72px 0',
        textAlign: 'center',
        borderTop: '3px solid rgba(255,192,61,0.25)'
      }}>
        <div className="container">
          <h2 style={{ color: '#ffffff', fontSize: 30, marginBottom: 16, fontFamily: 'var(--font-heading)' }}>
            {isTr ? 'Ekipmanınız İçin Doğru Çözümler' : 'Right Solutions For Your Machinery'}
          </h2>
          <p style={{ maxWidth: 600, margin: '0 auto 32px', color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7 }}>
            {isTr 
              ? 'Aradığınız yedek parça ne olursa olsun, geniş üretici ağımız ve tecrübemiz ile hizmetinizdeyiz. Bizimle iletişime geçerek hızlı fiyat teklifi alabilirsiniz.'
              : 'Whatever spare part you are searching for, we are at your service with our wide manufacturing network and experience. Contact us to receive a quick quote.'}
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '12px 32px' }}>
            {isTr ? 'Teklif İste' : 'Request Quote'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
