export interface ReelComment {
  id: string;
  author: string;
  authorEn: string;
  avatar: string;
  timeAgo: string;
  timeAgoEn: string;
  content: string;
  contentEn: string;
}

export interface ProjectReel {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  category: string;
  categoryEn: string;
  categoryColor: string;
  categoryIcon: string;
  coverImage: string;
  liveUrl: string;
  engineer: {
    name: string;
    nameEn: string;
    role: string;
    roleEn: string;
    avatar: string;
  };
  description: string;
  descriptionEn: string;
  tags: string[];
  duration: string;
  initialLikes: number;
  initialViews: string;
  initialComments: ReelComment[];
}

export const projectReelsData: ProjectReel[] = [
  {
    id: 'reel-hisab-erp',
    title: 'نظام حساب ERP السحابي فائق السرعة',
    titleEn: 'Hisab ERP Cloud Enterprise Platform',
    subtitle: 'استعراض إدارة المخزون والفواتير اللحظية',
    subtitleEn: 'Live demo of automated invoicing and inventory management',
    category: 'أنظمة سحابية',
    categoryEn: 'Cloud Systems',
    categoryColor: '#0aeec3',
    categoryIcon: 'database',
    coverImage: '/projects-live/hisab-erp.jpg',
    liveUrl: 'https://hisab-erp.pages.dev/login',
    engineer: {
      name: 'عبد الغنى',
      nameEn: 'Abdulghani',
      role: 'مدير الفريق التقني',
      roleEn: 'Lead Tech Director',
      avatar: '/abdulghani.jpg'
    },
    description: 'استعراض معماري متقدم لنظام حساب ERP السحابي لإدارة سلاسل الإمداد، الفوترة الإلكترونية المعتمدة، وإصدار التقارير المالية بدقة متناهية ولحظياً.',
    descriptionEn: 'Advanced architectural walkthrough of Hisab ERP: handling high-concurrency inventory, compliant electronic invoicing, and real-time financial reporting.',
    tags: ['#ERP_سحابي', '#فوترة_إلكترونية', '#إدارة_مخزون', '#React', '#FastAPI'],
    duration: '00:48',
    initialLikes: 142,
    initialViews: '3.4K',
    initialComments: [
      {
        id: 'c1',
        author: 'م. خالد النجار',
        authorEn: 'Eng. Khaled Al-Najjar',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        timeAgo: 'منذ ساعتين',
        timeAgoEn: '2 hours ago',
        content: 'معمارية النظام في إدارة القيود المحاسبية ممتازة وسرعة الاستجابة مبهرة!',
        contentEn: 'The accounting ledger architecture is exceptionally fast and well-tuned!'
      },
      {
        id: 'c2',
        author: 'سالم الدوسري',
        authorEn: 'Salem Al-Dawsari',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
        timeAgo: 'منذ 5 ساعات',
        timeAgoEn: '5 hours ago',
        content: 'هل يدعم الربط المباشر مع منصات التجارة الإلكترونية عبر الـ Webhooks؟',
        contentEn: 'Does it support automated webhook integration with eCommerce platforms?'
      }
    ]
  },
  {
    id: 'reel-arduino-lab',
    title: 'المختبر التفاعلي الذكي والتحكم الميداني',
    titleEn: 'Interactive IoT Hardware Simulation Lab',
    subtitle: 'محاكاة الدوائر الإلكترونية والإنترنت الذكي',
    subtitleEn: 'Live simulation of circuits, microcontrollers, and IoT sensors',
    category: 'إنترنت الأشياء',
    categoryEn: 'IoT & Embedded',
    categoryColor: '#f59e0b',
    categoryIcon: 'cpu',
    coverImage: '/projects-live/arduino-lab.jpg',
    liveUrl: 'https://arduino-lab.pages.dev/',
    engineer: {
      name: 'أحمد سامي',
      nameEn: 'Ahmed Sami',
      role: 'مهندس ذكاء اصطناعي ونظم',
      roleEn: 'AI & Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    description: 'بيئة برمجية تفاعلية ثلاثية الأبعاد لمحاكاة المتحكمات الصغرية وأجهزة إنترنت الأشياء، واختبار قراءات الحساسات وتدفق الإشارات دون الحاجة للعتاد الفيزيائي.',
    descriptionEn: 'Interactive 3D simulation environment for microcontrollers and IoT sensors, testing logic circuits in real time right in the browser.',
    tags: ['#إنترنت_الأشياء', '#IoT', '#محاكاة_عتاد', '#WebGL', '#ThreeJS'],
    duration: '00:52',
    initialLikes: 218,
    initialViews: '5.1K',
    initialComments: [
      {
        id: 'c3',
        author: 'د. طارق الزهراني',
        authorEn: 'Dr. Tariq Al-Zahrani',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        timeAgo: 'منذ يوم',
        timeAgoEn: '1 day ago',
        content: 'هذا المشروع حل عبقري للجامعات ومراكز التدريب المهني.',
        contentEn: 'This project is a brilliant breakthrough for robotics labs and universities.'
      }
    ]
  },
  {
    id: 'reel-projectforge',
    title: 'منصة بروجكت فورج لتنسيق الفرق الهندسية',
    titleEn: 'ProjectForge Engineering Collaboration Suite',
    subtitle: 'لوحات كانبان ومزامنة المهام البرمجية اللحظية',
    subtitleEn: 'Live Kanban boards, real-time collaboration, and code sync',
    category: 'أنظمة سحابية',
    categoryEn: 'Cloud Systems',
    categoryColor: '#38bdf8',
    categoryIcon: 'layout',
    coverImage: '/projects-live/projectforge.jpg',
    liveUrl: 'https://projectforge-e3q.pages.dev/',
    engineer: {
      name: 'عبد الغنى',
      nameEn: 'Abdulghani',
      role: 'مدير الفريق التقني',
      roleEn: 'Lead Tech Director',
      avatar: '/abdulghani.jpg'
    },
    description: 'منظومة تنسيق متطورة تدير سير العمل الهندسي، تعتمد على WebSockets للتحديث اللحظي للمهام وتتبع مؤشرات الأداء (KPIs) لفرق التطوير المتوزعة.',
    descriptionEn: 'Distributed project orchestration tool powered by real-time WebSockets, automated sprints tracking, and interactive engineering telemetry.',
    tags: ['#إدارة_مشاريع', '#WebSockets', '#كانبان', '#إنتاجية_الفرق'],
    duration: '00:41',
    initialLikes: 185,
    initialViews: '4.2K',
    initialComments: [
      {
        id: 'c4',
        author: 'م. ياسمين كمال',
        authorEn: 'Yasmin Kamal',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        timeAgo: 'منذ 3 ساعات',
        timeAgoEn: '3 hours ago',
        content: 'سلاسة السحب والإفلات وتزامن المهام ممتعة جداً في الاستخدام!',
        contentEn: 'The drag-and-drop mechanics and live sprint sync are super smooth!'
      }
    ]
  },
  {
    id: 'reel-interactive-cv',
    title: 'معرض السيرة الذاتية التفاعلية ثلاثية الأبعاد',
    titleEn: '3D Interactive Portfolio & Engineering CV',
    subtitle: 'استعراض بصري للمشاريع بتقنيات الشيدرز ثلاثية الأبعاد',
    subtitleEn: 'Cinematic shaders, WebGL particle systems, and live showcases',
    category: 'هويات رقمية',
    categoryEn: 'Digital Identities',
    categoryColor: '#a855f7',
    categoryIcon: 'sparkles',
    coverImage: '/projects-live/interactive-cv.jpg',
    liveUrl: 'https://cv.abdalgani.com/',
    engineer: {
      name: 'تيماء علواني',
      nameEn: 'Taima Alwani',
      role: 'مهندسة واجهات وتجربة مستخدم',
      roleEn: 'Senior UI/UX Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    description: 'تجربة بصرية مبتكرة تحول السيرة المهنية إلى بيئة سينمائية ثلاثية الأبعاد تفاعلية، مستخدمة تقنيات WebGL وجسيمات الضوء التفاعلية لتقديم محتوى فريد.',
    descriptionEn: 'Cutting-edge digital presence transforming classical resumes into immersive 3D spatial showcases utilizing WebGL physics and custom shaders.',
    tags: ['#ThreeJS', '#WebGL', '#تصميم_تفاعلي', '#هوية_رقمية'],
    duration: '00:36',
    initialLikes: 290,
    initialViews: '7.8K',
    initialComments: [
      {
        id: 'c5',
        author: 'رامي العلي',
        authorEn: 'Rami Al-Ali',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        timeAgo: 'منذ 6 ساعات',
        timeAgoEn: '6 hours ago',
        content: 'الانتقالات ثلاثية الأبعاد خرافية والإضاءة المحيطية متقنة جداً.',
        contentEn: 'The 3D transitions and ambient shader lighting are breathtaking.'
      }
    ]
  },
  {
    id: 'reel-khazama-store',
    title: 'متجر خزامة السحابي فائق الأداء',
    titleEn: 'Khazama Ultra-Fast Cloud eCommerce',
    subtitle: 'تجربة تسوق رقمية فائقة السرعة مع سلة شرائية لحظية',
    subtitleEn: 'Sub-second checkout, live inventory counters, and headless CMS',
    category: 'تطبيقات ومتاجر',
    categoryEn: 'Apps & Stores',
    categoryColor: '#ec4899',
    categoryIcon: 'shopping-bag',
    coverImage: '/projects-live/khazama-store.jpg',
    liveUrl: 'https://khazama.pages.dev/',
    engineer: {
      name: 'عبد الغنى',
      nameEn: 'Abdulghani',
      role: 'مدير الفريق التقني',
      roleEn: 'Lead Tech Director',
      avatar: '/abdulghani.jpg'
    },
    description: 'متجر تجارة إلكترونية مبني بمعمارية Headless مع واجهة مستخدم فائقة الاستجابة، ونظام دفع متكامل يدعم المحافظ الإلكترونية المتعددة.',
    descriptionEn: 'Headless eCommerce storefront delivering sub-second page loads, real-time inventory validation, and seamless multi-currency checkout.',
    tags: ['#تجارة_إلكترونية', '#NextJS', '#Headless', '#سلة_تسوق'],
    duration: '00:44',
    initialLikes: 164,
    initialViews: '3.9K',
    initialComments: []
  },
  {
    id: 'reel-cablexperts',
    title: 'منصة خبراء الكابلات للمشاريع الكبرى',
    titleEn: 'CableXperts Engineering Infrastructure Portal',
    subtitle: 'كتالوج هندسي تفاعلي للمواصفات القياسية وحسابات الجهد',
    subtitleEn: 'Interactive industrial specifications and load calculations',
    category: 'أنظمة سحابية',
    categoryEn: 'Cloud Systems',
    categoryColor: '#0ea5e9',
    categoryIcon: 'layers',
    coverImage: '/projects-live/cablexperts.jpg',
    liveUrl: 'https://cablexperts.pages.dev/',
    engineer: {
      name: 'أحمد سامي',
      nameEn: 'Ahmed Sami',
      role: 'مهندس ذكاء اصطناعي ونظم',
      roleEn: 'AI & Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    description: 'بوابة متخصصة لحساب أحمال كابلات الطاقة والجهد العالي، وتصفح المواصفات الفنية المعتمدة للمشاريع الإنشائية والصناعية الضخمة.',
    descriptionEn: 'Engineering calculator and specification portal for high-voltage power networks and infrastructure procurement.',
    tags: ['#بنية_تحتية', '#حسابات_هندسية', '#كابلات_طاقة', '#كتالوج_صناعي'],
    duration: '00:39',
    initialLikes: 128,
    initialViews: '2.8K',
    initialComments: []
  },
  {
    id: 'reel-dermocean',
    title: 'منصة ديرم أوشن الطبية المتخصصة',
    titleEn: 'Dermocean Dermatology & Clinical Hub',
    subtitle: 'استعراض تفاعلي للتركيبات الطبية والحلول العلاجية',
    subtitleEn: 'Clinical formulations database and interactive skin diagnostics',
    category: 'تطبيقات ومتاجر',
    categoryEn: 'Apps & Stores',
    categoryColor: '#10b981',
    categoryIcon: 'heart-pulse',
    coverImage: '/projects-live/dermocean.jpg',
    liveUrl: 'https://dermocean.pages.dev/',
    engineer: {
      name: 'تيماء علواني',
      nameEn: 'Taima Alwani',
      role: 'مهندسة واجهات وتجربة مستخدم',
      roleEn: 'Senior UI/UX Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    description: 'واجهة رقمية طبية تستعرض المنتجات الجلدية والتركيبات المعتمدة، مع محرك بحث تخصصي يتيح تصفية المنتجات حسب نوع البشرة والمكونات الفعالة.',
    descriptionEn: 'Specialized clinical dermatology platform featuring active ingredient databases, interactive skin compatibility selectors, and verified regimens.',
    tags: ['#حلول_طبية', '#واجهات_تفاعلية', '#كتالوج_طبي', '#تجربة_مستخدم'],
    duration: '00:46',
    initialLikes: 153,
    initialViews: '3.1K',
    initialComments: []
  }
];

export const reelCategories = [
  { id: 'all', name: 'كافة الريلز', nameEn: 'All Reels' },
  { id: 'cloud', name: 'أنظمة سحابية', nameEn: 'Cloud Systems' },
  { id: 'iot', name: 'إنترنت الأشياء', nameEn: 'IoT & Hardware' },
  { id: 'identity', name: 'هويات رقمية', nameEn: 'Digital Identities' },
  { id: 'apps', name: 'تطبيقات ومتاجر', nameEn: 'Apps & Stores' }
];
