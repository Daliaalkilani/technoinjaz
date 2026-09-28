<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: كيف يعمل تصنيف الصور بالذكاء الاصطناعي؟ من CNN إلى Vision Transformers

Meta Description: دليل عملي لفهم تصنيف الصور بالذكاء الاصطناعي: تجهيز البيانات، CNN وResNet وVision Transformers، Transfer Learning، المقاييس الصحيحة، CLIP وDINOv2، التطبيقات والتحديات.

Suggested Slug: ai-image-classification

# كيف يعمل تصنيف الصور بالذكاء الاصطناعي؟ من CNN إلى Vision Transformers

**تصنيف الصور (Image Classification) هو مهمة في الرؤية الحاسوبية تهدف إلى إسناد فئة أو أكثر إلى صورة كاملة اعتمادًا على محتواها المرئي.**  
فقد يدخل إلى النموذج صورة، ويخرج مثلًا:

```text
cat: 0.91
dog: 0.07
other: 0.02
```

لكن بناء نظام تصنيف موثوق لا يبدأ باختيار شبكة عصبية فقط.

المسار الحقيقي أقرب إلى:

```text
Data
  ↓
Cleaning & Labeling
  ↓
Train / Validation / Test Split
  ↓
Preprocessing & Augmentation
  ↓
Model / Pretrained Backbone
  ↓
Training or Fine-tuning
  ↓
Evaluation
  ↓
Calibration & Error Analysis
  ↓
Deployment
  ↓
Monitoring
```

والنقطة الأهم:

> **النموذج لا "يفهم" الصورة كما يفهمها الإنسان؛ بل يتعلم تمثيلات عددية تساعده على ربط أنماط بصرية بفئات محددة.**

# ما الفرق بين Image Classification وObject Detection وSegmentation؟

هذه المهام تُخلط كثيرًا.

## Image Classification

السؤال:

> ما الموجود في الصورة؟

مثال:

```text
الصورة → "قطة"
```

الناتج فئة للصورة كاملة.

## Object Detection

السؤال:

> ما الأشياء الموجودة، وأين توجد؟

الناتج:

- فئة.
- Bounding Box.
- درجة ثقة.

مثال:

```text
Person → box
Car → box
Traffic light → box
```

## Image Segmentation

السؤال:

> أي Pixels تنتمي إلى أي كائن أو منطقة؟

الناتج Mask على مستوى Pixels.

## Face Recognition

ليست مجرد Image Classification عامة.

السؤال فيها غالبًا:

> هل هذا الوجه يعود إلى هوية معينة؟

وتعتمد على تمثيلات ومطابقة هوية، مع آثار خصوصية وأمن مختلفة.

لذلك لا ينبغي استخدام نجاح Image Classifier كدليل تلقائي على نجاح Object Detector أو Face Recognition system.

# كيف يرى الحاسوب الصورة؟

الصورة الرقمية عبارة عن مصفوفة قيم.

صورة RGB يمكن تمثيلها تقريبًا كالتالي:

```text
Height × Width × 3 channels
```

وكل Pixel يحتوي قيمًا تمثل شدة:

- الأحمر.
- الأخضر.
- الأزرق.

قبل التعلم العميق، كان المهندس يحاول تحويل هذه القيم الخام إلى Features مصممة يدويًا.

أما اليوم فالنماذج العميقة تتعلم جزءًا كبيرًا من التمثيل مباشرة من البيانات.

# كيف كان تصنيف الصور يعمل قبل التعلم العميق؟

المسار الكلاسيكي كان غالبًا:

```text
Image
  ↓
Hand-crafted Feature Extraction
  ↓
Feature Vector
  ↓
Classifier
```

ومن أشهر Feature descriptors:

- HOG.
- SIFT.
- LBP.
- Gabor features.

ثم يستخدم مصنف مثل:

- SVM.
- Logistic Regression.
- KNN.
- Random Forest.

## مثال: HOG + SVM

HOG يلخص اتجاهات Gradients والحواف.

ثم يحول الصورة إلى Feature Vector.

بعدها يتعلم SVM حدًا يفصل بين الفئات.

هذه المنهجية ما زالت مفيدة في بعض المشاريع عندما:

- البيانات قليلة.
- المشكلة بسيطة نسبيًا.
- الحوسبة محدودة.
- Features معروفة جيدًا.
- نحتاج نموذجًا صغيرًا وسريعًا.

لكنها تعتمد بدرجة أكبر على هندسة Features يدويًا.

