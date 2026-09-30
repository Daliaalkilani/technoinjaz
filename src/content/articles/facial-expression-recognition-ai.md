<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: كيف يتعرف الذكاء الاصطناعي على تعابير الوجه؟ شرح FER وFACS وCNN

Meta Description: دليل تقني لفهم التعرف على تعابير الوجه بالذكاء الاصطناعي: من Face Detection وLandmarks وFACS إلى CNN وقواعد FER2013 وCK+ وAffectNet وRAF-DB، مع التحيز والخصوصية وحدود استنتاج المشاعر.

Suggested Slug: facial-expression-recognition-ai

# كيف يتعرف الذكاء الاصطناعي على تعابير الوجه؟ شرح FER وFACS وCNN

**التعرف على تعابير الوجه (Facial Expression Recognition — FER) هو مهمة في الرؤية الحاسوبية تهدف إلى تحليل الحركات والأنماط الظاهرة على الوجه وتحويلها إلى تمثيل رقمي يمكن للنظام تصنيفه أو تقديره.**

لكن هناك تمييز أساسي يجب وضعه منذ البداية:

> **التعرّف على تعبير الوجه لا يساوي قراءة المشاعر الداخلية مباشرة.**

قد يرى النظام:

- ارتفاع زوايا الفم.
- تقلص عضلات حول العين.
- اتساع العينين.
- خفض الحاجبين.
- فتح الفم.

ثم يربط هذه الحركات بفئة أو احتمال أو بُعد عاطفي.

لكنه لا يملك وصولًا مباشرًا إلى:

- نية الشخص.
- تجربته الداخلية.
- السياق الاجتماعي الكامل.
- الثقافة.
- سبب التعبير.

ولهذا فالأدق هندسيًا أن نقول:

```text
Camera
  ↓
Visible Facial Movement
  ↓
Computer Vision Analysis
  ↓
Expression Representation
  ↓
Probabilistic Estimate
```

وليس:

```text
Camera
  ↓
True Inner Emotion
```

# ما الفرق بين Face Detection وFace Recognition وFacial Expression Recognition؟

هذه ثلاث مهام مختلفة كثيرًا رغم أنها تبدأ من صورة وجه.

## Face Detection

السؤال:

> أين يوجد الوجه في الصورة؟

الناتج عادة:

- Bounding Box.
- وربما نقاط أولية للوجه.

مثال:

```text
Image
  ↓
Face detected at x1, y1, x2, y2
```

## Face Recognition

السؤال:

> من هو هذا الشخص؟

تهدف إلى:

- Verification: هل هذا الشخص هو صاحب الهوية المدعاة؟
- Identification: أي شخص في قاعدة البيانات يطابق هذا الوجه؟

وهذه مهمة **هوية بيومترية**.

## Facial Expression Recognition — FER

السؤال:

> ما النمط التعبيري الظاهر على الوجه؟

قد تكون النتيجة مثلًا:

```text
neutral    0.44
happy      0.31
surprise   0.12
sad        0.07
other      0.06
```

إذًا:

| المهمة | السؤال |
|---|---|
| Face Detection | أين الوجه؟ |
| Face Recognition | من الشخص؟ |
| FER | ما التعبير أو النمط الوجهي الظاهر؟ |

والخلط بينها يؤدي إلى تصميمات خاطئة وتقييمات غير صحيحة.

# هل FER هي نفسها Emotion Recognition؟

ليس تمامًا.

**Facial Expression Recognition** تتعامل مع الإشارة المرئية الصادرة من الوجه.

أما **Emotion Recognition** فهو مفهوم أوسع قد يحاول تقدير حالة عاطفية اعتمادًا على:

- الوجه.
- الصوت.
- النص.
- وضعية الجسم.
- ECG.
- HRV.
- EDA/GSR.
- السياق.

الوجه قناة واحدة فقط.

وهذا الفرق مهم لأن الأبحاث النفسية الحديثة تحذر من افتراض وجود علاقة واحدة ثابتة بين حركة وجه محددة وشعور داخلي محدد.

مراجعة علمية واسعة نُشرت عام 2019 خلصت إلى ثلاث مشكلات رئيسية في الاستدلال على المشاعر من حركات الوجه وحدها:

- محدودية الثبات.
- غياب تطابق واحد-لواحد محدد بين الحركة وفئة الشعور.
- أثر السياق والثقافة في التعبير والتفسير.

لذلك فإن نظام FER مسؤول هندسيًا عن **تحليل تعبير ظاهر**، وليس عن الادعاء بأنه "يعرف ما يشعر به الإنسان".

# ما هو FACS؟

**Facial Action Coding System — FACS** هو نظام لوصف حركات الوجه بطريقة قابلة للترميز.

الفكرة الأساسية:

بدل أن نكتب:

> هذا الشخص غاضب.

نصف ما يحدث على الوجه:

