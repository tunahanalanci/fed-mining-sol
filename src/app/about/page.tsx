'use client';

import { MapPin, Phone, Mail, Users, Award, Globe2, Wrench } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const OPERATIONS = [
  {
    flag: '🇹🇷',
    country: 'Turkey',
    city: 'Turkey',
    role: 'Headquarters & Manufacturing',
    desc: 'Main production facility, R&D, and administrative headquarters. All parts are manufactured and tested here before global distribution.',
    color: '#ef4444',
  },
  {
    flag: '🇨🇱',
    country: 'Chile',
    city: 'Santiago',
    role: 'South America Operations',
    desc: 'Regional operations serving copper and lithium mining companies across Chile, Peru, and Argentina.',
    color: '#f59e0b',
  },
  {
    flag: '🇬🇭',
    country: 'Ghana',
    city: 'Accra',
    role: 'Africa Operations',
    desc: 'West Africa hub supporting gold and bauxite mining operations across sub-Saharan Africa.',
    color: '#10b981',
  },
];

const TEAM_STATS = [
  { value: '30+', label: 'Expert Employees', icon: Users },
  { value: '10+', label: 'Years of Experience', icon: Award },
  { value: '3', label: 'Global Operations', icon: Globe2 },
  { value: '186+', label: 'Parts in Catalog', icon: Wrench },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: 86 }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '56px 0 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(255,192,61,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase' }}>
            About Us
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: 20, maxWidth: 600 }}>
            FED Mining Solutions<br />& Parts
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 640, color: 'var(--text-muted)' }}>
            FED Mining Solutions and Parts is a leading provider of innovative solutions for the mining industry.
            With over a decade of experience, we specialize in manufacturing high-quality equipment,
            parts, and services tailored to meet the demanding needs of our customers.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        padding: '28px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 0,
          }}>
            {TEAM_STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{
                  textAlign: 'center', padding: '16px 20px',
                  borderRight: i < TEAM_STATS.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}>
                  <Icon size={22} color="var(--primary)" style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--primary)' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '64px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginBottom: 64 }}>
          {/* About Text */}
          <div>
            <h2 style={{ marginBottom: 20 }}>Who We Are</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p>
                FED Mining Solutions and Parts (officially: <strong style={{ color: 'var(--text-white)' }}>FED MADENCİLİK MAKİNA İTH. İHR. SAN. TİC. LTD.</strong>)
                is headquartered in Turkey — a leading manufacturer and exporter of compatible mining drill components.
              </p>
              <p>
                Our core product line consists of <strong style={{ color: 'var(--text-white)' }}>compatible drifters and spare parts</strong> for
                Sandvik and Epiroc (Atlas Copco / Tamrock) rock drilling equipment used in both surface and underground mining.
              </p>
              <p>
                We maintain <strong style={{ color: 'var(--text-white)' }}>production and repair facilities across three countries</strong> — Turkey, Chile, and Ghana —
                with a team of 30+ experienced professionals including engineers, craftsmen, and field technicians.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 style={{ marginBottom: 20 }}>Why Choose FED Mining?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  icon: '🏭',
                  title: 'Industry Expertise',
                  desc: 'More than 30 employees with deep knowledge in mining equipment production, repair, and field service across three continents.',
                },
                {
                  icon: '✅',
                  title: 'Reliable Solutions',
                  desc: 'Proven track record of delivering durable and efficient products. Parts tested on original OEM test machines before delivery.',
                },
                {
                  icon: '🔧',
                  title: 'Comprehensive Support',
                  desc: 'Dedicated technical team for troubleshooting, maintenance planning, and spare parts. We track your machine hours for you.',
                },
                {
                  icon: '📦',
                  title: 'Stock Management',
                  desc: 'We monitor your drifter working hours and keep 400h/800h/1200h overhaul kits in stock under your name.',
                },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(255,192,61,0.1)',
                    border: '1px solid rgba(255,192,61,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-white)', marginBottom: 4 }}>{item.title}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 16, padding: 36, marginBottom: 64,
        }}>
          <h2 style={{ marginBottom: 8 }}>Our Products: Complete Drifters</h2>
          <p style={{ marginBottom: 24, fontSize: 15 }}>
            Our primary product is complete compatible drifter units and their spare parts.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              {
                title: 'Durability',
                color: 'var(--primary)',
                desc: 'Almost identical specifications to original units. Maintenance interval is every 400 hours (vs. original 500h). Compatible with OEM parts.',
              },
              {
                title: 'High Efficiency',
                color: '#10b981',
                desc: 'Lower operating costs with same drilling times as original units. Induction-hardened alloy steel construction.',
              },
              {
                title: 'Easy Maintenance',
                color: '#60a5fa',
                desc: 'Fully compatible with original OEM spare parts for servicing. No special tooling required beyond standard OEM service kits.',
              },
              {
                title: 'Stock Management',
                color: '#a78bfa',
                desc: 'We track your working hours and maintain 400h/800h/1200h overhaul kits pre-stocked in your name. Zero downtime.',
              },
            ].map(item => (
              <div key={item.title} style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 10, padding: 20,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compatible Models */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ marginBottom: 8 }}>Compatible Models</h2>
          <p style={{ marginBottom: 28, color: 'var(--text-muted)' }}>
            We manufacture and supply parts for the following drifter models:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                brand: 'Epiroc / Atlas Copco',
                color: '#f59e0b',
                models: 'COP1132, COP1238, COP1638, COP1838, COP1840, COP2150, COP2550, COP2160, COP2560, MD20, COP3060, COP4050',
                rigs: 'BOOMER 282, S1D, L2D, T1D, ROC D7, ROC T35, ROC D7-11 series',
              },
              {
                brand: 'Sandvik / Tamrock',
                color: '#ef4444',
                models: 'HL500, HL600, HL700, HL800, HL1000, HL1500, HLX5, RD520, RD525, RD314',
                rigs: 'Pantera, Ranger, DX, DD, DT series',
              },
            ].map(item => (
              <div key={item.brand} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${item.color}30`,
                borderRadius: 12, padding: 24,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 12 }}>{item.brand}</div>
                <div style={{ fontSize: 13, color: 'var(--text-white)', marginBottom: 8, lineHeight: 1.6 }}>
                  <strong>Models:</strong> {item.models}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  <strong>Rigs:</strong> {item.rigs}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Operations */}
        <div>
          <h2 style={{ marginBottom: 8 }}>Global Operations</h2>
          <p style={{ marginBottom: 28, color: 'var(--text-muted)' }}>
            Production, repair shops, and experienced craftsmen in three countries.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {OPERATIONS.map(op => (
              <div key={op.country} className="card" style={{ borderColor: `${op.color}25` }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{op.flag}</div>
                <div style={{
                  display: 'inline-block', fontSize: 11, fontWeight: 700,
                  padding: '3px 10px', borderRadius: 4, marginBottom: 12,
                  background: `${op.color}15`, color: op.color,
                }}>{op.role}</div>
                <h3 style={{ fontSize: 18, marginBottom: 4 }}>{op.city}, {op.country}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6 }}>{op.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '48px 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 8 }}>Registered Information</h2>
          <p style={{ marginBottom: 28, color: 'var(--text-muted)' }}>
            FED Mining Solutions and Parts — Turkey
          </p>
          <div style={{
            display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
              <MapPin size={16} color="var(--primary)" />
              <span>Turkey</span>
            </div>
            <a href="tel:+905061208706" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-muted)' }}>
              <Phone size={16} color="var(--primary)" />
              +90 506 120 87 06
            </a>
            <a href="mailto:Info@FedMiningSolutions.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-muted)' }}>
              <Mail size={16} color="var(--primary)" />
              Info@FedMiningSolutions.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
