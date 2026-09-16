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
  HelpCircle
} from 'lucide-react';
import './ContactPage.css';

const InstagramIcon = ({ size = 22, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function ContactPage({ onBack }) {
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

    // تجهيز نص الاستفسار لإرساله إلى بريد تكنو إنجاز الرسمي info@technoenjaz.com
    const emailSubject = encodeURIComponent(`استفسار جديد عبر الموقع من: ${formData.name}`);
    const emailBody = encodeURIComponent(
      `استفسار جديد عبر موقع تكنو إنجاز:\n\n` +
      `👤 الاسم: ${formData.name}\n` +
      `🎓 الاختصاص: ${formData.specialization || 'غير محدد'}\n` +
      `🏛 الجامعة: ${formData.university || 'غير محدد'}\n` +
      `📧 البريد الإلكتروني: ${formData.email || 'غير محدد'}\n` +
      `📱 رقم الهاتف: ${formData.phone || 'غير محدد'}\n\n` +
      `💬 نص الاستفسار:\n${formData.inquiry}\n`
    );

    const mailtoUrl = `mailto:info@technoenjaz.com?subject=${emailSubject}&body=${emailBody}`;

    // فتح عميل البريد الإلكتروني لإرسال الاستفسار إلى info@technoenjaz.com
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  const MAP_LINK = "https://www.google.com/maps/place/35%C2%B007'44.4%22N+36%C2%B045'14.4%22E/@35.1289918,36.7561901,17z/data=!3m1!4b1!4m4!3m3!8m2!3d35.1289918!4d36.7540014?hl=ar";
  const MAP_IFRAME_SRC = "https://maps.google.com/maps?q=35.1289918,36.7540014&hl=ar&z=17&output=embed";

  return (
    <div className="contact-page-wrapper">
      {/* خلفية جمالية بشفق نيون خافت */}
      <div className="contact-ambient-glow" />
      <div className="contact-grid-pattern" />

      <div className="contact-container">
        {/* قسم الترويسة الرئيسية */}
        <section className="contact-hero">
          <h1 className="contact-hero-title">تواصل معنا</h1>
          <p className="contact-hero-desc">
            يسعدنا تواصلكم المستمر، والإجابة على كافة تساؤلاتكم وأفكاركم، ومشاركتكم في بناء حلول المستقبل.
          </p>
        </section>

        {/* شبكة المحتوى الرئيسية: نموذج الاستفسارات + معلومات المكتب والخريطة */}
        <div className="contact-main-grid">
          
          {/* العمود الأول: لوحة الاستفسارات */}
          <section className="contact-form-panel">
            <h2 className="contact-panel-title">
              هل لديك أي استشكال أو استفهام أو استفسار؟
            </h2>
            <p className="contact-panel-subtitle">
              املأ البيانات التالية ليتم إرسال استفسارك مباشرة إلى البريد الرسمي <span style={{ color: '#00d2ff', fontWeight: 700, direction: 'ltr', display: 'inline-block' }}>info@technoenjaz.com</span> وسيقوم فريق تكنو إنجاز بالرد وتقديم كامل الدعم لك.
            </p>

            {submitted ? (
              <div className="form-success-alert">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle2 size={22} color="#10b981" />
                  <span style={{ fontSize: '16px', fontWeight: 800 }}>تم توجيه استفسارك إلى info@technoenjaz.com بنجاح!</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                  شكراً لتواصلك معنا، كما يمكنك أيضاً إرسال نفس الاستفسار مباشرة عبر واتساب للمتابعة اللحظية.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
                  <a
                    href={`https://wa.me/963958794195?text=${encodeURIComponent(`مرحباً تكنو إنجاز، أرسلت استفساراً من ${formData.name || ''}:\n${formData.inquiry || ''}`)}`}
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
                    <span>متابعة عبر واتساب</span>
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', specialization: '', university: '', email: '', phone: '', inquiry: '' }); }}
                    style={{
                      padding: '8px 18px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontFamily: "'Readex Pro', sans-serif",
                      fontSize: '12.5px'
                    }}
                  >
                    إرسال استفسار آخر
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {/* الاسم الكامل */}
                <div className="form-group">
                  <label className="form-label">
                    <User size={15} />
                    <span>الاسم الكامل <span style={{ color: '#ef4444' }}>*</span></span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="مثال: أحمد العلي"
                    className="form-input"
                  />
                </div>

                {/* الاختصاص والجامعة في صف واحد */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <GraduationCap size={15} />
                      <span>الاختصاص</span>
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder="مثال: هندسة المعلوماتية / ذكاء اصطناعي"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Building size={15} />
                      <span>الجامعة</span>
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="مثال: جامعة حماة"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* الإيميل ورقم الهاتف في صف واحد */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={15} />
                      <span>البريد الإلكتروني</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={15} />
                      <span>رقم الهاتف / الواتساب</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+963 ..."
                      className="form-input"
                    />
                  </div>
                </div>

                {/* مكان ليكتب استفساره */}
                <div className="form-group">
                  <label className="form-label">
                    <HelpCircle size={15} />
                    <span>نص الاستفسار أو السؤال <span style={{ color: '#ef4444' }}>*</span></span>
                  </label>
                  <textarea
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="اكتب استفسارك أو استشكالك هنا بالتفصيل..."
                    className="form-textarea"
                  />
                </div>

                {/* زر الإرسال */}
                <button type="submit" className="form-submit-btn">
                  <Send size={18} />
                  <span>إرسال الاستفسار وتأكيد التواصل</span>
                </button>
              </form>
            )}
          </section>

          {/* العمود الثاني: معلومات المكتب والاتصال + الخريطة */}
          <section className="contact-info-panel">
            
            {/* بطاقات معلومات الاتصال */}
            <div className="info-cards-stack">
              
              {/* عنوان المقر الرئيسي */}
              <div className="info-card">
                <div className="info-icon-box cyan">
                  <MapPin size={22} />
                </div>
                <div className="info-text-box">
                  <span className="info-title">موقع المكتب والمقر</span>
                  <span className="info-value">
                    حماة - ساحة العاصي - بناء الخاني - بجوار أفران السلام - الطابق الرابع
                  </span>
                </div>
              </div>

              {/* البريد الإلكتروني الرسمي */}
              <a
                href="mailto:info@technoenjaz.com"
                className="info-card clickable"
              >
                <div className="info-icon-box cyan">
                  <Mail size={22} />
                </div>
                <div className="info-text-box">
                  <span className="info-title">البريد الإلكتروني الرسمي</span>
                  <span className="info-value" dir="ltr" style={{ textAlign: 'right' }}>
                    info@technoenjaz.com
                  </span>
                </div>
                <span className="info-badge-action email">
                  مراسلة ↗
                </span>
              </a>

              {/* التواصل المباشر عبر واتساب */}
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
                  <span className="info-title">التواصل المباشر على واتساب</span>
                  <span className="info-value" dir="ltr" style={{ textAlign: 'right' }}>
                    +963 958 794 195
                  </span>
                </div>
                <span className="info-badge-action whatsapp">
                  محادثة فورية ↗
                </span>
              </a>

              {/* حساب انستغرام */}
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
                  <span className="info-title">انستغرام تكنو إنجاز</span>
                  <span className="info-value" dir="ltr" style={{ textAlign: 'right' }}>
                    @TECHNO_ENJAZ
                  </span>
                </div>
                <span className="info-badge-action insta">
                  متابعة ↗
                </span>
              </a>
            </div>

            {/* بطاقة الخريطة التفاعلية */}
            <div className="contact-map-card">
              <div className="map-card-header">
                <div className="map-title">
                  <MapPin size={17} style={{ color: '#00d2ff' }} />
                  <span>موقعنا الجغرافي على الخريطة</span>
                </div>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-external-link"
                >
                  <span>فتح في خرائط جوجل</span>
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="map-iframe-wrapper">
                <iframe
                  title="موقع تكنو إنجاز - حماة"
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
