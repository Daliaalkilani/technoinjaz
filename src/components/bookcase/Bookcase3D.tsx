'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, FileText, ChevronRight, Layers } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import FlipbookViewer from './FlipbookViewer';
import './Bookcase.css';

export interface BookItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  spineText?: string;
  spineColor?: string;
  coverImage?: string;
  pdfUrl: string;
  category?: string;
  categoryEn?: string;
  pages?: number;
}

export interface Bookcase3DProps {
  books?: BookItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_BOOKS: BookItem[] = [
  {
    id: 'robotics-summer-club',
    title: 'نادي الروبوتات الصيفي للأطفال',
    titleEn: 'Robotics Summer Club for Kids',
    subtitle: 'منهاج تدريبي وتطبيقي شامل لعلوم الروبوتات والذكاء الاصطناعي (STEM)',
    subtitleEn: 'Comprehensive hands-on curriculum in Robotics & AI for young innovators',
    spineText: 'نادي الروبوتات | ROBOTICS',
    spineColor: 'linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #2563eb 100%)',
    pdfUrl: '/pdf/robotics-summer-club.pdf',
    category: 'روبوتات وذكاء اصطناعي',
    categoryEn: 'Robotics & STEM',
    pages: 9
  },
  {
    id: 'virtual-board-whitepaper',
    title: 'نظام اللوح الافتراضي وتتبع اليد',
    titleEn: 'Virtual Board & Hand Tracking Whitepaper',
    subtitle: 'المعمارية البرمجية وخوارزميات الرؤية الحاسوبية للتفاعل اللمسي بدون شاشات',
    subtitleEn: 'Computer vision algorithms & architectural specifications for touchless UI',
    spineText: 'اللوح الافتراضي | Virtual Board',
    spineColor: 'linear-gradient(90deg, #047857 0%, #10b981 50%, #059669 100%)',
    pdfUrl: '/docs/projects/virtual-board-hand-tracking.pdf',
    category: 'رؤية حاسوبية',
    categoryEn: 'Computer Vision',
    pages: 12
  },
  {
    id: 'embedded-serial-protocols',
    title: 'بروتوكولات الاتصال التسلسلي في IoT',
    titleEn: 'Embedded Serial Protocols in IoT',
    subtitle: 'دليل مهندسي النظم المدمجة لمقارنة UART وSPI وI2C وCAN Bus',
    subtitleEn: 'Embedded systems engineer guide to UART, SPI, I2C, and CAN architectures',
    spineText: 'بروتوكولات IoT | Serial Protocols',
    spineColor: 'linear-gradient(90deg, #6d28d9 0%, #8b5cf6 50%, #7c3aed 100%)',
    pdfUrl: '/pdf/robotics-summer-club.pdf',
    category: 'إنترنت الأشياء',
    categoryEn: 'IoT & Firmware',
    pages: 9
  }
];

export const Bookcase3D: React.FC<Bookcase3DProps> = ({
  books = DEFAULT_BOOKS,
  title,
  subtitle,
  className = ''
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [activeBook, setActiveBook] = useState<BookItem | null>(null);

  const headingText = title || (isEn ? '3D Virtual Bookcase & Flipbook Reader' : 'المكتبة التفاعلية ثلاثية الأبعاد (3D Bookcase)');
  const subText = subtitle || (
    isEn
      ? 'Explore our technical documentations, research papers, and guides with real-time 3D paper folding effect.'
      : 'تصفح التقارير الهندسية والأوراق البحثية والمناهج التطبيقية بمؤثر تقليب وطي الصفحات ثلاثي الأبعاد الواقعي.'
  );

  return (
    <section className={`bookcase-section ${className}`} dir={isEn ? 'ltr' : 'rtl'}>
      <div className="bookcase-container">
        {/* Header */}
        <div className="bookcase-header">
          <div className="bookcase-badge">
            <Sparkles size={15} />
            <span>{isEn ? 'Interactive 3D Library' : 'مكتبة ثلاثية الأبعاد تفاعلية'}</span>
          </div>
          <h2 className="bookcase-title">{headingText}</h2>
          <p className="bookcase-subtitle">{subText}</p>
        </div>

        {/* 3D Shelf Stage */}
        <div className="bookshelf-stage">
          <div className="shelf-row">
            {books.map((book) => {
              const bookTitle = isEn ? (book.titleEn || book.title) : book.title;
              const bookCategory = isEn ? (book.categoryEn || book.category) : book.category;

              return (
                <div
                  key={book.id}
                  className="book-3d-wrapper"
                  onClick={() => setActiveBook(book)}
                  title={isEn ? `Open ${bookTitle} in 3D Reader` : `فتح ${bookTitle} في القارئ ثلاثي الأبعاد`}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveBook(book);
                    }
                  }}
                >
                  <div className="book-3d">
                    {/* Front Cover */}
                    <div className="book-face book-front">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={bookTitle} className="book-cover-img" />
                      ) : (
                        <div className="book-cover-fallback">
                          <div className="tag">{bookCategory || (isEn ? 'Engineering' : 'وثيقة هندسية')}</div>
                          <h4 className="title">{bookTitle}</h4>
                          <div className="badge">{isEn ? 'Click to Flip 3D' : 'انقر للتقليب 3D'}</div>
                        </div>
                      )}
                    </div>

                    {/* Back Cover */}
                    <div className="book-face book-back" />

                    {/* Colored Spine */}
                    <div
                      className="book-face book-spine"
                      style={{ background: book.spineColor || undefined }}
                    >
                      <span className="book-spine-text">
                        {book.spineText || bookTitle}
                      </span>
                    </div>

                    {/* Paper Edges */}
                    <div className="book-face book-right" />
                    <div className="book-face book-top" />
                    <div className="book-face book-bottom" />
                  </div>

                  {/* Hover Info Card */}
                  <div className="book-3d-info">
                    <span className="book-3d-title">{bookTitle}</span>
                    <span className="book-3d-action-pill">
                      {isEn ? '📖 Read in 3D Flipbook' : '📖 تصفح بتقنية 3D'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wooden/Metallic 3D Shelf Plank */}
          <div className="shelf-plank" />
        </div>
      </div>

      {/* 3D PageFlip Reader Modal */}
      {activeBook && (
        <FlipbookViewer
          isOpen={Boolean(activeBook)}
          onClose={() => setActiveBook(null)}
          pdfUrl={activeBook.pdfUrl}
          title={isEn ? (activeBook.titleEn || activeBook.title) : activeBook.title}
          subtitle={isEn ? activeBook.subtitleEn : activeBook.subtitle}
        />
      )}
    </section>
  );
};

export default Bookcase3D;
