'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  Search, Filter, ShoppingCart, Check,
  ChevronLeft, ChevronRight, X, LayoutGrid, List,
  Tag, Cpu, Layers
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useQuote } from '@/context/QuoteContext';

interface Part {
  id: string;
  partNumber: string;
  name: string;
  brand: string;
  category: string;
  oemReference: string | null;
  compatibleDrifters: string;
  description: string | null;
  imageUrl: string | null;
}

interface Pagination {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

const CATEGORIES = ['All', 'Piston', 'Seal Kit', 'Bushing', 'Valve', 'Accumulator', 'Shank Adapter', 'Gear & Shaft', 'Hardware'];
const BRANDS = ['All', 'Sandvik', 'Epiroc'];
const LIMITS = [12, 24, 48];

function brandColor(b: string) {
  return b === 'Sandvik' ? '#ef4444' : b === 'Epiroc' ? '#f59e0b' : 'var(--primary)';
}
function brandBg(b: string) {
  return b === 'Sandvik' ? 'rgba(239,68,68,0.12)' : b === 'Epiroc' ? 'rgba(245,158,11,0.12)' : 'rgba(255,192,61,0.12)';
}

/* ─── Skeleton ─── */
function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-color)',
      borderRadius: 12, overflow: 'hidden',
    }}>
      <div style={{ height: 160, background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
          animation: 'shimmerMove 1.4s infinite',
        }} />
      </div>
      <div style={{ padding: 16 }}>
        {[80, 60, 40, 90].map((w, i) => (
          <div key={i} style={{
            height: 10, borderRadius: 5,
            background: 'var(--border-color)',
            width: `${w}%`, marginBottom: 10,
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        ))}
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-color)',
      borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center',
    }}>
      <div style={{ width: 64, height: 64, borderRadius: 8, background: 'var(--bg-main)', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        {[70, 45].map((w, i) => (
          <div key={i} style={{
            height: 10, borderRadius: 5,
            background: 'var(--border-color)',
            width: `${w}%`, marginBottom: 8,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Part card (grid) ─── */
function PartCard({ part, inBasket, onAdd }: { part: Part; inBasket: boolean; onAdd: () => void }) {
  const { t } = useLanguage();
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="part-card reveal" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div className="part-img-wrap" style={{ height: 160, position: 'relative' }}>
        <Image
          src={imgErr || !part.imageUrl ? '/images/part-placeholder.svg' : part.imageUrl}
          alt={part.name}
          fill
          style={{ objectFit: 'contain', padding: '12px' }}
          onError={() => setImgErr(true)}
          sizes="(max-width: 600px) 100vw, 280px"
        />
        {/* Brand badge overlay */}
        <span style={{
          position: 'absolute', top: 10, left: 10,
          fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
          padding: '3px 8px', borderRadius: 4,
          background: brandBg(part.brand),
          color: brandColor(part.brand),
          border: `1px solid ${brandColor(part.brand)}30`,
          backdropFilter: 'blur(8px)',
        }}>{part.brand.toUpperCase()}</span>
        {/* Category tag */}
        <span style={{
          position: 'absolute', top: 10, right: 10,
          fontSize: 10, fontWeight: 600,
          padding: '3px 8px', borderRadius: 4,
          background: 'rgba(255,255,255,0.88)',
          color: 'var(--text-muted)',
          backdropFilter: 'blur(8px)',
        }}>{part.category}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.3, color: 'var(--text-main)' }}>
          {part.name}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <Tag size={11} color="var(--text-dark)" />
            <span style={{ color: 'var(--text-dark)' }}>{t('catalog.partNum')}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{part.partNumber}</span>
          </div>
          {part.oemReference && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
              <Layers size={11} color="var(--text-dark)" />
              <span style={{ color: 'var(--text-dark)' }}>{t('catalog.oem')}</span>
              <span style={{ color: 'var(--text-muted)' }}>{part.oemReference}</span>
            </div>
          )}
        </div>

        {/* Compatible models chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
          {part.compatibleDrifters.split(',').slice(0, 4).map(d => (
            <span key={d} style={{
              fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 3,
              background: 'var(--bg-main)', border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
            }}>{d.trim()}</span>
          ))}
          {part.compatibleDrifters.split(',').length > 4 && (
            <span style={{ fontSize: 9, color: 'var(--text-dark)', padding: '2px 4px' }}>
              +{part.compatibleDrifters.split(',').length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={onAdd}
          style={{
            marginTop: 'auto',
            width: '100%', padding: '10px 12px',
            borderRadius: 7, fontSize: 12, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            cursor: 'pointer',
            background: inBasket ? 'rgba(16,185,129,0.12)' : 'var(--primary)',
            color: inBasket ? 'var(--success)' : '#0b0f19',
            border: inBasket ? '1px solid rgba(16,185,129,0.4)' : 'none',
            transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          {inBasket ? <><Check size={13} /> {t('catalog.inBasket')}</> : <><ShoppingCart size={13} /> {t('catalog.addToQuote')}</>}
        </button>
      </div>
    </div>
  );
}

/* ─── Part row (list) ─── */
function PartRow({ part, inBasket, onAdd }: { part: Part; inBasket: boolean; onAdd: () => void }) {
  const { t, language } = useLanguage();
  const isTr = language === 'tr';
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="part-row reveal" style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
      {/* Image */}
      <div style={{
        width: 100, flexShrink: 0,
        background: 'var(--bg-main)',
        position: 'relative',
        borderRight: '1px solid var(--border-color)',
      }}>
        <Image
          src={imgErr || !part.imageUrl ? '/images/part-placeholder.svg' : part.imageUrl}
          alt={part.name}
          fill
          style={{ objectFit: 'contain', padding: 10 }}
          onError={() => setImgErr(true)}
          sizes="100px"
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {/* Info */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 4,
              background: brandBg(part.brand), color: brandColor(part.brand),
            }}>{part.brand}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4,
              background: 'var(--bg-main)', border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
            }}>{part.category}</span>
          </div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: 'var(--text-main)' }}>{part.name}</h3>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-muted)' }}>
            <span><span style={{ color: 'var(--text-dark)' }}>No: </span>{part.partNumber}</span>
            {part.oemReference && <span><span style={{ color: 'var(--text-dark)' }}>OEM: </span>{part.oemReference}</span>}
          </div>
        </div>

        {/* Compatible models */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 280 }}>
          {part.compatibleDrifters.split(',').slice(0, 5).map(d => (
            <span key={d} style={{
              fontSize: 10, fontWeight: 600, padding: '3px 7px', borderRadius: 4,
              background: 'var(--bg-main)', border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
            }}>{d.trim()}</span>
          ))}
          {part.compatibleDrifters.split(',').length > 5 && (
            <span style={{ fontSize: 10, color: 'var(--text-dark)', padding: '3px' }}>
              +{part.compatibleDrifters.split(',').length - 5}
            </span>
          )}
        </div>

        {/* Add button */}
        <button
          onClick={onAdd}
          style={{
            padding: '9px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', flexShrink: 0,
            background: inBasket ? 'rgba(16,185,129,0.12)' : 'var(--primary)',
            color: inBasket ? 'var(--success)' : '#0b0f19',
            border: inBasket ? '1px solid rgba(16,185,129,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {inBasket ? <><Check size={13} /> {isTr ? 'Eklendi' : 'Added'}</> : <><ShoppingCart size={13} /> {isTr ? 'Ekle' : 'Add'}</>}
        </button>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
function PartsContent() {
  const { t, language } = useLanguage();
  const isTr = language === 'tr';
  const { basket, addToBasket } = useQuote();
  const searchParams = useSearchParams();

  const [parts, setParts] = useState<Part[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [q, setQ] = useState('');
  const [brand, setBrand] = useState(searchParams.get('brand') || 'All');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(24);
  const [filterOpen, setFilterOpen] = useState(false);

  const fetchParts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (brand && brand !== 'All') params.set('brand', brand);
    if (category && category !== 'All') params.set('category', category);
    params.set('page', String(page));
    params.set('limit', String(limit));

    const res = await fetch(`/api/parts?${params}`);
    const data = await res.json();
    setParts(data.parts || []);
    setPagination(data.pagination || null);
    setLoading(false);
  }, [q, brand, category, page, limit]);

  useEffect(() => { fetchParts(); }, [fetchParts]);

  // Trigger scroll reveal after parts load
  useEffect(() => {
    if (!loading) {
      const els = document.querySelectorAll('.reveal');
      els.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 45);
      });
    }
  }, [loading, parts]);

  const isInBasket = (id: string) => basket.some(i => i.id === id);
  const activeFilters = [brand !== 'All' && brand, category !== 'All' && category].filter(Boolean);

  return (
    <div style={{ paddingTop: 120 }}>
      {/* ── Header ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '32px 0 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(255,192,61,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase' }}>
            {isTr ? 'Yedek Parça Kataloğu' : 'Spare Parts Catalog'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 26, marginBottom: 4 }}>{t('catalog.title')}</h1>
              {pagination && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{pagination.totalCount}</span> {t('catalog.resultsFound')}
                  {activeFilters.length > 0 && (
                    <span style={{ marginLeft: 6 }}>
                      {isTr ? ' — filtrelenen:' : ' — filtered by: '} {activeFilters.map(f => (
                        <span key={String(f)} style={{
                          marginLeft: 4, padding: '1px 7px', borderRadius: 4,
                          background: 'rgba(255,192,61,0.12)', color: 'var(--primary)',
                          fontSize: 11, fontWeight: 700,
                        }}>{String(f)}</span>
                      ))}
                    </span>
                  )}
                </p>
              )}
            </div>
            {/* View toggle */}
            <div style={{ display: 'flex', gap: 4 }}>
              {(['grid', 'list'] as const).map(v => (
                <button key={v} onClick={() => setViewMode(v)} style={{
                  width: 34, height: 34, borderRadius: 6, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: viewMode === v ? 'var(--primary)' : 'transparent',
                  color: viewMode === v ? '#0b0f19' : 'var(--text-muted)',
                  border: viewMode === v ? 'none' : '1px solid var(--border-color)',
                  transition: 'all 0.2s',
                }}>
                  {v === 'grid' ? <LayoutGrid size={15} /> : <List size={15} />}
                </button>
              ))}
            </div>
          </div>

          {/* Search + Filters row */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={15} style={{ position: 'absolute', left: 13, color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder={t('general.searchPlaceholder')}
                value={q}
                onChange={e => { setQ(e.target.value); setPage(1); }}
                style={{
                  width: '100%', paddingLeft: 38, paddingRight: q ? 34 : 14,
                  height: 42,
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8, fontSize: 13,
                  color: 'var(--text-main)',
                  transition: 'border-color 0.2s',
                }}
              />
              {q && (
                <button onClick={() => { setQ(''); setPage(1); }} style={{
                  position: 'absolute', right: 10, color: 'var(--text-muted)', cursor: 'pointer',
                }}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Brand quick-filter */}
            <div style={{ display: 'flex', gap: 5 }}>
              {BRANDS.map(b => (
                <button key={b} onClick={() => { setBrand(b); setPage(1); }} style={{
                  height: 42, padding: '0 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: brand === b
                    ? b === 'Sandvik' ? '#ef4444' : b === 'Epiroc' ? '#f59e0b' : 'var(--primary)'
                    : 'transparent',
                  color: brand === b ? '#0b0f19' : 'var(--text-muted)',
                  border: brand === b ? 'none' : '1px solid var(--border-color)',
                }}>{b}</button>
              ))}
            </div>

            <button onClick={() => setFilterOpen(!filterOpen)}
              className="btn btn-secondary"
              style={{ height: 42, gap: 7, fontSize: 13 }}
            >
              <Filter size={14} />
              {isTr ? 'Diğer Filtreler' : 'More Filters'}
              {(category !== 'All') && (
                <span style={{
                  background: 'var(--primary)', color: '#0b0f19',
                  width: 16, height: 16, borderRadius: '50%',
                  fontSize: 9, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>!</span>
              )}
            </button>
          </div>

          {/* Expanded filter panel */}
          {filterOpen && (
            <div style={{
              marginTop: 12, padding: '16px 20px',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start',
            }}>
              {/* Category */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  {t('catalog.category')}
                </label>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => { setCategory(c); setPage(1); }} style={{
                      padding: '5px 11px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.15s',
                      background: category === c ? 'var(--primary)' : 'transparent',
                      color: category === c ? '#0b0f19' : 'var(--text-muted)',
                      border: category === c ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    }}>{c}</button>
                  ))}
                </div>
              </div>

              {/* Per page */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  {isTr ? 'Sayfa Başına' : 'Per Page'}
                </label>
                <div style={{ display: 'flex', gap: 5 }}>
                  {LIMITS.map(l => (
                    <button key={l} onClick={() => { setLimit(l); setPage(1); }} style={{
                      padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.15s',
                      background: limit === l ? 'var(--secondary)' : 'transparent',
                      color: limit === l ? 'var(--text-white)' : 'var(--text-muted)',
                      border: `1px solid ${limit === l ? 'var(--primary)' : 'var(--border-color)'}`,
                    }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {(brand !== 'All' || category !== 'All' || q) && (
                <button onClick={() => { setQ(''); setBrand('All'); setCategory('All'); setPage(1); }}
                  style={{ alignSelf: 'flex-end', color: 'var(--danger)', fontSize: 12, cursor: 'pointer' }}>
                  <X size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {isTr ? 'Filtreleri Temizle' : 'Clear all'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Grid / List ── */}
      <div className="container" style={{ padding: '28px 20px 48px' }}>
        {loading ? (
          viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Array.from({ length: limit }).map((_, i) => <SkeletonRow key={i} />)}
            </div>
          )
        ) : parts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <Search size={48} style={{ marginBottom: 16, opacity: 0.25 }} />
            <h3 style={{ marginBottom: 8, color: 'var(--text-muted)', fontWeight: 500 }}>{t('catalog.noResults')}</h3>
            <button onClick={() => { setQ(''); setBrand('All'); setCategory('All'); setPage(1); }}
              style={{ color: 'var(--primary)', fontSize: 14, cursor: 'pointer', marginTop: 8 }}>
              {isTr ? 'Tüm filtreleri temizle' : 'Clear all filters'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {parts.map(part => (
              <PartCard
                key={part.id}
                part={part}
                inBasket={isInBasket(part.id)}
                onAdd={() => addToBasket(part)}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {parts.map(part => (
              <PartRow
                key={part.id}
                part={part}
                inBasket={isInBasket(part.id)}
                onAdd={() => addToBasket(part)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6,
            marginTop: 40, flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                width: 36, height: 36, borderRadius: 7,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.4 : 1, color: 'var(--text-muted)',
              }}
            ><ChevronLeft size={15} /></button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`dots-${i}`} style={{ color: 'var(--text-dark)', padding: '0 4px' }}>…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    style={{
                      width: 36, height: 36, borderRadius: 7,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      background: page === p ? 'var(--primary)' : 'var(--bg-card)',
                      color: page === p ? '#0b0f19' : 'var(--text-muted)',
                      border: page === p ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      transition: 'all 0.15s',
                    }}
                  >{p}</button>
                )
              )
            }

            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              style={{
                width: 36, height: 36, borderRadius: 7,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                cursor: page === pagination.totalPages ? 'not-allowed' : 'pointer',
                opacity: page === pagination.totalPages ? 0.4 : 1, color: 'var(--text-muted)',
              }}
            ><ChevronRight size={15} /></button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmerMove {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

export default function PartsPage() {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--text-muted)', padding: '140px 20px' }}>
        {isTr ? 'Katalog yükleniyor...' : 'Loading catalog...'}
      </div>
    }>
      <PartsContent />
    </Suspense>
  );
}
