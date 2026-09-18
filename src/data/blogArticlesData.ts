export interface BlogComment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  text: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  category: string;
  categoryEn: string;
  categoryColor: string;
  image: string;
  publishDate: string;
  publishDateEn: string;
  readTime: string;
  readTimeEn: string;
  author: {
    id: string;
    name: string;
    nameEn: string;
    role: string;
    roleEn: string;
    avatar: string;
  };
  excerpt: string;
  excerptEn: string;
  content: string[];
  contentEn: string[];
  tags: string[];
  initialLikes: number;
  initialComments: BlogComment[];
}

export const blogArticlesData: BlogArticle[] = [
  {
    id: 'blog-ai-agents',
    title: 'معمارية وكلاء الذكاء الاصطناعي التوليدي في بيئات الإنتاج الحية',
    titleEn: 'Generative AI Agents Architecture in Live Production Environments',
    slug: 'generative-ai-agents-architecture',
    category: 'ذكاء اصطناعي',
    categoryEn: 'Artificial Intelligence',
    categoryColor: '#0ea5e9',
    image: '/projects-live/projectforge.jpg',
    publishDate: '14 سبتمبر 2026',
    publishDateEn: 'Sep 14, 2026',
    readTime: '6 دقائق',
    readTimeEn: '6 min read',
    author: {
      id: 'ahmed-sami',
      name: 'أحمد سامي',
      nameEn: 'Ahmed Sami',
      role: 'مهندس ذكاء اصطناعي',
      roleEn: 'AI Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop'
    },
    excerpt: 'دليل عملي وتطبيقي حول كيفية بناء وإدارة وكلاء الذكاء الاصطناعي المستقلين، دمج الذاكرة الدلالية المتجهة، ومنع الهلوسة في الأنظمة المؤسسية.',
    excerptEn: 'A practical guide on building and orchestrating autonomous AI agents, integrating vector semantic memory, and mitigating hallucination in enterprise environments.',
    content: [
      'يشهد قطاع الذكاء الاصطناعي تحولاً جذرياً من مجرد توليد النصوص التفاعلية إلى بناء وكلاء مستقلين (Autonomous Agents) قادرين على التفكير التكراري، استدعاء الأدوات الخارجية (Tool Calling)، وتنسيق المهام المعقدة ذات الخطوات المتعددة.',
      'في هذا المقال، نستعرض خلاصة تجارب مكتب تكنو إنجاز في هندسة وكلاء الإنتاج. البداية تكمن في ضبط حلقة التحليل والتنفيذ (ReAct Loop) وتوفير سياق استرجاع معزز (RAG) عبر قواعد بيانات متجهة عالية الكفاءة مثل Milvus و Pinecone.',
      'تحدي الهلوسة تم حله عبر تطبيق آليات التحقق المزدوج (Guardrails) وحصر مجالات المعرفة باستخدام نماذج أصغر حجماً وأعلى دقة في فحص الإجابات وتدقيقها قبل تسليمها للمستخدم النهائي.',
      'الخلاصة: المستقبل ليس لمن يمتلك النموذج الأكبر، بل لمن يمتلك أفضل معمارية لتوجيه النموذج ودمجه مع قواعد بيانات وأنظمة المؤسسة الحقيقية.'
    ],
    contentEn: [
      'The AI ecosystem is rapidly evolving from basic chatbots into autonomous agents capable of iterative reasoning, tool calling, and executing multi-step enterprise workflows.',
      'In this article, we distill the engineering insights from Techno Enjaz in designing production agents. The cornerstone is structuring resilient ReAct loops backed by dense vector retrieval (RAG) with milvus-grade pipelines.',
      'We tackled hallucinations through dual guardrails and specialized evaluator models that audit outputs before delivering them downstream.',
      'Key takeaway: The future belongs not to those with the largest models, but to those with the best architecture orchestrating domain models into reliable enterprise operations.'
    ],
    tags: ['ذكاء اصطناعي', 'وكلاء ذكاء', 'RAG', 'هندسة النظم'],
    initialLikes: 46,
    initialComments: [
      {
        id: 'c1',
        author: 'م. خالد الدوسري',
        avatar: '',
        date: 'منذ يومين',
        text: 'مقال رائع جداً وشرح عميق لآلية تفادي الهلوسة في نماذج الـ RAG، شكراً لفريق تكنو إنجاز!'
      },
      {
        id: 'c2',
        author: 'سارة عبد الله',
        avatar: '',
        date: 'منذ يوم',
        text: 'التطبيق العملي وحلقات ReAct تم توضيحها بسلاسة فائقة، بانتظار مقالات جديدة!'
      }
    ]
  },
  {
    id: 'blog-clean-arch-erp',
    title: 'المعمارية النظيفة وتوسيع أنظمة الـ ERP السحابية فائقة الأداء',
    titleEn: 'Clean Architecture & Scaling Ultra-Performance Cloud ERP Systems',
    slug: 'clean-architecture-scaling-cloud-erp',
    category: 'هندسة برمجيات',
    categoryEn: 'Software Engineering',
    categoryColor: '#10b981',
    image: '/projects-live/hisab-erp.jpg',
    publishDate: '11 سبتمبر 2026',
    publishDateEn: 'Sep 11, 2026',
    readTime: '8 دقائق',
    readTimeEn: '8 min read',
    author: {
      id: 'abdulghani',
      name: 'عبد الغني',
      nameEn: 'Abdulghani',
      role: 'مدير الفريق التقني',
      roleEn: 'Team Director',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'كيف قمنا بهندسة نظام حساب ERP ليعالج آلاف المعاملات المالية في الثانية بدقة صفرية للأخطاء ومرونة سحابية كاملة.',
    excerptEn: 'How we engineered the Hisab ERP system to process thousands of financial transactions per second with zero tolerance for errors and full cloud resilience.',
    content: [
      'تعتبر أنظمة تخطيط الموارد المؤسسية (ERP) العمود الفقري للشركات. الفشل في تصميم معمارية مرنة من اليوم الأول يؤدي حتماً إلى تراكم الديون التقنية وصعوبة التوسع.',
      'في منصة حساب ERP، اعتمدنا مبادئ المعمارية النظيفة (Clean Architecture) وفصلنا طبقة منطق الأعمال (Domain Logic) عزلاً تاماً عن قواعد البيانات والواجهات البرمجية الخارجية.',
      'قمنا بدمج نمط التفرقة بين القراءة والكتابة (CQRS) واستخدام ذاكرة التخزين المؤقت الموزعة عبر Redis لضمان استجابة لحظية للتقارير والبيانات الإحصائية الضخمة.',
      'النتيجة كانت نظاماً قادراً على إصدار الفواتير الإلكترونية المعتمدة ومزامنة المخزون في أقل من 40 ميلي ثانية حتى في أوقات الذروة القصوى.'
    ],
    contentEn: [
      'Enterprise Resource Planning (ERP) systems represent the transactional backbone of corporations. Architectural oversights on day one inevitably lead to compounding technical debt.',
      'In the Hisab ERP platform, we enforced strict Clean Architecture principles, completely decoupling core domain logic from underlying databases and transport protocols.',
      'We integrated CQRS and distributed Redis caching to deliver sub-millisecond telemetry for heavy analytics and inventory reconciliations.',
      'The result is a compliant, high-velocity engine achieving validated e-invoicing and inventory locks in under 40ms during peak transactional bursts.'
    ],
    tags: ['هندسة برمجيات', 'ERP', 'Clean Architecture', 'CQRS'],
    initialLikes: 62,
    initialComments: [
      {
        id: 'c3',
        author: 'طارق العمري',
        avatar: '',
        date: 'منذ 3 أيام',
        text: 'فصل طبقة الدومين عن قواعد البيانات أنقذ مشاريع كثيرة، طرح متقدم جداً ومقنع!'
      }
    ]
  },
  {
    id: 'blog-edge-biometrics',
    title: 'منظومات التحقق البيومتري الميداني: الرؤية الحاسوبية على الحافة (Edge AI)',
    titleEn: 'Field Biometric Verification: Computer Vision on Edge AI',
    slug: 'field-biometric-verification-edge-ai',
    category: 'رؤية حاسوبية',
    categoryEn: 'Computer Vision',
    categoryColor: '#a855f7',
    image: '/projects-live/arduino-lab.jpg',
    publishDate: '08 سبتمبر 2026',
    publishDateEn: 'Sep 08, 2026',
    readTime: '5 دقائق',
    readTimeEn: '5 min read',
    author: {
      id: 'taima-alwani',
      name: 'تيماء علواني',
      nameEn: 'Taima Alwani',
      role: 'مهندسة نظم وحلول',
      roleEn: 'Systems Engineer',
      avatar: '/projects-live/taima-alwani.jpg'
    },
    excerpt: 'استعراض لتقنيات معالجة الفيديو في الزمن الحقيقي ونماذج التعرف الوجهي المضغوطة للعمل على أجهزة المعالجة الطرفية دون تأخير.',
    excerptEn: 'Exploring real-time video stream processing and compressed face recognition models optimized for low-latency Edge hardware inference.',
    content: [
      'تفرض المعالجة البيومترية الميدانية تحدياً مزدوجاً: ضمان أعلى دقة أمنية للتعرف على الوجوه، وفي الوقت نفسه تقديم استجابة فورية دون الاعتماد الإلزامي على الاتصال السحابي الدائم.',
      'قمنا بتطبيق تقنيات التكميم (INT8 Quantization) وتقليم الشبكات العصبية (Pruning) على نماذج ResNet و MobileNet لتعمل بسلاسة على وحدات معالجة مدمجة مثل Jetson Nano وأجهزة الحافة الطرفية.',
      'هذا الأسلوب يوفر خصوصية كاملة للبيانات حيث تظل الصور الحيوية مشفرة محلياً، مع مطابقة لحظية لأكثر من 50 ألف وجه في زمن لا يتعدى 120 ميلي ثانية.'
    ],
    contentEn: [
      'Field biometric systems demand maximum verification accuracy coupled with instantaneous local latency, independent of permanent cloud uplink availability.',
      'We engineered INT8 quantization and neural network pruning pipelines across embedded platforms like Jetson Orin and edge micro-nodes.',
      'This guarantees localized cryptographic safety where biometric embeddings never leave the perimeter, matching against 50,000 reference faces in under 120ms.'
    ],
    tags: ['رؤية حاسوبية', 'Edge AI', 'تعرف الوجوه', 'أمان بيومتري'],
    initialLikes: 39,
    initialComments: [
      {
        id: 'c4',
        author: 'م. ناصر الشهري',
        avatar: '',
        date: 'منذ 5 أيام',
        text: 'المعالجة الطرفية هي الحل الأضمن للخصوصية والسرعة في المنشآت الحساسة.'
      }
    ]
  },
  {
    id: 'blog-zero-trust-cloud',
    title: 'استراتيجيات دفاعات الثغرات الصفرية وأمن السحابة في الشركات الرقمية',
    titleEn: 'Zero-Day Defense Strategies & Cloud Security for Digital Enterprises',
    slug: 'zero-day-defense-strategies-cloud-security',
    category: 'أمن سيبراني',
    categoryEn: 'Cybersecurity',
    categoryColor: '#ef4444',
    image: '/projects-live/cableksa.jpg',
    publishDate: '03 سبتمبر 2026',
    publishDateEn: 'Sep 03, 2026',
    readTime: '7 دقائق',
    readTimeEn: '7 min read',
    author: {
      id: 'reem-alqahtani',
      name: 'ريم القحطاني',
      nameEn: 'Reem Al-Qahtani',
      role: 'مهندسة أمن سيبراني',
      roleEn: 'Cybersecurity Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop'
    },
    excerpt: 'منهجيات تطبيق مفهوم Zero Trust ومراقبة التهديدات اللحظية وحماية مفاتيح التشفير في بيئات التطوير والتشغيل.',
    excerptEn: 'Methodologies for implementing Zero Trust architectures, real-time intrusion monitoring, and cryptographic secrets protection across DevOps pipelines.',
    content: [
      'في عصر الهجمات المتقدمة المستمرة (APTs)، لم يعد الاعتماد على الجدران النارية التقليدية كافياً. مبدأ "لا تثق بأحد، وتحقق دائماً" (Never Trust, Always Verify) أصبح فرضاً هندسياً حتمياً.',
      'في مشاريع تكنو إنجاز، نطبق تجزئة الشبكات الميكروية (Micro-segmentation)، ونفرض المصادقة ثنائية الاتجاه (mTLS) بين جميع الخدمات السحابية المصغرة.',
      'كما نعتمد على أنظمة أتمتة الاستجابة الأمنية (SOAR) لعزل أي حاوية برمجية تظهر سلوكاً غير طبيعي خلال أجزاء من الثانية.'
    ],
    contentEn: [
      'In the era of advanced persistent threats (APTs), traditional perimeter defenses fall short. Enforcing "Never Trust, Always Verify" is no longer optional.',
      'We enforce micro-segmentation and strict mutual TLS (mTLS) handshakes across all microservices, combined with dynamic policy evaluation.',
      'Automated SOAR playbooks instantaneously quarantine compromised containers and rotate compromised tokens before lateral movement can occur.'
    ],
    tags: ['أمن سيبراني', 'Zero Trust', 'تشفير', 'حماية السحابة'],
    initialLikes: 53,
    initialComments: []
  },
  {
    id: 'blog-3d-webgl-ux',
    title: 'تصميم تجارب المستخدم التفاعلية ثلاثية الأبعاد: من الفكرة إلى الويب الحديث',
    titleEn: 'Crafting Interactive 3D User Experiences: From Concept to Modern Web',
    slug: 'interactive-3d-ux-modern-web',
    category: 'واجهات وتجربة مستخدم',
    categoryEn: 'UI/UX & WebGL',
    categoryColor: '#ec4899',
    image: '/projects-live/interactive-cv.jpg',
    publishDate: '28 أغسطس 2026',
    publishDateEn: 'Aug 28, 2026',
    readTime: '5 دقائق',
    readTimeEn: '5 min read',
    author: {
      id: 'omar-khaled',
      name: 'عمر خالد',
      nameEn: 'Omar Khaled',
      role: 'مهندس واجهات وتجربة مستخدم',
      roleEn: 'UI/UX Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop'
    },
    excerpt: 'أسرار بناء واجهات رقمية سينمائية باستخدام WebGL ومكتبات الحركة الحديثة مع الحفاظ على معدل 60 إطاراً في الثانية.',
    excerptEn: 'Secrets of engineering cinematic web interfaces using WebGL, Three.js shaders, and GSAP while preserving a rock-solid 60 FPS.',
    content: [
      'تمنح العناصر ثلاثية الأبعاد والتفاعلات الحركية المواقع الرقمية عمقاً وروحاً فريدة تجعل تجربة المستخدم لا تُنسى.',
      'لكن التحدي الأكبر يكمن في الحفاظ على أعلى مستويات الأداء (Performance). من خلال دمج مكتبات التجسيم مع الـ Shaders المخصصة، وتقليل عمليات إعادة الرسم (Draw Calls)، نضمن تجربة فائقة السلاسة على أجهزة الهواتف الذكية والحواسيب المكتبية.',
      'الدمج المتناغم بين تدرجات الإضاءة الفيزيائية والطباعة الحروفية الواضحة يصنع هوية سينمائية ترفع من قيمة المنتج الرقمي.'
    ],
    contentEn: [
      'Spatial 3D interactions and physics-driven motion endow modern digital products with immersive memorability.',
      'Balancing high-fidelity visual effects with uncompromising 60 FPS performance requires batching draw calls and crafting tailor-made GLSL shaders.',
      'Harmonizing physical light bounce with crisp typographic contrast creates the bespoke cinematic identity our partners expect.'
    ],
    tags: ['واجهات مستخدم', '3D Web', 'WebGL', 'تصميم رقمي'],
    initialLikes: 71,
    initialComments: [
      {
        id: 'c5',
        author: 'ليلى الحربي',
        avatar: '',
        date: 'منذ أسبوع',
        text: 'اللمسات الحركية في موقع تكنو إنجاز خير دليل على الاحترافية العالية، إبداع لا يوصف!'
      }
    ]
  },
  {
    id: 'blog-data-lakes-ml',
    title: 'معمارية البيانات الضخمة وبحيرات البيانات السحابية للتحليلات التنبؤية',
    titleEn: 'Big Data Architecture & Cloud Data Lakes for Predictive Analytics',
    slug: 'big-data-architecture-cloud-data-lakes',
    category: 'سحابة وبيانات',
    categoryEn: 'Cloud & Data',
    categoryColor: '#f59e0b',
    image: '/projects-live/rebuild-dn9.jpg',
    publishDate: '22 أغسطس 2026',
    publishDateEn: 'Aug 22, 2026',
    readTime: '9 دقائق',
    readTimeEn: '9 min read',
    author: {
      id: 'sara-almansoor',
      name: 'سارة المنصور',
      nameEn: 'Sara Al-Mansoor',
      role: 'مهندسة بيانات سحابية',
      roleEn: 'Cloud Data Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop'
    },
    excerpt: 'بناء خطوط معالجة وتدفق البيانات غير المتجانسة وتهيئتها لنماذج التعلم الآلي والتقارير الاستراتيجية الفورية.',
    excerptEn: 'Constructing robust streaming ETL pipelines for heterogeneous telemetry and feeding predictive machine learning engines.',
    content: [
      'البيانات هي الوقود الحقيقي للقرارات الاستراتيجية. مع تزايد تدفق البيانات من مصادر متعددة (تطبيقات الويب، مستشعرات IoT، قواعد بيانات علائقية)، تصبح بنية الـ Lakehouse الحل الأمثل.',
      'استعرضنا في هذا المقال كيفية بناء خطوط معالجة سحابية تعتمد على Apache Iceberg و Delta Lake مع معالجة التدفقات في الزمن الحقيقي.',
      'هذه البنية تتيح للمؤسسات تغذية نماذج التحليل التنبؤي دون تأخير زمني، مع خفض تكاليف التخزين السحابي بأكثر من 45%.'
    ],
    contentEn: [
      'Data fuels decisive strategic agility. Consolidating heterogeneous streams across transactional engines and IoT sensors necessitates modern Lakehouse paradigms.',
      'In this article, we outline scalable lakehouse architectures utilizing Apache Iceberg and streaming pipelines that reconcile analytical latency.',
      'This infrastructure feeds real-time predictive ML engines while shrinking raw storage expenditures by over 45%.'
    ],
    tags: ['بيانات ضخمة', 'سحابة', 'Data Lake', 'ذكاء الأعمال'],
    initialLikes: 35,
    initialComments: []
  }
];

export const blogCategories = [
  { id: 'all', name: 'الكل', nameEn: 'All' },
  { id: 'ai', name: 'ذكاء اصطناعي', nameEn: 'Artificial Intelligence' },
  { id: 'software', name: 'هندسة برمجيات', nameEn: 'Software Engineering' },
  { id: 'vision', name: 'رؤية حاسوبية', nameEn: 'Computer Vision' },
  { id: 'cyber', name: 'أمن سيبراني', nameEn: 'Cybersecurity' },
  { id: 'ux', name: 'واجهات وتجربة مستخدم', nameEn: 'UI/UX & WebGL' },
  { id: 'cloud', name: 'سحابة وبيانات', nameEn: 'Cloud & Data' }
];