# ماذا غيرت CNN؟

**Convolutional Neural Networks — CNNs** سمحت بتعلم Features أثناء التدريب نفسه.

بدل:

```text
Human-designed features → classifier
```

أصبح لدينا:

```text
Image → learned features → classifier
```

## الطبقة الالتفافية

تطبق Kernels/Filters على مناطق محلية من الصورة.

في الطبقات المبكرة قد تظهر استجابات لأنماط مثل:

- الحواف.
- اتجاهات.
- تباينات.
- Textures.

ومع زيادة العمق تصبح التمثيلات أكثر ارتباطًا ببنية الكائنات.

لكن يجب الحذر من الجملة المبسطة:

> "الطبقة الأولى تتعرف على الحواف والثانية على العيون والثالثة على الوجه."

قد تكون مفيدة تعليميًا، لكنها ليست قاعدة ثابتة لكل شبكة وكل Dataset.

# ما دور Pooling؟

Pooling تقلل الأبعاد المكانية لبعض Feature Maps.

مثل:

- Max Pooling.
- Average Pooling.

قد تساعد في:

- تقليل حجم الحساب.
- زيادة Receptive Field بصورة غير مباشرة.
- جعل بعض التمثيلات أقل حساسية لتغيرات محلية صغيرة.

لكن الشبكات الحديثة لا تعتمد جميعها على Pooling التقليدي بالطريقة نفسها؛ بعضها يستخدم Strided Convolutions أو معماريات أخرى.

# هل كل CNN تنتهي بـFully Connected Layers؟

لا.

هذا وصف صحيح لكثير من المعماريات التقليدية، لكنه ليس قاعدة عامة.

نماذج حديثة تستخدم مثلًا:

- Global Average Pooling.
- Linear classification head.
- Attention heads.

إذًا المفهوم المهم هو وجود **Classifier Head** يحول Representation إلى Scores للفئات، وليس ضرورة وجود عدة Fully Connected layers.

# ما ResNet؟ ولماذا كانت مهمة؟

مع زيادة عمق الشبكات ظهرت مشكلة أن الشبكات الأعمق لا تصبح أسهل في التدريب تلقائيًا.

قدمت ResNet فكرة **Residual Connections**:

```text
output = F(x) + x
```

بدل أن تتعلم كل طبقة Transform كاملة من الصفر.

ساعد هذا التصميم على تدريب شبكات عميقة جدًا.

في ورقة ResNet الأصلية، حقق **Ensemble** من الشبكات المتبقية خطأ 3.57% في مسابقة ImageNet 2015.

هذه نقطة تحتاج دقة:

> رقم 3.57% لا يعني أن أي ResNet منفردة حققت "96.43% Accuracy" على كل أنواع الصور، ولا يعني أن الذكاء الاصطناعي أصبح أفضل من البشر في الرؤية عمومًا.

إنه نتيجة Benchmark محددة، وضمن Metric وبنية وتجربة محددة.

# ماذا جاء بعد CNN؟

CNN ما تزال قوية جدًا، لكن تصنيف الصور الحديث لم يعد قائمًا عليها وحدها.

أحد أهم التحولات كان **Vision Transformer — ViT**.

# كيف تعمل Vision Transformer؟

فكرة ViT الأصلية بسيطة مفاهيميًا:

1. تقسيم الصورة إلى Patches.
2. تحويل كل Patch إلى Vector.
3. التعامل مع Patches كسلسلة Tokens.
4. تمريرها عبر Transformer.
5. استخدام Representation النهائية للتصنيف.

مثلًا:

```text
Image
 ↓
16×16 patches
 ↓
Patch embeddings
 ↓
Transformer
 ↓
Classifier
```

أظهرت ورقة ViT أن Transformer خالصًا يمكن أن يحقق أداء قويًا جدًا في Image Classification عند Pre-training على بيانات كبيرة ثم Transfer إلى Benchmarks أخرى.

وهذا وسع المشهد من:

> CNN هي البنية الطبيعية الوحيدة للرؤية

إلى:

> CNN وTransformers وغيرها يمكن أن تتعلم Visual Representations فعالة.

# هل Vision Transformer أفضل من CNN دائمًا؟

لا.

يعتمد الاختيار على:

- حجم البيانات.
- Pretraining.
- الموارد.
- Latency.
- الجهاز المستهدف.
- الدقة المطلوبة.
- حجم النموذج.

CNN صغيرة قد تكون ممتازة لتطبيق Edge.

