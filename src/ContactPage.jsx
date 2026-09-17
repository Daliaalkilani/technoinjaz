import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  User,
  GraduationCap,
  Building,
  Send,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import './ContactPage.css';

const InstagramIcon = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function ContactPage({ onBack }) {
  const { lang, t } = useThemeLanguage();
  const isEn = lang === 'en';

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    university: '',
    email: '',
    phone: '',
    inquiry: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.inquiry.trim()) return;

    const emailSubject = encodeURIComponent(
      isEn ? `New Website Inquiry from: ${formData.name}` : `استفسار جديد عبر الموقع من: ${formData.name}`
    );
    const emailBody = encodeURIComponent(
      isEn
        ? `New inquiry via Techno Enjaz website:\n\n` +
          `👤 Name: ${formData.name}\n` +
          `🎓 Major: ${formData.specialization || 'Not specified'}\n` +
          `🏛 University: ${formData.university || 'Not specified'}\n` +
          `📧 Email: ${formData.email || 'Not specified'}\n` +
          `📱 Phone: ${formData.phone || 'Not specified'}\n\n` +
          `💬 Inquiry:\n${formData.inquiry}\n`
        : `استفسار جديد عبر موقع تكنو إنجاز:\n\n` +
          `👤 الاسم: ${formData.name}\n` +
          `🎓 الاختصاص: ${formData.specialization || 'غير محدد'}\n` +
          `🏛 الجامعة: ${formData.university || 'غير محدد'}\n` +
          `📧 البريد الإلكتروني: ${formData.email || 'غير محدد'}\n` +
          `📱 رقم الهاتف: ${formData.phone || 'غير محدد'}\n\n` +
          `💬 نص الاستفسار:\n${formData.inquiry}\n`
    );

    const mailtoUrl = `mailto:info@technoenjaz.com?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const MAP_LINK = `https://www.google.com/maps/place/35%C2%B007'44.4%22N+36%C2%B045'14.4%22E/@35.1289918,36.7561901,17z/data=!3m1!4b1!4m4!3m3!8m2!3d35.1289918!4d36.7540014?hl=${lang}`;
  const MAP_IFRAME_SRC = `https://maps.google.com/maps?q=35.1289918,36.7540014&hl=${lang}&z=17&output=embed`;

  const waText = isEn
    ? `Hello Techno Enjaz, I sent an inquiry from ${formData.name || ''}:\n${formData.inquiry || ''}`
    : `مرحباً تكنو إنجاز، أرسلت استفساراً من ${formData.name || ''}:\n${formData.inquiry || ''}`;

  return (
    <div className="contact-page-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Ambient background glow */}
      <div className="contact-ambient-glow" />
      <div className="contact-grid-pattern" />

      <div className="contact-container">
        {/* Back navigation button if onBack provided */}
        {onBack && (
          <div style={{ width: '100%', marginBottom: '24px', display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: 'var(--text-main, #ffffff)',
                cursor: 'pointer',
                fontFamily: "'Readex Pro', sans-serif",
                fontSize: '13px',
                transition: 'all 0.25s ease'
              }}
            >
              {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              <span>{t.contact.backHome}</span>
            </button>
          </div>
        )}

        {/* Hero header */}
        <section className="contact-hero">
          <h1 className="contact-hero-title">{t.contact.title}</h1>
          <p className="contact-hero-desc">
            {t.contact.subtitle}
          </p>
        </section>

        {/* Main Content Grid: Form + Info & Map */}
        <div className="contact-main-grid">
          
          {/* Column 1: Inquiry Form Panel */}
          <section className="contact-form-panel">
            <h2 className="contact-panel-title">
              {t.contact.panelTitle}
            </h2>
            <p className="contact-panel-subtitle">
              {t.contact.panelSubtitle}
            </p>

            {submitted ? (
              <div className="form-success-alert">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle2 size={22} color="#10b981" />
                  <span style={{ fontSize: '16px', fontWeight: 800 }}>{t.contact.successTitle}</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                  {t.contact.successDesc}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
                  <a
                    href={`https://wa.me/963958794195?text=${encodeURIComponent(waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 18px',
                      background: 'rgba(37, 211, 102, 0.2)',
                      border: '1px solid rgba(37, 211, 102, 0.45)',
                      borderRadius: '8px',
                      color: '#25d366',
                      textDecoration: 'none',
                      fontFamily: "'Readex Pro', sans-serif",
                      fontSize: '12.5px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>{t.contact.followWhatsapp}</span>
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', specialization: '', university: '', email: '', phone: '', inquiry: '' }); }}
                    style={{
                      padding: '8px 18px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'var(--text-main, #ffffff)',
                      cursor: 'pointer',
                      fontFamily: "'Readex Pro', sans-serif",
                      fontSize: '12.5px'
                    }}
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">
                    <User size={15} />
                    <span>{t.contact.fullName} <span style={{ color: '#ef4444' }}>*</span></span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.namePlaceholder}
                    className="form-input"
                  />
                </div>

                {/* Major and University */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <GraduationCap size={15} />
                      <span>{t.contact.major}</span>
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder={t.contact.specializationPlaceholder}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Building size={15} />
                      <span>{t.contact.university}</span>
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder={t.contact.universityPlaceholder}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={15} />
                      <span>{t.contact.email}</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={15} />
                      <span>{t.contact.phone}</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contact.phonePlaceholder}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Inquiry text */}
                <div className="form-group">
                  <label className="form-label">
                    <HelpCircle size={15} />
                    <span>{t.contact.inquiry} <span style={{ color: '#ef4444' }}>*</span></span>
                  </label>
                  <textarea
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={t.contact.inquiryPlaceholder}
                    className="form-textarea"
                  />
                </div>

                {/* Submit button */}
                <button type="submit" className="form-submit-btn">
                  <Send size={18} />
                  <span>{t.contact.submit}</span>
                </button>
              </form>
            )}
          </section>

          {/* Column 2: Office & Contact Info + Map */}
          <section className="contact-info-panel">
            
            {/* Info Cards Stack */}
            <div className="info-cards-stack">
              
              {/* Headquarters Location */}
              <div className="info-card">
                <div className="info-icon-box cyan">
                  <MapPin size={22} />
                </div>
                <div className="info-text-box">
                  <span className="info-title">{t.contact.locationTitle}</span>
                  <span className="info-value">
                    {t.contact.locationDesc}
                  </span>
                </div>
              </div>

              {/* Official Email */}
              <a
                href="mailto:info@technoenjaz.com"
                className="info-card clickable"
              >
                <div className="info-icon-box cyan">
                  <Mail size={22} />
                </div>
                <div className="info-text-box">
                  <span className="info-title">{t.contact.emailTitle}</span>
                  <span className="info-value" dir="ltr" style={{ textAlign: isEn ? 'left' : 'right' }}>
                    info@technoenjaz.com
                  </span>
                </div>
                <span className="info-badge-action email">
                  {t.contact.messageNow}
                </span>
              </a>

              {/* Direct WhatsApp */}
              <a
                href="https://wa.me/963958794195"
                target="_blank"
                rel="noopener noreferrer"
                className="info-card clickable"
              >
                <div className="info-icon-box green">
                  <MessageCircle size={22} />
                </div>
                <div className="info-text-box">
                  <span className="info-title">{t.contact.whatsappTitle}</span>
                  <span className="info-value" dir="ltr" style={{ textAlign: isEn ? 'left' : 'right' }}>
                    +963 958 794 195
                  </span>
                </div>
                <span className="info-badge-action whatsapp">
                  {t.contact.chatNow}
                </span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/TECHNO_ENJAZ"
                target="_blank"
                rel="noopener noreferrer"
                className="info-card clickable"
              >
                <div className="info-icon-box purple">
                  <InstagramIcon size={22} />
                </div>
                <div className="info-text-box">
                  <span className="info-title">{t.contact.instaTitle}</span>
                  <span className="info-value" dir="ltr" style={{ textAlign: isEn ? 'left' : 'right' }}>
                    @TECHNO_ENJAZ
                  </span>
                </div>
                <span className="info-badge-action insta">
                  {t.contact.followNow}
                </span>
              </a>
            </div>

            {/* Interactive Map Card */}
            <div className="contact-map-card">
              <div className="map-card-header">
                <div className="map-title">
                  <MapPin size={17} style={{ color: '#00d2ff' }} />
                  <span>{t.contact.mapTitle}</span>
                </div>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-external-link"
                >
                  <span>{t.contact.openGoogleMaps}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="map-iframe-wrapper">
                <iframe
                  title={t.contact.mapIframeTitle}
                  src={MAP_IFRAME_SRC}
                  className="map-iframe"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}