- خفض الحاجب.
- رفع الخد.
- شد الجفن.
- رفع زاوية الفم.
- فتح الفك.

تسمى هذه العناصر:

**Action Units — AUs**

## أمثلة

- AU1: Inner Brow Raiser.
- AU2: Outer Brow Raiser.
- AU4: Brow Lowerer.
- AU6: Cheek Raiser.
- AU12: Lip Corner Puller.
- AU25: Lips Part.
- AU26: Jaw Drop.

الميزة هنا أن FACS يصف **الحركة المرئية**.

وهذا أكثر دقة علميًا من مساواة كل Action Unit بشعور داخلي ثابت.

## هل AU12 تعني "السعادة"؟

لا بهذه البساطة.

AU12 تصف حركة رفع زوايا الفم.

قد تظهر في:

- ابتسامة اجتماعية.
- فرح.
- مجاملة.
- سخرية.
- موقف مصطنع أمام الكاميرا.

لذلك:

> **Action Unit = حركة وجهية قابلة للرصد، وليست إثباتًا مباشرًا لشعور داخلي.**

# ثلاث طرق لتمثيل تعبيرات الوجه

يمكن تصميم FER بأكثر من Output.

## 1. Categorical Expression Classification

الفئات الشائعة في كثير من Datasets:

- Happiness.
- Sadness.
- Anger.
- Fear.
- Disgust.
- Surprise.
- Neutral.

أحيانًا تضاف:

- Contempt.

الناتج:

```text
P(happy)
P(sad)
P(anger)
...
```

## 2. Action Unit Detection

بدل اختيار Emotion class، يتنبأ النظام بوجود Action Units:

```text
AU4  = active
AU6  = inactive
AU12 = active
```

وغالبًا تكون المهمة Multi-label لأن عدة AUs قد تظهر في الوقت نفسه.

## 3. Valence / Arousal

بدل الفئات المنفصلة، يمكن تمثيل الحالة في فضاء مستمر.

### Valence

تقريبًا:

- سلبي ↔ إيجابي.

### Arousal

تقريبًا:

- منخفض التنشيط ↔ مرتفع التنشيط.

هذا مناسب عندما لا نريد إجبار كل تعبير على فئة صلبة واحدة.

# كيف يعمل نظام FER من الكاميرا إلى النتيجة؟

يمكن تلخيص Pipeline كالتالي:

```text
Camera Frame
    ↓
Face Detection
    ↓
Face Tracking
    ↓
Landmark Detection
    ↓
Face Alignment
    ↓
Crop / Normalize
    ↓
Feature Extraction / Deep Model
    ↓
Expression or AU Prediction
    ↓
Confidence / Uncertainty
    ↓
Application
```

كل مرحلة قد تكون مصدر خطأ مستقل.

# 1. Face Detection

أولًا يجب تحديد الوجه.

إذا كانت الصورة تحتوي:

- أكثر من شخص.
- خلفية مزدحمة.
- وجهًا جانبيًا.
- كمامة.
- إضاءة ضعيفة.

فإن فشل Face Detector يعني أن بقية Pipeline قد لا تبدأ أصلًا.

الأنظمة الحديثة تستخدم نماذج تعلم عميق لاكتشاف الوجوه بدل الاعتماد فقط على الطرق الكلاسيكية مثل Viola-Jones.

# 2. Facial Landmarks

بعد اكتشاف الوجه يمكن تقدير نقاط مرجعية مثل:

- زوايا العين.
- الحواجب.
- الأنف.
- زوايا الفم.
- الفك.

مثلًا:

```text
left_eye_corner  = (x1, y1)
right_eye_corner = (x2, y2)
mouth_left        = (x3, y3)
mouth_right       = (x4, y4)
```

يمكن استخدام Landmarks من أجل:

- Alignment.
- حساب المسافات.
- تقدير Head pose.
- استخراج Features هندسية.
- تتبع الحركة عبر الفيديو.

لكن Landmark coordinates وحدها لا تمثل "المشاعر".

هي فقط قياسات هندسية.

# 3. Face Alignment

إذا كان الوجه مائلًا أو بعيدًا أو rotated، يصبح مقارنة Features أصعب.

Alignment تحاول توحيد وضع الوجه باستخدام نقاط مرجعية.

مثلًا:

```text
eyes horizontal
face centered
scale normalized
```

هذا يقلل Variance غير المرتبطة بالتعبير نفسه.

لكن Alignment المبالغ فيها قد تخفي بعض الحركة الطبيعية؛ لذلك يجب اختبار Pipeline على بيانات حقيقية.

# 4. Preprocessing

قد يشمل:

- Crop.
- Resize.
- Color normalization.
- Contrast adjustments.
- Data normalization.

وفي Training يمكن استخدام Augmentation مثل:

- Horizontal flip.
- slight rotation.
- crop.
- brightness changes.
- occlusion simulation.

لكن يجب أن تكون التحويلات منطقية.