ViT أو Foundation Model قد يكون أفضل عندما نملك Pretraining قويًا أو نحتاج Representation أوسع.

ولا يوجد "أفضل Architecture" مستقلة عن Use Case.

# ما الفرق بين Closed-set وOpen-vocabulary Classification؟

التصنيف التقليدي غالبًا **Closed-set**.

أي أن الفئات معروفة أثناء التدريب:

```text
cat
dog
horse
car
```

Classifier head يتعلم هذه الفئات فقط.

أما نماذج Image-Text الحديثة مثل **CLIP** فقد غيرت طريقة التفكير.

# كيف تعمل CLIP في التصنيف؟

CLIP تتعلم ربط:

- الصور.
- والنص.

داخل Representation space مشترك.

بدل Head ثابتة فقط، يمكن مقارنة صورة مع Text prompts مثل:

```text
"a photo of a cat"
"a photo of a dog"
"a photo of a bicycle"
```

ثم اختيار النص الأقرب إلى الصورة.

هذا سمح بما يسمى **Zero-shot classification** على Benchmarks متعددة دون تدريب Supervised مباشر على كل Dataset.

لكن هذا لا يعني أن Zero-shot مناسب تلقائيًا لكل تطبيق حساس.

الأداء يعتمد على:

- الفئات.
- Prompt.
- Domain.
- توزيع البيانات.
- الانحيازات الموجودة في Pretraining.

# ما DINOv2؟ ولماذا مهم؟

DINOv2 مثال على **Self-supervised visual pretraining**.

الفكرة هي تعلم Visual Features عامة من صور كثيرة دون الاعتماد على Labels تقليدية لكل صورة.

يمكن بعد ذلك استخدام Representation في مهام مختلفة، ومنها:

- Image Classification.
- Retrieval.
- Dense prediction.
- Transfer.

هذا يعكس اتجاهًا مهمًا في الرؤية الحاسوبية:

> بدل تدريب Model منفصل من الصفر لكل مشروع، نبدأ أكثر فأكثر من Visual Foundation Model ثم نكيفه للمهمة.

# كيف تبني Image Classification Pipeline؟

## 1. حدد المهمة بدقة

هل تريد:

### Single-label Classification؟

فئة واحدة لكل صورة:

```text
cat OR dog
```

### Multi-label Classification؟

أكثر من Label للصورة:

```text
person
bicycle
helmet
```

الفرق مهم لأن:

- Loss تختلف.
- Output activation تختلف.
- Metrics تختلف.

# 2. اجمع البيانات

لا يكفي عدد الصور.

اسأل:

- هل الصور تمثل بيئة التشغيل الحقيقية؟
- هل هناك أجهزة كاميرا مختلفة؟
- إضاءة مختلفة؟
- أعمار/فئات مختلفة؟
- حالات نادرة؟
- خلفيات متنوعة؟
- هل Labels صحيحة؟

100 ألف صورة منحازة قد تكون أسوأ من Dataset أصغر لكنها ممثلة للمشكلة.

# 3. افصل Train وValidation وTest

## Train

لتحديث الأوزان.

## Validation

لاختيار:

- Hyperparameters.
- Checkpoint.
- Threshold.
- Model.

## Test

للتقييم النهائي.

أحد أخطر الأخطاء هو **Data Leakage**.

مثلًا في Medical Imaging:

إذا كانت صور متعددة للمريض نفسه موزعة بين Train وTest، يمكن أن يبدو الأداء أعلى مما هو فعليًا.

قد يكون Split الصحيح على مستوى:

- Patient.
- Device.
- Site.
- Time period.

بحسب المهمة.

# 4. المعالجة المسبقة

قد تشمل:

- Resize.
- Crop.
- Normalization.
- Color conversion.
- Artifact removal.

لكن لا توجد Normalization واحدة صحيحة للجميع.

إذا استخدمت Pretrained model، غالبًا يجب احترام Preprocessing الذي تدرب عليه.

# 5. Data Augmentation

يمكن أن تشمل:

- Random crop.
- Rotation.
- Flip.
- Color jitter.
- Blur.
- Random erasing.
- MixUp/CutMix في بعض المشاريع.

هدفها ليس فقط "زيادة عدد الصور"، بل تعريض النموذج لتغيرات منطقية قد يراها وقت التشغيل.

## متى تكون Augmentation خطرة؟

عندما تغير معنى Label.

مثال:

قلب صورة أشعة أو عضو طبي أفقيًا قد يغير Laterality.

