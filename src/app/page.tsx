'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Check, Plus, Minus, Send, Phone, Mail, Award, Compass, Heart } from 'lucide-react';
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
      title: 'ENGINE UNITS',
      titleTr: 'MOTOR ÜNİTELERİ',
      href: '/product-range-engine-units',
      img: '/engine_unit.png',
      desc: 'Fed Mining Solutions and Parts provides OEM quality engine parts that meet OEM specifications. Our parts ensure high performance and durability, backed by an extensive warranty. Trust us for the best engine parts in the market today.',
      descTr: 'Fed Mining Solutions and Parts, orijinal OEM spesifikasyonlarını karşılayan OEM kalitesinde motor parçaları sunar. Parçalarımız, kapsamlı bir garantiyle desteklenen yüksek performans ve dayanıklılık sağlar. Bugün pazardaki en iyi motor parçaları için bize güvenin.'
    },
    {
      title: 'POWERTRAIN',
      titleTr: 'ŞANZIMAN VE GÜÇ AKTARIMI',
      href: '/parts?category=Gear%20%26%20Shaft',
      img: '/about-us-2.png',
      desc: 'Believe in delivering the highest quality transmission/powertrain products to help our customers achieve unparalleled results. With Fed Mining Solutions, you can be confident that you are receiving the finest transmission/powertrain products on the market.',
      descTr: 'Müşterilerimizin benzersiz sonuçlar elde etmesine yardımcı olmak için en yüksek kalitede şanzıman/güç aktarma organı ürünleri sunmaya inanıyoruz. Fed Mining Solutions ile piyasadaki en iyi şanzıman/güç aktarma organı ürünlerini alacağınızdan emin olabilirsiniz.'
    },
    {
      title: 'HYDRAULIC',
      titleTr: 'HİDROLİK SİSTEMLER',
      href: '/parts?category=Valve',
      img: '/service-1.png',
      desc: 'High-performance hydraulic pumps, valves, cylinders, and seal kits designed for extreme pressure and field durability. Tested for maximum reliability in rock drilling and mining operations.',
      descTr: 'Zorlu basınç koşullarında ve saha ortamında yüksek performans göstermesi için tasarlanmış hidrolik pompalar, valfler, silindirler ve sızdırmazlık kitleri. Kaya delme ve madencilik faaliyetlerinde maksimum güvenilirlik için test edilmiştir.'
    },
    {
      title: 'DRIFTER & DRILLER PARTS',
      titleTr: 'KAYA DELİCİ VE MATKAP PARÇALARI',
      href: '/product-range-drifter',
      img: '/drifter.png',
      desc: "Fed Mining Solutions, we partner with top manufacturers to provide you with high-quality industrial bearings and drifter parts. We're committed to delivering performance and reliability, with a wide selection and prompt order fulfillment. Choose Fed as your partner for success.",
      descTr: 'Kaya deliciler (drifterlar) için yüksek kaliteli bileşenler ve yedek parçalar sağlamak üzere lider üreticilerle ortaklık kuruyoruz. Geniş ürün yelpazemiz ve hızlı sipariş teslimatımızla performans ve güvenilirlik sunmaya kararlıyız. Başarı ortağınız olarak FED\'i seçin.'
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
          SECTION 1: HERO
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: '940px',
        display: 'flex',
        alignItems: 'center',
        background: '#212d45',
        overflow: 'hidden',
      }}>
        {/* Hero Background image with dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero-section.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(71deg, #212d45 100%, rgba(33,45,69,0.3) 100%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '135px', paddingBottom: '135px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
            <div style={{ maxWidth: '780px' }}>
              
              {/* Subheading */}
              <h3 style={{
                fontSize: 18,
                fontWeight: 200,
                color: '#ffc03d',
                fontFamily: 'var(--font-heading)',
                marginBottom: 20,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {isTr ? 'Hayalinizi Gerçekleştirin ve İlham Verin' : 'Achieve Your Dream and Inspire'}
              </h3>

              {/* H1 Title */}
              <h1 style={{
                fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
                fontWeight: 700,
                lineHeight: 1.4,
                color: '#ffffff',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
                marginBottom: 20,
              }}>
                {isTr ? 'MADENCİLİK ÇÖZÜMLERİ VE YEDEK PARÇALAR' : 'MINING SOLUTIONS AND PARTS'}
              </h1>

              {/* Description */}
              <p style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: '#ffffff',
                opacity: 0.9,
                marginBottom: 50,
                maxWidth: '680px'
              }}>
                {isTr
                  ? 'Operasyonlarınızı optimize etmek için gelişmiş tekniklerle endüstri standartlarını aşın. Başarı için olağanüstü parçalar konusunda bize güvenin.'
                  : 'Exceed industry standards with advanced techniques to optimize your operations. Trust us for exceptional parts for success.'}
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
                <Link href="/industries" className="btn btn-primary" style={{
                  padding: '15px 45px', fontSize: 15, fontWeight: 500, borderRadius: 0, textTransform: 'uppercase'
                }}>
                  {isTr ? 'Hizmetlerimiz' : 'Our Services'}
                </Link>
                <Link href="/contact" className="btn" style={{
                  padding: '15px 45px', fontSize: 15, fontWeight: 500, borderRadius: 0, textTransform: 'uppercase',
                  backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffc03d';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.borderColor = '#ffc03d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}>
                  {isTr ? 'Bize Ulaşın' : 'Contact Us'}
                </Link>
              </div>

            </div>

            {/* Right side product catalog preview */}
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
                  alt="FED Mining - Drifter parts"
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
                    {isTr ? 'OEM uyumlu yedek parça uzmanı' : 'OEM compatible spare parts expert'}
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
        paddingTop: 100,
        paddingBottom: 100,
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            
            {/* Left text */}
            <ScrollReveal direction="left">
              <div>
                <h4 style={{
                  fontSize: 16,
                  fontWeight: 200,
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                  {isTr ? 'Yenilmez Başarımız' : 'Our Undefeated Success'}
                </h4>
                <h2 style={{
                  fontSize: 40,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: 20,
                }}>
                  {isTr 
                    ? 'Operasyonlarınızı optimize etmenin daha verimli bir yolunu mu arıyorsunuz?' 
                    : 'Are you looking for a more efficient way to optimize your operations?'}
                </h2>
                <p style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: 35,
                }}>
                  {isTr
                    ? 'Başarıya ulaşmanıza yardımcı olacak olağanüstü parçaları sunmak için uzmanlığımıza ve deneyimimize güvenin. Operasyonlarınızı bir üst seviyeye taşımanıza yardımcı olalım.'
                    : 'Trust in our expertise and experience to deliver exceptional parts that can help set you up for success. Let us help you take your operations to the next level.'}
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
                boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                padding: 10,
                borderRadius: 12,
                background: '#fcfcfc',
              }}>
                {/* Stat 1 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #E1E1E1',
                  padding: '50px 40px',
                  borderRadius: 8,
                }}>
                  <h2 style={{ fontSize: 35, fontWeight: 700, color: 'var(--text-main)', margin: '0 0 10px 0' }}>30.000+</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                    {isTr ? 'Erişilebilir Parça Numarası' : 'Accessible Part Numbers'}
                  </p>
                </div>
                {/* Stat 2 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #E1E1E1',
                  padding: '50px 40px',
                  borderRadius: 8,
                }}>
                  <h2 style={{ fontSize: 35, fontWeight: 700, color: 'var(--text-main)', margin: '0 0 10px 0' }}>56+</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                    {isTr ? 'Saygın İş Ortağı' : 'Reputable Business Partners'}
                  </p>
                </div>
                {/* Stat 3 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #E1E1E1',
                  padding: '50px 40px',
                  borderRadius: 8,
                }}>
                  <h2 style={{ fontSize: 35, fontWeight: 700, color: 'var(--text-main)', margin: '0 0 10px 0' }}>5+</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
                    {isTr ? 'Günlük Operasyon' : 'Daily Operation'}
                  </p>
                </div>
                {/* Stat 4 */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #E1E1E1',
                  padding: '50px 40px',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{ color: 'var(--primary)', marginBottom: 8 }}>
                    <svg style={{ width: 32, height: 32 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0 7.5 7.5 0 00-15 0z"></path>
                    </svg>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
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
        background: '#ffffff',
        paddingTop: 100,
        paddingBottom: 100,
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
              <h4 style={{
                fontSize: 16,
                fontWeight: 200,
                color: 'var(--primary)',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                {isTr ? 'Hayalinizi Gerçekleştirin ve İlham Verin' : 'Achieve Your Dream and Inspire'}
              </h4>
              <h2 style={{
                fontSize: 40,
                fontWeight: 700,
                color: 'var(--text-main)',
                fontFamily: 'var(--font-heading)',
                margin: 0,
              }}>
                {isTr ? 'PARÇA YELPAZESİ' : 'PARTS RANGE'}
              </h2>
            </div>

            <Link href="/productrange" className="btn btn-primary" style={{
              padding: '24px 34px',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: '12px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: '#ffffff',
              color: 'var(--primary)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffc03d';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = 'var(--primary)';
            }}>
              <span>{isTr ? 'Ürün Yelpazesini İnceleyin' : 'To View Product Range'}</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 25,
          }}>
            {productCards.map((card, idx) => (
              <ScrollReveal key={idx} delay={idx * 60}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #E1E1E1',
                  borderRadius: 0,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
                className="hover-card-border"
                >
                  <div style={{ position: 'relative', height: 200, width: '100%' }}>
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 25, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{
                        fontSize: 18,
                        fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--text-main)',
                        marginBottom: 15,
                      }}>
                        <Link href={card.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {isTr ? card.titleTr : card.title}
                        </Link>
                      </h3>
                      <p style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: 'var(--text-muted)',
                        marginBottom: 20,
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
          SECTION 4: SUSTAINABILITY
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
            padding: '80px 64px',
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
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>
              <h4 style={{
                fontSize: 16,
                fontWeight: 200,
                color: '#ffc03d',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                {isTr ? 'Sürdürülebilirlik' : 'Sustainability'}
              </h4>
              <h2 style={{
                fontSize: 36,
                fontWeight: 700,
                lineHeight: 1.3,
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                marginBottom: 20,
              }}>
                {isTr ? 'İnsanları Sağlıklı ve Güvende Tutmaya Kararlıyız' : 'Committed To Keep People Healthy & Safe'}
              </h2>
              <p style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: 35,
              }}>
                {isTr
                  ? 'Amacımız insanların sağlıklı ve güvende kalmasına yardımcı olmaktır ve dünya çapında refahı desteklemek için sürekli yeni yollar bulmaya kararlıyız. Herkesin en iyi hayatını yaşayabileceği bir dünyaya ulaşmak için birlikte çalışalım.'
                  : "Our goal is to help people stay healthy and safe, and we are committed to constantly finding new ways to support well-being worldwide. Let's work together to achieve a world where everyone can live their best lives."}
              </p>
              <Link href="/contact" className="btn btn-primary" style={{
                padding: '15px 45px', fontSize: 14, fontWeight: 500, borderRadius: 0, textTransform: 'uppercase'
              }}>
                {isTr ? 'İletişime Geçin' : 'Get In Touch'}
              </Link>
            </div>
          </div>

          {/* Right panel - Best practices */}
          <div style={{
            position: 'relative',
            backgroundColor: '#ffc03d',
            padding: '80px 64px',
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Background image & overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/about-us-2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              opacity: 0.1,
            }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>
              <h4 style={{
                fontSize: 16,
                fontWeight: 200,
                color: '#212d45',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                {isTr ? 'En İyi Uygulamaları Takip Ediyoruz' : 'We Follow Best Practices'}
              </h4>
              <p style={{
                fontSize: 22,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: '#212d45',
                fontWeight: 500,
                marginBottom: 30,
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
                gap: 15,
              }}>
                {[
                  { en: 'Sustainability', tr: 'Sürdürülebilirlik' },
                  { en: 'Project On Time', tr: 'Zamanında Proje Teslimi' },
                  { en: 'Modern Technology', tr: 'Modern Teknoloji' },
                  { en: 'Latest Designs', tr: 'En Yeni Tasarımlar' }
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#212d45',
                  }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: '50%',
                      backgroundColor: '#212d45', color: '#ffc03d',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12,
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
        paddingTop: 100,
        paddingBottom: 100,
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="responsive-grid-1col">
            
            {/* Left side: Request a quote form */}
            <ScrollReveal direction="left">
              <div style={{
                backgroundColor: '#212d45',
                padding: '50px',
                color: '#ffffff',
              }}>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  marginBottom: 10,
                }}>
                  {isTr ? 'Teklif Talebi' : 'Request a Quote'}
                </h2>
                <p style={{
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: 35,
                }}>
                  {isTr ? 'Herhangi bir yardıma veya desteğe mi ihtiyacınız var?' : 'Are you in need of any kind of assistance or support?'}
                </p>

                {/* Form fields */}
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                    <div>
                      <input
                        type="text"
                        placeholder={isTr ? 'Adınız' : 'First Name'}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{
                          width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: 14,
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
                          width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: 14,
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
                        width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: 14,
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
                        width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: 14,
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
                        width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: 14,
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    style={{
                      padding: '15px 40px', backgroundColor: '#ffc03d', border: 'none',
                      color: '#212d45', fontWeight: 'bold', textTransform: 'uppercase',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffc03d';
                    }}
                  >
                    <span>{isTr ? 'Bizimle İletişime Geçin' : 'Contact Us'}</span>
                    <Send size={16} />
                  </button>

                  {submitStatus === 'success' && (
                    <p style={{ color: '#10b981', fontSize: 14, margin: '10px 0 0' }}>
                      {isTr ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent successfully!'}
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: 14, margin: '10px 0 0' }}>
                      {isTr ? 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.' : 'An error occurred, please try again later.'}
                    </p>
                  )}
                </form>
              </div>
            </ScrollReveal>

            {/* Right side: FAQs */}
            <ScrollReveal direction="right">
              <div>
                <h4 style={{
                  fontSize: 16,
                  fontWeight: 200,
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                  {isTr ? 'Daha Fazla Bilgi Edin' : 'Learn More From'}
                </h4>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-main)',
                  marginBottom: 35,
                }}>
                  {isTr ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
                </h2>

                {/* FAQ items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} style={{
                        border: '1px solid #E1E1E1',
                        borderRadius: 0,
                        overflow: 'hidden',
                      }}>
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          style={{
                            width: '100%', padding: '20px', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            background: '#fcfcfc', border: 'none', cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          <span style={{
                            fontSize: 16, fontWeight: 600, color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                            fontFamily: 'var(--font-heading)',
                          }}>
                            {isTr ? faq.qTr : faq.q}
                          </span>
                          <span style={{ color: isOpen ? 'var(--primary)' : 'var(--text-muted)' }}>
                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                          </span>
                        </button>
                        {isOpen && (
                          <div style={{
                            padding: '20px', borderTop: '1px solid #E1E1E1',
                            fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)',
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