إذا جعلت Augmentation الوجه غير واقعي، قد يتعلم النموذج بيانات لا تمثل بيئة التشغيل.

# كيف كانت FER تعمل قبل Deep Learning؟

المنهجيات التقليدية تعتمد على استخراج Features يدويًا.

## Geometric Features

مثل:

- المسافة بين الحاجبين.
- عرض الفم.
- ارتفاع فتح الفم.
- زاوية الحاجب.
- نسبة اتساع العين.

## Appearance Features

مثل:

- LBP.
- Gabor filters.
- HOG.

ثم تدخل Features إلى مصنف:

```text
Features
  ↓
SVM / KNN / Random Forest
  ↓
Expression class
```

مزاياها:

- قد تكون خفيفة.
- قابلة للتحليل نسبيًا.
- مناسبة لبعض البيئات المقيدة.

قيودها:

- Feature engineering يدوي.
- حساسية أكبر للتغيرات غير المتوقعة.
- صعوبة تمثيل أنماط معقدة.

# كيف غيرت CNN التعرف على تعابير الوجه؟

CNN تتعلم Visual Features مباشرة من الصور.

Pipeline مبسط:

```text
Aligned face
    ↓
Convolutional backbone
    ↓
Visual representation
    ↓
Classification head
    ↓
Expression probabilities
```

بدل أن يحدد المهندس يدويًا:

> قياس المسافة بين زاويتي الفم.

قد تتعلم الشبكة Representation أكثر تعقيدًا من البيانات.

لكن هذا لا يعني أنها تتعلم "المشاعر نفسها".

هي تتعلم Patterns مرتبطة Labels الموجودة في Dataset.

إذا كانت Labels:

- noisy.
- biased.
- posed.
- culturally narrow.

سيتعلم النموذج هذه القيود أيضًا.

# هل CNN هي البنية الوحيدة الحديثة؟

لا.

FER الحديثة يمكن أن تستخدم:

- CNN backbones.
- ResNet.
- EfficientNet-like architectures.
- Attention mechanisms.
- Vision Transformers.
- Temporal models للفيديو.
- Hybrid CNN-Transformer models.

الأبحاث الحديثة تركز خصوصًا على:

- Pose robustness.
- Occlusion.
- Class imbalance.
- Lightweight deployment.
- Temporal dynamics.

لكن Architecture ليست المشكلة الوحيدة.

غالبًا تكون جودة البيانات وتعريف Label أهم من تغيير Backbone.

# هل الصورة الثابتة تكفي؟

أحيانًا، لكن الفيديو يوفر معلومات إضافية.

تعبير الوجه هو **حركة زمنية**.

يمكن أن يكون لدينا:

```text
Neutral
  ↓
Onset
  ↓
Apex
  ↓
Offset
```

الصورة الثابتة ترى Frame واحدة.

أما الفيديو فيمكن أن يلتقط:

- سرعة الحركة.
- اتجاهها.
- تطورها.
- مدة التعبير.
- Micro-dynamics.

لهذا يمكن استخدام:

- 3D CNN.
- RNN/LSTM تاريخيًا.
- Temporal convolution.
- Video Transformers.
- Optical flow.
- Landmark trajectories.

# أهم قواعد بيانات FER

## FER2013

ظهرت ضمن تحديات ICML 2013.

تحتوي على:

- **35,887 صورة.**
- Grayscale.
- حجم 48×48.
- سبع فئات تعبيرية.

التقسيم الشائع:

- 28,709 Training.
- 3,589 Validation/Public Test.
- 3,589 Test/Private Test.

ميزتها:

- سهلة للاختبار والتعليم.
- واسعة الاستخدام.

قيودها:

- دقة صور منخفضة.
- Labels فيها ضوضاء.
- صور Web غير مضبوطة.
- لا تمثل جميع سيناريوهات العالم الحقيقي.

# CK+

**Extended Cohn-Kanade — CK+** Dataset مخبرية كلاسيكية.

تحتوي على:

- **593 sequence.**
- **123 مشاركًا.**
- الانتقال من Neutral إلى Peak expression.
- **327 sequence** لها Emotion label من الفئات المحددة.

هذه Dataset مهمة لفهم Dynamic facial expression.

لكنها ليست مرآة مثالية للعالم الحقيقي لأن كثيرًا من التعبيرات:

- مصطنعة أو موجهة.
- أمام كاميرا مضبوطة.
- بإضاءة ووضعية أسهل من بيئة حقيقية.

هذه نقطة مهمة عند مقارنة أرقام Accuracy.

# AffectNet

AffectNet صُممت لتمثيل Expressions "in the wild".

النسخة الأصلية جمعت:

- **أكثر من مليون صورة وجه** من الإنترنت.
- باستخدام كلمات بحث مرتبطة بالعاطفة بعدة لغات.
- وتمت Manual annotation لجزء كبير منها.

