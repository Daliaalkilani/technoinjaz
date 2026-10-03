// Techno Enjaz - Projects & Portfolio Data (Single Source of Truth)

export type ProjectCategory = 'all' | 'vision' | 'ai' | 'systems' | 'web' | 'mobile';

export interface ProjectItem {
  id: string;
  slug: string;
  folderName: string;
  title: string;
  /** English title — shown when the visitor flips the site to English. */
  titleEn?: string;
  excerpt: string;
  /** English excerpt — shown in English mode. */
  excerptEn?: string;
  category: 'vision' | 'ai' | 'systems' | 'web' | 'mobile';
  categoryNameAr: string;
  categoryNameEn: string;
  seoTitle: string;
  /** English SEO title — shown in English mode. */
  seoTitleEn?: string;
  metaDesc: string;
  /** English meta description. */
  metaDescEn?: string;
  h1?: string;
  altText: string;
  /** English alt text for the cover image. */
  altTextEn?: string;
  folderNameEn?: string;
  h1En?: string;
  image: string;
  tags: string[];
  /** English tags — shown in English mode. */
  tagsEn?: string[];
  roleQualifier?: string;
  pdfUrl?: string;
  presentationUrl?: string;
  bookCover?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    "id": "virtual-board-hand-tracking",
    "slug": "virtual-board-hand-tracking",
    "titleEn": "Interactive Virtual Board with Hand Motion Tracking",
    "excerptEn": "An interactive board that allows drawing, writing, erasing, and selecting colors in the air by tracking hand gestures in front of the camera using MediaPipe and OpenCV.",
    "folderNameEn": "The Virtual Board",
    "seoTitleEn": "Virtual Board with Hand Motion Tracking | Interactive Prototype",
    "metaDescEn": "Developing an interactive virtual board based on hand motion tracking, with drawing, color selection, and erasing functions using MediaPipe and OpenCV.",
    "altTextEn": "Trying out drawing on the virtual board using hand motion",
    "tagsEn": ["Computer Vision", "MediaPipe", "Hand Tracking", "Interactive Interfaces"],
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
    "titleEn": "Interactive AI Learning System for Children Using Artificial Intelligence and Computer Vision",
    "excerptEn": "An intelligent interactive system for teaching children that recognizes objects, colors, and numbers through audio and visuals, powered by YOLO algorithms and computer vision.",
    "folderNameEn": "Designing an Interactive Learning System for Children Using Artificial Intelligence and Computer Vision",
    "seoTitleEn": "Interactive Learning System for Children with Computer Vision | Techno Enjaz",
    "metaDescEn": "An intelligent interactive system for teaching children that recognizes animals, colors, and numbers using YOLO algorithms and computer vision.",
    "altTextEn": "Interface of an interactive learning system for children using artificial intelligence and computer vision",
    "tagsEn": ["Educational AI Systems", "YOLO", "Computer Vision", "Interactive Learning"],
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
    "titleEn": "Multi-Link Ground Robot Prototype with Remote Control and Computer Vision",
    "excerptEn": "An exploratory ground robot integrating embedded control systems and wireless communication, with live video streaming and motion path analysis via the camera.",
    "folderNameEn": "Design and Implementation of a Robot for Special Tasks",
    "seoTitleEn": "Ground Robot Prototype for Remote Control and Computer Vision | Techno Enjaz",
    "metaDescEn": "A ground robot project demonstrating the integration of electronic control, wireless communications, and image processing within an advanced robotic platform.",
    "altTextEn": "Early ground robot prototype controlled remotely",
    "tagsEn": ["Robotics & Mechatronics", "Embedded Systems", "Wireless Control", "Image Processing"],
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
    "titleEn": "Robotic Hand for Motion Control via Computer Vision and Hand Tracking",
    "excerptEn": "A robotic hand that mimics human hand motion in real time using computer vision, joint tracking, and precise servo motor control.",
    "folderNameEn": "Design and Implementation of a Robotic Hand Mimicking Human Hand Motion Using Artificial Intelligence and Computer Vision",
    "seoTitleEn": "Robotic Hand for Gesture Control and Computer Vision | Techno Enjaz",
    "metaDescEn": "A robotic hand prototype combining hand motion tracking with embedded systems to convert gestures into precise, smooth servo motor control commands.",
    "altTextEn": "Robotic hand prototype controlled through hand motion tracking.",
    "tagsEn": ["Robotics & Computer Vision", "Hand Tracking", "Servo Motors", "Mechatronics"],
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
    "titleEn": "Smart Tourism Application for Promoting Tourism in Syria",
    "excerptEn": "A complete tourism platform that includes a Flutter application and a Laravel control dashboard for exploring destinations, booking hotels, and buying heritage products.",
    "folderNameEn": "Smart Tourism Application for Promoting Tourism in Syria",
    "seoTitleEn": "Developing a Digital Tourism Application Using Flutter and Laravel | Techno Enjaz",
    "metaDescEn": "A digital tourism platform bringing together destinations, hotels, bookings, artisan products, and tourism content within a Flutter application with a cloud administration dashboard.",
    "altTextEn": "Smart tourism application for promoting tourism in Syria — a complete digital platform",
    "tagsEn": ["Mobile Applications", "Flutter", "Laravel", "Smart Tourism"],
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
    "titleEn": "Smart Attendance Monitoring System for Work Areas Using Computer Vision",
    "excerptEn": "A smart system for attendance monitoring and work-environment management that detects and tracks people's movements and computes presence times using YOLOv8 and DeepSORT.",
    "folderNameEn": "Developing a Smart System for Monitoring Employee Attendance Using Artificial Intelligence and Computer Vision",
    "seoTitleEn": "Attendance Tracking in Work Areas Using YOLOv8 and DeepSORT | Techno Enjaz",
    "metaDescEn": "A system based on YOLOv8 and DeepSORT that detects and tracks people within defined work areas, computes presence time, and exports reports.",
    "altTextEn": "Tracking people within defined work areas using computer vision",
    "tagsEn": ["Computer Vision", "YOLOv8", "DeepSORT", "Attendance Automation"],
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
    "titleEn": "Developing a System for Detecting Misconduct in Exam Halls Using Computer Vision Technologies",
    "excerptEn": "An intelligent exam monitoring system that detects unusual behavioral indicators inside exam halls using computer vision and alerts proctors immediately.",
    "folderNameEn": "Developing a System for Detecting Misconduct in Exam Halls Using Computer Vision Technologies",
    "seoTitleEn": "Developing a System for Detecting Misconduct in Exam Halls Using Computer Vision | Techno Enjaz",
    "metaDescEn": "An intelligent computer vision system that analyzes behavioral indicators inside exam halls and detects misconduct in real time.",
    "altTextEn": "Algorithm diagram of a behavior analysis system using computer vision.",
    "tagsEn": ["Computer Vision & Monitoring", "Misconduct Detection", "Behavior Analysis"],
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
    "titleEn": "Developing the Digital Student Guide at Al-Wataniya Private University – Faculty of Engineering",
    "excerptEn": "A complete digital university guide with a search engine and an interactive virtual assistant, backed by a cloud administration dashboard to make it easier for students to access academic services.",
    "folderNameEn": "Student Guide at Al-Wataniya Private University – Faculty of Engineering",
    "seoTitleEn": "Developing a University Student Guide Using Flutter and Laravel | Techno Enjaz",
    "metaDescEn": "A complete digital university guide with a search engine and a virtual assistant, backed by a cloud administration dashboard built on Laravel and Flutter.",
    "altTextEn": "The home screen of the university student guide application",
    "tagsEn": ["Mobile Applications", "Flutter", "Laravel", "University Guide"],
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
    "titleEn": "System for Measuring the Water Level Inside a Tank Using an Ultrasonic Sensor",
    "excerptEn": "An IoT system that measures the water level precisely using ultrasonic sensors, with a display screen and wireless transmission of the readings to a mobile application.",
    "folderNameEn": "Measuring the Water Level Inside a Tank Using an Ultrasonic Sensor",
    "seoTitleEn": "Water Level Measurement System with an Ultrasonic Sensor | Techno Enjaz",
    "metaDescEn": "An IoT system for measuring the water level percentage in tanks using HC-SR04 and Arduino with an LCD screen and a remote monitoring application.",
    "altTextEn": "Water level measurement prototype using an Arduino Nano, an ultrasonic sensor, and an LCD screen",
    "tagsEn": ["Embedded Systems", "Internet of Things", "Arduino", "Sensors"],
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
    "titleEn": "Official News Platform for Combating Fake News",
    "excerptEn": "A digital platform for managing and verifying news content and combating rumors through an organized editorial pipeline and cloud dashboards with multiple permission levels.",
    "folderNameEn": "The Official News Platform for Combating Fake News in Syria After Liberation",
    "seoTitleEn": "Developing a News and Reports Platform for Content Verification | Techno Enjaz",
    "metaDescEn": "A digital platform for managing news, reports, and the editorial review workflow, with multi-role dashboards and a Laravel architecture for content management.",
    "altTextEn": "Interface of the news and reports management platform",
    "tagsEn": ["Web Platforms", "Laravel", "News Verification", "Content Management"],
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
    "titleEn": "Smart Access Control Security System Using Face Recognition",
    "excerptEn": "A biometric access control system for sensitive areas based on real-time face recognition, with digital logging and instant audible alerts.",
    "folderNameEn": "Smart Access Control Security System for a Bank Vault Using Recognition Technology",
    "seoTitleEn": "Face Recognition Access Control System | Project Supported by Techno Enjaz",
    "metaDescEn": "A biometric access control system based on OpenCV and face recognition algorithms, with case logging and automatic audible alerts.",
    "altTextEn": "Smart access control security system using face recognition",
    "tagsEn": ["Biometric Security", "Computer Vision", "OpenCV", "Access Control"],
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
    "titleEn": "Electronic Voting System — Developing a Web Platform for Digital Voting Management",
    "excerptEn": "An end-to-end digital voting system ensuring the integrity and transparency of the electoral process, from voter registration and candidate approval to automated vote counting.",
    "folderNameEn": "Electronic Voting System",
    "seoTitleEn": "Electronic Voting System — Web Platform Development for Digital Voting Management | Techno Enjaz",
    "metaDescEn": "A secure electronic voting system built on Laravel for managing users and candidates, verifying identities, and counting votes accurately and transparently.",
    "altTextEn": "Electronic voting system — an advanced web platform for managing digital elections",
    "tagsEn": ["Web Platforms", "Laravel", "Digital Voting", "Cloud Systems"],
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
    "titleEn": "Weapon Detection System Using Artificial Intelligence Technologies",
    "excerptEn": "A real-time security detection system for weapons and threats that analyzes live camera feeds using deep YOLO networks and computer vision algorithms.",
    "folderNameEn": "Weapon Detection System Using Artificial Intelligence Technologies",
    "seoTitleEn": "Weapon Detection System Using Artificial Intelligence and YOLO | Techno Enjaz",
    "metaDescEn": "A security system based on artificial intelligence and YOLO networks to analyze camera feeds and detect weapons in real time to protect facilities.",
    "altTextEn": "AI-based weapon detection system",
    "tagsEn": ["Artificial Intelligence", "YOLO", "Computer Vision", "Facility Security"],
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
    "titleEn": "AI-Powered Children's Learning System",
    "excerptEn": "An interactive educational system based on image processing that enables children to classify objects and explore colors and shapes with clear sound and visuals.",
    "folderNameEn": "AI-Powered Children's Learning System",
    "seoTitleEn": "AI-Powered Children's Learning System with Object Recognition | Techno Enjaz",
    "metaDescEn": "An interactive educational system using artificial intelligence and image processing to teach children, classifying objects and colors interactively.",
    "altTextEn": "AI-powered children's learning system",
    "tagsEn": ["Artificial Intelligence", "Image Processing", "Interactive Learning", "Smart Applications"],
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
