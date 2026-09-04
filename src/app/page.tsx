'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Check, Plus, Minus, Send, Phone, Mail, Award, Compass, Heart, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  const { t, language } = useLanguage();
  const isTr = language === 'tr';

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0); // default open first

  // Dynamic content
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setContent(data);
        }
      })
      .catch(err => console.error('Failed to load dynamic content:', err));
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      alert(isTr ? 'Lütfen gerekli alanları doldurun.' : 'Please fill in the required fields.');
      return;
    }
    setSubmitStatus('loading');
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim() || 'Anonymous User',
          email,
          phone: '',
          message: `[Subject: ${subject}] ${message}`,
          items: [] // Empty items indicates direct contact form submission
        })
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const productCards = [
    {
      title: content?.products?.engineTitleEn || 'ENGINE UNITS',
      titleTr: content?.products?.engineTitleTr || 'MOTOR ÜNİTELERİ',
      href: '/product-range-engine-units',
      img: content?.products?.engineImg || '/engine_unit.png',
      desc: content?.products?.engineDescEn || 'Fed Mining Solutions and Parts provides OEM quality engine parts that meet OEM specifications. Our parts ensure high performance and durability, backed by an extensive warranty. Trust us for the best engine parts in the market today.',
      descTr: content?.products?.engineDescTr || 'Fed Mining Solutions and Parts, orijinal OEM spesifikasyonlarını karşılayan OEM kalitesinde motor parçaları sunar. Parçalarımız, kapsamlı bir garantiyle desteklenen yüksek performans ve dayanıklılık sağlar. Bugün pazardaki en iyi motor parçaları için bize güvenin.'
    },
    {
      title: content?.products?.powertrainTitleEn || 'POWERTRAIN',
      titleTr: content?.products?.powertrainTitleTr || 'ŞANZIMAN VE GÜÇ AKTARIMI',
      href: '/parts?category=Gear%20%26%20Shaft',
      img: content?.products?.powertrainImg || '/about-us-2.png',
      desc: content?.products?.powertrainDescEn || 'Believe in delivering the highest quality transmission/powertrain products to help our customers achieve unparalleled results. With Fed Mining Solutions, you can be confident that you are receiving the finest transmission/powertrain products on the market.',
      descTr: content?.products?.powertrainDescTr || 'Müşterilerimizin benzersiz sonuçlar elde etmesine yardımcı olmak için en yüksek kalitede şanzıman/güç aktarma organı ürünleri sunmaya inanıyoruz. Fed Mining Solutions ile piyasadaki en iyi şanzıman/güç aktarma organı ürünlerini alacağınızdan emin olabilirsiniz.'
    },
    {
      title: content?.products?.hydraulicTitleEn || 'HYDRAULIC',
      titleTr: content?.products?.hydraulicTitleTr || 'HİDROLİK SİSTEMLER',
      href: '/parts?category=Valve',
      img: content?.products?.hydraulicImg || '/service-1.png',
      desc: content?.products?.hydraulicDescEn || 'High-performance hydraulic pumps, valves, cylinders, and seal kits designed for extreme pressure and field durability. Tested for maximum reliability in rock drilling and mining operations.',
      descTr: content?.products?.hydraulicDescTr || 'Zorlu basınç koşullarında ve saha ortamında yüksek performans göstermesi için tasarlanmış hidrolik pompalar, valfler, silindirler ve sızdırmazlık kitleri. Kaya delme ve madencilik faaliyetlerinde maksimum güvenilirlik için test edilmiştir.'
    },
    {
      title: content?.products?.drifterTitleEn || 'DRIFTER & DRILLER PARTS',
      titleTr: content?.products?.drifterTitleTr || 'KAYA DELİCİ VE MATKAP PARÇALARI',
      href: '/product-range-drifter',
      img: content?.products?.drifterImg || '/drifter.png',
      desc: content?.products?.drifterDescEn || "Fed Mining Solutions, we partner with top manufacturers to provide you with high-quality industrial bearings and drifter parts. We're committed to delivering performance and reliability, with a wide selection and prompt order fulfillment. Choose Fed as your partner for success.",
      descTr: content?.products?.drifterDescTr || 'Kaya deliciler (drifterlar) için yüksek kaliteli bileşenler ve yedek parçalar sağlamak üzere lider üreticilerle ortaklık kuruyoruz. Geniş ürün yelpazemiz ve hızlı sipariş teslimatımızla performans ve güvenilirlik sunmaya kararlıyız. Başarı ortağınız olarak FED\'i seçin.'
    }
  ];

  const faqs = [
    {
      q: 'What types of heavy machinery parts do you offer?',
      qTr: 'Hangi tür ağır iş makinesi parçalarını sunuyorsunuz?',
      a: 'Explore our extensive range of heavy machinery parts, encompassing items such as excavator buckets, hydraulic cylinders, undercarriage components, and engine parts. For a comprehensive list, refer to our Product Range page.',
      aTr: 'Ekskavatör kovaları, hidrolik silindirler, yürüyüş alt takımı bileşenleri ve motor parçaları gibi geniş bir ağır iş makinesi parça yelpazesi sunuyoruz. Detaylı liste için Ürün Yelpazesi sayfamıza göz atabilirsiniz.'
    },
    {
      q: 'How can I place an order?',
      qTr: 'Nasıl sipariş verebilirim?',
      a: "To place an order, just explore our product catalog, choose the items you require, and submit your selection via email or our Quote Request form. Rest assured, we'll promptly respond to your email. Feel free to contact us by phone if you have any inquiries.",
      aTr: 'Sipariş vermek için ürün kataloğumuzu inceleyin, ihtiyacınız olan parçaları seçin ve talebinizi sepetimiz veya teklif isteme formumuz üzerinden gönderin. Talebinize hızla yanıt vereceğiz. Herhangi bir sorunuz varsa bize telefonla da ulaşabilirsiniz.'
    },
    {
      q: 'Are your heavy machinery parts compatible with specific brands/models?',
      qTr: 'Ağır makine parçalarınız belirli marka/modellerle uyumlu mu?',
      a: 'Our product listings include compatibility information, specifying the brands and models for which each part is suitable. Please review the product details or contact our customer support if you have any compatibility concerns.',
      aTr: 'Ürün listelerimiz, her parçanın hangi marka ve modellere uygun olduğunu belirten uyumluluk bilgilerini içerir. Detaylar için ürün sayfalarını inceleyebilir veya müşteri desteğimizle iletişime geçebilirsiniz.'
    },
    {
      q: 'How do I track my order?',
      qTr: 'Siparişimi nasıl takip edebilirim?',
      a: "Once your order is processed and shipped, you will receive a confirmation email with a tracking status. You can also sign in to your Client Portal to monitor all past quotes, machine hours, and shipping details.",
      aTr: 'Siparişiniz işleme alınıp sevk edildikten sonra, takip durumunu içeren bir onay e-postası alacaksınız. Ayrıca geçmiş tekliflerinizi, makine çalışma saatlerinizi ve gönderim detaylarınızı takip etmek için Müşteri Portalına giriş yapabilirsiniz.'
    },
    {
      q: 'What is your return policy?',
      qTr: 'İade politikanız nedir?',
      a: 'We have a hassle-free return policy. If you receive a defective or incorrect product, please contact our customer support within 14 days of receiving your order. We will guide you through the return process and arrange for a replacement or refund.',
      aTr: 'Sorunsuz bir iade politikamız mevcuttur. Kusurlu veya yanlış bir ürün alırsanız, lütfen siparişinizi teslim aldıktan sonraki 14 gün içinde müşteri desteğimizle iletişime geçin. İade sürecinde size rehberlik edip değişim veya para iadesi sağlayacağız.'
    }
  ];

  return (
    <div style={{ paddingTop: 0 }}>

      {/* ═══════════════════════════════════════════════════
          SECTION 1: HERO (High-Impact Industrial B2B Header)
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: '900px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #172033 0%, #212d45 60%, #151d2f 100%)',
        overflow: 'hidden',
      }}>
        {/* Animated background glow & hero scanlines */}
        <div className="hero-animated-bg" />
        <div className="hero-scan" />

        {/* Hero Background image with dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-section.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.16,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(33,45,69,0.3) 0%, rgba(23,32,51,0.95) 100%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '120px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }} className="responsive-grid-1col">
            <div style={{ maxWidth: '780px' }}>
              
              {/* Gold Eyebrow Badge */}
              <div style={{ marginBottom: 24 }}>
                <span className="badge-gold">
                  <span className="badge-gold-dot" />
                  {content?.hero?.[isTr ? 'subtitleTr' : 'subtitleEn'] || (isTr ? 'Hayalinizi Gerçekleştirin ve İlham Verin' : 'Achieve Your Dream and Inspire')}
                </span>
              </div>

              {/* H1 Title */}
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
                marginBottom: 24,
                letterSpacing: '-0.02em',
              }}>
                {content?.hero?.[isTr ? 'titleTr' : 'titleEn'] || (isTr ? 'MADENCİLİK ÇÖZÜMLERİ VE YEDEK PARÇALAR' : 'MINING SOLUTIONS AND PARTS')}
              </h1>

              {/* Description */}
              <p style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: 48,
                maxWidth: '680px'
              }}>
                {content?.hero?.[isTr ? 'descTr' : 'descEn'] || (isTr
                  ? 'Operasyonlarınızı optimize etmek için gelişmiş tekniklerle endüstri standartlarını aşın. Başarı için olağanüstü parçalar konusunda bize güvenin.'
                  : 'Exceed industry standards with advanced techniques to optimize your operations. Trust us for exceptional parts for success.')}
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/industries" className="btn btn-primary" style={{
                  padding: '16px 42px', fontSize: 15, fontWeight: 700, borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.04em',
                  boxShadow: '0 8px 25px rgba(255, 192, 61, 0.3)'
                }}>
                  <span>{isTr ? 'Hizmetlerimiz' : 'Our Services'}</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="btn" style={{
                  padding: '16px 42px', fontSize: 15, fontWeight: 700, borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.04em',
                  backgroundColor: 'rgba(255,255,255,0.06)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(8px)', transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffc03d';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.borderColor = '#ffc03d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}>
                  {isTr ? 'Bize Ulaşın' : 'Contact Us'}
                </Link>
              </div>

            </div>

            {/* Right side floating product catalog preview card */}
            <div className="desktop-nav" style={{ width: 360, flexShrink: 0 }}>
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,192,61,0.4)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 30px rgba(255,192,61,0.15)',
                position: 'relative',
                background: '#1a243a',
                transition: 'transform 0.4s ease',
              }} className="float">
                <div style={{ position: 'relative', height: 420, width: '100%' }}>
                  <Image
                    src={content?.hero?.imageUrl || '/hero-mining.png'}
                    alt="FED Mining - Drifter parts"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(23,32,51,0.98) 0%, rgba(23,32,51,0.85) 60%, transparent 100%)',
                  padding: '36px 24px 24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 10px', borderRadius: 99, background: 'rgba(255,192,61,0.15)',
                    border: '1px solid rgba(255,192,61,0.4)', marginBottom: 8
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffc03d' }} />
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#ffc03d', letterSpacing: '0.08em' }}>SANDVIK &amp; EPIROC COMPATIBLE</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                    {isTr ? 'OEM uyumlu drifter & kaya delici parçaları' : 'OEM compatible rock drill & drifter components'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: SUCCESS & STATS
      ═══════════════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        paddingTop: 110,
        paddingBottom: 110,
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="responsive-grid-1col">
            
            {/* Left text */}
            <ScrollReveal direction="left">
              <div>
                <div style={{ marginBottom: 16 }}>
                  <span className="badge-gold">
                    <span className="badge-gold-dot" />
                    {content?.statsSection?.[isTr ? 'subtitleTr' : 'subtitleEn'] || (isTr ? 'Yenilmez Başarımız' : 'Our Undefeated Success')}
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  lineHeight: 1.25,
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: 24,
                  letterSpacing: '-0.01em',
                }}>
                  {content?.statsSection?.[isTr ? 'titleTr' : 'titleEn'] || (isTr 
                    ? 'Operasyonlarınızı optimize etmenin daha verimli bir yolunu mu arıyorsunuz?' 
                    : 'Are you looking for a more efficient way to optimize your operations?')}
                </h2>
                <p style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: 35,
                }}>
                  {content?.statsSection?.[isTr ? 'descTr' : 'descEn'] || (isTr
                    ? 'Başarıya ulaşmanıza yardımcı olacak olağanüstü parçaları sunmak için uzmanlığımıza ve deneyimimize güvenin. Operasyonlarınızı bir üst seviyeye taşımanıza yardımcı olalım.'
                    : 'Trust in our expertise and experience to deliver exceptional parts that can help set you up for success. Let us help you take your operations to the next level.')}
                </p>
                <Link href="/contact" className="btn btn-primary" style={{
                  padding: '15px 45px', fontSize: 14, fontWeight: 500, borderRadius: 0, textTransform: 'uppercase'
                }}>
                  {isTr ? 'Bizimle Çalışın' : 'Work With Us'}
                </Link>
              </div>
            </ScrollReveal>

            {/* Right stats cards */}
            <ScrollReveal direction="right">
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
                boxShadow: '0 20px 50px rgba(33,45,69,0.06)',
                padding: 16,
                borderRadius: 16,
                background: '#f8fafc',
                border: '1px solid var(--border-color)',
              }}>
                {/* Stat 1 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '40px 30px',
                  borderRadius: 12,
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }} className="hover-card-border">
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#212d45', fontFamily: 'var(--font-heading)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                    {content?.statsSection?.stat1Value || '30.000+'}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
                    {content?.statsSection?.[isTr ? 'stat1LabelTr' : 'stat1LabelEn'] || (isTr ? 'Erişilebilir Parça Numarası' : 'Accessible Part Numbers')}
                  </p>
                </div>

                {/* Stat 2 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '40px 30px',
                  borderRadius: 12,
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }} className="hover-card-border">
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#212d45', fontFamily: 'var(--font-heading)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                    {content?.statsSection?.stat2Value || '56+'}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
                    {content?.statsSection?.[isTr ? 'stat2LabelTr' : 'stat2LabelEn'] || (isTr ? 'Saygın İş Ortağı' : 'Reputable Business Partners')}
                  </p>
                </div>

                {/* Stat 3 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '40px 30px',
                  borderRadius: 12,
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }} className="hover-card-border">
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#212d45', fontFamily: 'var(--font-heading)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                    {content?.statsSection?.stat3Value || '5+'}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
                    {content?.statsSection?.[isTr ? 'stat3LabelTr' : 'stat3LabelEn'] || (isTr ? 'Günlük Operasyon' : 'Daily Operation')}
                  </p>
                </div>

                {/* Stat 4 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '40px 30px',
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }} className="hover-card-border">
                  <div style={{ color: '#ffc03d', marginBottom: 8 }}>
                    <Shield size={32} />
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    {isTr ? 'Müşterilerimizin Güveni' : 'Our Customers Value'}
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: PARTS RANGE
      ═══════════════════════════════════════════════════ */}
      <section style={{
        background: '#f8fafc',
        paddingTop: 110,
        paddingBottom: 110,
        borderTop: '1px solid var(--border-color)',
      }}>
        <div className="container">
          
          {/* Section Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 60,
          }}>
            <div>
              <div style={{ marginBottom: 12 }}>
                <span className="badge-gold">
                  <span className="badge-gold-dot" />
                  {isTr ? 'HAYALİNİZİ GERÇEKLEŞTİRİN VE İLHAM VERİN' : 'ACHIEVE YOUR DREAM AND INSPIRE'}
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                fontFamily: 'var(--font-heading)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                {isTr ? 'PARÇA YELPAZESİ' : 'PARTS RANGE'}
              </h2>
            </div>

            <Link href="/productrange" className="btn btn-primary" style={{
              padding: '16px 32px',
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 8,
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#ffffff',
              color: '#212d45',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffc03d';
              e.currentTarget.style.color = '#212d45';
              e.currentTarget.style.borderColor = '#ffc03d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#212d45';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}>
              <span>{isTr ? 'Ürün Yelpazesini İnceleyin' : 'To View Product Range'}</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: 28,
          }}>
            {productCards.map((card, idx) => (
              <ScrollReveal key={idx} delay={idx * 60}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                }}
                className="hover-card-border"
                >
                  <div style={{ position: 'relative', height: 220, width: '100%', overflow: 'hidden' }}>
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', top: 14, left: 14,
                      background: 'rgba(33,45,69,0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffc03d',
                      padding: '4px 10px',
                      borderRadius: 99,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      OEM COMPATIBLE
                    </div>
                  </div>
                  <div style={{ padding: 28, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{
                        fontSize: 18,
                        fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--text-main)',
                        marginBottom: 12,
                      }}>
                        <Link href={card.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {isTr ? card.titleTr : card.title}
                        </Link>
                      </h3>
                      <p style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: 'var(--text-muted)',
                        marginBottom: 24,
                      }}>
                        {isTr ? card.descTr : card.desc}
                      </p>
                    </div>

                    <Link href={card.href} style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                      <span>{isTr ? 'Detayları Gör' : 'View Details'}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: SUSTAINABILITY & BEST PRACTICES
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: '#212d45',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px' }} className="responsive-grid-1col">
          
          {/* Left panel - Sustainability */}
          <div style={{
            position: 'relative',
            padding: '90px 70px',
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Background image & overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/about-us.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              opacity: 0.12,
            }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '540px' }}>
              <div style={{ marginBottom: 16 }}>
                <span className="badge-gold">
                  <span className="badge-gold-dot" />
                  {content?.sustainability?.[isTr ? 'subtitleTr' : 'subtitleEn'] || (isTr ? 'Sürdürülebilirlik' : 'Sustainability')}
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                marginBottom: 24,
                letterSpacing: '-0.01em',
              }}>
                {content?.sustainability?.[isTr ? 'titleTr' : 'titleEn'] || (isTr ? 'İnsanları Sağlıklı ve Güvende Tutmaya Kararlıyız' : 'Committed To Keep People Healthy & Safe')}
              </h2>
              <p style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.85)',
                marginBottom: 40,
              }}>
                {content?.sustainability?.[isTr ? 'descTr' : 'descEn'] || (isTr
                  ? 'Amacımız insanların sağlıklı ve güvende kalmasına yardımcı olmaktır ve dünya çapında refahı desteklemek için sürekli yeni yollar bulmaya kararlıyız. Herkesin en iyi hayatını yaşayabileceği bir dünyaya ulaşmak için birlikte çalışalım.'
                  : "Our goal is to help people stay healthy and safe, and we are committed to constantly finding new ways to support well-being worldwide. Let's work together to achieve a world where everyone can live their best lives.")}
              </p>
              <Link href="/contact" className="btn btn-primary" style={{
                padding: '16px 40px', fontSize: 14, fontWeight: 700, borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.04em'
              }}>
                {isTr ? 'İletişime Geçin' : 'Get In Touch'}
              </Link>
            </div>
          </div>

          {/* Right panel - Best practices */}
          <div style={{
            position: 'relative',
            backgroundColor: '#ffc03d',
            padding: '90px 70px',
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Background image & overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/about-us-2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              opacity: 0.08,
            }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '540px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 99, background: 'rgba(33,45,69,0.12)',
                border: '1px solid rgba(33,45,69,0.25)', marginBottom: 16
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#212d45' }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#212d45', letterSpacing: '0.1em' }}>
                  {isTr ? 'EN İYİ UYGULAMALARI TAKİP EDİYORUZ' : 'WE FOLLOW BEST PRACTICES'}
                </span>
              </div>
              <p style={{
                fontSize: 22,
                fontStyle: 'italic',
                lineHeight: 1.55,
                color: '#212d45',
                fontWeight: 600,
                marginBottom: 35,
                fontFamily: 'var(--font-heading)',
              }}>
                {isTr
                  ? '“Daha parlak bir gelecek için sürdürülebilirliği, modern teknolojiyi ve zamanında planlamayı benimseyelim. Birlikte, işimizde ve dünyada olumlu bir etki yaratabiliriz.”'
                  : '“Let’s embrace sustainability, modern technology, and timely planning for a brighter future. Together, we can make a positive impact in our business and to the world.”'}
              </p>

              {/* Bullet list */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                {[
                  { en: content?.sustainability?.bullet1En || 'Sustainability', tr: content?.sustainability?.bullet1Tr || 'Sürdürülebilirlik' },
                  { en: content?.sustainability?.bullet2En || 'Project On Time', tr: content?.sustainability?.bullet2Tr || 'Zamanında Proje Teslimi' },
                  { en: content?.sustainability?.bullet3En || 'Modern Technology', tr: content?.sustainability?.bullet3Tr || 'Modern Teknoloji' },
                  { en: content?.sustainability?.bullet4En || 'Latest Designs', tr: content?.sustainability?.bullet4Tr || 'En Yeni Tasarımlar' }
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    fontSize: 17,
                    fontWeight: 800,
                    color: '#212d45',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: '50%',
                      backgroundColor: '#212d45', color: '#ffc03d',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 900, flexShrink: 0
                    }}>
                      ✓
                    </span>
                    <span>{isTr ? item.tr : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: REQUEST A QUOTE & FAQS
      ═══════════════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        paddingTop: 110,
        paddingBottom: 110,
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="responsive-grid-1col">
            
            {/* Left side: Request a quote form */}
            <ScrollReveal direction="left">
              <div style={{
                backgroundColor: '#212d45',
                padding: '54px 48px',
                color: '#ffffff',
                borderRadius: 18,
                boxShadow: '0 20px 50px rgba(33,45,69,0.12)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  marginBottom: 10,
                  letterSpacing: '-0.01em',
                }}>
                  {isTr ? 'Teklif Talebi' : 'Request a Quote'}
                </h2>
                <p style={{
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.75)',
                  marginBottom: 36,
                }}>
                  {isTr ? 'Herhangi bir yardıma veya desteğe mi ihtiyacınız var?' : 'Are you in need of any kind of assistance or support?'}
                </p>

                {/* Form fields */}
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <input
                        type="text"
                        placeholder={isTr ? 'Adınız' : 'First Name'}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{
                          width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', fontSize: 14,
                          borderRadius: 8, transition: 'border-color 0.2s', outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder={isTr ? 'Soyadınız' : 'Last Name'}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{
                          width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', fontSize: 14,
                          borderRadius: 8, transition: 'border-color 0.2s', outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder={isTr ? 'E-posta Adresiniz (Zorunlu)' : 'Email Address (Required)'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', fontSize: 14,
                        borderRadius: 8, transition: 'border-color 0.2s', outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={isTr ? 'Konu' : 'Subject'}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      style={{
                        width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', fontSize: 14,
                        borderRadius: 8, transition: 'border-color 0.2s', outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder={isTr ? 'Mesajınız (Zorunlu)' : 'Your Message (Required)'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      style={{
                        width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', fontSize: 14,
                        borderRadius: 8, resize: 'vertical', transition: 'border-color 0.2s', outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    style={{
                      padding: '16px 40px', backgroundColor: '#ffc03d', border: 'none',
                      color: '#212d45', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      borderRadius: 8, transition: 'all 0.25s', fontFamily: 'var(--font-heading)',
                      boxShadow: '0 8px 24px rgba(255,192,61,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.color = '#212d45';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffc03d';
                      e.currentTarget.style.color = '#212d45';
                    }}
                  >
                    <span>{isTr ? 'Bizimle İletişime Geçin' : 'Contact Us'}</span>
                    <Send size={16} />
                  </button>

                  {submitStatus === 'success' && (
                    <p style={{ color: '#10b981', fontSize: 14, margin: '10px 0 0', fontWeight: 600 }}>
                      {isTr ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent successfully!'}
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: 14, margin: '10px 0 0', fontWeight: 600 }}>
                      {isTr ? 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.' : 'An error occurred, please try again later.'}
                    </p>
                  )}
                </form>
              </div>
            </ScrollReveal>

            {/* Right side: FAQs */}
            <ScrollReveal direction="right">
              <div>
                <div style={{ marginBottom: 12 }}>
                  <span className="badge-gold">
                    <span className="badge-gold-dot" />
                    {isTr ? 'DAHA FAZLA BİLGİ EDİN' : 'LEARN MORE FROM'}
                  </span>
                </div>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-main)',
                  marginBottom: 35,
                  letterSpacing: '-0.01em',
                }}>
                  {isTr ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
                </h2>

                {/* FAQ items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          style={{
                            width: '100%', padding: '22px 24px', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            background: isOpen ? '#f8fafc' : '#ffffff', border: 'none', cursor: 'pointer',
                            textAlign: 'left', transition: 'background-color 0.2s ease',
                          }}
                        >
                          <span style={{
                            fontSize: 16, fontWeight: 700, color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                            fontFamily: 'var(--font-heading)', paddingRight: 16,
                          }}>
                            {isTr ? faq.qTr : faq.q}
                          </span>
                          <span style={{ color: isOpen ? 'var(--primary)' : 'var(--text-muted)', flexShrink: 0 }}>
                            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                          </span>
                        </button>
                        {isOpen && (
                          <div style={{
                            padding: '22px 24px', borderTop: '1px solid var(--border-color)',
                            fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)',
                            background: '#ffffff',
                          }}>
                            {isTr ? faq.aTr : faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .hover-card-border:hover {
          border-color: var(--primary) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        @media (max-width: 768px) {
          .responsive-grid-1col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
