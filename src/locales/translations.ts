export interface ProjectTranslation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface Translations {
  nav: {
    home: string;
    projects: string;
    videos: string;
    articles: string;
    about: string;
    contact: string;
    login: string;
    brand: string;
  };
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    exploreProjects: string;
    exploreVideos: string;
    projectsHeading: string;
    projectsStatement: string;
  };
  liveProjects: {
    pageTitle: string;
    pageSubtitle: string;
    countBadge: string;
    autoMode: string;
    gridMode: string;
    projectWord: string;
    ofWord: string;
    visitLive: string;
    visitMockup: string;
    launch: string;
    openProject: string;
    marqueeTitle: string;
    projects: Record<string, ProjectTranslation>;
  };
  videos: {
    pageTitle: string;
    pageSubtitle: string;
    heading: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
  };
  articles: {
    pageTitle: string;
    pageSubtitle: string;
    heading: string;
    subtitle: string;
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    heading: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    fullName: string;
    major: string;
    university: string;
    email: string;
    phone: string;
    inquiry: string;
    submit: string;
    backHome: string;
    locationTitle: string;
    locationDesc: string;
    emailTitle: string;
    messageNow: string;
    whatsappTitle: string;
    chatNow: string;
    instaTitle: string;
    followNow: string;
    successMsg: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  lang: {
    arabic: string;
    english: string;
  };
}

