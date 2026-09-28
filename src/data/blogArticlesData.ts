import digitalTwinMarkdown from '../content/articles/digital-twin.md?raw';
import affectiveComputingMarkdown from '../content/articles/affective-computing.md?raw';
import emotionAwareMarkdown from '../content/articles/emotion-aware-recommendation.md?raw';
import mcpMarkdown from '../content/articles/model-context-protocol-mcp.md?raw';
import nextTokenMarkdown from '../content/articles/next-token-prediction.md?raw';
import fiveGIotMarkdown from '../content/articles/5g-iot.md?raw';
import ferAiMarkdown from '../content/articles/facial-expression-recognition-ai.md?raw';
import iotPillarMarkdown from '../content/articles/internet-of-things-iot.md?raw';
import embeddedSerialMarkdown from '../content/articles/embedded-serial-protocols.md?raw';
import imageClassificationMarkdown from '../content/articles/ai-image-classification.md?raw';
import fiveGNrMarkdown from '../content/articles/5g-nr-radio-architecture.md?raw';
import smartRidePoolingMarkdown from '../content/articles/smart-ai-ride-pooling.md?raw';

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
    image: '/articles/digital-twin.jpg',
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
    image: '/articles/affective-computing.jpg',
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
    image: '/articles/emotion-aware-recommendation.jpg',
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
    image: '/articles/model-context-protocol-mcp.jpg',
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
    image: '/articles/next-token-prediction.jpg',
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
  },
  {
    id: '5g-iot',
    slug: '5g-iot',
    title: 'كيف تؤثر شبكات 5G في إنترنت الأشياء؟ السرعة والزمن والتوسع و5G-Advanced',
    titleEn: 'How 5G Transforms the Internet of Things: Speed, Latency, Massive IoT, and 5G-Advanced',
    seoTitle: 'كيف تؤثر شبكات 5G في إنترنت الأشياء؟ السرعة والزمن والتوسع و5G-Advanced',
    metaDescription: 'دليل شامل يوضح أثر 5G على إنترنت الأشياء (IoT): متى تحتاج eMBB وURLLC وmMTC وRedCap، وبدائل مثل NB-IoT وLoRaWAN، مع معايير 3GPP و5G-Advanced.',
    canonical: 'https://techno-enjaz.com/articles/5g-iot',
    category: 'اتصالات وشبكات',
    categoryEn: 'Networks & Telecom',
    categoryColor: '#06b6d4',
    image: '/articles/5g-iot.png',
    publishDate: '21 سبتمبر 2026',
    publishDateEn: 'Sep 21, 2026',
    readTime: '15 دقيقة قراءة',
    readTimeEn: '15 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم هندسة الشبكات والاتصالات اللاسلكية',
      roleEn: 'Wireless Communications & Networks Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'دليل شامل يوضح أثر 5G على إنترنت الأشياء: متى تحتاج التطبيقات الصناعية والحضرية إلى eMBB وURLLC وmMTC، وما دور RedCap وNB-IoT ومعايير 3GPP حتى 5G-Advanced.',
    excerptEn: 'Comprehensive guide to how 5G impacts IoT: evaluating eMBB, URLLC, mMTC, RedCap, and legacy LPWANs across industrial, smart city, and mission-critical deployments.',
    rawMarkdown: fiveGIotMarkdown,
    content: [
      'تعد شبكات الجيل الخامس (5G) نقلة نوعية في دعم إنترنت الأشياء، حيث تجاوزت مجرد رفع سرعات التنزيل للهواتف إلى تصميم طبقات مخصصة لتلبية احتياجات التطبيقات الصناعية والحرجة.',
      'تقسم معايير 3GPP استخدامات 5G إلى ثلاث فئات رئيسية: eMBB للسرعات العالية، URLLC للاتصالات فائقة الموثوقية وزمن الاستجابة المنخفض، وmMTC للتوصيل الكثيف للحساسات والأجهزة.',
      'يقدم تقريرنا تحليلاً عملياً لمهندسي النظم لاختيار البروتوكول والشبكة المناسبة وتجنب التكاليف غير المبررة عند استخدام 5G في بيئات العمل الحقيقية.'
    ],
    contentEn: [
      '5G represents a paradigm shift for IoT, extending beyond smartphone bandwidth into specialized service domains tailored for industrial and mission-critical applications.',
      '3GPP architecture divides 5G into eMBB, URLLC, and mMTC, supported by 5G-Advanced (Release 18/19) and RedCap technologies.'
    ],
    tags: ['شبكات_5G', 'إنترنت_الأشياء', 'اتصالات_لاسلكية', 'RedCap', 'URLLC', 'mMTC', 'IoT'],
    initialLikes: 215,
    initialComments: []
  },
  {
    id: 'facial-expression-recognition-ai',
    slug: 'facial-expression-recognition-ai',
    title: 'كيف يتعرف الذكاء الاصطناعي على تعابير الوجه؟ شرح FER وFACS وCNN',
    titleEn: 'Facial Expression Recognition with AI: CNNs, FACS, and Vision Transformers',
    seoTitle: 'كيف يتعرف الذكاء الاصطناعي على تعابير الوجه؟ شرح FER وFACS وCNN',
    metaDescription: 'دليل شامل لفهم كيفية تعرف الذكاء الاصطناعي على تعابير الوجه: من FACS ووحدات الحركة AU إلى CNN وVision Transformers، ومشاكل الإضاءة والانحياز الأخلاقي.',
    canonical: 'https://techno-enjaz.com/articles/facial-expression-recognition-ai',
    category: 'رؤية حاسوبية',
    categoryEn: 'Computer Vision',
    categoryColor: '#ec4899',
    image: '/articles/facial-expression-recognition-ai.png',
    publishDate: '21 سبتمبر 2026',
    publishDateEn: 'Sep 21, 2026',
    readTime: '18 دقيقة قراءة',
    readTimeEn: '18 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم الرؤية الحاسوبية والذكاء الاصطناعي',
      roleEn: 'Computer Vision & Deep Learning Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'كيف تحلل الخوارزميات الحركات الدقيقة لعضلات الوجه؟ استعراض لنظام FACS ووحدات العمل Action Units، ومعمارية CNN وVision Transformers، وتحديات الإضاءة والزوايا والأخلاقيات.',
    excerptEn: 'A technical exploration of Facial Expression Recognition (FER): FACS action units, landmark tracking, deep CNNs, Vision Transformers, and addressing real-world bias.',
    rawMarkdown: ferAiMarkdown,
    content: [
      'يعتمد التعرف الآلي على تعابير الوجه (FER) على تحويل إشارات الصورة الدقيقة إلى استدلالات حول التعبير الظاهري للوجه باستخدام الرؤية الحاسوبية ونظام FACS.',
      'يمر النظام بمراحل متسلسلة: كشف الوجه (Face Detection)، تحديد المعالم (Landmark Alignment)، استخراج الخصائص عبر CNN أو Vision Transformers، وتصنيف التعبير.',
      'توضح دراستنا الفروقات الجوهرية بين التعرف على حركة العضلات السطحية والاستنتاج العاطفي الداخلي، مع معايير الخصوصية وحماية البيانات في الأنظمة المدمجة.'
    ],
    contentEn: [
      'Facial Expression Recognition (FER) utilizes computer vision and the Facial Action Coding System (FACS) to map micro-muscular movements into expressive probability distributions.',
      'Modern pipelines combine facial landmark detection with spatial-temporal CNNs and Vision Transformers while maintaining ethical and privacy boundaries.'
    ],
    tags: ['رؤية_حاسوبية', 'تعابير_الوجه', 'FER', 'FACS', 'CNN', 'ذكاء_اصطناعي', 'Vision_Transformers'],
    initialLikes: 278,
    initialComments: []
  },
  {
    id: 'internet-of-things-iot',
    slug: 'internet-of-things-iot',
    title: 'ما هو إنترنت الأشياء (IoT)؟ البنية والبروتوكولات والتطبيقات والأمان',
    titleEn: 'What is IoT? Architecture, Protocols, Edge vs Cloud, and Security Standards',
    seoTitle: 'ما هو إنترنت الأشياء (IoT)؟ البنية والبروتوكولات والتطبيقات والأمان',
    metaDescription: 'دليل شامل لإنترنت الأشياء (IoT): البنية الهندسية، مقارنة MQTT وCoAP، تقنيات الاتصال LoRaWAN وNB-IoT وMatter، أمن الأنظمة وفق NIST والمعايير المعتمدة.',
    canonical: 'https://techno-enjaz.com/articles/internet-of-things-iot',
    category: 'إنترنت الأشياء',
    categoryEn: 'Internet of Things',
    categoryColor: '#10b981',
    image: '/articles/internet-of-things-iot.png',
    publishDate: '21 سبتمبر 2026',
    publishDateEn: 'Sep 21, 2026',
    readTime: '17 دقيقة قراءة',
    readTimeEn: '17 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم إنترنت الأشياء والأنظمة الذكية',
      roleEn: 'Internet of Things & Smart Systems Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'الدليل الشامل لفهم إنترنت الأشياء: البنية الطبقية من الحساسات إلى السحابة، مقارنة عملية بين MQTT وCoAP وHTTP، تقنيات LPWAN وMatter، ومعايير أمان NISTIR 8259.',
    excerptEn: 'The definitive engineering pillar on the Internet of Things: layered architecture, protocol comparisons (MQTT, CoAP, Matter), edge vs cloud processing, and lifecycle security.',
    rawMarkdown: iotPillarMarkdown,
    content: [
      'إنترنت الأشياء (IoT) ليس مجرد ربط أجهزة بالإنترنت، بل هو منظومة هندسية متكاملة تقوم على: الاستشعار، التوصيل، المعالجة، اتخاذ القرار، والتنفيذ الفيزيائي.',
      'تتنوع بروتوكولات الاتصال بين طبقة نقل البيانات كالراديو والشبكات المحلية (Wi-Fi، Zigbee، LoRaWAN) وطبقة التطبيقات المتخصصة كـ MQTT وCoAP وMatter.',
      'يوفر المقال منهجية هندسية كاملة لتصميم حلول IoT قابلة للتوسع مع تغطية متطلبات الأمن السيبراني وفق إرشادات NIST وتحديثات 2026.'
    ],
    contentEn: [
      'The Internet of Things encompasses an end-to-end architecture: sensing, connectivity, data processing, autonomous decision-making, and physical actuation.',
      'This engineering guide compares transport technologies (LoRaWAN, NB-IoT) with messaging protocols (MQTT, CoAP, Matter) and NISTIR 8259 security baselines.'
    ],
    tags: ['إنترنت_الأشياء', 'IoT', 'MQTT', 'CoAP', 'LoRaWAN', 'أنظمة_ذكية', 'Matter'],
    initialLikes: 340,
    initialComments: []
  },
  {
    id: 'embedded-serial-protocols',
    slug: 'embedded-serial-protocols',
    title: 'UART أم I2C أم SPI أم RS-232؟ دليل اختيار بروتوكول الاتصال للنظم المدمجة',
    titleEn: 'UART vs I2C vs SPI vs RS-232: Embedded Serial Communication Protocols Guide',
    seoTitle: 'UART أم I2C أم SPI أم RS-232؟ دليل اختيار بروتوكول الاتصال للنظم المدمجة',
    metaDescription: 'مقارنة هندسية شاملة بين UART وI2C وSPI وRS-232 وRS-485: السرعات، المسافات، استهلاك الأسلاك، ومصفوفة قرار عملية للمهندسين ومطوري الأنظمة المدمجة.',
    canonical: 'https://techno-enjaz.com/articles/embedded-serial-protocols',
    category: 'أنظمة مدمجة',
    categoryEn: 'Embedded Systems',
    categoryColor: '#f97316',
    image: '/articles/embedded-serial-protocols.png',
    publishDate: '21 سبتمبر 2026',
    publishDateEn: 'Sep 21, 2026',
    readTime: '20 دقيقة قراءة',
    readTimeEn: '20 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم هندسة النظم المدمجة والدوائر الإلكترونية',
      roleEn: 'Embedded Systems & Hardware Engineering Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'دليل هندسي مقارن لاختيار واجهات الاتصال التسلسلية في المتحكمات الدقيقة: تحليل تقني للسرعات، عدد الأسلاك، مستويات الجهد، ومصفوفة قرار عملية لاختيار البروتوكول المناسب.',
    excerptEn: 'A practical engineering guide comparing UART, I2C, SPI, and RS-232/RS-485: wiring efficiency, clocking, signal integrity, and hardware decision matrices.',
    rawMarkdown: embeddedSerialMarkdown,
    content: [
      'تعتبر واجهات الاتصال التسلسلي العصب الرئيسي لربط المتحكمات الدقيقة بالحساسات والذواكر والملحقات في النظم المدمجة.',
      'يقدم المقال مقارنة تفصيلية بين UART (غير المتزامن، نقطة لنقطة)، I2C (المتزامن بسلكين والمتعدد الأطراف)، SPI (المتزامن عالي السرعة بـ 4 أسلاك)، وRS-232/RS-485 (للبيئات الصناعية).',
      'يتضمن المقال نصائح استكشاف الأخطاء باستخدام Logic Analyzer وفحص تكامل الإشارة ومصفوفة اختيار سريعة تناسب قيود التصميم الإلكتروني.'
    ],
    contentEn: [
      'Serial communication interfaces provide essential connectivity between microcontrollers, sensors, flash memories, and peripheral ICs.',
      'Detailed analysis covering asynchronous UART, 2-wire multi-device I2C, high-throughput synchronous SPI, and industrial RS-232/RS-485 transceivers.'
    ],
    tags: ['أنظمة_مدمجة', 'UART', 'I2C', 'SPI', 'RS232', 'متحكمات_دقيقة', 'إلكترونيات'],
    initialLikes: 310,
    initialComments: []
  },
  {
    id: 'ai-image-classification',
    slug: 'ai-image-classification',
    title: 'كيف يعمل تصنيف الصور بالذكاء الاصطناعي؟ من CNN إلى Vision Transformers',
    titleEn: 'AI Image Classification: From Convolutional Neural Networks to Vision Transformers',
    seoTitle: 'كيف يعمل تصنيف الصور بالذكاء الاصطناعي؟ من CNN إلى Vision Transformers',
    metaDescription: 'دليل متكامل في تصنيف الصور: كيف تعالج الشبكات العصبية الصور، الفرق بين CNN وViT وCLIP، مراحل التدريب وتجهيز البيانات، وحلول مشاكل العالم الحقيقي.',
    canonical: 'https://techno-enjaz.com/articles/ai-image-classification',
    category: 'رؤية حاسوبية',
    categoryEn: 'Computer Vision',
    categoryColor: '#ec4899',
    image: '/articles/ai-image-classification.png',
    publishDate: '21 سبتمبر 2026',
    publishDateEn: 'Sep 21, 2026',
    readTime: '19 دقيقة قراءة',
    readTimeEn: '19 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم الذكاء الاصطناعي وتعلم الآلة',
      roleEn: 'AI & Machine Learning Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'دليل معمق في تصنيف الصور الرقمية: من استخراج الميزات التلافيفية عبر CNN إلى معالجة الباتشات باستخدام Vision Transformers وCLIP، مع مقاييس التقييم وتحديات العالم الواقعي.',
    excerptEn: 'Comprehensive technical deep dive into image classification: convolution operations, ResNet backbones, Vision Transformers (ViT), multimodal CLIP, and metric evaluation.',
    rawMarkdown: imageClassificationMarkdown,
    content: [
      'يمثل تصنيف الصور المهمة التأسيسية في مجال الرؤية الحاسوبية، حيث تترجم الشبكات العصبية مصفوفات البيكسلات إلى تنبؤات احتمالية دقيقة.',
      'يوضح المقال التطور المعماري من الشبكات التلافيفية التقليدية CNNs ونماذج ResNet إلى Vision Transformers التي تطبق آليات الانتباه الذاتي على رقع الصور.',
      'كما يتطرق الدليل إلى معالجة تحديات التحيز وتغير توزيع البيانات (Distribution Shift) وحلول التدريب الفعال باستخدام Transfer Learning.'
    ],
    contentEn: [
      'Image classification forms the cornerstone of modern computer vision, transforming raw pixel arrays into calibrated category probability distributions.',
      'Covers structural evolution from spatial convolutions and residual networks to Vision Transformers and contrastive language-image pre-training (CLIP).'
    ],
    tags: ['تصنيف_الصور', 'رؤية_حاسوبية', 'CNN', 'Vision_Transformers', 'ResNet', 'ذكاء_اصطناعي'],
    initialLikes: 265,
    initialComments: []
  },
  {
    id: '5g-nr-radio-architecture',
    slug: '5g-nr-radio-architecture',
    title: 'كيف تعمل شبكات 5G تقنيًا؟ شرح 5G NR وOFDM وMIMO وFronthaul',
    titleEn: '5G Technical Deep Dive: 5G NR, OFDM, Massive MIMO, and Open RAN Fronthaul',
    seoTitle: 'كيف تعمل شبكات 5G تقنيًا؟ شرح 5G NR وOFDM وMIMO وFronthaul',
    metaDescription: 'شرح هندسي معمق لشبكات 5G: معمارية 5G NR، توليد الإشارات وتشكيل الحزم Beamforming، طبقة الراديو وFronthaul، وتحديات الترددات العالية mmWave.',
    canonical: 'https://techno-enjaz.com/articles/5g-nr-radio-architecture',
    category: 'اتصالات وشبكات',
    categoryEn: 'Networks & Telecom',
    categoryColor: '#06b6d4',
    image: '/articles/5g-nr-radio-architecture.png',
    publishDate: '21 سبتمبر 2026',
    publishDateEn: 'Sep 21, 2026',
    readTime: '16 دقيقة قراءة',
    readTimeEn: '16 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم هندسة الاتصالات والترددات اللاسلكية',
      roleEn: 'Telecommunications & RF Engineering Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'تحليل هندسي تقني شامل لكيفية عمل 5G NR: تباعد الحوامل الفرعية في OFDM، مصفوفات الهوائيات Massive MIMO، تشكيل الحزم Beamforming، وواجهات Fronthaul في O-RAN.',
    excerptEn: 'A technical breakdown of 5G New Radio: flexible numerology, OFDM waveforms, 3D beamforming, Massive MIMO channel state estimation, and Open RAN split 7.2x fronthaul.',
    rawMarkdown: fiveGNrMarkdown,
    content: [
      'تعتمد شبكات 5G New Radio (NR) على معمارية راديو فيزيائية متطورة تتجاوز قيود الأجيال السابقة عبر مرونة تباعد الترددات (Numerology) ونطاقات FR1 وFR2.',
      'يشرح المقال بالتفصيل آليات تشكيل الحزم الهوائية Beamforming ومصفوفات Massive MIMO التي تركز الطاقة الراديوية بدقة نحو المستخدمين، ومعالجة التلاشي اللاسلكي.',
      'يقدم الدليل نظرة معمارية على تقسيم المحطات اللاسلكية (O-RAN) وتقسيم الوظائف بين RU وDU وCU وتطبيقات شبكات النقل Fronthaul ذات النطاق العريض.'
    ],
    contentEn: [
      '5G New Radio (NR) re-engineers the physical wireless interface with flexible OFDM numerologies and scalable subcarrier spacing spanning sub-6GHz and mmWave bands.',
      'In-depth study of Massive MIMO spatial multiplexing, digital beamforming, and Open RAN 7.2x functional split fronthaul synchronization.'
    ],
    tags: ['شبكات_5G', '5G_NR', 'اتصالات', 'MIMO', 'Beamforming', 'OFDM', 'Open_RAN'],
    initialLikes: 195,
    initialComments: []
  },
  {
    id: 'smart-ai-ride-pooling',
    slug: 'smart-ai-ride-pooling',
    title: 'كيف تعمل مشاركة الرحلات الذكية بالذكاء الاصطناعي؟ من المطابقة إلى تقليل الازدحام',
    titleEn: 'Smart AI Ride-Pooling: Algorithms, Dynamic Routing, and Urban Congestion Reduction',
    seoTitle: 'كيف تعمل مشاركة الرحلات الذكية بالذكاء الاصطناعي؟ من المطابقة إلى تقليل الازدحام',
    metaDescription: 'تحليل تقني شامل لنظم مشاركة الرحلات الذكية: خوارزميات المطابقة والتسعير الديناميكي وتوجيه المركبات لحل معضلة الازدحام المروري في المدن الذكية.',
    canonical: 'https://techno-enjaz.com/articles/smart-ai-ride-pooling',
    category: 'أنظمة ذكية ونقل',
    categoryEn: 'Smart Mobility & AI',
    categoryColor: '#3b82f6',
    image: '/articles/smart-ai-ride-pooling.png',
    publishDate: '21 سبتمبر 2026',
    publishDateEn: 'Sep 21, 2026',
    readTime: '22 دقيقة قراءة',
    readTimeEn: '22 min read',
    author: {
      id: 'techno-rnd',
      name: 'فريق تكنو إنجاز الهندسي',
      nameEn: 'Techno Enjaz Engineering Team',
      role: 'قسم الأنظمة الذكية وهندسة النقل الحضري',
      roleEn: 'Smart Systems & Urban Mobility Dept',
      avatar: '/abdulghani.jpg'
    },
    excerpt: 'كيف تحل خوارزميات الذكاء الاصطناعي معضلة مشاركة الرحلات؟ دراسة شاملة لمطابقة الركاب، إعادة توجيه المسارات اللحظية، وتخفيف الانبعاثات والازدحام في المدن الذكية.',
    excerptEn: 'Algorithmic deep dive into on-demand shared ride-pooling: combinatorial request matching, dynamic vehicle routing (DARP), and balancing passenger detour times.',
    rawMarkdown: smartRidePoolingMarkdown,
    content: [
      'تختلف مشاركة الرحلات التشاركية الذكية (Ride-Pooling) عن مجرد طلب سيارة أجرة (Ride-Hailing)، حيث تهدف لدمج عدة ركاب ذوي مسارات متقاربة في مركبة واحدة.',
      'يتطلب النظام خوارزميات عالية التعقيد لحل مسألة توجيه المركبات متعددة المسارات (DARP) في أجزاء من الثانية مع الحفاظ على زمن انحراف ومسافة انتظار مقبولة.',
      'يناقش المقال محاكاة المرور عبر منصات مثل SUMO، واستراتيجيات موازنة الأسطول والتسعير الديناميكي وتأثيرها الفعلي على تقليل الاختناقات المرورية في المدن.'
    ],
    contentEn: [
      'Smart dynamic ride-pooling combines multiple passenger travel requests into shared vehicle routes to optimize fleet capacity and mitigate city congestion.',
      'Covers computational formulations for Dial-a-Ride problems (DARP), real-time spatio-temporal batching, SUMO simulations, and fleet rebalancing.'
    ],
    tags: ['أنظمة_ذكية', 'نقل_ذكي', 'ذكاء_اصطناعي', 'مشاركة_الرحلات', 'توجيه_المسارات', 'مدن_ذكية'],
    initialLikes: 245,
    initialComments: []
  }
];

export const blogCategories = [
  { id: 'all', name: 'الكل', nameEn: 'All' },
  { id: 'ai', name: 'ذكاء اصطناعي', nameEn: 'Artificial Intelligence' },
  { id: 'vision', name: 'رؤية حاسوبية', nameEn: 'Computer Vision' },
  { id: 'iot', name: 'إنترنت الأشياء', nameEn: 'Internet of Things' },
  { id: 'networks', name: 'اتصالات وشبكات', nameEn: 'Networks & Telecom' },
  { id: 'embedded', name: 'أنظمة مدمجة', nameEn: 'Embedded Systems' },
  { id: 'mobility', name: 'أنظمة ذكية ونقل', nameEn: 'Smart Mobility & AI' },
  { id: 'transformation', name: 'التحول الرقمي', nameEn: 'Digital Transformation' },
  { id: 'recommender', name: 'أنظمة التوصية', nameEn: 'Recommender Systems' },
  { id: 'architecture', name: 'معمارية النظم', nameEn: 'Systems Architecture' },
  { id: 'nlp', name: 'معالجة اللغات الطبيعية', nameEn: 'NLP & LLMs' }
];

