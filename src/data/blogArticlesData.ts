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
  },
  {
    id: 'blog-honor-robot-phone',
    title: 'الهاتف الروبوت | تعرف على إبداع شركة Honor الجديد في عالم الهواتف',
    titleEn: "The Robot Phone | Discover Honor's Groundbreaking Innovation in Smartphones",
    slug: 'honor-robot-phone-gimbal-innovation',
    category: 'التكنولوجيا',
    categoryEn: 'Technology',
    categoryColor: '#a855f7',
    image: '/projects-live/dermocean.jpg',
    publishDate: '15 أغسطس 2026',
    publishDateEn: 'Aug 15, 2026',
    readTime: '3 دقائق قراءة',
    readTimeEn: '3 min read',
    author: {
      id: 'muneer-aldakkak',
      name: 'منير الدكاك',
      nameEn: 'Muneer Al-Dakkak',
      role: 'محرر تقني وباحث هندسي',
      roleEn: 'Tech Editor & Research Lead',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop'
    },
    excerpt: 'في زحام الهواتف المتشابهة، تبرز إبداعات جديدة من حين إلى آخر. تعرف على هاتف Honor الجديد الذي يضع كاميرا مع مثبت ميكانيكي gimbal على ظهر هاتفك!',
    excerptEn: "In an ocean of homogenous smartphones, breakthrough innovations emerge. Explore Honor's new device featuring a mechanical micro-gimbal camera stabilization module.",
    content: [
      'في زحام الهواتف المتشابهة، تبرز إبداعات جديدة من حين إلى آخر تجعلنا نعيد التفكير في مستقبل الأجهزة المحمولة. تعرف على الهاتف الجديد من شركة Honor الذي يدمج كاميرا روبوتية دقيقة مع مثبت ميكانيكي حقيقي (Gimbal) على ظهر الهاتف.',
      'تعتمد هذه التقنية على محركات كهروميكانيكية فائقة الصغر (Micro-Servos) قادرة على تتبع الأجسام المتحركة بدقة 360 درجة، وتثبيت الصورة الميكانيكي الحقيقي دون الحاجة إلى اقتصاص الحواف بالبرمجيات.',
      'هذا الابتكار يفتح الباب أمام الجيل القادم من صناعة المحتوى، حيث يمكن للهاتف تصوير مقاطع احترافية متتبعة بحرية كاملة ودون الحاجة لحمل أدوات تثبيت إضافية.',
      'الخلاصة: الدمج بين هندسة الروبوتات الدقيقة وهندسة الهواتف الذكية يثبت أن الابتكار في العتاد الصلب لم يصل بعد إلى نهايته، بل يدخل عصراً ميكانيكياً جديداً.'
    ],
    contentEn: [
      "In an ocean of homogenous smartphones, revolutionary hardware concepts remind us that mobile engineering is far from stagnant. Honor's new phone integrates a motorized mechanical gimbal directly onto its chassis.",
      "Utilizing micro-electromechanical servos (MEMS), the camera actively pans, tilts, and tracks targets with physical gyro stabilization, rendering digital cropping artifacts obsolete.",
      "This unlocks unprecedented creative freedom for mobile cinematographers and autonomous vlogging without auxiliary stabilizers.",
      "Takeaway: Converging micro-robotics with mobile engineering proves hardware form-factor innovation is entering a vivid new chapter."
    ],
    tags: ['تكنولوجيا', 'هواتف_ذكية', 'ابتكار', 'روبوتات', 'Honor'],
    initialLikes: 89,
    initialComments: [
      {
        id: 'c-honor-1',
        author: 'م. حسام الدين',
        avatar: '',
        date: 'منذ 3 ساعات',
        text: 'فكرة الجيمبال الميكانيكي المدمج ثورة حقيقية في كاميرات الهواتف!'
      }
    ]
  },
  {
    id: 'blog-apple-design',
    title: 'هل وقعت آبل في خطأ المصممين الجدد؟',
    titleEn: 'Did Apple Fall Into the Trap of Junior Designers?',
    slug: 'did-apple-fall-into-junior-designers-trap',
    category: 'التكنولوجيا',
    categoryEn: 'Technology',
    categoryColor: '#a855f7',
    image: '/projects-live/cablexperts.jpg',
    publishDate: '12 يوليو 2025',
    publishDateEn: 'Jul 12, 2025',
    readTime: 'دقيقتا قراءة',
    readTimeEn: '2 min read',
    author: {
      id: 'muneer-aldakkak',
      name: 'منير الدكاك',
      nameEn: 'Muneer Al-Dakkak',
      role: 'محرر تقني وباحث هندسي',
      roleEn: 'Tech Editor & Research Lead',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop'
    },
    excerpt: 'في هذا المقال نتناول الحديث عن النظام التصميمي الجديد لأجهزة آبل - Liquid Glass - ونسلط الضوء على أبرز ما جاء فيه من مشاكل وتعامل شركة Apple مع ردود أفعال المصممين.',
    excerptEn: "Analyzing Apple's Liquid Glass interface paradigm, examining the usability hurdles and how the Cupertino giant addresses community critique.",
    content: [
      'في هذا المقال نتناول الحديث عن النظام التصميمي الجديد لأجهزة آبل - Liquid Glass - ونسلط الضوء على أبرز ما جاء فيه من مشاكل وتعامل شركة Apple مع ردود أفعال مجتمع المصممين والمهندسين حول العالم.',
      'تاريخياً، قادت شركة آبل ثورات التصميم من الواقعية المفرطة (Skeuomorphism) إلى التصميم المسطح (Flat Design). إلا أن الإفراط في الشفافيات المعقدة والانكسارات البصرية في بعض الواجهات التجريبية أثار تساؤلات جدية حول إمكانية الوصول وتباين الألوان.',
      'القاعدة الذهبية في تجربة المستخدم: لا يمكن للجماليات البصرية الفائقة أن تحل محل الوضوح الوظيفي وسرعة إنجاز المهام.',
      'كيف استجابت آبل؟ عبر إتاحة خيارات متقدمة لتقليل الشفافية وزيادة التباين دون المساس بجماليات النظام.'
    ],
    contentEn: [
      "In this retrospective, we analyze Apple's design trajectory with Liquid Glass, evaluating where aesthetics momentarily challenged practical accessibility.",
      "From hyper-realistic skeuomorphism to ultra-flat minimalism, Apple has consistently steered design discourse. Yet excessive blur radii and refractive materials pose real contrast dilemmas.",
      "The cardinal rule of UI/UX remains immutable: visual splendor must never compromise cognitive clarity or ergonomic task velocity.",
      "Apple's remedy: granular system toggles for contrast enforcement and refined backdrop filters."
    ],
    tags: ['آبل', 'تصميم', 'Liquid_Glass', 'واجهات', 'UI_UX'],
    initialLikes: 114,
    initialComments: [
      {
        id: 'c-apple-1',
        author: 'رغد الشامي',
        avatar: '',
        date: 'منذ يوم',
        text: 'مقال دقيق جداً! التوازن بين الجمال والوظيفة هو التحدي الأكبر لأي مصمم.'
      }
    ]
  },
  {
    id: 'blog-ux-influence',
    title: 'ما هي تجربة المستخدم؟ وكيف تستخدمها الشركات للتأثير على قراراتك؟',
    titleEn: 'What is User Experience? How Enterprises Shape Decision Architecture',
    slug: 'what-is-ux-enterprise-decision-shaping',
    category: 'التصميم والواجهات',
    categoryEn: 'UI/UX & Design',
    categoryColor: '#06b6d4',
    image: '/projects-live/interactive-cv.jpg',
    publishDate: '20 أغسطس 2026',
    publishDateEn: 'Aug 20, 2026',
    readTime: '4 دقائق قراءة',
    readTimeEn: '4 min read',
    author: {
      id: 'tala-khatib',
      name: 'تالا الخطيب',
      nameEn: 'Tala Al-Khatib',
      role: 'رئيسة قسم تجربة المستخدم',
      roleEn: 'Head of UX Design',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop'
    },
    excerpt: 'في هذا المقال سوف نتعرف على تجربة المستخدم وكيف تستخدمها الشركات لتوجيه سلوك المستخدمين والتأثير على قراراتهم واستمراريتهم.',
    excerptEn: 'Demystifying User Experience engineering: behavioral psychology heuristics and ethical decision architecture in modern consumer products.',
    content: [
      'في هذا المقال سوف نتعرف على تجربة المستخدم (User Experience) وكيف تستخدمها الشركات لتوجيه سلوك المستخدمين والتأثير على قراراتهم واستمراريتهم في استخدام المنصة.',
      'تجربة المستخدم ليست مجرد ألوان جذابة أو أزرار لامعة؛ إنها هندسة نفسية وسلوكية دقيقة تستند إلى مبادئ Gestalt وقوانين Hick و Fitts لتقليل الجهد الذهني وتوجيه الانتباه.',
      'الشركات الرائدة لا تترك أي تفاعل للصدفة؛ فكل حركة، وكل انتقال، وكل مسافة تم حسابها بعناية لتعزيز الشعور بالإنجاز والرضا لدى المستخدم.',
      'في تكنو إنجاز، نلتزم بتطبيق معايير التصميم الأخلاقي (Ethical UX) التي تحترم وقت المستخدم وتقدم له أعلى قيمة وظيفية بأقل احتكاك ممكن.'
    ],
    contentEn: [
      'In this guide, we demystify User Experience architecture and how organizations deploy behavioral psychology to streamline user adoption and retention.',
      'UX extends far beyond color palettes and slick buttons; it is cognitive ergonomics grounded in Hick’s Law, Fitts’s Law, and Gestalt perceptual psychology.',
      'Market leaders engineer micro-interactions to foster continuous user delight and seamless task execution.',
      'At Techno Enjaz, our design ethos centers on Ethical UX: honoring user attention while delivering maximum functional velocity.'
    ],
    tags: ['تجربة_المستخدم', 'تصميم_المنتجات', 'سلوك_المستخدم', 'شركات'],
    initialLikes: 68,
    initialComments: []
  }
];

export const blogCategories = [
  { id: 'all', name: 'الكل', nameEn: 'All' },
  { id: 'tech', name: 'التكنولوجيا', nameEn: 'Technology' },
  { id: 'ai', name: 'ذكاء اصطناعي', nameEn: 'Artificial Intelligence' },
  { id: 'software', name: 'هندسة برمجيات', nameEn: 'Software Engineering' },
  { id: 'ux', name: 'التصميم والواجهات', nameEn: 'UI/UX & Design' },
  { id: 'vision', name: 'رؤية حاسوبية', nameEn: 'Computer Vision' },
  { id: 'cyber', name: 'أمن سيبراني', nameEn: 'Cybersecurity' },
  { id: 'cloud', name: 'سحابة وبيانات', nameEn: 'Cloud & Data' }
];
