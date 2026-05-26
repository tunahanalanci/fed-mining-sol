'use client';

import { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingCart } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';
import { useLanguage } from '@/context/LanguageContext';

export default function QuoteBasket() {
  const { basket, isBasketOpen, setIsBasketOpen, removeFromBasket, updateQuantity, clearBasket } = useQuote();
  const { t } = useLanguage();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (basket.length === 0) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: basket.map(i => ({ partId: i.id, quantity: i.quantity })),
        }),
      });

      if (!res.ok) throw new Error('Failed');

      setSuccess(true);
      clearBasket();
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => { setSuccess(false); setIsBasketOpen(false); }, 3000);
    } catch {
      setError('Submission failed. Please try WhatsApp or email instead.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isBasketOpen && (
        <div
          onClick={() => setIsBasketOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 1998,
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: Math.min(480, typeof window !== 'undefined' ? window.innerWidth : 480),
        maxWidth: '100vw',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-color)',
        zIndex: 1999,
        transform: isBasketOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingCart size={20} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: 16 }}>{t('basket.title')}</h3>
            {basket.length > 0 && (
              <span style={{
                background: 'var(--primary)', color: '#0b0f19',
                padding: '2px 8px', borderRadius: 99,
                fontSize: 12, fontWeight: 700,
              }}>{basket.length}</span>
            )}
          </div>
          <button
            onClick={() => setIsBasketOpen(false)}
            style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {basket.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <ShoppingCart size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
              <p>{t('basket.empty')}</p>
            </div>
          ) : (
            <>
              {success ? (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)',
                  borderRadius: 8, padding: 20, textAlign: 'center', marginBottom: 16,
                  color: 'var(--success)',
                }}>
                  ✅ {t('basket.success')}
                </div>
              ) : (
                <>
                  {/* Items */}
                  <div style={{ marginBottom: 20 }}>
                    {basket.map(item => (
                      <div key={item.id} style={{
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                        padding: '12px 0', borderBottom: '1px solid var(--border-color)',
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-white)', marginBottom: 2 }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                            {item.partNumber} · {item.brand}
                          </div>
                        </div>
                        {/* Qty */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              width: 24, height: 24, borderRadius: 4,
                              border: '1px solid var(--border-color)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', color: 'var(--text-muted)',
                            }}
                          ><Minus size={12} /></button>
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-white)', minWidth: 20, textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              width: 24, height: 24, borderRadius: 4,
                              border: '1px solid var(--border-color)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', color: 'var(--text-muted)',
                            }}
                          ><Plus size={12} /></button>
                        </div>
                        <button
                          onClick={() => removeFromBasket(item.id)}
                          style={{ color: 'var(--danger)', cursor: 'pointer', padding: 2 }}
                        ><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <div>
                    <h4 style={{ fontSize: 14, marginBottom: 14, color: 'var(--text-white)' }}>
                      {t('basket.formTitle')}
                    </h4>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        { key: 'name', label: t('basket.name'), type: 'text', required: true },
                        { key: 'email', label: t('basket.email'), type: 'email', required: true },
                        { key: 'phone', label: t('basket.phone'), type: 'tel', required: false },
                      ].map(f => (
                        <input
                          key={f.key}
                          type={f.type}
                          placeholder={f.label}
                          required={f.required}
                          value={(form as any)[f.key]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          style={{
                            width: '100%', padding: '10px 14px',
                            background: 'var(--bg-main)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 6, fontSize: 13,
                            color: 'var(--text-main)',
                          }}
                        />
                      ))}
                      <textarea
                        placeholder={t('basket.message')}
                        value={form.message}
                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        style={{
                          width: '100%', padding: '10px 14px',
                          background: 'var(--bg-main)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 6, fontSize: 13,
                          color: 'var(--text-main)',
                          resize: 'vertical',
                        }}
                      />
                      {error && <p style={{ color: 'var(--danger)', fontSize: 12 }}>{error}</p>}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: 4 }}
                      >
                        <Send size={15} />
                        {submitting ? t('general.loading') : t('basket.submit')}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
