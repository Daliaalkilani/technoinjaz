export type FaqCategoryKey = 'about' | 'engineering' | 'development' | 'cost' | 'contact';

export type FaqActionIconKey =
  | 'sparkles'
  | 'mapPin'
  | 'externalLink'
  | 'folderGit2'
  | 'fileText'
  | 'send'
  | 'code2'
  | 'messageCircle'
  | 'dollarSign'
  | 'phoneCall';

export interface FaqItem {
  id: string;
  category: FaqCategoryKey;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  actionLabel?: string;
  actionLabelEn?: string;
  actionTarget?: string; // e.g. '#contact', '#projects', '#about', '#articles'
  actionIconKey?: FaqActionIconKey;
}

export interface FaqCategory {
  id: string;
  name: string;
  nameEn: string;
}

export const faqCategories: FaqCategory[] = [
  { id: 'all', name: 'الكل', nameEn: 'All' },
  { id: 'about', name: 'عن تكنو إنجاز', nameEn: 'About Us' },
  { id: 'engineering', name: 'مشاريع التخرج والمشاريع الهندسية', nameEn: 'Graduation & Engineering' },
  { id: 'development', name: 'تطوير المواقع والتطبيقات', nameEn: 'Web & Mobile Apps' },
  { id: 'cost', name: 'التكلفة والمدة وطريقة البدء', nameEn: 'Pricing & Timelines' },
  { id: 'contact', name: 'التواصل والمحتوى', nameEn: 'Contact & Content' }
];

