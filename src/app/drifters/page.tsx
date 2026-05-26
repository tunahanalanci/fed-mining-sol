'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, ChevronRight, Package } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DrifterModel {
  model: string;
  brand: 'Sandvik' | 'Epiroc';
  type: 'Underground' | 'Surface';
  weight: string;
  impact: string;
  rotation: string;
  flushing: string;
  connection: string;
  rigs: string;
  series: string;
}

const ALL_DRIFTERS: DrifterModel[] = [
  // Sandvik Underground
  { model: 'HL500', brand: 'Sandvik', type: 'Underground', weight: '145 kg', impact: '17 kW', rotation: '2.4 kW', flushing: '200 l/min', connection: 'T38', rigs: 'DT series light rigs', series: 'HL Light Series' },
  { model: 'HL600', brand: 'Sandvik', type: 'Underground', weight: '160 kg', impact: '20 kW', rotation: '2.6 kW', flushing: '220 l/min', connection: 'T38', rigs: 'DT series', series: 'HL Standard Series' },
  { model: 'HL700', brand: 'Sandvik', type: 'Underground', weight: '185 kg', impact: '23 kW', rotation: '3.0 kW', flushing: '240 l/min', connection: 'T38/T45', rigs: 'DT821 / DD420 series', series: 'HL Standard Series' },
  { model: 'HL800', brand: 'Sandvik', type: 'Underground', weight: '210 kg', impact: '26 kW', rotation: '3.2 kW', flushing: '260 l/min', connection: 'T45', rigs: 'DD series heavy', series: 'HL Heavy Series' },
  { model: 'HL1000', brand: 'Sandvik', type: 'Underground', weight: '240 kg', impact: '30 kW', rotation: '3.8 kW', flushing: '280 l/min', connection: 'T45/T51', rigs: 'DD422i / DT1131i', series: 'HL Heavy Series' },
  { model: 'HL1500', brand: 'Sandvik', type: 'Underground', weight: '290 kg', impact: '35 kW', rotation: '4.2 kW', flushing: '300 l/min', connection: 'T51', rigs: 'Large development rigs', series: 'HL Super Heavy' },
  // Sandvik Surface
  { model: 'HLX5', brand: 'Sandvik', type: 'Surface', weight: '260 kg', impact: '32 kW', rotation: '4.0 kW', flushing: '300 l/min', connection: 'T51', rigs: 'Pantera / Leopard DI', series: 'HLX Surface' },
  { model: 'RD520', brand: 'Sandvik', type: 'Surface', weight: '185 kg', impact: '22 kW', rotation: '3.0 kW', flushing: '220 l/min', connection: 'T38', rigs: 'Ranger / Pantera DP series', series: 'RD Surface' },
  { model: 'RD525', brand: 'Sandvik', type: 'Surface', weight: '195 kg', impact: '24 kW', rotation: '3.2 kW', flushing: '240 l/min', connection: 'T45', rigs: 'Ranger DX series', series: 'RD Surface' },
  { model: 'RD314', brand: 'Sandvik', type: 'Surface', weight: '142 kg', impact: '16 kW', rotation: '2.4 kW', flushing: '180 l/min', connection: 'T35', rigs: 'Surface light rigs', series: 'RD Light' },
  // Epiroc Underground
  { model: 'COP1132', brand: 'Epiroc', type: 'Underground', weight: '132 kg', impact: '14 kW', rotation: '2.2 kW', flushing: '180 l/min', connection: 'T38', rigs: 'Boomer 281 / light rigs', series: 'COP 11 Series' },
  { model: 'COP1238', brand: 'Epiroc', type: 'Underground', weight: '145 kg', impact: '16 kW', rotation: '2.4 kW', flushing: '200 l/min', connection: 'T38', rigs: 'Boomer 282 / light rigs', series: 'COP 12 Series' },
  { model: 'COP1638', brand: 'Epiroc', type: 'Underground', weight: '160 kg', impact: '20 kW', rotation: '2.8 kW', flushing: '220 l/min', connection: 'T38', rigs: 'Boomer M2 / L2D', series: 'COP 16 Series' },
  { model: 'COP1838', brand: 'Epiroc', type: 'Underground', weight: '175 kg', impact: '23 kW', rotation: '3.0 kW', flushing: '240 l/min', connection: 'T38/T45', rigs: 'Boomer / ROC D7 / T1D', series: 'COP 18 Series' },
  { model: 'COP1840', brand: 'Epiroc', type: 'Underground', weight: '178 kg', impact: '23 kW', rotation: '3.2 kW', flushing: '240 l/min', connection: 'T45', rigs: 'Boomer S1D / T1D', series: 'COP 18 Series' },
  { model: 'COP2150', brand: 'Epiroc', type: 'Underground', weight: '215 kg', impact: '27 kW', rotation: '3.4 kW', flushing: '260 l/min', connection: 'T45', rigs: 'Boomer XL / L2D', series: 'COP 21 Series' },
  { model: 'COP2160', brand: 'Epiroc', type: 'Underground', weight: '218 kg', impact: '27 kW', rotation: '3.6 kW', flushing: '260 l/min', connection: 'T45/T51', rigs: 'Boomer XL3 series', series: 'COP 21 Series' },
  { model: 'COP2550', brand: 'Epiroc', type: 'Underground', weight: '268 kg', impact: '33 kW', rotation: '4.0 kW', flushing: '280 l/min', connection: 'T51', rigs: 'Large Boomer rigs', series: 'COP 25 Series' },
  { model: 'COP2560', brand: 'Epiroc', type: 'Underground', weight: '272 kg', impact: '33 kW', rotation: '4.2 kW', flushing: '300 l/min', connection: 'T51', rigs: 'Boomer L2D / XL3', series: 'COP 25 Series' },
  // Epiroc Surface
  { model: 'MD20', brand: 'Epiroc', type: 'Surface', weight: '210 kg', impact: '25 kW', rotation: '3.2 kW', flushing: '250 l/min', connection: 'T45', rigs: 'ROC series surface rigs', series: 'MD Surface' },
  { model: 'COP3060', brand: 'Epiroc', type: 'Surface', weight: '295 kg', impact: '36 kW', rotation: '4.4 kW', flushing: '310 l/min', connection: 'T51', rigs: 'Large surface rigs', series: 'COP 30 Series' },
  { model: 'COP4050', brand: 'Epiroc', type: 'Surface', weight: '380 kg', impact: '44 kW', rotation: '5.2 kW', flushing: '350 l/min', connection: 'T60', rigs: 'ROC D7-11 / T35 series', series: 'COP 40 Series' },
];

function DriftersContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [activeBrand, setActiveBrand] = useState<'all' | 'sandvik' | 'epiroc'>(
    (searchParams.get('brand') as 'sandvik' | 'epiroc') || 'all'
  );
  const [activeType, setActiveType] = useState<'all' | 'Surface' | 'Underground'>('all');
  const [selected, setSelected] = useState<DrifterModel | null>(null);

  const filtered = ALL_DRIFTERS.filter(d => {
    if (activeBrand !== 'all' && d.brand.toLowerCase() !== activeBrand) return false;
    if (activeType !== 'all' && d.type !== activeType) return false;
    return true;
  });

  const sandvikFiltered = filtered.filter(d => d.brand === 'Sandvik');
  const epirocFiltered = filtered.filter(d => d.brand === 'Epiroc');

  const brandColor = (b: 'Sandvik' | 'Epiroc') => b === 'Sandvik' ? '#ef4444' : '#f59e0b';
  const brandBg = (b: 'Sandvik' | 'Epiroc') => b === 'Sandvik' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)';

  return (
    <div style={{ paddingTop: 86 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '32px 0 28px',
      }}>
        <div className="container">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase' }}>
            Complete Rock Drills
          </p>
          <h1 style={{ fontSize: 28, marginBottom: 10 }}>Drifter Series</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 560, marginBottom: 24 }}>
            Compatible complete drifter units for Sandvik (HL/RD/HLX) and Epiroc (COP) series. All units tested with original test rigs before shipping.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['all', 'sandvik', 'epiroc'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setActiveBrand(b)}
                  style={{
                    padding: '7px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer',
                    background: activeBrand === b ? (b === 'sandvik' ? '#ef4444' : b === 'epiroc' ? '#f59e0b' : 'var(--primary)') : 'transparent',
                    color: activeBrand === b ? '#0b0f19' : 'var(--text-muted)',
                    border: activeBrand === b ? 'none' : '1px solid var(--border-color)',
                    transition: 'all 0.2s',
                  }}
                >{b === 'all' ? 'All Brands' : b === 'sandvik' ? 'Sandvik' : 'Epiroc'}</button>
              ))}
            </div>
            <div style={{ height: 20, width: 1, background: 'var(--border-color)', alignSelf: 'center' }} />
            <div style={{ display: 'flex', gap: 6 }}>
              {(['all', 'Underground', 'Surface'] as const).map(tp => (
                <button
                  key={tp}
                  onClick={() => setActiveType(tp)}
                  style={{
                    padding: '7px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer',
                    background: activeType === tp
                      ? tp === 'Surface' ? 'rgba(96,165,250,0.2)' : tp === 'Underground' ? 'rgba(167,139,250,0.2)' : 'var(--primary)'
                      : 'transparent',
                    color: activeType === tp
                      ? tp === 'Surface' ? '#60a5fa' : tp === 'Underground' ? '#a78bfa' : '#0b0f19'
                      : 'var(--text-muted)',
                    border: activeType === tp ? 'none' : '1px solid var(--border-color)',
                    transition: 'all 0.2s',
                  }}
                >{tp === 'all' ? 'All Types' : tp}</button>
              ))}
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center', marginLeft: 4 }}>
              {filtered.length} models
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        {/* Sandvik */}
        {(activeBrand === 'all' || activeBrand === 'sandvik') && sandvikFiltered.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 6, padding: '7px 16px',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>SANDVIK / TAMROCK</span>
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{sandvikFiltered.length} models</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {sandvikFiltered.map(d => (
                <DrifterCard key={d.model} drifter={d} onSelect={setSelected} />
              ))}
            </div>
          </div>
        )}

        {/* Epiroc */}
        {(activeBrand === 'all' || activeBrand === 'epiroc') && epirocFiltered.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: 6, padding: '7px 16px',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>EPIROC / ATLAS COPCO</span>
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{epirocFiltered.length} models</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {epirocFiltered.map(d => (
                <DrifterCard key={d.model} drifter={d} onSelect={setSelected} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <>
          <div
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000 }}
          />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(600px, 95vw)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 16, padding: 32,
            zIndex: 2001,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <span style={{
                  display: 'inline-block', fontSize: 11, fontWeight: 700,
                  padding: '4px 10px', borderRadius: 4, marginBottom: 10,
                  background: selected.brand === 'Sandvik' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                  color: selected.brand === 'Sandvik' ? '#ef4444' : '#f59e0b',
                }}>{selected.brand}</span>
                <h2 style={{ fontSize: 28, marginBottom: 4 }}>{selected.model}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{selected.series}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20,
              padding: '4px 12px', borderRadius: 99,
              background: selected.type === 'Surface' ? 'rgba(96,165,250,0.12)' : 'rgba(167,139,250,0.12)',
              color: selected.type === 'Surface' ? '#60a5fa' : '#a78bfa',
              fontSize: 12, fontWeight: 600,
            }}>{selected.type} Drilling</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Weight', value: selected.weight },
                { label: 'Impact Power', value: selected.impact },
                { label: 'Rotation Power', value: selected.rotation },
                { label: 'Flushing Air', value: selected.flushing },
                { label: 'Rod Connection', value: selected.connection },
                { label: 'Compatible Rigs', value: selected.rigs },
              ].map(spec => (
                <div key={spec.label} style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8, padding: '12px 16px',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{spec.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-white)' }}>{spec.value}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(255,192,61,0.05)',
              border: '1px solid rgba(255,192,61,0.2)',
              borderRadius: 8, padding: 16, marginBottom: 20,
              fontSize: 13, color: 'var(--text-muted)',
            }}>
              ✅ 400-hour overhaul warranty · Tested with OEM test rigs · OEM-compatible spare parts
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Link
                href={`/parts?compatibility=${selected.model}`}
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setSelected(null)}
              >
                <Package size={15} /> View Spare Parts
              </Link>
              <a
                href={`https://wa.me/905061208706?text=Hello%2C%20I%20need%20a%20quote%20for%20${selected.model}%20drifter.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#25D366', color: '#fff',
                  padding: '12px', borderRadius: 6,
                  fontSize: 14, fontWeight: 600,
                }}
              >
                📱 Request Quote
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DrifterCard({ drifter, onSelect }: { drifter: DrifterModel; onSelect: (d: DrifterModel) => void }) {
  const brandColor = drifter.brand === 'Sandvik' ? '#ef4444' : '#f59e0b';

  return (
    <div
      className="card"
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(drifter)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
          background: `${brandColor}20`, color: brandColor,
        }}>{drifter.series}</span>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
          background: drifter.type === 'Surface' ? 'rgba(96,165,250,0.12)' : 'rgba(167,139,250,0.12)',
          color: drifter.type === 'Surface' ? '#60a5fa' : '#a78bfa',
        }}>{drifter.type}</span>
      </div>

      <h3 style={{ fontSize: 22, marginBottom: 6, color: brandColor }}>{drifter.model}</h3>
      <p style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.4 }}>{drifter.rigs}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 16 }}>
        {[
          { l: 'Weight', v: drifter.weight },
          { l: 'Impact', v: drifter.impact },
          { l: 'Connection', v: drifter.connection },
          { l: 'Flushing', v: drifter.flushing },
        ].map(s => (
          <div key={s.l} style={{
            background: 'var(--bg-main)',
            borderRadius: 6, padding: '7px 10px',
            fontSize: 11,
          }}>
            <span style={{ color: 'var(--text-dark)', display: 'block' }}>{s.l}</span>
            <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>{s.v}</span>
          </div>
        ))}
      </div>

      <button
        onClick={e => { e.stopPropagation(); onSelect(drifter); }}
        style={{
          width: '100%', padding: '9px', borderRadius: 6,
          background: `${brandColor}15`, color: brandColor,
          border: `1px solid ${brandColor}30`,
          fontSize: 13, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'all 0.2s',
        }}
      >
        View Details <ChevronRight size={14} />
      </button>
    </div>
  );
}

export default function DriftersPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>}>
      <DriftersContent />
    </Suspense>
  );
}