وتدعم نوعين من Labels:

- Categorical expressions.
- Valence / Arousal.

هذه ميزة مهمة لأنها لا تحصر كل تعبير في Class منفصلة فقط.

لكن Images الإنترنت نفسها تحمل:

- selection bias.
- cultural bias.
- label uncertainty.
- class imbalance.

# RAF-DB

Real-world Affective Faces Database تحتوي:

- **29,672 صورة وجه واقعية.**
- Labels أساسية ومركبة.
- كل صورة تم تقييمها عدة مرات عبر Crowdsourcing.

ميزة RAF-DB أنها تُظهر مشكلة مهمة:

> تعبيرات العالم الحقيقي أكثر تنوعًا وتعقيدًا من التعبيرات المخبرية النموذجية.

الورقة الأصلية لاحظت أن Action Units المرتبطة بالفئات في بيانات العالم الحقيقي أكثر تنوعًا من قواعد البيانات المخبرية.

# مقارنة مبسطة

| Dataset | الحجم | البيئة | القوة | القيد |
|---|---:|---|---|---|
| FER2013 | 35,887 صورة | Web / 48×48 | Benchmark شائع | دقة منخفضة وLabels noisy |
| CK+ | 593 sequence / 123 شخصًا | مختبر | Dynamic onset→apex | Posed ومضبوطة |
| AffectNet | >1M collected | In-the-wild | حجم كبير + Valence/Arousal | imbalance/label uncertainty |
| RAF-DB | 29,672 صورة | In-the-wild | crowdsourced + compound expressions | لا تلغي تحيز التوزيع |

لا يصح مقارنة Accuracy بين Dataset وأخرى دون فهم اختلاف:

- الفئات.
- Split.
- عدد الصور.
- جودة Labels.
- البيئة.
- Protocol.

# لماذا تحصل نماذج على Accuracy عالية في المختبر ثم تفشل في الواقع؟

بسبب **Domain Shift**.

قد يتدرب النموذج على:

- وجوه أمامية.
- إضاءة جيدة.
- تعبيرات قوية.
- خلفية نظيفة.

ثم يستخدم في:

- هاتف محمول.
- زاوية 40 درجة.
- إضاءة ليلية.
- نظارات.
- لحية.
- كمامة.
- تعبير خفيف.

النموذج لم يواجه التوزيع نفسه.

# أهم تحديات FER في الواقع

## 1. Head Pose

عندما يدير المستخدم رأسه:

- تختفي أجزاء من الوجه.
- تتغير المسافات Perspective.
- تتغير Landmarks.

## 2. Occlusion

مثل:

- كمامة.
- يد.
- شعر.
- نظارات شمسية.
- Microphone.
- VR headset.

أبحاث 2024–2025 ما تزال تعالج Occlusion كأحد التحديات الأساسية، ما يؤكد أن المشكلة ليست "محلولة" بمجرد استخدام Deep Learning.

## 3. Lighting

الضوء يغيّر:

- Texture.
- Shadows.
- Contrast.

وقد يجعل Wrinkles أو حركات دقيقة أكثر أو أقل وضوحًا.

## 4. Subtle Expressions

ليست كل التعبيرات "ابتسامة كبيرة" أو "غضب واضح".

التعبير قد يكون:

- خفيفًا.
- سريعًا.
- جزئيًا.
- متناقضًا.

## 5. Class Imbalance

Happiness عادة أسهل وأكثر وفرة في بعض Datasets.

بينما:

- disgust.
- fear.
- contempt.

قد تكون أقل عددًا.

النموذج قد يحصل على Accuracy جيدة لكنه يضعف جدًا على Minority classes.

# لماذا الدقة العامة Accuracy غير كافية؟

افترض Dataset:

```text
Happy   7000
Neutral 5000
Disgust 300
Fear    200
```

نموذج ينجح على Happy وNeutral ويفشل على Fear قد يبقى صاحب Accuracy تبدو جيدة.

لهذا يجب فحص:

- Per-class Recall.
- Macro F1.
- Balanced Accuracy.
- Confusion Matrix.
- Performance حسب subgroup.

# ما معنى Confidence في FER؟

قد يخرج النموذج:

```text
happy = 0.88
```

لكن هذه ليست بالضرورة:

> "88% احتمال أن الشخص سعيد داخليًا."

هي Score داخل نموذج وتوزيع Labels محدد.

الأدق:

> "النموذج يعطي فئة happy أعلى score بناءً على النمط الوجهي وفق تدريبه."

وفي التطبيقات الحساسة يجب التفكير أيضًا في:

- Calibration.
- Uncertainty.
- Abstention.

مثل:

```text
if confidence < threshold:
    output = uncertain
```

بدل إجبار النظام على قرار.

# هل يمكن استنتاج المشاعر الداخلية من الوجه بدقة؟

هذه هي أهم نقطة في المقال.