أو Rotation كبيرة قد تكون غير واقعية لمستندات واتجاهات محددة.

إذًا:

> Augmentation يجب أن تحفظ معنى الفئة، لا أن تكون عشوائية لمجرد زيادة البيانات.

# 6. اختر Baseline

ابدأ بشيء بسيط.

مثل:

- Logistic Regression على Features.
- SVM.
- ResNet18 pretrained.
- MobileNet/EfficientNet-class model.
- ViT صغير.

الهدف معرفة ما إذا كان التعقيد الجديد يضيف قيمة.

# 7. Transfer Learning أم Training from Scratch؟

في كثير من المشاريع، Transfer Learning هو الخيار العملي.

يوجد أسلوبان شائعان:

## Fixed Feature Extractor

تجميد معظم Backbone وتدريب Classification head.

## Fine-tuning

بدءًا من Pretrained weights، ثم تحديث بعض أو كل طبقات النموذج.

إذًا Transfer Learning لا تعني دائمًا:

> "نجمد الطبقات الأولى وندرب آخر طبقة فقط."

هذه طريقة واحدة.

قد يكون Fine-tuning الكامل أفضل عندما:

- لدينا بيانات كافية.
- Domain مختلف.
- نستخدم Learning Rate مناسبًا.

# 8. ماذا يخرج النموذج؟

في Multi-class classifier، ينتج غالبًا **Logits**.

مثل:

```text
[4.2, 1.1, -0.4]
```

ثم Softmax تحولها إلى قيم مجموعها 1:

```text
[0.94, 0.043, 0.017]
```

لكن من المهم:

> **Softmax score ليست بالضرورة Probability معايرة جيدًا.**

قد يكون النموذج Overconfident.

لذلك في تطبيقات عالية المخاطر قد نحتاج **Calibration** بدل تفسير 0.94 كأنها ثقة حقيقية بنسبة 94%.

# كيف نقيس أداء Image Classifier؟

## Accuracy

```text
correct predictions / all predictions
```

مناسبة عندما تكون الفئات متوازنة نسبيًا وتكلفة الأخطاء متقاربة.

لكنها قد تكون مضللة.

مثال:

Dataset فيها:

- 990 صورة سليمة.
- 10 صور مرضية.

نموذج يقول "سليم" لكل صورة:

```text
Accuracy = 99%
```

ومع ذلك:

```text
Recall للحالات المرضية = 0%
```

النظام فاشل للهدف الطبي.

# Precision

تجيب:

> من بين ما توقعه النموذج كإيجابي، كم كان صحيحًا؟

```text
Precision = TP / (TP + FP)
```

# Recall

تجيب:

> من بين الحالات الإيجابية الحقيقية، كم اكتشف النموذج؟

```text
Recall = TP / (TP + FN)
```

# F1 Score

المتوسط التوافقي بين Precision وRecall:

```text
F1 = 2 × Precision × Recall / (Precision + Recall)
```

مفيد عندما نحتاج توازنًا بينهما.

# Macro أم Weighted F1؟

في Multiclass classification:

## Macro F1

تحسب F1 لكل Class ثم تعطيها وزنًا متساويًا.

مفيدة إذا كانت الفئات النادرة مهمة.

## Weighted F1

تزن كل فئة بعدد Samples.

قد تخفي أداء سيئًا على فئة صغيرة.

# Confusion Matrix

من أكثر الأدوات قيمة لأنها تكشف **أي فئة يخلطها النموذج مع أي فئة**.

قد نرى مثلًا:

```text
wolf → dog
truck → bus
melanoma → benign lesion
```

وهذه المعلومات أهم من Accuracy واحدة.

# ماذا عن ROC-AUC وPR-AUC؟

قد تكون مفيدة خصوصًا في Binary Classification.

لكن اختيار Metric يجب أن يعتمد على:

- Class imbalance.
- تكلفة False Positive.
- تكلفة False Negative.
- Threshold.
- التطبيق.

في Dataset شديدة عدم التوازن، Precision-Recall curve قد تكون أكثر إفادة من Accuracy وحدها.

# لا تختبر Dataset فقط؛ اختبر العالم الحقيقي

النجاح على Test split لا يكفي.

هناك مشكلة **Distribution Shift**.

قد يتدرب النموذج على:

- كاميرات احترافية.

ثم يعمل على:

- هاتف رخيص.

أو يتدرب على:

- مستشفى واحد.

ثم يستخدم في:

