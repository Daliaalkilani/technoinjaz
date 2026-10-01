// Techno Enjaz - Projects & Portfolio Data (Single Source of Truth)

export type ProjectCategory = 'all' | 'vision' | 'ai' | 'systems' | 'web' | 'mobile';

export interface ProjectItem {
  id: string;
  slug: string;
  folderName: string;
  title: string;
  excerpt: string;
  category: 'vision' | 'ai' | 'systems' | 'web' | 'mobile';
  categoryNameAr: string;
  categoryNameEn: string;
  seoTitle: string;
  metaDesc: string;
  h1?: string;
  altText: string;
  image: string;
  tags: string[];
  roleQualifier?: string;
  pdfUrl?: string;
  presentationUrl?: string;
  bookCover?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    "id": "virtual-board-hand-tracking",
    "slug": "virtual-board-hand-tracking",
    "folderName": "اللوح الافتراضي",
    "title": "اللوح الافتراضي التفاعلي بتتبع حركة اليد",
    "excerpt": "لوح تفاعلي يتيح الرسم والكتابة والمسح واختيار الألوان في الهواء عبر تتبع إيماءات اليد أمام الكاميرا باستخدام MediaPipe وOpenCV.",
    "category": "vision",
    "categoryNameAr": "رؤية حاسوبية وذكاء اصطناعي",
    "categoryNameEn": "Computer Vision & AI",
    "seoTitle": "اللوح الافتراضي بتتبع حركة اليد | نموذج أولي تفاعلي",
    "metaDesc": "تطوير لوح افتراضي تفاعلي يعتمد على تتبع حركة اليد، مع وظائف الرسم واختيار الألوان والمسح باستخدام MediaPipe وOpenCV.",
    "altText": "تجربة الرسم على اللوح الافتراضي باستخدام حركة اليد",
    "image": "/images/projects/virtual-board-hand-tracking.png",
    "tags": [
      "رؤية حاسوبية",
      "MediaPipe",
      "تتبع اليد",
      "واجهات تفاعلية"
    ]
  },
  {
    "id": "interactive-children-ai-learning-system",
    "slug": "interactive-children-ai-learning-system",
    "folderName": "تصميم نظام تعليمي تفاعلي للأطفال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "title": "نظام تعليمي تفاعلي للأطفال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "excerpt": "نظام تفاعلي ذكي لتعليم الأطفال يتعرف على الكائنات والألوان والأرقام صوتياً وبصرياً بالاعتماد على خوارزميات YOLO والرؤية الحاسوبية.",
    "category": "ai",
    "categoryNameAr": "أنظمة تعليمية وذكاء اصطناعي",
    "categoryNameEn": "Educational AI & Vision",
    "seoTitle": "نظام تعليمي تفاعلي للأطفال بالرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "نظام تفاعلي ذكي لتعليم الأطفال يتعرف على الحيوانات والألوان والأرقام باستخدام خوارزميات YOLO والرؤية الحاسوبية.",
    "altText": "واجهة نظام تعليمي تفاعلي للأطفال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "image": "/images/projects/interactive-children-ai-learning-system.png",
    "tags": [
      "أنظمة تعليمية وذكاء اصطناعي",
      "YOLO",
      "رؤية حاسوبية",
      "تعليم تفاعلي"
    ]
  },
  {
    "id": "remote-controlled-ground-robot",
    "slug": "remote-controlled-ground-robot",
    "folderName": "تصميم وتنفيذ روبوت لتنفيذ مهام خاصة",
    "title": "نموذج روبوت أرضي متعدد الاتصالات مع تحكم عن بُعد ورؤية حاسوبية",
    "excerpt": "روبوت أرضي استكشافي يدمج أنظمة التحكم المضمنة والاتصال اللاسلكي، مع بث فيديو مباشر وتحليل مسار الحركة عبر الكاميرا.",
    "category": "systems",
    "categoryNameAr": "روبوتات وميكاترونيكس",
    "categoryNameEn": "Robotics & Mechatronics",
    "seoTitle": "نموذج روبوت أرضي للتحكم عن بُعد والرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "مشروع روبوت أرضي يوضح تكامل التحكم الإلكتروني والاتصالات اللاسلكية ومعالجة الصور ضمن منصة روبوتية متقدمة.",
    "altText": "نموذج روبوت أرضي أولي يتم التحكم به عن بعد",
    "image": "/images/projects/remote-controlled-ground-robot.png",
    "tags": [
      "روبوتات وميكاترونيكس",
      "أنظمة مدمجة",
      "تحكم لاسلكي",
      "معالجة صور"
    ]
  },
  {
    "id": "robotic-hand-gesture-control",
    "slug": "robotic-hand-gesture-control",
    "folderName": "تصميم وتنفيذ كف روبوتية تحاكي حركة اليد البشرية باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "title": "كف روبوتية للتحكم بالحركة عبر الرؤية الحاسوبية وتتبع اليد",
    "excerpt": "كف روبوتية تحاكي حركة اليد البشرية لحظياً بالاعتماد على الرؤية الحاسوبية وتتبع المفاصل والتحكم بمحركات السيرفو بدقة.",
    "category": "systems",
    "categoryNameAr": "روبوتات ورؤية حاسوبية",
    "categoryNameEn": "Robotics & Vision",
    "seoTitle": "كف روبوتية للتحكم بالإيماءات والرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "نموذج كف روبوتية يدمج تتبع حركة اليد مع الأنظمة المضمنة لتحويل الإيماءات إلى أوامر تحكم لمحركات السيرفو بدقة وسلاسة.",
    "altText": "نموذج كف روبوتية يتم التحكم بها عبر تتبع حركة اليد.",
    "image": "/images/projects/robotic-hand-gesture-control.png",
    "tags": [
      "روبوتات ورؤية حاسوبية",
      "تتبع اليد",
      "سيرفو",
      "ميكاترونيكس"
    ]
  },
  {
    "id": "syrian-tourism-app",
    "slug": "syrian-tourism-app",
    "folderName": "تطبيق سياحي ذكي لتعزيز السياحة في سوريا",
    "title": "تطبيق سياحي ذكي لتعزيز السياحة في سوريا",
    "excerpt": "منصة سياحية متكاملة تضم تطبيق Flutter ولوحة تحكم Laravel لاستكشاف الوجهات وحجز الفنادق وشراء المنتجات التراثية.",
    "category": "mobile",
    "categoryNameAr": "تطبيقات موبايل وسياحة ذكية",
    "categoryNameEn": "Mobile & Smart Tourism",
    "seoTitle": "تطوير تطبيق سياحي رقمي باستخدام Flutter وLaravel | تكنو إنجاز",
    "metaDesc": "منصة سياحية رقمية تجمع الوجهات والفنادق والحجوزات والمنتجات الحرفية والمحتوى السياحي ضمن تطبيق Flutter مع لوحة إدارة سحابية.",
    "altText": "تطبيق سياحي ذكي لتعزيز السياحة في سوريا — منصة رقمية متكاملة",
    "image": "/images/projects/syrian-tourism-app.png",
    "tags": [
      "تطبيقات موبايل",
      "Flutter",
      "Laravel",
      "سياحة ذكية"
    ]
  },
  {
    "id": "employee-presence-tracking",
    "slug": "employee-presence-tracking",
    "folderName": "تطوير نظام ذكي لمراقبة دوام العمال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "title": "نظام ذكي لمراقبة الحضور داخل مناطق العمل باستخدام الرؤية الحاسوبية",
    "excerpt": "نظام ذكي لمراقبة الحضور وإدارة بيئات العمل عبر كشف وتتبع حركة الأفراد واحتساب أوقات التواجد باستخدام YOLOv8 وDeepSORT.",
    "category": "vision",
    "categoryNameAr": "رؤية حاسوبية وأتمتة",
    "categoryNameEn": "Computer Vision & Automation",
    "seoTitle": "تتبع الحضور داخل مناطق العمل باستخدام YOLOv8 وDeepSORT | تكنو إنجاز",
    "metaDesc": "نظام يعتمد على YOLOv8 وDeepSORT في كشف الأشخاص وتتبعهم داخل مناطق عمل محددة واحتساب زمن التواجد وتصدير التقارير.",
    "altText": "تتبع الأشخاص داخل مناطق عمل محددة باستخدام الرؤية الحاسوبية",
    "image": "/images/projects/employee-presence-tracking.png",
    "tags": [
      "رؤية حاسوبية",
      "YOLOv8",
      "DeepSORT",
      "أتمتة الحضور"
    ]
  },
  {
    "id": "exam-computer-vision-monitoring",
    "slug": "exam-computer-vision-monitoring",
    "folderName": "تطوير نظام لكشف المخالفات في قاعات الامتحانات باستخدام تقنيات الرؤية الحاسوبية",
    "title": "تطوير نظام لكشف المخالفات في قاعات الامتحانات باستخدام تقنيات الرؤية الحاسوبية",
    "excerpt": "منظومة مراقبة امتحانية ذكية ترصد المؤشرات السلوكية غير المعتادة داخل القاعات بالرؤية الحاسوبية وتنبيه المراقبين فورياً.",
    "category": "vision",
    "categoryNameAr": "رؤية حاسوبية ومراقبة",
    "categoryNameEn": "Computer Vision & Monitoring",
    "seoTitle": "تطوير نظام لكشف المخالفات في قاعات الامتحانات باستخدام تقنيات الرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "نظام رؤية حاسوبية ذكي لتحليل المؤشرات السلوكية داخل القاعات الامتحانية وكشف المخالفات فورياً.",
    "altText": "مخطط خوارزمية نظام تحليل السلوك باستخدام الرؤية الحاسوبية.",
    "image": "/images/projects/exam-computer-vision-monitoring.png",
    "tags": [
      "رؤية حاسوبية ومراقبة",
      "كشف مخالفات",
      "تحليل سلوكي"
    ]
  },
  {
    "id": "student-university-guide-app",
    "slug": "student-university-guide-app",
    "folderName": "دليل الطالب في الجامعة الوطنية الخاصة – كلية الهندسة",
    "title": "تطوير دليل الطالب الرقمي في الجامعة الوطنية الخاصة – كلية الهندسة",
    "excerpt": "دليل جامعي رقمي متكامل بمحرك بحث ومساعد افتراضي تفاعلي، مدعوم بلوحة إدارة سحابية لتسهيل وصول الطلاب للخدمات الأكاديمية.",
    "category": "mobile",
    "categoryNameAr": "تطبيقات موبايل وويب",
    "categoryNameEn": "Mobile & Web Applications",
    "seoTitle": "تطوير دليل طالب جامعي باستخدام Flutter وLaravel | تكنو إنجاز",
    "metaDesc": "دليل جامعي رقمي متكامل بمحرك بحث ومساعد افتراضي، مدعوم بلوحة إدارة سحابية مبنية على Laravel وFlutter.",
    "altText": "الواجهة الرئيسية لتطبيق دليل الطالب الجامعي",
    "image": "/images/projects/student-university-guide-app.png",
    "tags": [
      "تطبيقات موبايل",
      "Flutter",
      "Laravel",
      "دليل جامعي"
    ]
  },
  {
    "id": "ultrasonic-water-level-monitoring-project",
    "slug": "ultrasonic-water-level-monitoring-project",
    "folderName": "قياس مستوى الماء داخل خزان باستخدام مستشعر الأمواج فوق الصوتية",
    "title": "نظام لقياس مستوى الماء داخل الخزان باستخدام مستشعر فوق صوتي",
    "excerpt": "نظام إنترنت أشياء يقيس منسوب المياه بدقة عبر مستشعرات فوق صوتية، مع شاشة بيان وإرسال القراءات لاسلكياً لتطبيق الهاتف.",
    "category": "systems",
    "categoryNameAr": "أنظمة مدمجة وإنترنت الأشياء",
    "categoryNameEn": "Embedded Systems & IoT",
    "seoTitle": "نظام قياس مستوى الماء بحساس فوق صوتي | تكنو إنجاز",
    "metaDesc": "نظام إنترنت أشياء لقياس نسبة مستوى الماء في الخزانات باستخدام HC-SR04 وArduino مع شاشة LCD وتطبيق مراقبة عن بعد.",
    "altText": "نموذج قياس مستوى الماء باستخدام Arduino Nano ومستشعر فوق صوتي وشاشة LCD",
    "image": "/images/projects/ultrasonic-water-level-monitoring-project.png",
    "tags": [
      "أنظمة مدمجة",
      "إنترنت الأشياء",
      "Arduino",
      "حساسات"
    ]
  },
  {
    "id": "news-fact-checking-platform",
    "slug": "news-fact-checking-platform",
    "folderName": "منصة الأخبار الرسمية لمكافحة الأخبار المزيفة في سوريا بعد التحرير",
    "title": "منصة الأخبار الرسمية لمكافحة الأخبار المزيفة",
    "excerpt": "منصة رقمية لإدارة وتدقيق المحتوى الإخباري ومكافحة الشائعات عبر مسار تحريري منظم ولوحات تحكم سحابية متعددة الصلاحيات.",
    "category": "web",
    "categoryNameAr": "منصات ويب وتطبيقات سحابية",
    "categoryNameEn": "Web Platforms & Cloud",
    "seoTitle": "تطوير منصة أخبار وبلاغات للتحقق من المحتوى | تكنو إنجاز",
    "metaDesc": "منصة رقمية لإدارة الأخبار والبلاغات وسير المراجعة التحريرية، مع لوحات تحكم متعددة الأدوار وبنية Laravel لإدارة المحتوى.",
    "altText": "واجهة منصة إدارة الأخبار والبلاغات",
    "image": "/images/projects/news-fact-checking-platform.png",
    "tags": [
      "منصات ويب",
      "Laravel",
      "تدقيق الأخبار",
      "إدارة المحتوى"
    ]
  },
  {
    "id": "face-recognition-access-control-project",
    "slug": "face-recognition-access-control-project",
    "folderName": "نظام أمني ذكي للتحكم في الدخول إلى خزينة بنك باستخدام تقنية التعرف",
    "title": "نظام أمني ذكي للتحكم في الدخول باستخدام التعرف على الوجه",
    "excerpt": "نظام تحكم بيومتري في الدخول للمناطق الحساسة يعتمد على التعرف الفوري على الوجوه مع سجل رقمي وتنبيهات صوتية فورية.",
    "category": "vision",
    "categoryNameAr": "أمن سيبراني ورؤية حاسوبية",
    "categoryNameEn": "Security & Biometrics",
    "seoTitle": "نظام تحكم في الدخول بالتعرف على الوجه | مشروع بدعم تكنو إنجاز",
    "metaDesc": "منظومة تحكم بيومترية في الدخول تعتمد على خوارزميات OpenCV والتعرف على الوجوه وتسجيل الحالات والتنبيه الصوتي التلقائي.",
    "altText": "نظام أمني ذكي للتحكم في الدخول بالتعرف على الوجه",
    "image": "/images/projects/face-recognition-access-control-project.png",
    "tags": [
      "أمن بيومتري",
      "رؤية حاسوبية",
      "OpenCV",
      "تحكم بالدخول"
    ]
  },
  {
    "id": "electronic-voting-system-laravel",
    "slug": "electronic-voting-system-laravel",
    "folderName": "نظام التصويت الالكتروني",
    "title": "نظام التصويت الإلكتروني — تطوير منصة ويب لإدارة عملية التصويت الرقمية",
    "excerpt": "منظومة تصويت رقمية متكاملة تضمن نزاهة وشفافية العملية الانتخابية من تسجيل الناخبين واعتماد المرشحين حتى فرز النتائج آلياً.",
    "category": "web",
    "categoryNameAr": "منصات ويب وتطبيقات سحابية",
    "categoryNameEn": "Web & Enterprise Systems",
    "seoTitle": "نظام التصويت الإلكتروني — تطوير منصة ويب لإدارة عملية التصويت الرقمية | تكنو إنجاز",
    "metaDesc": "نظام تصويت إلكتروني آمن يعتمد على Laravel لإدارة المستخدمين والمرشحين وتدقيق الهويات وفرز الأصوات بدقة وشفافية.",
    "altText": "نظام التصويت الإلكتروني — منصة ويب متطورة لإدارة الانتخابات الرقمية",
    "image": "/images/projects/electronic-voting-system-laravel.png",
    "tags": [
      "منصات ويب",
      "Laravel",
      "تصويت رقمي",
      "أنظمة سحابية"
    ]
  },
  {
    "id": "weapon-detection-yolo-ai",
    "slug": "weapon-detection-yolo-ai",
    "folderName": "نظام الكشف عن الأسلحة باستخدام تقنيات الذكاء الاصطناعي",
    "title": "نظام الكشف عن الأسلحة باستخدام تقنيات الذكاء الاصطناعي",
    "excerpt": "نظام كشف أمني فوري للأسلحة والتهديدات عبر تحليل بث الكاميرات المباشر باستخدام شبكات YOLO العميقة وخوارزميات الرؤية الحاسوبية.",
    "category": "ai",
    "categoryNameAr": "ذكاء اصطناعي ورؤية حاسوبية",
    "categoryNameEn": "AI & Computer Vision",
    "seoTitle": "نظام كشف الأسلحة باستخدام الذكاء الاصطناعي وYOLO | تكنو إنجاز",
    "metaDesc": "نظام أمني يعتمد على الذكاء الاصطناعي وشبكات YOLO في تحليل بث الكاميرات وكشف الأسلحة فورياً لحماية المنشآت.",
    "altText": "نظام الكشف عن الأسلحة بالذكاء الاصطناعي",
    "image": "/images/projects/weapon-detection-yolo-ai.png",
    "tags": [
      "ذكاء اصطناعي",
      "YOLO",
      "رؤية حاسوبية",
      "أمن المنشآت"
    ]
  },
  {
    "id": "ai-children-learning-system",
    "slug": "ai-children-learning-system",
    "folderName": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي",
    "title": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي",
    "excerpt": "نظام تعليمي تفاعلي يعتمد على معالجة الصور لتمكين الأطفال من تصنيف الكائنات واستكشاف الألوان والمجسمات بصوت وصورة واضحة.",
    "category": "ai",
    "categoryNameAr": "ذكاء اصطناعي وتعليم تفاعلي",
    "categoryNameEn": "AI & Educational Systems",
    "seoTitle": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي والتعرف على الأشياء | تكنو إنجاز",
    "metaDesc": "نظام تعليمي تفاعلي يستخدم الذكاء الاصطناعي ومعالجة الصور لتعليم الأطفال وتصنيف الكائنات والألوان تفاعلياً.",
    "altText": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي",
    "image": "/images/projects/ai-children-learning-system.png",
    "tags": [
      "ذكاء اصطناعي",
      "معالجة صور",
      "تعليم تفاعلي",
      "تطبيقات ذكية"
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): ProjectItem[] {
  const current = getProjectBySlug(currentSlug);
  if (!current) return PROJECTS_DATA.slice(0, limit);
  
  const sameCategory = PROJECTS_DATA.filter((p) => p.slug !== currentSlug && p.category === current.category);
  const others = PROJECTS_DATA.filter((p) => p.slug !== currentSlug && p.category !== current.category);
  
  return [...sameCategory, ...others].slice(0, limit);
}
