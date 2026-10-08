// Questions & answers per project (rendered by ContentQA + FAQPage JSON-LD).
// Answers are grounded in each project's own content.
import type { QAItem } from './types';

export const PROJECT_QA: Record<string, QAItem[]> = {
  "virtual-board-hand-tracking": [
    {
      q: "ما الذي يقدمه اللوح الافتراضي بتتبع حركة اليد؟",
      a: "يتيح اللوح الكتابة والرسم والمسح واختيار الألوان بحركة اليد أمام الكاميرا، دون لمس شاشة أو استخدام قلم إلكتروني. صُمم أساسًا ليكتب المعلم ويتحكم بالمحتوى وهو مواجه للطلاب، ونفذه الطالب بمساعدة تقنية من مكتب تكنو إنجاز.",
      qEn: "What does the virtual board with hand tracking offer?",
      aEn: "The board lets you write, draw, erase, and pick colors with hand movements in front of the camera, without touching a screen or using a stylus. It was designed mainly so a teacher can write and control content while facing the students, and was built by the student with technical assistance from Techno Enjaz.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء اللوح الافتراضي؟",
      a: "اعتمد النموذج على Python لغةً رئيسية مع Anaconda لإدارة بيئة المشروع وVS Code لكتابة الشيفرة. استُخدمت MediaPipe لتتبع اليد وتحديد مواضع الأصابع، وOpenCV لمعالجة الصور والفيديو، وNumPy ضمن عمليات معالجة البيانات.",
      qEn: "What technologies are used to build the virtual board?",
      aEn: "The prototype uses Python as the main language, with Anaconda for environment management and VS Code as the editor. MediaPipe tracks the hand and finger positions, OpenCV handles image and video processing, and NumPy is used in data-processing steps.",
    },
    {
      q: "ما الإيماءات التي يتعرف عليها اللوح؟",
      a: "يُرسم على اللوح بتحريك السبابة والوسطى متقاربتين، ويُختار اللون من لوحة الألوان، ويُمسح جزء من الكتابة بإيماءة مخصصة، ويُمسح اللوح كاملًا بزر Clear. وعند بسط اليد بالكامل يدخل النظام حالة إيقاف مؤقت فلا ينفذ أي أمر رسم أو مسح، للحد من التفاعلات غير المقصودة.",
      qEn: "Which gestures does the board recognize?",
      aEn: "You draw by moving the index and middle fingers held close together, pick a color from the palette, erase part of the writing with a dedicated gesture, and clear the whole board with a Clear button. When the hand is fully open, the system pauses and executes no drawing or erasing command, limiting unintended interactions.",
    },
    {
      q: "ما أبرز التحديات التي ظهرت في تجربة النموذج؟",
      a: "انخفضت دقة التتبع مع حركات الأصابع السريعة أو المعقدة، وتأثر الأداء بالإضاءة المنخفضة جدًا أو المرتفعة. كما سبب وجود أشخاص أو أجسام متحركة أو انعكاسات في مجال الكاميرا تشويشًا، وظهر تأخير طفيف على الأجهزة منخفضة المواصفات.",
      qEn: "What were the main challenges observed while testing the prototype?",
      aEn: "Tracking accuracy dropped with fast or complex finger movements, and performance suffered under very low or very bright lighting. Other people, moving objects, or reflections in the camera's view caused noise, and a slight delay appeared on lower-spec devices.",
    },
    {
      q: "هل نشر المشروع نتائج رقمية لدقة اللوح الافتراضي؟",
      a: "لا، فالمشروع يوثق نتائج وظيفية: عمل الرسم واختيار اللون والإيقاف المؤقت والمسح، مع تحديث للرسم قريب من الزمن الحقيقي في بيئة الاختبار. ولم يعرض قياسات رقمية للدقة أو زمن الاستجابة، أما التحكم الصوتي والواقع المعزز وتطبيق الهاتف فهي أفكار مستقبلية.",
      qEn: "Did the project publish numerical accuracy results for the virtual board?",
      aEn: "No. The project documents functional results: drawing, color selection, pausing, and erasing worked, with near-real-time drawing updates in the test environment. It reports no numerical accuracy or response-time measurements, and voice control, augmented reality, and a phone app are future ideas.",
    },
  ],

  "weapon-detection-yolo-ai": [
    {
      q: "ما هدف نظام الكشف عن الأسلحة بالذكاء الاصطناعي؟",
      a: "يهدف المشروع إلى تطوير نموذج رؤية حاسوبية يكتشف الأسلحة مثل السكين والمسدس من بث كاميرا الحاسوب المحمول أو الهاتف في الزمن الحقيقي، ويعرض موقع السلاح داخل الإطار. وهو حل منخفض التكلفة لا يحتاج إلى معدات خاصة، نُفذ أكاديميًا بمساعدة ودعم تقني من مكتب تكنو إنجاز.",
      qEn: "What is the goal of the AI weapon detection system?",
      aEn: "The project aims to develop a computer vision model that detects weapons such as knives and pistols from a laptop or phone camera feed in real time and shows the weapon's location in the frame. It is a low-cost solution that needs no special equipment, carried out academically with technical assistance and support from Techno Enjaz.",
    },
    {
      q: "ما الأدوات والتقنيات التي يعتمد عليها نظام كشف الأسلحة؟",
      a: "يعتمد النظام على Python مع OpenCV لقراءة بث الكاميرا ومعالجة الإطارات، وعلى Ultralytics YOLOv8 لكشف الأجسام عبر نموذجين مخصصين: knife_model.pt للسكاكين وgun_model.pt للمسدسات. واستُخدمت Anaconda وJupyter Notebook وVisual Studio Code بيئاتٍ للتطوير.",
      qEn: "What tools and technologies does the weapon detection system rely on?",
      aEn: "The system uses Python with OpenCV to read the camera feed and process frames, and Ultralytics YOLOv8 for object detection through two custom models: knife_model.pt for knives and gun_model.pt for pistols. Anaconda, Jupyter Notebook, and Visual Studio Code were used as development environments.",
    },
    {
      q: "كيف تمر الصورة داخل النظام حتى تظهر نتيجة الكشف؟",
      a: "يهيئ البرنامج الكاميرا ويحمّل نموذج YOLO، ثم يدخل حلقة تلتقط الإطار الحالي وتمرره إلى النموذج لتحديد نوع الجسم وموضعه، وتعرض النتيجة فورًا بإطار أصفر يحمل الوسم Target Zone. وتستمر الحلقة حتى يضغط المستخدم المفتاح q.",
      qEn: "How does an image flow through the system until a detection result appears?",
      aEn: "The program initializes the camera and loads the YOLO model, then enters a loop that captures the current frame and passes it to the model to identify the object's type and position, showing the result immediately with a yellow box labeled Target Zone. The loop continues until the user presses the q key.",
    },
    {
      q: "هل توجد نسب دقة منشورة لأداء النموذج؟",
      a: "لا، فالتقرير يوثق حالات كشف ناجحة للسكين والمسدس في بث مباشر ويصف الدقة بأنها جيدة أو مقبولة، دون مؤشرات كمية مثل mAP أو Precision أو Recall أو FPS ودون حجم مجموعة التدريب. أما نسب مثل 87% أو 93% الواردة فيه فتعود إلى دراسات سابقة وليست نتائج هذا النظام.",
      qEn: "Are there published accuracy figures for the model's performance?",
      aEn: "No. The report documents successful knife and pistol detections in a live stream and describes accuracy as good or acceptable, without quantitative indicators such as mAP, Precision, Recall, or FPS and without the training-set size. Figures such as 87% or 93% in the report come from earlier studies, not from this system.",
    },
    {
      q: "ما حدود النسخة الحالية من نظام كشف الأسلحة؟",
      a: "يقتصر الكشف الموثق على السكين والمسدس بنموذجين منفصلين، وجُرّب بكاميرا حاسوب واحدة في بيئة اختبار، ويتأثر بالإضاءة وزوايا ظهور الأجسام. ولم يوثق التقرير تنفيذ إنذار أو إرسال تنبيه خارجي أو تخزين سجلات، وهي ضمن التطويرات المقترحة مع ربطه بكاميرات مراقبة.",
      qEn: "What are the limitations of the current weapon detection version?",
      aEn: "Documented detection is limited to knives and pistols with two separate models, tested with a single laptop camera in a test setting, and is affected by lighting and object angles. The report does not document an alarm, external alerts, or log storage; these are among proposed developments along with connecting surveillance cameras.",
    },
  ],

  "exam-computer-vision-monitoring": [
    {
      q: "ما هو نظام كشف المخالفات في قاعات الامتحانات؟",
      a: "نموذج أولي بالرؤية الحاسوبية نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يحلل إطارات الكاميرا لرصد مؤشرات سلوكية قد ترتبط بالغش، وأبرزها التفات الرأس. وهو أداة مساعدة للمراقب البشري، لا نظام يثبت حدوث الغش.",
      qEn: "What is the exam-hall misconduct detection system?",
      aEn: "A computer vision prototype built by a team of students with technical assistance from Techno Enjaz that analyzes camera frames to flag behavioral indicators that may be linked to cheating, chiefly head turning. It is an assistive tool for the human invigilator, not a system that proves cheating.",
    },
    {
      q: "كيف يعمل النظام؟",
      a: "يحمّل النظام نموذج YOLO لتحديد الشخص، ويلتقط الإطارات من الكاميرا، ويقتطع صورة الشخص ويحولها إلى RGB ثم يمررها إلى MediaPipe لاستخراج معالم الوجه والجسم. بعدها يحلل زاوية التفات الرأس مقارنة بالاتجاه الأمامي، ويرسم إطارًا أحمر حول الوجه عند الالتفات وإطارًا أخضر عند التوجه المستقيم نحو الشاشة.",
      qEn: "How does the system work?",
      aEn: "The system loads a YOLO model to locate the person, captures camera frames, crops the person's image, converts it to RGB, and passes it to MediaPipe to extract face and body landmarks. It then analyzes the head's turning angle relative to the forward direction, drawing a red frame around the face for a head turn and a green frame when facing straight at the screen.",
    },
    {
      q: "ما التقنيات المستخدمة في المشروع؟",
      a: "Python مع مكتبة OpenCV لمعالجة الإطارات والرسم عليها، ونموذج YOLO لكشف الأشخاص، ومكتبة MediaPipe لتقدير الوضعيات واستخراج المعالم، وقد طُوّر في Visual Studio Code على نظام Windows.",
      qEn: "Which technologies does the project use?",
      aEn: "Python with OpenCV for frame processing and drawing, a YOLO model for person detection, and MediaPipe for pose estimation and landmark extraction, developed in Visual Studio Code on Windows.",
    },
    {
      q: "ما النتائج التي حققها النموذج؟",
      a: "في الاختبار العملي صنف النظام الالتفات الطفيف أو الكامل نحو اليمين أو اليسار حالة مشبوهة، والتوجه المستقيم حالة طبيعية، واستجاب فورًا لتغير اتجاه الرأس. لكن الكتاب لا يعرض عدد الحالات المختبرة ولا مقاييس كمية مثل Precision أو Recall، ونسب 95% و94% الواردة فيه تعود إلى دراسات سابقة لا إلى هذا النموذج.",
      qEn: "What results did the prototype achieve?",
      aEn: "In practical testing, the system classified slight or full head turns to the right or left as suspicious and facing straight ahead as normal, responding immediately to changes in head direction. The book does not report the number of test cases or metrics such as Precision or Recall, and the 95% and 94% figures it mentions belong to earlier studies, not this prototype.",
    },
    {
      q: "ما حدود النظام الحالي؟",
      a: "اقتصر التنفيذ على تحليل اتجاه الرأس لشخص أمام كاميرا عادية في بيئة مضبوطة، دون اختبار في قاعات امتحان مزدحمة. والالتفات قد يكون حركة عفوية، لذا تحتاج كل إشارة إلى مراجعة بشرية، كما أن التنبيهات الفورية للمراقبين والسجلات الزمنية مذكورة أهدافًا ولم يُعرض تنفيذها.",
      qEn: "What are the limitations of the current system?",
      aEn: "The implementation only analyzes the head direction of one person in front of an ordinary camera in a controlled setting, without testing in crowded exam halls. A head turn can be innocent, so every flag needs human review, and instant alerts to invigilators and timestamped logs are stated as objectives but not shown as implemented.",
    },
  ],

  "robotic-hand-gesture-control": [
    {
      q: "كيف تتحرك الكف الروبوتية بحسب حركة يد المستخدم؟",
      a: "تلتقط الكاميرا كل إطار وتحوّله إلى صيغة RGB، ثم تحدد خوارزمية كشف اليد نقاطها الرئيسية وتستنتج حالة كل إصبع. تتكون مصفوفة من خمس قيم، فالقيمة 1 تعني إصبعًا مبسوطًا والقيمة 0 إصبعًا مقبوضًا، وتُرسل عبر البلوتوث إلى Arduino UNO الذي يحرك محركات السيرفو لتحاكي الكف الحالة نفسها.",
      qEn: "How does the robotic hand move according to the user's hand motion?",
      aEn: "The camera captures each frame and converts it to RGB, then a hand-detection algorithm locates the hand's key points and infers each finger's state. A five-value array is built, where 1 means an extended finger and 0 a folded one, and is sent over Bluetooth to the Arduino UNO, which drives the servos so the hand mimics the same state.",
    },
    {
      q: "ما المكونات الرئيسية في مشروع الكف الروبوتية؟",
      a: "يضم النموذج كاميرا لالتقاط اليد، ولوحة Arduino UNO بالمتحكم ATmega328P، وستة محركات سيرفو لتحريك أجزاء الكف، ووحدة Bluetooth HC-05 للاتصال اللاسلكي عبر UART، ومنظم جهد DC-DC Step Down مع مصدر طاقة.",
      qEn: "What are the main components of the robotic hand project?",
      aEn: "The prototype includes a camera to capture the hand, an Arduino UNO with the ATmega328P microcontroller, six servo motors to move the hand's parts, an HC-05 Bluetooth module for wireless UART communication, and a DC-DC step-down regulator with a power source.",
    },
    {
      q: "ما تقنية تتبع اليد التي يعتمد عليها المشروع؟",
      a: "يعتمد المشروع على تقدير وضعيات اليد بالرؤية الحاسوبية، ويشرح الكتاب نموذج MediaPipe Hands من Google الذي يحدد 21 نقطة رئيسية على اليد تشمل المفاصل وأطراف الأصابع والمعصم ويعمل بكاميرات بسيطة. ومن هذه النقاط تُستنتج حالة كل إصبع لتوليد أوامر التحكم.",
      qEn: "Which hand-tracking technique does the project rely on?",
      aEn: "The project relies on computer-vision hand pose estimation, and the book explains Google's MediaPipe Hands model, which locates 21 key points on the hand covering the joints, fingertips and wrist and works with simple cameras. Each finger's state is inferred from these points to generate control commands.",
    },
    {
      q: "ما النتائج التي حققها النموذج الأولي للكف الروبوتية؟",
      a: "نجحت الكف في محاكاة بسط الأصابع وقبضها لحظيًا وبسلاسة في العرض العملي، وأظهرت الاختبارات أن الاتصال اللاسلكي كان أكثر كفاءة وموثوقية من السلكي في التحكم بها. ولم يعرض الكتاب قياسات كمية مثل دقة التعرف أو زمن الاستجابة.",
      qEn: "What results did the robotic hand prototype achieve?",
      aEn: "In the practical demonstration the hand mimicked opening and closing the fingers instantly and smoothly, and tests showed the wireless link was more efficient and reliable than a wired one for controlling it. The book reports no quantitative measurements such as recognition accuracy or response time.",
    },
    {
      q: "ما حدود الكف الروبوتية الحالية وكيف يمكن تطويرها؟",
      a: "تتعامل النسخة الحالية مع حالتين لكل إصبع فقط، ولم يُوثَّق اختبار الإمساك بأجسام، وتتأثر دقة التتبع بالإضاءة واختفاء اليد. ويقترح المشروع تحسين الكشف بالتعلم العميق، واستخدام محركات خطوية أو محركات بمشفرات، وإضافة مستشعرات لمس وقوة وكاميرات عمق، وتطوير الكف إلى ذراع روبوتية كاملة.",
      qEn: "What are the current robotic hand's limits and how could it be developed?",
      aEn: "The current version handles only two states per finger, grasping objects was not documented, and tracking accuracy is affected by lighting and occlusion. The project suggests improving detection with deep learning, using stepper or encoder-equipped motors, adding touch, force and depth sensors, and developing the hand into a full robotic arm.",
    },
  ],

  "ai-children-learning-system": [
    {
      q: "ما هو نظام تعليم الأطفال باستخدام الذكاء الاصطناعي؟",
      a: "هو نموذج أولي لنظام تعليمي تفاعلي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. يوجه الطفل الكاميرا نحو شيء من محيطه فيعرض النظام اسمه وينطقه بصوت مسموع، كما يحدد لون الشيء ويتعرف على الأشياء في الصور المحمّلة، بهدف توسيع مفردات الطفل وربط الأسماء بالأشياء الحقيقية.",
      qEn: "What is the AI-powered children's learning system?",
      aEn: "It is a prototype interactive learning system built by a team of students with technical assistance from Techno Enjaz. The child points the camera at an everyday object and the system displays its name and speaks it aloud; it also identifies the object's color and recognizes objects in uploaded images, with the aim of expanding children's vocabulary and linking names to real objects.",
    },
    {
      q: "كيف يعمل النظام؟",
      a: "تضم الواجهة الرسومية ثلاثة أزرار: الأول يشغل الكاميرا ليتعرف نموذج YOLOv8 على الشيء الظاهر ويعرض اسمه وينطقه، والثاني يحمّل صورة من الجهاز فيكتب النظام أسماء الأشياء الموجودة فيها، والثالث يحدد لون الشيء الموضوع أمام الكاميرا بعد تحويل الإطار إلى نموذج الألوان HSV.",
      qEn: "How does the system work?",
      aEn: "The graphical interface has three buttons: the first starts the camera so that YOLOv8 recognizes the object in view and displays and speaks its name; the second uploads an image from the device and the system writes the names of the objects in it; the third identifies the color of an object held in front of the camera after converting the frame to the HSV color model.",
    },
    {
      q: "ما التقنيات المستخدمة في نظام تعليم الأطفال؟",
      a: "بُني النظام بلغة Python داخل بيئة Anaconda، ويستخدم YOLOv8 عبر مكتبة ultralytics للتعرف على الأشياء، وOpenCV لالتقاط الفيديو ومعالجة الصور، ونموذج HSV لتحليل الألوان، وTkinter لبناء الواجهة. واستُخدمت Jupyter Notebook وVS Code لكتابة الأكواد وتجربتها.",
      qEn: "What technologies does the children's learning system use?",
      aEn: "The system was built in Python within an Anaconda environment. It uses YOLOv8 through the ultralytics library for object recognition, OpenCV for video capture and image processing, the HSV model for color analysis, and Tkinter for the interface. Jupyter Notebook and VS Code were used to write and test the code.",
    },
    {
      q: "ما نتائج اختبار النظام؟",
      a: "اختُبر النظام على أشياء مثل كرة وكتاب وقلم وكوب في إضاءة مختلفة، وعلى ألوان أساسية كالأحمر والأخضر والأزرق، وعلى صور تحتوي حيوانات وأدوات منزلية، ونجح في المهام الثلاث وكان أفضل في الإضاءة الجيدة. لكن المشروع لم يعرض قيمًا كمية للدقة أو السرعة، لذلك تمثل النتائج إثباتًا وظيفيًا لنموذج أولي.",
      qEn: "What were the system's test results?",
      aEn: "The system was tested on objects such as a ball, a book, a pen, and a cup under different lighting, on basic colors such as red, green, and blue, and on images containing animals and household items, and it succeeded at all three tasks, performing best in good lighting. The project reports no quantitative accuracy or speed values, so the results are a functional proof of a prototype.",
    },
    {
      q: "ما حدود النسخة الحالية من النظام؟",
      a: "تتأثر دقة كشف الألوان بالإضاءة والانعكاسات والظلال، ويحدث التباس بين الأجسام المتشابهة أو المحجوبة جزئيًا، ويقل الأداء على الأجهزة الضعيفة ومع الصور الضبابية. كما أن النسخة الموثقة تطبيق حاسوبي، ويبقى تطبيق الهاتف ودعم لغات متعددة والألعاب التعليمية ضمن التطويرات المقترحة.",
      qEn: "What are the limitations of the current version?",
      aEn: "Color detection is affected by lighting, reflections, and shadows; objects that look alike or are partly hidden can be confused; and performance drops on weak devices and with blurry images. The documented version is a desktop application, while a mobile app, multi-language support, and learning games remain proposed developments.",
    },
  ],

  "interactive-children-ai-learning-system": [
    {
      q: "ما الوظائف التعليمية التي يقدمها النظام التفاعلي للأطفال؟",
      a: "يقدم النظام ثلاث وظائف: التعرف على الحيوانات، والتعرف على الألوان، والتعرف على الأرقام من خلال كاميرا الحاسوب. تجمعها واجهة رسومية واحدة مبنية بـ Tkinter، ويعرض النظام النتيجة على الشاشة ثم يشغّل ملفًا صوتيًا عربيًا مسجلًا ينطقها. نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز.",
      qEn: "What educational functions does the interactive system offer children?",
      aEn: "The system offers three functions: recognizing animals, colors, and numbers through the computer's camera. A single Tkinter interface ties them together; the system shows the result on screen and then plays a pre-recorded Arabic audio file that pronounces it. It was built by a team of students with technical assistance from Techno Enjaz.",
    },
    {
      q: "كيف يعمل النظام تقنيًا؟",
      a: "تلتقط الكاميرا الإطار ويخضع لمعالجة مسبقة عبر OpenCV، ثم يُمرَّر إلى نموذج YOLO11 لكشف الحيوانات، أو يُحوَّل إلى فضاء HSV ويُقارن بعتبات كل لون، أو يُقرأ بتقنية OCR لاستخراج الرقم. بعدها يُعرض اسم العنصر وتشغّل مكتبة Playsound الملف الصوتي المطابق تلقائيًا.",
      qEn: "How does the system work technically?",
      aEn: "The camera captures a frame that is preprocessed with OpenCV, then passed to a YOLO11 model for animal detection, converted to HSV and compared with per-color thresholds, or read with OCR to extract the number. The item's name is then displayed and the Playsound library plays the matching audio file automatically.",
    },
    {
      q: "ما نتائج نماذج YOLO11 في كشف الحيوانات؟",
      a: "سجّل نموذج العُقاب mAP50 بقيمة 0.956 وF1 بقيمة 0.92، ونموذج القطط mAP50 بقيمة 0.992 وF1 بقيمة 0.98، ونموذج الأسماك mAP50 بقيمة 0.856 وF1 بقيمة 0.81، مع أزمنة استدلال 18.8 و28.4 و21.2 ms على الترتيب. وتعكس هذه القيم أداء نماذج الكشف ضمن اختبارات المشروع، لا دقة موحدة للنظام كاملًا.",
      qEn: "What results did the YOLO11 models achieve in animal detection?",
      aEn: "The eagle model recorded mAP50 of 0.956 and F1 of 0.92, the cats model mAP50 of 0.992 and F1 of 0.98, and the fish model mAP50 of 0.856 and F1 of 0.81, with inference times of 18.8, 28.4, and 21.2 ms respectively. These values reflect the detection models' performance in the project's tests, not a single accuracy figure for the whole system.",
    },
    {
      q: "ما مدى دقة النظام في التعرف على الأرقام والألوان؟",
      a: "في اختبار مباشر للأرقام من 1 إلى 10 قُرئت 7 عينات قراءة صحيحة، مع أخطاء مثل قراءة 5 على أنه S و8 على أنه B، كما يعرض التقرير تقييمًا منفصلًا لـ EasyOCR بدقة 87.4%. أما الألوان فاختُبرت يدويًا بعشرة ألوان دون نسبة دقة نهائية في التقرير، وتتأثر بالإضاءة والظلال ونوع الكاميرا.",
      qEn: "How accurate is the system at recognizing numbers and colors?",
      aEn: "In a direct test of the digits 1 to 10, 7 samples were read correctly, with errors such as reading 5 as S and 8 as B, and the report also presents a separate EasyOCR evaluation at 87.4% accuracy. Colors were tested manually with ten colors without a final accuracy figure in the report, and they are affected by lighting, shadows, and camera type.",
    },
    {
      q: "هل قيس أثر النظام على تحصيل الأطفال التعليمي؟",
      a: "لا، فالمواد المتاحة لا تتضمن دراسة تربوية تقيس تحسن التحصيل أو أثر النظام على تعلم الأطفال، وتقتصر النتائج على الأداء التقني والتجارب البرمجية الموثقة. وتبقى إضافات مثل التعرف على الصوت ودعم لغات متعددة والتعلم التكيفي والواقع المعزز مقترحات مستقبلية.",
      qEn: "Was the system's impact on children's learning outcomes measured?",
      aEn: "No. The available materials include no educational study measuring learning gains or the system's effect on children's learning, and results are limited to technical performance and documented software experiments. Additions such as speech recognition, multi-language support, adaptive learning, and augmented reality remain future proposals.",
    },
  ],

  "remote-controlled-ground-robot": [
    {
      q: "ما هو مشروع الروبوت الأرضي متعدد الاتصالات؟",
      a: "هو نموذج أولي لروبوت أرضي يُتحكم به عن بُعد، نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز ضمن مشروع أكاديمي بعنوان «تصميم وتنفيذ روبوت لتنفيذ مهام خاصة». يجمع الروبوت التحكم المضمن بلوحة Arduino UNO مع ثلاث قنوات اتصال لاسلكي وكاميرا تحلل صورها خوارزمية YOLO على الحاسوب.",
      qEn: "What is the multi-link ground robot project?",
      aEn: "It is a prototype of a remotely controlled ground robot, built by a team of students with technical assistance from Techno Enjaz as an academic project titled \"Design and Implementation of a Robot for Special Tasks\". The robot combines embedded control on an Arduino UNO with three wireless links and a camera whose images are analyzed with YOLO on a computer.",
    },
    {
      q: "كيف يُتحكم بالروبوت وكيف تنتقل صور الكاميرا؟",
      a: "يرسل المشغّل أوامر الحركة من لوحة مفاتيح الحاسوب عبر سكربت Python إلى وحدة البلوتوث HC-05، فتعالجها Arduino UNO وتقود المحركات عبر دارة L298N في أربعة اتجاهات. أما الكاميرا فتتصل بالحاسوب عبر Wi-Fi وعنوان IP بشكل منفصل عن البلوتوث، ويُستخدم اتصال RF 433MHz للتحكم بوحدة حمولة منفصلة.",
      qEn: "How is the robot controlled and how do camera images travel?",
      aEn: "The operator sends motion commands from the computer keyboard through a Python script to the HC-05 Bluetooth module; the Arduino UNO processes them and drives the motors through the L298N in four directions. The camera connects to the computer over Wi-Fi via an IP address, separately from Bluetooth, and a 433 MHz RF link controls a separate payload module.",
    },
    {
      q: "ما المكونات التي بُني منها الروبوت الأرضي؟",
      a: "تضم دارة الروبوت Arduino UNO ودارة القيادة L298N ومحركات DC من نوع TT ووحدة HC-05 ومرسل RF433MHz ومحركي سيرفو MG995 ووحدة الصوت MP3-TF-16P ومنظم جهد DC-DC يخفض 12 فولت إلى 5 فولت. وتضم دارة الحمولة المنفصلة Arduino Nano ومستقبل RF433MHz ومحرك سيرفو SG90 ووحدة صوت.",
      qEn: "What components is the ground robot built from?",
      aEn: "The robot circuit includes an Arduino UNO, an L298N driver, TT DC motors, an HC-05 module, an RF433MHz transmitter, two MG995 servos, an MP3-TF-16P audio module and a DC-DC regulator stepping 12 V down to 5 V. The separate payload circuit includes an Arduino Nano, an RF433MHz receiver, an SG90 servo and an audio module.",
    },
    {
      q: "ما نتائج نمذجة هوائي HC-05 في برنامج CST؟",
      a: "أظهرت المحاكاة الكهرومغناطيسية في CST ترددًا مركزيًا قدره 2.3819 GHz ضمن مجال من 2.3555 إلى 2.4074 GHz، وأفضل نسبة موجات واقفة SWR تقارب 1.2 عند الرنين، وتوجيهية 4.710 dBi عند 2.4 GHz. وهي نتائج نمذجة تدل على توافق جيد بين الهوائي وخط النقل، وليست قياسات مخبرية.",
      qEn: "What were the results of modeling the HC-05 antenna in CST?",
      aEn: "The electromagnetic simulation in CST showed a center frequency of 2.3819 GHz within a band from 2.3555 to 2.4074 GHz, a best standing wave ratio of about 1.2 at resonance, and a directivity of 4.710 dBi at 2.4 GHz. These are modeling results indicating good matching between the antenna and the transmission line, not lab measurements.",
    },
    {
      q: "هل الروبوت جاهز للاستخدام الميداني؟",
      a: "لا، فهو نموذج مختبري جُرّب في بيئة محاكاة، ولا يحمل أي سلاح أو ذخيرة أو مواد متفجرة، إذ تُحاكى الاستجابات بمقاطع صوتية مخزنة. ولم يوثق الكتاب قياسات كمية مثل دقة الكشف أو مدى الاتصال، والتحكم يدوي من حاسوب محمول دون ملاحة ذاتية.",
      qEn: "Is the robot ready for field use?",
      aEn: "No. It is a lab prototype tested in a simulated environment and carries no weapon, ammunition or explosive material; its responses are simulated with stored audio clips. The book documents no quantitative measurements such as detection accuracy or link range, and control is manual from a laptop without autonomous navigation.",
    },
  ],

  "syrian-tourism-app": [
    {
      q: "ما الخدمات التي يجمعها التطبيق السياحي الذكي؟",
      a: "يجمع التطبيق استكشاف الوجهات السياحية ووصفها وتجارب الزوار، ودليل المدينة ونصائح السفر، وحجز الفنادق مع الفواتير وتفاصيل الحجز. ويضم متجرًا للمنتجات الحرفية بسلة تسوق وطلبات، ومدونة ومقالات سياحية، والمفضلة والتنبيهات.",
      qEn: "What services does the smart tourism app combine?",
      aEn: "The app combines exploring tourist destinations with descriptions and visitor experiences, a city guide and travel tips, and hotel booking with invoices and booking details. It also includes a handicraft store with a shopping cart and orders, a tourism blog and articles, and favorites and notifications.",
    },
    {
      q: "ما التقنيات المستخدمة في تطوير التطبيق السياحي؟",
      a: "طُوّر تطبيق الهاتف بـFlutter وDart ببنية طبقية، وبُني الجانب الخلفي وواجهات REST API ولوحة الإدارة بـLaravel وPHP وفق نمط MVC مع Eloquent ORM. وتُخزن البيانات في قاعدة MySQL مركزية على خادم Apache، وتستخدم لوحة الإدارة Bootstrap وJavaScript.",
      qEn: "What technologies were used to develop the tourism app?",
      aEn: "The mobile app was built with Flutter and Dart in a layered structure, and the back end, REST APIs, and admin dashboard with Laravel and PHP following MVC with Eloquent ORM. Data is stored in a central MySQL database on an Apache server, and the admin dashboard uses Bootstrap and JavaScript.",
    },
    {
      q: "من هم المستخدمون الذين يخدمهم التطبيق؟",
      a: "يخدم ثلاثة أدوار: السائح الذي يستكشف المواقع ويحجز ويقيّم ويشارك تجربته، والحرفي الذي يضيف منتجاته ويتابع طلبات الشراء، ومدير النظام الذي يراجع المقالات قبل النشر ويدير المواقع والفنادق والمستخدمين والحجوزات والطلبات من لوحة التحكم.",
      qEn: "Which users does the app serve?",
      aEn: "It serves three roles: tourists, who explore sites, book, rate, and share experiences; artisans, who add their products and follow purchase orders; and system administrators, who review articles before publication and manage sites, hotels, users, bookings, and orders from the dashboard.",
    },
    {
      q: "كيف صُممت قاعدة بيانات التطبيق؟",
      a: "صُممت قاعدة MySQL علائقية تضم جداول للمستخدمين وملفاتهم وأرقام هواتفهم، وللمتجر من منتجات وفئات وسلة وطلبات، وللمواقع السياحية بالإحداثيات والأنشطة، وللفنادق وأنواع الغرف والغرف والحجوزات. وتعتمد المفضلة والتقييمات والتعليقات بنية متعددة الأهداف تطبق على عدة كيانات.",
      qEn: "How was the app's database designed?",
      aEn: "A relational MySQL database with tables for users, their profiles, and phone numbers; the store's products, categories, cart, and orders; tourist sites with coordinates and activities; and hotels, room types, rooms, and bookings. Favorites, ratings, and comments use a polymorphic structure that applies to several entities.",
    },
    {
      q: "هل أثبت التطبيق زيادة فعلية في السياحة؟",
      a: "لا، فلا توجد بيانات تشغيلية تقيس أثرًا اقتصاديًا أو زيادة فعلية في السياحة، والنظام نموذج أكاديمي لم يُطلق للعامة. ويصف المشروع نتائج اختباره بأنها مبدئية تشير إلى استقرار المنصة وسلاسة التنقل، ولا يتضمن بعد بوابات دفع إلكتروني دولية أو واجهات متعددة اللغات.",
      qEn: "Did the app prove an actual increase in tourism?",
      aEn: "No. There is no operational data measuring economic impact or an actual increase in tourism, and the system is an academic prototype not launched to the public. The project describes its test results as preliminary, indicating a stable platform and smooth navigation, and it does not yet include international payment gateways or multilingual interfaces.",
    },
  ],

  "employee-presence-tracking": [
    {
      q: "ما هو نظام مراقبة الحضور داخل مناطق العمل؟",
      a: "نموذج أولي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يحلل فيديو بيئة عمل ليكشف الأشخاص ويتتبعهم داخل مناطق عمل محددة ويحسب مدة وجود كل متتبع داخل منطقته. تُحفظ النتائج مع رقم المكتب والتاريخ وتُصدَّر إلى ملف Excel للمراجعة.",
      qEn: "What is the work-area attendance monitoring system?",
      aEn: "A prototype built by a team of students with technical assistance from Techno Enjaz that analyzes workplace video to detect people, track them inside defined work areas, and compute how long each tracked person stays in their area. Results are stored with the office number and date and exported to an Excel file for review.",
    },
    {
      q: "كيف يعمل النظام تقنيًا؟",
      a: "يكشف YOLOv8 الأشخاص في كل إطار، ويحافظ DeepSORT على معرف تتبع لكل شخص عبر الإطارات، ثم يُقارن موقعه بمنطقة العمل المعرفة مسبقًا. ويحسب منطق زمني مبني على datetime وpandas مدة التواجد بالثواني، وتتحول حدود المنطقة إلى اللون الأحمر عند مغادرة صاحبها لها.",
      qEn: "How does the system work technically?",
      aEn: "YOLOv8 detects people in each frame, DeepSORT keeps a tracking ID for each person across frames, and each position is compared with the predefined work area. Timing logic built on datetime and pandas computes presence in seconds, and the area border turns red when its occupant leaves.",
    },
    {
      q: "هل يتعرف النظام على هوية الموظف؟",
      a: "لا في النسخة الحالية. يعتمد النظام على معرفات تتبع داخل الفيديو، ومعرف التتبع لا يساوي تلقائيًا هوية موظف مؤكدة. ويذكر المشروع التعرف على الوجه بوصفه تطويرًا مستقبليًا، لا وظيفة مثبتة.",
      qEn: "Does the system identify the employee?",
      aEn: "Not in the current version. It relies on tracking IDs within the video, and a tracking ID does not automatically equal a confirmed employee identity. The project lists face recognition as a future development, not a proven feature.",
    },
    {
      q: "ما النتائج الموثقة للنموذج؟",
      a: "اختُبر النموذج على فيديو يحاكي مشهدًا مكتبيًا، ونجح وظيفيًا في كشف الأشخاص وتتبعهم وحساب زمن تواجدهم داخل مناطقهم ورصد مغادرة أحدهم لمنطقته وتصدير البيانات إلى Excel. ولم يعرض المصدر مقاييس كمية مثل Precision أو mAP أو FPS أو IDF1، لذلك لا تُنسب للنموذج نسب دقة.",
      qEn: "What results are documented?",
      aEn: "The prototype was tested on a video simulating an office scene and worked functionally: detecting and tracking people, computing their presence time in their areas, flagging when one left their area, and exporting data to Excel. The source reports no quantitative metrics such as Precision, mAP, FPS, or IDF1, so no accuracy figures are attributed to it.",
    },
    {
      q: "ما الذي يلزم قبل استخدام نظام كهذا في شركة فعلية؟",
      a: "يحتاج النظام إلى اختبار في ظروف تشغيل حقيقية بإضاءة وكثافة أشخاص مختلفة، وطبقة تحقق موثوقة من هوية الموظف، وقياس دقة الكشف والتتبع وحساب الزمن. كما يتطلب ضوابط واضحة للخصوصية تشمل الموافقة والغرض من المراقبة وصلاحيات الوصول وفترة الاحتفاظ بالتسجيلات.",
      qEn: "What is needed before using such a system in a real company?",
      aEn: "It would need testing under real operating conditions with varied lighting and crowd density, a reliable employee identity-verification layer, and measurement of detection, tracking, and timing accuracy. It also requires clear privacy controls covering consent, the purpose of monitoring, access rights, and retention of recordings.",
    },
  ],

  "student-university-guide-app": [
    {
      q: "ما المشكلة التي يعالجها تطبيق دليل الطالب الرقمي؟",
      a: "يعالج التطبيق صعوبة وصول الطلاب إلى معلومات دقيقة ومحدثة عن اختصاصاتهم ومقرراتهم وخططهم الدراسية والكادر التدريسي، بسبب تشتتها بين مصادر شفهية وورقية. ويوفر نقطة وصول رقمية موحدة مع بحث شامل، ولوحة إدارة لتحديث المحتوى دوريًا.",
      qEn: "What problem does the digital student guide app address?",
      aEn: "The app addresses students' difficulty in finding accurate, up-to-date information about their majors, courses, study plans, and teaching staff, which is scattered across verbal and paper sources. It provides a unified digital access point with global search and an administration dashboard for updating content regularly.",
    },
    {
      q: "كيف يعمل المساعد الافتراضي في دليل الطالب؟",
      a: "يرسل التطبيق سؤال المستخدم إلى Google Gemini مع قائمة الأسئلة الشائعة كاملة، ويطلب منه إرجاع السؤال المطابق تمامًا أو عبارة \"غير متوفر\". عند وجود تطابق تُعرض الإجابة المعتمدة المخزنة في التطبيق والمأخوذة من الموقع الرسمي، وإلا يعتذر المساعد ويقترح سؤالًا آخر، فهو لا يولّد إجابات أكاديمية مفتوحة.",
      qEn: "How does the virtual assistant in the student guide work?",
      aEn: "The app sends the user's question to Google Gemini together with the full FAQ list and asks it to return the exactly matching question or \"not available\". On a match, the approved answer stored in the app, taken from the official website, is shown; otherwise the assistant apologizes and suggests another question, so it does not generate open-ended academic answers.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء تطبيق دليل الطالب؟",
      a: "بُني تطبيق الهاتف بـFlutter وDart، والجانب الخلفي ولوحة الإدارة بـLaravel وPHP وفق نمط MVC مع نماذج Eloquent وقاعدة بيانات علائقية. وتُحمى واجهات API برموز Laravel Sanctum، بينما يدخل المديرون بجلسات عبر حارس مستقل، ويُستخدم Google Gemini للمساعد الافتراضي.",
      qEn: "What technologies were used to build the student guide app?",
      aEn: "The mobile app was built with Flutter and Dart, and the back end and admin dashboard with Laravel and PHP following MVC, with Eloquent models and a relational database. APIs are secured with Laravel Sanctum tokens, administrators log in through sessions on a separate guard, and Google Gemini powers the virtual assistant.",
    },
    {
      q: "ما الواجهات التي يوفرها التطبيق ولوحة الإدارة؟",
      a: "يضم التطبيق واجهة رئيسية بوضع ليلي، وملفًا شخصيًا، وبحثًا شاملًا، والاختصاصات وخططها الدراسية، والمقررات حسب السنة من الأولى إلى الخامسة، والمساعد الافتراضي، وإنجازات الجامعة. وتتيح لوحة الإدارة إدارة الكليات والاختصاصات والمقررات ومراجعة طلبات التسجيل وإدارة المديرين وأدوارهم.",
      qEn: "What screens do the app and admin dashboard provide?",
      aEn: "The app includes a home screen with dark mode, a profile, global search, majors with their study plans, courses by year from first to fifth, the virtual assistant, and university achievements. The admin dashboard manages faculties, majors, and courses, reviews registration requests, and manages administrators and their roles.",
    },
    {
      q: "هل يرتبط التطبيق بأنظمة الدرجات والجداول الرسمية وما نتائجه؟",
      a: "لا، فالتطبيق ليس نظام معلومات جامعيًا رسميًا، ويعمل على Android فقط مع تحديث يدوي للبيانات من لوحة الإدارة. ويذكر المشروع تحسنًا يُقدَّر بنحو 25% في سرعة الوصول إلى المعلومة و40% في التفاعل، دون توضيح عدد المشاركين أو طريقة القياس.",
      qEn: "Is the app linked to official grades and timetable systems, and what were its results?",
      aEn: "No. The app is not an official university information system; it runs on Android only and its data is updated manually from the admin dashboard. The project reports an estimated improvement of about 25% in speed of finding information and 40% in engagement, without stating the number of participants or the measurement method.",
    },
  ],

  "ultrasonic-water-level-monitoring-project": [
    {
      q: "كيف يقيس النظام مستوى الماء داخل الخزان؟",
      a: "يرسل مستشعر HC-SR04 المثبت أعلى الخزان موجات فوق صوتية نحو سطح الماء ويقيس زمن عودة الصدى، ثم تُحسب المسافة بضرب الزمن في سرعة الصوت (نحو 343 م/ث) وقسمة الناتج على 2. يحول Arduino Nano هذه المسافة إلى نسبة مئوية لمستوى الماء وفق الحدين الأدنى والأعلى لارتفاع الخزان، ثم تُعرض على شاشة LCD وتُرسل إلى الهاتف.",
      qEn: "How does the system measure the water level inside the tank?",
      aEn: "The HC-SR04 sensor mounted at the top of the tank sends ultrasonic waves toward the water surface and measures the echo return time; distance is time multiplied by the speed of sound (about 343 m/s) divided by 2. The Arduino Nano converts this distance into a water-level percentage based on the tank's minimum and maximum height limits, then shows it on an LCD and sends it to the phone.",
    },
    {
      q: "ما المكونات المستخدمة في نظام قياس مستوى الماء؟",
      a: "يتكون النظام من لوحة Arduino Nano للمعالجة، ومستشعر HC-SR04 بمجال قياس 2–400 سم، وشاشة LCD 16×2 للعرض المحلي، ووحدة HC-05 Bluetooth لنقل البيانات. وبُني تطبيق الهاتف باستخدام MIT App Inventor، وكُتب برنامج المتحكم في Arduino IDE.",
      qEn: "What components does the water level measurement system use?",
      aEn: "The system consists of an Arduino Nano board for processing, an HC-SR04 sensor with a 2–400 cm range, a 16×2 LCD for local display, and an HC-05 Bluetooth module for data transfer. The phone app was built with MIT App Inventor, and the controller program was written in the Arduino IDE.",
    },
    {
      q: "هل يمكن متابعة مستوى الماء عبر الإنترنت؟",
      a: "لا، فالنسخة الموثقة تعتمد على Bluetooth عبر وحدة HC-05 لإرسال القراءة إلى تطبيق هاتف بُني باستخدام MIT App Inventor. لذلك تتم المتابعة ضمن نطاق اتصال Bluetooth فقط. ويُطرح استبدال Bluetooth بتقنية مثل Wi-Fi أو Zigbee كتطوير مستقبلي وليس جزءًا من النسخة الحالية.",
      qEn: "Can the water level be monitored over the internet?",
      aEn: "No. The documented version relies on Bluetooth via an HC-05 module to send the reading to a phone app built with MIT App Inventor, so monitoring works only within Bluetooth range. Replacing Bluetooth with a technology such as Wi-Fi or Zigbee is proposed as a future development, not part of the current version.",
    },
    {
      q: "ما نتائج اختبار نظام قياس مستوى الماء؟",
      a: "اختُبر النموذج في ثلاث حالات: عرض 0% عند الخزان الفارغ، وقراءة تقارب 58% عند مستوى قريب من المنتصف، و100% عند الامتلاء. وهذه اختبارات وظيفية للنموذج الأولي، إذ لا تتضمن المواد اختبار معايرة موسعًا أو نسبة خطأ موثقة على كامل مجال القياس.",
      qEn: "What were the results of testing the water level measurement system?",
      aEn: "The prototype was tested in three cases: 0% displayed with an empty tank, a reading near 58% at a mid-level, and 100% when full. These are functional tests of the prototype; the materials do not include extended calibration testing or a documented error rate across the full measurement range.",
    },
    {
      q: "ما التحديات التي ظهرت أثناء تطوير النموذج؟",
      a: "احتاج ربط المستشعر وشاشة LCD ووحدة Bluetooth مع Arduino إلى تعديلات متكررة في التوصيلات والبرمجة. كما أثرت الحرارة والرطوبة بشكل طفيف على قراءة المستشعر فاستُخدمت معادلات تصحيح، وظهرت انقطاعات مؤقتة في Bluetooth عند زيادة المسافة أو وجود تداخل. أنجز الطالب المشروع بمساعدة مكتب تكنو إنجاز.",
      qEn: "What challenges emerged during the prototype's development?",
      aEn: "Connecting the sensor, LCD, and Bluetooth module to the Arduino required repeated wiring and code changes. Temperature and humidity slightly affected the sensor reading, so correction equations were used, and temporary Bluetooth dropouts appeared with greater distance or interference. The student completed the project with assistance from the Techno Enjaz office.",
    },
  ],

  "news-fact-checking-platform": [
    {
      q: "ما هي منصة الأخبار الرسمية لمكافحة الأخبار المزيفة؟",
      a: "هي منصة ويب أكاديمية نفذها فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، لتكون مرجعًا رسميًا تنشر عبره الجهات المختصة الأخبار المعتمدة وتصحح الادعاءات المضللة في سوريا بعد التحرير. يستطيع المستخدمون الإبلاغ عن محتوى خارجي مشكوك فيه، ويتولى المحررون التحقق منه ونشر الرد الرسمي.",
      qEn: "What is the Official News Platform for Combating Fake News?",
      aEn: "It is an academic web platform built by a team of students with technical assistance from Techno Enjaz, intended as an official reference where competent authorities publish verified news and correct misleading claims in post-liberation Syria. Users can report suspicious external content, and editors verify it and publish the official response.",
    },
    {
      q: "كيف تعمل آلية الإبلاغ والتحقق في المنصة؟",
      a: "يرسل المستخدم المسجل بلاغًا يتضمن عنوانًا ورابط المصدر ونص الادعاء مع صور داعمة اختيارية، فيظهر في قائمة البلاغات قيد المراجعة لدى المحرر. يحدد المحرر حالة الخبر (حقيقي أو مزيف أو قيد التحقق) وينشر منشورًا رسميًا يُربط به البلاغ، وعند التكذيب يُربط الخبر المزيف بمنشور التصحيح في واجهة مقارنة.",
      qEn: "How does the reporting and verification process work on the platform?",
      aEn: "A registered user submits a report with a title, the source link, and the claim text, optionally with supporting images, and it appears in the editor's pending reports list. The editor sets the item's status (true, fake, or under verification) and publishes an official post that the report is linked to; when a claim is debunked, the fake item is linked to the correction in a comparison view.",
    },
    {
      q: "هل تكشف المنصة الأخبار المزيفة تلقائيًا بالذكاء الاصطناعي؟",
      a: "لا، فالتحقق في النسخة المنفذة يعتمد على المراجعة البشرية من قبل المحررين. أما نماذج تعلم الآلة لتحليل الأنماط اللغوية أو شبكات انتشار الروابط وترتيب البلاغات حسب درجة الشك فمطروحة كتطوير مستقبلي، والنسب المذكورة في الدراسات السابقة لا تخص هذه المنصة.",
      qEn: "Does the platform detect fake news automatically with AI?",
      aEn: "No. Verification in the implemented version relies on human review by editors. Machine learning models that analyze linguistic patterns or link propagation networks and prioritize reports by suspicion level are proposed as future work, and the accuracy figures cited from prior studies do not belong to this platform.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء منصة التحقق من الأخبار؟",
      a: "بُنيت المنصة بإطار Laravel وفق نمط MVC ولغة PHP، مع قاعدة بيانات MySQL نُفذت عبر Laravel Migrations، وبيئة تطوير XAMPP مع خادم Apache. واستُخدمت HTML وCSS وBootstrap وJavaScript للواجهات مع دعم العربية واتجاه RTL، وتضم قاعدة البيانات جداول للمستخدمين والمحافظات والمناطق والمنشورات ووسائطها والبلاغات وصورها والمفضلة.",
      qEn: "Which technologies were used to build the fact-checking platform?",
      aEn: "The platform uses the Laravel framework with the MVC pattern and PHP, a MySQL database implemented through Laravel Migrations, and an XAMPP development environment with the Apache server. HTML, CSS, Bootstrap, and JavaScript were used for the interfaces with Arabic and RTL support, and the database includes tables for users, governorates, regions, posts and their media, reports and their images, and favorites.",
    },
    {
      q: "ما الأدوار المتاحة في المنصة وما حدود النسخة الحالية؟",
      a: "تضم المنصة أربعة أدوار متدرجة: الزائر، والمستخدم المسجل، والمحرر، ومدير النظام الذي يدير المستخدمين والمحافظات والمناطق ومعلومات الموقع. ومن حدود النسخة الحالية أن التحقق يدوي بالكامل، والبحث بالكلمات المفتاحية والمحافظة فقط، ولا توجد إشعارات فورية أو لوحة إحصاءات، ولم تُوثق قياسات أداء أو تجربة مع مستخدمين فعليين.",
      qEn: "What roles does the platform offer, and what are the limits of the current version?",
      aEn: "The platform has four tiered roles: guest, registered user, editor, and system administrator, who manages users, governorates, regions, and site information. Current limits include fully manual verification, search by keyword and governorate only, no instant notifications or analytics dashboard, and no documented performance measurements or trial with real users.",
    },
  ],

  "face-recognition-access-control-project": [
    {
      q: "ما هو نظام التحكم في الدخول بالتعرف على الوجه في هذا المشروع؟",
      a: "هو نموذج أولي أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يتحكم في الدخول إلى منطقة حساسة ضمن سيناريو خزينة بنك. يعتمد على كاميرا اللابتوب المدمجة ويميز آليًا بين الأشخاص المصرح لهم وغير المصرح لهم بمقارنة وجوههم بصور مرجعية.",
      qEn: "What is the face-recognition access control system in this project?",
      aEn: "It is an academic prototype built by a team of students with technical assistance from Techno Enjaz to control entry to a sensitive area within a bank-vault scenario. It relies on the laptop's built-in camera and automatically distinguishes authorized from unauthorized people by comparing their faces with reference photos.",
    },
    {
      q: "ماذا يفعل النظام عند ظهور وجه غير معروف؟",
      a: "عندما لا يجد النظام تطابقًا مع الصور المرجعية يحيط الوجه بإطار أحمر مع عبارة Unknown، ويحفظ صورته تلقائيًا في مجلد غير المصرح لهم، ويطلق إنذارًا صوتيًا عبر مكتبة playsound. أما عند التعرف على شخص مصرح له فيظهر اسمه فوق إطار أخضر ويُسجل وقت دخوله.",
      qEn: "What does the system do when an unknown face appears?",
      aEn: "When the system finds no match against the reference photos, it frames the face in red with the label Unknown, saves its image automatically to the unauthorized folder, and triggers an audible alarm through the playsound library. When an authorized person is recognized, their name appears above a green frame and their entry time is logged.",
    },
    {
      q: "ما المكتبات والتقنيات المستخدمة في النظام؟",
      a: "بُني النموذج بلغة Python ضمن بيئة Anaconda وJupyter Notebook. تتولى OpenCV الوصول إلى الكاميرا وقراءة الإطارات وتصغيرها، وتكتشف مكتبة face-recognition المبنية على dlib الوجوه وتستخرج خصائصها وتقارنها بالصور المرجعية، بينما تطلق مكتبة playsound التنبيه الصوتي.",
      qEn: "Which libraries and technologies does the system use?",
      aEn: "The prototype was built in Python within Anaconda and Jupyter Notebook. OpenCV handles camera access, frame reading, and downscaling; the dlib-based face-recognition library detects faces, extracts their features, and compares them with reference photos; and playsound triggers the audible alert.",
    },
    {
      q: "هل استُخدم النظام داخل بنك فعلي وهل له نسبة دقة موثقة؟",
      a: "لا، فخزينة البنك سيناريو تطبيقي اختير لدراسة التعرف على الوجه في التحكم بالوصول إلى المناطق الحساسة، ولا تشير المواد إلى نشره في بنك. وعرض المشروع اختبارات مصورة تثبت عمل المسار الوظيفي، أما قيم مثل استجابة 2–3 ثوانٍ ومعدل خطأ أقل من 5% فهي أهداف تصميمية لم تُنشر قياسات تثبتها.",
      qEn: "Has the system been used in a real bank, and does it have a documented accuracy?",
      aEn: "No. The bank vault is an applied scenario chosen to study face recognition for controlling access to sensitive areas, and the materials do not indicate deployment in a bank. The project presents illustrated tests showing the functional pipeline works, while figures such as a 2–3 second response and an error rate below 5% are design targets with no published measurements confirming them.",
    },
    {
      q: "ما حدود النسخة الحالية وما التطويرات المقترحة؟",
      a: "يعمل النموذج بكاميرا لابتوب واحدة، وتتأثر جودة التعرف بالإضاءة وزاوية الكاميرا، ولا يتضمن آلية موثقة لكشف الانتحال. ومن التطويرات المقترحة: دعم عدة كاميرات، وإشعارات الهاتف والبريد، وتشفير قاعدة البيانات، وتحليل السلوك وكشف الحركة، ودمج التعرف على الصوت.",
      qEn: "What are the current version's limits and the proposed developments?",
      aEn: "The prototype runs on a single laptop camera, recognition quality is affected by lighting and camera angle, and it includes no documented spoofing detection. Proposed developments include multi-camera support, phone and email notifications, database encryption, behavior analysis and motion detection, and combining voice recognition with face recognition.",
    },
  ],

  "electronic-voting-system-laravel": [
    {
      q: "ما هو نظام التصويت الإلكتروني المبني بـ Laravel؟",
      a: "منصة ويب نفذها فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، تؤتمت دورة انتخابية رقمية من إنشاء الحساب حتى الإدلاء بالصوت. تستخدم Laravel للخلفية وBootstrap للواجهات، وتضم ثلاثة أدوار: الناخب والمرشح ومدير النظام. وهي نموذج تطبيقي أكاديمي وليست نظام انتخابات معتمدًا.",
      qEn: "What is the Laravel electronic voting system?",
      aEn: "A web platform built by a team of students with technical assistance from Techno Enjaz that automates a digital election cycle from account creation to casting a vote. It uses Laravel for the backend and Bootstrap for the interface, with three roles: voter, candidate, and system administrator. It is an academic prototype, not an accredited election system.",
    },
    {
      q: "كيف يصبح المستخدم مرشحًا في النظام؟",
      a: "يدخل من يختار الترشح أولًا كمستخدم عادي، ويُرسل طلبه إلى الإدارة بحالة قيد التحقق. يقبل المدير الطلب أو يرفضه مع ملاحظات توثق السبب، وعند القبول يحصل المرشح على صفحة سيرة ذاتية يضيف إليها صورته وشعاراته وروابط فيديوهات حملته. ولا يُسمح إلا بطلب ترشح واحد لكل مستخدم.",
      qEn: "How does a user become a candidate in the system?",
      aEn: "A user who chooses to run first enters as a regular user, and their request is sent to the administration as pending verification. The administrator accepts or rejects it with notes documenting the reason; once accepted, the candidate gets a résumé page for their photo, slogans, and campaign video links. Only one candidacy request is allowed per user.",
    },
    {
      q: "كيف يمنع النظام تكرار التصويت أو تعديله؟",
      a: "تظهر رسالة تأكيد عند الضغط على زر التصويت، وبعد التأكيد لا يمكن حذف الصوت أو تغييره أو التصويت لمرشح آخر. وتفرض قاعدة البيانات علاقة صوت واحد لكل مستخدم، مع مؤشر في سجل المستخدم يبين إن كان قد أدلى بصوته.",
      qEn: "How does the system prevent repeated or changed votes?",
      aEn: "A confirmation message appears when the vote button is pressed, and after confirmation the vote cannot be deleted, changed, or cast for another candidate. The database enforces one vote per user, with a flag in the user record showing whether they have voted.",
    },
    {
      q: "ما الذي يستطيع مدير النظام فعله؟",
      a: "يراجع المدير طلبات الترشح ويقبلها أو يرفضها، ويضيف مرشحين يدويًا ويحرر سيرهم الذاتية بالكامل، ويتابع عملية التصويت ويراجع النتائج من لوحة الإدارة.",
      qEn: "What can the system administrator do?",
      aEn: "The administrator reviews candidacy requests and accepts or rejects them, adds candidates manually and fully edits their résumés, and monitors the voting process and reviews results from the admin dashboard.",
    },
    {
      q: "هل النظام جاهز لانتخابات رسمية؟",
      a: "لا. النسخة الحالية تفعّل الحساب مباشرة دون تحقق بالبريد أو OTP، وتعتمد على قاعدة بيانات تقليدية ومصادقة بكلمة مرور دون تشفير كامل، ويرتبط سجل التصويت برقم الناخب. ويقترح المشروع مستقبلًا التحقق بخطوتين ودمج Blockchain، ويحتاج أي استخدام فعلي إلى اختبارات أمنية واعتمادات مستقلة.",
      qEn: "Is the system ready for official elections?",
      aEn: "No. The current version activates accounts immediately without email or OTP verification, relies on a conventional database and password authentication without full encryption, and links each vote record to the voter ID. The project proposes two-step verification and blockchain integration in future, and any real use would need security testing and independent certification.",
    },
  ],


  "kindergarten-management-system": [
    {
      q: "ما هو نظام إدارة رياض الأطفال؟",
      a: "نظام متكامل يربط إدارة الروضة بأولياء الأمور، نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. يتكون من تطبيق Android لأولياء الأمور مبني بـ Flutter، ولوحة تحكم ويب للإدارة وواجهة خلفية بـ Laravel وقاعدة بيانات MySQL، بواجهة عربية بالكامل.",
      qEn: "What is the kindergarten management system?",
      aEn: "An integrated system connecting kindergarten administration with parents, built by a team of students with technical assistance from Techno Enjaz. It consists of a Flutter Android app for parents, a web admin dashboard, and a Laravel back end with a MySQL database, with a fully Arabic interface.",
    },
    {
      q: "ما الذي تستطيع إدارة الروضة فعله من لوحة التحكم؟",
      a: "تدير الإدارة الأطفال والفصول وحسابات المستخدمين، وتسجل الحضور فرديًا أو جماعيًا مع أوقات الدخول والخروج، وتضيف الوجبات والفعاليات والرحلات والمصادر التعليمية والوسائط. كما تنشر إعلانات موجهة وتتابع الرسائل وملاحظات أولياء الأمور، وتعرض اللوحة الرئيسية نسبة الحضور وأعداد الحاضرين والمتغيبين.",
      qEn: "What can the administration do from the dashboard?",
      aEn: "Administrators manage children, classrooms, and user accounts, record attendance individually or for a whole class with entry and exit times, and add meals, events, trips, learning resources, and media. They also publish targeted announcements and handle messages and parent feedback, while the main dashboard shows the attendance rate and present and absent counts.",
    },
    {
      q: "ماذا يقدم تطبيق Flutter لأولياء الأمور؟",
      a: "يتيح التطبيق متابعة حضور الطفل ووجباته وأنشطته وجدوله الأسبوعي والفعاليات القادمة، وعرض مؤشرات صحية مثل الأكل والشرب والنشاط البدني والرؤية والسمع. ويتضمن إشعارات ورسائل مع الإدارة ومعرض ألعاب تعليمية مثل الذاكرة والتلوين والأحرف.",
      qEn: "What does the Flutter app offer parents?",
      aEn: "The app lets parents follow their child's attendance, meals, activities, weekly schedule, and upcoming events, and view health indicators such as eating, drinking, physical activity, vision, and hearing. It also includes notifications, messaging with the administration, and a gallery of educational games such as memory, coloring, and letters.",
    },
    {
      q: "ما البنية التقنية للنظام؟",
      a: "الواجهة الأمامية Flutter بلغة Dart، والواجهة الخلفية Laravel بلغة PHP بمعمارية MVC مع لوحة ويب تستخدم Bootstrap، وقاعدة بيانات MySQL. ويربط الطرفين RESTful API موثقة بمعيار OpenAPI (YAML)، وتتمحور البيانات حول كيان الطفل وسجلاته الصحية وجداوله ووجباته ووسائطه.",
      qEn: "What is the system's technical architecture?",
      aEn: "The front end is Flutter with Dart, and the back end is Laravel with PHP in an MVC architecture, with a web dashboard using Bootstrap and a MySQL database. The two sides are connected by a RESTful API documented with OpenAPI (YAML), and the data model centers on the child and their health records, schedules, meals, and media.",
    },
    {
      q: "ما حدود النسخة الحالية من النظام؟",
      a: "التطبيق مخصص لـ Android فقط وباللغة العربية، ولا يتضمن الدفع الإلكتروني أو تحليل البيانات أو الذكاء الاصطناعي، واختُبر في بيئة محلية دون أرقام أداء منشورة. ويقترح المشروع مستقبلًا تطبيق iOS ودعم الإنجليزية والدفع الإلكتروني وتصدير التقارير بصيغتي PDF وExcel وواجهات للمعلمات.",
      qEn: "What are the limitations of the current version?",
      aEn: "The app targets Android only and is in Arabic only, has no e-payment, data analytics, or AI, and was tested in a local environment with no published performance figures. The project proposes an iOS app, English support, e-payment, PDF and Excel report export, and teacher interfaces as future work.",
    },
  ],

  "vehicle-data-analysis-system": [
    {
      q: "ما هو نظام تحليل وتقييم بيانات المركبات؟",
      a: "نموذج مصغر لمحطة حدودية ذكية يتعرف على لوحات المركبات بالرؤية الحاسوبية وOCR، ويقارنها بقاعدة بيانات المركبات المصرّح لها ليقرر آليًا فتح الحاجز أو إبقاءه مغلقًا. نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز.",
      qEn: "What is the vehicle data analysis and evaluation system?",
      aEn: "A miniature smart border-station model that recognizes vehicle license plates using computer vision and OCR and compares them with a database of authorized vehicles to decide automatically whether to open the barrier or keep it closed. It was built by a team of students with technical assistance from Techno Enjaz.",
    },
    {
      q: "كيف يعمل النظام من اقتراب المركبة حتى القرار؟",
      a: "يكشف حساس أشعة تحت حمراء اقتراب المركبة فتلتقط الكاميرا صورة اللوحة، ثم يحدد برنامج Python موقعها بخوارزمية YOLO ويقرأ رقمها بـ OCR ويقارنه بقاعدة البيانات. عند السماح يفتح محرك السيرفو الحاجز ويضيء مؤشر أخضر، وعند الرفض يبقى الحاجز مغلقًا ويضيء مؤشر أحمر ويُرسل تنبيه.",
      qEn: "How does the system work from vehicle approach to decision?",
      aEn: "An infrared sensor detects the approaching vehicle and the camera captures the plate; a Python program locates it with YOLO, reads the number with OCR, and checks it against the database. If allowed, the servo opens the barrier and a green LED lights; if denied, the barrier stays closed, a red LED lights, and an alert is sent.",
    },
    {
      q: "ما المكونات المستخدمة في النموذج؟",
      a: "كاميرا وحاسوب يشغّل برنامج Python للرؤية الحاسوبية وOCR، ولوحة NodeMCU ESP8266، ومحرك سيرفو MG995 للحاجز، وحساس IR لكشف الاقتراب، ومنظم جهد DC-DC، ومؤشرات LED خضراء وحمراء، ووحدة HC-05 Bluetooth لإرسال الإشعارات، إضافة إلى مقاومات.",
      qEn: "What components does the model use?",
      aEn: "A camera and a computer running the Python computer vision and OCR program, a NodeMCU ESP8266 board, an MG995 servo for the barrier, an IR sensor for approach detection, a DC-DC regulator, green and red LED indicators, an HC-05 Bluetooth module for notifications, and resistors.",
    },
    {
      q: "ما الرسائل التي يرسلها النظام؟",
      a: "يرسل رسائل آلية بخصم رسوم العبور، وتنبيهات بقرب انتهاء الاستمارة والتأمين، وتسجيل مخالفة لعدم تجديدهما، وتنبيهًا عند رصد مركبة معمَّم عنها مع طلب إبلاغ أقرب نقطة شرطة. وفي النموذج تصل الرسائل عبر Bluetooth إلى تطبيق على جهاز قريب، كمحاكاة لقناة الإشعار.",
      qEn: "What messages does the system send?",
      aEn: "It sends automatic messages for toll deductions, warnings that registration and insurance are about to expire, violations for not renewing them, and an alert when a wanted vehicle is detected asking to inform the nearest police point. In the model, messages reach an app on a nearby device via Bluetooth, simulating the notification channel.",
    },
    {
      q: "ما نتائج المشروع وحدوده؟",
      a: "نفذ النموذج المصغر الدورة الكاملة من كشف المركبة وقراءة اللوحة حتى فتح الحاجز وإرسال الرسائل، لكن التقرير لم يعرض قياسات رقمية لدقة القراءة أو زمن المعالجة. ومن حدوده أنه بوابة واحدة مصغرة بقاعدة بيانات محلية وإشعارات عبر Bluetooth دون ربط بأنظمة رسمية.",
      qEn: "What are the project's results and limitations?",
      aEn: "The miniature model carried out the full cycle from detecting the vehicle and reading the plate to opening the barrier and sending messages, but the report gives no numerical measurements of reading accuracy or processing time. Its limits include a single miniature gate, a local database, and Bluetooth notifications with no link to official systems.",
    },
  ],

  "calorie-counter-computer-vision": [
    {
      q: "كيف يحسب النظام السعرات الحرارية؟",
      a: "يوجه المستخدم الكاميرا نحو الطعام أو يحمّل صورة، فيتعرف نموذج YOLO على صنف الطعام، ثم يعرض النظام قيمه الغذائية المخزنة: السعرات والدهون والبروتينات والسكريات والألياف والكربوهيدرات لكل 100 غرام. ولا يقدّر النظام وزن الحصة الفعلي من الصورة.",
      qEn: "How does the system calculate calories?",
      aEn: "The user points the camera at a food or uploads an image, the YOLO model recognizes the food item, and the system displays its stored nutritional values: calories, fat, protein, sugars, fiber, and carbohydrates per 100 grams. The system does not estimate the actual portion weight from the image.",
    },
    {
      q: "ما التقنيات المستخدمة في المشروع؟",
      a: "بُني النظام بلغة Python في بيئة Visual Studio Code على Windows، ويستخدم YOLO عبر مكتبة Ultralytics للكشف، وOpenCV لمعالجة الصور، وTkinter للواجهة. وجُهزت بيانات التدريب ووُسمت ووُسعت على منصة Roboflow، ودُرّب النموذج في Google Colab عبر واجهة API الخاصة بـ Roboflow.",
      qEn: "What technologies does the project use?",
      aEn: "The system was built in Python in Visual Studio Code on Windows. It uses YOLO through the Ultralytics library for detection, OpenCV for image processing, and Tkinter for the interface. Training data was prepared, labeled, and augmented on Roboflow, and the model was trained in Google Colab through Roboflow's API.",
    },
    {
      q: "ما الوظائف التي يقدمها نظام حساب السعرات؟",
      a: "يقدم النظام ثلاث وظائف: التعرف على الطعام عبر الكاميرا المباشرة مع دعم عدة أصناف في الإطار نفسه، وتحليل صورة يحمّلها المستخدم من جهازه، وواجهة حميات تعرض خطة وجبات لأسبوع كامل بثلاث وجبات يومية، منها حمية لمرضى السكري.",
      qEn: "What functions does the calorie counting system offer?",
      aEn: "The system offers three functions: recognizing food through the live camera, including several items in the same frame; analyzing an image the user uploads from their device; and a diet interface that shows a full-week meal plan with three daily meals, including a diet for people with diabetes.",
    },
    {
      q: "ما دقة نظام حساب السعرات الحرارية؟",
      a: "يعرض المشروع لقطات من النظام العامل وهو يتعرف على الأطعمة ويعرض معلوماتها، لكنه لا ينشر مقاييس أداء للنموذج مثل mAP أو الدقة، ولا يذكر حجم مجموعة البيانات. لذلك تمثل النتائج إثباتًا وظيفيًا لنموذج أولي، ولا تُنسب للنظام نسبة دقة محددة.",
      qEn: "How accurate is the calorie counting system?",
      aEn: "The project shows screenshots of the working system recognizing foods and displaying their information, but publishes no model performance metrics such as mAP or accuracy and does not state the dataset size. The results are therefore a functional proof of a prototype, and no specific accuracy figure is attributed to the system.",
    },
    {
      q: "ما حدود النسخة الحالية من النظام؟",
      a: "يقتصر النظام على الأطعمة المفردة غير المخلوطة مثل التفاح والبطاطا والطماطم، ويعرض القيم لكل 100 غرام دون تقدير الكمية الفعلية، ولا يراعي طريقة الطهي. ومن التطويرات المقترحة تقدير الأوزان بالقياس البصري، ودعم الوجبات المركبة والمشروبات، ونسخة للهواتف تعمل دون اتصال دائم بالإنترنت.",
      qEn: "What are the limitations of the current version?",
      aEn: "The system is limited to single, unmixed foods such as apples, potatoes, and tomatoes, shows values per 100 g without estimating the actual amount, and does not account for the cooking method. Proposed developments include estimating weights through visual measurement, supporting composite meals and drinks, and a mobile version that works without a constant internet connection.",
    },
  ],

  "smart-security-surveillance-ai": [
    {
      q: "ما هو نظام المراقبة والحماية الأمني الذكي؟",
      a: "نظام أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز لحماية محال الذهب. يحلل بث الكاميرا بالذكاء الاصطناعي لكشف الأسلحة والعنف ومحاولات الاختلاس، ويضيف حساسي حركة ولهب عبر متحكم NodeMCU ESP8266، ثم يطلق إنذارًا ويرسل تنبيهًا إلى صاحب المحل عبر Telegram.",
      qEn: "What is the intelligent security and surveillance system?",
      aEn: "An academic system built by a team of students with technical assistance from Techno Enjaz to protect gold shops. It analyzes the camera feed with AI to detect weapons, violence, and theft attempts, adds motion and flame sensors via a NodeMCU ESP8266 controller, then raises an alarm and alerts the shop owner through Telegram.",
    },
    {
      q: "كيف يكتشف النظام الأسلحة والعنف ومحاولات السرقة؟",
      a: "يستخدم نماذج YOLO الجاهزة من Ultralytics لتحديد الأسلحة مثل السكين بمربع وتصنيف، وشبكة عصبية تكرارية RNN لتحليل تسلسل الحركات وكشف العنف. أما الاختلاس فيُرصد بتقدير وضعيات الجسم واليد عبر MediaPipe، إذ يُطلق التنبيه عند دخول اليد إلى منطقة محظورة محددة مسبقًا مثل الأدراج.",
      qEn: "How does the system detect weapons, violence, and theft attempts?",
      aEn: "It uses pre-trained Ultralytics YOLO models to mark weapons such as a knife with a box and label, and a recurrent neural network (RNN) to analyze motion sequences for violence. Theft is detected through MediaPipe body and hand pose estimation, triggering an alert when a hand enters a predefined restricted region such as drawers.",
    },
    {
      q: "ما دور الحساسات الفيزيائية ومتحكم NodeMCU؟",
      a: "يرصد حساس الحركة PIR HC-SR501 أي دخول أو حركة غير طبيعية ضمن مدى يصل إلى نحو 7 أمتار، ويكشف حساس اللهب بالأشعة تحت الحمراء بدايات الحريق. ويقرأ متحكم NodeMCU ESP8266 هذه الحساسات وينسقها مع مخرجات التحليل البرمجي ويرسل التنبيهات عبر Wi-Fi.",
      qEn: "What role do the physical sensors and the NodeMCU play?",
      aEn: "The HC-SR501 PIR sensor detects any entry or abnormal movement within a range of up to about 7 meters, and the infrared flame sensor detects early signs of fire. The NodeMCU ESP8266 reads these sensors, coordinates them with the software analysis outputs, and sends alerts over Wi-Fi.",
    },
    {
      q: "كيف يُبلَّغ صاحب المحل عند اكتشاف تهديد؟",
      a: "يطلق النظام إنذارًا داخل المحل ويحفظ مقطع فيديو للحدث في مجلد مخصص. ثم يرسل بوت Telegram رسالة مثل \"تم اكتشاف سلاح!\" أو \"تم اكتشاف حالة عنف!\" مع توقيت الكشف ورابط الفيديو، ليتمكن صاحب المحل من الاستجابة حتى في غيابه.",
      qEn: "How is the shop owner notified when a threat is detected?",
      aEn: "The system sounds an alarm inside the shop and saves a video clip of the event to a dedicated folder. A Telegram bot then sends a message such as \"Weapon detected!\" or \"Violence detected!\" with the detection time and a video link, so the owner can respond even when away.",
    },
    {
      q: "ما مدى دقة النظام وما حدوده؟",
      a: "وثّق المشروع عمل الوظائف بلقطات تجريبية، لكنه لا ينشر أرقامًا لدقة الكشف أو معدلات الإنذار الكاذب أو زمن الاستجابة. ويشير إلى الحاجة لتحسين الأداء في الإضاءة الصعبة والزوايا المتنوعة والأماكن المزدحمة، كما أن النسب الواردة في فصوله النظرية تخص دراسات سابقة.",
      qEn: "How accurate is the system and what are its limits?",
      aEn: "The project documents the functions working with test screenshots but publishes no figures for detection accuracy, false-alarm rates, or response time. It notes the need to improve performance in difficult lighting, varied angles, and crowded spaces, and the percentages in its theory chapters belong to earlier studies.",
    },
  ],

  "tech-support-chatbot-robot": [
    {
      q: "ما هو روبوت الدردشة الصوتية التقنية؟",
      a: "روبوت دردشة تعليمي صوتي يعمل مساعدًا تقنيًا للطلاب في البرمجة والمجالات التقنية، نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. يستقبل الأسئلة صوتيًا ويجيب نصًا وصوتًا عبر نموذج Gemini، ويحرك ذراعه بمحرك سيرفو أثناء الرد.",
      qEn: "What is the technical voice chatbot robot?",
      aEn: "An educational voice chatbot robot that acts as a technical assistant for students in programming and technical subjects, built by a team of students with technical assistance from Techno Enjaz. It takes spoken questions and replies in text and voice using the Gemini model, moving its arm with a servo while it answers.",
    },
    {
      q: "كيف يعمل الروبوت من السؤال حتى الرد؟",
      a: "تحول واجهة الويب كلام المستخدم إلى نص وترسله عبر WebSocket إلى خادم Node.js، الذي يمرره إلى Gemini API عبر HTTPS. يعود الرد بالبث التدريجي فيُعرض نصًا ويُنطق بتقنية Text-to-Speech، بينما تستعلم لوحة ESP8266 من الخادم عبر HTTP Polling لتحريك الذراع بالتزامن.",
      qEn: "How does the robot work from question to reply?",
      aEn: "The web interface converts the user's speech to text and sends it over WebSocket to a Node.js server, which passes it to the Gemini API over HTTPS. The reply streams back, is displayed as text and spoken via Text-to-Speech, while the ESP8266 board polls the server over HTTP to move the arm in sync.",
    },
    {
      q: "ما التقنيات والمكونات المستخدمة في المشروع؟",
      a: "برمجيًا: JavaScript وNode.js وWebSocket ونموذج Gemini-live-2.5-flash مع تقنيات تحويل الكلام إلى نص والنص إلى كلام. عتاديًا: لوحة NodeMCU ESP8266، ومحرك سيرفو TowerPro MG995، وبطاريات ليثيوم 18650 مع منظم LM2596 ودارة BMS، ومحول AC-to-DC ومكبر صوت.",
      qEn: "What technologies and components does the project use?",
      aEn: "Software: JavaScript, Node.js, WebSocket, and the Gemini-live-2.5-flash model with speech-to-text and text-to-speech. Hardware: a NodeMCU ESP8266 board, a TowerPro MG995 servo, 18650 lithium batteries with an LM2596 regulator and a BMS circuit, an AC-to-DC adapter, and a speaker.",
    },
    {
      q: "ما النتائج التي حققها الروبوت؟",
      a: "أظهرت التجارب نجاح المحادثة الصوتية عبر المتصفح، واستقرار استقبال ردود Gemini وتحويلها إلى صوت، وتزامن الرد مع حركة الذراع، واستقرار عمل السيرفو والتغذية الكهربائية. وهي نتائج وظيفية لنموذج أولي، إذ لم يعرض التقرير قياسات رقمية لدقة الإجابات أو زمن الاستجابة.",
      qEn: "What results did the robot achieve?",
      aEn: "Tests showed working voice conversations in the browser, stable reception of Gemini replies and their conversion to speech, replies synchronized with arm motion, and stable servo and power operation. These are functional prototype results; the report gives no numerical measurements of answer accuracy or response time.",
    },
    {
      q: "ما حدود النسخة الحالية من الروبوت؟",
      a: "يعتمد الروبوت كليًا على الإنترنت والمعالجة السحابية ولا يعمل دون اتصال، وتقتصر حركته على ذراع واحدة. لا يستخدم كاميرا أو تعرفًا على الوجوه، ولا يقدم استشارات طبية أو قانونية أو نفسية، ومن التطويرات المقترحة ذاكرة محادثات ونماذج محلية ودعم لهجات متعددة.",
      qEn: "What are the limitations of the current version?",
      aEn: "The robot depends entirely on the internet and cloud processing and cannot work offline, and its motion is limited to one arm. It uses no camera or face recognition and gives no medical, legal, or psychological advice; proposed improvements include conversation memory, local models, and multi-dialect support.",
    },
  ],

  "chemical-mixing-station-plc": [
    {
      q: "ما هي محطة خلط السوائل الكيميائية بالتحكم الآلي PLC؟",
      a: "هي منظومة تحكم آلي صممها فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، تنقل مادتين من خزانين فرعيين إلى خزان خلط رئيسي بتسلسل منطقي يعتمد على حساسات المستوى، ثم تشغّل محرك الخلط وتراقب درجة حرارة الخليط. نُفذت بوحدة Delta DVP-ES2 واختُبرت في بيئة محاكاة برمجية.",
      qEn: "What is the PLC-controlled chemical mixing station?",
      aEn: "It is an automated control system designed by a team of students with technical assistance from Techno Enjaz. It transfers two materials from feed tanks into a main mixing tank in a logical sequence driven by level sensors, then runs the mixer motor and monitors the mixture temperature. It was built for a Delta DVP-ES2 PLC and tested in a software simulation environment.",
    },
    {
      q: "كيف يعمل برنامج التحكم في المحطة؟",
      a: "يتكون البرنامج من شبكات Ladder: دائرة بدء وإيقاف وطوارئ تفعّل الريليه الداخلي M0، ومؤقت T0 ينظم تتابع الضخ، وشبكات تشغّل المضختين عبر المخرجين Y0 وY1 بعد تحقق شروط الحساسات S1 وS2 وS3، ثم تشغيل الخلاط بعد اكتمال التعبئة مع مقارنات شرطية لمراقبة الحرارة، وتعليمات MOV لتحديث واجهة HMI.",
      qEn: "How does the station's control program work?",
      aEn: "The program consists of Ladder networks: a start, stop, and emergency circuit that energizes internal relay M0; timer T0 that sequences the pumping; networks that run the two pumps through outputs Y0 and Y1 once sensors S1, S2, and S3 are satisfied; mixer start after filling with conditional compares for temperature monitoring; and MOV instructions that update the HMI.",
    },
    {
      q: "ما البرمجيات المستخدمة في المشروع؟",
      a: "طُوّر برنامج التحكم بلغة Ladder Diagram على ISPSoft من Delta، ويشير ملخص المشروع إلى بيئة Delta WPLSoft أيضًا. وصُممت واجهة HMI ببرنامج DOPSoft، واستُخدم المحاكي البرمجي من Delta مع برنامج COM Manager لربط ISPSoft وDOPSoft عبر Localhost وتبادل البيانات لحظيًا.",
      qEn: "What software was used in the project?",
      aEn: "The control program was developed in Ladder Diagram using Delta ISPSoft, and the project summary also refers to Delta WPLSoft. The HMI was designed in DOPSoft, and Delta's software emulator was used with COM Manager to link ISPSoft and DOPSoft over localhost for real-time data exchange.",
    },
    {
      q: "ما نتائج اختبار محطة الخلط؟",
      a: "أظهرت المحاكاة نجاح المنظومة في التشغيل والإيقاف الآمن، والتحكم المتتابع بالمضخات، ونقل السوائل إلى خزان الخلط، وتشغيل الخلاط بعد التعبئة، ومراقبة الحرارة، وعرض العملية على واجهة HMI متحركة. وهي نتائج وظيفية للمحاكاة دون قياسات زمنية أو تجارب على عتاد حقيقي.",
      qEn: "What were the mixing station's test results?",
      aEn: "The simulation showed the system starting and stopping safely, controlling the pumps in sequence, transferring liquids to the mixing tank, starting the mixer after filling, monitoring temperature, and displaying the process on an animated HMI. These are functional simulation results, without timing measurements or tests on real hardware.",
    },
    {
      q: "ما حدود المشروع وكيف يمكن تطويره؟",
      a: "اقتصر المشروع على المحاكاة، ولا يشمل خطوط إنتاج كبيرة أو تفاعلات كيميائية معقدة أو أنظمة SCADA وDCS كاملة. ومن التطويرات المقترحة إضافة SCADA، وتوسيع عدد الخزانات، واستخدام حساسات تماثلية أدق، ودمج Modbus TCP وEthernet/IP للتكامل مع إنترنت الأشياء الصناعي.",
      qEn: "What are the project's limits and how could it be developed?",
      aEn: "The project was limited to simulation and does not cover large production lines, complex chemical reactions, or full SCADA and DCS systems. Proposed developments include adding SCADA, expanding the number of tanks, using more accurate analog sensors, and integrating Modbus TCP and Ethernet/IP for Industrial IoT connectivity.",
    },
  ],

  "short-range-delivery-robot": [
    {
      q: "ما هو روبوت توصيل الطلبات لمسافات قصيرة؟",
      a: "هو نموذج أولي منخفض التكلفة لنقل الطلبات والأجسام الصغيرة داخل البيئات المغلقة كالمستشفيات والمختبرات والمكاتب، نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. يتكون من قاعدة بأربع عجلات وجسم رأسي فيه حجرة للطلبات، وملقط يعمل بمحرك سيرفو، ويُتحكم به من تطبيق هاتف عبر البلوتوث.",
      qEn: "What is the short-range order delivery robot?",
      aEn: "It is a low-cost prototype for carrying orders and small objects inside indoor environments such as hospitals, laboratories and offices, built by a team of students with technical assistance from Techno Enjaz. It has a four-wheel base, an upright body with an order compartment and a servo-driven gripper, and is controlled from a phone app over Bluetooth.",
    },
    {
      q: "كيف يعمل روبوت التوصيل ويتجنب الاصطدام؟",
      a: "يرسل تطبيق الهاتف أوامر حرفية عبر وحدة HC-05 (F وB وR وL وS للحركة والتوقف، وG وO لإغلاق الملقط وفتحه)، فتقود Arduino Uno المحركات عبر L293D أو تحرك السيرفو. وخلال الحركة يقيس حساس HC-SR04 المسافة باستمرار، وإذا قلّت عن 30 سم يوقف المتحكم جميع المحركات فورًا وينتظر أمرًا جديدًا.",
      qEn: "How does the delivery robot work and avoid collisions?",
      aEn: "The phone app sends single-letter commands over the HC-05 module (F, B, R, L and S for motion and stop; G and O to close and open the gripper), and the Arduino Uno drives the motors through the L293D or moves the servo. While moving, the HC-SR04 sensor measures distance continuously, and if it drops below 30 cm the controller stops all motors and waits for a new command.",
    },
    {
      q: "ما المكونات المستخدمة في روبوت التوصيل؟",
      a: "يعتمد الروبوت على Arduino Uno بالمتحكم ATmega328P، وأربعة محركات TT Gear Motor تقودها دارة L293D، ومحرك سيرفو للملقط، وحساس HC-SR04، ووحدة HC-05. وتأتي الطاقة من ثلاث بطاريات ليثيوم أيون 18650 على التوالي بجهد نحو 11.1 فولت مع دائرة حماية BMS، وبُرمج بلغة C++ في Arduino IDE.",
      qEn: "What components does the delivery robot use?",
      aEn: "The robot uses an Arduino Uno with the ATmega328P, four TT gear motors driven by an L293D, a servo for the gripper, an HC-SR04 sensor and an HC-05 module. Power comes from three 18650 lithium-ion cells in series at about 11.1 V with a BMS protection circuit, and it was programmed in C++ in the Arduino IDE.",
    },
    {
      q: "ما نتائج اختبار روبوت التوصيل؟",
      a: "نجح الاتصال عبر HC-05، وبلغ زمن تأخير أوامر التطبيق 50 ملي ثانية كحد أقصى ضمن مدى يصل إلى 8 أمتار داخل المبنى. وتحرك الروبوت بثبات في جميع الاتجاهات، وتوقف عند العوائق الأقرب من 30 سم، وأدى الملقط عمليتي الفتح والإغلاق بشكل مستقر.",
      qEn: "What were the delivery robot's test results?",
      aEn: "The HC-05 link worked, and app command delay was at most 50 ms within a range of up to 8 meters indoors. The robot moved steadily in all directions, stopped at obstacles closer than 30 cm, and the gripper opened and closed reliably.",
    },
    {
      q: "ما حدود روبوت التوصيل الحالي؟",
      a: "يعمل الروبوت داخل المباني على أرضيات مستوية وينقل أجسامًا خفيفة فقط، ويُوجَّه يدويًا من الهاتف دون ملاحة ذاتية أو رؤية حاسوبية، ويعتمد على حساس أمامي واحد. ولم يوثق الكتاب الحمولة القصوى أو مدة تشغيل البطارية، ويقترح لاحقًا ملاحة ذاتية واتصال Wi-Fi وكاميرا وعودة تلقائية للشحن.",
      qEn: "What are the current delivery robot's limitations?",
      aEn: "The robot works indoors on flat floors and carries only light objects; it is steered manually from the phone without autonomous navigation or computer vision and relies on a single front sensor. The book does not document maximum payload or battery runtime, and proposes autonomous navigation, Wi-Fi, a camera and automatic return to charge as future work.",
    },
  ],

  "focusbac-baccalaureate-app": [
    {
      q: "ما هو تطبيق FocusBac؟",
      a: "FocusBac تطبيق جوال تعليمي مجاني لطلاب البكالوريا السورية في الفرعين العلمي والأدبي، نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. ينظم المنهاج في فروع ومواد ووحدات ودروس، ويقدم الدروس كمقاطع فيديو قصيرة مرتبطة باختبارات إلزامية.",
      qEn: "What is the FocusBac app?",
      aEn: "FocusBac is a free educational mobile app for Syrian Baccalaureate students in the scientific and literary tracks, built by a team of students with technical assistance from Techno Enjaz. It organizes the curriculum into tracks, subjects, units, and lessons, and delivers lessons as short videos linked to mandatory quizzes.",
    },
    {
      q: "كيف تعمل آلية التعلم التراكمي في FocusBac؟",
      a: "بعد مشاهدة فيديو الدرس يقدم الطالب اختبارًا قصيرًا، وتُحسب نتيجته بمقارنة إجاباته بالإجابات الصحيحة وتُعرض كنسبة مئوية. إذا حقق 60% أو أكثر يُفتح الدرس التالي، وإلا يعيد المحاولة، ويُحدَّث تقدمه ونقاطه تلقائيًا.",
      qEn: "How does FocusBac's cumulative learning mechanism work?",
      aEn: "After watching the lesson video, the student takes a short quiz whose score is calculated against the correct answers and shown as a percentage. With 60% or more the next lesson unlocks; otherwise the student retries, and progress and points update automatically.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء FocusBac؟",
      a: "بُني تطبيق الجوال بإطار Flutter ولغة Dart لنظام Android، والخادم بإطار Laravel على PHP مع Eloquent ORM وLaravel Sanctum للمصادقة. تُدار المحتويات عبر لوحة Filament، وتُخزن البيانات في MySQL، ويتواصل التطبيق مع الخادم عبر RESTful API، وتُستضاف الفيديوهات على YouTube.",
      qEn: "Which technologies were used to build FocusBac?",
      aEn: "The mobile app is built with Flutter and Dart for Android, and the backend with Laravel on PHP using Eloquent ORM and Laravel Sanctum for authentication. Content is managed through a Filament admin panel, data is stored in MySQL, the app talks to the server via a RESTful API, and videos are hosted on YouTube.",
    },
    {
      q: "ماذا يستطيع المشرف أن يفعل في لوحة التحكم؟",
      a: "يدير المشرف المواد والوحدات والدروس وروابط الفيديو لكل فرع، وينشئ اختبارًا لكل درس بنسبة نجاح 60% مع أسئلة اختيار من متعدد أو صح وخطأ. كما يتابع تقدم الطلاب ونتائجهم ومحاولاتهم، ويعرض التقارير، ويدير الحسابات بالتفعيل والتعليق وإعادة تعيين كلمة المرور.",
      qEn: "What can supervisors do in the admin panel?",
      aEn: "Supervisors manage subjects, units, lessons, and video links for each track, and create a quiz per lesson with a 60% pass mark using multiple-choice or true/false questions. They also follow students' progress, results, and attempts, view reports, and manage accounts by activating, suspending, or resetting passwords.",
    },
    {
      q: "ما حدود النسخة الحالية من FocusBac؟",
      a: "النسخة الأولى موجهة لنظام Android فقط، وتغطي الفرعين العلمي والأدبي دون المهني، ولا تتضمن دردشة أو روابط خارجية. ويوثق التنفيذ لوحة التحكم وشاشات الدخول والتسجيل واختيار الفرع والصفحة الرئيسية، دون قياسات لأثر التطبيق على تحصيل الطلاب.",
      qEn: "What are the limits of the current FocusBac version?",
      aEn: "The first version targets Android only, covers the scientific and literary tracks but not the vocational one, and includes no chat or external links. The implementation documents the admin panel and the login, registration, track-selection, and home screens, with no measurements of the app's effect on student achievement.",
    },
  ],

  "remote-computer-control-ai": [
    {
      q: "ما هو نظام التحكم بالحاسوب بإيماءات اليد؟",
      a: "هو مشروع أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يتيح التحكم بالحاسوب بإيماءات اليد أمام كاميرا ويب عادية دون فأرة أو حساسات. يعتمد على MediaPipe Hands لتتبع 21 نقطة لليد، وOpenCV لمعالجة الفيديو، وPyAutoGUI لتنفيذ الأوامر على نظام التشغيل.",
      qEn: "What is the hand-gesture computer control system?",
      aEn: "It is an academic project built by a team of students with technical assistance from Techno Enjaz that lets users control a computer with hand gestures in front of an ordinary webcam, without a mouse or sensors. It relies on MediaPipe Hands to track 21 hand landmarks, OpenCV for video processing, and PyAutoGUI to execute commands on the operating system.",
    },
    {
      q: "كيف يتعرف النظام على الإيماءات ويحولها إلى أوامر؟",
      a: "تُحسب حالة كل إصبع بقواعد هندسية من النقاط المعلمية، وتُنعَّم بتصويت الأغلبية على آخر 5 إطارات، ولا تُعتمد الإيماءة إلا بعد تكرارها 3 إطارات متتالية. ثم تُحوَّل إلى أمر، مع تنعيم أسي لحركة المؤشر (α = 0.4) وتجاهل الحركات الأصغر من 8 بكسل وزمن تبريد 0.3 ثانية للنقر.",
      qEn: "How does the system recognize gestures and turn them into commands?",
      aEn: "Each finger's state is computed from the landmarks with geometric rules, smoothed by majority vote over the last 5 frames, and a gesture is only accepted after repeating for 3 consecutive frames. It is then mapped to a command, with exponential cursor smoothing (α = 0.4), movements under 8 pixels ignored, and a 0.3-second click cooldown.",
    },
    {
      q: "ما الوظائف التي ينفذها النظام بالإيماءات؟",
      a: "يتحكم النظام بسطوع الشاشة بالمسافة بين الإبهام والسبابة من الخفض حتى 100%، مع شريط مرئي لمستوى السطوع. ويضم قاموسًا من ست إيماءات للفأرة: القبضة للتحريك، والسبابة والوسطى للنقر الأيسر، وثلاثة أصابع للنقر الأيمن، والسبابة وحدها للنقر المزدوج، والإبهام مع السبابة للسحب والإفلات، والكف المفتوح كمفتاح أمان.",
      qEn: "Which functions does the system perform with gestures?",
      aEn: "The system controls screen brightness with the thumb–index distance from low up to 100%, with an on-screen brightness bar. It also includes a six-gesture mouse dictionary: fist to move, index and middle for left click, three fingers for right click, index alone for double click, thumb and index for drag and drop, and open palm as a safety key.",
    },
    {
      q: "هل يستخدم النظام شبكات CNN وLSTM أو لوحة مفاتيح افتراضية؟",
      a: "لا، فشبكات CNN وLSTM واردة في الفصل النظري ضمن موضوعات التعرف على الإيماءات، بينما يعتمد التنفيذ الموثق على قواعد هندسية لحالة الأصابع. ولقطات لوحة المفاتيح الافتراضية تعود إلى دراسات سابقة استُعرضت للمقارنة، ودمج التعلم العميق مطروح كتطوير مستقبلي.",
      qEn: "Does the system use CNN/LSTM networks or a virtual keyboard?",
      aEn: "No. CNN and LSTM networks appear in the theory chapter as gesture-recognition topics, while the documented implementation relies on geometric rules for finger states. The virtual-keyboard screenshots come from previous studies reviewed for comparison, and integrating deep learning is proposed as future work.",
    },
    {
      q: "ما النتائج الموثقة وما حدود النظام؟",
      a: "أظهرت التجارب العملية نجاح تتبع اليد والتحكم المتدرج بالسطوع باستقرار جيد ودون تأخير ملحوظ، لكن المشروع لا يعرض قياسات فعلية للدقة أو معدل الإطارات. والأرقام مثل 30 إطارًا في الثانية ودقة تتجاوز 90% أهداف متوقعة، ومن حدوده دعم يد واحدة والتأثر بالإضاءة والخلفيات المعقدة.",
      qEn: "What results are documented, and what are the system's limits?",
      aEn: "Practical trials showed successful hand tracking and gradual brightness control with good stability and no noticeable delay, but the project reports no actual measurements of accuracy or frame rate. Figures such as 30 FPS and accuracy above 90% are expected targets, and limits include single-hand support and sensitivity to lighting and complex backgrounds.",
    },
  ],

  "student-assistance-robot": [
    {
      q: "ما هو روبوت مساعدة الطلاب بشاشة لمس؟",
      a: "روبوت أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يعمل مساعدًا إلكترونيًا لشؤون الطلاب عبر شاشة لمس مثبتة في هيكل مخصص. يتيح تسجيل بيانات الطلاب والبحث عنها وتعديلها، وإنشاء الوثائق الرسمية وطباعتها، والإجابة عن الأسئلة الشائعة بالنص أو الصوت بالعربية.",
      qEn: "What is the touchscreen student assistance robot?",
      aEn: "An academic robot built by a team of students with technical assistance from Techno Enjaz that acts as an electronic student-affairs assistant through a touchscreen mounted in a custom frame. It lets users register, search, and edit student records, generate and print official documents, and get FAQ answers by text or voice in Arabic.",
    },
    {
      q: "كيف يفهم الروبوت طلبات الطلاب وينفذها؟",
      a: "يحول النظام الكلام إلى نص عند استخدام الصوت، ثم يحلل مساعد ذكي مبني على نموذج Gemini نية المستخدم. وعبر آلية استدعاء الأدوات (Function Calling) وبروتوكول MCP ينفذ العملية المطلوبة على قاعدة البيانات أو يولد المستند، ثم يعرض النتيجة أو يطبعها.",
      qEn: "How does the robot understand and carry out student requests?",
      aEn: "Speech is converted to text when voice is used, then an AI agent built on a Gemini model identifies the user's intent. Through function calling and the Model Context Protocol (MCP), it performs the operation on the database or generates the document, then displays or prints the result.",
    },
    {
      q: "ما التقنيات المستخدمة في المشروع؟",
      a: "يعتمد النظام على Python مع FastAPI وUvicorn للواجهة الخلفية، وقاعدة بيانات SQLite، ومكتبة DocxTpl لملء قوالب Word ثم تحويلها إلى PDF وطباعتها. وتُبنى الواجهات بـTkinter وHTML5 وCSS3 وJavaScript، مع محادثة صوتية لحظية عبر WebSocket، ويُحزم التطبيق بأداة PyInstaller.",
      qEn: "What technologies does the project use?",
      aEn: "The system uses Python with FastAPI and Uvicorn for the backend, an SQLite database, and the DocxTpl library to fill Word templates before converting them to PDF and printing. Interfaces are built with Tkinter, HTML5, CSS3, and JavaScript, with real-time voice chat over WebSocket, and the app is packaged with PyInstaller.",
    },
    {
      q: "ما الخدمات المتاحة في واجهة الروبوت؟",
      a: "تضم الواجهة دردشة نصية وصوتية، وقسم أسئلة شائعة يشمل أوراق التسجيل للمستجدين والتسجيل لغير المستجدين والكليات والاختصاصات وروابط القنوات الرسمية. كما تضم إجراءات سريعة لتسجيل طالب والبحث عنه وتعديل بياناته وإنشاء مستند وعرض الطلاب.",
      qEn: "What services are available on the robot's interface?",
      aEn: "The interface includes text and voice chat and an FAQ section covering registration papers for new students, registration for returning students, faculties and specializations, and links to official channels. It also offers quick actions to register, search for, and edit a student, create a document, and list students.",
    },
    {
      q: "ما نتائج اختبار الروبوت وما حدوده؟",
      a: "اختُبر النظام على الروبوت الفعلي، وتبيّن أن التفاعل النصي والصوتي والخدمات تعمل بكفاءة مقبولة في بيئة التشغيل، لكن المشروع لا ينشر قياسات لزمن الاستجابة أو دقة فهم الأوامر. ومن تحدياته عدم توفر شاشة مخصصة، والقيود المحلية على بعض منصات الذكاء الاصطناعي، وعدم الربط بالأنظمة المركزية للجامعة.",
      qEn: "What did testing show and what are the limits?",
      aEn: "The system was tested on the actual robot, and text and voice interaction and the services worked with acceptable efficiency in the operating environment, but the project publishes no measurements of response time or command-understanding accuracy. Challenges include the lack of a dedicated screen, local restrictions on some AI platforms, and no link to the university's central systems.",
    },
  ],

  "reconstruction-decision-support": [
    {
      q: "ما هو النظام الذكي لدعم قرار إعادة الإعمار؟",
      a: "هو مشروع أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز لتوثيق الأضرار في المناطق المتضررة داخل سوريا وتحليلها بالذكاء الاصطناعي متعدد الوسائط. يضم تطبيق هاتف لجمع التقارير الميدانية، وخادم Laravel مع وكيل ذكي يعتمد على Gemini 3.5 Flash، ومنصة ويب ولوحة تحكم بخريطة تفاعلية وإحصائيات.",
      qEn: "What is the AI decision-support system for reconstruction?",
      aEn: "It is an academic project built by a team of students with technical assistance from Techno Enjaz to document damage in affected areas of Syria and analyze it with multimodal AI. It includes a mobile app for field reports, a Laravel server with an AI agent based on Gemini 3.5 Flash, and a web platform and dashboard with an interactive map and statistics.",
    },
    {
      q: "كيف يعالج النظام تقارير الأضرار الميدانية؟",
      a: "يخزن خادم Laravel التقرير أولًا كبيانات خام دون تعديل، ثم يشغّل مهمة معالجة في الخلفية عبر Queues حتى لا ينتظر المستخدم. يرسل الوكيل الذكي النص والصور إلى Gemini 3.5 Flash الذي يوحّد اسم المنطقة ويصنف مستوى الضرر، فيُحفظ تقرير معالج مرتبط بمحافظة ومنطقة مرجعيتين أو تُسجَّل حالة فشل.",
      qEn: "How does the system process field damage reports?",
      aEn: "The Laravel server first stores the report as raw data without modification, then runs a background processing job via Queues so the user does not wait. The AI agent sends the text and images to Gemini 3.5 Flash, which normalizes the area name and classifies the damage level, and a processed report linked to a reference governorate and area is saved, or a failed status is recorded.",
    },
    {
      q: "كيف يوحّد النظام أسماء المناطق ويصنف مستوى الضرر؟",
      a: "يقارن الوكيل الذكي الاسم المدخل بتسميات معيارية، فمثلًا يتحول «دوما الريف» و«ريف دمشق دوما» إلى «ريف دمشق – دوما». ويُصنف الضرر بدمج دلالات الوصف النصي مع السمات البصرية في الصور مثل الانهيارات والتشققات، ويُخزن مستوى الضرر ونسبته ووصف التحليل ومؤشر الثقة.",
      qEn: "How does the system normalize place names and classify damage?",
      aEn: "The AI agent compares the entered name with standard names; for example, 'Douma al-Rif' and 'Rif Dimashq Douma' both become 'Rif Dimashq – Douma'. Damage is classified by combining cues from the text description with visual features in the photos, such as collapses and cracks, and the damage level, percentage, analysis description, and a confidence indicator are stored.",
    },
    {
      q: "ما التقنيات المستخدمة في نظام توثيق الأضرار؟",
      a: "يعتمد النظام على تطبيق هاتف مبني بإطار Flutter لنظام Android، وخادم Laravel مع قاعدة MySQL ومعالجة غير متزامنة عبر Queues، ونموذج Gemini 3.5 Flash لتحليل النص والصورة. وتعرض لوحة التحكم خريطة تفاعلية بمواقع الأضرار وإحصائيات ورسومًا بيانية مع بحث وتصفية متقدمين.",
      qEn: "Which technologies does the damage documentation system use?",
      aEn: "The system uses a Flutter mobile app for Android, a Laravel server with a MySQL database and asynchronous processing via Queues, and the Gemini 3.5 Flash model for text and image analysis. The dashboard shows an interactive map of damage locations, statistics, and charts with advanced search and filtering.",
    },
    {
      q: "ما النتائج الموثقة وحدود النسخة الحالية؟",
      a: "يوثق المشروع نظامًا منفذًا يضم تطبيقًا ميدانيًا ومنصة ويب مركزية، اختُبر بسيناريوهات إدخال تحاكي العمل الميداني، لكنه لا يعرض قياسات كمية لدقة تصنيف الضرر أو زمن المعالجة. ومن حدوده الاقتصار على المناطق السورية ونظام Android، والحاجة إلى اتصال بالإنترنت، والاعتماد على واجهة Gemini الخارجية.",
      qEn: "What results are documented, and what are the current limitations?",
      aEn: "The project documents an implemented system with a field app and a central web platform, tested with input scenarios that simulate field work, but it reports no quantitative measurements of damage-classification accuracy or processing time. Its limits include a focus on Syrian areas and Android, the need for an internet connection, and dependence on the external Gemini API.",
    },
  ],

  "cybershield-file-link-scanner": [
    {
      q: "ما هو تطبيق CyberShield؟",
      a: "تطبيق Android للأمن السيبراني نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يفحص الروابط والملفات قبل التعامل معها. يعتمد على VirusTotal للفحص متعدد المحركات، وعلى Google Gemini لتحويل النتيجة التقنية إلى تقرير مبسط يوضح مستوى الخطورة ويقدم نصائح وقائية.",
      qEn: "What is the CyberShield app?",
      aEn: "An Android cybersecurity app built by a team of students with technical assistance from Techno Enjaz that checks links and files before users deal with them. It uses VirusTotal for multi-engine scanning and Google Gemini to turn the technical result into a simplified report with a risk level and preventive advice.",
    },
    {
      q: "كيف يفحص CyberShield الملفات دون رفعها؟",
      a: "يولد التطبيق بصمة رقمية SHA-256 للملف ويرسلها عبر الخادم الخلفي إلى VirusTotal. فإذا كانت البصمة معروفة لدى الخدمة يُسترجع تقريرها مباشرة دون رفع الملف الفعلي، ما يقلل استهلاك البيانات ويحد من إرسال المحتوى. أما الروابط فتُرسل نفسها للتحليل.",
      qEn: "How does CyberShield check files without uploading them?",
      aEn: "The app generates a SHA-256 hash of the file and sends it through the backend to VirusTotal. If the service already knows the hash, its report is retrieved directly without uploading the actual file, which reduces data usage and limits what is sent. Links are submitted as they are for analysis.",
    },
    {
      q: "ما التقنيات المستخدمة في CyberShield؟",
      a: "تطبيق الهاتف مبني بإطار Flutter مع Riverpod وGoRouter وDio وFlutter Secure Storage. الخادم الخلفي يعمل على Cloudflare Workers بإطار Hono، مع قاعدة بيانات Cloudflare D1 وتخزين مؤقت Cloudflare KV ومصادقة JWT، ويتكامل مع VirusTotal API وGoogle Gemini API.",
      qEn: "Which technologies does CyberShield use?",
      aEn: "The mobile app is built with Flutter using Riverpod, GoRouter, Dio, and Flutter Secure Storage. The backend runs on Cloudflare Workers with the Hono framework, a Cloudflare D1 database, Cloudflare KV caching, and JWT authentication, and it integrates the VirusTotal API and the Google Gemini API.",
    },
    {
      q: "ماذا يتضمن التقرير الذي يعرضه التطبيق؟",
      a: "يعرض التطبيق حالة الرابط أو الملف، وملخصًا أمنيًا مبسطًا بمستوى الخطورة، ونصائح وقائية يولدها Gemini، مع إمكانية الاطلاع على تفاصيل نتائج محركات VirusTotal. وتُحفظ كل عملية في سجل فحوصات قابل للبحث والتصفية، وتظهر إحصائيات الاستخدام في الملف الشخصي.",
      qEn: "What does the app's report contain?",
      aEn: "The app shows the status of the link or file, a simplified security summary with a risk level, and preventive advice generated by Gemini, with the option to view the VirusTotal engine details. Each scan is saved in a searchable, filterable history, and usage statistics appear on the profile screen.",
    },
    {
      q: "ما حدود النسخة الحالية من CyberShield؟",
      a: "يعمل التطبيق على Android فقط، ويقتصر على التحليل الثابت المعتمد على نتائج VirusTotal دون تحليل ديناميكي أو حماية فورية، ويتطلب اتصالًا بالإنترنت. ولا يتضمن الكتاب قياسات كمية لدقة الكشف أو زمن الاستجابة، إذ إن زمن 3 ثوانٍ للاستعلامات المتكررة هدف محدد في نطاق المشروع وليس نتيجة مقيسة.",
      qEn: "What are the limitations of the current CyberShield version?",
      aEn: "The app runs on Android only, is limited to static analysis based on VirusTotal results without dynamic analysis or real-time protection, and requires an internet connection. The book contains no quantitative measurements of detection accuracy or response time; the 3-second figure for repeated queries is a target in the project scope, not a measured result.",
    },
  ],

  "projectforge-platform": [
    {
      q: "ما هي منصة ProjectForge؟",
      a: "هي تطبيق جوال ومنصة ذكية نفذها فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، تساعد طلاب السنوات النهائية على اختيار مشروع أكاديمي يناسب مهاراتهم وتخطيطه وتشكيل فريق متوازن. وتعتمد على ملف مهارات رقمي (Project-DNA) وخوارزمية توصية موزونة وخارطة طريق ومؤشر جاهزية.",
      qEn: "What is ProjectForge?",
      aEn: "It is a mobile app and intelligent platform built by a team of students with technical assistance from Techno Enjaz, helping final-year students choose an academic project that fits their skills, plan it, and form a balanced team. It relies on a digital skills profile (Project-DNA), a weighted recommendation algorithm, a roadmap, and a readiness indicator.",
    },
    {
      q: "كيف تعمل خوارزمية التوصية ومؤشر الجاهزية في ProjectForge؟",
      a: "تحسب خوارزمية التوصية درجة التوافق بجمع حاصل ضرب مستوى إتقان الطالب لكل مهارة (1–5) في وزنها بالمشروع ثم القسمة على 5. أما مؤشر الجاهزية فمجموع موزون لتغطية المهارات (0.5) وعامل الصعوبة (0.3) وتوازن الفريق (0.2)، ففي المثال الموثق حصل طالب فردي على 63% وفريق رباعي على 68%.",
      qEn: "How do ProjectForge's recommendation algorithm and readiness indicator work?",
      aEn: "The recommendation algorithm computes a match score by summing each skill's proficiency (1–5) multiplied by its weight in the project, then dividing by 5. The readiness indicator is a weighted sum of skill coverage (0.5), a difficulty factor (0.3), and team balance (0.2); in the documented examples a solo student scored 63% and a four-member team 68%.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء ProjectForge؟",
      a: "بُني التطبيق بإطار Flutter ولغة Dart مع مكتبة Dio، والخادم بإطار Laravel مع مصادقة Sanctum وقاعدة بيانات MySQL. ودُمج نموذج Gemini 3.5 Flash بمعامل Temperature = 0.4 و8 أدوات لاستدعاء الدوال، مع بروتوكول MCP لجلب بيانات الطالب، وثلاث طبقات للحد من الهلوسة تنتهي بقالب ثابت احتياطي.",
      qEn: "Which technologies were used to build ProjectForge?",
      aEn: "The app uses Flutter and Dart with the Dio library, and the server uses Laravel with Sanctum authentication and a MySQL database. Gemini 3.5 Flash is integrated with Temperature = 0.4 and 8 function-calling tools, with MCP used to fetch student data, and three anti-hallucination layers ending in a static fallback template.",
    },
    {
      q: "هل مؤشر الجاهزية في ProjectForge دقيق أو مثبت إحصائيًا؟",
      a: "لا، فالمشروع يوضح أن المؤشر قيمة استرشادية وأن أوزانه قرارات تصميمية وليست مستنتجة من بيانات حقيقية، ولا يوجد حاليًا تقييم كمي مثل Precision أو Recall. ويقترح المشروع تقييمه بعد فصلين دراسيين وجمع 30 مشروعًا على الأقل باستخدام مقاييس مثل R² وMAE وNDCG@k.",
      qEn: "Is ProjectForge's readiness indicator accurate or statistically validated?",
      aEn: "No. The project explains that the indicator is an advisory value whose weights are design decisions rather than derived from real data, and there is currently no quantitative evaluation such as Precision or Recall. It proposes evaluating it after two semesters and at least 30 projects using metrics such as R², MAE, and NDCG@k.",
    },
    {
      q: "من المستخدمون في المنصة وما الذي يقدمه لكل منهم؟",
      a: "يستخدم الطالب المنصة لبناء ملف مهاراته واستعراض المشاريع والفرق وحساب مؤشر الجاهزية ومتابعة خطة العمل. ويدير المشرف الأكاديمي طلبات الإشراف فيقبلها أو يرفضها مع بيان السبب، بينما يدير مدير النظام المشاريع والمستخدمين والفرق والإعلانات ويستخدم مساعدًا ذكيًا للاستعلام عن بيانات النظام.",
      qEn: "Who uses the platform, and what does it offer each of them?",
      aEn: "Students use it to build their skills profile, browse projects and teams, calculate the readiness indicator, and follow their work plan. Academic advisors handle supervision requests, accepting or rejecting them with a reason, while the system administrator manages projects, users, teams, and announcements and uses an AI assistant to query system data.",
    },
  ],

  "ai-dental-diagnosis": [
    {
      q: "ما هي منصة Smart Dent AI لتشخيص أمراض الأسنان؟",
      a: "منصة ويب مساعدة لأطباء الأسنان تحلل الصور السريرية والشعاعية بنموذج لغوي رؤيوي مثل Gemini 3.1 Pro، وتولّد تقريرًا تشخيصيًا أوليًا بالعربية يحدد الحالات المرضية ومواقعها بترقيم FDI، ثم ترسم حدود كل إصابة بنموذج التجزئة SAM. نفذها فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، ويبقى التشخيص النهائي من اختصاص الطبيب.",
      qEn: "What is the Smart Dent AI dental diagnosis platform?",
      aEn: "An assistive web platform for dentists that analyzes clinical and radiographic images with a vision-language model such as Gemini 3.1 Pro, generates a preliminary Arabic diagnostic report locating findings with FDI numbering, then outlines each lesion with the SAM segmentation model. It was built by a team of students with technical assistance from Techno Enjaz; the final diagnosis remains the dentist's.",
    },
    {
      q: "كيف يعمل النموذج اللغوي الرؤيوي مع نموذج SAM في المنصة؟",
      a: "يعيد النموذج اللغوي الرؤيوي تقريرًا بصيغة JSON صارم يتضمن المرض ورقم السن والخطورة ودرجة الثقة والتوصية وصندوقًا تقريبيًا لكل إصابة. يمرَّر كل صندوق إلى SAM الذي يعمل محليًا على الخادم فينتج قناعًا دقيقًا، وتستخرج منه OpenCV مضلعًا يُرسم فوق الصورة وتُظلَّل الأسنان المصابة على خريطة FDI.",
      qEn: "How do the vision-language model and SAM work together in the platform?",
      aEn: "The vision-language model returns a strict JSON report with the condition, tooth number, severity, confidence, recommendation, and an approximate box for each lesion. Each box is passed to SAM, running locally on the server, which produces a precise mask; OpenCV extracts a polygon from it that is drawn over the image, and affected teeth are highlighted on the FDI tooth map.",
    },
    {
      q: "ما النتائج المقاسة لمنصة تشخيص الأسنان؟",
      a: "بلغ متوسط دقة التجزئة بمقياس IoU نحو 0.89 على صور اختبار متنوعة (بين 0.815 و0.939). واستغرق التحليل الكامل لصورة نحو 58 إلى 60 ثانية على معالج Intel Core i5 دون معالج رسوميات، منها نحو 18.7 ثانية لتشفير الصورة في SAM و10 إلى 40 ثانية لاستدعاء Gemini.",
      qEn: "What measured results did the dental diagnosis platform achieve?",
      aEn: "Mean segmentation accuracy was about 0.89 IoU on varied test images (ranging from 0.815 to 0.939). A full analysis took about 58–60 seconds per image on an Intel Core i5 CPU without a GPU, including about 18.7 seconds for SAM image encoding and 10–40 seconds for the Gemini call.",
    },
    {
      q: "لماذا لم يُعتمد YOLO وحده لتشخيص أمراض الأسنان؟",
      a: "دُرّب YOLOv8 للمقارنة على 1800 صورة لأربع حالات وحقق Precision بنسبة 92.4% وmAP@0.5 بنسبة 93.1%، وهو أسرع بكثير. لكنه يعطي أسماء أمراض وصناديق تقريبية فقط، ويحتاج إعادة تدريب لإضافة أي مرض، بينما يقدم النهج المقترح تقارير عربية مفصلة ومضلعات دقيقة ويضيف أمراضًا بتعديل التعليمات فقط.",
      qEn: "Why wasn't YOLO alone used for dental diagnosis?",
      aEn: "A YOLOv8 model trained for comparison on 1,800 images of four conditions reached 92.4% precision and 93.1% mAP@0.5 and is far faster. But it only outputs condition names and rough boxes and needs retraining to add any condition, whereas the proposed approach produces detailed Arabic reports and precise polygons and adds conditions by editing prompts.",
    },
    {
      q: "ما حدود منصة تشخيص الأسنان الحالية؟",
      a: "يستغرق التحليل قرابة دقيقة لكل صورة على المعالج المركزي، ويعتمد تحليل النموذج اللغوي على خدمات سحابية تتطلب إرسال الصور إلى خوادم خارجية. كما أن قيم IoU مقيسة على عدد محدود من صور الاختبار وليست تقييمًا سريريًا واسعًا، والمنصة أداة مساعدة لا تحل محل الطبيب.",
      qEn: "What are the limitations of the current dental diagnosis platform?",
      aEn: "Analysis takes about a minute per image on the CPU, and the language-model analysis relies on cloud services that require sending images to external servers. The IoU values were measured on a limited number of test images rather than a broad clinical evaluation, and the platform is an assistive tool that does not replace the dentist.",
    },
  ],

  "smart-air-writing-board": [
    {
      q: "ما هو اللوح الذكي للكتابة والرسم في الهواء؟",
      a: "هو نظام تفاعلي يحوّل كاميرا الويب العادية إلى أداة إدخال تتيح الكتابة والرسم بالإصبع في الهواء دون قلم أو عتاد إضافي، نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. ويهدف إلى تقديم بديل منخفض التكلفة للسبورات الذكية وأجهزة الرسم الرقمية في البيئات التعليمية.",
      qEn: "What is the smart air-writing and drawing board?",
      aEn: "It is an interactive system that turns an ordinary webcam into an input tool for writing and drawing with a finger in the air, with no pen or extra hardware, built by a team of students with technical assistance from Techno Enjaz. It aims to offer a low-cost alternative to smart boards and digital drawing tablets in educational settings.",
    },
    {
      q: "كيف يتعرف اللوح الذكي على إيماءات اليد؟",
      a: "يستخرج نموذج MediaPipe Hands الجاهز إحداثيات 21 نقطة مفصلية في اليد، ثم يحدد النظام الإيماءة من عدد الأصابع المرفوعة والمسافات بين رؤوس الأصابع والمعصم. رفع السبابة يعني الكتابة، ورفع إصبعين يعني اختيار الألوان والأدوات، ورفع الإبهام يحفظ لقطة من اللوح.",
      qEn: "How does the smart board recognize hand gestures?",
      aEn: "The ready-made MediaPipe Hands model extracts the coordinates of 21 hand landmarks, and the system identifies the gesture from the number of raised fingers and the distances between fingertips and the wrist. A raised index finger means writing, two fingers select colors and tools, and a raised thumb saves a snapshot of the board.",
    },
    {
      q: "كيف يحل اللوح الذكي المعادلات الرياضية المكتوبة يدويًا؟",
      a: "يحدد المستخدم المعادلة ويؤكد الإرسال، فيقص النظام منطقتها ويحولها إلى تدرج رمادي مع عكس الألوان، ثم يرسلها إلى Google Gemini API بتعليمات مقيدة بالرياضيات. يعيد النموذج الحل مع خطواته، ويعرض النظام تنبيهًا بدل النتيجة إذا كانت المعادلة غير واضحة، ويجري الاتصال في مسار منفصل حتى لا يتجمد بث الكاميرا.",
      qEn: "How does the smart board solve handwritten math equations?",
      aEn: "The user selects the equation and confirms sending; the system crops it, converts it to grayscale with inverted colors and sends it to the Google Gemini API with math-only instructions. The model returns the solution with its steps, the system shows a warning instead if the equation is unclear, and the call runs in a separate thread so the camera feed does not freeze.",
    },
    {
      q: "ما التقنيات المستخدمة في اللوح الذكي؟",
      a: "بُني النظام بلغة Python باستخدام MediaPipe Hands لتتبع اليد، وOpenCV لالتقاط الفيديو والرسم والواجهة، وNumPy وmath للحسابات الهندسية، وthreading للمعالجة المتوازية، وrequests وjson وbase64 للاتصال بـ Gemini، وPIL وos وdotenv لعرض النصوص وإدارة الملفات وحماية مفتاح API.",
      qEn: "Which technologies does the smart board use?",
      aEn: "The system is built in Python with MediaPipe Hands for hand tracking, OpenCV for video capture, drawing and the interface, NumPy and math for geometric calculations, threading for parallel processing, requests, json and base64 for calling Gemini, and PIL, os and dotenv for text rendering, file management and protecting the API key.",
    },
    {
      q: "ما حدود اللوح الذكي الحالي ونتائجه؟",
      a: "عمل النظام لحظيًا بكاميرا ويب وحاسوب متوسط دون معالج رسوميات، لكن الكتاب لم يعرض قياسات كمية للدقة أو عدد الإطارات. ويتتبع يدًا واحدة فقط، ويتأثر باهتزاز النقاط والإضاءة وإخفاء الأصابع وغياب العمق، وقد تلتبس بعض الرموز والكسور في المعادلات المكتوبة في الهواء.",
      qEn: "What are the current smart board's results and limits?",
      aEn: "The system ran in real time with a webcam on a mid-range computer without a GPU, but the book reports no quantitative accuracy or frame-rate figures. It tracks one hand only and is affected by landmark jitter, lighting, finger occlusion and lack of depth, and some symbols and fractions in air-written equations can be misread.",
    },
  ],

  "code-analysis-assistant": [
    {
      q: "ما هي منصة EHCode Hub؟",
      a: "هي منصة نفذها فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، تعمل حاضنة تقييم لمقارنة نماذج الذكاء الاصطناعي في توليد الكود. تفحص المشاريع المولدة وتشغّلها تلقائيًا وتعرضها داخل iframe، وتوفر دليلًا لكل مشروع وجدول مقارنة، إضافة إلى محرر أكواد ذكي ومساعد برمجي باسم EHCode مبني على opencode.",
      qEn: "What is the EHCode Hub platform?",
      aEn: "It is a platform built by a team of students with technical assistance from Techno Enjaz that works as a benchmark harness for comparing AI code-generation models. It scans and automatically launches generated projects inside an iframe, provides a guide per project and a comparison table, and includes a smart code editor and a coding assistant called EHCode, built on opencode.",
    },
    {
      q: "كيف تشغّل المنصة المشاريع المولدة تلقائيًا؟",
      a: "يصنّف خادم Node.js كل مشروع حسب ملفاته (package.json أو requirements.txt أو pubspec.yaml)، ثم ينفذ npm install أو pip install ويطلق الخادم في الخلفية بعد تحرير المنفذ، أو يخدم المشروع الثابت مباشرة. وتستقصي الواجهة الجاهزية كل 1.5 ثانية حتى 20 محاولة ثم تعرض المشروع، بينما تُشغَّل مشاريع Flutter يدويًا.",
      qEn: "How does the platform launch generated projects automatically?",
      aEn: "The Node.js server classifies each project by its files (package.json, requirements.txt, or pubspec.yaml), then runs npm install or pip install and starts the server in the background after freeing the port, or serves static projects directly. The frontend polls readiness every 1.5 seconds for up to 20 attempts before showing the project, while Flutter projects are run manually.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء المنصة؟",
      a: "بُني الخادم بـ Node.js باستخدام وحداته المدمجة فقط (http وfs وpath وurl وchild_process) دون أي اعتماديات خارجية، والواجهة بـ HTML5 وCSS3 وJavaScript الخام. ويعتمد المساعد على opencode مع دعم MCP وPlaywright، وتُقلع المكونات بملفات Batch على Windows.",
      qEn: "What technologies were used to build the platform?",
      aEn: "The server was built with Node.js using only its built-in modules (http, fs, path, url, and child_process) with no external dependencies, and the interface with HTML5, CSS3, and vanilla JavaScript. The assistant is based on opencode with MCP and Playwright support, and the components are started with Batch files on Windows.",
    },
    {
      q: "ما نتائج مقارنة نماذج توليد الكود في المشروع؟",
      a: "أنتج كل من GLM-5.1 وDeepSeek V4 Pro وMiMo V2.5 Pro عشرين مشروعًا، وحصل GLM-5.1 على أعلى مجموع موزون (8.78 من 10) يليه DeepSeek V4 Pro (8.75) ثم MiMo V2.5 Pro (7.96). وأنتج DeepSeek صفحات HTML بدل تطبيقات Flutter في مهمتي الجوال، وكان GLM-5.1 الأفضل توثيقًا بخمسة ملفات README.",
      qEn: "What were the results of the code-generation model comparison?",
      aEn: "GLM-5.1, DeepSeek V4 Pro, and MiMo V2.5 Pro each produced twenty projects. GLM-5.1 achieved the highest weighted score (8.78 out of 10), followed by DeepSeek V4 Pro (8.75) and MiMo V2.5 Pro (7.96). DeepSeek produced HTML pages instead of Flutter apps for the two mobile tasks, and GLM-5.1 had the best documentation with five README files.",
    },
    {
      q: "ما حدود هذا التقييم؟",
      a: "اعتمد التقييم على 20 مهمة وثلاثة نماذج فقط، ويذكر المشروع أن تسجيل الدرجات وتحديث بيانات النتائج ما زالا لازمين لإتمام التقييم الكمي، دون تفصيل طريقة منح الدرجات. كما تعمل المنصة حاليًا على Windows، ومن التطويرات المقترحة أتمتة التقييم ودمج معايير HumanEval وMBPP وSWE-bench.",
      qEn: "What are the limitations of this evaluation?",
      aEn: "The evaluation relied on 20 tasks and only three models, and the project states that score registration and updating the results data are still needed to complete the quantitative evaluation, without detailing how scores were assigned. The platform currently runs on Windows; proposed developments include automating evaluation and integrating HumanEval, MBPP, and SWE-bench.",
    },
  ],

  "markdown-pdf-api-mcp-tool": [
    {
      q: "ما هي أداة API وMCP لتحويل Markdown إلى PDF؟",
      a: "خدمة سحابية تعمل بالكامل على بنية Serverless في Cloudflare، نُفذت كمشروع أكاديمي طلابي بمساعدة تقنية من مكتب تكنو إنجاز. تحوّل مستندات Markdown إلى PDF مع دعم العربية RTL ومخططات PlantUML بصيغة SVG ومعادلات LaTeX، وتُتاح عبر واجهة ويب وREST API وخادم MCP.",
      qEn: "What is the API & MCP tool for converting Markdown to PDF?",
      aEn: "A cloud service running entirely on Cloudflare's serverless platform, built as a student academic project with technical assistance from Techno Enjaz. It converts Markdown documents to PDF with Arabic RTL support, PlantUML diagrams as SVG, and LaTeX equations, and is available through a web interface, a REST API, and an MCP server.",
    },
    {
      q: "كيف تعمل عملية التحويل من Markdown إلى PDF؟",
      a: "تتحقق الواجهة الخلفية (Hono) من الهوية بـ JWT ومن المدخلات بـ Zod، ثم تستخرج Gray-matter البيانات الوصفية، وتحوّل Marked النص إلى HTML مع تلوين Highlight.js ومعادلات KaTeX. تُدمج مخططات PlantUML كـ Inline SVG، ثم يولّد Cloudflare Browser Rendering (Puppeteer) ملف PDF وتُسجّل العملية في قاعدة D1.",
      qEn: "How does the Markdown-to-PDF conversion work?",
      aEn: "The Hono back end verifies identity with JWT and validates input with Zod, then Gray-matter extracts the frontmatter and Marked converts the text to HTML, with Highlight.js code coloring and KaTeX equations. PlantUML diagrams are embedded as inline SVG, Cloudflare Browser Rendering (Puppeteer) generates the PDF, and the operation is logged in D1.",
    },
    {
      q: "ما الذي يقدمه خادم MCP في هذه الأداة؟",
      a: "يعمل خادم MCP فوق Cloudflare Pages بنقل Streamable HTTP، ويوفر لوكلاء الذكاء الاصطناعي أدوات لتحويل Markdown إلى PDF، واستعراض المستندات المحفوظة، وجلب مستند محدد، وإنشاء جلسات ضيف مؤقتة. ويرافقه ملف OpenClaw Skill يصف إمكانات الخدمة ومعاملاتها.",
      qEn: "What does the MCP server provide in this tool?",
      aEn: "The MCP server runs on Cloudflare Pages over Streamable HTTP and gives AI agents tools to convert Markdown to PDF, list saved documents, fetch a specific document, and create temporary guest sessions. It is accompanied by an OpenClaw Skill file describing the service's capabilities and parameters.",
    },
    {
      q: "ما نتائج اختبار الأداة؟",
      a: "نجحت الاختبارات الوظيفية في تحويل العناوين والقوائم والروابط دون تشوه في الاتجاه، والمعادلات السطرية والمستقلة والمصفوفات، وتلوين شيفرات JavaScript وPython وCSS وSQL وJSON، ومخططات PlantUML التسلسلية والفئات والتدفق كرسوميات SVG. ولم يقس التقرير أزمنة الاستجابة أو سعة التحمل.",
      qEn: "What were the tool's test results?",
      aEn: "Functional tests successfully converted headings, lists, and links without direction distortion; inline and display equations and matrices; JavaScript, Python, CSS, SQL, and JSON code highlighting; and PlantUML sequence, class, and flow diagrams as SVG graphics. The report did not measure response times or load capacity.",
    },
    {
      q: "لمن تناسب هذه الأداة وما حدودها؟",
      a: "تستهدف المطورين وكتّاب المحتوى التقني والباحثين والشركات التي تحتاج إلى توليد PDF آليًا، خاصة بالعربية. أما حدودها فتشمل الاعتماد على خادم PlantUML خارجي، واقتصار الصيغ على Markdown إلى PDF، وغياب المعالجة المتوازية وميزات التعاون في النسخة الحالية.",
      qEn: "Who is the tool for, and what are its limitations?",
      aEn: "It targets developers, technical writers, researchers, and companies that need automated PDF generation, especially in Arabic. Its limitations include reliance on an external PlantUML server, support for Markdown-to-PDF only, and no parallel processing or collaboration features in the current version.",
    },
  ],

  "interactive-educational-robot": [
    {
      q: "ما هو الروبوت التفاعلي الذكي لتعليم الأطفال؟",
      a: "روبوت تعليمي بهيكل مطبوع ثلاثي الأبعاد نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. يلتقط بكاميرا أمامية صورة البطاقة أو العنصر الذي يعرضه الطفل، فيتعرف على الأرقام والأحرف الإنجليزية والفواكه والألوان، ثم يشغّل ملفًا صوتيًا ينطق اسم العنصر.",
      qEn: "What is the interactive AI educational robot for children?",
      aEn: "An educational robot with a 3D-printed body, built by a team of students with technical assistance from Techno Enjaz. A front camera captures the card or object a child shows it, the robot recognizes numbers, English letters, fruits, or colors, and then plays an audio clip naming the item.",
    },
    {
      q: "ما التقنيات التي يستخدمها الروبوت للتعرف على العناصر؟",
      a: "يستخدم EasyOCR بنية CRNN للتعرف على الأرقام والأحرف الإنجليزية، وخوارزمية YOLO لاكتشاف الفواكه، وتحويل الصورة إلى فضاء الألوان HSV مع عتبة لونية لتحديد اللون المسيطر. والبرنامج مكتوب بلغة Python مع واجهة رسومية تعرض البث المباشر ونسبة الثقة.",
      qEn: "Which technologies does the robot use to recognize items?",
      aEn: "It uses EasyOCR (a CRNN architecture) for numbers and English letters, the YOLO algorithm to detect fruits, and conversion to the HSV color space with color thresholding to find the dominant color. The software is written in Python with a GUI showing the live feed and confidence score.",
    },
    {
      q: "ما المكونات الإلكترونية في الروبوت التعليمي؟",
      a: "يضم الروبوت لوحة Arduino Nano للتحكم، ووحدة Bluetooth HC-05 للاتصال اللاسلكي، وثلاثة محركات سيرفو MG995 (واحد لليد واثنان للقدمين)، ومحول جهد خافض LM2596، وبطاريتي Li-ion 18650، إضافة إلى كاميرا رقمية ومكبر صوت.",
      qEn: "What electronic components does the educational robot use?",
      aEn: "The robot includes an Arduino Nano controller, an HC-05 Bluetooth module for wireless communication, three MG995 servo motors (one for the arm, two for the legs), an LM2596 step-down converter, and two Li-ion 18650 batteries, plus a digital camera and a speaker.",
    },
    {
      q: "ما النتائج التي حققها الروبوت؟",
      a: "أظهر التطبيق العملي نجاح الروبوت في التعرف على الفئات الأربع مباشرة من صور الكاميرا، مع عرض اسم العنصر ونسبة الثقة وتشغيل الصوت المناسب، واستقرار العمل أثناء التشغيل المستمر. لكن التقرير لا يتضمن قياسات كمية مثل نسبة الدقة لكل فئة أو عدد الصور المختبرة.",
      qEn: "What results did the robot achieve?",
      aEn: "Practical testing showed the robot recognizing all four categories directly from camera images, displaying the item name and confidence score, playing the matching audio, and running stably during continuous operation. However, the report includes no quantitative measurements such as per-category accuracy or the number of images tested.",
    },
    {
      q: "ما حدود النسخة الحالية من الروبوت؟",
      a: "يقتصر التعرف على الأرقام والأحرف الإنجليزية والفواكه والألوان، والحركة المنفذة فعليًا حركة ترحيبية واحدة عند بدء التشغيل. كما أن الأصوات مسجلة مسبقًا ولا يجري الروبوت محادثة مفتوحة، ولا يتضمن تتبعًا لتقدم الطفل، وهي جوانب مذكورة ضمن التطويرات المستقبلية.",
      qEn: "What are the limitations of the current version?",
      aEn: "Recognition is limited to numbers, English letters, fruits, and colors, and the only movement actually implemented is a single welcome gesture at startup. Voice clips are pre-recorded, the robot holds no open conversation, and it does not track the child's progress; these are listed as future developments.",
    },
  ],

  "online-fitness-coach": [
    {
      q: "ما هو تطبيق Online Fitness Coach؟",
      a: "هو تطبيق جوال للتدريب الرياضي المنزلي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، ويستخدم Gemini API لتوليد خطط تدريبية ونصائح وتقارير مخصصة. ويجمع بين مدرب ذكي ومدربين بشريين يمكن حجز جلسات معهم وإرسال الاستفسارات إليهم.",
      qEn: "What is the Online Fitness Coach app?",
      aEn: "It is a mobile app for home fitness training built by a team of students with technical assistance from Techno Enjaz, using the Gemini API to generate personalized training plans, tips, and reports. It combines an AI coach with human trainers whom users can book sessions with and send inquiries to.",
    },
    {
      q: "كيف يولّد المدرب الذكي الخطط التدريبية؟",
      a: "يُدخل المستخدم بيانات مثل العمر والطول والوزن والأهداف ومستوى النشاط، فيرسلها الخادم الخلفي على Cloudflare Workers إلى Gemini API مع تعليمات موجهة تُلزم النموذج بإجابات مبنية على مراجع رياضية. يعود الرد بصيغة JSON ويُعرض برنامجًا أسبوعيًا ونصائح يومية تتكيف مع الوجبات والتمارين التي يسجلها المستخدم.",
      qEn: "How does the AI coach generate training plans?",
      aEn: "The user enters data such as age, height, weight, goals, and activity level, and the Cloudflare Workers back end sends it to the Gemini API with engineered prompts that require answers grounded in fitness references. The response comes back as JSON and is shown as a weekly program and daily tips that adapt to the meals and workouts the user logs.",
    },
    {
      q: "ما التقنيات المستخدمة في التطبيق؟",
      a: "بُنيت الواجهة بإطار Flutter ولغة Dart مع دعم العربية واتجاه RTL، والخادم الخلفي على Cloudflare Workers، وقاعدة البيانات Cloudflare D1 المبنية على SQLite، وتخزين Cloudflare R2 لفيديوهات التمارين المرجعية. ويتولى Gemini API من Google الوظائف الذكية مثل توليد الخطط والنصائح والتقارير.",
      qEn: "Which technologies does the app use?",
      aEn: "The interface is built with Flutter and Dart with Arabic and RTL support, the back end runs on Cloudflare Workers, the database is SQLite-based Cloudflare D1, and Cloudflare R2 stores reference exercise videos. Google's Gemini API handles the intelligent functions such as generating plans, tips, and reports.",
    },
    {
      q: "هل يحلل التطبيق حركة المستخدم بالكاميرا أو يصحح أداء التمارين؟",
      a: "لا، فالتخصيص يعتمد على النصوص والبيانات الرقمية فقط، ولا يعالج التطبيق صور المستخدم أو فيديوهاته، والفيديوهات المعروضة مرجعية تعليمية. ويقدم التطبيق توجيهات مكتوبة مثل نطاق التكرارات وأوقات الراحة وأهمية الإحماء، أما تحليل الحركة فخارج نطاق النسخة الحالية.",
      qEn: "Does the app analyze the user's movement with the camera or correct exercise form?",
      aEn: "No. Personalization relies only on text and numeric data, the app does not process the user's photos or videos, and the videos it shows are for reference. It offers written guidance such as rep ranges, rest times, and the importance of warming up, while movement analysis is outside the scope of the current version.",
    },
    {
      q: "ما النتائج الموثقة للمشروع وما حدوده؟",
      a: "يوثق المشروع تنفيذ التطبيق بواجهاته (البرنامج الأسبوعي، النصائح اليومية، التقارير الشهرية، الحجوزات، الاستفسارات) وتكامله مع Gemini API، لكنه لا يتضمن قياسات كمية للأداء أو تجربة مع متدربين. ومن حدوده الاعتماد على الإنترنت والخدمات السحابية، واستهداف Android وتمارين وزن الجسم الأساسية، وعدم تقييم جودة الخطط علميًا مقارنةً بمدرب بشري.",
      qEn: "What results does the project document, and what are its limits?",
      aEn: "The project documents the implemented app and its screens (weekly program, daily tips, monthly reports, bookings, inquiries) and its Gemini API integration, but includes no quantitative performance measurements or trial with trainees. Its limits include dependence on the internet and cloud services, a focus on Android and core bodyweight exercises, and no scientific evaluation of plan quality against a human trainer.",
    },
  ],

  "nabd-child-psychological-assessment": [
    {
      q: "ما هو نظام نبض للتقييم النفسي للأطفال؟",
      a: "نبض نظام ويب يدعم التقييم النفسي الأولي للأطفال المتضررين من الحروب عبر تحليل السلوك غير اللفظي والمؤشرات الصوتية بنموذج Google Gemini، طُوّر كمشروع أكاديمي طلابي بمساعدة تقنية من مكتب تكنو إنجاز. وهو أداة داعمة لاتخاذ القرار وليس بديلًا عن التشخيص السريري.",
      qEn: "What is the Nabd psychological assessment system for children?",
      aEn: "Nabd is a web system that supports the preliminary psychological assessment of war-affected children by analyzing non-verbal behavior and vocal cues with Google Gemini, developed as a student academic project with technical assistance from Techno Enjaz. It is a decision-support tool, not a substitute for clinical diagnosis.",
    },
    {
      q: "كيف يعمل التحليل في نظام نبض؟",
      a: "ينشئ المعالج جلسة تحليل لحظي بالكاميرا والميكروفون أو يرفع فيديو مسجلًا، فيرسل خادم Laravel البيانات إلى Gemini بإطار كل 3 ثوانٍ في الجلسة اللحظية. تعود النتائج بصيغة JSON ويحولها الخادم إلى مؤشرات من 0 إلى 100 وتصنيفات سلوكية عربية، مع تنبيهات فورية ومسودة تقرير يراجعها المعالج ويعتمدها.",
      qEn: "How does analysis work in Nabd?",
      aEn: "The therapist starts a live session with camera and microphone or uploads a recorded video, and the Laravel server sends the data to Gemini, one frame every 3 seconds in live mode. Results come back as JSON and are converted into 0–100 indicators and Arabic behavioral labels, with real-time alerts and a draft report that the therapist reviews and approves.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء نبض؟",
      a: "الواجهة الأمامية React 19 وTypeScript مع Vite وTailwind CSS وAxios، والخادم Laravel 12 على PHP 8.2، وقاعدة البيانات MySQL. ويُستخدم نموذج gemini-3-flash-preview بمستوى تفكير منخفض للبث المباشر ومرتفع لتحليل الفيديو ومتوسط لإنشاء التقارير.",
      qEn: "Which technologies were used to build Nabd?",
      aEn: "The front end uses React 19 and TypeScript with Vite, Tailwind CSS, and Axios; the server is Laravel 12 on PHP 8.2; and the database is MySQL. The gemini-3-flash-preview model is used with a low thinking level for live streaming, high for video analysis, and medium for report generation.",
    },
    {
      q: "ما النتائج التي حققها نظام نبض؟",
      a: "في بيئة محاكاة سجل النظام زمن استجابة بين 1.5 و4 ثوانٍ لكل إطار تحليل مع التقاط إطار كل 3 ثوانٍ، وعرض 7 مناطق تفاعلية منها 4 مؤشرات رئيسية (تفاعل الانتباه، النشاط الصوتي، التواصل البصري، التفاعل الاجتماعي). كما يعيد المحاولة حتى 3 مرات عند انقطاع الشبكة، لكن التقرير لا يتضمن قياسًا لدقة التشخيص مقارنة بالمختصين.",
      qEn: "What results did Nabd achieve?",
      aEn: "In a simulated environment the system recorded 1.5 to 4 seconds per analysis frame with one frame captured every 3 seconds, and displayed 7 interactive zones including 4 key indicators (attention engagement, vocal activity, eye contact, social interaction). It retries up to 3 times on network failures, but the report includes no measurement of diagnostic accuracy against specialists.",
    },
    {
      q: "ما حدود نظام نبض الحالية؟",
      a: "اختُبر النظام في بيئة محاكاة لا في عيادات مع أطفال فعليين، ولا توجد نسب دقة مقارنة بتشخيص المختصين. ويعتمد على خدمة Gemini السحابية، ما يعني إرسال وسائط الجلسات إلى جهة خارجية، لذا يتطلب أي استخدام فعلي موافقة ولي الأمر وإشراف مختص وضوابط خصوصية صارمة.",
      qEn: "What are Nabd's current limitations?",
      aEn: "The system was tested in a simulated environment rather than in clinics with real children, and there are no accuracy figures compared with specialists' diagnoses. It relies on the cloud-based Gemini service, so session media is sent to an external provider, meaning any real use requires guardian consent, specialist supervision, and strict privacy controls.",
    },
  ],

  "rifq-pet-care-platform": [
    {
      q: "ما هي منصة رِفق لرعاية الحيوانات؟",
      a: "رِفق منصة ويب عربية لرعاية الحيوانات الأليفة والشاردة وحمايتها، طوّرها فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. تجمع إدارة الملاجئ والتبني الإلكتروني والسجلات الطبية والسلوكية وعيادة ذكاء اصطناعي ومتجرًا للمستلزمات ونظام نقاط ولاء في منصة واحدة موجهة للبيئة السورية.",
      qEn: "What is the Rifq animal-care platform?",
      aEn: "Rifq is an Arabic web platform for the care and protection of pets and stray animals, developed by a team of students with technical assistance from Techno Enjaz. It brings shelter management, online adoption, medical and behavioral records, an AI clinic, a supplies store and a loyalty points system together in one platform aimed at the Syrian context.",
    },
    {
      q: "كيف تعمل رموز QR في منصة رِفق؟",
      a: "يُولَّد لكل حيوان معرّف UUID فريد ورمز QR بصيغة SVG عبر مكتبة Simple QRCode، ويُطبع على ملصق أو طوق عادي. عند مسحه بأي هاتف ذكي تُفتح صفحة عامة تعرض اسم الحيوان ونوعه وسلالته وعمره وصورته وسجلاته الطبية دون تسجيل دخول. وهو معرّف رقمي وليس جهاز تتبع.",
      qEn: "How do QR codes work in Rifq?",
      aEn: "Each animal gets a unique UUID and an SVG QR code generated with the Simple QRCode library, printed on a sticker or an ordinary collar. Scanning it with any smartphone opens a public page showing the animal's name, species, breed, age, photo and medical records without logging in. It is a digital identifier, not a tracking device.",
    },
    {
      q: "ماذا تقدم عيادة الذكاء الاصطناعي في رِفق؟",
      a: "تعتمد العيادة على Google Gemini API بالنموذجين gemini-2.5-flash وgemini-3.1-pro-preview لتحليل الصور واستخراج النوع والسلالة والحالة الصحية والسلوك ودرجة الثقة، ولتحليل الفيديو سلوكيًا عبر عدة إطارات. وتضم دردشة مع خبير سلوك مدعوم بالذكاء الاصطناعي، وخمس نصائح رعاية يومية، ودليلًا للأدوية البيطرية.",
      qEn: "What does Rifq's AI clinic offer?",
      aEn: "The clinic uses the Google Gemini API with the gemini-2.5-flash and gemini-3.1-pro-preview models to analyze images for species, breed, health status, behavior and a confidence score, and to analyze video behaviorally across several frames. It also offers a chat with an AI behavior expert, five daily care tips and a veterinary medicines guide.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء منصة رِفق؟",
      a: "بُنيت المنصة بإطار Laravel 12 ولوحة التحكم Filament بعشرة موارد، وقاعدة بيانات MySQL بثلاثة عشر جدولًا، وواجهة Blade مع Tailwind CSS وAlpine.js بدعم كامل للعربية وRTL. وتدير حزمة Spatie Permission خمسة أدوار هي المدير والطبيب البيطري والمواطن وممثل المنظمة والموظف.",
      qEn: "Which technologies were used to build Rifq?",
      aEn: "The platform is built with Laravel 12, the Filament admin panel with ten resources, a MySQL database with thirteen tables, and a Blade frontend with Tailwind CSS and Alpine.js with full Arabic and RTL support. The Spatie Permission package manages five roles: admin, veterinarian, citizen, organization representative and employee.",
    },
    {
      q: "ما مدى دقة تشخيصات رِفق وما حدود النسخة الحالية؟",
      a: "اختُبرت المكونات الرئيسية في بيئة تشغيلية محاكاة، لكن الكتاب لا يعرض قياسات كمية لدقة تحليلات Gemini، لذا تبقى نتائج العيادة تشخيصًا مبدئيًا لا يغني عن الطبيب البيطري. ويقتصر النظام على القطط والكلاب والطيور، ولا يتضمن بعدُ بوابة دفع إلكتروني أو تطبيقات للهواتف أو تتبعًا بـ GPS.",
      qEn: "How accurate are Rifq's diagnoses and what are the current limits?",
      aEn: "The main components were tested in a simulated operating environment, but the book reports no quantitative accuracy figures for Gemini's analyses, so the clinic's output remains a preliminary diagnosis that does not replace a veterinarian. The system covers cats, dogs and birds and does not yet include a payment gateway, mobile apps or GPS tracking.",
    },
  ],

  "eeg-brain-device-control": [
    {
      q: "كيف يحول النظام إشارات الدماغ إلى حركة؟",
      a: "تلتقط لوحة OpenBCI Cyton إشارات EEG بثماني قنوات وتردد 250 عينة/ثانية، ثم تُرشح بنوتش 50 هرتز وتمرير نطاق 8–30 هرتز وتُطبق عليها المرجع المشترك والتطبيع. يصنف نموذج EEGNet أو ShallowConvNet أو LDA النافذة الزمنية، ويترجم محول الأوامر الفئة إلى حرف S أو F أو B أو R أو L يُرسل عبر USB أو بلوتوث HC-05 إلى Arduino Uno يشغل مرحّلات محركات السيارة النموذجية.",
      qEn: "How does the system turn brain signals into motion?",
      aEn: "An OpenBCI Cyton board captures 8-channel EEG at 250 samples/second; the signal is filtered with a 50 Hz notch and an 8–30 Hz band-pass, re-referenced, and normalized. EEGNet, ShallowConvNet, or LDA classifies each time window, and a command mapper turns the class into S, F, B, R, or L, sent over USB or HC-05 Bluetooth to an Arduino Uno that switches the model car's motor relays.",
    },
    {
      q: "ما النتائج التي سجلها المشروع؟",
      a: "حقق نموذج تمييز فتح العينين وإغلاقهما دقة 86.22%، وبلغت أفضل دقة لمهمة حركية ثنائية على بيانات PhysioNet نحو 69.42%، وأظهرت النتائج الأولية زمن استجابة أقل من 500 ميلي ثانية من استقبال الإشارة إلى إصدار الأمر. أما المعايرة الشخصية ثلاثية الفئات فبقيت قرب مستوى الصدفة: بين 0% و21.43% بالتعلم العميق و33.63% بـ LDA.",
      qEn: "What results did the project record?",
      aEn: "The eyes open/closed model reached 86.22% accuracy, the best binary motor task on PhysioNet reached about 69.42%, and preliminary tests showed under 500 ms from signal acquisition to command. Three-class personal calibration stayed near chance: 0% to 21.43% with deep learning and 33.63% balanced accuracy with LDA.",
    },
    {
      q: "ما التقنيات والمكونات المستخدمة؟",
      a: "البرمجيات مكتوبة بـ Python مع BrainFlow وSciPy وMNE وscikit-learn وPyTorch، وواجهة ويب بـ FastAPI وواجهة سطح مكتب بـ Tkinter. أما العتاد فيشمل لوحة OpenBCI Cyton، ومتحكم Arduino Uno، ووحدة مرحّلات بأربع قنوات مستخدمة، ووحدة بلوتوث HC-05، وخافض جهد، وسيارة نموذجية.",
      qEn: "Which technologies and components are used?",
      aEn: "The software is written in Python with BrainFlow, SciPy, MNE, scikit-learn, and PyTorch, with a FastAPI web interface and a Tkinter desktop interface. The hardware includes an OpenBCI Cyton board, an Arduino Uno, a relay module with four channels in use, an HC-05 Bluetooth module, a step-down converter, and a model car.",
    },
    {
      q: "لماذا كانت دقة النماذج الشخصية منخفضة؟",
      a: "يعزو المشروع ذلك إلى قلة بيانات المعايرة (لا تتجاوز 33 محاولة في الجلسة النموذجية)، وضعف جودة بعض القنوات، وفجوة المجال بين بيانات PhysioNet (64 قناة، 160 هرتز) ونظام OpenBCI (8 قنوات، 250 هرتز). ويقترح جلسات متعددة بعشرين محاولة صالحة على الأقل لكل فئة، وبوابة جودة صارمة، وتقسيمًا على مستوى الجلسة أو الشخص.",
      qEn: "Why was the accuracy of personal models low?",
      aEn: "The project attributes it to scarce calibration data (no more than 33 trials in a typical session), poor quality on some channels, and the domain shift between PhysioNet (64 channels, 160 Hz) and OpenBCI (8 channels, 250 Hz). It proposes multiple sessions with at least 20 valid trials per class, a strict quality gate, and splitting at the session or subject level.",
    },
    {
      q: "هل النظام جهاز طبي؟",
      a: "لا؛ هو أداة بحثية تعليمية وليست جهازًا طبيًا. ويتطلب أي استخدام مع أشخاص أو في بيئات مفتوحة طبقات أمان مثل زر توقف طارئ وحدود سرعة ورفض الأوامر منخفضة الثقة، إضافة إلى تقييم مخاطر شامل.",
      qEn: "Is the system a medical device?",
      aEn: "No; it is an educational research tool, not a medical device. Any use with people or in open environments requires safety layers such as an emergency stop, speed limits, and rejection of low-confidence commands, plus a thorough risk assessment.",
    },
  ],

  "smart-attendance-antispoofing": [
    {
      q: "ما هو نظام تسجيل الحضور بالوجه مع كشف التلاعب؟",
      a: "نظام أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يسجل حضور الطلاب تلقائيًا بالتعرف على وجوههم عبر كاميرات القاعات. يستخدم نموذج FaceNet512 لاستخراج بصمة وجهية من 512 بُعدًا ويطابقها مع قاعدة بيانات SQLite، بعد التحقق من أن الوجه حي وليس صورة أو شاشة.",
      qEn: "What is the face attendance system with anti-spoofing?",
      aEn: "An academic system built by a team of students with technical assistance from Techno Enjaz that records student attendance automatically by recognizing faces through classroom cameras. It uses FaceNet512 to extract a 512-dimensional face embedding and matches it against an SQLite database, after verifying the face is live rather than a photo or screen.",
    },
    {
      q: "كيف يمنع النظام تسجيل الحضور بالنيابة؟",
      a: "يمر كل وجه بطبقة تحقق من الحيوية تعتمد على MediaPipe Face Mesh بـ468 نقطة وجهية. تكشف هذه الطبقة الرمش عبر مؤشر نسبة العين EAR، وتحلل العمق المكاني والنسيج (Laplacian Variance) والحركات الدقيقة بين الإطارات، فإذا اكتُشفت صورة مطبوعة أو شاشة يُرفض التسجيل ويضيء المؤشر الأحمر.",
      qEn: "How does the system prevent proxy attendance?",
      aEn: "Each face passes through a liveness layer based on MediaPipe Face Mesh with 468 facial landmarks. It detects blinking via the Eye Aspect Ratio (EAR) and analyzes spatial depth, texture (Laplacian variance), and micro-movements between frames; if a printed photo or screen is detected, the attempt is rejected and the red indicator lights up.",
    },
    {
      q: "كيف تعمل التغذية الراجعة عبر NodeMCU ESP8266؟",
      a: "بعد قرار المطابقة يُرسل الحاسب أمرًا داخل حزمة TCP عبر شبكة Wi-Fi إلى عنوان IP الخاص بوحدة NodeMCU ESP8266. الأمر \"1\" يضيء مؤشر LED الأخضر لتأكيد الحضور، والأمر \"0\" يضيء الأحمر عند فشل التحقق من الحيوية أو عدم وجود تطابق.",
      qEn: "How does the NodeMCU ESP8266 feedback work?",
      aEn: "After the matching decision, the PC sends a command in a TCP packet over Wi-Fi to the NodeMCU ESP8266's IP address. Command \"1\" lights the green LED to confirm attendance, and command \"0\" lights the red LED when the liveness check fails or no match is found.",
    },
    {
      q: "ما الواجهات والتقارير التي يوفرها النظام؟",
      a: "واجهة رسومية مبنية بـCustomTkinter تضم إدارة الكليات والتخصصات والمواد والقاعات والسنوات الدراسية، وإعداد جلسات الحضور بنافذة حضور ومدة تأخر، وشاشة تعرف مباشر لعدة قاعات. وتعرض تقارير الجلسات أعداد الحاضرين والمتأخرين والغائبين، مع لوحة تحليلات وتصدير إلى Excel عبر Pandas وOpenPyXL.",
      qEn: "What interfaces and reports does the system provide?",
      aEn: "A CustomTkinter GUI covering faculties, specializations, courses, rooms, and academic years, attendance session setup with an attendance window and lateness period, and a live recognition screen for multiple rooms. Session reports show present, late, and absent counts, with an analytics dashboard and Excel export through Pandas and OpenPyXL.",
    },
    {
      q: "ما مدى دقة النظام وما حدوده؟",
      a: "لا يقدم المشروع قياسات رقمية لدقة التعرف أو معدلات القبول والرفض الخاطئ أو نسبة كشف الانتحال، بل يوثق التصميم والواجهات المنفذة. ومن حدوده الاعتماد على كاميرا عادية دون حساسات عمق، وقاعدة بيانات محلية، والحاجة إلى ضبط عتبة المطابقة في القاعات المزدحمة.",
      qEn: "How accurate is the system and what are its limits?",
      aEn: "The project provides no numerical measurements of recognition accuracy, false acceptance or rejection rates, or spoofing-detection rate; it documents the design and implemented interfaces. Its limits include reliance on an ordinary camera without depth sensors, a local database, and the need to tune the matching threshold in crowded rooms.",
    },
  ],

  "gov-services-automation": [
    {
      q: "ما هو نظام أتمتة الاستعلامات والشكاوى والفواتير في الدوائر الحكومية؟",
      a: "هو تطبيق ويب ثنائي اللغة نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يحوّل معاملات ورقية حكومية إلى مسار رقمي. يتيح للمواطن تقديم الشكاوى والاستعلامات مثل البيان العائلي وإثبات غير موظف، والاطلاع على فواتيره، ومتابعة حالة كل طلب (قيد المعالجة، منجز، مرفوض).",
      qEn: "What is the government inquiries, complaints and bills automation system?",
      aEn: "It is a bilingual web application built by a team of students with technical assistance from Techno Enjaz that moves paper-based government transactions onto a digital track. Citizens can file complaints and inquiries such as family records and non-employment certificates, view their bills, and track each request's status (in progress, completed, rejected).",
    },
    {
      q: "ما الواجهات التي يتضمنها النظام؟",
      a: "يضم النظام ثلاث واجهات: بوابة المواطن لتقديم الطلبات وإرفاق المستندات ومتابعة الفواتير والإشعارات، ولوحة الموظف لمعالجة الشكاوى والاستعلامات وإدخال النتائج وإضافة ملاحظات داخلية، ولوحة مدير النظام لإدارة الفواتير والمستخدمين والأدوار وأنواع الخدمات وسجلات النظام.",
      qEn: "Which interfaces does the system include?",
      aEn: "The system has three interfaces: a citizen portal for submitting requests with attachments and following bills and notifications, an employee dashboard for processing complaints and inquiries, entering results, and adding internal notes, and an administrator dashboard for managing bills, users, roles, service types, and system logs.",
    },
    {
      q: "كيف يستخدم النظام الذكاء الاصطناعي؟",
      a: "يرتبط النظام بنموذج Gemini عبر مفتاح API من Google AI Studio. يُستخدم النموذج لتحسين صياغة نص الشكوى، وتحليلها بإعطاء مستوى أولوية وملخص تلقائي، وتوليد ردود رسمية أولية يراجعها الموظف قبل إرسالها إلى المواطن.",
      qEn: "How does the system use artificial intelligence?",
      aEn: "The system connects to the Gemini model through an API key from Google AI Studio. The model is used to improve complaint wording, analyze complaints by assigning a priority level and an automatic summary, and generate initial official replies that the employee reviews before sending them to the citizen.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء النظام؟",
      a: "بُني الخادم بإطار Laravel بنمط MVC مع قاعدة بيانات MySQL وطبقة Eloquent ORM، والواجهات بـ Tailwind CSS داخل قوالب Blade مع Alpine.js. أما لوحات الإدارة فبُنيت بـ Filament المعتمد على حزمة TALL مع Livewire، والتحليل الذكي عبر Gemini API.",
      qEn: "Which technologies were used to build the system?",
      aEn: "The backend uses Laravel with MVC, a MySQL database, and Eloquent ORM, and the interfaces use Tailwind CSS inside Blade templates with Alpine.js. The admin dashboards are built with Filament on the TALL stack with Livewire, and intelligent analysis runs through the Gemini API.",
    },
    {
      q: "هل النظام مرتبط بسجلات حكومية حقيقية وبوابات دفع؟",
      a: "لا، يعمل المشروع نموذج محاكاة للدورة المستندية دون ربط حي بخوادم الوزارات أو سجلات الدولة. كما لا يتضمن بوابة دفع مصرفية، إذ يعرض الفواتير ويوثق السداد عبر رفع إشعار الدفع أو التحويل، ويُعد الربط بمنصات الدفع والهوية الرقمية من التطويرات المستقبلية.",
      qEn: "Is the system connected to real government records and payment gateways?",
      aEn: "No. The project runs as a simulation prototype of the document cycle with no live connection to ministry servers or state records. It also has no bank payment gateway: it displays bills and documents payment through an uploaded payment or transfer notice, while integration with payment platforms and digital identity is listed as future work.",
    },
  ],

  "sports-injury-detection": [
    {
      q: "ما هو نظام كشف الإصابات الرياضية Gym AI؟",
      a: "تطبيق أكاديمي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يحلل فيديو تمارين المقاومة ليكشف الأخطاء الحركية التي قد تسبب إصابات عضلية هيكلية. يعمل على الكاميرا المباشرة أو ملفات الفيديو، ويغطي تمارين القرفصاء والبايسبس والرفرفة الجانبية.",
      qEn: "What is the Gym AI sports injury detection system?",
      aEn: "An academic application built by a team of students with technical assistance from Techno Enjaz that analyzes resistance-exercise video to detect movement errors that may cause musculoskeletal injuries. It works on a live camera or video files and covers the squat, bicep curl, and lateral raises.",
    },
    {
      q: "كيف يكشف النظام الأخطاء الحركية؟",
      a: "يستخرج MediaPipe Pose المبني على BlazePose 33 نقطة مفصلية من كل إطار، وتتحول إلى متجه من 99 قيمة فيصبح الفيديو سلسلة زمنية. ثم يحلل نموذج LSTM التسلسل كاملًا بدل اللقطة المنفردة، ويعتمد في نهج LSTM Autoencoder على ارتفاع خطأ إعادة البناء لاعتبار الحركة شاذة أو خاطئة.",
      qEn: "How does the system detect movement errors?",
      aEn: "MediaPipe Pose, based on BlazePose, extracts 33 joint landmarks from each frame, which become a 99-value vector, turning the video into a time series. An LSTM model then analyzes the whole sequence rather than a single frame, and in the LSTM Autoencoder approach a high reconstruction error marks the movement as anomalous or incorrect.",
    },
    {
      q: "ما البيانات التي دُرب عليها النموذج؟",
      a: "جُمعت البيانات من فيديوهات مصورة خصيصًا لأشخاص يؤدون التمارين بشكل صحيح وخاطئ، وفيديوهات مولدة بالذكاء الاصطناعي عبر منصة PixVerse AI، ومجموعات بيانات مفتوحة من Kaggle. حُوّلت جميعها إلى نقاط مفصلية محفوظة في ملف CSV، ولا يذكر المشروع عدد الفيديوهات أو تقسيمها.",
      qEn: "What data was the model trained on?",
      aEn: "The data came from videos recorded specifically of people performing the exercises correctly and incorrectly, AI-generated videos from PixVerse AI, and open datasets from Kaggle. All were converted into joint landmarks stored in a CSV file; the project does not state the number of videos or how they were split.",
    },
    {
      q: "ما النتائج التي حققها النظام؟",
      a: "أظهرت التجارب تمييز الأداء الصحيح من الخاطئ ضمن ظروف تصوير مناسبة واستجابة شبه فورية، مثل نتيجة \"Bicep Correct\" و\"Squat Wrong\" بقيمة ثقة 1.00، ونجاح الكشف في بيئة منزلية وزاوية أمامية. لكن المشروع لا يقدم نسبة دقة إجمالية على مجموعة اختبار.",
      qEn: "What results did the system achieve?",
      aEn: "Tests showed correct and incorrect form being distinguished under suitable recording conditions with near-real-time response, such as \"Bicep Correct\" and \"Squat Wrong\" outputs with a confidence of 1.00, and successful detection in a home setting and from a frontal angle. The project does not report an overall accuracy on a test set.",
    },
    {
      q: "ما حدود النظام الحالية؟",
      a: "يقتصر على تحليل ثنائي الأبعاد لثلاثة تمارين وبحكم صحيح/خاطئ فقط، ولا يقدم تشخيصًا طبيًا. وتنخفض دقة تتبع المفاصل في الإضاءة الضعيفة أو عند حجب أحد الأطراف، ويتأثر تقدير العمق بزاوية التصوير، وقد يبطؤ على الأجهزة محدودة الموارد.",
      qEn: "What are the current system's limitations?",
      aEn: "It is limited to 2D analysis of three exercises with only a correct/incorrect judgment, and it does not provide medical diagnosis. Joint tracking degrades in poor lighting or when a limb is occluded, depth estimation depends on camera angle, and it may slow down on low-resource devices.",
    },
  ],

  "investment-project-management": [
    {
      q: "ما وظيفة منصة إدارة المشاريع الهندسية للشركات الاستثمارية؟",
      a: "تؤتمت المنصة إدارة المشاريع الهندسية الممولة من استثمارات أجنبية، وتربط المستثمر بالإدارة المحلية والكوادر الميدانية في بيئة رقمية واحدة. تقسّم كل مشروع إلى ورش عمل فنية توزَّع عليها المهام والعمال، وتمنح المستثمر بوابة للعرض فقط لمتابعة سير العمل والتقارير.",
      qEn: "What does the engineering project management platform for investment companies do?",
      aEn: "The platform automates the management of engineering projects funded by foreign investment and connects investors, local management, and field staff in one digital environment. It divides each project into technical workshops that receive tasks and workers, and gives investors a view-only portal to follow progress and reports.",
    },
    {
      q: "ما التقنيات المستخدمة في بناء المنصة؟",
      a: "بُنيت المنصة بإطار Laravel 12 ومنظومة TALL Stack (Tailwind CSS وAlpine.js وLaravel وLivewire) مع حزمة Filament للوحات التحكم، وHTML5 وCSS3 وBootstrap للواجهات المتجاوبة. وتعمل قاعدة بيانات MySQL ضمن بيئة XAMPP على خادم محلي.",
      qEn: "Which technologies were used to build the platform?",
      aEn: "It is built with Laravel 12 and the TALL Stack (Tailwind CSS, Alpine.js, Laravel, Livewire), with the Filament package for dashboards and HTML5, CSS3, and Bootstrap for responsive interfaces. A MySQL database runs within an XAMPP environment on a local server.",
    },
    {
      q: "ما الأدوار التي تدعمها المنصة؟",
      a: "تدعم المنصة الإدارة العليا ومدير المشروع والمستثمر والمهندس والعامل ومشرف الورشة والمراجع، ولكل دور لوحة تحكم وصلاحيات مستقلة. وتوجد أيضًا بوابة عامة للزوار لطلب خدمات هندسية أو استشارية واقتراح خدمات جديدة.",
      qEn: "Which user roles does the platform support?",
      aEn: "The platform supports senior management, project manager, investor, engineer, worker, workshop supervisor, and reviewer, each with its own dashboard and permissions. There is also a public portal where visitors can request engineering or consulting services and propose new ones.",
    },
    {
      q: "كيف تعالج المنصة مشكلة الصندوق الأسود في الاستثمار؟",
      a: "يرتبط المستثمر بمشاريعه ومبالغ استثماره، ويطّلع من بوابة للعرض فقط على حالة المشاريع والمهام المنجزة والتقارير الفنية والمالية التي يرفعها المدير والمهندسون والمشرفون. وتسجل كل مهمة تكلفتها التقديرية والفعلية ونسبة إنجازها، ما يتيح متابعة موثقة دون التدخل في التنفيذ.",
      qEn: "How does the platform address the investment black box problem?",
      aEn: "Each investor is linked to their projects and investment amounts and, through a view-only portal, sees project status, completed tasks, and the technical and financial reports submitted by managers, engineers, and supervisors. Every task records estimated cost, actual cost, and progress, enabling documented monitoring without interfering in execution.",
    },
    {
      q: "ما حدود النسخة الحالية وما التطويرات المقترحة؟",
      a: "صُممت النسخة الحالية لشركة واحدة على خادم محلي، دون تطبيق جوال مخصص أو وحدات ذكاء اصطناعي، ولم يتضمن التقرير قياسات أداء أو تجربة في شركة فعلية. ويقترح المشروع الانتقال إلى السحابة، وتطبيقات جوال للكوادر الميدانية، ودمج الذكاء الاصطناعي للتنبؤ بالتأخير، ودعم تعدد الشركات.",
      qEn: "What are the current limitations and proposed developments?",
      aEn: "The current version is designed for a single company on a local server, with no dedicated mobile app or AI modules, and the report includes no performance measurements or real-company trial. The project proposes moving to the cloud, mobile apps for field staff, AI to predict delays, and multi-company support.",
    },
  ],

  "wanted-person-recognition": [
    {
      q: "ما هو نظام التعرف على الأشخاص المطلوبين؟",
      a: "نموذج أولي لنظام مراقبة ذكي يتعرف بالوجه على أشخاص مسجلين مسبقًا في قائمة، عبر تحليل إطارات الكاميرا في الوقت الفعلي ومقارنتها بقاعدة بيانات. نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، ويستهدف مستقبلًا أماكن عامة مثل المطارات والمعابر.",
      qEn: "What is the wanted-person recognition system?",
      aEn: "A prototype smart surveillance system that uses face recognition to identify people pre-registered on a list by analyzing camera frames in real time and comparing them with a database. It was built by a team of students with technical assistance from Techno Enjaz and targets public places such as airports and border crossings in the future.",
    },
    {
      q: "كيف يعمل نظام التعرف على المطلوبين؟",
      a: "يحمّل النظام ميزات الوجوه المخزنة، ثم يستقبل إطارات الكاميرا ويعيد تحجيمها ويستخرج ميزات الوجوه فيها ويقارنها بالمخزنة. عند التطابق يُظهر الاسم ويُشغّل الإنذار ويسجل الحدث بطابع زمني، وعند عدم التطابق يُظهر الوجه بعنوان Unknown مع معرف رقمي.",
      qEn: "How does the wanted-person recognition system work?",
      aEn: "The system loads stored face features, then receives camera frames, resizes them, extracts the features of the faces in them, and compares them with the stored ones. On a match it shows the name, triggers the alarm, and logs the event with a timestamp; otherwise it labels the face Unknown with a numeric ID.",
    },
    {
      q: "ما التقنيات المستخدمة في المشروع؟",
      a: "Python ضمن Anaconda وJupyter Notebook، مع مكتبة face-recognition للكشف عن الوجوه ومطابقتها، وOpenCV لقراءة الكاميرا ومعالجة الصور، وMediaPipe وNumPy وPIL وPandas، وقاعدة بيانات SQLite3 لحفظ الاسم ووقت الرصد ومعرف الكاميرا.",
      qEn: "What technologies does the project use?",
      aEn: "Python within Anaconda and Jupyter Notebook, the face-recognition library for detecting and matching faces, OpenCV for camera input and image processing, MediaPipe, NumPy, PIL, and Pandas, and an SQLite3 database storing the name, detection time, and camera ID.",
    },
    {
      q: "ما النتائج التي وثقها المشروع؟",
      a: "وثق التقرير اختبارًا لواجهة Combined Cameras تعرّف فيه النظام على شخص مسجل وسجّل اسمه بطابع زمني، وصنّف شخصًا غير مسجل بعنوان Unknown (ID: 1)، مع حفظ السجل في SQLite. ولم يعرض التقرير قيمًا رقمية للدقة أو حجم بيانات الاختبار، فهي نتائج وظيفية لنموذج أولي.",
      qEn: "What results did the project document?",
      aEn: "The report documents a test of the Combined Cameras interface in which the system recognized a registered person and logged their name with a timestamp, and labeled an unregistered person Unknown (ID: 1), saving the log in SQLite. It gives no numerical accuracy values or test-set size, so these are functional prototype results.",
    },
    {
      q: "ما حدود النظام واعتبارات الخصوصية فيه؟",
      a: "اختُبر النموذج على حالات محدودة دون تقييم على حشود أو قاعدة بيانات كبيرة، ويتأثر بالإضاءة والزوايا، ولم تُوثق شبكة كاميرات موزعة فعلية. ولأنه يعالج بيانات بيومترية في أماكن عامة، يحتاج أي استخدام فعلي إلى أساس قانوني وجهة مخوّلة ومراجعة بشرية لكل تطابق.",
      qEn: "What are the system's limitations and privacy considerations?",
      aEn: "The prototype was tested on limited cases, with no evaluation in crowds or on a large database, is affected by lighting and angles, and no actual distributed camera network was documented. Because it processes biometric data in public places, any real use requires a legal basis, an authorized operator, and human review of every match.",
    },
  ],

  "breast-cancer-diagnosis-ai": [
    {
      q: "ما هو نظام تشخيص سرطان الثدي بالذكاء الاصطناعي؟",
      a: "هو نموذج أولي لنظام مساعد لتشخيص سرطان الثدي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز. يعمل النظام عبر مسارين: تحليل صور الأشعة الطبية بخوارزمية YOLO لكشف المؤشرات البصرية للورم، وتحليل بيانات الفحوصات المخبرية بخوارزمية الغابة العشوائية لتوقع الحالة.",
      qEn: "What is the AI-based breast cancer diagnosis system?",
      aEn: "It is a prototype assistive system for breast cancer diagnosis built by a team of students with technical assistance from Techno Enjaz. It works through two tracks: analyzing radiology images with the YOLO algorithm to detect visual indicators of a tumor, and analyzing laboratory test data with the Random Forest algorithm to predict the case.",
    },
    {
      q: "كيف يعمل مسار تحليل البيانات المخبرية في النظام؟",
      a: "يحمّل النظام نموذج التنبؤ، ثم يستقبل بيانات الفحوصات يدويًا أو من ملف Excel أو من صورة تقرير مخبري. تُنظف البيانات من القيم الناقصة أو غير الصالحة، ثم تُمرر إلى نموذج الغابة العشوائية، وتُعرض النتيجة في نافذة مخصصة وتُحفظ في ملف Excel جديد يضم بيانات المريضة والنتيجة المتوقعة.",
      qEn: "How does the laboratory data track work?",
      aEn: "The system loads the prediction model, then receives test data entered manually, from an Excel file, or from an image of a lab report. The data is cleaned of missing or invalid values and passed to the Random Forest model, and the result is shown in a dedicated window and saved to a new Excel file containing the patient's data and the predicted result.",
    },
    {
      q: "ما التقنيات المستخدمة في نظام تشخيص سرطان الثدي؟",
      a: "بُني النظام بلغة Python، ويستخدم مكتبة Ultralytics لنماذج YOLO في مسار الصور، وscikit-learn لخوارزمية الغابة العشوائية ومعالجة البيانات، إضافة إلى TensorFlow، وTkinter لبناء الواجهات الرسومية. واستُخدمت VS Code وJupyter Notebook بيئاتٍ للتطوير.",
      qEn: "What technologies does the breast cancer diagnosis system use?",
      aEn: "The system was built in Python. It uses the Ultralytics library for YOLO models in the image track, scikit-learn for the Random Forest algorithm and data processing, plus TensorFlow, and Tkinter for the graphical interfaces. VS Code and Jupyter Notebook were used as development environments.",
    },
    {
      q: "ما دقة نظام تشخيص سرطان الثدي؟",
      a: "يصف المشروع أداء النظام بأنه جيد وسريع، لكنه لا يعرض قيمًا كمية مثل الدقة أو الحساسية أو mAP، ولا يحدد مجموعات بيانات التدريب والاختبار. لذلك لا تُنسب للنظام نسبة دقة محددة، وتمثل النتائج نجاحًا وظيفيًا لنموذج أولي وليس تقييمًا سريريًا.",
      qEn: "How accurate is the breast cancer diagnosis system?",
      aEn: "The project describes the system's performance as good and fast, but reports no quantitative values such as accuracy, sensitivity, or mAP, and does not identify the training and test datasets. No specific accuracy figure is therefore attributed to the system; the results represent the functional success of a prototype, not a clinical evaluation.",
    },
    {
      q: "هل يمكن الاعتماد على النظام بدل الطبيب؟",
      a: "لا، فالنظام أداة مساعدة ولم يُختبر بعد في بيئة عمل حقيقية داخل مؤسسة طبية، وهو ما يقترحه المشروع خطوةً لاحقة. ويبقى التشخيص النهائي من اختصاص الطبيب الشعاعي والفحوص التأكيدية، ويحتاج أي استخدام فعلي إلى تقييم سريري مستقل وضوابط لحماية بيانات المريضات.",
      qEn: "Can the system be relied on instead of a physician?",
      aEn: "No. The system is an assistive tool and has not yet been tested in a real working environment inside a medical institution, which the project proposes as a next step. The final diagnosis remains with the radiologist and confirmatory tests, and any real-world use requires an independent clinical evaluation and safeguards for patient data.",
    },
  ],

  "face-attendance-timer-app": [
    {
      q: "ما هو تطبيق تسجيل حضور الطلاب بالتعرف على الوجه مع مؤقت زمني؟",
      a: "هو نموذج أولي نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز، يسجل حضور الطلاب في المحاضرة تلقائيًا عبر التعرف على وجوههم بالكاميرا. ويجمع بين التحقق من الهوية ومؤقت زمني يحدد الفترة المسموح بها للحضور، ثم يصدّر قائمة الحاضرين إلى ملف Excel.",
      qEn: "What is the face-recognition student attendance app with a session timer?",
      aEn: "It is a prototype built by a team of students with technical assistance from Techno Enjaz that records student attendance in lectures automatically by recognizing their faces through a camera. It combines identity verification with a timer that defines the allowed attendance window, then exports the list of attendees to an Excel file.",
    },
    {
      q: "كيف يعمل النظام خطوة بخطوة؟",
      a: "يحمّل النظام نموذج YOLO وصور الطلاب المسجلين، ثم يلتقط إطارات الكاميرا باستمرار أثناء الحصة ويكشف الوجوه فيها. تُقارن الوجوه المكتشفة بالصور المخزنة، ويُحفظ اسم كل طالب يُتعرف عليه مع توقيت دخوله، وعند انتهاء المحاضرة يُستخرج ملف Excel بالحاضرين.",
      qEn: "How does the system work step by step?",
      aEn: "The system loads the YOLO model and the registered student photos, then continuously captures camera frames during the session and detects the faces in them. Detected faces are compared with the stored photos, each recognized student's name is saved with their entry time, and when the lecture ends an Excel file of attendees is exported.",
    },
    {
      q: "ما قواعد المؤقت الزمني في التطبيق؟",
      a: "يُعد الطالب حاضرًا إذا تعرف عليه النظام ضمن الفترة المحددة للمحاضرة، ومن يدخل بعد انتهائها يُسجَّل متأخرًا أو غائبًا تلقائيًا. كما يرفض النظام تسجيل أي شخص غير مسجل في قاعدة بيانات القاعة، ويمسح بيانات الجلسة عند انتهاء المحاضرة استعدادًا للمحاضرة التالية.",
      qEn: "What are the session timer rules in the app?",
      aEn: "A student counts as present if the system recognizes them within the lecture's defined window, and anyone entering after it closes is automatically recorded as late or absent. The system also refuses attendance for anyone not registered in the classroom's database and clears session data when the lecture ends, ready for the next one.",
    },
    {
      q: "ما التقنيات والأدوات المستخدمة في المشروع؟",
      a: "استخدم المشروع خوارزمية YOLO عبر مكتبة Ultralytics لكشف الوجوه في الزمن الحقيقي، ومكتبة OpenCV لمعالجة الصور والتعامل مع الكاميرا. وجرى التطوير ضمن بيئة Anaconda باستخدام Visual Studio Code وJupyter Notebook، مع إخراج الحضور في ملف Microsoft Excel.",
      qEn: "Which technologies and tools does the project use?",
      aEn: "The project uses the YOLO algorithm through the Ultralytics library for real-time face detection and OpenCV for image processing and camera handling. Development was done in an Anaconda environment with Visual Studio Code and Jupyter Notebook, with attendance output to a Microsoft Excel file.",
    },
    {
      q: "ما نتائج المشروع وحدوده الحالية؟",
      a: "يوثق المشروع واجهة تتعرف على وجوه الطلاب وتسجل حضورهم تلقائيًا، وملف Excel بأسماء الحاضرين وتوقيتات دخولهم، لكنه لا يعرض قياسات كمية لدقة التعرف. ويعمل النظام في قاعات مغلقة بكاميرات عالية الدقة وإضاءة مناسبة، وقد يتعثر مع الأقنعة أو الإضاءة المنخفضة، ولا يحتفظ بالسجلات بعد المحاضرة ما لم يُربط بنظام أرشفة خارجي.",
      qEn: "What are the project's results and current limitations?",
      aEn: "The project documents an interface that recognizes student faces and records attendance automatically, and an Excel file of attendee names and entry times, but it reports no quantitative recognition-accuracy measurements. The system works in closed classrooms with high-resolution cameras and suitable lighting, may struggle with masks or low light, and keeps no records after the lecture unless connected to an external archiving system.",
    },
  ],

  "university-face-attendance-app": [
    {
      q: "ما هو التطبيق الجامعي للتعرف على وجوه الطلاب؟",
      a: "تطبيق سطح مكتب يسجل حضور الطلاب ويضبط دخولهم إلى القاعات الدراسية والامتحانية بالتعرف على الوجه في الزمن الحقيقي، وفق المجموعات والقوائم الاسمية الرسمية. نفذه فريق من الطلاب بمساعدة تقنية من مكتب تكنو إنجاز.",
      qEn: "What is the university student face-recognition app?",
      aEn: "A desktop application that records student attendance and controls entry to lecture and exam halls using real-time face recognition, according to predefined groups and official name lists. It was built by a team of students with technical assistance from Techno Enjaz.",
    },
    {
      q: "كيف يقرر النظام قبول حضور الطالب أو رفضه؟",
      a: "يكتشف YOLOv8 الوجه، وتحوله DeepFace إلى متجه رقمي يُقارن بقاعدة البيانات بالمسافة الإقليدية، وبالتوازي يُجرى فحص الحيوية. ثم يتحقق النظام من أن الطالب مسجل في الجلسة وفي القاعة الصحيحة ضمن الوقت المسموح؛ فإذا فشل أي فحص يُرفض التسجيل ويظهر تنبيه، وإلا يُسجَّل الحضور مع وقته.",
      qEn: "How does the system decide whether to accept or reject a student's attendance?",
      aEn: "YOLOv8 detects the face, DeepFace converts it into a vector matched against the database by Euclidean distance, and a liveness check runs in parallel. The system then confirms that the student is registered for the session, in the correct hall, and within the allowed time; if any check fails the registration is rejected with an alert, otherwise attendance is saved with its time.",
    },
    {
      q: "كيف يمنع النظام انتحال الهوية بالصور أو الفيديو؟",
      a: "يستخدم مكتبة MediaPipe لاستخراج نقاط الوجه وتتبع الرمش عبر نسبة العين (Eye Aspect Ratio) وحركة الرأس، مع تحليل الحركة بين الإطارات وتحليل النسيج لتمييز الصور المطبوعة ومقاطع الفيديو عن الوجه الحقيقي. ويُرفض تسجيل الحضور عند اكتشاف محاولة تلاعب.",
      qEn: "How does the system prevent impersonation with photos or videos?",
      aEn: "It uses MediaPipe to extract facial landmarks and track blinking via the Eye Aspect Ratio and head movement, together with motion analysis between frames and texture analysis to distinguish printed photos and videos from a real face. Attendance is rejected when a spoofing attempt is detected.",
    },
    {
      q: "ما التقنيات المستخدمة في نظام الحضور بالتعرف على الوجه؟",
      a: "Python 3.11 وOpenCV وYOLOv8 لكشف الوجوه، وDeepFace مع FaceNet512 (ويذكر التقرير ArcFace أيضًا) للتعرف، وMediaPipe لكشف الحيوية، وSQLite لقاعدة البيانات، وPandas وOpenPyXL لتقارير Excel، وCustomTkinter للواجهات، مع تعدد الخيوط لمنع تجمد الواجهة.",
      qEn: "What technologies does the face-recognition attendance system use?",
      aEn: "Python 3.11, OpenCV, and YOLOv8 for face detection; DeepFace with FaceNet512 (the report also mentions ArcFace) for recognition; MediaPipe for liveness detection; SQLite for the database; Pandas and OpenPyXL for Excel reports; and CustomTkinter for the interface, with multithreading to prevent UI freezing.",
    },
    {
      q: "ما النتائج التي حققها النظام وما حدوده؟",
      a: "جُرّب على كاميرا حاسوب محمول مدمجة، ووصف التقرير الاستجابة بأنها شبه فورية والدقة بأنها مرتفعة وكشف التلاعب بأنه فعال، لكنه لم يعرض قيمًا رقمية أو حجم بيانات الاختبار. ومن حدوده التأثر بالإضاءة والزوايا الجانبية والنظارات والكمامات، وتشغيله بكاميرا واحدة وقاعدة SQLite محلية.",
      qEn: "What results did the system achieve and what are its limits?",
      aEn: "It was tested on a laptop's built-in camera, and the report describes response as near-instant, accuracy as high, and spoofing detection as effective, but gives no numerical values or test-set size. Its limits include sensitivity to lighting, side angles, glasses, and masks, and operation with one camera and a local SQLite database.",
    },
  ],
};