- مستشفى آخر.

أو يتدرب على:

- إضاءة جيدة.

ثم يعمل ليلًا.

يجب اختبار:

- أجهزة مختلفة.
- Locations مختلفة.
- وقت مختلف.
- Blur.
- Lighting.
- Compression.
- Occlusion.
- Subgroups مهمة.

# ما الفرق بين Confidence وUncertainty؟

النموذج قد يخرج:

```text
dog = 0.99
```

لكن الصورة قد تكون خارج Distribution التدريب.

مثل:

- صورة أشعة لنموذج مدرب على الحيوانات.
- رسم كرتوني غريب.
- نوع مرض لم يره.

لذلك الأنظمة الجيدة تحتاج أحيانًا:

- Out-of-distribution detection.
- Abstention.
- Human review.
- Confidence threshold.
- Calibration.

أفضل قرار قد يكون:

> "لا أعرف بما يكفي"

بدل Class خاطئة بثقة كبيرة.

# هل Deep Learning دائمًا أفضل من Classic ML؟

لا.

المصدر الأكاديمي يقارن بينهما بصورة حادة، لكن الواقع أكثر اعتمادًا على المهمة.

## Classic ML قد يكون أفضل عندما:

- Dataset صغيرة جدًا.
- Features مفهومة وقوية.
- الموارد محدودة.
- النموذج يحتاج بساطة.
- Latency شديدة الانخفاض.
- نحتاج تفسيرًا مباشرًا نسبيًا.

## Deep Learning أفضل غالبًا عندما:

- البيانات بصرية معقدة.
- لدينا Pretrained models.
- نحتاج تعلم Features.
- التغيرات البصرية كثيرة.
- Scale كبير.

والأهم أن Transfer Learning قلل كثيرًا الفجوة في متطلبات البيانات.

# هل Deep Learning يحتاج ملايين الصور دائمًا؟

لا.

هذا كان صحيحًا أكثر عند التفكير في Training from scratch.

اليوم يمكن أن تبدأ من:

- ResNet pretrained.
- ViT pretrained.
- Self-supervised model.
- Image-text model.

ثم Fine-tune على Dataset أصغر.

طبعًا "أصغر" لا يعني أي عدد من الصور يكفي.

الجودة والتمثيل والتشابه مع Domain الأصلي تظل مهمة.

# ما أهم تطبيقات Image Classification؟

## التصوير الطبي

قد تستخدم النماذج للمساعدة في:

- Mammography.
- Retinal images.
- Skin lesions.
- Pathology.
- X-ray.
- MRI.
- CT.

لكن يجب الفصل بين:

> Research performance

و:

> Clinical deployment.

دراسة Nature عام 2020 عن فحص سرطان الثدي أظهرت في Dataset الدراسة انخفاضًا مطلقًا في False Positives بمقدار **5.7% في الولايات المتحدة و1.2% في المملكة المتحدة**، وانخفاض False Negatives بمقدار **9.4% و2.7%** على الترتيب.

هذه نتائج دراسة محددة، وليست تصريحًا بأن "AI أدق من الأطباء في كل التشخيصات".

كما نُشر Addendum لاحقًا لزيادة تفاصيل قابلية إعادة إنتاج المنهج.

لذلك أي نظام طبي يحتاج:

- External validation.
- Clinical validation.
- Regulatory review عند الاقتضاء.
- Monitoring.
- Human oversight.

# المركبات والقيادة الآلية

الرؤية الحاسوبية مهمة للمركبات، لكن **Image Classification وحدها ليست كافية**.

المركبة تحتاج غالبًا:

- Object Detection.
- Segmentation.
- Tracking.
- Depth.
- Sensor fusion.
- Planning.
- Control.

كما أن العبارة الشائعة:

> "94% من الحوادث سببها الخطأ البشري"

يجب استخدامها بحذر.

وثائق NHTSA توضح أن "Critical Reason" هي آخر فشل في السلسلة قبل الحادث، **وليست سبب الحادث ولا تعني إسناد الخطأ**.

لذلك لا يصح تحويل رقم كهذا إلى ادعاء أن أنظمة الرؤية الآلية ستمنع تلقائيًا 94% من الحوادث.

# التصنيع

يمكن استخدام التصنيف لـ:

- Defect classification.
- جودة المنتج.
- فرز.
- نوع القطعة.
- حالات سطحية.

مثال:

```text
Image
 ↓
Classifier
 ↓
OK / scratch / crack / contamination
```

