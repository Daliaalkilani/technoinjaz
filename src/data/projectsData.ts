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
    "excerpt": "مشروع تطوير **لوح افتراضي تفاعلي** يتيح الكتابة والرسم والمسح واختيار الألوان باستخدام حركة اليد أمام الكاميرا، دون الحاجة إلى لمس شاشة أو استخدام قلم إلكتروني...",
    "category": "vision",
    "categoryNameAr": "رؤية حاسوبية وذكاء اصطناعي",
    "categoryNameEn": "Computer Vision & AI",
    "seoTitle": "اللوح الافتراضي بتتبع حركة اليد | نموذج أولي تفاعلي",
    "metaDesc": "تطوير لوح افتراضي تفاعلي يعتمد على تتبع حركة اليد، مع وظائف الرسم واختيار الألوان والمسح باستخدام MediaPipe وOpenCV.",
    "altText": "تجربة الرسم على اللوح الافتراضي باستخدام حركة اليد",
    "image": "/images/projects/virtual-board-hand-tracking.png",
    "tags": [
      "WebPage",
      "BreadcrumbList",
      "Organization",
      "ImageObject"
    ]
  },
  {
    "id": "interactive-children-ai-learning-system",
    "slug": "interactive-children-ai-learning-system",
    "folderName": "تصميم نظام تعليمي تفاعلي للأطفال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "title": "نظام تعليمي تفاعلي للأطفال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "excerpt": "مشروع أكاديمي نفذه الطلاب بمساعدة تكنو إنجاز لتطوير نظام تعليمي تفاعلي يتعرف على الحيوانات والألوان والأرقام باستخدام YOLO11 وHSV وOCR والرؤية الحاسوبية.",
    "category": "ai",
    "categoryNameAr": "أنظمة تعليمية وذكاء اصطناعي",
    "categoryNameEn": "Educational AI & Vision",
    "seoTitle": "نظام تعليمي تفاعلي للأطفال بالرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "مشروع أكاديمي نفذه الطلاب بمساعدة تكنو إنجاز لتطوير نظام تعليمي تفاعلي يتعرف على الحيوانات والألوان والأرقام باستخدام YOLO11 وHSV وOCR والرؤية الحاسوبية.",
    "altText": "واجهة نظام تعليمي تفاعلي للأطفال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "image": "/images/projects/interactive-children-ai-learning-system.png",
    "tags": [
      "أنظمة تعليمية وذكاء اصطناعي",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "remote-controlled-ground-robot",
    "slug": "remote-controlled-ground-robot",
    "folderName": "تصميم وتنفيذ روبوت لتنفيذ مهام خاصة",
    "title": "نموذج روبوت أرضي متعدد الاتصالات مع تحكم عن بُعد ورؤية حاسوبية",
    "excerpt": "طوّر فريق المشروع نموذجًا أوليًا لروبوت أرضي يجمع بين أنظمة التحكم المضمنة، الاتصالات اللاسلكية، ومعالجة الصور. يهدف النموذج إلى اختبار تكامل الحركة عن بُعد، نقل الصور عبر الكاميرا...",
    "category": "systems",
    "categoryNameAr": "روبوتات وميكاترونيكس",
    "categoryNameEn": "Robotics & Mechatronics",
    "seoTitle": "نموذج روبوت أرضي للتحكم عن بُعد والرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "مشروع نموذج روبوت أرضي يوضح تكامل التحكم الإلكتروني والاتصالات اللاسلكية ومعالجة الصور ضمن منصة روبوتية أولية بدعم تكنو إنجاز.",
    "altText": "نموذج روبوت أرضي أولي يتم التحكم به عن بعد",
    "image": "/images/projects/remote-controlled-ground-robot.png",
    "tags": [
      "روبوتات وميكاترونيكس",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "robotic-hand-gesture-control",
    "slug": "robotic-hand-gesture-control",
    "folderName": "تصميم وتنفيذ كف روبوتية تحاكي حركة اليد البشرية باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "title": "كف روبوتية للتحكم بالحركة عبر الرؤية الحاسوبية وتتبع اليد",
    "excerpt": "طوّر فريق المشروع نموذجًا أوليًا لكف روبوتية تحاكي بعض حالات حركة اليد البشرية من خلال دمج الرؤية الحاسوبية مع أنظمة التحكم المضمنة. يعتمد النظام على التقاط حركة اليد عبر الكاميرا،...",
    "category": "systems",
    "categoryNameAr": "روبوتات ورؤية حاسوبية",
    "categoryNameEn": "Robotics & Vision",
    "seoTitle": "كف روبوتية للتحكم بالإيماءات والرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "نموذج كف روبوتية يدمج تتبع حركة اليد مع الأنظمة المضمنة لتحويل الإيماءات إلى أوامر تحكم لمحركات السيرفو، ضمن مشروع تطبيقي في الروبوتات والرؤية الحاسوبية.",
    "altText": "نموذج كف روبوتية يتم التحكم بها عبر تتبع حركة اليد.",
    "image": "/images/projects/robotic-hand-gesture-control.png",
    "tags": [
      "روبوتات ورؤية حاسوبية",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "syrian-tourism-app",
    "slug": "syrian-tourism-app",
    "folderName": "تطبيق سياحي ذكي لتعزيز السياحة في سوريا",
    "title": "تطبيق سياحي ذكي لتعزيز السياحة في سوريا",
    "excerpt": "تطبيق سياحي رقمي يهدف إلى جمع خدمات استكشاف الوجهات السياحية، معلومات الفنادق، الحجوزات، المنتجات الحرفية، والمحتوى السياحي ضمن منصة واحدة. تم تطوير المشروع كمشروع تخرج في هندسة ال...",
    "category": "mobile",
    "categoryNameAr": "تطبيقات موبايل وسياحة ذكية",
    "categoryNameEn": "Mobile & Smart Tourism",
    "seoTitle": "تطوير تطبيق سياحي رقمي باستخدام Flutter وLaravel | تكنو إنجاز",
    "metaDesc": "منصة سياحية رقمية تجمع الوجهات والفنادق والحجوزات والمنتجات الحرفية والمحتوى السياحي ضمن تطبيق Flutter مع Backend مبني على Laravel ولوحة إدارة.",
    "altText": "تطبيق سياحي ذكي لتعزيز السياحة في سوريا — نموذج تطبيقي بمساعدة تكنو إنجاز",
    "image": "/images/projects/syrian-tourism-app.png",
    "tags": [
      "تطبيقات موبايل وسياحة ذكية",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "employee-presence-tracking",
    "slug": "employee-presence-tracking",
    "folderName": "تطوير نظام ذكي لمراقبة دوام العمال باستخدام الذكاء الاصطناعي والرؤية الحاسوبية",
    "title": "نظام ذكي لمراقبة الحضور داخل مناطق العمل باستخدام الرؤية الحاسوبية",
    "excerpt": "مشروع أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من **مكتب تكنو إنجاز** لتطوير نموذج أولي يعتمد على الرؤية الحاسوبية في كشف الأشخاص وتتبعهم داخل مناطق عمل محددة، واحتساب مدة وجود كل...",
    "category": "vision",
    "categoryNameAr": "رؤية حاسوبية وأتمتة",
    "categoryNameEn": "Computer Vision & Automation",
    "seoTitle": "تتبع الحضور داخل مناطق العمل باستخدام YOLOv8 وDeepSORT | تكنو إنجاز",
    "metaDesc": "مشروع أكاديمي نفذه الطلاب بمساعدة تكنو إنجاز لتطوير نموذج يستخدم YOLOv8 وDeepSORT في كشف الأشخاص وتتبعهم داخل مناطق عمل محددة واحتساب زمن التواجد وتصدير البيانات للتقارير.",
    "altText": "تتبع الأشخاص داخل مناطق عمل محددة باستخدام الرؤية الحاسوبية",
    "image": "/images/projects/employee-presence-tracking.png",
    "tags": [
      "datetime",
      "WebPage",
      "BreadcrumbList",
      "Organization",
      "ImageObject",
      "VideoObject"
    ]
  },
  {
    "id": "exam-computer-vision-monitoring",
    "slug": "exam-computer-vision-monitoring",
    "folderName": "تطوير نظام لكشف المخالفات في قاعات الامتحانات باستخدام تقنيات الرؤية الحاسوبية",
    "title": "تطوير نظام لكشف المخالفات في قاعات الامتحانات باستخدام تقنيات الرؤية الحاسوبية",
    "excerpt": "شارك مكتب تكنو إنجاز في دعم تطوير هذا المشروع الأكاديمي بالتعاون مع فريق الطلاب، بهدف بناء نموذج أولي يعتمد على تقنيات الرؤية الحاسوبية والذكاء الاصطناعي لرصد مؤشرات سلوكية قد ترتب...",
    "category": "vision",
    "categoryNameAr": "رؤية حاسوبية ومراقبة",
    "categoryNameEn": "Computer Vision & Monitoring",
    "seoTitle": "تطوير نظام لكشف المخالفات في قاعات الامتحانات باستخدام تقنيات الرؤية الحاسوبية | تكنو إنجاز",
    "metaDesc": "مشروع تطوير نموذج رؤية حاسوبية لتحليل مؤشرات سلوكية أثناء الامتحانات",
    "altText": "مخطط خوارزمية نظام تحليل السلوك باستخدام الرؤية الحاسوبية.",
    "image": "/images/projects/exam-computer-vision-monitoring.png",
    "tags": [
      "رؤية حاسوبية ومراقبة",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "student-university-guide-app",
    "slug": "student-university-guide-app",
    "folderName": "دليل الطالب في الجامعة الوطنية الخاصة – كلية الهندسة",
    "title": "تطوير دليل الطالب الرقمي في الجامعة الوطنية الخاصة – كلية الهندسة",
    "excerpt": "مشروع **دليل الطالب في الجامعة الوطنية الخاصة – كلية الهندسة** هو تطبيق رقمي أعدّه الطلاب ضمن مشروع تخرج في هندسة الحاسوب، مع **مساعدة ودعم تقني من مكتب تكنو إنجاز أثناء مراحل تطوي...",
    "category": "mobile",
    "categoryNameAr": "تطبيقات موبايل وويب",
    "categoryNameEn": "Mobile & Web Applications",
    "seoTitle": "تطوير دليل طالب جامعي باستخدام Flutter وLaravel | تكنو إنجاز",
    "metaDesc": "مشروع طلابي لتطوير دليل جامعي باستخدام Flutter وLaravel، نفذه الطلاب بمساعدة تقنية من تكنو إنجاز، ويضم محتوى أكاديميًا ولوحة إدارة ومساعدًا افتراضيًا للأسئلة الشائعة.",
    "altText": "الواجهة الرئيسية لتطبيق دليل الطالب الجامعي",
    "image": "/images/projects/student-university-guide-app.png",
    "tags": [
      "تم تنفيذ المشروع من قبل الطلاب بمساعدة تكنو إنجاز.",
      "قدم تكنو إنجاز دعمًا تقنيًا خلال تنفيذ المشروع.",
      "استفاد فريق المشروع من المساندة التقنية المقدمة من تكنو إنجاز.",
      "طورت تكنو إنجاز المشروع بالكامل.",
      "صممت تكنو إنجاز جميع الواجهات.",
      "برمجت تكنو إنجاز Flutter وLaravel بالكامل."
    ]
  },
  {
    "id": "ultrasonic-water-level-monitoring-project",
    "slug": "ultrasonic-water-level-monitoring-project",
    "folderName": "قياس مستوى الماء داخل خزان باستخدام مستشعر الأمواج فوق الصوتية",
    "title": "نظام لقياس مستوى الماء داخل الخزان باستخدام مستشعر فوق صوتي",
    "excerpt": "طُوّر هذا المشروع كنموذج أولي أكاديمي لقياس **نسبة مستوى الماء داخل خزان** باستخدام مستشعر الأمواج فوق الصوتية، مع عرض القراءة مباشرة على شاشة LCD وإرسالها لاسلكيًا إلى تطبيق هاتف ...",
    "category": "systems",
    "categoryNameAr": "أنظمة مدمجة وإنترنت الأشياء",
    "categoryNameEn": "Embedded Systems & IoT",
    "seoTitle": "نظام قياس مستوى الماء بحساس فوق صوتي | تكنو إنجاز",
    "metaDesc": "مشروع أكاديمي طُوّر بمساعدة تكنو إنجاز لنموذج يقيس نسبة مستوى الماء في الخزان باستخدام HC-SR04 وArduino Nano، مع شاشة LCD وإرسال القراءة إلى تطبيق هاتف عبر Bluetooth.",
    "altText": "نموذج قياس مستوى الماء باستخدام Arduino Nano ومستشعر فوق صوتي وشاشة LCD",
    "image": "/images/projects/ultrasonic-water-level-monitoring-project.png",
    "tags": [
      "WebPage",
      "BreadcrumbList",
      "Organization",
      "ImageObject",
      "Product",
      "Review"
    ]
  },
  {
    "id": "news-fact-checking-platform",
    "slug": "news-fact-checking-platform",
    "folderName": "منصة الأخبار الرسمية لمكافحة الأخبار المزيفة في سوريا بعد التحرير",
    "title": "منصة الأخبار الرسمية لمكافحة الأخبار المزيفة",
    "excerpt": "طوّر طلاب هندسة الحاسوب مشروع **منصة الأخبار الرسمية لمكافحة الأخبار المزيفة** كنظام رقمي لإدارة الأخبار والبلاغات المتعلقة بالمحتوى المشكوك فيه. يركز النظام على إنشاء مسار منظم يب...",
    "category": "web",
    "categoryNameAr": "منصات ويب وتطبيقات سحابية",
    "categoryNameEn": "Web Platforms & Cloud",
    "seoTitle": "تطوير منصة أخبار وبلاغات للتحقق من المحتوى | تكنو إنجاز",
    "metaDesc": "منصة رقمية لإدارة الأخبار والبلاغات وسير المراجعة التحريرية، مع لوحات تحكم متعددة الأدوار وبنية Laravel لإدارة المحتوى.",
    "altText": "واجهة منصة إدارة الأخبار والبلاغات",
    "image": "/images/projects/news-fact-checking-platform.png",
    "tags": [
      "منصات ويب وتطبيقات سحابية",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "face-recognition-access-control-project",
    "slug": "face-recognition-access-control-project",
    "folderName": "نظام أمني ذكي للتحكم في الدخول إلى خزينة بنك باستخدام تقنية التعرف",
    "title": "نظام أمني ذكي للتحكم في الدخول باستخدام التعرف على الوجه",
    "excerpt": "مشروع تخرج أكاديمي يهدف إلى تطوير نموذج لنظام تحكم في الدخول إلى منطقة حساسة، ضمن سيناريو تطبيقي لخزينة بنك، بالاعتماد على تقنيات الرؤية الحاسوبية والتعرف على الوجوه. أُعد المشروع ...",
    "category": "vision",
    "categoryNameAr": "أمن سيبراني ورؤية حاسوبية",
    "categoryNameEn": "Security & Biometrics",
    "seoTitle": "نظام تحكم في الدخول بالتعرف على الوجه | مشروع بدعم تكنو إنجاز",
    "metaDesc": "مشروع تخرج أكاديمي ساعد تكنو إنجاز الطلاب في إعداده وتطويره لبناء نموذج تحكم في الدخول يعتمد على OpenCV والتعرف على الوجوه وتسجيل الحالات والتنبيه الصوتي.",
    "altText": "text، والـ metadata.",
    "image": "/images/projects/face-recognition-access-control-project.png",
    "tags": [
      "face-recognition",
      "playsound",
      "face-recognition",
      "playsound",
      "srcset",
      "WebPage"
    ]
  },
  {
    "id": "electronic-voting-system-laravel",
    "slug": "electronic-voting-system-laravel",
    "folderName": "نظام التصويت الالكتروني",
    "title": "نظام التصويت الإلكتروني — تطوير منصة ويب لإدارة عملية التصويت الرقمية",
    "excerpt": "شارك مكتب تكنو إنجاز في دعم وتطوير مشروع **نظام التصويت الإلكتروني** بالتعاون مع فريق الطلاب، بهدف بناء نموذج منصة ويب لإدارة دورة تصويت رقمية تشمل تسجيل المستخدمين، إدارة المرشحين...",
    "category": "web",
    "categoryNameAr": "منصات ويب وتطبيقات سحابية",
    "categoryNameEn": "Web & Enterprise Systems",
    "seoTitle": "نظام التصويت الإلكتروني — تطوير منصة ويب لإدارة عملية التصويت الرقمية | تكنو إنجاز",
    "metaDesc": "مشروع تطوير نظام تصويت إلكتروني يعتمد على Laravel وBootstrap لإدارة المستخدمين والمرشحين وطلبات الترشح والتصويت ضمن منصة ويب متعددة الأدوار.",
    "altText": "نظام التصويت الإلكتروني — تطوير منصة ويب لإدارة عملية التصويت الرقمية — نموذج تطبيقي بمساعدة تكنو إنجاز",
    "image": "/images/projects/electronic-voting-system-laravel.png",
    "tags": [
      "منصات ويب وتطبيقات سحابية",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "weapon-detection-yolo-ai",
    "slug": "weapon-detection-yolo-ai",
    "folderName": "نظام الكشف عن الأسلحة باستخدام تقنيات الذكاء الاصطناعي",
    "title": "نظام الكشف عن الأسلحة باستخدام تقنيات الذكاء الاصطناعي",
    "excerpt": "شارك مكتب تكنو إنجاز في دعم تطوير مشروع **نظام الكشف عن الأسلحة باستخدام تقنيات الذكاء الاصطناعي** كمشروع تخرج أكاديمي تم تطويره من قبل الطلاب، حيث ركز الدعم على الجانب التقني وتوج...",
    "category": "ai",
    "categoryNameAr": "ذكاء اصطناعي ورؤية حاسوبية",
    "categoryNameEn": "AI & Computer Vision",
    "seoTitle": "نظام كشف الأسلحة باستخدام الذكاء الاصطناعي وYOLO | تكنو إنجاز",
    "metaDesc": "مشروع نظام كشف الأسلحة باستخدام الذكاء الاصطناعي والرؤية الحاسوبية، يوضح دور تكنو إنجاز في دعم تطوير نموذج يعتمد على YOLO وتحليل بث الكاميرا.",
    "altText": "وصفي.",
    "image": "/images/projects/weapon-detection-yolo-ai.png",
    "tags": [
      "ذكاء اصطناعي ورؤية حاسوبية",
      "تكنو إنجاز",
      "مشاريع هندسية"
    ]
  },
  {
    "id": "ai-children-learning-system",
    "slug": "ai-children-learning-system",
    "folderName": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي",
    "title": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي",
    "excerpt": "طور فريق المشروع نظامًا تعليميًا تفاعليًا يعتمد على الذكاء الاصطناعي ومعالجة الصور لمساعدة الأطفال على التعرف على الأشياء والألوان بطريقة مرئية ومسموعة. يعتمد النظام على تحليل الصو...",
    "category": "ai",
    "categoryNameAr": "ذكاء اصطناعي وتعليم تفاعلي",
    "categoryNameEn": "AI & Educational Systems",
    "seoTitle": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي والتعرف على الأشياء | تكنو إنجاز",
    "metaDesc": "مشروع تعليمي تفاعلي يستخدم الذكاء الاصطناعي ومعالجة الصور للتعرف على الأشياء والألوان وعرض النتائج بصريًا وصوتيًا، مع دعم تكنو إنجاز لتطوير النموذج.",
    "altText": "نظام تعليم الأطفال باستخدام الذكاء الاصطناعي — نموذج تطبيقي بمساعدة تكنو إنجاز",
    "image": "/images/projects/ai-children-learning-system.png",
    "tags": [
      "ذكاء اصطناعي وتعليم تفاعلي",
      "تكنو إنجاز",
      "مشاريع هندسية"
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