الحركة الوجهية تحمل معلومات.

لكن العلاقة بين:

```text
Facial Movement
```

و:

```text
Internal Emotional State
```

ليست Mapping ثابتًا وعالميًا وواحدًا لواحد.

المراجعة العلمية الواسعة المنشورة في Psychological Science in the Public Interest عام 2019 تشير إلى:

- لا توجد Reliability كافية تجعل كل حالة شعورية تظهر بنفس الحركة دائمًا.
- لا توجد Specificity تجعل كل Facial configuration تخص شعورًا واحدًا فقط.
- السياق والثقافة يؤثران في التعبير والتفسير.

مثال:

الابتسامة قد تعني:

- فرحًا.
- توترًا.
- مجاملة.
- إحراجًا.
- سخرية.
- محاولة إخفاء شعور آخر.

لذلك يجب استخدام لغة مثل:

- "Facial expression estimate".
- "expression-related signal".
- "probabilistic affective inference".

وتجنب:

- "AI knows how you feel".
- "camera reads emotions".
- "detects the true emotion".

# FACS أيضًا لا يساوي Emotion Detector

FACS لا يقول:

```text
AU6 + AU12 = الشخص سعيد داخليًا
```

بل يصف Activity وجهية.

يمكن لمهندس النظام أن يبني فوقها Mapping إلى Classes، لكن ذلك يصبح **Model assumption** يحتاج Validation.

هذه نقطة أساسية لفصل:

> القياس.

عن:

> التفسير.

# ما دور السياق؟

انظر إلى تعبير وجه واحد دون Context.

قد يكون غامضًا.

أضف:

- صوت الشخص.
- الجملة التي قالها.
- الحدث.
- Interaction.
- Body posture.
- Culture.

قد يتغير تفسيرك.

ولهذا تتجه الحوسبة العاطفية إلى **Multimodal systems**.

لكن حتى Multimodal system لا يحصل على "حقيقة داخلية" مباشرة؛ بل يملك Signals أكثر.

# ما الفرق بين Facial Expression Model وMultimodal Affect Model؟

## Facial Expression Model

```text
Face
 ↓
Expression probabilities
```

## Multimodal Affect Model

```text
Face ─────┐
Voice ────┤
Text ─────┤→ Fusion → affective estimate
HR/EDA ───┤
Context ──┘
```

الـMultimodal system قد يكون أكثر Robustness عندما قناة واحدة ضعيفة.

لكن يزيد:

- الخصوصية.
- التعقيد.
- Data synchronization.
- Missing modalities.
- Consent burden.

# التحيز الديموغرافي

إذا كانت Dataset لا تمثل السكان الفعليين، قد يتغير الأداء بين مجموعات مختلفة.

مصادر التحيز تشمل:

- توزيع الأعمار.
- لون البشرة.
- الجنس.
- الثقافة.
- جودة الكاميرا.
- طريقة جمع Labels.
- Posed vs spontaneous expressions.

لا يكفي اختبار Accuracy عامة.

يجب عند الحاجة اختبار:

```text
performance by subgroup
```

مع التأكد من أن التحليل نفسه قانوني وأخلاقي.

# هل "المشاعر الست الأساسية" حقيقة نهائية؟

هي إطار مؤثر جدًا في البحث والتعليم وقواعد البيانات.

لكن استخدامها كأنها:

> ست حالات عالمية ثابتة، ولكل واحدة وجه محدد.

تبسيط زائد.

النماذج الفئوية مفيدة عمليًا.

لكن توجد أيضًا مناهج:

- Dimensional: Valence/Arousal.
- Action Units.
- Appraisal/contextual approaches.
- Compound expressions.

إذًا اختيار Labels هو **قرار نمذجة** وليس اكتشافًا مباشرًا لست حالات بيولوجية منفصلة.

# ماذا عن Privacy؟

FER عبر الكاميرا قد يتعامل مع معلومات شديدة الحساسية.

حتى إذا لم يحفظ النظام "هوية" المستخدم، قد يعالج:

- صورة الوجه الخام.
- Landmarks.
- Embeddings.
- Expression probabilities.
- Timestamp.
- Behavioral profile.

وهذه البيانات قد تسمح بتكوين Profile عن المستخدم.

# Privacy-by-Design لنظام FER

## 1. المعالجة المحلية

يفضل عندما يكون ذلك ممكنًا:

```text
Camera frame
  ↓
On-device FER
  ↓
Expression vector
```

بدل:

```text
Raw video
  ↓
Cloud
```

## 2. لا تخزن الفيديو بلا حاجة

إذا كانت المهمة تحتاج نتيجة لحظية فقط:

- عالج Frame.
- استخرج النتيجة.
- احذف الصورة الخام.

## 3. Data Minimization

لا تجمع:

- Audio.
- Location.
- Identity.

إذا لم تكن ضرورية للمهمة.

## 4. Purpose Limitation