لكن إذا كنا نحتاج تحديد مكان العيب، قد يكون Detection أو Segmentation أنسب.

# الزراعة

مثل:

- تصنيف أمراض النباتات.
- أنواع المحاصيل.
- نضج الثمار.
- جودة المنتجات.

ويجب اختبار النموذج على:

- كاميرات مختلفة.
- ضوء الشمس.
- بيئات مختلفة.
- أصناف نباتات مختلفة.

# الأمن والمراقبة

يمكن استخدام Classification في:

- تصنيف مشاهد.
- محتوى.
- أحداث مرئية.

أما **Face Recognition** فهي مهمة مختلفة وحساسة.

يجب تقييم:

- False matches.
- Demographic performance.
- Consent/legal basis.
- Retention.
- Security.

ولا ينبغي اعتبار نموذج عالي Accuracy على Dataset عامة دليلًا على ملاءمته لاستخدام هوية عالي المخاطر.

# ما تحديات Image Classification؟

## 1. Label Quality

إذا كانت Labels خاطئة، النموذج يتعلم ضوضاء.

## 2. Class Imbalance

قد يتجاهل فئات نادرة.

## 3. Shortcut Learning

قد يتعلم النموذج إشارة غير مقصودة.

مثال:

بدل تعلم المرض، قد يتعلم:

- علامة جهاز.
- خلفية.
- Marker على الأشعة.

ثم ينهار خارج Dataset.

## 4. Domain Shift

تغير الكاميرا أو الموقع أو السكان قد يقلل الأداء.

## 5. Spurious Correlations

قد يرتبط Label بعامل جانبي فقط في بيانات التدريب.

## 6. Adversarial Examples

أظهرت أبحاث أن Perturbations مصممة خصيصًا يمكن أن تجعل نماذج تصنف بصورة خاطئة بثقة عالية.

لكن الهجمات العدائية ليست فقط "ضوضاء غير مرئية"؛ توجد أيضًا:

- Physical adversarial patterns.
- Patch attacks.
- Data poisoning.

والدفاع ليس مشكلة محلولة بالكامل.

# هل Adversarial Training يحل المشكلة؟

يمكن أن يزيد Robustness ضد عائلات معينة من الهجمات.

لكنه قد:

- يزيد تكلفة التدريب.
- يؤثر في Clean accuracy.
- لا يعمم على كل Threat model.

لذلك يجب تحديد:

> من المهاجم؟ وما قدرته؟ وما الذي نريد حمايته؟

قبل اختيار الدفاع.

# كيف نفهم قرار النموذج؟

أدوات مثل **Grad-CAM** يمكنها إنتاج Heatmap تقريبية للمناطق التي ساهمت في Prediction داخل بعض CNN-based architectures.

هذا مفيد لـ:

- Debugging.
- اكتشاف Shortcut learning.
- مراجعة ما ينظر إليه النموذج.

لكن:

> Heatmap ليست تفسيرًا سببيًا كاملًا، ولا إثباتًا أن النموذج "فكر" بهذه الطريقة مثل الإنسان.

Explainability tool يجب تقييمها هي نفسها.

# كيف تنشر النموذج على Edge؟

قد نحتاج تشغيل Classification على:

- هاتف.
- كاميرا.
- Raspberry Pi-class device.
- Embedded accelerator.

يمكن استخدام:

## Quantization

تقليل Precision العددية مثل:

```text
FP32 → INT8
```

## Pruning

إزالة بعض الأوزان/البنى قليلة الأهمية وفق طريقة محددة.

## Knowledge Distillation

تدريب Student model أصغر للاستفادة من Teacher أكبر.

## Smaller Backbone

أحيانًا أفضل optimization هو اختيار نموذج أصغر من البداية.

يجب قياس:

- Accuracy.
- Latency.
- RAM.
- Model size.
- Power.
- Throughput.

وليس FLOPs فقط.

# كيف تغير Foundation Models مستقبل التصنيف؟

هناك انتقال من:

> Model مدرب لفئات ثابتة فقط

إلى:

> Visual representation عامة يمكن تكييفها لمهام كثيرة.

أمثلة:

## CLIP

يربط Image ↔ Text ويتيح Zero-shot classification في حالات كثيرة.

## DINOv2

يتعلم Visual Features عامة بأسلوب Self-supervised.

## ViT-based pretrained models

يمكن Fine-tune أو استخدام Features منها.

هذه النماذج تقلل الحاجة إلى Training from scratch، لكنها لا تلغي الحاجة إلى:

