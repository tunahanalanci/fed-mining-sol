'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    'nav.home': 'HOME',
    'nav.productrange': 'PRODUCT RANGE',
    'nav.drifters': 'DRIFTERS',
    'nav.machinespareparts': 'MACHINE SPARE PARTS',
    'nav.drilling': 'DRILLING',
    'nav.hyraulicbreaker': 'HYRAULIC BREAKER',
    'nav.services': 'SERVICES',
    'nav.driftertestbench': 'DRIFTER TEST BENCH',
    'nav.mobileconteiner': 'MOBILE CONTEINER',
    'nav.software': 'MINING & SITE MANAGEMENT SOFTWARE',
    'nav.parts': 'EQUIPMENTS AND PARTS',
    'nav.about': 'ABOUT FED',
    'nav.contact': 'CONTACT US',
    'nav.dashboard': 'Client Portal',
    'nav.admin': 'Admin Panel',
    'nav.login': 'Sign In',
    'nav.register': 'Register',
    'nav.logout': 'Sign Out',
    'general.searchPlaceholder': 'Search parts... (e.g. PISTON, COP1838, 550-103-10)',
    'general.searchBtn': 'Search',
    'general.brand': 'FED Mining',
    'general.brandSub': 'Solutions & Parts',
    'general.turkish': 'Turkish',
    'general.english': 'English',
    'general.loading': 'Loading...',
    
    // Home Page
    'home.heroTitle': 'PREMIUM DRILL SPARE PARTS & DRIFTERS',
    'home.heroSub': 'Compatible with Sandvik & Epiroc (Tamrock / Atlas Copco) rock drills. Engineered for the extreme, delivered worldwide from Turkey.',
    'home.ctaParts': 'Browse Parts',
    'home.ctaDashboard': 'Track Machine Hours',
    'home.brandTitle': 'CHOOSE YOUR DRILLING MACHINE BRAND',
    'home.brandSub': 'Compatible components built to meet OEM quality standards.',
    'home.surface': 'Surface Drilling',
    'home.underground': 'Underground Drilling',
    
    // Advantages
    'home.advTitle': 'WHY CHOOSE FED MINING SOLUTIONS?',
    'home.advSub': 'Over a decade of industry expertise with operations in Turkey, Chile, and Ghana.',
    'home.adv1Title': 'Durability & Fit',
    'home.adv1Desc': 'Identical fit and drilling speeds to original parts, ensuring seamless field operations.',
    'home.adv2Title': '400h Overhaul Stock',
    'home.adv2Desc': 'We follow your drifter working hours and keep 400h/800h/1200h overhaul kits stocked on your name.',
    'home.adv3Title': 'Global Logistics',
    'home.adv3Desc': 'Fast, reliable worldwide shipping from Turkey directly to your mining site.',
    'home.adv4Title': '24/7 Expert Support',
    'home.adv4Desc': 'Dedicated technical team ready to assist with custom quotes, maintenance logs, and troubleshooting.',
    
    // Catalog
    'catalog.title': 'Spare Parts Catalog',
    'catalog.filters': 'Filters',
    'catalog.all': 'All',
    'catalog.brand': 'Brand',
    'catalog.category': 'Category',
    'catalog.compatibility': 'Compatible Drifter',
    'catalog.oem': 'OEM Ref:',
    'catalog.partNum': 'Part Number:',
    'catalog.noResults': 'No parts match your search filters.',
    'catalog.resultsFound': 'parts found',
    'catalog.addToQuote': 'Add to Quote Request',
    'catalog.inBasket': 'In Quote Request',
    
    // Part Details
    'details.back': 'Back to Catalog',
    'details.requestQuote': 'Request Quote',
    'details.whatsappSupport': 'Ask via WhatsApp',
    'details.compatibility': 'Compatible Drifters',
    'details.description': 'Product Description',
    'details.specifications': 'Technical Advantages',
    'details.specsList': 'Manufactured with high-strength induction-hardened alloy steel; Strict tolerance controls matching original drawings; Verified 400-hour field endurance warranty; Guaranteed fast shipping.',
    'details.related': 'Related Spare Parts',
    
    // Quote Basket
    'basket.title': 'Quote Request Basket',
    'basket.empty': 'Your basket is empty. Add parts from the catalog.',
    'basket.part': 'Part',
    'basket.qty': 'Qty',
    'basket.formTitle': 'Complete Quote Request',
    'basket.name': 'Full Name / Contact Person',
    'basket.email': 'Email Address',
    'basket.phone': 'Phone Number',
    'basket.message': 'Message / Special Notes (e.g. machine model, serial numbers)',
    'basket.submit': 'Submit Quote Request',
    'basket.success': 'Quote request submitted successfully! We will contact you shortly.',
    
    // Auth
    'auth.loginTitle': 'Sign In to Client Portal',
    'auth.loginSub': 'Track your drifters and pre-order maintenance overhaul kits.',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.loginBtn': 'Sign In',
    'auth.noAccount': 'Don\'t have a customer account?',
    'auth.registerTitle': 'Register Customer Account',
    'auth.companyName': 'Company Name',
    'auth.contactPerson': 'Contact Person',
    'auth.phone': 'Phone Number',
    'auth.registerBtn': 'Register Account',
    'auth.hasAccount': 'Already have an account?',
    
    // Client Dashboard
    'dash.title': 'Customer Portal',
    'dash.welcome': 'Welcome,',
    'dash.activeDrifters': 'My Registered Drifters',
    'dash.noDrifters': 'You have no drifters registered yet. Add one below to track working hours.',
    'dash.addDrifter': 'Register New Drifter',
    'dash.model': 'Drifter Model',
    'dash.serial': 'Serial Number',
    'dash.currentHours': 'Current Working Hours',
    'dash.weeklyHours': 'Avg. Weekly Usage (Hours)',
    'dash.lastOverhaul': 'Last 400h Overhaul Hours',
    'dash.saveBtn': 'Register Drifter',
    'dash.updateHours': 'Update Hours',
    'dash.hours': 'Hours',
    'dash.updateHoursTitle': 'Update Working Hours for Serial',
    'dash.saveHours': 'Update',
    'dash.nextDue': 'Next Service Due at:',
    'dash.status': 'Maintenance Status',
    'dash.statusSafe': 'Operational (Safe)',
    'dash.statusWarning': 'Service Needed Soon (Over 360h)',
    'dash.statusUrgent': 'Overdue (Service Immediately!)',
    'dash.remainingHours': 'Remaining hours:',
    'dash.preorderKit': 'Pre-order 400h Overhaul Kit',
    'dash.quotesHistory': 'My Past Quote Requests',
    'dash.noQuotes': 'No quote requests submitted yet.',
    'dash.quoteNum': 'Quote Ref',
    'dash.date': 'Date',
    'dash.items': 'Items',
    
    // Admin Dashboard
    'admin.title': 'Admin Panel',
    'admin.stats': 'Dashboard Overview',
    'admin.totalParts': 'Parts Cataloged',
    'admin.totalUsers': 'Registered Clients',
    'admin.openQuotes': 'Open Quotes',
    'admin.activeAlerts': 'Urgent Service Alerts',
    'admin.alertsTitle': 'Client Drifters Requiring 400h Maintenance',
    'admin.client': 'Client',
    'admin.drifter': 'Drifter',
    'admin.serial': 'Serial #',
    'admin.hours': 'Hours',
    'admin.contactClient': 'Contact Client',
    'admin.quoteList': 'Quote Requests',
    'admin.status': 'Status',
    'admin.pending': 'Pending',
    'admin.contacted': 'Contacted',
    'admin.completed': 'Completed',
    'admin.partsTitle': 'Manage Parts Catalog',
    'admin.addPart': 'Add New Part',
    'admin.partNo': 'Part Number',
    'admin.partName': 'Part Name',
    'admin.brandLabel': 'Brand',
    'admin.catLabel': 'Category',
    'admin.compatLabel': 'Compatibility (comma-sep)',
    'admin.oemLabel': 'OEM Reference',
    'admin.descLabel': 'Description',
    'admin.savePart': 'Save Part'
  },
  tr: {
    // Nav & General
    'nav.home': 'ANASAYFA',
    'nav.productrange': 'ÜRÜN GRUPLARI',
    'nav.drifters': 'KAYA DELİCİLER',
    'nav.machinespareparts': 'MAKİNE YEDEK PARÇALARI',
    'nav.drilling': 'SONDAJ VE DELME',
    'nav.hyraulicbreaker': 'HİDROLİK KIRICI',
    'nav.services': 'HİZMETLER',
    'nav.driftertestbench': 'DRİFTER TEST TEZGAHI',
    'nav.mobileconteiner': 'MOBİL KONTEYNER',
    'nav.software': 'MADEN & ŞANTİYE YAZILIMI',
    'nav.parts': 'EKİPMAN VE PARÇALAR',
    'nav.about': 'FED HAKKINDA',
    'nav.contact': 'BİZE ULAŞIN',
    'nav.dashboard': 'Müşteri Portalı',
    'nav.admin': 'Yönetici Paneli',
    'nav.login': 'Giriş Yap',
    'nav.register': 'Kayıt Ol',
    'nav.logout': 'Çıkış Yap',
    'general.searchPlaceholder': 'Parça ara... (Örn: PISTON, COP1838, 550-103-10)',
    'general.searchBtn': 'Ara',
    'general.brand': 'FED Madencilik',
    'general.brandSub': 'Çözüm & Yedek Parça',
    'general.turkish': 'Türkçe',
    'general.english': 'İngilizce',
    'general.loading': 'Yükleniyor...',
    
    // Home Page
    'home.heroTitle': 'PREMIUM DRIFTER & YEDEK PARÇALAR',
    'home.heroSub': 'Sandvik & Epiroc (Tamrock / Atlas Copco) kaya delicileri ile uyumlu yedek parçalar. En zorlu koşullar için üretildi, Türkiye\'den dünyaya sevk edilir.',
    'home.ctaParts': 'Parçaları İncele',
    'home.ctaDashboard': 'Çalışma Saatlerini Takip Et',
    'home.brandTitle': 'DELİCİ MAKİNE MARKANIZI SEÇİN',
    'home.brandSub': 'OEM kalite standartlarına uygun olarak üretilmiş uyumlu yedek parçalar.',
    'home.surface': 'Yer Üstü Deliciler',
    'home.underground': 'Yer Altı Deliciler',
    
    // Advantages
    'home.advTitle': 'NEDEN FED MADENCİLİK?',
    'home.advSub': 'Türkiye, Şili ve Gana operasyonları ile madencilik sektöründe 10 yılı aşkın tecrübe.',
    'home.adv1Title': 'Dayanıklılık & Uyum',
    'home.adv1Desc': 'Orijinal parçalarla birebir aynı montaj ölçüleri ve delme hızları, sahada kesintisiz çalışma.',
    'home.adv2Title': '400s Bakım Kiti Stoğu',
    'home.adv2Desc': 'Drifter çalışma saatlerinizi takip ediyor ve adınıza 400s/800s/1200s ağır bakım kitlerini hazır tutuyoruz.',
    'home.adv3Title': 'Küresel Lojistik',
    'home.adv3Desc': 'Türkiye\'den doğrudan maden sahanıza hızlı ve güvenilir uluslararası sevkiyat.',
    'home.adv4Title': '24/7 Teknik Destek',
    'home.adv4Desc': 'WhatsApp veya e-posta üzerinden özel teklifler, bakım kayıtları ve teknik danışmanlık.',
    
    // Catalog
    'catalog.title': 'Yedek Parça Kataloğu',
    'catalog.filters': 'Filtreler',
    'catalog.all': 'Tümü',
    'catalog.brand': 'Marka',
    'catalog.category': 'Kategori',
    'catalog.compatibility': 'Uyumlu Drifter',
    'catalog.oem': 'OEM Kod:',
    'catalog.partNum': 'Parça No:',
    'catalog.noResults': 'Filtrelerinize uygun parça bulunamadı.',
    'catalog.resultsFound': 'parça listelendi',
    'catalog.addToQuote': 'Teklif Sepetine Ekle',
    'catalog.inBasket': 'Teklif Sepetinde',
    
    // Part Details
    'details.back': 'Kataloğa Dön',
    'details.requestQuote': 'Fiyat Teklifi İste',
    'details.whatsappSupport': 'WhatsApp\'tan Sor',
    'details.compatibility': 'Uyumlu Drifter Modelleri',
    'details.description': 'Ürün Açıklaması',
    'details.specifications': 'Teknik Avantajlar',
    'details.specsList': 'Yüksek mukavemetli indüksiyonla sertleştirilmiş alaşımlı çelik; Orijinal teknik resimlerle birebir tolerans kontrolleri; Doğrulanmış 400 saat saha dayanıklılık garantisi; Hızlı stok teslimatı.',
    'details.related': 'Benzer Yedek Parçalar',
    
    // Quote Basket
    'basket.title': 'Teklif İsteme Sepeti',
    'basket.empty': 'Sepetiniz boş. Kataloğumuzdan ürün ekleyin.',
    'basket.part': 'Parça',
    'basket.qty': 'Adet',
    'basket.formTitle': 'Teklif Talebini Tamamla',
    'basket.name': 'Ad Soyad / Yetkili Kişi',
    'basket.email': 'E-posta Adresi',
    'basket.phone': 'Telefon Numarası',
    'basket.message': 'Not / Özel İstekler (Örn: Makine modeli, seri numaraları)',
    'basket.submit': 'Teklifi Gönder',
    'basket.success': 'Teklif talebiniz başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.',
    
    // Auth
    'auth.loginTitle': 'Müşteri Portalına Giriş',
    'auth.loginSub': 'Drifter saatlerinizi takip edin ve bakım kitlerinizi önceden rezerve edin.',
    'auth.email': 'E-posta Adresi',
    'auth.password': 'Şifre',
    'auth.loginBtn': 'Giriş Yap',
    'auth.noAccount': 'Müşteri hesabınız yok mu?',
    'auth.registerTitle': 'Yeni Müşteri Kaydı',
    'auth.companyName': 'Şirket Ünvanı',
    'auth.contactPerson': 'Yetkili Kişi',
    'auth.phone': 'Telefon Numarası',
    'auth.registerBtn': 'Hesabı Oluştur',
    'auth.hasAccount': 'Zaten hesabınız var mı?',
    
    // Client Dashboard
    'dash.title': 'Müşteri Portalı',
    'dash.welcome': 'Hoş geldiniz,',
    'dash.activeDrifters': 'Kayıtlı Delicilerim (Drifter)',
    'dash.noDrifters': 'Henüz kayıtlı drifterınız bulunmamaktadır. Çalışma saati takibi için aşağıdan ekleyin.',
    'dash.addDrifter': 'Yeni Drifter Kaydet',
    'dash.model': 'Delici Modeli',
    'dash.serial': 'Seri Numarası',
    'dash.currentHours': 'Mevcut Çalışma Saati',
    'dash.weeklyHours': 'Haftalık Ortalama Çalışma (Saat)',
    'dash.lastOverhaul': 'Son 400s Bakım Saati',
    'dash.saveBtn': 'Deliciyi Kaydet',
    'dash.updateHours': 'Saat Güncelle',
    'dash.hours': 'Saat',
    'dash.updateHoursTitle': 'Seri No İçin Çalışma Saati Güncelle',
    'dash.saveHours': 'Güncelle',
    'dash.nextDue': 'Sonraki Bakım Sınırı:',
    'dash.status': 'Bakım Durumu',
    'dash.statusSafe': 'Çalışır Durumda (Güvenli)',
    'dash.statusWarning': 'Bakım Yaklaşıyor (360s Üzeri)',
    'dash.statusUrgent': 'Bakım Zamanı Geçti (Hemen Bakım yapın!)',
    'dash.remainingHours': 'Kalan Çalışma Saati:',
    'dash.preorderKit': '400s Bakım Kitini Ayırt / Sipariş Et',
    'dash.quotesHistory': 'Geçmiş Teklif Taleplerim',
    'dash.noQuotes': 'Henüz bir teklif talebiniz bulunmamaktadır.',
    'dash.quoteNum': 'Teklif No',
    'dash.date': 'Tarih',
    'dash.items': 'Ürünler',
    
    // Admin Dashboard
    'admin.title': 'Yönetici Paneli',
    'admin.stats': 'Genel Durum',
    'admin.totalParts': 'Yayındaki Parça',
    'admin.totalUsers': 'Kayıtlı Müşteri',
    'admin.openQuotes': 'Bekleyen Teklifler',
    'admin.activeAlerts': 'Acil Bakım Uyarıları',
    'admin.alertsTitle': '400 Saatlik Bakımı Gelen Müşteri Delicileri',
    'admin.client': 'Müşteri',
    'admin.drifter': 'Delici',
    'admin.serial': 'Seri No',
    'admin.hours': 'Saat',
    'admin.contactClient': 'Müşteriyle İletişim',
    'admin.quoteList': 'Gelen Teklif Talepleri',
    'admin.status': 'Durum',
    'admin.pending': 'Bekliyor',
    'admin.contacted': 'İletişime Geçildi',
    'admin.completed': 'Tamamlandı',
    'admin.partsTitle': 'Parça Kataloğunu Yönet',
    'admin.addPart': 'Yeni Parça Ekle',
    'admin.partNo': 'Parça Numarası',
    'admin.partName': 'Parça Adı',
    'admin.brandLabel': 'Marka',
    'admin.catLabel': 'Kategori',
    'admin.compatLabel': 'Uyumlu Modeller (virgülle ayırın)',
    'admin.oemLabel': 'OEM Kod Karşılığı',
    'admin.descLabel': 'Açıklama',
    'admin.savePart': 'Parçayı Kaydet'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('tr');

  useEffect(() => {
    const savedLang = localStorage.getItem('fed_lang') as Language;
    if (savedLang === 'en' || savedLang === 'tr') {
      setLanguageState(savedLang);
    } else {
      // Default to Turkish if user is from Turkey (Denizli)
      setLanguageState('tr');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fed_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
