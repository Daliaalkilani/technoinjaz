import digitalTwinMarkdown from '../content/articles/digital-twin.md?raw';
import affectiveComputingMarkdown from '../content/articles/affective-computing.md?raw';
import emotionAwareMarkdown from '../content/articles/emotion-aware-recommendation.md?raw';
import mcpMarkdown from '../content/articles/model-context-protocol-mcp.md?raw';
import nextTokenMarkdown from '../content/articles/next-token-prediction.md?raw';

export interface BlogComment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  text: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  seoTitle: string;
  metaDescription: string;
  canonical: string;
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
  rawMarkdown: string;
  content: string[];
  contentEn: string[];
  tags: string[];
  initialLikes: number;
  initialComments: BlogComment[];
}

export const blogArticlesData: BlogArticle[] = [
  {
    id: 'digital-twin',
    slug: 'digital-twin',
    title: 'التوأم الرقمي: ما هو وكيف يعمل وما أهم تطبيقاته؟',
    titleEn: 'Digital Twin: Definition, Architecture, and Enterprise Applications',
    seoTitle: 'ما هو التوأم الرقمي؟ كيف يعمل وتطبيقاته وأبرز تحدياته',
    metaDescription: 'دليل شامل لفهم التوأم الرقمي Digital Twin: كيف يعمل، مكوناته، الفرق بينه وبين المحاكاة، وأهم تطبيقاته في الصناعة والمباني والصحة والتحديات التي تواجهه.',
    canonical: 'https://techno-enjaz.com/articles/digital-twin',
    category: 'التحول الرقمي',
    categoryEn: 'Digital Transformation',
    categoryColor: '#0aeec3',
    image: '/projects-live/arduino-lab.jpg',
    publishDate: '20 سبتمبر 2026',
    publishDateEn: 'Sep 20, 2026',
    readTime: '12 دقيقة قراءة',
    readTimeEn: '12 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم هندسة النظم والتحول الرقمي',
      roleEn: 'Systems Engineering & Digital Transformation Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'التوأم الرقمي (Digital Twin) هو تمثيل رقمي قائم على البيانات لكيان أو عملية في العالم الحقيقي، تتم مزامنته مع الواقع بدرجة وتواتر يناسبان الهدف من استخدامه، لمراقبة الأداء واختبار السيناريوهات ودعم القرار.',
    excerptEn: 'A Digital Twin is a comprehensive, data-driven virtual representation of real-world entities or processes, synchronized at purpose-driven fidelity for monitoring, predictive analysis, and decision support.',
    rawMarkdown: digitalTwinMarkdown,
    content: [
      'التوأم الرقمي (Digital Twin) هو تمثيل رقمي قائم على البيانات لكيان أو عملية في العالم الحقيقي، تتم مزامنته مع الواقع بدرجة وتواتر يناسبان الهدف من استخدامه.',
      'لا يقتصر دوره على عرض شكل الأصل، بل يمكن استخدامه لمراقبة حالته، وتحليل سلوكه، وتجربة السيناريوهات، والتنبؤ بالمشكلات، ودعم اتخاذ القرار.',
      'ويعرّف Digital Twin Consortium التوأم الرقمي بأنه تمثيل افتراضي متكامل قائم على البيانات لكيانات وعمليات في العالم الحقيقي، مع تفاعل متزامن بتواتر ومستوى دقة محددين.'
    ],
    contentEn: [
      'A Digital Twin is a data-driven digital representation of a physical asset, process, or system, synchronized at a specified frequency and fidelity.',
      'It goes beyond 3D visualization to enable continuous monitoring, what-if scenario simulations, anomaly detection, and operational optimization.'
    ],
    tags: ['التوأم_الرقمي', 'إنترنت_الأشياء', 'التحول_الرقمي', 'المحاكاة', 'أنظمة_ذكية', 'Digital_Twin'],
    initialLikes: 184,
    initialComments: []
  },
  {
    id: 'affective-computing',
    slug: 'affective-computing',
    title: 'الحوسبة العاطفية: كيف يحلل الذكاء الاصطناعي التعبير العاطفي؟',
    titleEn: 'Affective Computing: How AI Analyzes Human Emotional Expressions',
    seoTitle: 'ما هي الحوسبة العاطفية؟ كيف يحلل الذكاء الاصطناعي التعبير العاطفي؟',
    metaDescription: 'دليل شامل لفهم الحوسبة العاطفية Affective Computing: كيف تحلل أنظمة الذكاء الاصطناعي تعابير الوجه والصوت والنص والإشارات الحيوية، وما تطبيقاتها وحدودها ومخاطرها الأخلاقية.',
    canonical: 'https://techno-enjaz.com/articles/affective-computing',
    category: 'ذكاء اصطناعي',
    categoryEn: 'Artificial Intelligence',
    categoryColor: '#8b5cf6',
    image: '/projects-live/interactive-cv.jpg',
    publishDate: '20 سبتمبر 2026',
    publishDateEn: 'Sep 20, 2026',
    readTime: '14 دقيقة قراءة',
    readTimeEn: '14 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم الذكاء الاصطناعي والتفاعل البشري',
      roleEn: 'AI & Human-Computer Interaction Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'الحوسبة العاطفية (Affective Computing) تجمع بين الذكاء الاصطناعي وعلم النفس والتفاعل الإنساني الحاسوبي لرصد الإشارات التعبيرية في الوجه والصوت والنص والإشارات الفسيولوجية، مع الاحتفاظ بحدود عدم اليقين والسياق.',
    excerptEn: 'Affective Computing bridges artificial intelligence, psychology, and HCI to measure expressive signals across facial movements, vocal tonality, text, and physiological telemetry without over-claiming mind reading.',
    rawMarkdown: affectiveComputingMarkdown,
    content: [
      'الحوسبة العاطفية (Affective Computing) هي مجال يجمع بين الذكاء الاصطناعي وعلوم الحاسوب وعلم النفس والتفاعل بين الإنسان والآلة لبناء أنظمة تستطيع رصد بعض الإشارات المرتبطة بالتعبير العاطفي، وتمثيلها أو الاستجابة لها.',
      'النظام لا يملك وصولًا مباشرًا إلى “الشعور الحقيقي” داخل الإنسان؛ بل يحلل إشارات قابلة للقياس ثم يستنتج منها احتمالات أو أنماطًا مرتبطة بالتعبير والحالة والسياق.',
      'يرتبط تأسيس المجال الحديث بصورة وثيقة بأعمال Rosalind W. Picard في MIT Media Lab عام 1995.'
    ],
    contentEn: [
      'Affective Computing studies systems that can recognize, interpret, and simulate human affective states.',
      'Modern scientific consensus emphasizes measuring expressions and physiological markers as contextual cues rather than deterministic emotional ground truth.'
    ],
    tags: ['الحوسبة_العاطفية', 'الذكاء_الاصطناعي', 'التفاعل_البشري_الحاسوبي', 'الرؤية_الحاسوبية', 'Affective_AI'],
    initialLikes: 215,
    initialComments: []
  },
  {
    id: 'emotion-aware-recommendation',
    slug: 'emotion-aware-recommendation',
    title: 'تحليل تعابير الوجه بالكاميرا وتخصيص المحتوى: كيف تعمل أنظمة التوصية الواعية بالعاطفة؟',
    titleEn: 'Facial Expression Analysis for Emotion-Aware Recommendation Systems',
    seoTitle: 'تحليل تعابير الوجه بالكاميرا وتخصيص المحتوى: كيف تعمل أنظمة التوصية الواعية بالعاطفة؟',
    metaDescription: 'شرح عملي لكيفية تحليل تعابير الوجه بالكاميرا واستخدامها كإشارة سياقية في أنظمة التوصية، من اكتشاف الوجه وCNN إلى تخصيص المحتوى، مع أهم القيود العلمية ومخاطر الخصوصية والتحيز.',
    canonical: 'https://techno-enjaz.com/articles/emotion-aware-recommendation',
    category: 'أنظمة التوصية',
    categoryEn: 'Recommender Systems',
    categoryColor: '#ec4899',
    image: '/projects-live/modeya.jpg',
    publishDate: '20 سبتمبر 2026',
    publishDateEn: 'Sep 20, 2026',
    readTime: '15 دقيقة قراءة',
    readTimeEn: '15 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم هندسة خوارزميات التوصية',
      roleEn: 'Recommendation Algorithms Engineering',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'كيفية استخدام الرؤية الحاسوبية لتحليل تعابير وحركات الوجه واستخدامها كإشارة احتمالية سياقية في محركات التوصية، مع معالجة قيود الخصوصية والحوكمة والتحيز الخوارزمي.',
    excerptEn: 'Architectural walkthrough on leveraging computer vision facial landmarks as contextual probabilistic signals in recommender systems, handling privacy bounds and algorithmic bias.',
    rawMarkdown: emotionAwareMarkdown,
    content: [
      'يمكن استخدام الكاميرا لتحليل أنماط الحركة والتعبير في الوجه، ثم تحويلها إلى تقديرات احتمالية يمكن إضافتها إلى أنظمة التوصية كإشارة سياقية تساعد على تخصيص المحتوى.',
      'من المهم التفريق بين تحليل تعبير الوجه وبين معرفة المشاعر الداخلية الحقيقية؛ فالصورة لا تمنح النظام وصولًا مباشرًا إلى ما يشعر به الإنسان.',
      'سلسلة النظام تتدرج: كاميرا ← اكتشاف الوجه ← تحليل التعبير ← تقدير احتمالي ← دمج مع سياق المستخدم ← محرك توصية ← محتوى مقترح ← تغذية راجعة.'
    ],
    contentEn: [
      'Visual emotion estimation uses convolutional networks and landmark tracking to inject real-time probabilistic mood indicators into recommendation pipelines.',
      'Robust architectures combine facial cues with explicit user history and privacy-preserving local on-device inference.'
    ],
    tags: ['أنظمة_التوصية', 'تعابير_الوجه', 'الرؤية_الحاسوبية', 'الحوسبة_العاطفية', 'تخصيص_المحتوى', 'Recommender_Systems'],
    initialLikes: 168,
    initialComments: []
  },
  {
    id: 'model-context-protocol-mcp',
    slug: 'model-context-protocol-mcp',
    title: 'ما هو بروتوكول MCP؟ كيف يربط نماذج الذكاء الاصطناعي بالأدوات والبيانات؟',
    titleEn: 'Model Context Protocol (MCP): Standardizing AI Tool & Data Integration',
    seoTitle: 'ما هو بروتوكول MCP؟ كيف يربط نماذج الذكاء الاصطناعي بالأدوات والبيانات؟',
    metaDescription: 'دليل عملي لفهم Model Context Protocol (MCP): معماريته، الأدوات والموارد والقوالب، طرق النقل الحديثة، الأمان، والفرق بينه وبين APIs وFunction Calling وLangChain.',
    canonical: 'https://techno-enjaz.com/articles/model-context-protocol-mcp',
    category: 'معمارية النظم',
    categoryEn: 'Systems Architecture',
    categoryColor: '#3b82f6',
    image: '/projects-live/projectforge.jpg',
    publishDate: '20 سبتمبر 2026',
    publishDateEn: 'Sep 20, 2026',
    readTime: '16 دقيقة قراءة',
    readTimeEn: '16 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم معمارية البرمجيات وبروتوكولات AI',
      roleEn: 'Software Architecture & AI Protocols Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'Model Context Protocol (MCP) هو معيار مفتوح يوفّر طريقة موحدة لربط تطبيقات ووكلاء الذكاء الاصطناعي بالأدوات وقواعد البيانات والموارد الخارجية، مقللاً كود الربط المخصص ومعززاً الأمان.',
    excerptEn: 'Model Context Protocol (MCP) is the open industry standard unifying how generative AI agents and models interface with external tools, APIs, and databases via standardized transports.',
    rawMarkdown: mcpMarkdown,
    content: [
      'Model Context Protocol (MCP) هو معيار مفتوح يوفّر طريقة موحدة لربط تطبيقات الذكاء الاصطناعي بالأدوات والبيانات والأنظمة الخارجية.',
      'بدل أن يبني المطور تكاملًا مختلفًا لكل نموذج ولكل خدمة، يمكنه إنشاء MCP Server يعرّف قدراته بطريقة معيارية، ثم تتصل به تطبيقات تدعم MCP لاكتشاف هذه القدرات واستخدامها.',
      'قدمته Anthropic في نوفمبر 2024 وتبرعت به إلى Agentic AI Foundation التابعة لـ Linux Foundation في 2025.'
    ],
    contentEn: [
      'Model Context Protocol is an open standard establishing a unified bridge between LLM hosts and external tool/data servers.',
      'It solves the M×N integration problem by standardizing tool definitions, prompts, and resources across heterogeneous AI platforms.'
    ],
    tags: ['بروتوكول_MCP', 'وكلاء_الذكاء_الاصطناعي', 'تكامل_البيانات', 'LLM_Tools', 'Anthropic', 'Model_Context_Protocol'],
    initialLikes: 290,
    initialComments: []
  },
  {
    id: 'next-token-prediction',
    slug: 'next-token-prediction',
    title: 'كيف تتنبأ نماذج الذكاء الاصطناعي بالكلمة التالية؟ من N-gram إلى Transformers',
    titleEn: 'Next Token Prediction: From N-grams to Transformers and Arabic LLMs',
    seoTitle: 'كيف تتنبأ نماذج الذكاء الاصطناعي بالكلمة التالية؟ من N-gram إلى Transformers',
    metaDescription: 'شرح عملي لكيفية التنبؤ بالكلمة أو الرمز التالي في النماذج اللغوية، من N-gram وRNN وLSTM إلى Transformers، مع استراتيجيات التوليد وتحديات اللغة العربية ونماذج Jais وALLaM.',
    canonical: 'https://techno-enjaz.com/articles/next-token-prediction',
    category: 'معالجة اللغات الطبيعية',
    categoryEn: 'NLP & LLMs',
    categoryColor: '#f59e0b',
    image: '/projects-live/md-2-pdf.jpg',
    publishDate: '20 سبتمبر 2026',
    publishDateEn: 'Sep 20, 2026',
    readTime: '15 دقيقة قراءة',
    readTimeEn: '15 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم معالجة اللغات الطبيعية والنماذج التوليدية',
      roleEn: 'Natural Language Processing & Generative Models',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'تعتمد النماذج اللغوية التوليدية على تقدير ما يُرجح أن يأتي بعد السياق؛ استعراض تطور النمذجة من N-gram وRNN إلى Transformers، وتحديات الصرف واللهجات والرمزنة في اللغة العربية ونماذج Jais وALLaM.',
    excerptEn: 'In-depth technical breakdown of next token prediction: from historical N-grams and LSTMs to causal self-attention Transformers, decoding heuristics, and Arabic morphology tokenization.',
    rawMarkdown: nextTokenMarkdown,
    content: [
      'تعتمد النماذج اللغوية التوليدية على مهمة تبدو بسيطة ظاهريًا: تقدير ما الذي يُرجح أن يأتي بعد السياق الحالي.',
      'في النماذج الحديثة، الأدق غالبًا أن نقول التنبؤ بالرمز التالي (Next Token Prediction) لا بالكلمة التالية حرفيًا، لأن النص يُقسَّم إلى Tokens.',
      'تطورت النمذجة من N-gram الإحصائية إلى RNN وLSTM وصولًا إلى معمارية Transformer Decoder-only التي تشكل أساس النماذج التوليدية المعاصرة.'
    ],
    contentEn: [
      'Generative language models estimate probability distributions over token vocabularies given preceding context sequences.',
      'Understanding tokenization granularity, causal masking, and decoding heuristics is fundamental to engineering with modern LLMs like Jais and ALLaM.'
    ],
    tags: ['معالجة_اللغات_الطبيعية', 'النماذج_اللغوية', 'Transformers', 'Next_Token_Prediction', 'الذكاء_الاصطناعي', 'اللغة_العربية'],
    initialLikes: 230,
    initialComments: []
  }
];

export const blogCategories = [
  { id: 'all', name: 'الكل', nameEn: 'All' },
  { id: 'transformation', name: 'التحول الرقمي', nameEn: 'Digital Transformation' },
  { id: 'ai', name: 'ذكاء اصطناعي', nameEn: 'Artificial Intelligence' },
  { id: 'recommender', name: 'أنظمة التوصية', nameEn: 'Recommender Systems' },
  { id: 'architecture', name: 'معمارية النظم', nameEn: 'Systems Architecture' },
  { id: 'nlp', name: 'معالجة اللغات الطبيعية', nameEn: 'NLP & LLMs' }
];