- Validation محلي.
- Bias testing.
- Data governance.
- Domain testing.

# كيف تختار Approach عمليًا؟

استخدم هذا القرار المبسط:

## Dataset صغيرة + Task واضحة

ابدأ بـ:

- Pretrained CNN أو ViT.
- Transfer Learning.

## Edge device صغير

اختبر:

- Mobile-oriented CNN.
- Small ViT.
- Quantized model.

## فئات تتغير باستمرار

فكر في:

- Image-text models.
- Embedding-based classification.
- Retrieval-assisted approach.

## مجال طبي/صناعي حساس

ركز على:

- Dataset quality.
- External validation.
- Calibration.
- Error analysis.
- Human review.
- Monitoring.

## لا توجد Labels كافية

فكر في:

- Self-supervised pretraining.
- Transfer Learning.
- Active Learning.
- Weak supervision.
- Vision-language models.

# Checklist قبل إطلاق Image Classifier

- [ ] المهمة Classification فعلًا، وليست Detection/Segmentation.
- [ ] Classes معرفة بوضوح.
- [ ] Labels راجعها مختصون عند الحاجة.
- [ ] Train/Val/Test منفصلة دون Leakage.
- [ ] Test set تمثل العالم الحقيقي.
- [ ] Baseline موجود.
- [ ] Class imbalance عولج بصورة مناسبة.
- [ ] Metrics مختارة وفق تكلفة الخطأ.
- [ ] Confusion Matrix تمت مراجعتها.
- [ ] Subgroup evaluation موجود عند الحاجة.
- [ ] Model calibrated إذا كانت Scores ستستخدم كاحتمالات.
- [ ] OOD behavior معروف.
- [ ] Human fallback موجود للقرارات الحرجة.
- [ ] Latency/Power/Memory اختبرت على الجهاز الحقيقي.
- [ ] Monitoring بعد النشر موجود.
- [ ] خطة retraining/versioning موجودة.

# الخلاصة

تصنيف الصور لم يعد يعني فقط:

```text
Image → CNN → Label
```

النظام الحديث أقرب إلى:

```text
Representative Data
      ↓
Preprocessing / Augmentation
      ↓
Pretrained Visual Representation
      ↓
CNN / ViT / Foundation Model
      ↓
Fine-tuning
      ↓
Probability Scores
      ↓
Calibration + Metrics + Error Analysis
      ↓
Deployment
      ↓
Monitoring
```

التطور التاريخي يمكن تلخيصه:

```text
Hand-crafted Features
        ↓
SIFT / HOG + SVM
        ↓
CNN
        ↓
ResNet
        ↓
Vision Transformer
        ↓
Self-supervised & Vision-Language Foundation Models
```

لكن النموذج الأحدث ليس تلقائيًا الأفضل.

أفضل نظام هو الذي:

- يحل المهمة الصحيحة.
- يتدرب على بيانات ممثلة.
- يقاس بمقاييس تناسب المخاطر.
- يعرف متى لا يثق بتوقعه.
- يعمل ضمن حدود الموارد.
- ويثبت أداءه على البيئة التي سيستخدم فيها فعلًا.

## الأسئلة الشائعة

### ما هو تصنيف الصور بالذكاء الاصطناعي؟

هو تدريب نموذج لإسناد فئة أو أكثر إلى صورة كاملة اعتمادًا على الأنماط التي تعلمها من بيانات سابقة.

### ما الفرق بين تصنيف الصور واكتشاف الأجسام؟

التصنيف يعطي فئة للصورة، بينما Object Detection يحدد أيضًا مواقع الأجسام داخلها باستخدام Bounding Boxes أو تمثيل مكافئ.

### هل CNN ما تزال مستخدمة؟

نعم. CNN ما تزال فعالة جدًا، خصوصًا في التطبيقات العملية وEdge، لكنها لم تعد البنية الوحيدة؛ Vision Transformers وFoundation Models أصبحت مهمة أيضًا.

### ما Vision Transformer؟

نموذج يقسم الصورة إلى Patches ويعاملها كسلسلة Tokens تمر عبر Transformer لاستخراج تمثيل للتصنيف أو مهام بصرية أخرى.

### هل يجب تدريب النموذج من الصفر؟

غالبًا لا. Transfer Learning أو Fine-tuning لنموذج مدرب مسبقًا يكون خيارًا عمليًا جدًا.

### هل Accuracy كافية لتقييم النموذج؟

