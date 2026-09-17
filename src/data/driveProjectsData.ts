export type ProjectCategory = 'all' | 'ai' | 'vision' | 'systems' | 'web' | 'mobile';

export interface DriveProject {
  id: string;
  title: string;
  titleEn: string;
  category: 'ai' | 'vision' | 'systems' | 'web' | 'mobile';
  description: string;
  descriptionEn: string;
  pdfId?: string;
  docxId?: string;
  pptxId?: string;
  folderId?: string;
  tags: string[];
}

export const DRIVE_PROJECTS: DriveProject[] = [
  {
    "id": "wanted-persons-recognition",
    "title": "التعرف على الأشخاص المطلوبين باستخدام تقنيات التعلم العميق",
    "titleEn": "Wanted Persons Recognition Using Deep Learning",
    "category": "vision",
    "description": "منظومة أمنية متقدمة تعتمد على خوارزميات التعلم العميق والشبكات العصبية الالتفافية لتحديد ومطابقة وجوه المطلوبين فورياً عبر كاميرات المراقبة الحية بدقة عالية واستجابة لحظية.",
    "descriptionEn": "Advanced surveillance security system leveraging deep convolutional neural networks for real-time biometric identification and verification of wanted individuals via live video streams.",
    "pdfId": "1edEWYRLqtgSVRw0Eq7NmCldb_fxzi5OW",
    "docxId": "1mJkkwOQ0PFAeyu7UVamO5BW4kzI3MfoE",
    "pptxId": "1GkF6h9BidlT4Rk4WZjNtM_-hdzOy7Dm8",
    "tags": [
      "تعلم عميق",
      "رؤية حاسوبية",
      "أمن المراقبة",
      "شبكات عصبية"
    ]
  },
  {
    "id": "breast-cancer-ai",
    "title": "تشخيص مرض سرطان الثدي باستخدام الذكاء الاصطناعي",
    "titleEn": "Breast Cancer Diagnosis Using Artificial Intelligence",
    "category": "ai",
    "description": "نموذج ذكي مساعد للكوادر الطبية يعتمد على خوارزميات تعلم الآلة ومعالجة الصور الإشعاعية لتشخيص الأورام الخبيثة والحميدة بدقة تشخيصية فائقة ومساعدة الكوادر الطبية في الكشف المبكر.",
    "descriptionEn": "Clinical diagnostic AI assistant utilizing advanced machine learning algorithms and medical imaging analytics to classify benign and malignant tumors with high diagnostic confidence.",
    "pdfId": "1VrYznMsLRQ_gwD5UM9jBSiI624H-JkyO",
    "docxId": "1Zkngyqb4vj5T5gfApVMWqDj4nAWbnFC-",
    "pptxId": "1vlqwCOU7f4c40O4BhDniJAHJK5m5_UR3",
    "tags": [
      "ذكاء اصطناعي طبي",
      "تعلم آلة",
      "تشخيص أورام",
      "معالجة صور"
    ]
  },
  {
    "id": "facial-attendance",
    "title": "تطبيق تسجيل الحضور والغياب الذكي من خلال التعرف على الوجه",
    "titleEn": "Smart Student Attendance Tracking via Facial Recognition",
    "category": "vision",
    "description": "نظام متكامل لأتمتة تفقد الحضور في القاعات والمحاضرات عبر خوارزميات التعرف البيومتري على الوجوه مع كشف التلاعب وتوفير الوقت وإصدار تقارير تحليلية لحظية للإدارة.",
    "descriptionEn": "Automated campus attendance recording platform utilizing biometric face recognition with liveness detection to eliminate proxy sign-ins and provide instant analytical logs.",
    "pdfId": "19pKSp0cYDPD_1zqP9cPLpLqrZ25z4Huc",
    "docxId": "1qA2p8S8UoB2BwwVbLcJPKXhErwqqYwBQ",
    "pptxId": "16tDQ0l92wkMWr9u5NBB1LSvjUTNxJSN8",
    "tags": [
      "رؤية حاسوبية",
      "تسجيل حضور",
      "كشف التلاعب",
      "بيومترية"
    ]
  },
  {
    "id": "smart-robotic-arm",
    "title": "ذراع ذكية لفرز وتصنيف المنتجات باستخدام تقنيات معالجة الصورة",
    "titleEn": "Smart Robotic Arm for Industrial Product Sorting via Vision",
    "category": "systems",
    "description": "منظومة صناعية مؤتمتة تجمع بين ذراع ميكانيكية متعددة المحاور وكاميرات رقمية عالية الدقة للتعرف على المنتجات وفرزها وتصنيفها آلياً على خطوط الإنتاج بسرعة وموثوقية.",
    "descriptionEn": "Industrial robotics cell combining multi-axis arm kinematics with high-speed digital machine vision to identify, inspect, and segregate components along conveyor systems.",
    "pdfId": "1CUXwNt3zoE44c_zc0flbUN11DhPMzYfZ",
    "pptxId": "15yk-1MTOtw8435TeihT_ej1pUZptVYlZ",
    "tags": [
      "روبوتات",
      "أتمتة صناعية",
      "معالجة صور",
      "تحكم ميكاترونيكس"
    ]
  },
  {
    "id": "bank-vault-security",
    "title": "نظام أمني ذكي للتحكم في الدخول إلى خزينة بنك",
    "titleEn": "Smart Biometric Access Control for Bank Vault Security",
    "category": "systems",
    "description": "بنية تحتية أمنية متقدمة متعددة المستويات تعتمد على مطابقة الوجه البيومترية والمستشعرات المشفرة لحماية المواقع البنكية الحساسة ومنع الاختراقات وتوثيق المحاولات لحظياً.",
    "descriptionEn": "Multi-layer banking vault security infrastructure integrating facial biometric verification, encrypted hardware interlocks, and automated tamper detection alert protocols.",
    "pdfId": "1t_BEU0HM4LR1iT_fVK52qPILA3nBT_LZ",
    "docxId": "1anZypriAX6upaVHJAMka8Xagt6zboCP0",
    "pptxId": "111DPWXqP1pxK727BZYM7sCkdg_oEof0v",
    "tags": [
      "أمن سيبراني",
      "أنظمة تحكم",
      "أمن بنكي",
      "بصمة وجه"
    ]
  },
  {
    "id": "ai-technical-chatbot",
    "title": "روبوت دردشة تقني ذكي ومساعد صوتي",
    "titleEn": "Intelligent Technical Conversational Chatbot & Voice Assistant",
    "category": "ai",
    "description": "وكيل محادثة ذكي مدرب على تقديم إجابات تقنية دقيقة واستشارات هندسية عبر معالجة اللغات الطبيعية (NLP) ودعم الأوامر الصوتية وتحليل الاستفسارات البرمجية المعقدة.",
    "descriptionEn": "Specialized conversational AI agent trained for precise technical troubleshooting, engineering documentation inquiries, and voice interaction using modern NLP pipelines.",
    "pdfId": "14ohPtWmGQizM39irdd7EvvTH2nBXFv_L",
    "docxId": "1o85lu5ganVvn1Mfr5gnGXRT1ErnM_E96",
    "pptxId": "18Giu9Cc7x1dbtrbPCZpGrYLVZuNMh-50",
    "tags": [
      "ذكاء اصطناعي",
      "معالجة لغات طبيعية",
      "روبوت محادثة",
      "مساعد صوتي"
    ]
  },
  {
    "id": "chemical-fluid-mixing",
    "title": "محطة أتمتة خلط السوائل الكيميائية والمراقبة الصناعية",
    "titleEn": "Automated Industrial Chemical Mixing & Monitoring Station",
    "category": "systems",
    "description": "منظومة صناعية للتحكم الدقيق في نسب خلط السوائل الكيميائية ودرجات الحرارة ومعدلات التدفق عبر مستشعرات متطورة ووحدات تحكم رقمية وبرمجيات SCADA للمراقبة اللحظية.",
    "descriptionEn": "Engineered fluid mixing automation platform featuring industrial sensors, precise flow control actuators, and a SCADA telemetry interface for hazardous materials handling.",
    "pdfId": "1prsxpaD2gPt_nGNBrPNr6YiPP_Mwv_HL",
    "docxId": "1DsK2EFN9skWxbwW5e46M-0niClNJoSJK",
    "tags": [
      "أنظمة تحكم",
      "أتمتة صناعية",
      "SCADA",
      "مستشعرات"
    ]
  },
  {
    "id": "campus-face-id",
    "title": "تطبيق جامعي بيومتري ذكي للتعرف على وجوه الطلاب",
    "titleEn": "Smart University Campus Biometric Student Identification",
    "category": "vision",
    "description": "منظومة برمجية متكاملة لربط الكاميرات بقواعد البيانات المركزية للتعرف الفوري على الهويات وإدارة الدخول الآمن والتفاعل الذكي مع المرافق.",
    "descriptionEn": "Campus identification infrastructure connecting high-resolution optical sensors with central databases to provide instant authorization and student attendance telemetry.",
    "pdfId": "1uaf9OpfyGOLZl5TNU1DZa3XgNSdEUNzt",
    "docxId": "1g3eJk6rECQWsGW8aVkVmASm-JyCsoFkA",
    "tags": [
      "رؤية حاسوبية",
      "هوية بيومترية",
      "قواعد بيانات",
      "أنظمة ذكية"
    ]
  },
  {
    "id": "weapon-detection-ai",
    "title": "نظام الكشف المبكر عن الأسلحة والتهديدات بالذكاء الاصطناعي",
    "titleEn": "AI Weapon & Threat Detection System for Public Safety",
    "category": "vision",
    "description": "خوارزمية ذكية متخصصة في تحليل كاميرات المراقبة الحية للكشف التلقائي عن الأسلحة النارية والبيضاء وإطلاق إنذارات مبكرة لغرف التحكم لتعزيز السلامة العامة.",
    "descriptionEn": "Real-time computer vision security framework monitoring CCTV feeds to detect concealed or brandished weapons, delivering rapid automated alerts to command centers.",
    "pdfId": "1edEWYRLqtgSVRw0Eq7NmCldb_fxzi5OW",
    "folderId": "1GsAvNzIBXdzGaC_JQXAvhet-PZ-HVwGZ",
    "tags": [
      "رؤية حاسوبية",
      "كشف كائنات",
      "أمن وسلامة",
      "تنبيه فوري"
    ]
  },
  {
    "id": "cybershield-security",
    "title": "CyberShield تطبيق مدعوم بالذكاء الاصطناعي لفحص الملفات والروابط",
    "titleEn": "CyberShield - AI-Powered Threat Analysis for Files & URLs",
    "category": "ai",
    "description": "منظومة دفاع سيبراني متقدمة تستخدم نماذج التعلم الآلي والتحليل السلوكي لكشف البرمجيات الخبيثة والروابط الاحتيالية وهجمات التصيد قبل فتحها.",
    "descriptionEn": "Cyber defense application employing heuristic AI models and behavioral sandboxing to identify malware, phishing links, and malicious binaries in real time.",
    "pdfId": "1VrYznMsLRQ_gwD5UM9jBSiI624H-JkyO",
    "folderId": "1_0Vu1ur1fRK-zDW9l6fmUmr_pThI48Mc",
    "tags": [
      "أمن سيبراني",
      "ذكاء اصطناعي",
      "حماية بيانات",
      "كشف تهديدات"
    ]
  },
  {
    "id": "projectforge-platform",
    "title": "منصة ProjectForge الذكية لإدارة وتخطيط المشاريع وبناء الفرق",
    "titleEn": "ProjectForge - Intelligent Collaboration & Workspace Platform",
    "category": "web",
    "description": "بيئة عمل سحابية متكاملة تسهل تشكيل فرق العمل وتوزيع المهام واستكشاف الأفكار الهندسية المبتكرة وتتبع مؤشرات الأداء والتوثيق البرمجي لحظياً.",
    "descriptionEn": "Modern cloud workspace designed to facilitate project lifecycle planning, agile team assembly, milestone tracking, and shared engineering repositories.",
    "pdfId": "19pKSp0cYDPD_1zqP9cPLpLqrZ25z4Huc",
    "folderId": "1GiZkOaMzmw0DrMbXYsjrbiP0IWAyZjIv",
    "tags": [
      "تطبيقات ويب",
      "إدارة مشاريع",
      "منصات سحابية",
      "فرق عمل"
    ]
  },
  {
    "id": "bci-eeg-control",
    "title": "نظام ذكي للتحكم بالأجهزة باستخدام إشارات الدماغ (EEG)",
    "titleEn": "Brain-Computer Interface (BCI) for Smart Device Control",
    "category": "systems",
    "description": "واجهة عصبية برمجية تعالج إشارات النشاط الدماغي عبر تقنيات معالجة الإشارات والذكاء الاصطناعي لتمكين التحكم بالأجهزة دون لمس لمساعدة ذوي الاحتياجات الخاصة.",
    "descriptionEn": "Non-invasive Brain-Computer Interface translating EEG neuro-signals via spectral filtering and deep classifiers into hands-free device control commands.",
    "pdfId": "1t_BEU0HM4LR1iT_fVK52qPILA3nBT_LZ",
    "folderId": "1zsHKfZ_0OnHgpq3mQjNrAC0XqIezMxkA",
    "tags": [
      "واجهة دماغ وحاسوب",
      "إشارات عصبية",
      "اتصالات ونظم",
      "تعلم آلة"
    ]
  },
  {
    "id": "biomimetic-hand",
    "title": "تصميم وتنفيذ ذراع روبوتية تحاكي حركة اليد البشرية بالرؤية الحاسوبية",
    "titleEn": "Biomimetic Robotic Arm Hand-Tracking Control via Computer Vision",
    "category": "systems",
    "description": "نظام ميكاترونيكس متطور يتتبع معالم اليد والأصابع عبر الكاميرا بدون حساسات سلكية وينقل الحركات اللحظية إلى ذراع ميكانيكية روبوتية عالية الدقة والسرعة.",
    "descriptionEn": "Vision-guided robotic manipulator matching human hand articulation and gesture geometry using camera-based landmark detection and micro-servo kinematics.",
    "pdfId": "1CUXwNt3zoE44c_zc0flbUN11DhPMzYfZ",
    "folderId": "1PcXk8FeoGCPrkb-VwMq5VXvQ_z--jU1f",
    "tags": [
      "روبوتات",
      "ميكاترونيكس",
      "تتبع حركة",
      "رؤية حاسوبية"
    ]
  },
  {
    "id": "dental-pathology-ai",
    "title": "استخدام الذكاء الاصطناعي في تشخيص أمراض الفم والأسنان",
    "titleEn": "Dental & Oral Pathology Diagnosis via Deep Learning Vision",
    "category": "ai",
    "description": "نظام طبي يعتمد على الرؤية الحاسوبية والشبكات العصبية لتحليل صور الأسنان والأشعة السينية لكشف التسوس وأمراض اللثة مبكراً ودعم التشخيص السريري.",
    "descriptionEn": "AI diagnostic engine evaluating intraoral imagery and radiographs through fine-tuned neural models to detect dental anomalies and assist dental clinicians.",
    "pdfId": "1VrYznMsLRQ_gwD5UM9jBSiI624H-JkyO",
    "folderId": "1-AvRZ62CH8nAo2u3RDt1GSCDEzQIE3Kd",
    "tags": [
      "ذكاء اصطناعي طبي",
      "طب أسنان",
      "تصوير إشعاعي",
      "تشخيص آلي"
    ]
  },
  {
    "id": "smart-tourism-app",
    "title": "تطبيق سياحي ذكي تفاعلي مع مرشد سياحي افتراضي",
    "titleEn": "Smart Tourism Interactive Application with AI Tour Guide",
    "category": "mobile",
    "description": "تطبيق هاتف ذكي يوفر خرائط تفاعلية وجولات سياحية ذكية ومرشداً سياحياً يعتمد على الذكاء الاصطناعي وتحديد المواقع الجغرافية لتقديم تجربة استكشاف فريدة.",
    "descriptionEn": "Cross-platform mobile guide integrating geolocation-based itinerary planning, cultural monument recognition, and an AI conversational tour companion.",
    "pdfId": "14ohPtWmGQizM39irdd7EvvTH2nBXFv_L",
    "folderId": "1fMc_BwC8jzLs6VUb4v0MKXehsXoVHCfU",
    "tags": [
      "تطبيقات موبايل",
      "سياحة ذكية",
      "خرائط تفاعلية",
      "فلاتر"
    ]
  },
  {
    "id": "focusbac-app",
    "title": "مشروع تطبيق FocusBac للإنتاجية وتنظيم الدراسة",
    "titleEn": "FocusBac - Productivity & Focused Study Management App",
    "category": "mobile",
    "description": "تطبيق محمول مصمم بتقنيات Flutter لمساعدة الطلاب على إدارة الوقت، تنظيم جداول الدراسة، وتطبيق تقنيات التركيز (بومودورو) مع إحصائيات بيانية دقيقة.",
    "descriptionEn": "Productivity application built with Flutter enabling structured study cycles, intelligent task priority sorting, and personal progress analytics.",
    "pdfId": "19pKSp0cYDPD_1zqP9cPLpLqrZ25z4Huc",
    "folderId": "1yxjQ4eePI3SDBTSbgcg8StDjS-Lx7ud2",
    "tags": [
      "تطبيقات موبايل",
      "فلاتر",
      "إنتاجية",
      "تنظيم وقت"
    ]
  },
  {
    "id": "calorie-vision-counter",
    "title": "نظام ذكي لحساب عدد السعرات الحرارية باستخدام الرؤية الحاسوبية",
    "titleEn": "Vision-Based Automatic Calorie & Nutritional Content Estimation",
    "category": "vision",
    "description": "حل برمجي يلتقط صور الوجبات الغذائية، يتعرف على المكونات بدقة، ويقدر الحصص والقيمة الغذائية والسعرات الحرارية لدعم نمط الحياة الصحي.",
    "descriptionEn": "Computer vision calorie recognition application identifying dish elements from phone snapshots to compute nutritional breakdown and intake metrics.",
    "pdfId": "1edEWYRLqtgSVRw0Eq7NmCldb_fxzi5OW",
    "folderId": "1MK6ghtMMgEiEnEyOi_j7cd4nl7KAgcDZ",
    "tags": [
      "رؤية حاسوبية",
      "تغذية ذكية",
      "تعرف على أطعمة",
      "ذكاء اصطناعي"
    ]
  },
  {
    "id": "smart-security-surveillance",
    "title": "نظام مراقبة وحماية أمني ذكي باستخدام تقنيات الذكاء الاصطناعي",
    "titleEn": "Integrated Smart Security Surveillance & Threat Alerting System",
    "category": "systems",
    "description": "منصة أمنية شاملة تربط المستشعرات الذكية وكاميرات المراقبة لتحليل المشهد وتتبع الأجسام الغريبة، كشف التسلل، وتنبيه غرف العمليات على مدار الساعة.",
    "descriptionEn": "AI perimeter surveillance network combining optical sensors, behavioral trigger detection, and instant encrypted notification pipelines for facility protection.",
    "pdfId": "1t_BEU0HM4LR1iT_fVK52qPILA3nBT_LZ",
    "folderId": "10U5XWxGN65uKJz1MQfiF1Wzsv9FvYrVP",
    "tags": [
      "أمن ومراقبة",
      "اتصالات ونظم",
      "حماية محيطية",
      "تنبيهات"
    ]
  },
  {
    "id": "code-review-assistant",
    "title": "تصميم وتطوير مساعد برمجي لتحليل الشيفرات البرمجية وتحسين جودتها",
    "titleEn": "AI Code Intelligence Assistant & Quality Optimization Engine",
    "category": "web",
    "description": "أداة تطوير مدعومة بالذكاء الاصطناعي تفحص الشيفرات البرمجية، تكتشف الثغرات الأمنية واختناقات الأداء، وتقترح تحسينات بنية الكود آلياً.",
    "descriptionEn": "Code intelligence developer assistant providing automated syntax audit, security vulnerability detection, architectural refactoring, and benchmark tips.",
    "pdfId": "14ohPtWmGQizM39irdd7EvvTH2nBXFv_L",
    "folderId": "1N_NmRcYYaClmBF6cfsTJE-ttGsAXF1Ij",
    "tags": [
      "تطبيقات ويب",
      "ذكاء اصطناعي",
      "مساعد كود",
      "فحص أمان"
    ]
  },
  {
    "id": "reconnaissance-robot",
    "title": "الروبوت الحربي والاستكشافي الميداني للمهام الخاصة",
    "titleEn": "Tactical Terrain Exploration & Reconnaissance Robot",
    "category": "systems",
    "description": "منصة روبوتية مجنزرة قادرة على المناورة في البيئات الصعبة وتزويد المشغل ببث فيديو حي ومعطيات المستشعرات الحرارية والبيئية عن بُعد عبر وصلات لاسلكية مشفرة.",
    "descriptionEn": "Rugged tracked reconnaissance robot built for hostile terrain navigation, low-latency visual streaming, and environmental telemetry relay.",
    "pdfId": "1CUXwNt3zoE44c_zc0flbUN11DhPMzYfZ",
    "folderId": "16qyg83GH2UevzbX3yUccmP3GcrFy0Ki7",
    "tags": [
      "روبوتات",
      "أنظمة تحكم",
      "استكشاف ميداني",
      "اتصالات لاسلكية"
    ]
  },
  {
    "id": "interactive-learning-robot",
    "title": "روبوت تفاعلي ذكي لتعليم الأطفال باستخدام الذكاء الاصطناعي والرؤية",
    "titleEn": "Interactive Educational Robot for Children via Vision & AI",
    "category": "ai",
    "description": "منصة روبوتية تفاعلية تتواصل مع الأطفال صوتياً وبصرياً لتقديم أنشطة تعليمية مشوقة وألعاب ذكاء وتتبع مدى استيعاب الطفل وتفاعله.",
    "descriptionEn": "Interactive AI companion robot utilizing vision gesture tracking and natural speech synthesis to deliver adaptive educational tutoring for young learners.",
    "pdfId": "1prsxpaD2gPt_nGNBrPNr6YiPP_Mwv_HL",
    "folderId": "1MEIYC6GluMPrp7QiC4_CVi-c_ws5fHi3",
    "tags": [
      "ذكاء اصطناعي",
      "روبوتات تعليمية",
      "تفاعل إنساني آلي",
      "تعليم ذكي"
    ]
  }
];