إذا وافق المستخدم على:

> تحسين واجهة التطبيق.

لا تحول البيانات لاحقًا إلى:

> Advertising psychological profiling.

دون أساس واضح وموافقة/أساس قانوني مناسب.

## 5. واضح ماذا يستنتج النظام

يجب ألا يعتقد المستخدم أن:

> "الكاميرا فقط تعمل."

بينما النظام يقوم أيضًا بتحليل تعبيرات الوجه.

# ماذا يقول قانون الذكاء الاصطناعي الأوروبي؟

تنظيم الاتحاد الأوروبي للذكاء الاصطناعي يضع قيودًا مباشرة على بعض استخدامات Emotion Recognition.

**المادة 5 تحظر استخدام أنظمة AI لاستنتاج مشاعر الأشخاص في أماكن العمل والمؤسسات التعليمية، باستثناء الاستخدامات الموضوعة لأسباب طبية أو سلامة.**

هذا مهم جدًا لأي نظام FER يُسوَّق على أنه:

- يقيس مشاعر الموظفين.
- يراقب تركيز الطلاب.
- يستنتج حالة المتعلم النفسية.

في الاتحاد الأوروبي لا يجوز التعامل مع هذه التطبيقات كأنها Use case عادي.

والقوانين في دول أخرى قد تختلف، لذلك يلزم Legal review حسب السوق.

# هل الوجه Biometric Data دائمًا؟

الصورة الوجهية قد تصبح Biometric Data عندما تتم معالجتها تقنيًا لأغراض تسمح أو تؤكد التعرف الفريد على الشخص وفق السياق القانوني.

أما FER فقد لا تحتاج Identity أصلًا.

لكن هذا لا يجعل بيانات الوجه "غير حساسة".

هناك فرق بين:

```text
Who are you?
```

و:

```text
What facial pattern are you displaying?
```

لكن كلاهما يحتاج Privacy design واضحًا.

# هل FER مناسبة للصحة النفسية؟

يجب الحذر جدًا.

تعبير الوجه وحده لا يكفي لتشخيص:

- Depression.
- Anxiety.
- PTSD.
- Suicide risk.
- اضطراب نفسي.

يمكن أن يكون Signal داخل Research أو نظام سريري أكبر إذا كان:

- validated.
- regulated where required.
- supervised by qualified professionals.

لكن لا ينبغي تحويل Classifier وجه إلى "تشخيص نفسي".

# كيف تبني FER System أكثر مسؤولية؟

## الخطوة 1: عرّف Output الصحيح

بدل:

> Detect emotion.

اكتب:

> Estimate visible facial-expression category.

أو:

> Detect selected Action Units.

هذا يجبر الفريق على تحديد ما يقيسه فعلًا.

## الخطوة 2: حدد Use Case

هل الهدف:

- Avatar animation؟
- Accessibility؟
- HCI research؟
- Content adaptation؟
- Driver monitoring؟
- Medical research؟

المخاطر تختلف جذريًا.

## الخطوة 3: اختر Labels بحذر

قد يكون الأفضل:

- AUs.
- Valence/arousal.
- Expression classes.

حسب المهمة.

## الخطوة 4: اجمع Dataset ممثلة

اختبر:

- ages.
- skin tones.
- poses.
- lighting.
- camera types.
- occlusion.

## الخطوة 5: Split حسب الأشخاص

خطأ شائع:

وجود صور الشخص نفسه في Train وTest.

قد يتعلم النموذج Features مرتبطة بهوية الشخص بدل التعبير.

استخدم عند التقييم الحقيقي:

```text
subject-independent split
```

## الخطوة 6: اختبر Cross-dataset

مثلًا:

```text
Train: Dataset A
Test: Dataset B
```

هذا يكشف ضعف Generalization أفضل من Test داخل Dataset نفسها.

## الخطوة 7: لا تستخدم Accuracy فقط

راقب:

- Macro F1.
- per-class Recall.
- confusion matrix.
- subgroup metrics.
- calibration.

## الخطوة 8: أضف Uncertain state

ليس مطلوبًا أن يصنف النظام كل Frame.

يمكن:

```text
neutral
happy-like
uncertain
face not reliable
```

## الخطوة 9: افصل Identity عن Expression

إذا لم تحتج Face Recognition:

> لا تبنه.

## الخطوة 10: قلل الاحتفاظ بالبيانات

خصوصًا:

- raw frames.
- video.
- identity embeddings.

# Static FER أم Video FER؟

| العنصر | صورة ثابتة | فيديو |
|---|---|---|
| البيانات | Frame واحدة | Sequence |
| التكلفة | أقل | أعلى |
| temporal dynamics | لا | نعم |
| tracking | غير مطلوب غالبًا | مهم |
| latency | أبسط | أعقد |
| micro-movements | محدودة | أفضل نسبيًا |
| privacy | أقل حجمًا | أعلى حساسية |

