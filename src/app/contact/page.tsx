'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: [] }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setError('Message could not be sent. Please contact us directly via WhatsApp or email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 120 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '48px 0 40px',
      }}>
        <div className="container">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--primary)', marginBottom: 12, textTransform: 'uppercase' }}>
            Get in Touch
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 12 }}>Contact Us</h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 500 }}>
            Request a quote, ask technical questions, or start a parts inquiry. Our team responds within 24 hours.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '56px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {/* Left: Contact Info */}
          <div>
            <h2 style={{ marginBottom: 24, fontSize: 22 }}>Direct Contact</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              <a
                href="https://wa.me/905061208706"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 20px', borderRadius: 12,
                  background: 'rgba(37,211,102,0.08)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: '#25D366',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>📱</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#25D366', marginBottom: 2 }}>WhatsApp 24/7</div>
                  <div style={{ fontSize: 15, color: 'var(--text-main)', fontWeight: 600 }}>+90 506 120 87 06</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Fastest response channel</div>
                </div>
              </a>

              <a
                href="tel:+905061208706"
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 20px', borderRadius: 12,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(255,192,61,0.12)',
                  border: '1px solid rgba(255,192,61,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Phone size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 2 }}>Phone</div>
                  <div style={{ fontSize: 15, color: 'var(--text-main)', fontWeight: 600 }}>+90 506 120 87 06</div>
                </div>
              </a>

              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '18px 20px', borderRadius: 12,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(255,192,61,0.12)',
                  border: '1px solid rgba(255,192,61,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MapPin size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 2 }}>Turkey Head Office</div>
                  <div style={{ fontSize: 14, color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.5 }}>
                    Zümrüt Mahallesi, 2031. Sokak, No: 12/3, Denizli / Turkey
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>info@FedMiningSolutions.com</div>
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '18px 20px', borderRadius: 12,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(255,192,61,0.12)',
                  border: '1px solid rgba(255,192,61,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MapPin size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 2 }}>Ghana Branch Office</div>
                  <div style={{ fontSize: 14, color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.5 }}>
                    Office # 3, 1st floor, Bethel House, East Legon Hills, Accra / Ghana
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>info.ghana@FedMiningSolutions.com</div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 12, padding: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Clock size={16} color="var(--primary)" />
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)' }}>Business Hours</span>
              </div>
              {[
                { day: 'Monday – Friday', hours: '08:00 – 18:00 (GMT+3)', active: true },
                { day: 'Saturday', hours: '09:00 – 14:00 (GMT+3)', active: true },
                { day: 'Sunday', hours: 'Closed (WhatsApp available)', active: false },
              ].map(bh => (
                <div key={bh.day} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: 13,
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{bh.day}</span>
                  <span style={{ color: bh.active ? 'var(--success)' : 'var(--text-dark)' }}>{bh.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 style={{ marginBottom: 24, fontSize: 22 }}>Send a Message</h2>

            {success ? (
              <div style={{
                padding: 28, background: 'rgba(16,185,129,0.1)',
                border: '1px solid var(--success)', borderRadius: 12,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <h3 style={{ color: 'var(--success)', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                  Thank you! We will contact you within 24 hours. For urgent inquiries, please use WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                      {t('basket.name')} *
                    </label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      style={{
                        width: '100%', padding: '11px 14px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 8, fontSize: 14,
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                      {t('basket.phone')}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      style={{
                        width: '100%', padding: '11px 14px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 8, fontSize: 14,
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {t('basket.email')} *
                  </label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    style={{
                      width: '100%', padding: '11px 14px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8, fontSize: 14,
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                    {t('basket.message')} *
                  </label>
                  <textarea
                    required rows={6}
                    placeholder="e.g. I need COP1838 pistons, 10 pcs. Also interested in HL700 seal kits."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{
                      width: '100%', padding: '11px 14px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8, fontSize: 14,
                      color: 'var(--text-main)',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ padding: '13px', fontSize: 15 }}
                >
                  <Send size={16} />
                  {submitting ? t('general.loading') : 'Send Message'}
                </button>

                <p style={{ fontSize: 12, color: 'var(--text-dark)', textAlign: 'center' }}>
                  Or reach us instantly on{' '}
                  <a href="https://wa.me/905061208706" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>
                    WhatsApp
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
