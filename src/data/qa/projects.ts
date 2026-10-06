// Questions & answers per project (rendered by ContentQA + FAQPage JSON-LD).
// Answers are grounded in each project's own content.
import type { QAItem } from './types';

export const PROJECT_QA: Record<string, QAItem[]> = {
  'virtual-board-hand-tracking': [
    {
      q: 'ما الذي يقدمه اللوح الافتراضي بتتبع حركة اليد؟',
      a: 'يتيح اللوح الكتابة والرسم والمسح واختيار الألوان بحركة اليد أمام الكاميرا، دون لمس شاشة أو استخدام قلم إلكتروني. يلتقط النظام حركة اليد ويحلل مواضع الأصابع، ثم يربط إيماءات محددة بوظائف داخل واجهة اللوح فيظهر أثرها مباشرة في مساحة الرسم.',
      qEn: "What does the virtual board with hand tracking offer?",
      aEn: "The board lets you write, draw, erase, and pick colors with hand movements in front of the camera, without touching a screen or using a stylus. The system captures hand motion and analyzes finger positions, then maps specific gestures to functions within the board's interface, so their effect appears directly in the drawing area.",
    },
    {
      q: 'ما التقنيات المستخدمة في بناء اللوح الافتراضي؟',
      a: 'اعتمد النموذج على Python لغةً رئيسية مع Anaconda لإدارة بيئة المشروع. استُخدمت MediaPipe لتتبع اليد، وOpenCV لمعالجة الصور والفيديو، وNumPy ضمن عمليات معالجة البيانات. تسمح هذه البنية بالتعامل مع تدفق الفيديو من الكاميرا وتحديث واجهة اللوح وفق الإيماءة المكتشفة.',
      qEn: "What technologies are used to build the virtual board?",
      aEn: "The prototype uses Python as the main language with Anaconda for environment management. MediaPipe is used for hand tracking, OpenCV for image and video processing, and NumPy within data-processing steps. This architecture handles the camera's video stream and updates the board interface according to the detected gesture.",
    },
    {
      q: 'كيف يمنع النظام تنفيذ أوامر رسم غير مقصودة؟',
      a: 'عند بسط اليد بالكامل أمام الكاميرا يدخل النظام حالة إيقاف مؤقت للتفاعل، فلا ينفذ أي أمر رسم أو مسح. صُممت هذه الحالة للحد من التفاعلات غير المقصودة أثناء التوقف عن الرسم، إلى جانب حالات أخرى موثقة مثل المسح الجزئي والمسح الكامل بأمر Clear.',
      qEn: "How does the system prevent unintended drawing commands?",
      aEn: "When the hand is fully open in front of the camera, the system enters a paused interaction state and executes no drawing or erasing command. This state was designed to limit unintended interactions when pausing drawing, alongside other documented states such as partial erase and full erase with a Clear command.",
    },
    {
      q: 'ما أبرز التحديات التي ظهرت في تجربة النموذج؟',
      a: 'انخفضت دقة التتبع مع حركات الأصابع السريعة أو المعقدة، وتأثر الأداء بالإضاءة المنخفضة جدًا أو المرتفعة. كما سبب وجود أشخاص أو عناصر أخرى في مجال الكاميرا تشويشًا، وظهر تأخير طفيف على الأجهزة منخفضة المواصفات. ولا ينشر المشروع قياسات رقمية للدقة أو زمن الاستجابة.',
      qEn: "What were the main challenges observed while testing the prototype?",
      aEn: "Tracking accuracy dropped with fast or complex finger movements, and performance suffered under very low or very high lighting. Other people or objects in the camera's field of view also caused noise, and a slight delay appeared on lower-spec devices. The project does not publish numeric measurements of accuracy or response time.",
    },
  ],

  'weapon-detection-yolo-ai': [
    {
      q: 'ما هدف نظام الكشف عن الأسلحة بالذكاء الاصطناعي؟',
      a: 'يهدف المشروع إلى تطوير نموذج رؤية حاسوبية يكتشف الأسلحة مثل السكين والمسدس من بث الكاميرا في الزمن الحقيقي. يعرض النظام موقع الجسم المكتشف داخل الإطار. وطوّره فريق هندسي بمساعدة ودعم تقني من مكتب تكنو إنجاز.',
      qEn: "What is the goal of the AI weapon detection system?",
      aEn: "The project aims to develop a computer vision model that detects weapons such as knives and pistols from a live camera feed in real time, showing the location of the detected object within the frame. It is an academic graduation project developed by students, and the Techno Enjaz office provided support and technical guidance during its development.",
    },
    {
      q: 'ما الأدوات والتقنيات التي يعتمد عليها نظام كشف الأسلحة؟',
      a: 'يعتمد النظام على Python مع OpenCV لمعالجة الصور والفيديو والتعامل مع بث الكاميرا، وعلى Ultralytics YOLO وYOLOv8 لكشف الأجسام. استُخدمت نماذج كشف مخصصة للسكين والمسدس، مع بيئات تطوير مثل Anaconda وJupyter Notebook وVisual Studio Code.',
      qEn: "What tools and technologies does the weapon detection system rely on?",
      aEn: "The system uses Python with OpenCV for image and video processing and camera feed handling, and Ultralytics YOLO with YOLOv8 for object detection. Custom detection models were used for knife and pistol, with development environments such as Anaconda, Jupyter Notebook, and Visual Studio Code.",
    },
    {
      q: 'كيف تمر الصورة داخل النظام حتى تظهر نتيجة الكشف؟',
      a: 'تبدأ العملية بالتقاط الإطارات عبر الكاميرا، ثم تمريرها إلى نموذج الكشف الذي يحلل الصورة ويحدد الأجسام المكتشفة. بعد ذلك تُعرض النتيجة على الشاشة مع تحديد موقع الجسم داخل الإطار، وقد اختُبر ذلك عبر بث مباشر وثّق حالات كشف للسكين والمسدس.',
      qEn: "How does an image flow through the system until a detection result appears?",
      aEn: "The process starts by capturing frames from the camera, then passing them to the detection model, which analyzes the image and identifies detected objects. The result is then displayed on screen with the object's location marked in the frame; this was tested with a live stream documenting knife and pistol detection cases.",
    },
    {
      q: 'هل توجد نسب دقة منشورة لأداء النموذج؟',
      a: 'لا، فالمادة المتوفرة لا تتضمن مؤشرات أداء كمية مثل mAP أو Precision أو Recall أو FPS، لذلك لا تُعرض نسب رقمية. أما التحديات الموثقة فتشمل اختلاف الإضاءة وزوايا ظهور الأجسام، والحاجة إلى تحسين النموذج في بيئات مختلفة، والموازنة بين سرعة المعالجة ودقة الكشف.',
      qEn: "Are there published accuracy figures for the model's performance?",
      aEn: "No. The available material does not include quantitative performance indicators such as mAP, Precision, Recall, or FPS, so no numeric percentages are shown. Documented challenges include varying lighting and viewing angles, the need to improve the model in different environments, and balancing processing speed against detection accuracy.",
    },
  ],

  'exam-computer-vision-monitoring': [
    {
      q: 'ماذا يرصد نظام كشف المخالفات في قاعات الامتحانات؟',
      a: 'يرصد النظام مؤشرات سلوكية قد ترتبط بالمخالفات أثناء الامتحان، ويركز حاليًا على اتجاه الرأس وبعض المؤشرات الحركية. يُصنَّف انحراف الرأس عن الوضع الأمامي حالةً تستدعي المراجعة، بينما يمثل الاتجاه الأمامي حالة طبيعية ضمن سيناريو الاختبار.',
      qEn: "What does the exam proctoring system monitor in exam halls?",
      aEn: "The system monitors behavioral indicators that may be associated with violations during an exam, currently focusing on head orientation and some movement indicators. Head deviation from the forward position is classified as a case that warrants review, while facing forward is treated as a normal state within the test scenario.",
    },
    {
      q: 'ما التقنيات المستخدمة في نظام مراقبة الامتحانات؟',
      a: 'يعتمد النظام على Python وOpenCV، مع YOLO لاكتشاف الأشخاص داخل المشهد، وMediaPipe لاستخراج معالم الوجه والجسم وتحليل الحركة. تعمل هذه المكونات معًا على تحليل الإطارات القادمة من الكاميرا ثم عرض حالة الاختبار بصريًا.',
      qEn: "What technologies are used in the exam monitoring system?",
      aEn: "The system uses Python and OpenCV, with YOLO to detect people in the scene and MediaPipe to extract face and body landmarks and analyze motion. These components work together to analyze frames coming from the camera and then display the test status visually.",
    },
    {
      q: 'هل يثبت النظام حدوث الغش لدى الطالب؟',
      a: 'لا، فالنظام لا يثبت حدوث غش، بل يرصد مؤشرات بصرية قد تحتاج إلى مراجعة بشرية. وهو نموذج أولي اختُبر في بيئة مضبوطة وليس نظامًا تشغيليًا منشورًا في قاعات امتحان فعلية، ولا تُعرض له نسب دقة لعدم توفر تقرير قياس رسمي.',
      qEn: "Does the system prove a student is cheating?",
      aEn: "No. The system does not prove cheating occurs; it flags visual indicators that may need human review. It is a prototype tested in a controlled environment, not an operational system deployed in actual exam halls, and no accuracy percentages are shown because no official measurement report exists.",
    },
    {
      q: 'ما دور تكنو إنجاز في هذا المشروع الأكاديمي؟',
      a: 'شارك مكتب تكنو إنجاز في دعم تطوير المشروع بالتعاون مع فريق الطلاب. شمل ذلك المساعدة التقنية في تحويل الفكرة إلى نموذج قابل للتجربة، ودعم دمج مكونات الرؤية الحاسوبية، ومراجعة منهجية التنفيذ واختبارات التشغيل، ودعم تنظيم مخرجات المشروع وتجهيزها للعرض.',
      qEn: "What is Techno Enjaz's role in this academic project?",
      aEn: "The Techno Enjaz office participated in supporting the project's development in cooperation with the student team. That included technical help turning the idea into a testable prototype, supporting the integration of computer vision components, reviewing the implementation methodology and run tests, and helping organize the project's outputs and prepare them for presentation.",
    },
  ],

  'robotic-hand-gesture-control': [
    {
      q: 'كيف تتحرك الكف الروبوتية بحسب حركة يد المستخدم؟',
      a: 'تلتقط الكاميرا صورة اليد، ثم يحلل نظام تتبع اليد نقاطها وحالات الأصابع. تُحوَّل الحالة المكتشفة إلى أوامر تحكم تُرسل إلى وحدة التحكم، فتحرك محركات السيرفو أجزاء الكف لمحاكاة الحالة المطلوبة.',
      qEn: "How does the robotic hand move according to the user's hand motion?",
      aEn: "The camera captures the hand image, then the hand tracking system analyzes its points and finger states. The detected state is converted into control commands sent to the controller, which drives the servo motors to move the hand's parts into the desired pose.",
    },
    {
      q: 'ما المكونات الرئيسية في مشروع الكف الروبوتية؟',
      a: 'يضم النموذج Arduino UNO وحدةً للتحكم، ومحركات Servo لتحريك أجزاء الكف، ووحدة Bluetooth HC-05 للاتصال اللاسلكي. إضافة إلى كاميرا لالتقاط حركة اليد ونظام رؤية حاسوبية يعتمد على تتبع اليد لتحويل الإيماءات إلى أوامر.',
      qEn: "What are the main components of the robotic hand project?",
      aEn: "The prototype includes an Arduino UNO as the control unit, servo motors to move the hand's parts, and a Bluetooth HC-05 module for wireless communication — plus a camera to capture hand motion and a computer vision system based on hand tracking that converts gestures into commands.",
    },
    {
      q: 'ما النتائج التي حققها النموذج الأولي للكف الروبوتية؟',
      a: 'أظهر النموذج قدرة على اكتشاف حالات أساسية لليد مثل الفتح والقبض، وتحويلها إلى أوامر تحكم، وتشغيل الكف ضمن تجربة عملية. وشملت التحديات ضبط العلاقة بين حركة اليد وحركة المحركات، وتأثير وضعية اليد وزاوية التصوير، والحاجة إلى تحسين المعايرة والاستجابة.',
      qEn: "What results did the robotic hand prototype achieve?",
      aEn: "The prototype demonstrated the ability to detect basic hand states such as open and closed, convert them into control commands, and operate the hand in a practical test. Challenges included tuning the relationship between hand motion and motor movement, the effect of hand pose and camera angle, and the need to improve calibration and responsiveness.",
    },
    {
      q: 'ما الدور الذي قدمته تكنو إنجاز في هذا المشروع؟',
      a: 'قدمت تكنو إنجاز المساعدة التقنية والإرشاد الهندسي خلال مراحل بناء النموذج الأولي، بينما طوّر فريق المشروع الكف ضمن بيئة أكاديمية. وشمل الدعم تكامل مكونات الرؤية الحاسوبية مع التحكم المضمن وتطوير تجربة التشغيل.',
      qEn: "What role did Techno Enjaz play in this project?",
      aEn: "Techno Enjaz provided technical assistance and engineering guidance throughout the prototype build stages, while the project team developed the hand in an academic setting. Support covered integrating computer vision components with embedded control and developing the operating experience.",
    },
  ],

  'ai-children-learning-system': [
    {
      q: 'كيف يساعد هذا النظام الأطفال على التعلم؟',
      a: 'يساعد النظام الأطفال على التعرف على الأشياء والألوان بطريقة مرئية ومسموعة. يحلل صورة الكاميرا ويتعرف على العناصر الظاهرة فيعرض اسم العنصر المكتشف، ثم يحول النتيجة إلى مخرج صوتي، فتجتمع الصورة والصوت في تجربة تعليمية واحدة.',
      qEn: "How does this system help children learn?",
      aEn: "The system helps children recognize objects and colors visually and audibly. It analyzes the camera image, identifies the visible items, and displays the detected object's name, then turns the result into audio output — combining image and sound in a single learning experience.",
    },
    {
      q: 'ما التقنيات المستخدمة في نظام تعليم الأطفال؟',
      a: 'يعتمد النظام على Python وOpenCV لمعالجة الصور، وعلى خوارزميات كشف الأجسام المعتمدة على YOLO للتعرف على العناصر. ويستخدم نموذج HSV لتحليل الألوان، وTkinter لإنشاء واجهة المستخدم، مع بيئات تطوير مثل Anaconda وJupyter Notebook.',
      qEn: "What technologies are used in the children's learning system?",
      aEn: "The system uses Python and OpenCV for image processing, YOLO-based object detection algorithms for recognizing items, an HSV model for color analysis, and Tkinter for the user interface, with development environments such as Anaconda and Jupyter Notebook.",
    },
    {
      q: 'لماذا استُخدم نموذج HSV في التعرف على الألوان؟',
      a: 'استُخدم نموذج HSV لأنه يفصل اللون عن الإضاءة، ما يساعد على التعامل مع تغيرات الصورة بصورة أفضل. ويتيح ذلك للنظام التعرف على الألوان الأساسية ثم عرض النتيجة للطفل وإخراجها صوتيًا.',
      qEn: "Why was the HSV model used for color recognition?",
      aEn: "The HSV model was used because it separates color from lighting, which helps handle image variations better. This lets the system recognize basic colors and then show the result to the child and play it as audio.",
    },
    {
      q: 'ما التحديات التقنية التي واجهت المشروع؟',
      a: 'شملت التحديات اختلاف الإضاءة وتأثيرها على جودة التعرف، وتشابه بعض العناصر بصريًا، والحجب الجزئي للأجسام. كما واجه المشروع اختلاف أداء الأجهزة المستخدمة والحاجة إلى تصميم واجهة مناسبة للأطفال. وطوّره فريق هندسي في مجال تقانة المعلومات بدعم تقني من تكنو إنجاز.',
      qEn: "What technical challenges did the project face?",
      aEn: "Challenges included varying lighting and its effect on recognition quality, visual similarity between some objects, and partial occlusion. The project also faced performance differences across devices and the need for a child-friendly interface. It is an Information Technology graduation project in which Techno Enjaz provided guidance and technical support to the students.",
    },
  ],

  'interactive-children-ai-learning-system': [
    {
      q: 'ما الوظائف التعليمية التي يقدمها النظام التفاعلي للأطفال؟',
      a: 'يقدم النظام ثلاث وظائف رئيسية: التعرف على الحيوانات، والتعرف على الألوان، والتعرف على الأرقام من خلال الكاميرا. تجمعها واجهة رسومية واحدة تسمح بالانتقال بين الأنشطة، ويعرض النظام النتيجة بصريًا ثم يشغل ملفًا صوتيًا مرتبطًا بها لتقديم تغذية راجعة مباشرة.',
      qEn: "What educational functions does the interactive system offer children?",
      aEn: "The system offers three main functions: recognizing animals, recognizing colors, and recognizing numbers through the camera. A single graphical interface ties them together and allows switching between activities; the system displays the result visually and then plays an associated audio file for immediate feedback.",
    },
    {
      q: 'ما نتائج نماذج YOLO11 في كشف الحيوانات؟',
      a: 'سجّل نموذج العُقاب قيمة mAP50 بلغت 0.956، ونموذج القطط 0.992، ونموذج الأسماك 0.856، مع أزمنة استدلال 18.8 و28.4 و21.2 ms على الترتيب. وتعكس هذه القيم أداء نماذج الكشف ضمن اختبارات المشروع، ولا تمثل نسبة موحدة لدقة النظام التعليمي كاملًا.',
      qEn: "What results did the YOLO11 models achieve in animal detection?",
      aEn: "The eagle model recorded mAP50 of 0.956, the cats model 0.992, and the fish model 0.856, with inference times of 18.8, 28.4, and 21.2 ms respectively. These values reflect the detection models' performance within the project's tests and do not represent a unified accuracy figure for the educational system as a whole.",
    },
    {
      q: 'ما مدى دقة النظام في التعرف على الأرقام؟',
      a: 'في اختبار مباشر للأرقام من 1 إلى 10 قُرئت 7 عينات قراءة صحيحة، مع أخطاء في الأشكال المتقاربة مثل قراءة 5 على أنه S و8 على أنه B. كما يعرض التقرير تقييمًا منفصلًا لـ EasyOCR بدقة 87.4%، ولا تُدمج النتيجتان لاختلاف سياقهما.',
      qEn: "How accurate is the system at recognizing numbers?",
      aEn: "In a direct test of digits 1 to 10, 7 samples were read correctly, with errors on similar shapes such as reading 5 as S and 8 as B. The report also includes a separate evaluation of EasyOCR at 87.4% accuracy; the two results are not merged because their contexts differ.",
    },
    {
      q: 'هل قيس أثر النظام على تحصيل الأطفال التعليمي؟',
      a: 'لا، فالمواد المتاحة لا تتضمن دراسة تربوية تقيس تحسن التحصيل أو أثر النظام على تعلم الأطفال. تقتصر النتائج المنشورة على الأداء التقني للنموذج والتجارب البرمجية الموثقة. وتبقى إضافات مثل التعرف على الصوت ودعم لغات متعددة مقترحات مستقبلية وليست ضمن النسخة الحالية.',
      qEn: "Was the system's impact on children's learning outcomes measured?",
      aEn: "No. The available materials do not include an educational study measuring learning improvement or the system's effect on children's learning. Published results are limited to the model's technical performance and documented software experiments. Additions such as voice recognition and multi-language support remain future proposals, not part of the current version.",
    },
  ],

  'remote-controlled-ground-robot': [
    {
      q: 'ما الذي يختبره نموذج الروبوت الأرضي متعدد الاتصالات؟',
      a: 'يختبر النموذج تكامل الحركة عن بعد، ونقل الصور عبر الكاميرا، والتحكم بالمكونات الإلكترونية ضمن منصة روبوتية واحدة. نُفذ ضمن مشروع أكاديمي في مجال هندسة الاتصالات، وقدمت تكنو إنجاز دعمًا وتوجيهًا فنيًا أثناء تطويره.',
      qEn: "What does the multi-connectivity ground robot prototype test?",
      aEn: "The prototype tests integrating remote motion, camera image transmission, and electronic component control within a single robotic platform. It was carried out as an academic project in the Communications Engineering department at the Private National University for 2024–2025, and Techno Enjaz provided support and technical guidance during development.",
    },
    {
      q: 'ما المكونات التي بُني منها الروبوت الأرضي؟',
      a: 'يعتمد الروبوت على Arduino UNO للتحكم بالمكونات، ودارة قيادة المحركات L298N مع محركات تيار مستمر للحركة. ويستخدم وحدة Bluetooth HC-05 للتحكم اللاسلكي، وكاميرا مرتبطة بمعالجة الصور، وPython لمعالجة البيانات والصور، إضافة إلى نمذجة اتصال لاسلكي باستخدام CST.',
      qEn: "What components is the ground robot built from?",
      aEn: "The robot uses an Arduino UNO to control components, an L298N motor driver board with DC motors for movement, a Bluetooth HC-05 module for wireless control, and a camera tied to image processing. Python handles data and image processing, alongside wireless link modeling using CST.",
    },
    {
      q: 'لماذا استُخدم برنامج CST في هذا المشروع؟',
      a: 'استُخدم CST لتحليل خصائص وحدة الاتصال HC-05 عبر نمذجة كهرومغناطيسية. هدفت هذه النمذجة إلى دراسة خصائص الهوائي وسلوكه ضمن النظام، كجزء من الجانب الاتصالي للمشروع إلى جانب التحكم المضمن ومعالجة الصور.',
      qEn: "Why was CST used in this project?",
      aEn: "CST was used to analyze the characteristics of the HC-05 communication module through electromagnetic modeling. This modeling aimed to study the antenna's properties and behavior within the system, as part of the project's communications side alongside embedded control and image processing.",
    },
    {
      q: 'هل الروبوت جاهز للاستخدام الميداني؟',
      a: 'لا، فالمشروع ليس نظامًا تشغيليًا ميدانيًا أو منتجًا نهائيًا، بل نموذج هندسي لاختبار التكامل بين المكونات. نجح في تشغيل منصة يتم التحكم بها عن بعد ونقل صور الكاميرا إلى بيئة المعالجة، مع تحديات في استقرار الاتصال اللاسلكي ومعالجة الصور ضمن بيئة تشغيل محدودة.',
      qEn: "Is the robot ready for field use?",
      aEn: "No. The project is not a field-operational system or a finished product; it is an engineering prototype for testing integration between components. It successfully ran a remotely controlled platform and transmitted camera images to the processing environment, with challenges in wireless link stability and image processing within a limited operating environment.",
    },
  ],

  'syrian-tourism-app': [
    {
      q: 'ما الخدمات التي يجمعها التطبيق السياحي الذكي؟',
      a: 'يجمع التطبيق استكشاف الوجهات السياحية ومعلومات المواقع، والفنادق والحجوزات، والمنتجات الحرفية، والمقالات السياحية في منصة واحدة. ويتضمن أيضًا المفضلة والتنبيهات، إلى جانب لوحة تحكم لإدارة المستخدمين والوجهات والفنادق والغرف والمنتجات والطلبات والمحتوى.',
      qEn: "What services does the smart tourism app combine?",
      aEn: "The app combines exploring tourist destinations and location information, hotels and bookings, artisan products, and tourism articles in one platform. It also includes favorites and notifications, plus an admin dashboard for managing users, destinations, hotels, rooms, products, orders, and content.",
    },
    {
      q: 'ما التقنيات المستخدمة في تطوير التطبيق السياحي؟',
      a: 'طُوّر تطبيق الهاتف باستخدام Flutter وDart، وبُني الجانب الخلفي وواجهات API باستخدام Laravel وPHP، مع MySQL لتخزين البيانات وBootstrap لواجهات الإدارة. وتفصل البنية التطبيق عن الخادم وقاعدة البيانات لتسهيل تنظيم البيانات وتطوير الوظائف المستقبلية.',
      qEn: "What technologies were used to develop the tourism app?",
      aEn: "The mobile app was built with Flutter and Dart, while the backend and APIs were built with Laravel and PHP, using MySQL for data storage and Bootstrap for admin interfaces. The architecture separates the app from the server and database to ease data organization and future feature development.",
    },
    {
      q: 'من هم المستخدمون الذين يخدمهم التطبيق؟',
      a: 'يخدم التطبيق ثلاث فئات هي السائح والحرفي ومدير النظام. يستعرض السائح الوجهات والفنادق والمنتجات الحرفية، بينما تتيح لوحة التحكم للإدارة إدارة المحتوى والبيانات المرتبطة بالوجهات والفنادق والمنتجات والمقالات.',
      qEn: "Which users does the app serve?",
      aEn: "The app serves three groups: tourists, artisans, and system administrators. Tourists browse destinations, hotels, and artisan products, while the admin dashboard manages content and data related to destinations, hotels, products, and articles.",
    },
    {
      q: 'هل أثبت التطبيق زيادة فعلية في السياحة؟',
      a: 'لا، فلا يُدّعى وجود أثر اقتصادي أو زيادة فعلية في السياحة دون بيانات تشغيلية. النتيجة الأساسية هي نموذج تطبيقي يجمع تطبيق مستخدم وBackend وقاعدة بيانات ولوحة إدارة. وطوّره فريق هندسة حاسوب بدعم وتوجيه من تكنو إنجازه مع فريق الطلاب.',
      qEn: "Did the app prove an actual increase in tourism?",
      aEn: "No. No economic impact or actual increase in tourism is claimed without operational data. The core result is an application prototype combining a user app, a backend, a database, and an admin dashboard. It is a Computer Engineering graduation project for 2024–2025 that Techno Enjaz supported and guided with the student team.",
    },
  ],

  'employee-presence-tracking': [
    {
      q: 'كيف يحسب النظام مدة تواجد الأشخاص داخل مناطق العمل؟',
      a: 'يكتشف النظام الأشخاص في كل إطار باستخدام YOLOv8، ثم يمنح DeepSORT كل شخص معرف تتبع عبر الإطارات. بعد ذلك يقارن موقع كل متتبع بمناطق عمل معرفة مسبقًا، ويحسب مدة وجوده بمنطق زمني برمجي، ويسجل المعرف والمنطقة والمدة والتاريخ مع إمكانية التصدير إلى Excel.',
      qEn: "How does the system calculate the time people spend inside work areas?",
      aEn: "The system detects people in every frame using YOLOv8, then DeepSORT assigns each person a tracking ID across frames. It compares each tracker's position against predefined work zones, computes presence duration with programmatic time logic, and logs the ID, zone, duration, and date, with export to Excel.",
    },
    {
      q: 'هل يتعرف النظام على هوية الموظف بالوجه؟',
      a: 'لا، فالنسخة الحالية لا تعتمد على التعرف على الوجه لتأكيد الهوية، بل تتبع الأشخاص داخل المشهد بواسطة معرفات تتبع. ومعرف التتبع لا يساوي تلقائيًا هوية موظف مؤكدة. ويبقى التعرف على الوجه والتكامل مع أنظمة الموارد البشرية ضمن اتجاهات التطوير المستقبلية.',
      qEn: "Does the system identify employee identity from the face?",
      aEn: "No. The current version does not rely on face recognition to confirm identity; it tracks people in the scene via tracking IDs. A tracking ID does not automatically equal a confirmed employee identity. Face recognition and integration with HR systems remain future development directions.",
    },
    {
      q: 'ما التقنيات المستخدمة في نظام مراقبة الحضور؟',
      a: 'استُخدم YOLOv8 لكشف الأشخاص وتحديد مواقعهم، وDeepSORT لتتبعهم وإسناد معرفات لكل منهم. واستُخدمت OpenCV لمعالجة الفيديو وإظهار النتائج بصريًا، بينما نُظمت البيانات والقيم الزمنية باستخدام pandas وdatetime لحساب مدة التواجد وإعداد السجلات.',
      qEn: "What technologies are used in the presence monitoring system?",
      aEn: "YOLOv8 was used to detect people and locate them, and DeepSORT to track them and assign each a tracking ID. OpenCV handled video processing and visual display of results, while pandas and datetime organized the data and time values to compute presence duration and prepare records.",
    },
    {
      q: 'هل جُرب النظام داخل شركة فعلية؟',
      a: 'لا، فقد أُجريت التجربة على مقطع فيديو يحاكي بيئة مكتبية، لذلك تمثل النتائج إثباتًا وظيفيًا لنموذج أولي وليس تشغيلًا إنتاجيًا. ولم تُعرض قيم مثل Precision أو mAP أو FPS. نفذ الطلاب المشروع أكاديميًا بمساعدة تقنية من مكتب تكنو إنجاز أثناء التطوير.',
      qEn: "Has the system been tried inside an actual company?",
      aEn: "No. The experiment ran on a video simulating an office environment, so the results are a functional proof of concept for a prototype, not a production deployment. Values such as Precision, mAP, or FPS were not shown. Students implemented the project academically with technical help from the Techno Enjaz office during development.",
    },
  ],

  'student-university-guide-app': [
    {
      q: 'ما المشكلة التي يعالجها تطبيق دليل الطالب الرقمي؟',
      a: 'يعالج التطبيق تشتت المعلومات التي يحتاجها الطالب بين مصادر متعددة، مثل التخصصات والمقررات والخطط الدراسية والمشاريع السابقة. ويوفر نقطة وصول رقمية موحدة للبحث في المحتوى الأكاديمي، مع لوحة إدارة تساعد على تحديث المحتوى من جهة الإدارة.',
      qEn: "What problem does the digital student guide app address?",
      aEn: "The app addresses the fragmentation of the information students need across multiple sources, such as majors, courses, study plans, and previous graduation projects. It provides a unified digital access point for searching academic content, with an admin dashboard that helps the administration keep content up to date.",
    },
    {
      q: 'كيف يعمل المساعد الافتراضي في دليل الطالب؟',
      a: 'يستخدم المساعد Google Gemini لفهم نية سؤال المستخدم ومطابقته مع قائمة أسئلة شائعة محددة مسبقًا. عند العثور على تطابق مناسب، يسترجع التطبيق الإجابة المعتمدة من قاعدة FAQ المحلية ويعرضها. فهو لا ينشئ إجابات أكاديمية مفتوحة ولا يقدم إرشادًا أكاديميًا شخصيًا غير مقيد.',
      qEn: "How does the virtual assistant in the student guide work?",
      aEn: "The assistant uses Google Gemini to understand the intent of the user's question and match it against a predefined list of frequently asked questions. When a suitable match is found, the app retrieves the approved answer from the local FAQ database and displays it. It does not generate open-ended academic answers or provide unrestricted personal academic advising.",
    },
    {
      q: 'ما التقنيات المستخدمة في بناء تطبيق دليل الطالب؟',
      a: 'بُني تطبيق الهاتف باستخدام Flutter وDart، والجانب الخلفي ولوحة الإدارة وواجهات API باستخدام Laravel وPHP. وتتم المصادقة على طلبات API عبر Laravel Sanctum، مع قاعدة بيانات علائقية لتنظيم بيانات الطلاب والتخصصات والمقررات، وGoogle Gemini للمساعد الافتراضي.',
      qEn: "What technologies were used to build the student guide app?",
      aEn: "The mobile app was built with Flutter and Dart, and the backend, admin panel, and APIs with Laravel and PHP. API requests are authenticated via Laravel Sanctum, a relational database organizes student, major, and course data, and Google Gemini powers the virtual assistant.",
    },
    {
      q: 'هل يرتبط التطبيق بأنظمة الدرجات والجداول الرسمية للجهة الأكاديمية؟',
      a: 'لا، فلا يوجد تكامل مباشر موثق مع أنظمة الدرجات والجداول الرسمية، والتطبيق ليس نظام معلومات جامعيًا رسميًا. ويعتمد على نطاق محدد من البيانات الأكاديمية مع تحديث جزء من المحتوى يدويًا. طوّره فريق هندسي بمساعدة ودعم تقني من مكتب تكنو إنجاز.',
      qEn: "Is the app linked to the university's official grades and schedules systems?",
      aEn: "No. There is no documented direct integration with official grades and schedules systems, and the app is not an official university information system. It relies on a defined scope of faculty data with part of the content updated manually. Students built it as a graduation project with assistance and technical support from the Techno Enjaz office.",
    },
  ],

  'ultrasonic-water-level-monitoring-project': [
    {
      q: 'كيف يقيس النظام مستوى الماء داخل الخزان؟',
      a: 'يرسل مستشعر HC-SR04 المثبت أعلى الخزان موجات فوق صوتية نحو سطح الماء ويقيس زمن عودة الصدى لحساب المسافة. يعالج Arduino Nano هذه المسافة ويحولها إلى نسبة مئوية لمستوى الماء وفق حدود الارتفاع الدنيا والعليا، ثم تُعرض النسبة على شاشة LCD وتُرسل إلى الهاتف.',
      qEn: "How does the system measure the water level inside the tank?",
      aEn: "The HC-SR04 sensor mounted at the top of the tank sends ultrasonic waves toward the water surface and measures the echo return time to compute the distance. The Arduino Nano processes this distance and converts it into a water-level percentage based on configured lower and upper height limits, then shows the percentage on an LCD and sends it to the phone.",
    },
    {
      q: 'هل يمكن متابعة مستوى الماء عبر الإنترنت؟',
      a: 'لا، فالنسخة الموثقة تعتمد على Bluetooth عبر وحدة HC-05 لإرسال القراءة إلى تطبيق هاتف بُني باستخدام MIT App Inventor. لذلك تتم المتابعة ضمن نطاق اتصال Bluetooth فقط. ويُطرح استبدال Bluetooth بوسيلة شبكية مثل Wi-Fi كتطوير مستقبلي وليس جزءًا من النسخة الحالية.',
      qEn: "Can the water level be monitored over the internet?",
      aEn: "No. The documented version relies on Bluetooth via an HC-05 module to send the reading to a phone app built with MIT App Inventor, so monitoring works only within Bluetooth range. Replacing Bluetooth with a network medium such as Wi-Fi is raised as a future development, not part of the current version.",
    },
    {
      q: 'ما نتائج اختبار نظام قياس مستوى الماء؟',
      a: 'اختُبر النموذج في ثلاث حالات: عرض 0% عند الخزان الفارغ، وقراءة تقارب 58% عند مستوى قريب من المنتصف، و100% عند الامتلاء. وهذه اختبارات وظيفية للنموذج الأولي، إذ لا تتضمن المواد اختبار معايرة موسعًا أو نسبة خطأ موثقة على كامل مجال القياس.',
      qEn: "What were the results of testing the water level measurement system?",
      aEn: "The prototype was tested in three cases: 0% displayed with an empty tank, a reading near 58% at a mid-level, and 100% when full. These are functional tests of the prototype; the materials do not include extended calibration testing or a documented error rate across the full measurement range.",
    },
    {
      q: 'ما التحديات التي ظهرت أثناء تطوير النموذج؟',
      a: 'احتاج ربط المستشعر وشاشة LCD ووحدة Bluetooth مع Arduino إلى ضبط التوصيلات وتنسيق تبادل البيانات. كما يمكن أن تؤثر الحرارة والرطوبة على قراءة المستشعر، وظهرت انقطاعات مؤقتة في Bluetooth عند زيادة المسافة أو وجود تداخل. أنجز الطالب المشروع بمساعدة مكتب تكنو إنجاز.',
      qEn: "What challenges emerged during the prototype's development?",
      aEn: "Connecting the sensor, LCD, and Bluetooth module to the Arduino required tuning the wiring and coordinating data exchange. Heat and humidity can affect the sensor reading, and temporary Bluetooth dropouts appeared with greater distance or interference. The student completed the project with assistance from the Techno Enjaz office.",
    },
  ],

  'news-fact-checking-platform': [
    {
      q: 'كيف تعمل منصة الأخبار الرسمية لمكافحة الأخبار المزيفة؟',
      a: 'يرسل المستخدم بلاغًا عن محتوى خارجي يتضمن رابطًا أو نصًا أو صورة، فيصل البلاغ إلى لوحة المحرر للمراجعة. يحلل المحرر البلاغ ويتخذ الإجراء المناسب، ثم يُنشر تصحيح أو توضيح عند الحاجة ويُربط المحتوى محل المراجعة بالنتيجة المنشورة.',
      qEn: "How does the official news platform work to fight fake news?",
      aEn: "The user submits a report about external content containing a link, text, or image; the report reaches the editor's dashboard for review. The editor analyzes the report and takes the appropriate action, then a correction or clarification is published when needed and the content under review is linked to the published outcome.",
    },
    {
      q: 'هل تكشف المنصة الأخبار المزيفة تلقائيًا بالذكاء الاصطناعي؟',
      a: 'لا، فآلية التحقق في النسخة المنفذة تعتمد على المراجعة البشرية من خلال المحررين. أما نماذج الذكاء الاصطناعي للمساعدة في تحليل المحتوى والبحث الدلالي المتقدم فمطروحة كتطويرات مستقبلية ممكنة، وليست جزءًا مثبتًا من النسخة الحالية.',
      qEn: "Does the platform detect fake news automatically with AI?",
      aEn: "No. The verification mechanism in the implemented version relies on human review by editors. AI models to assist content analysis and advanced semantic search are proposed as possible future developments, not a proven part of the current version.",
    },
    {
      q: 'ما التقنيات المستخدمة في بناء منصة التحقق من الأخبار؟',
      a: 'بُني النظام باستخدام Laravel وPHP لإدارة منطق التطبيق والخدمات الخلفية، وMySQL لقاعدة البيانات، وHTML وCSS وBootstrap وJavaScript للواجهات. وتدير قاعدة البيانات كيانات مترابطة تشمل المستخدمين والمنشورات والبلاغات والصور والفيديوهات والمناطق والمفضلة.',
      qEn: "What technologies were used to build the fact-checking platform?",
      aEn: "The system was built with Laravel and PHP for application logic and backend services, MySQL for the database, and HTML, CSS, Bootstrap, and JavaScript for the interfaces. The database manages interrelated entities including users, posts, reports, images, videos, regions, and favorites.",
    },
    {
      q: 'ما الأدوار والصلاحيات المتاحة داخل المنصة؟',
      a: 'تضم المنصة ثلاثة أدوار هي المستخدم والمحرر ومدير النظام. يدير المدير المستخدمين والمناطق والمحافظات وإعدادات المنصة، بينما يراجع المحرر البلاغات ويدير المنشورات ويتابع المحتوى الذي يحتاج إلى تدقيق. طوّر المشروع طلاب هندسة الحاسوب، وساهمت تكنو إنجاز في دعم التطوير وتوجيهه.',
      qEn: "What roles and permissions are available within the platform?",
      aEn: "The platform has three roles: user, editor, and system administrator. The administrator manages users, regions, provinces, and platform settings, while the editor reviews reports, manages posts, and follows content needing fact-checking. Computer engineering students developed the project, and Techno Enjaz contributed support and guidance.",
    },
  ],

  'face-recognition-access-control-project': [
    {
      q: 'ماذا يفعل النظام عند ظهور وجه غير معروف؟',
      a: 'عندما لا يجد النظام تطابقًا مع الصور المرجعية يعامل الوجه على أنه غير معروف، فيحفظ صورته في مجلد مخصص ويطلق تنبيهًا صوتيًا باستخدام مكتبة playsound. أما عند التعرف على شخص مصرح له فيظهر التعرف عليه ويُسجل وقت دخوله.',
      qEn: "What does the system do when an unknown face appears?",
      aEn: "When the system finds no match against the reference images, it treats the face as unknown, saves its image to a dedicated folder, and triggers an audio alert using the playsound library. When an authorized person is recognized, the identification is displayed and their entry time is logged.",
    },
    {
      q: 'ما المكتبات المستخدمة في نظام التحكم بالدخول بالتعرف على الوجه؟',
      a: 'بُني النموذج بلغة Python، واستُخدمت OpenCV للوصول إلى كاميرا اللابتوب وقراءة إطارات الفيديو وتجهيزها. وتتولى مكتبة face-recognition اكتشاف الوجوه واستخراج خصائصها ومقارنتها بالصور المرجعية، بينما تطلق مكتبة playsound التنبيه الصوتي للحالات غير المعروفة.',
      qEn: "What libraries are used in the face recognition access control system?",
      aEn: "The prototype was built in Python. OpenCV accesses the laptop camera and reads and prepares video frames. The face-recognition library detects faces, extracts their features, and compares them against reference images, while playsound triggers the audio alert for unknown cases.",
    },
    {
      q: 'هل استُخدم النظام داخل بنك فعلي؟',
      a: 'لا، فخزينة البنك سيناريو تطبيقي اختير لدراسة استخدام التعرف على الوجه في التحكم بالوصول إلى المناطق الحساسة. طوّره فريق هندسي للعام 2024–2025 بمساعدة مكتب تكنو إنجاز، ولا تشير المواد إلى نشره كنظام تشغيلي في بنك.',
      qEn: "Has the system been used inside an actual bank?",
      aEn: "No. A bank vault is an applied scenario chosen to study using face recognition to control access to sensitive areas. The project is an academic graduation project prepared by students at the Syrian Virtual University for 2024–2025 with assistance from the Techno Enjaz office, and the materials do not indicate it was deployed as an operational system in a bank.",
    },
    {
      q: 'ما الوظائف غير المتوفرة في النسخة الحالية من النظام؟',
      a: 'يعمل النموذج بكاميرا اللابتوب، بينما بقي التشغيل المتزامن لعدة كاميرات وإشعارات الهاتف وتشفير قاعدة البيانات وتحليل السلوك ضمن مقترحات التطوير المستقبلية. كما لا تتضمن المواد قياسات موثقة لنسبة الدقة أو زمن الاستجابة، وترتبط جودة الالتقاط بوضوح الصورة والإضاءة وزاوية الكاميرا.',
      qEn: "What functions are missing from the current version of the system?",
      aEn: "The prototype runs on a laptop camera, while simultaneous multi-camera operation, phone notifications, database encryption, and behavior analysis remain future development proposals. The materials also include no documented accuracy or response-time measurements, and capture quality depends on image clarity, lighting, and camera angle.",
    },
  ],

  'electronic-voting-system-laravel': [
    {
      q: 'ما مراحل عملية التصويت التي يغطيها النظام الإلكتروني؟',
      a: 'يغطي النظام دورة تصويت رقمية تبدأ بتسجيل المستخدمين وإنشاء الحسابات، ثم طلبات الترشح وإنشاء ملفات المرشحين. بعد ذلك يستعرض الناخبون معلومات المرشحين ويختارون مرشحًا مع خطوة تأكيد للتصويت، بينما تتابع الإدارة عملية التصويت وتراجع النتائج.',
      qEn: "What stages of the voting process does the electronic system cover?",
      aEn: "The system covers a digital voting cycle that starts with user registration and account creation, then candidacy requests and candidate profile creation. Voters then browse candidate information and choose a candidate with a vote confirmation step, while the administration monitors the voting process and reviews results.",
    },
    {
      q: 'ما صلاحيات كل دور داخل نظام التصويت الإلكتروني؟',
      a: 'يضم النظام ثلاثة أدوار: الناخب الذي ينشئ حسابًا ويستعرض المرشحين ويصوت، والمرشح الذي يدير ملفه وسيرته الذاتية ومحتواه الانتخابي بعد موافقة الإدارة على طلبه. أما المدير فيراجع طلبات الترشح ويقبلها أو يرفضها ويدير ملفات المرشحين ويتابع التصويت ويراجع النتائج.',
      qEn: "What are the permissions of each role in the electronic voting system?",
      aEn: "The system has three roles: the voter, who creates an account, browses candidates, and votes; the candidate, who manages their profile, CV, and campaign content after the administration approves their request; and the administrator, who reviews and accepts or rejects candidacy requests, manages candidate profiles, monitors voting, and reviews results.",
    },
    {
      q: 'لماذا اعتمد المشروع على Laravel وBootstrap؟',
      a: 'استُخدم Laravel لتنظيم التطبيق وفق بنية MVC وإدارة الطلبات والبيانات والتعامل مع قاعدة البيانات. واستُخدم Bootstrap لبناء واجهات متجاوبة وعناصر UI منظمة وتجربة استخدام موحدة. وصُممت قاعدة البيانات حول المستخدمين وطلبات الترشح وملفات المرشحين وعمليات التصويت بمساعدة مخطط ERD.',
      qEn: "Why did the project rely on Laravel and Bootstrap?",
      aEn: "Laravel was used to organize the application using the MVC structure, manage requests and data, and work with the database. Bootstrap was used to build responsive interfaces with organized UI components and a consistent user experience. The database was designed around users, candidacy requests, candidate profiles, and voting operations with the help of an ERD diagram.",
    },
    {
      q: 'هل يصلح النظام لإجراء انتخابات رسمية؟',
      a: 'لا، فالمشروع نموذج تطبيقي أكاديمي وليس نظام انتخابات حكومي أو منصة معتمدة رسميًا. ولا يُوصف بأنه يضمن سرية الاقتراع أو الأمان الكامل إلا بعد اختبارات أمنية واعتمادات مستقلة. وقد ساعد مكتب تكنو إنجاز الطلاب في دعم المشروع وتطويره.',
      qEn: "Is the system suitable for official elections?",
      aEn: "No. The project is an academic application prototype within a semester project in the Computer Engineering department, not a government election system or an officially accredited platform. It should not be described as guaranteeing ballot secrecy or full security until independent security testing and certifications exist. The Techno Enjaz office helped the students support and develop the project.",

    },
  ],

  'military-war-robot-ai': [
    {
      q: 'ما الفكرة الأساسية للروبوت الذكي؟',
      a: 'روبوت ميداني يُتحكم به عن بُعد عبر تطبيق مخصص، مزوّد بكاميرا متطورة ووحدات تنفيذ آلية تعمل بخوارزميات معالجة الصور، بهدف تنفيذ المهام في بيئات خطرة وتقليل المخاطر البشرية.',
      qEn: "What is the core idea of the intelligent robot?",
      aEn: "A field robot controlled remotely via a dedicated app, equipped with an advanced camera and automated actuators powered by image-processing algorithms, to carry out missions in hazardous environments and reduce human risk.",
    },
    {
      q: 'كيف يحدد الروبوت الأهداف؟',
      a: 'يعتمد على خوارزمية YOLO لتحليل صور الكاميرا وتحديد الأهداف وتمييزها بدقة عالية في الوقت الفعلي، بما يتيح استجابة فورية دون تدخل بشري مباشر.',
      qEn: "How does the robot identify targets?",
      aEn: "It relies on the YOLO algorithm to analyze camera frames and identify and distinguish targets with high accuracy in real time, enabling immediate response without direct human intervention.",
    },
    {
      q: 'ما تقنيات الاتصال المستخدمة في التحكم؟',
      a: 'يدمج النظام تقنيات اتصال متعددة مثل البلوتوث والواي فاي لتسهيل التحكم عن بُعد ونقل البيانات وتحليلها في الوقت الفعلي بين الروبوت وجهاز المشغّل.',
      qEn: "What communication technologies are used for control?",
      aEn: "The system integrates multiple communication technologies such as Bluetooth and Wi-Fi to facilitate remote control and real-time data transfer and analysis between the robot and the operator's device.",
    },
  ],

  'kindergarten-management-system': [
    {
      q: 'ما الذي يقدمه نظام إدارة رياض الأطفال؟',
      a: 'نظام متكامل يربط إدارة الروضة بأولياء الأمور ويغطي سجلات الحضور والتقارير الصحية والملاحظات السلوكية والأنشطة، مع أدوات إدارة كاملة لبيانات الأطفال والفصول والإعلانات والجداول اليومية.',
      qEn: "What does the kindergarten management system offer?",
      aEn: "An integrated system connecting kindergarten administration with parents, covering attendance records, health reports, behavioral notes, and activities, with full admin tools for children's data, classrooms, announcements, and daily schedules.",
    },
    {
      q: 'ما الأدوار الرئيسية التي يخدمها النظام؟',
      a: 'ثلاثة أدوار: ولي الأمر الذي يتابع تقدم طفله ويتواصل مع الإدارة، والطفل الذي تدور حوله السجلات والتقارير، والإدارة التي تمتلك أدوات إدارة البيانات والفصول والإعلانات.',
      qEn: "What are the main roles the system serves?",
      aEn: "Three roles: the parent, who tracks their child's progress and communicates with the administration; the child, whose records and reports the system revolves around; and the administration, which manages data, classrooms, and announcements.",
    },
    {
      q: 'لماذا اعتمد المشروع على Flutter وLaravel؟',
      a: 'استُخدم Flutter لبناء واجهة محمولة تفاعلية موحدة، وLaravel لبناء وظائف خلفية قوية لإدارة البيانات، مع API شاملة موثقة وفق معايير OpenAPI (YAML) تضمن قابلية التوسع والتكامل المستقبلي.',
      qEn: "Why did the project use Flutter and Laravel?",
      aEn: "Flutter was used to build a unified interactive mobile front-end, and Laravel to build a robust back-end for data management, with a comprehensive API documented to OpenAPI (YAML) standards ensuring scalability and future integration.",
    },
  ],

  'vehicle-data-analysis-system': [
    {
      q: 'ما وظيفة نظام تحليل بيانات المركبات؟',
      a: 'نظام مؤتمت لإدارة نقاط الدخول يرصد لوحات المركبات ويلتقط صوراً لها، ثم يستخلص بيانات اللوحة بالرؤية الحاسوبية وOCR ويقارنها بقاعدة بيانات المركبات المصرّح لها ليتخذ قرار المرور أو الرفض لحظياً.',
      qEn: "What does the vehicle data analysis system do?",
      aEn: "An automated entry-point management system that monitors license plates and captures images, extracts plate data via computer vision and OCR, compares it against an authorized-vehicle database, and makes an instantaneous pass or deny decision.",
    },
    {
      q: 'كيف يتعامل النظام مع المخالفات؟',
      a: 'في حال عدم المطابقة أو وجود مخالفات مثل انتهاء التأمين أو تعميم أمني، يرسل النظام إنذاراً للجهات المختصة مع تفاصيل المركبة، بالإضافة إلى إشعارات لمالك المركبة.',
      qEn: "How does the system handle violations?",
      aEn: "In cases of mismatch or violations such as expired insurance or a security notice, the system sends an alert to the competent authorities with the vehicle's details, along with notifications to the vehicle owner.",
    },
    {
      q: 'كيف يتم فتح حاجز الدخول؟',
      a: 'عند السماح بالمرور، يُتحكم في حاجز الدخول آلياً عبر محرك سيرفو، مع إرسال إشعارات فورية لمالك المركبة تتضمن تفاصيل الرسوم المستحقة.',
      qEn: "How is the entry barrier opened?",
      aEn: "Upon clearance, the entry barrier is controlled automatically via a servo motor, with instant notifications sent to the vehicle owner including the applicable fees.",
    },
  ],

  'calorie-counter-computer-vision': [
    {
      q: 'كيف يحسب النظام السعرات الحرارية؟',
      a: 'يكفي تصوير الطبق ليتعرف النظام على مكوناته تلقائياً باستخدام خوارزمية YOLO، ثم يقدّر القيم الغذائية لكل مكوّن ومجموع الطبق دون وزن الطعام أو البحث اليدوي في الجداول.',
      qEn: "How does the system calculate calories?",
      aEn: "Simply photograph the dish: the system recognizes its components automatically using the YOLO algorithm, then estimates each component's nutritional value and the dish's total without weighing food or manually searching tables.",
    },
    {
      q: 'ما التقنيات المستخدمة في المشروع؟',
      a: 'اعتمد المشروع على YOLO ومكتبة Ultralytics للكشف وتحليل الصور، وOpenCV لمعالجة الصور، وTkinter لواجهة تفاعلية، وRoboflow لتحسين بيانات التدريب.',
      qEn: "What technologies does the project use?",
      aEn: "The project relies on YOLO and the Ultralytics library for detection and image analysis, OpenCV for image processing, Tkinter for an interactive interface, and Roboflow for improving training data.",
    },
    {
      q: 'من يستفيد من هذا النظام؟',
      a: 'يستفيد منه مرضى السكري والرياضيون وأخصائيو التغذية وكل من يرغب بمتابعة استهلاكه الغذائي بسهولة، بما ينسجم مع مفهوم الصحة الذكية في العصر الرقمي.',
      qEn: "Who benefits from this system?",
      aEn: "Diabetics, athletes, nutritionists, and anyone who wants to easily monitor their food intake, in line with the concept of smart health in the digital age.",
    },
  ],

  'smart-security-surveillance-ai': [
    {
      q: 'ما الذي يميز نظام المراقبة الذكي عن الكاميرات التقليدية؟',
      a: 'بدلاً من الاكتفاء بالتسجيل، يحلل النظام المشهد لحظياً: يكتشف الأسلحة بخوارزمية YOLO، ويحلل تسلسل الحركات بنموذج RNN لكشف العنف، ويرصد السلوكيات المشبوهة عبر MediaPipe.',
      qEn: "What distinguishes the smart surveillance system from traditional cameras?",
      aEn: "Rather than just recording, the system analyzes the scene in real time: it detects weapons with YOLO, analyzes motion sequences with an RNN model to identify violence, and spots suspicious behavior via MediaPipe.",
    },
    {
      q: 'كيف يكتشف النظام السلوكيات المشبوهة؟',
      a: 'يستخدم مكتبة MediaPipe لتحليل وضعيات الجسم والتعرف على سلوكيات مثل محاولة الوصول غير المصرح به إلى أماكن التخزين الحساسة، كفتح الأدراج أو الاقتراب منها من قبل أشخاص غير مخولين.',
      qEn: "How does the system detect suspicious behavior?",
      aEn: "It uses the MediaPipe library to estimate body poses and recognize behaviors such as unauthorized attempts to access sensitive storage areas, like opening drawers or approaching them by unauthorized individuals.",
    },
    {
      q: 'ما دور الحساسات الفيزيائية في النظام؟',
      a: 'يضيف النظام حساس الحركة (PIR) لرصد التحركات غير الطبيعية ضمن نطاق معين، وحساس اللهب (Flame Sensor) للكشف المبكر عن مؤشرات الحريق، ما يوفر طبقة إضافية من الأمان والاستجابة السريعة.',
      qEn: "What role do the physical sensors play?",
      aEn: "The system adds a PIR motion sensor to detect abnormal movement within a defined range and a flame sensor for early fire detection, providing an extra layer of safety and rapid response.",
    },
  ],

  "tech-support-chatbot-robot": [
    {
      q: "ما الذي يقدمه روبوت الدردشة التقنية؟",
      a: "روبوت دردشة تعليمي ذكي يجيب عن أسئلة الطلاب في البرمجة والشبكات على مدار الساعة، عبر تفاعل نصي وصوتي مبني على معالجة اللغات الطبيعية وقاعدة معرفة تقنية متخصصة، مع حركة ذراع بسيطة تضيف طابعاً تفاعلياً.",
      qEn: "What does the technical chatbot robot offer?",
      aEn: "An intelligent educational chatbot that answers students' programming and networking questions around the clock, via text and voice interaction built on NLP and a specialized technical knowledge base, with simple arm motion adding a physical, engaging touch.",
    },
    {
      q: "ما التقنيات المستخدمة في المشروع؟",
      a: "يعتمد النظام على JavaScript ونموذج Gemini-live-2.5-flash مع واجهات APIs للصوت والربط الشبكي، عتادياً يستخدم لوحة NodeMCU ESP8266 للاتصال اللاسلكي ومحرك سيرفو MG995 لحركة الذراع، مع بطارية 18650 ووحدة LM2596 ونظام BMS.",
      qEn: "What technologies does the project use?",
      aEn: "The system is built with JavaScript and the Gemini-live-2.5-flash model, plus APIs for voice and networking. On the hardware side it uses a NodeMCU ESP8266 board for wireless connectivity and an MG995 servo for arm motion, powered by an 18650 battery with an LM2596 converter and a BMS.",
    },
    {
      q: "هل يعمل الروبوت دون اتصال بالإنترنت؟",
      a: "لا، يعتمد النظام بالكامل على المعالجة السحابية عبر نموذج الذكاء الاصطناعي، لذلك لا يعمل في وضع عدم الاتصال. كما لا يقدم استشارات طبية أو قانونية أو نفسية، ويقتصر الجانب الحركي على حركة الذراع فقط.",
      qEn: "Does the robot work without internet?",
      aEn: "No. The system relies entirely on cloud processing through the AI model, so it cannot run offline. It also provides no medical, legal, or psychological advice, and its motion is limited to the arm.",
    },
  ],

  "chemical-mixing-station-plc": [
    {
      q: "ما الذي تديره محطة الخلط الآلية؟",
      a: "نظام تحكم تتابعي بمنظومة خلط سوائل كيميائية يدير دورة كاملة: تعبئة الخزان الرئيسي بالمادتين A وB حسب حساسات المستوى، ثم خلط لمدة 10 ثوانٍ لتجانس الخليط، ثم تفريغ آلي، مع مراقبة حرارية مستمرة.",
      qEn: "What does the automated mixing station manage?",
      aEn: "A sequential control system for a chemical liquid mixing station running a complete cycle: filling the main tank with materials A and B per level-sensor readings, mixing for 10 seconds to homogenize, automatic discharge, and continuous thermal monitoring.",
    },
    {
      q: "ما التقنيات المستخدمة؟",
      a: "وحدة PLC من Delta مبرمجة بـ WPLSoft عبر شبكات Ladder وتعليمات المؤقتات والعدادات وMOV، مع واجهة مراقبة على DOPSoft، وحساسات مستوى سائل وحساس حرارة RTD وصمامات كهربائية.",
      qEn: "What technologies are used?",
      aEn: "A Delta PLC programmed in WPLSoft with ladder networks, timers, counters, and MOV instructions, a monitoring interface in DOPSoft, liquid-level sensors, an RTD temperature sensor, and solenoid valves.",
    },
    {
      q: "كيف يضمن النظام السلامة الصناعية؟",
      a: "يتضمن نظام إنذار مبكر يُفعّل عند تجاوز درجة حرارة الخليط الحدود المسموح بها، مع مراقبة فورية للمتغيرات التشغيلية واستجابة سريعة للحالات غير الطبيعية، واختُبرت الدورة الكاملة في بيئة محاكاة.",
      qEn: "How does the system ensure industrial safety?",
      aEn: "An early-warning alarm activates when the mixture temperature exceeds allowed limits, with real-time monitoring of operating variables and fast response to abnormal conditions; the full cycle was validated in a simulation environment.",
    },
  ],

  "short-range-delivery-robot": [
    {
      q: "ما وظيفة روبوت التوصيل؟",
      a: "روبوت متحرك منخفض التكلفة ينقل الطلبات والأجسام الصغيرة لمسافات قصيرة داخل البيئات المغلقة كالمستشفيات والمختبرات والمكاتب، عبر التقاط الأجسام بذراع آلية ونقلها إلى الموقع المطلوب.",
      qEn: "What does the delivery robot do?",
      aEn: "A low-cost mobile robot that carries orders and small objects over short distances in indoor environments such as hospitals, labs, and offices, picking objects up with a robotic arm and delivering them to the target location.",
    },
    {
      q: "ما مكونات الروبوت؟",
      a: "لوحة Arduino Uno وحدة تحكم رئيسية، أربعة محركات تيار مستمر عبر دائرة L293D، ذراع بملقط يعمل بمحرك Servo، وحدة HC-05 Bluetooth للتحكم اللاسلكي مع تطبيق هاتف، حساس HC-SR04 للمسافات، وبطارية ليثيوم مع دائرة BMS.",
      qEn: "What are the robot's components?",
      aEn: "An Arduino Uno as the main controller, four DC motors through an L293D driver, a servo-driven gripper arm, an HC-05 Bluetooth module with a phone app for wireless control, an HC-SR04 distance sensor, and a lithium battery with a BMS.",
    },
    {
      q: "ما حدود تشغيل الروبوت؟",
      a: "صُمم للعمل داخل البيئات المغلقة على أرضيات مستوية، ويتعامل مع أجسام خفيفة تتناسب مع قدرة المحركات والذراع، ولا يعتمد في نسخته الحالية على الذكاء الاصطناعي أو الملاحة الذاتية.",
      qEn: "What are the robot's operating limits?",
      aEn: "It is designed for indoor environments with flat floors and light objects matched to motor and arm capacity; the current version does not use AI or autonomous navigation.",
    },
  ],

  "focusbac-baccalaureate-app": [
    {
      q: "ما فكرة تطبيق FocusBac؟",
      a: "تطبيق تعليمي مجاني لطلاب البكالوريا في الفرعين العلمي والأدبي يعتمد التعلم المصغر بمقاطع قصيرة ومركزة، وآلية تراكمية لا تفتح الدرس التالي إلا بعد اجتياز اختبار الدرس الحالي، مع نقاط وتحفيز بالألعاب.",
      qEn: "What is the FocusBac app idea?",
      aEn: "A free learning app for Baccalaureate students in scientific and literary tracks, built on microlearning with short focused segments and a cumulative mechanism that unlocks the next lesson only after passing the current lesson's quiz, with points and gamification.",
    },
    {
      q: "ما الوظائف الإدارية للنظام؟",
      a: "لوحة تحكم تدير المستخدمين وتصنيف المواد الدراسية والفروع والروابط التعليمية، مع مصادقة كاملة وتتبع تقدم كل طالب وتقارير متابعة.",
      qEn: "What administrative functions does the system have?",
      aEn: "An admin dashboard managing users, subject categories, tracks, and educational links, with full authentication, per-student progress tracking, and follow-up reports.",
    },
    {
      q: "ما البنية التقنية للتطبيق؟",
      a: "واجهات Flutter تعمل على Android وiOS، خلفية Laravel بنمط MVC مع Eloquent ORM ولوحة Filament، قاعدة بيانات علائقية تُدار بالترحيلات، وتواصل RESTful API مع تخزين مؤقت لتحسين الأداء.",
      qEn: "What is the app's technical architecture?",
      aEn: "Flutter frontends for Android and iOS, a Laravel backend using MVC with Eloquent ORM and a Filament panel, a relational database managed via migrations, RESTful API communication, and caching for performance.",
    },
  ],

  "remote-computer-control-ai": [
    {
      q: "كيف يتحكم النظام بالحاسوب؟",
      a: "بإيماءات اليد أمام كاميرا الويب دون أجهزة إدخال تقليدية: يلتقط النظام الإطارات ويعالجها بـ OpenCV، ويستخرج نقاط اليد الـ 21 عبر MediaPipe، ثم يصنف تسلسل الإيماءة زمنياً بنماذج CNN وLSTM وينفذ الأمر على نظام التشغيل.",
      qEn: "How does the system control the computer?",
      aEn: "Via hand gestures in front of a webcam, with no traditional input devices: frames are captured and processed with OpenCV, the 21 hand landmarks are extracted with MediaPipe, the gesture sequence is classified temporally with CNN/LSTM models, and the command is executed on the OS.",
    },
    {
      q: "ما الوظائف المتوفرة؟",
      a: "لوحة مفاتيح افتراضية للكتابة، وتحكم بسطوع الشاشة عبر تقارب أو إبعاد الإبهام والسبابة وصولاً إلى السطوع الأقصى، مع معالجة فورية في الزمن الحقيقي.",
      qEn: "What functions are available?",
      aEn: "A virtual keyboard for typing, screen brightness control by pinching or spreading thumb and index finger up to maximum, with real-time processing.",
    },
    {
      q: "ما البيئة التقنية؟",
      a: "Python ضمن بيئتي Anaconda وVS Code، مع MediaPipe لتتبع اليد وتقدير الوضعية ثنائية وثلاثية الأبعاد، وOpenCV للمعالجة، وNumPy ضمن عمليات البيانات.",
      qEn: "What is the technical environment?",
      aEn: "Python within Anaconda and VS Code, MediaPipe for hand tracking with 2D and 3D pose estimation, OpenCV for processing, and NumPy within data operations.",
    },
  ],

  "student-assistance-robot": [
    {
      q: "ما الخدمات التي يقدمها الروبوت للطلاب؟",
      a: "تسجيل بيانات الطلاب الجدد وتعديلها، والبحث عن المعلومات، وإنشاء المستندات الرسمية وطباعتها مباشرة، والإجابة عن الأسئلة الشائعة المتعلقة بشؤون الطلاب والامتحانات — كل ذلك عبر شاشة لمس وإدخال نصي أو صوتي.",
      qEn: "What services does the robot offer students?",
      aEn: "Registering and updating student records, information lookup, generating and directly printing official documents, and answering FAQs about student affairs and exams — all through a touchscreen with text or voice input.",
    },
    {
      q: "كيف يفهم الروبوت الطلبات؟",
      a: "يعتمد على تقنيات الذكاء الاصطناعي ومعالجة اللغة الطبيعية لتحليل الاستفسارات وفهم طلبات المستخدمين وتقديم الاستجابات المناسبة، مع واجهة تفاعلية كاملة الدعم للغة العربية وقاعدة بيانات مركزية.",
      qEn: "How does the robot understand requests?",
      aEn: "It uses AI and natural language processing to analyze inquiries, understand user requests, and deliver appropriate responses, with a fully Arabic-supporting interactive interface and a central database.",
    },
    {
      q: "ما نتائج التجربة العملية؟",
      a: "أظهرت الاختبارات قدرة النظام على تنفيذ المهام بكفاءة وتسهيل الإجراءات الإدارية وتقليل الوقت والجهد اللازمين للحصول على الخدمات الطلابية، مع نموذج أولي فعلي للروبوت يعمل ضمن بيئة الاستخدام الحقيقية.",
      qEn: "What did practical testing show?",
      aEn: "Tests showed the system efficiently executing its tasks, streamlining administrative procedures and cutting the time and effort needed for student services, with a working robot prototype operating in a real environment.",
    },
  ],

  "reconstruction-decision-support": [
    {
      q: "ما وظيفة النظام؟",
      a: "توثيق وتحليل الأضرار في المناطق المتضررة لدعم قرارات إعادة الإعمار: تطبيق أندرويد يجمع صوراً موسومة جغرافياً وأوصافاً نصية، ويُستخلص الموقع آلياً من بيانات الصورة نفسها لضمان التطابق المكاني.",
      qEn: "What is the system's function?",
      aEn: "Documenting and analyzing damage in affected areas to support reconstruction decisions: an Android app collects geotagged photos and textual descriptions, with the location extracted automatically from the image metadata itself to guarantee spatial consistency.",
    },
    {
      q: "كيف يعالج النظام البيانات؟",
      a: "تُرسل البيانات إلى خادم Laravel يمررها عبر وكيل ذكاء اصطناعي مدعوم بنموذج Gemini يوحّد أسماء المناطق غير المتجانسة ويحلل المحتوى النصي والبصري لتقدير مستوى الضرر بتصنيف موحّد قابل للتحليل الإحصائي.",
      qEn: "How does the system process data?",
      aEn: "Data is sent to a Laravel server feeding an AI agent powered by a Gemini model that unifies heterogeneous region names and analyzes textual and visual content to estimate damage level with a unified, statistically analyzable classification.",
    },
    {
      q: "كيف تُعرض النتائج؟",
      a: "عبر لوحة تحكم تفاعلية تعرض خرائط حرارية ومخططات تحليلية لتوزع الأضرار وشدتها على مستوى المناطق والمحافظات، بما يقلل الأخطاء البشرية ويدعم القرار المبني على بيانات موثوقة.",
      qEn: "How are results presented?",
      aEn: "Through an interactive dashboard with heat maps and analytical charts of damage distribution and severity across districts and governorates, reducing human error and supporting evidence-based decisions.",
    },
  ],

  "cybershield-file-link-scanner": [
    {
      q: "ما الذي يقدمه CyberShield؟",
      a: "فحصاً أمنياً موثوقاً للملفات والروابط الإلكترونية عبر خدمة VirusTotal متعددة المحركات، مقترناً بملخصات ذكاء اصطناعي تشرح النتائج التقنية بلغة مبسطة تساعد المستخدم على فهم الخطورة واتخاذ الإجراء المناسب.",
      qEn: "What does CyberShield offer?",
      aEn: "A trustworthy security scan of files and links via multi-engine VirusTotal, paired with AI summaries explaining technical results in plain language so users understand risk and take the right action.",
    },
    {
      q: "من يستفيد من التطبيق؟",
      a: "أي مستخدم يريد التحقق من سلامة ملف أو رابط قبل فتحه أو مشاركته، دون حاجة إلى خبرة أمنية، إذ تُعرض النتائج كملخصات مفهومة بدل التقارير التقنية الخام.",
      qEn: "Who benefits from the app?",
      aEn: "Anyone who wants to verify a file or link before opening or sharing it, with no security expertise needed — results appear as understandable summaries rather than raw technical reports.",
    },
    {
      q: "ما نوع الكشف المتوفر؟",
      a: "فحص الملفات ضد قواعد بيانات أمنية متعددة المحركات، وكشف الروابط الخبيثة ومحاولات التصيد قبل زيارتها، مع إرشاد المستخدم إلى الخطوة المناسبة حسب مستوى الخطورة.",
      qEn: "What detection is available?",
      aEn: "File scanning against multi-engine security databases, plus detection of malicious links and phishing attempts before they are visited, guiding the user to the right next step by risk level.",
    },
  ],

  "projectforge-platform": [
    {
      q: "ما وظيفة ProjectForge؟",
      a: "تبسيط وأتمتة اقتراح المشاريع الهندسية وتخطيطها وبناء فرق العمل، عبر ملف مهارات رقمي (Project-DNA) يحلل القدرات ويطابقها بمتطلبات المشاريع بخوارزميات توصية تعتمد الأوزان والمستويات.",
      qEn: "What does ProjectForge do?",
      aEn: "It simplifies and automates proposing engineering projects, planning them, and building teams, via a digital skills profile (Project-DNA) that analyzes capabilities and matches them to project requirements with weight-and-level recommendation algorithms.",
    },
    {
      q: "ما مخرجات المنصة؟",
      a: "خارطة طريق تنفيذية من بيئة محاكاة تخطيطية تشمل المراحل الزمنية والمخاطر، ومؤشر جاهزية رقمي استرشادي بناءً على تغطية المهارات وتوازن الفريق ومستوى الصعوبة — وهو مؤشر استرشادي وليس نموذجاً تنبؤياً معايراً.",
      qEn: "What outputs does the platform produce?",
      aEn: "An executive roadmap from a planning Sandbox covering timeline phases and risks, and a guidance-only readiness score based on skills coverage, team balance, and difficulty level — advisory, not a calibrated predictive model.",
    },
    {
      q: "ما التقنيات المستخدمة؟",
      a: "Flutter للواجهات على Android وiOS، وLaravel مع قاعدة MySQL للخلفية، ودمج Gemini Flash لتوليد المحتوى وبروتوكول MCP لتوحيد جلب سياق البيانات، مع مصادقة وتشفير TLS.",
      qEn: "What technologies are used?",
      aEn: "Flutter frontends for Android and iOS, a Laravel backend with MySQL, Gemini Flash for content generation, the MCP protocol to unify data-context retrieval, plus authentication and TLS encryption.",
    },
  ],

  "ai-dental-diagnosis": [
    {
      q: "كيف يشخص النظام أمراض الفم والأسنان؟",
      a: "يحلل الصور السريرية والشعاعية بنموذج لغوي رؤيوي (VLM) يفهم الصورة سياقياً ويولّد تقريراً تشخيصياً أولياً بالعربية على هيئة JSON صارم يحدد الأمراض المكتشفة كالتسوس والتهاب اللثة والكسور مع مواقعها بنظام FDI.",
      qEn: "How does the system diagnose oral and dental diseases?",
      aEn: "It analyzes clinical and radiographic images with a vision-language model (VLM) that understands the image contextually and generates a preliminary Arabic diagnostic report as strict JSON, identifying conditions like caries, gingivitis, and fractures with FDI-numbered locations.",
    },
    {
      q: "ما فائدة نموذج SAM في النظام؟",
      a: "يتجاوز دقة الصناديق الإحاطية التقريبية: يقص المنطقة المصابة على مستوى البكسل وينتج مضلعات تحدد حدود المرض بشكل تشريحي دقيق.",
      qEn: "What is SAM's role in the system?",
      aEn: "It goes beyond approximate bounding boxes: SAM crops the affected region at pixel level and produces polygons outlining the lesion with anatomical precision.",
    },
    {
      q: "ما مكونات المنصة؟",
      a: "واجهة React 19 وTypeScript مع خريطة أسنان تفاعلية ووضع داكن، وخادم Flask/Python يستدعي واجهات Gemini/Kimi السحابية ويشغل SAM محلياً، وقاعدة SQLite لسجلات المرضى، إضافة إلى موسوعة طبية ومركز دعم بالمحادثة.",
      qEn: "What are the platform's components?",
      aEn: "A React 19 and TypeScript interface with an interactive dental chart and dark mode, a Flask/Python server calling Gemini/Kimi cloud APIs and running SAM locally, an SQLite database for patient records, plus a medical encyclopedia and a chatbot support center.",
    },
  ],

  "smart-air-writing-board": [
    {
      q: "ما الذي يفعله اللوح الذكي؟",
      a: "يحول كاميرا الويب إلى أداة رسم وكتابة في الهواء عبر تتبع اليد بـ MediaPipe Hands وتمييز الإيماءات بحساب المسافات الهندسية، بدل السبورات الذكية وأجهزة الرسم المكلفة.",
      qEn: "What does the Smart Board do?",
      aEn: "It turns a webcam into an air-drawing and writing tool via MediaPipe Hands hand tracking and geometric-distance gesture discrimination, replacing costly smart whiteboards and drawing tablets.",
    },
    {
      q: "ما الوظائف المتاحة؟",
      a: "الرسم والكتابة الفورية، تغيير الألوان، المسح الجزئي والكامل، حفظ النتائج، وتحليل المعادلات الرياضية المكتوبة يدوياً واستخراج خطوات حلها عبر Google Gemini API.",
      qEn: "What functions are available?",
      aEn: "Instant drawing and writing, color changes, partial and full erase, saving results, and analyzing handwritten math equations and extracting solution steps via the Google Gemini API.",
    },
    {
      q: "ما متطلبات التشغيل؟",
      a: "كاميرا ويب تقليدية وجهاز بمواصفات متوسطة؛ النظام مكتوب بلغة Python ويستخدم OpenCV وMediaPipe وNumPy وPIL، وأثبت التنفيذ تفاعلاً طبيعياً بكفاءة على هذه الفئة من الأجهزة.",
      qEn: "What are the operating requirements?",
      aEn: "A conventional webcam and a mid-range computer; the system is written in Python using OpenCV, MediaPipe, NumPy, and PIL, and implementation showed efficient, natural interaction on this hardware class.",
    },
  ],

  "code-analysis-assistant": [
    {
      q: "ما وظيفة المنصة؟",
      a: "منصة EHCode Hub تعمل كحاضنة تقييم لمقارنة نماذج توليد الكود عبر عشرين مهمة برمجية موحدة في عشر فئات تشمل الويب المتكامل وواجهات API وتطبيقات الجوال والأتمتة وتصور البيانات.",
      qEn: "What is the platform's function?",
      aEn: "The EHCode Hub acts as a benchmark harness comparing code-generation models across twenty unified tasks in ten categories spanning full-stack web, APIs, mobile apps, automation, and data visualization.",
    },
    {
      q: "ما مميزات البنية التقنية؟",
      a: "خادم عارض مبني بـ Node.js اعتماداً حصرياً على وحداته المدمجة دون اعتماديات خارجية، وواجهة ديناميكية، ومساعد برمجي مدمج عبر iframe، ومشغل موحد يقلع المكونات بنقرة واحدة.",
      qEn: "What are the architecture's strengths?",
      aEn: "A viewer server built with Node.js using only its built-in modules — zero external dependencies — a dynamic frontend, an embedded coding assistant via iframe, and a unified one-click launcher for all components.",
    },
    {
      q: "لماذا هذا التقييم مهم؟",
      a: "يوفر بيئة موضوعية ومتكررة لقياس جودة واكتمال مخرجات نماذج توليد الشيفرات في فئات مختلفة، بما يدعم قرارات اختيار النموذج الأنسب لكل نوع مهمة في دورة تطوير البرمجيات.",
      qEn: "Why does this evaluation matter?",
      aEn: "It provides an objective, reproducible environment for measuring the quality and completeness of code-generation outputs across categories, supporting model-selection decisions across the software development lifecycle.",
    },
  ],

  "markdown-pdf-api-mcp-tool": [
    {
      q: "ما المشكلة التي تحلها الأداة؟",
      a: "فشل أدوات تحويل Markdown إلى PDF التقليدية في دعم العربية RTL بشكل صحيح، ودمج مخططات PlantUML بجودة عالية، وعرض معادلات LaTeX — كل ذلك دون أعباء إدارة خوادم تقليدية.",
      qEn: "What problem does the tool solve?",
      aEn: "Traditional Markdown-to-PDF tools fail at proper Arabic RTL support, high-quality PlantUML embedding, and LaTeX equation rendering — all without the burden of managing traditional servers.",
    },
    {
      q: "كيف تعمل خطوط التحويل؟",
      a: "تحليل Frontmatter ثم تحويل HTML مع تلوين الشيفرات بـ Highlight.js وعرض المعادلات بـ KaTeX، ودمج مخططات PlantUML كـ SVG متجهة مدمجة، وأخيراً توليد PDF عبر Cloudflare Browser Rendering بدعم RTL كامل.",
      qEn: "How does the conversion pipeline work?",
      aEn: "Frontmatter parsing, then HTML conversion with syntax highlighting via Highlight.js and equations via KaTeX, PlantUML diagrams embedded as inline vector SVGs, and finally PDF generation via Cloudflare Browser Rendering with full RTL support.",
    },
    {
      q: "ما مزايا النظام؟",
      a: "بنية Serverless كاملة على Cloudflare بأزمنة استجابة مثلى، وأمان يشمل مصادقة JWT وتشفير كلمات المرور وسجل تحويلات على D1، مع توافر الأداة كواجهة REST وقناة MCP.",
      qEn: "What are the system's advantages?",
      aEn: "A fully Serverless architecture on Cloudflare with optimal response times, security covering JWT authentication, password hashing, and conversion history on D1, exposed both as a REST API and an MCP channel.",
    },
  ],

  "interactive-educational-robot": [
    {
      q: "ماذا يعلّم الروبوت الأطفال؟",
      a: "التعرف على الأرقام والأحرف الإنجليزية عبر OCR، والألوان بتقنية HSV في ظروف إضاءة مختلفة، والفواكه والعناصر التعليمية بنماذج تعلم آلي مدربة مسبقاً، عبر كاميرا رقمية.",
      qEn: "What does the robot teach children?",
      aEn: "Recognizing numbers and English letters via OCR, colors using the HSV model under varying lighting, and fruits and educational objects with pre-trained machine learning models, all through a digital camera.",
    },
    {
      q: "كيف يتفاعل الروبوت مع الطفل؟",
      a: "حركياً عبر ثلاثة محركات سيرفو (واحد لليد واثنان للقدمين) تنفذ حركات تفاعلية، وصوتياً عبر ملفات مولدة بمنصة ElevenLabs بصوت مخصص تُشغل تلقائياً بعد التعرف على العنصر.",
      qEn: "How does the robot interact with the child?",
      aEn: "Physically via three servo motors (one arm, two legs) performing interactive movements, and vocally via clips generated on the ElevenLabs platform with a custom robot voice, played automatically after each recognition.",
    },
    {
      q: "ما نتائج التجربة؟",
      a: "أظهرت النتائج قدرة النظام على التعرف على العناصر المختلفة بدقة مناسبة وتقديم تجربة تعليمية تفاعلية فعالة، وفق منهجية شملت تحليل المتطلبات وجمع البيانات وتطوير النماذج واختبار الأداء.",
      qEn: "What were the experiment results?",
      aEn: "Results showed the system recognizing different objects with suitable accuracy and delivering an effective interactive learning experience, following a methodology covering requirements analysis, data collection, model development, and performance evaluation.",
    },
  ],

  "online-fitness-coach": [
    {
      q: "ما الذي يقدمه المدرب الذكي؟",
      a: "خططاً تدريبية مخصصة تولّد من البيانات الشخصية (العمر والوزن والطول والأهداف ومستوى النشاط) عبر Gemini API، مع نصائح يومية وتقارير تحليلية دورية ومحادثة بلغة طبيعية، دون أجهزة استشعار أو معالجة فيديو.",
      qEn: "What does the smart coach deliver?",
      aEn: "Personalized training plans generated by the Gemini API from personal data (age, weight, height, goals, activity level), plus daily tips, periodic analytical reports, and natural-language conversation — no sensing hardware or video processing required.",
    },
    {
      q: "ما البنية التقنية؟",
      a: "واجهة Flutter بلغة Dart، خادم Cloudflare Workers لحوسبة الحافة تقلل زمن الاستجابة، تخزين R2 للفيديوهات والملفات، وقاعدة بيانات علائقية D1 لإدارة المستخدمين والخطط والمواعيد.",
      qEn: "What is the technical architecture?",
      aEn: "A Flutter UI in Dart, Cloudflare Workers backend providing edge computing that cuts latency, R2 storage for videos and files, and a D1 relational database managing users, plans, and appointments.",
    },
    {
      q: "من يستفيد من المنصة؟",
      a: "المتدربون المنزليون الباحثون عن توجيه احترافي منخفض التكلفة، إذ تسد المنصة الفجوة بين التدريب الذاتي والاحترافية وتقلل الأخطاء الحركية المسببة للإصابات.",
      qEn: "Who benefits from the platform?",
      aEn: "Home trainees seeking affordable professional guidance; the platform bridges the gap between self-training and professional coaching and reduces injury-causing movement errors.",
    },
  ],

  "nabd-child-psychological-assessment": [
    {
      q: "ما وظيفة نظام نبض؟",
      a: "دعم التقييم النفسي الأولي للأطفال المتضررين من الحروب عبر تحليل السلوك غير اللفظي والخصائص الصوتية بالذكاء الاصطناعي، ليمنح الأخصائي مؤشرات موضوعية حول الحالة النفسية.",
      qEn: "What is Nabd's function?",
      aEn: "Supporting the preliminary psychological assessment of war-affected children by analyzing non-verbal behavior and vocal characteristics with AI, giving psychologists objective indicators of the child's state.",
    },
    {
      q: "هل يحل النظام محل الأخصائي النفسي؟",
      a: "لا؛ النظام أداة داعمة لاتخاذ القرار وليست بديلاً عن التشخيص السريري، ويقدم مؤشرات وتقارير أولية تساعد المختص في تقييم الحالة واتخاذ القرار المناسب.",
      qEn: "Does the system replace the psychologist?",
      aEn: "No; Nabd is a decision-support tool, not a replacement for clinical diagnosis. It provides preliminary indicators and reports that help the specialist evaluate the case and decide on next steps.",
    },
    {
      q: "ما التقنية المستخدمة في التحليل؟",
      a: "نموذج Google Gemini لتحليل التسجيلات الصوتية والبيانات السلوكية متعددة الوسائط، ضمن بيئة متكاملة لإدارة المستخدمين وملفات الأطفال وجلسات التقييم والتقارير.",
      qEn: "What technology powers the analysis?",
      aEn: "The Google Gemini model analyzes voice recordings and behavioral data multimodally, within an integrated environment for managing users, children's files, assessment sessions, and reports.",
    },
  ],

  "rifq-pet-care-platform": [
    {
      q: "ما الذي يقدمه نظام رِفق؟",
      a: "منصة عربية متكاملة لرعاية الحيوانات: عيادة ذكاء اصطناعي تشخص الأمراض الجلدية من الصور والفيديو وتحلل السلوك، ودردشة مع خبير سلوك، ونظام تبني إلكتروني، ومتجر مستلزمات، ونقاط ولاء، ولوحة تحكم بصلاحيات دقيقة.",
      qEn: "What does the Rifq system offer?",
      aEn: "A fully integrated Arabic platform for animal care: an AI clinic diagnosing skin conditions from photos and videos and analyzing behavior, a behavior-expert chat, an online adoption system, a supplies store, loyalty points, and an admin panel with fine-grained permissions.",
    },
    {
      q: "كيف يصل المستخدم لملف الحيوان؟",
      a: "كل حيوان مرتبط برمز QR فريد يعمل كمعرف سحابي آمن؛ مسحه بأي هاتف يتيح الوصول الفوري للملف الكامل بما يشمل السجل الطبي والتقييمات السلوكية.",
      qEn: "How does a user access an animal's profile?",
      aEn: "Every animal is linked to a unique QR code acting as a secure cloud identifier; scanning it with any phone gives instant access to the full profile, including medical records and behavioral assessments.",
    },
    {
      q: "ما التقنيات المستخدمة؟",
      a: "Laravel 12 مع لوحة Filament، ودمج Google Gemini للخدمات التشخيصية والاستشارية التوليدية، مع أنظمة تبني ومتجر إلكتروني وسلة مشتريات ونقاط ولاء.",
      qEn: "What technologies are used?",
      aEn: "Laravel 12 with the Filament admin panel, and Google Gemini integration for generative diagnostic and consultation services, plus adoption, e-commerce, cart, and loyalty systems.",
    },
  ],

  "eeg-brain-device-control": [
    {
      q: "كيف يحول النظام إشارات الدماغ إلى حركة؟",
      a: "تُستقبل إشارات EEG من لوحة OpenBCI Cyton ثمانية القنوات، وتُرشح بنوتش 50 هرتز وتمرير نطاق 8–30 هرتز وتطبَّع، ثم تُصنف إلى حالات حركية بشبكات EEGNet أو ShallowConvNet أو LDA، ويترجم محوّل الأوامر النتيجة إلى أوامر قيادة تُرسل عبر المنفذ التسلسلي إلى Arduino يقود مرحّلات السيارة النموذجية.",
      qEn: "How does the system turn brain signals into motion?",
      aEn: "EEG signals are received from an 8-channel OpenBCI Cyton board, filtered (50 Hz notch, 8–30 Hz band-pass) and normalized, then classified into motor states using EEGNet, ShallowConvNet, or LDA; a command mapper translates the result into driving commands sent over serial to an Arduino driving the model car's relays.",
    },
    {
      q: "ما النتائج المسجلة؟",
      a: "حقق نموذج فتح وإغلاق العينين دقة 86.22%، وأفضل دقة للمهام الحركية الثنائية على بيانات PhysioNet بلغت نحو 69.42%، واختُبر التحكم بالسيارة بزمن استجابة يقل عن 500 ميلي ثانية.",
      qEn: "What results were recorded?",
      aEn: "The eyes open/closed model achieved 86.22% accuracy, the best binary motor-task accuracy on PhysioNet was about 69.42%, and vehicle control was tested with under-500 ms response latency.",
    },
    {
      q: "هل النظام جهاز طبي؟",
      a: "لا؛ هو أداة بحثية تعليمية وليست جهازاً طبياً، وأي استخدام موسع يتطلب طبقات أمان كزر توقف طارئ وحدود سرعة ورفض الأوامر منخفضة الثقة، مع معالجة تحديات ندرة بيانات المعايرة وفجوة المجال بين الأجهزة.",
      qEn: "Is the system a medical device?",
      aEn: "No; it is an educational research tool, not a medical device. Any expanded use requires safety layers such as an emergency stop, speed limits, and low-confidence command rejection, plus handling scarce calibration data and device domain shift.",
    },
  ],

  "smart-attendance-antispoofing": [
    {
      q: "كيف يمنع النظام تسجيل الحضور بالنيابة؟",
      a: "بدمج تقنيات التحقق من حيوية الوجه (Anti-Spoofing) التي تحلل النسيج والعمق ثلاثي الأبعاد للتمييز بين الوجوه الحية والصور المطبوعة أو عروض الشاشات، مع بصمات وجهية عميقة بنموذج FaceNet512.",
      qEn: "How does the system prevent proxy attendance?",
      aEn: "By integrating liveness verification (anti-spoofing) that analyzes texture and 3D depth to distinguish live faces from printed photos or screen replays, combined with deep facial embeddings from the FaceNet512 model.",
    },
    {
      q: "كيف يدعم النظام عدة قاعات؟",
      a: "عبر تعدد المهام (Multithreading) لاستقبال بث كاميرات حتى أربع قاعات في وقت واحد دون تأثر دقة التعرف، مع إرسال النتائج لاسلكياً عبر NodeMCU ESP8266 لتشغيل مؤشرات LED خضراء/حمراء فورية.",
      qEn: "How does it support multiple rooms?",
      aEn: "Through multithreading that receives camera streams from up to four rooms simultaneously without hurting recognition accuracy, sending results wirelessly via NodeMCU ESP8266 to light instant green/red LED indicators.",
    },
    {
      q: "ما إمكانات التقارير؟",
      a: "إدارة الجلسات الدراسية والقاعات والمواد، وتوليد تقارير وإحصائيات دقيقة باستخدام Python وPandas وOpenPyXL، مع واجهة رسومية حديثة بـ CustomTkinter.",
      qEn: "What reporting capabilities exist?",
      aEn: "Management of class sessions, rooms, and courses, plus accurate reports and statistics generated with Python, Pandas, and OpenPyXL, and a modern CustomTkinter GUI.",
    },
  ],

  "gov-services-automation": [
    {
      q: "ما الخدمات التي يؤتمتها النظام؟",
      a: "ثلاث ركائز: تقديم الشكاوى الإلكترونية مع تتبع حالتها، والاستعلامات العامة كالبيانات العائلية وإثباتات الحالة الوظيفية، وعرض الفواتير الخدمية وتسديدها إلكترونياً.",
      qEn: "What services does the system automate?",
      aEn: "Three pillars: electronic complaint submission with status tracking, public inquiries such as family records and employment-status certificates, and viewing and paying utility bills online.",
    },
    {
      q: "كيف تختلف واجهتا النظام؟",
      a: "بوابة للمواطنين لتقديم الطلبات وتتبعها رقمياً دون أوراق، ولوحة إدارية للجهات الحكومية لمعالجة الطلبات وتغيير حالاتها (قيد المعالجة، منجز، مرفوض) وتوثيق القرارات.",
      qEn: "How do the two interfaces differ?",
      aEn: "A citizen portal for submitting and digitally tracking requests without paperwork, and an administrative dashboard for government entities to process requests and update statuses (pending, completed, rejected) with decision records.",
    },
    {
      q: "ما الأثر الإداري المتوقع؟",
      a: "تحسين جودة الخدمات العامة وتقليل الأخطاء البشرية وتسريع الأداء الإداري، مع إتاحة الخدمات بأمان على مدار الساعة وتصميم واجهة بسيطة تراعي سرعات الإنترنت المتوفرة.",
      qEn: "What is the expected administrative impact?",
      aEn: "Improved public-service quality, fewer human errors, faster administrative performance, safe 24/7 service availability, and a deliberately simple interface suited to available internet speeds.",
    },
  ],

  "sports-injury-detection": [
    {
      q: "كيف يكشف النظام الأخطاء الحركية؟",
      a: "يستخرج الهيكل العظمي من إطارات الفيديو بتقدير الوضعية، ويحول النقاط إلى تمثيل عددي، ثم يحلل تسلسل الحركة زمنياً بنموذج LSTM بدل الاكتفاء بلقطة منفردة، ليصنف الأداء صحيحاً أو خاطئاً.",
      qEn: "How does the system detect movement errors?",
      aEn: "It extracts the skeleton from video frames via pose estimation, converts keypoints into a numerical representation, then analyzes the motion sequence temporally with an LSTM model instead of isolated frames, classifying form as correct or incorrect.",
    },
    {
      q: "ما نتائج التجربة؟",
      a: "تمييز ناجح بين الأداء الصحيح والخاطئ في التمارين المختارة ضمن ظروف تصوير مناسبة، مع استجابة شبه فورية في الزمن الحقيقي.",
      qEn: "What were the experiment results?",
      aEn: "Successful discrimination between correct and incorrect form in the selected exercises under suitable recording conditions, with near-real-time responsiveness.",
    },
    {
      q: "ما الهدف من النظام؟",
      a: "توفير أداة موضوعية منخفضة التكلفة تساعد الرياضيين على تقييم أدائهم في غياب الإشراف المباشر، ودعم السلامة الرياضية والكشف المبكر عن الانحرافات الحركية.",
      qEn: "What is the system's goal?",
      aEn: "Providing an affordable, objective tool helping athletes evaluate performance without direct supervision, supporting sports safety and early detection of movement deviations.",
    },
  ],

  "investment-project-management": [
    {
      q: "ما وظيفة المنصة؟",
      a: "أتمتة وتنظيم إدارة المشاريع الهندسية الممولة باستثمار أجنبي، بحلقة وصل رقمية تضمن الشفافية بين المستثمرين والإدارة والفرق الميدانية عبر هيكلية ورش العمل الفنية ولوحات تحكم لكل دور.",
      qEn: "What is the platform's function?",
      aEn: "Automating and organizing the management of foreign-investment engineering projects, as a digital intermediary guaranteeing transparency among investors, administration, and field teams via a technical-workshops structure and role-based dashboards.",
    },
    {
      q: "كيف يعمل التوظيف الذكي؟",
      a: "تحليل السير الذاتية بالذكاء الاصطناعي وفق معايير محددة لاختيار الكفاءات، مع دعم الذكاء الاصطناعي القابل للتفسير (Explainable AI) عبر مبررات واضحة لنتائج التقييم تعزز الثقة في قرارات التوظيف.",
      qEn: "How does smart recruitment work?",
      aEn: "AI-based resume evaluation against defined criteria to select the best candidates, with Explainable AI support providing clear justifications for evaluation outcomes that build trust in hiring decisions.",
    },
    {
      q: "كيف يتابع العمال الميدانيون المهام؟",
      a: "عبر تطبيق جوال مبني بـ Flutter وDart يتيح متابعة المهام اليومية وتحديث حالة الأعمال من موقع العمل بتدفق بيانات حي، ضمن نظام مبني بـ Laravel وFilament وLivewire.",
      qEn: "How do field workers track tasks?",
      aEn: "Via a Flutter and Dart mobile app for tracking daily tasks and updating work status from the job site with live data flow, within a system built on Laravel, Filament, and Livewire.",
    },
  ],

  "wanted-person-recognition": [
    {
      q: "كيف يعمل نظام التعرف على المطلوبين؟",
      a: "شبكة كاميرات موزعة تحلل الصور لحظياً بخوارزميات معالجة صور وتعلم عميق، وتطابق الوجوه مع قاعدة بيانات مطلوبين معدة مسبقاً، وتطلق إنذاراً فورياً عند الاكتشاف دون تدخل بشري مباشر.",
      qEn: "How does the wanted-person recognition system work?",
      aEn: "A distributed camera network analyzes images in real time with image-processing and deep-learning algorithms, matching faces against a pre-built wanted-persons database and firing instant alerts upon detection without direct human intervention.",
    },
    {
      q: "ما البيئة التقنية؟",
      a: "Python ضمن Anaconda وJupyter Notebook، وقاعدة بيانات SQLite لإدارة سجلات الأشخاص وحالات التعرف، مع خط معالجة متكامل يوثق حالات التعرف الناجحة وغير الناجحة.",
      qEn: "What is the technical environment?",
      aEn: "Python within Anaconda and Jupyter Notebook, an SQLite database managing person records and recognition events, and an integrated pipeline documenting both successful and failed recognition cases.",
    },
    {
      q: "ما المشكلات التي يعالجها؟",
      a: "استبدال المراجعة البشرية المبطئة والمعرضة للخطأ، وتوسيع التغطية عبر شبكة الكاميرات، وتسريع الاستجابة بكشف فوري، وخفض تكلفة المراقبة البشرية المستمرة في الأماكن الحيوية.",
      qEn: "What problems does it solve?",
      aEn: "Replacing slow, error-prone human review, expanding coverage through the camera network, accelerating response with instant detection, and cutting the cost of continuous human monitoring in critical venues.",
    },
  ],

  "breast-cancer-diagnosis-ai": [
    {
      q: "كيف يجمع النظام بين مصدري البيانات؟",
      a: "مساران متكاملان: تحليل صور الأشعة الطبية بخوارزمية YOLO لكشف المناطق الشاذة، وتحليل بيانات الفحوصات المخبرية بخوارزميات تصنيف مثل Random Forest، ثم دمج المخرجات لدعم قرار تشخيصي أدق.",
      qEn: "How does the system combine the two data sources?",
      aEn: "Two complementary tracks: YOLO-based analysis of radiology images detecting abnormal regions, and classification algorithms such as Random Forest processing laboratory data, with fused outputs supporting a more accurate diagnostic decision.",
    },
    {
      q: "ما نتائج الأداء؟",
      a: "أظهرت الاختبارات دقة عالية في التنبؤ مع تقليل الأخطاء البشرية وزمن المعالجة، ما يجعل النظام أداة فعالة لدعم الأطباء في عملية التشخيص.",
      qEn: "What are the performance results?",
      aEn: "Tests showed high prediction accuracy with reduced human error and processing time, making the system an effective tool supporting physicians in diagnosis.",
    },
    {
      q: "كيف تُدخل البيانات؟",
      a: "عبر واجهات سهلة الاستخدام تقبل البيانات بصور الأشعة أو ملفات Excel، بما يمنح مرونة في الاستخدام ويسهل دمج النظام في المؤسسات الطبية.",
      qEn: "How is data entered?",
      aEn: "Via easy-to-use interfaces accepting radiology images or Excel files, offering input flexibility and easing integration into medical institutions.",
    },
  ],

  "face-attendance-timer-app": [
    {
      q: "كيف يعمل المؤقت الزمني في النظام؟",
      a: "يحدد النافذة المسموحة للحضور لكل محاضرة؛ أي طالب يصل بعد الوقت المحدد يُعتبر غائباً تلقائياً، ويمنع النظام تسجيل حضور أي شخص من خارج المحاضرة، وعند الانتهاء تُمسح البيانات تلقائياً استعداداً للمحاضرة التالية.",
      qEn: "How does the session timer work?",
      aEn: "It defines the allowed arrival window per lecture; any student arriving after the cutoff is marked absent automatically, the system refuses attendance records for anyone not in the session, and data is cleared automatically when the lecture ends in preparation for the next one.",
    },
    {
      q: "كيف يتحقق النظام من هوية الطالب؟",
      a: "بتقنية بصمة الوجه عبر خوارزميات التعرف على الوجه ومحرك فرق للمقارنة، مع معمارية نظام ومخطط تدفق موثقين يضبطان مسار البيانات من الالتقاط إلى التسجيل.",
      qEn: "How does the system verify student identity?",
      aEn: "Using facial biometrics through face-recognition algorithms and a comparison engine, with a documented system architecture and flow diagram governing the data path from capture to registration.",
    },
    {
      q: "ما المشكلات التي يعالجها؟",
      a: "التزوير والتأخير وهدر الوقت في الطرق التقليدية، مع ضمان العدالة والشفافية في تسجيل الحضور وتخفيف العبء الإداري اليدوي.",
      qEn: "What problems does it address?",
      aEn: "Fraud, delays, and time waste in traditional methods, guaranteeing fair and transparent attendance tracking and easing the manual administrative burden.",
    },
  ],

  "university-face-attendance-app": [
    {
      q: "ما وظائف النظام الجامعي؟",
      a: "تسجيل حضور الطلاب وضبط دخولهم للقاعات التعليمية والامتحانية بالتعرف على الوجوه في الزمن الحقيقي، مع التحقق من القوائم الاسمية الرسمية للأرقام الجامعية وتوزيع القاعات.",
      qEn: "What are the university system's functions?",
      aEn: "Recording student attendance and controlling entry to teaching and exam halls with real-time face recognition, verified against official name lists containing university IDs and hall assignments.",
    },
    {
      q: "كيف يمنع النظام الانتحال؟",
      a: "بآليات كشف عن التلاعب تحلل الحركة والخصائص النسيجية لمنع الغش واستخدام الصور أو الفيديوهات، خاصة في البيئات الامتحانية الحساسة، مع سمات عميقة (Embeddings) تقارن بقاعدة بيانات مركزية.",
      qEn: "How does the system prevent impersonation?",
      aEn: "Through spoofing-detection mechanisms analyzing motion and texture to prevent cheating with photos or videos, especially in sensitive exam settings, with deep embeddings matched against a central database.",
    },
    {
      q: "ما إمكانات الإدارة والتقارير؟",
      a: "إدارة كاملة للتخصصات والسنوات والمواد والقاعات وبيانات الطلاب وجلسات المحاضرات بتعدد الكاميرات، مع تقارير يومية وسجلات تاريخية ولوحة تحليلات وأدوار لمسؤول أكاديمي وسكرتارية وموظف.",
      qEn: "What are the management and reporting capabilities?",
      aEn: "Full management of departments, years, courses, halls, student data, and lecture sessions with multi-camera support, plus daily reports, historical logs, an analytics dashboard, and academic-administrator, secretariat, and staff roles.",
    },
  ],
};