لا، خصوصًا مع Class Imbalance. يجب النظر أيضًا إلى Precision وRecall وF1 وConfusion Matrix ومقاييس تناسب تكلفة الأخطاء.

### ما الفرق بين Precision وRecall؟

Precision تقيس كم Prediction إيجابي كان صحيحًا، بينما Recall تقيس كم حالة إيجابية حقيقية استطاع النموذج اكتشافها.

### هل Softmax 90% تعني أن النموذج صحيح بنسبة 90%؟

ليس بالضرورة. Scores قد تكون غير معايرة، والنموذج قد يكون Overconfident؛ لذلك يمكن استخدام Calibration عند الحاجة.

### ما Zero-shot Image Classification؟

هو تصنيف فئات لم يُدرّب النموذج عليها مباشرة بصيغة Supervised التقليدية، مثل استخدام Image-Text model لمقارنة الصورة بأوصاف الفئات.

### ما CLIP؟

نموذج يتعلم تمثيلات مشتركة للصور والنصوص ويمكن استخدامه في Zero-shot classification ومهام أخرى تعتمد على التشابه بين الصورة والوصف.

### ما DINOv2؟

نموذج Visual Representation يعتمد Self-supervised pretraining لتعلم Features عامة يمكن نقلها إلى مهام بصرية مختلفة.

### هل الذكاء الاصطناعي أفضل من الأطباء في تصنيف الصور الطبية؟

لا يمكن تعميم ذلك. توجد دراسات محددة حققت فيها أنظمة AI أداء قويًا أو تفوقت على قراء بشريين ضمن إعدادات معينة، لكن الاستخدام السريري يحتاج تحققًا خارجيًا وتنظيميًا ومراقبة بشرية.

### ما أهم مشكلة في Image Classification الواقعي؟

غالبًا ليست Architecture بحد ذاتها، بل التعميم: هل سيستمر النموذج في العمل عندما تختلف الكاميرا أو الإضاءة أو السكان أو البيئة عن بيانات التدريب؟

## المصادر والمراجع

1. K. He et al. — Deep Residual Learning for Image Recognition  
   https://arxiv.org/abs/1512.03385

2. A. Dosovitskiy et al. — An Image is Worth 16×16 Words: Transformers for Image Recognition at Scale  
   https://arxiv.org/abs/2010.11929

3. OpenAI — CLIP: Connecting Text and Images  
   https://openai.com/index/clip/

4. M. Oquab et al. — DINOv2: Learning Robust Visual Features without Supervision  
   https://arxiv.org/abs/2304.07193

5. PyTorch — Transfer Learning for Computer Vision Tutorial  
   https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial

6. scikit-learn — Metrics and scoring: quantifying the quality of predictions  
   https://scikit-learn.org/stable/modules/model_evaluation.html

7. S. M. McKinney et al. — International evaluation of an AI system for breast cancer screening  
   https://www.nature.com/articles/s41586-019-1799-6

8. McKinney et al. — Addendum: International evaluation of an AI system for breast cancer screening  
   https://www.nature.com/articles/s41586-020-2679-9

9. R. R. Selvaraju et al. — Grad-CAM  
   https://arxiv.org/abs/1610.02391

10. I. Goodfellow, J. Shlens, C. Szegedy — Explaining and Harnessing Adversarial Examples  
    https://arxiv.org/abs/1412.6572

11. NHTSA — Critical reason is not the cause of a crash / crash causation guidance  
    https://www.nhtsa.gov/sites/nhtsa.dot.gov/files/812023-heavy_truck_pre-crash_scenarios.pdf

12. O. Russakovsky et al. — ImageNet Large Scale Visual Recognition Challenge  
    https://arxiv.org/abs/1409.0575

13. C. Shorten, T. M. Khoshgoftaar — A survey on Image Data Augmentation for Deep Learning  
    https://journalofbigdata.springeropen.com/articles/10.1186/s40537-019-0197-0

## مقالات ودراسات ذات صلة في منصة تكنو إنجاز

- [كيف يتعرف الذكاء الاصطناعي على تعابير الوجه؟ شرح FER وFACS وCNN](/articles/facial-expression-recognition-ai)
- [الحوسبة العاطفية: كيف يحلل الذكاء الاصطناعي التعبير العاطفي؟](/articles/affective-computing)
- [كيف تتنبأ نماذج الذكاء الاصطناعي بالكلمة التالية؟ من N-gram إلى Transformers](/articles/next-token-prediction)