export const faqData: FaqItem[] = [
  // 1. عن تكنو إنجاز
  {
    id: 'q-about-1',
    category: 'about',
    question: 'ما هي تكنو إنجاز؟',
    questionEn: 'What is Techno Enjaz?',
    answer: 'تكنو إنجاز مكتب هندسي في مدينة حماة السورية ينفّذ مشاريع التخرج والمشاريع الهندسية في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات وأنظمة التحكم، ويطوّر المواقع والمتاجر والأنظمة السحابية، وينشر مقالات تقنية عربية مجانية.',
    answerEn: 'Techno Enjaz is an engineering bureau located in Hama, Syria, executing graduation and industrial engineering projects in AI, computer vision, robotics, and control systems, while developing modern cloud web apps, portals, and publishing free Arabic engineering research.',
    actionLabel: 'تعرّف علينا',
    actionLabelEn: 'About Us',
    actionTarget: '#about',
    actionIconKey: 'sparkles'
  },
  {
    id: 'q-about-2',
    category: 'about',
    question: 'أين يقع مكتب تكنو إنجاز؟',
    questionEn: 'Where is Techno Enjaz located?',
    answer: 'يقع المكتب في حماة، ساحة العاصي، بناء الخاني، بجوار أفران السلام، في الطابق الرابع. يمكنك فتح الموقع مباشرة على خرائط Google من صفحة التواصل.',
    answerEn: 'The office is located in Hama, Al-Assi Square, Al-Khani Building, adjacent to Al-Salam Bakeries, 4th Floor. You can view the live Google Maps location directly on our Contact page.',
    actionLabel: 'العنوان والخريطة',
    actionLabelEn: 'Address & Map',
    actionTarget: '#contact',
    actionIconKey: 'mapPin'
  },
  {
    id: 'q-about-3',
    category: 'about',
    question: 'هل تعملون مع عملاء من خارج حماة أو خارج سوريا؟',
    questionEn: 'Do you collaborate with clients outside Hama or outside Syria?',
    answer: 'نعم. يمكن متابعة المشروع بالكامل عن بُعد عبر واتساب والبريد الإلكتروني، ومن أعمالنا مواقع لعملاء خارج سوريا مثل بوابة «كابلات السعودية».',
    answerEn: 'Yes. Projects can be entirely managed remotely via WhatsApp, GitHub, and email. Our portfolio includes enterprise applications for international clients, such as the Saudi Cable portal.',
    actionLabel: 'مشاريع الويب',
    actionLabelEn: 'Web Projects',
    actionTarget: '#projects',
    actionIconKey: 'externalLink'
  },
  {
    id: 'q-about-4',
    category: 'about',
    question: 'من يقود فريق «تكنو إنجاز» ويشرف على الاستشارات والمشاريع؟',
    questionEn: 'Who leads the Techno Enjaz team and oversees consultancy and projects?',
    answer: 'يقود الفريق المهندس عبد الغني الحمدي، مستشار في المشاريع الهندسية ومشاريع التخرج، ومدرب في المجالات التقنية. حاصل على بكالوريوس في هندسة التحكم الآلي والحواسيب من جامعة البعث (شهادة الباسل للمرتبة الأولى) ويدرس الماجستير في هندسة التحكم والأتمتة بجامعة حلب. ساهم في إنجاز والإشراف على أكثر من 500 مشروع تقني وتخرج خلال 5 سنوات، ونال المركز السادس بمسابقة «تميّز للإبداع والاختراع» على مستوى القطر. وهو مدرب في برمجة الأردوينو والروبوتيك والتحكم الصناعي، وشعاره: «التغيير يبدأ من الداخل، ابدأ بنفسك ثم غيّر العالم».',
    answerEn: 'The team is founded and led by Eng. Abdalgani Alhamdi, an Engineering Projects & Graduation Consultant and Technical Trainer. He holds a Bachelor\'s in Automatic Control & Computer Engineering from Al-Baath University (Al-Bassel First Rank Award) and is pursuing a Master\'s in Control & Automation at Aleppo University. Having supervised 500+ projects and achieved 6th place nationally in the "Tamayuz" Invention Competition, he trains in Arduino, robotics, and industrial control. Motto: "Change begins from within, start with yourself then change the world."',
    actionLabel: 'فريق العمل والخبرات',
    actionLabelEn: 'Our Team & Leadership',
    actionTarget: '#about',
    actionIconKey: 'sparkles'
  },

  // 2. مشاريع التخرج والمشاريع الهندسية
  {
    id: 'q-eng-1',
    category: 'engineering',
    question: 'هل تنفّذون مشاريع التخرج لطلاب الهندسة؟',
    questionEn: 'Do you engineer graduation projects for engineering students?',
    answer: 'نعم. نعمل على مشاريع التخرج في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات وأنظمة التحكم وتطبيقات الويب والموبايل، من تحديد الفكرة وحتى النموذج العامل والتوثيق.',
    answerEn: 'Yes. We engineer comprehensive capstone and graduation projects in AI, computer vision, robotics, control systems, web, and mobile apps—from conceptualization to fully functioning prototypes and documentation.',
    actionLabel: 'الخدمات',
    actionLabelEn: 'Our Services',
    actionTarget: '#projects',
    actionIconKey: 'folderGit2'
  },
  {
    id: 'q-eng-2',
    category: 'engineering',
    question: 'ماذا يتضمن تسليم المشروع الهندسي؟',
    questionEn: 'What does an engineering project delivery package include?',
    answer: 'يختلف ذلك حسب المشروع، لكن التوثيق عادةً يشمل تقريراً بصيغة PDF ومستند Word قابلاً للتعديل وعرضاً تقديمياً، إلى جانب النموذج العملي أو البرمجي. يمكنك الاطلاع على أمثلة حقيقية من ملفات التوثيق في صفحة المشاريع.',
    answerEn: 'Deliverables depend on project requirements, but standard documentation typically includes an academic PDF report, editable Word document, slide presentation, source code, and practical working hardware/software models.',
    actionLabel: 'المشاريع الهندسية',
    actionLabelEn: 'Engineering Projects',
    actionTarget: '#projects',
    actionIconKey: 'fileText'
  },
  {
    id: 'q-eng-3',
    category: 'engineering',
    question: 'هل يمكنني اقتراح فكرة مشروعي الخاصة؟',
    questionEn: 'Can I propose my own custom project idea?',
    answer: 'نعم. أرسل لنا وصفاً مختصراً للفكرة واختصاصك وجامعتك، ونراجع معك قابلية التنفيذ والنطاق المناسب قبل البدء.',
    answerEn: 'Absolutely. Send us a brief summary of your proposal, your academic specialization, and your university, and we will review feasibility, scope, and technical milestones with you before initiation.',
    actionLabel: 'أرسل فكرتك',
    actionLabelEn: 'Submit Your Idea',
    actionTarget: '#contact',
    actionIconKey: 'send'
  },

  // 3. تطوير المواقع والتطبيقات
  {
    id: 'q-dev-1',
    category: 'development',
    question: 'ما أنواع المواقع التي تطوّرونها؟',
    questionEn: 'What types of web systems and portals do you develop?',
    answer: 'نطوّر أنظمة إدارة الموارد والحسابات (ERP)، ومواقع الشركات، والمتاجر الإلكترونية، والمواقع الشخصية ومعارض الأعمال، وأدوات الويب التفاعلية. جميع الأمثلة المعروضة منشورة ويمكن تجربتها مباشرة.',
    answerEn: 'We engineer cloud ERP resource management suites, corporate portals, e-commerce storefronts, personal portfolios, and real-time interactive web applications. All listed showcase projects are live and interactive.',
    actionLabel: 'جرّب مشاريعنا الحية',
    actionLabelEn: 'Try Live Demos',
    actionTarget: '#projects',
    actionIconKey: 'code2'
  },
  {
    id: 'q-dev-2',
    category: 'development',
    question: 'هل تطوّرون تطبيقات موبايل؟',
    questionEn: 'Do you develop native or cross-platform mobile apps?',
    answer: 'نعم، نطوّر تطبيقات متعددة المنصات بتقنية Flutter تعمل على أندرويد وiOS، مثل تطبيق FocusBac لتنظيم الدراسة والتطبيق السياحي الذكي.',
    answerEn: 'Yes, we build high-performance cross-platform mobile apps utilizing Google Flutter for both Android and iOS, including our FocusBac study organizer and smart interactive tourism applications.',
    actionLabel: 'تواصل معنا',
    actionLabelEn: 'Inquire Now',
    actionTarget: '#contact',
    actionIconKey: 'messageCircle'
  },

  // 4. التكلفة والمدة وطريقة البدء
  {
    id: 'q-cost-1',
    category: 'cost',
    question: 'كم تكلفة المشروع؟',
    questionEn: 'How much does a project typically cost?',
    answer: 'لا توجد تسعيرة ثابتة؛ تعتمد التكلفة على نوع المشروع وحجمه والمكونات المطلوبة. أرسل تفاصيل مشروعك وسنرسل لك تقديراً واضحاً قبل أي التزام.',
    answerEn: 'There is no fixed generic price; pricing depends specifically on technical complexity, hardware components, and feature scope. Share your requirements and we provide a clear quotation before any commitment.',
    actionLabel: 'اطلب تقديراً',
    actionLabelEn: 'Request an Estimate',
    actionTarget: '#contact',
    actionIconKey: 'dollarSign'
  },
  {
    id: 'q-cost-2',
    category: 'cost',
    question: 'كم يستغرق تنفيذ المشروع؟',
    questionEn: 'How long does project implementation take?',
    answer: 'تختلف المدة حسب تعقيد المشروع وتوفر القطع والمتطلبات. نتفق معك على جدول زمني واضح عند تحديد النطاق، ويُفضَّل التواصل مبكراً قبل موعد التسليم الجامعي.',
    answerEn: 'Duration varies based on system complexity, component availability, and integration depth. We establish a clear milestone timeline upon project scoping. Early engagement is recommended for academic deadlines.',
    actionLabel: 'تواصل لجدولة مشروعك',
    actionLabelEn: 'Schedule Project',
    actionTarget: '#contact',
    actionIconKey: 'messageCircle'
  },
  {
    id: 'q-cost-3',
    category: 'cost',
    question: 'كيف أبدأ مشروعي معكم؟',
    questionEn: 'How do I start a project with Techno Enjaz?',
    answer: 'راسلنا على واتساب أو عبر نموذج التواصل بوصف مختصر للمشروع، ثم نحدد معك النطاق والتكلفة والمدة، ونبدأ التنفيذ مع متابعة دورية حتى التسليم.',
    answerEn: 'Contact us via WhatsApp or through our Contact form with a brief summary. We will finalize scope, milestones, and budget, initiating execution with regular milestone reviews until final handover.',
    actionLabel: 'تواصل معنا',
    actionLabelEn: 'Contact Us Now',
    actionTarget: '#contact',
    actionIconKey: 'phoneCall'
  },

  // 5. التواصل والمحتوى
  {
    id: 'q-comm-1',
    category: 'contact',
    question: 'ما طرق التواصل مع تكنو إنجاز؟',
    questionEn: 'What are the available communication channels with Techno Enjaz?',
    answer: 'عبر الهاتف أو واتساب على الرقم +963 958 794 195، أو البريد info@technoenjaz.com، أو إنستغرام @TECHNO_ENJAZ، أو صفحة فيسبوك، أو بزيارة المكتب في حماة.',
    answerEn: 'Via phone or WhatsApp at +963 958 794 195, email at info@technoenjaz.com, Instagram @TECHNO_ENJAZ, Facebook page, or by visiting our office in Hama.',
    actionLabel: 'صفحة التواصل',
    actionLabelEn: 'Contact Page',
    actionTarget: '#contact',
    actionIconKey: 'mapPin'
  },
  {
    id: 'q-comm-2',
    category: 'contact',
    question: 'هل تقدمون دورات تدريبية في المجالات التقنية؟',
    questionEn: 'Do you offer training courses and workshops in tech fields?',
    answer: 'نعم، نقدّم دورات تدريبية متخصصة ومكثفة في مجالات البرمجة، والذكاء الاصطناعي، والأنظمة المدمجة وإنترنت الأشياء، وتشمل مسارين: مسار تدريبي تفاعلي أونلاين (عبر الإنترنت)، ومسار تدريبي حضوري وتطبيقي في مقرنا.',
    answerEn: 'Yes, we provide specialized training programs in software engineering, AI, embedded systems, and IoT with two flexible learning tracks: interactive online training, and hands-on in-person training at our headquarters.',
    actionLabel: 'استفسر عن الدورات',
    actionLabelEn: 'Inquire About Courses',
    actionTarget: '#contact',
    actionIconKey: 'messageCircle'
  }
];