إذا كان التطبيق يحتاج التعبير اللحظي فقط، قد تكون صورة كافية.

إذا كان يحتاج تغير التعبير بمرور الوقت، الفيديو أفضل تقنيًا لكنه أعلى كلفة ومخاطر.

# Landmark-based أم Deep Representation؟

## Landmark-based

مناسب عندما نريد:

- Geometry.
- interpretability نسبية.
- low compute.
- AU/motion analysis.

## End-to-end Deep Model

مناسب عندما:

- الصور معقدة.
- لدينا Data.
- نحتاج تعلم Texture + geometry ضمنيًا.

## Hybrid

يجمع:

- RGB image features.
- landmarks.
- optical flow.
- Action Units.

وقد يكون أفضل في بعض السيناريوهات.

لا يوجد Approach واحد فائز في كل الحالات.

# كيف تختبر FER في العالم الحقيقي؟

أنشئ Test matrix.

| العامل | الحالات |
|---|---|
| الضوء | ساطع / منخفض / خلفي |
| Pose | أمامي / يمين / يسار / أعلى / أسفل |
| Occlusion | نظارات / كمامة / يد / شعر |
| الكاميرا | هاتف / Webcam / CCTV |
| المسافة | قريب / متوسط / بعيد |
| التعبير | قوي / خفيف / محايد |
| الحركة | ثابت / Moving |
| المستخدم | مجموعات متنوعة |

ثم اختبر:

- Detection success.
- FER performance.
- latency.
- failures.
- uncertainty.

# ماذا تفعل عندما يفشل النظام؟

لا تخفِ الفشل.

صمم Output مثل:

```text
Face not detected
Face partially occluded
Low confidence
Unsupported pose
No decision
```

هذه أفضل من Prediction عالية الثقة وغير موثوقة.

# مستقبل FER

الاتجاه ليس نحو "كاميرا تقرأ العقل".

الاتجاه التقني الأكثر واقعية هو:

## نماذج أكثر Robustness

للتعامل مع:

- Occlusion.
- Pose.
- low light.

## نماذج أخف

لتعمل On-device.

## Temporal Models

لاستخدام Dynamics بدل Frame منفردة.

## Multimodal Fusion

لدمج:

- وجه.
- صوت.
- نص.
- فسيولوجيا.

## Action Units وContinuous Affect

بدل الاعتماد فقط على سبع Classes.

## Uncertainty-aware systems

تعرف متى لا تتخذ قرارًا.

## Privacy-preserving processing

معالجة محلية وبيانات أقل.

# العلاقة بالمقالات الأخرى

هذه الصفحة تتخصص في:

> **كيف يحلل AI تعبير الوجه تقنيًا؟**

أما **الحوسبة العاطفية** فهي أوسع وتشمل:

- الصوت.
- النص.
- الإشارات الفسيولوجية.
- السياق.

أما نظام **تخصيص المحتوى وفق التعبير** فيضيف بعد FER:

```text
FER output
   ↓
user context
   ↓
recommendation engine
```

ولهذا يجب إبقاء هذه المواضيع صفحات منفصلة بدل دمجها في مقال واحد ضخم.

# الخلاصة

التعرف على تعابير الوجه بالذكاء الاصطناعي ليس عملية:

```text
Camera → Emotion
```

بل سلسلة هندسية:

```text
Camera
  ↓
Face Detection
  ↓
Landmarks / Alignment
  ↓
Visual Representation
  ↓
CNN / Transformer / AU model
  ↓
Expression Probabilities
  ↓
Confidence + Context
```

والفاصل الأكثر أهمية هو:

> **الوجه يقدم إشارات مرئية، والنموذج يقوم باستدلال احتمالي؛ لا توجد قناة تقنية تصل مباشرة إلى التجربة العاطفية الداخلية للإنسان.**

لذلك النظام الجيد لا يُقاس فقط بـAccuracy داخل Benchmark.

يجب أن نعرف:

- ماذا يقيس بالضبط؟
- هل بياناته ممثلة؟
- كيف يعمل مع Occlusion وPose؟
- هل يتفاوت أداؤه بين المستخدمين؟
- هل يعرف متى يكون غير واثق؟
- ماذا يحدث للصور الخام؟
- وهل Use Case نفسه مناسب قانونيًا وأخلاقيًا؟

عندما تُبنى FER بهذه الطريقة، تصبح أداة مفيدة للرؤية الحاسوبية والتفاعل بين الإنسان والآلة، بدل أن تتحول إلى ادعاء مبالغ فيه بأن الذكاء الاصطناعي "يقرأ المشاعر".

## الأسئلة الشائعة

### ما هو Facial Expression Recognition؟

هو تحليل آلي للحركات والأنماط المرئية على الوجه بهدف تصنيف تعبير ظاهر أو اكتشاف Action Units أو تقدير أبعاد مثل Valence/Arousal.