export const translations: Record<'ar' | 'en', Translations> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      videos: 'الفيديوهات',
      articles: 'المقالات',
      about: 'من نحن',
      contact: 'تواصل معنا',
      login: 'تسجيل الدخول',
      brand: 'تكنو إنجاز'
    },
    hero: {
      title: 'تكنو إنجاز',
      subtitle: 'منظومة رائدة في الحلول الهندسية والبرمجية',
      tagline: 'أفكار هندسية تتحول إلى حلول واقعية',
      exploreProjects: 'استكشف كافة المشاريع',
      exploreVideos: 'استكشف الفيديوهات الخاصة بالمشاريع',
      projectsHeading: 'مشاريعنا',
      projectsStatement: 'أفكار هندسية تتحول إلى حلول واقعية'
    },
    liveProjects: {
      pageTitle: 'مشاريع ومنظومات تكنو إنجاز',
      pageSubtitle: 'استكشف 13 مشروعاً برمجياً ومنظومة هندسية تعمل الآن ومتاحة للتجربة الحية والمباشرة',
      countBadge: 'كافة المشاريع التطبيقية الحية (13 مشروعاً)',
      autoMode: 'عرض تلقائي متحرك',
      gridMode: 'شبكة المشاريع',
      projectWord: 'المشروع',
      ofWord: 'من',
      visitLive: 'زيارة وتجربة المشروع الحي',
      visitMockup: 'زيارة وتجربة الموقع',
      launch: 'تشغيل',
      openProject: 'فتح وتجربة المشروع',
      marqueeTitle: 'استعراض متحرك لكافة المشاريع الحية (13 مشروعاً)',
      projects: {
        'hisab-erp': {
          id: 'hisab-erp',
          title: 'نظام حساب ERP السحابي',
          subtitle: 'نظام سحابي لإدارة الموارد المحاسبية والإدارية',
          description: 'نظام متكامل لإدارة الموارد المحاسبية والإدارية للشركات، الفواتير الإلكترونية المعتمدة، وإدارة المخزون والمبيعات لحظياً.',
          highlights: ['إدارة سحابية', 'فوترة إلكترونية', 'حسابات ومخزون']
        },
        'projectforge': {
          id: 'projectforge',
          title: 'منصة بروجكت فورج',
          subtitle: 'مساحة عمل لإدارة وتنسيق الفرق البرمجية',
          description: 'منصة متقدمة لتنسيق فرق التطوير البرمجي والهندسي، جدولة المهام، وتتبع الإنجاز في الوقت الفعلي عبر لوحات تفاعلية.',
          highlights: ['إدارة المشاريع', 'لوحات كانبان', 'مزامنة المهام']
        },
        'interactive-cv': {
          id: 'interactive-cv',
          title: 'السيرة الذاتية التفاعلية',
          subtitle: 'معرض أعمال وسيرة مهنية تفاعلية',
          description: 'واجهة رقمية تفاعلية حديثة تستعرض المسار المهني والخبرات والمشاريع الهندسية المنجزة بأسلوب مبتكر وجذاب.',
          highlights: ['تفاعل ثلاثي الأبعاد', 'سيرة ذاتية', 'معرض أعمال']
        },
        'taima-alwani': {
          id: 'taima-alwani',
          title: 'منصة تيماء علواني',
          subtitle: 'منصة الهوية الرقمية والأعمال الإبداعية',
          description: 'موقع شخصي ومهني أنيق بتصميم عصري يعكس الهوية الرقمية، الأعمال الإبداعية، والخبرات المتخصصة.',
          highlights: ['هوية رقمية', 'تصميم عصري', 'معرض إبداعي']
        },
        'rebuild-dn9': {
          id: 'rebuild-dn9',
          title: 'بوابة الأعمال والمشاريع',
          subtitle: 'بوابة شاملة لتطبيقات الويب الحديثة',
          description: 'منصة برمجية حديثة تستعرض أحدث التطبيقات والنماذج البرمجية المبنية بتقنيات الويب الحديثة وعالية الأداء.',
          highlights: ['تطبيقات متكاملة', 'معمارية سحابية', 'أداء متقدم']
        },
        'khazama-store': {
          id: 'khazama-store',
          title: 'متجر خزامة السحابي',
          subtitle: 'متجر تجارة إلكترونية فائق السرعة',
          description: 'متجر رقمي فائق السرعة يعمل على الحافة السحابية لتقديم تجربة تسوق فورية وسلسة وآمنة.',
          highlights: ['معالجة سحابية', 'تسوق رقمي', 'أمان عالي']
        },
        'modeya': {
          id: 'modeya',
          title: 'منصة مضيئة للأزياء',
          subtitle: 'منصة تسوق رقمية فاخرة للأزياء',
          description: 'منصة تسوق رقمية فاخرة مخصصة لخطوط الأزياء والتصميم العصري، مع تجربة استعراض المنتجات وسلة الشراء المتقدمة.',
          highlights: ['أزياء راقية', 'تجارة إلكترونية', 'دفع إلكتروني']
        },
        'dermocean': {
          id: 'dermocean',
          title: 'منصة ديرم أوشن',
          subtitle: 'منصة متخصصة في العناية بالبشرة والحلول الجلدية',
          description: 'واجهة رقمية متخصصة في مستحضرات ومنتجات العناية بالبشرة، مع استعراض علمي دقيق للمكونات والحلول الجلدية.',
          highlights: ['عناية بالبشرة', 'كتالوج متقدم', 'حلول تجميلية']
        },
        'wpu-cover': {
          id: 'wpu-cover',
          title: 'مصمم أغلفة الكتب',
          subtitle: 'أداة تفاعلية لتصميم وتوليد أغلفة الكتب',
          description: 'أداة تفاعلية ذكية لتصميم وتوليد أغلفة الكتب والأبحاث والمنشورات العلمية بجودة طباعية احترافية.',
          highlights: ['أغلفة كتب', 'توليد تصاميم', 'تصدير عالي الدقة']
        },
        'md-2-pdf': {
          id: 'md-2-pdf',
          title: 'محول الماركداون الذكي',
          subtitle: 'محرك تحويل المستندات إلى ملفات جاهزة للطباعة',
          description: 'محرك تحويل سريع وعالي الدقة لمستندات النصوص والماركداون إلى ملفات جاهزة للطباعة والتوزيع بمظهر احترافي.',
          highlights: ['محرك نصوص', 'تصدير وثائق', 'أدوات مكتبية']
        },
        'cablexperts': {
          id: 'cablexperts',
          title: 'منصة خبراء الكابلات',
          subtitle: 'بوابة حلول وتوريدات كابلات الطاقة والاتصالات',
          description: 'منصة هندسية رائدة لشركة متخصصة في توريد وتوزيع كابلات الجهد العالي والمتوسط والاتصالات للمشاريع الكبرى.',
          highlights: ['كابلات صناعية', 'مواصفات هندسية', 'توريدات معتمدة']
        },
        'cableksa': {
          id: 'cableksa',
          title: 'كابلات السعودية',
          subtitle: 'البوابة الوطنية لأنظمة ومواصفات الكابلات',
          description: 'البوابة الشاملة لتوريدات وأنظمة الكابلات المعتمدة في المملكة العربية السعودية، توفر كتالوجات فنية ومواصفات قياسية.',
          highlights: ['بنية تحتية', 'كتالوج معتمد', 'مواصفات قياسية']
        },
        'arduino-lab': {
          id: 'arduino-lab',
          title: 'مختبر آردوينو التفاعلي',
          subtitle: 'بيئة محاكاة تفاعلية لاختبار الدوائر الإلكترونية',
          description: 'بيئة محاكاة تفاعلية لتجربة وبرمجة دوائر الأردوينو والحساسات الإلكترونية واختبار الأكواد الهندسية افتراضياً.',
          highlights: ['محاكاة إلكترونية', 'حساسات ذكية', 'دوائر تفاعلية']
        }
      }
    },
    videos: {
      pageTitle: 'فيديوهات وعروض تكنو إنجاز',
      pageSubtitle: 'عروض مرئية تفاعلية توثق إنجازاتنا الهندسية ومراحل تطوير الأنظمة والبرمجيات المتقدمة',
      heading: 'شاهد تجاربنا',
      subtitle: 'عروض حية وتجارب تطبيقية توثق مراحل البناء والتكامل البرمجي لأحدث أنظمتنا',
      card1Title: 'عروض تفاعلية ثلاثية الأبعاد',
      card1Desc: 'استكشف مجسمات الأنظمة والمعماريات الهندسية بتفاصيل واقعية تحاكي تشغيل البرمجيات في بيئات العمل الحقيقية.',
      card2Title: 'عروض مرئية فائقة الوضوح',
      card2Desc: 'توثيق عالي الدقة يوضح طريقة تفاعل المستخدمين مع منصاتنا وتكامل الحلول البرمجية مع مختلف الأجهزة.'
    },
    articles: {
      pageTitle: 'مقالات وأبحاث تكنو إنجاز',
      pageSubtitle: 'دراسات وأبحاث هندسية توثق التجارب المعمارية والخوارزميات المبتكرة في مشاريعنا',
      heading: 'مقالاتنا الهندسية',
      subtitle: 'دراسات وأبحاث تقنية توثق التجارب المعمارية والخوارزميات المبتكرة في مشاريع تكنو إنجاز'
    },
    about: {
      pageTitle: 'من نحن - فريق تكنو إنجاز',
      pageSubtitle: 'فريق هندسي متخصص يجمع بين الخبرة العميقة والابتكار في تطوير الحلول التقنية المتكاملة',
      heading: 'فريق تكنو إنجاز',
      subtitle: 'نخبة من المهندسين والمطورين المتخصصين في بناء الأنظمة المتطورة'
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نسعد دائماً باستقبال استفساراتكم الهندسية والتقنية',
      fullName: 'الاسم الكامل',
      major: 'التخصص الأكاديمي أو المهني',
      university: 'الجامعة أو جهة العمل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف / واتساب',
      inquiry: 'تفاصيل الاستفسار أو متطلبات المشروع',
      submit: 'إرسال الاستفسار',
      backHome: 'العودة للرئيسية',
      locationTitle: 'موقع المكتب والمقر',
      locationDesc: 'حماة - ساحة العاصي - بناء الخاني - بجوار أفران السلام - الطابق الرابع',
      emailTitle: 'البريد الإلكتروني الرسمي',
      messageNow: 'مراسلة ↗',
      whatsappTitle: 'التواصل المباشر على واتساب',
      chatNow: 'محادثة فورية ↗',
      instaTitle: 'انستغرام تكنو إنجاز',
      followNow: 'متابعة ↗',
      successMsg: 'تم تجهيز رسالتك إلى info@technoenjaz.com بنجاح!'
    },
    theme: {
      light: 'الوضع النهاري',
      dark: 'الوضع الليلي'
    },
    lang: {
      arabic: 'عربي',
      english: 'EN'
    }
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      videos: 'Videos',
      articles: 'Articles',
      about: 'About Us',
      contact: 'Contact Us',
      login: 'Sign In',
      brand: 'Techno Enjaz'
    },
    hero: {
      title: 'Techno Enjaz',
      subtitle: 'A Leading Ecosystem for Engineering & Software Solutions',
      tagline: 'Engineering Concepts Transformed Into Real Solutions',
      exploreProjects: 'Explore All Projects',
      exploreVideos: 'Explore Project Videos',
      projectsHeading: 'Our Projects',
      projectsStatement: 'Engineering concepts transformed into real-world solutions'
    },
    liveProjects: {
      pageTitle: 'Techno Enjaz Live Ecosystem',
      pageSubtitle: 'Explore 13 live deployed software and engineering systems ready for hands-on experience',
      countBadge: 'All Live Applied Projects (13 Projects)',
      autoMode: 'Auto Showcase',
      gridMode: 'Grid View',
      projectWord: 'Project',
      ofWord: 'of',
      visitLive: 'Experience Live Project',
      visitMockup: 'Visit Website',
      launch: 'Launch',
      openProject: 'Launch Project',
      marqueeTitle: 'Continuous Showcase of All 13 Live Projects',
      projects: {
        'hisab-erp': {
          id: 'hisab-erp',
          title: 'Hisab Cloud ERP System',
          subtitle: 'Cloud Solution for Financial & Resource Management',
          description: 'Integrated ERP system for corporate accounting, certified electronic invoicing, and real-time inventory and sales tracking.',
          highlights: ['Cloud ERP', 'E-Invoicing', 'Finance & Stock']
        },
        'projectforge': {
          id: 'projectforge',
          title: 'ProjectForge Platform',
          subtitle: 'Collaborative Workspace for Engineering Teams',
          description: 'Advanced agile workspace for engineering and dev teams, task scheduling, and real-time sprint tracking via interactive boards.',
          highlights: ['Project Management', 'Kanban Boards', 'Team Sync']
        },
        'interactive-cv': {
          id: 'interactive-cv',
          title: 'Interactive 3D Resume',
          subtitle: 'Dynamic 3D Career Portfolio & Experience',
          description: 'Next-generation digital interactive portfolio presenting professional track, skills, and engineering milestones with 3D graphics.',
          highlights: ['3D WebGL', 'Digital Resume', 'Portfolio']
        },
        'taima-alwani': {
          id: 'taima-alwani',
          title: 'Taima Alwani Portfolio',
          subtitle: 'Digital Identity & Creative Works Showcase',
          description: 'An elegant professional showcase featuring modern design, creative artwork, and specialized domain expertise.',
          highlights: ['Digital Identity', 'Modern UI/UX', 'Showcase']
        },
        'rebuild-dn9': {
          id: 'rebuild-dn9',
          title: 'Business & App Gateway',
          subtitle: 'Comprehensive Modern Web Application Hub',
          description: 'High-performance web portal demonstrating cutting-edge applications built with modern web architectures.',
          highlights: ['Full-Stack Web', 'Cloud Architecture', 'High Speed']
        },
        'khazama-store': {
          id: 'khazama-store',
          title: 'Khazama Cloud Store',
          subtitle: 'Ultra-Fast Edge E-Commerce Platform',
          description: 'Next-gen e-commerce storefront powered by edge cloud workers for lightning-fast, seamless shopping experiences.',
          highlights: ['Edge Cloud', 'Digital Shopping', 'High Security']
        },
        'modeya': {
          id: 'modeya',
          title: 'Modeya Fashion Platform',
          subtitle: 'Luxury Fashion Digital Shopping Hub',
          description: 'A premium digital storefront tailored for fashion lines, featuring sleek catalog browsing and advanced checkout flow.',
          highlights: ['Luxury Fashion', 'E-Commerce', 'Online Payments']
        },
        'dermocean': {
          id: 'dermocean',
          title: 'Dermocean Care',
          subtitle: 'Dermatological Solutions & Skincare Platform',
          description: 'Specialized digital portal for skincare solutions, providing detailed scientific breakdowns of ingredients and formulas.',
          highlights: ['Dermatology', 'Care Catalog', 'Clinical Beauty']
        },
        'wpu-cover': {
          id: 'wpu-cover',
          title: 'WPU Book Cover Designer',
          subtitle: 'Smart Generator for Publication Covers',
          description: 'Interactive creative tool for designing and generating book, journal, and research publication covers with print-ready precision.',
          highlights: ['Book Covers', 'Design Generator', 'High-Res Export']
        },
        'md-2-pdf': {
          id: 'md-2-pdf',
          title: 'MD to PDF Converter',
          subtitle: 'Document Engine for Print-Ready Outputs',
          description: 'High-precision rendering engine converting Markdown and text documents into polished, professional PDF files ready for publishing.',
          highlights: ['Markdown Engine', 'Document Export', 'Dev Tools']
        },
        'cablexperts': {
          id: 'cablexperts',
          title: 'Cable Experts Portal',
          subtitle: 'Industrial Energy & Telecom Cable Solutions',
          description: 'Engineering platform for specialized supply and distribution of high/medium voltage and telecom cables for mega infrastructure projects.',
          highlights: ['Power Cables', 'Engineering Specs', 'Industrial Supply']
        },
        'cableksa': {
          id: 'cableksa',
          title: 'Cable KSA Gateway',
          subtitle: 'National Standards & Cable Specifications',
          description: 'Comprehensive portal for approved cable systems in Saudi Arabia, featuring technical catalogs and certified ISO standards.',
          highlights: ['Infrastructure', 'Approved Catalog', 'Standard Specs']
        },
        'arduino-lab': {
          id: 'arduino-lab',
          title: 'Arduino Virtual Lab',
          subtitle: 'Interactive Electronic Simulation Environment',
          description: 'Interactive simulation lab to test, wire, and program Arduino boards and IoT sensors with real-time virtual code execution.',
          highlights: ['Virtual Circuit', 'IoT Sensors', 'Interactive Lab']
        }
      }
    },
    videos: {
      pageTitle: 'Techno Enjaz Videos & Demos',
      pageSubtitle: 'Interactive visual showcases documenting engineering achievements and software integrations',
      heading: 'Watch Our Work',
      subtitle: 'Live demos and applied trials documenting the development stages of our latest systems',
      card1Title: 'Interactive 3D Showcases',
      card1Desc: 'Explore 3D models and engineering architectures with realistic fidelity simulating real production environments.',
      card2Title: 'Ultra-High Definition Demos',
      card2Desc: 'High-resolution documentation demonstrating user interactions with our platforms across diverse devices.'
    },
    articles: {
      pageTitle: 'Techno Enjaz Articles & Research',
      pageSubtitle: 'Technical studies and research documenting innovative architectures and algorithms in our projects',
      heading: 'Engineering Articles',
      subtitle: 'Technical studies and research documenting innovative architectures and algorithms at Techno Enjaz'
    },
    about: {
      pageTitle: 'About Us - Techno Enjaz Team',
      pageSubtitle: 'A specialized engineering collective uniting deep technical expertise and continuous innovation',
      heading: 'Techno Enjaz Team',
      subtitle: 'An elite team of specialized engineers and developers building advanced systems'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are always glad to receive your technical inquiries and project briefs',
      fullName: 'Full Name',
      major: 'Academic or Professional Major',
      university: 'University or Organization',
      email: 'Email Address',
      phone: 'Phone Number / WhatsApp',
      inquiry: 'Inquiry Details or Project Requirements',
      submit: 'Submit Inquiry',
      backHome: 'Back to Home',
      locationTitle: 'Office & Headquarters',
      locationDesc: 'Hama - Al-Assi Square - Al-Khani Bldg - Next to Al-Salam Bakeries - 4th Floor',
      emailTitle: 'Official Email',
      messageNow: 'Email ↗',
      whatsappTitle: 'Direct WhatsApp',
      chatNow: 'Chat ↗',
      instaTitle: 'Instagram',
      followNow: 'Follow ↗',
      successMsg: 'Your inquiry email to info@technoenjaz.com is ready!'
    },
    theme: {
      light: 'Light Mode',
      dark: 'Dark Mode'
    },
    lang: {
      arabic: 'عربي',
      english: 'EN'
    }
  }
};