### هل FER تقرأ المشاعر الحقيقية؟

لا. يمكنها تحليل إشارات وجهية وبناء تقدير احتمالي، لكن الشعور الداخلي يتأثر بالسياق والثقافة والشخص ولا يمكن استخراجه مباشرة من الوجه وحده.

### ما الفرق بين Face Recognition وFER؟

Face Recognition تبحث عن هوية الشخص، بينما FER تحلل النمط التعبيري الظاهر على الوجه.

### ما FACS؟

نظام لترميز حركات الوجه إلى Action Units. هو يصف الحركة المرئية ولا يثبت وحده شعورًا داخليًا محددًا.

### ما Action Units؟

وحدات ترميز لحركات عضلية وجهية محددة، مثل رفع زوايا الفم أو خفض الحاجب.

### ما FER2013؟

Dataset شائعة لتصنيف تعابير الوجه تحتوي على 35,887 صورة رمادية 48×48 موزعة على سبع فئات.

### ما CK+؟

Dataset تحتوي على 593 sequence من 123 مشاركًا، و327 منها تحمل Labels عاطفية، وغالبًا تعرض انتقالًا من Neutral إلى Peak expression.

### ما AffectNet؟

Dataset كبيرة جُمعت من الإنترنت وتضم أكثر من مليون صورة مجمعة، مع Manual annotations لجزء كبير منها ودعم للفئات وValence/Arousal.

### ما RAF-DB؟

Dataset من 29,672 صورة في العالم الحقيقي مع Labels تم جمعها عبر عدة مقيمين، وتشمل تعبيرات أساسية ومركبة.

### لماذا Accuracy داخل CK+ لا تكفي؟

لأن CK+ بيئة مخبرية مضبوطة نسبيًا، وقد ينخفض الأداء عند الانتقال إلى كاميرات وإضاءة ووجوه وزوايا مختلفة في العالم الحقيقي.

### كيف نقلل التحيز؟

ببيانات ممثلة، subject-independent splits، cross-dataset testing، وقياس الأداء حسب الفئة والمجموعات المهمة بدل Accuracy عامة فقط.

### هل يمكن تشغيل FER محليًا على الهاتف؟

نعم باستخدام نماذج خفيفة أو Quantization، وقد يكون On-device processing مفيدًا أيضًا للخصوصية.

### هل يمكن استخدام FER في المدارس أو أماكن العمل داخل الاتحاد الأوروبي؟

قانون الذكاء الاصطناعي الأوروبي يحظر أنظمة AI التي تستنتج مشاعر الأشخاص في أماكن العمل والمؤسسات التعليمية، باستثناء الاستخدامات الموضوعة لأسباب طبية أو سلامة.

## المصادر والمراجع

1. Lisa Feldman Barrett et al. — Emotional Expressions Reconsidered: Challenges to Inferring Emotion From Human Facial Movements  
   https://pubmed.ncbi.nlm.nih.gov/31313636/

2. Goodfellow et al. — Challenges in Representation Learning: A report on three machine learning contests (FER2013)  
   https://arxiv.org/abs/1307.0414

3. Lucey et al. — The Extended Cohn-Kanade Dataset (CK+)  
   https://ieeexplore.ieee.org/document/5543262

4. Mollahosseini, Hasani, Mahoor — AffectNet: A Database for Facial Expression, Valence, and Arousal Computing in the Wild  
   https://arxiv.org/abs/1708.03985

5. Li, Deng, Du — Reliable Crowdsourcing and Deep Locality-Preserving Learning for Expression Recognition in the Wild (RAF-DB)  
   https://openaccess.thecvf.com/content_cvpr_2017/html/Li_Reliable_Crowdsourcing_and_CVPR_2017_paper.html

6. Sariyanidi, Gunes, Cavallaro — Automatic Analysis of Facial Affect  
   https://doi.org/10.1109/TPAMI.2014.2330597

7. Wang et al. — Region Attention Networks for Pose and Occlusion Robust Facial Expression Recognition  
   https://arxiv.org/abs/1905.04075

8. FERMixNet — Occlusion Robust Facial Expression Recognition, IEEE Transactions on Affective Computing  
   https://ieeexplore.ieee.org/document/10663852/

9. EU Artificial Intelligence Act — Regulation (EU) 2024/1689, Article 5  
   https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng

10. Picard — Affective Computing  
    https://mitpress.mit.edu/9780262661157/affective-computing/

## مقالات ودراسات ذات صلة في منصة تكنو إنجاز

- [الحوسبة العاطفية: كيف يحلل الذكاء الاصطناعي التعبير العاطفي؟](/articles/affective-computing)
- [كيف يعمل تصنيف الصور بالذكاء الاصطناعي؟ من CNN إلى Vision Transformers](/articles/ai-image-classification)
- [أنظمة التوصية المستجيبة للعواطف والمشاعر](/articles/emotion-aware-recommendation)

