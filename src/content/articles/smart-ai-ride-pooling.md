<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: كيف تعمل مشاركة الرحلات الذكية بالذكاء الاصطناعي؟ من المطابقة إلى تقليل الازدحام

Meta Description: دليل يشرح أنظمة مشاركة الرحلات الذكية: الفرق بين Ride-Hailing وRide-Pooling، المطابقة اللحظية، التنبؤ بالطلب، GNN والتعلم التعزيزي، إعادة توزيع الأسطول، وكيف نقيس أثرها الحقيقي على الازدحام والانبعاثات.

Suggested Slug: smart-ai-ride-pooling

# كيف تعمل مشاركة الرحلات الذكية بالذكاء الاصطناعي؟ من المطابقة إلى تقليل الازدحام

**مشاركة الرحلات الذكية (Dynamic Ride-Pooling) هي نظام نقل عند الطلب يحاول دمج ركاب ذوي مسارات متوافقة داخل المركبة نفسها في الوقت الفعلي، مع موازنة عدة أهداف متعارضة: تقليل انتظار الراكب، تقليل الانحراف عن مساره، رفع إشغال المركبة، خفض المسافات الفارغة، وتحسين كفاءة الأسطول.**

الفكرة تبدو بسيطة:

```text
راكب A: من X إلى Y
راكب B: من نقطة قريبة إلى وجهة قريبة
                 ↓
          مركبة واحدة مشتركة
```

لكن تنفيذها على مستوى مدينة كاملة ليس مجرد "العثور على أقرب سيارة".

النظام الحقيقي يحتاج إلى حل مشكلة تتغير كل ثانية:

- طلبات جديدة تصل باستمرار.
- مركبات تتحرك.
- ركاب موجودون بالفعل داخل المركبات.
- أزمنة السفر تتغير مع المرور.
- لكل راكب حد مقبول للانتظار والانحراف.
- السعة محدودة.
- بعض الطلبات لا يمكن دمجها دون الإضرار بجودة الخدمة.
- قرار اليوم يؤثر في مكان المركبة بعد دقائق وفي قدرتها على خدمة الطلب القادم.

لهذا فإن نظام مشاركة الرحلات الحديث أقرب إلى منصة تحسين لحظية:

```text
Requests + Vehicles + Traffic + Constraints
                    ↓
          Matching & Routing Engine
                    ↓
      Shared Trips + Fleet Rebalancing
                    ↓
          Continuous Re-optimization
```

# ما الفرق بين Ride-Hailing وRide-Pooling؟

المصطلحان يُستخدمان أحيانًا وكأنهما شيء واحد، لكن الفرق مهم.

## Ride-Hailing

يربط منصة رقمية بين:

- راكب أو مجموعة واحدة.
- وسائق/مركبة.

مثل رحلة خاصة عبر تطبيق.

```text
Passenger A → Vehicle 1
Passenger B → Vehicle 2
Passenger C → Vehicle 3
```

## Ride-Pooling

تحاول المنصة دمج طلبات مستقلة داخل المركبة نفسها إذا كانت متوافقة.

```text
Passenger A ┐
Passenger B ├→ Vehicle 1
Passenger C ┘
```

تصف FHWA ride-sharing في بيئة النقل عند الطلب على أنه حالة يختار فيها الركاب منتجًا يسمح بمطابقة رحلاتهم مع ركاب آخرين لهم مسارات متداخلة.

![حافلة صغيرة كهربائية من خدمة MOIA لمشاركة الرحلات متوقفة في مركز تشغيل بمدينة هامبورغ](/images/articles/body/smart-ai-ride-pooling-2.avif "مركبة MOIA الكهربائية في هامبورغ، صُممت لخدمة Ride-Pooling التي تجمع ركابًا بمسارات متقاربة في مركبة واحدة بدل رحلة خاصة لكل طلب — المصدر: Rebecca Hadler، ويكيميديا كومنز، CC BY-SA 4.0")

إذًا:

> **كل Ride-Pooling هو نقل عند الطلب، لكن ليس كل Ride-Hailing مشاركة فعلية للرحلة.**

وهذا الفرق أساسي عند الحديث عن الازدحام والانبعاثات.

# هل تطبيقات Ride-Hailing تقلل الازدحام تلقائيًا؟

لا.

قد تبدو الفكرة منطقية:

> إذا كان الناس يستخدمون سيارة لا يملكونها، فسيقل عدد السيارات.

لكن النظام قد يضيف كيلومترات جديدة بسبب:

- قيادة السيارة دون راكب بين الطلبات.
- التوجه إلى نقطة الالتقاط.
- جذب أشخاص كانوا سيستخدمون الحافلة أو المترو أو المشي.
- رحلات جديدة لم تكن ستحدث أصلًا.

تسمى المسافات التي تقطعها المركبة بدون راكب:

**Deadheading**

وفي دراسة على نحو 1.5 مليون رحلة RideAustin، قُدرت قيادة السائقين من وإلى منطقة العمل بما يعادل 19% من إجمالي VMT للخدمة، بينما شكلت القيادة بين الرحلات 26% أخرى في تقدير الدراسة.

هذه أرقام **حالة دراسية محددة** وليست نسبة عالمية ثابتة.

كما وجدت دراسة منشورة في Science Advances أن انتشار شركات النقل عند الطلب في سان فرانسيسكو ساهم في زيادة الازدحام خلال الفترة التي درستها بين 2010 و2016.

لذلك:

> **النقل بالتطبيق ليس مرادفًا للنقل المشترك المستدام.**

السؤال الحقيقي هو:

> هل النظام يزيد متوسط الإشغال ويقلل Vehicle Kilometers Traveled بعد احتساب المسافات الفارغة والانحرافات وتغير وسيلة النقل الأصلية؟

# متى يمكن أن تقلل Ride-Pooling عدد المركبات؟

تتحقق الفائدة عندما يستطيع النظام دمج طلبات كانت ستحتاج إلى مركبات منفصلة.

مثال:

بدون مشاركة:

```text
A → car 1 → 8 km
B → car 2 → 7 km
C → car 3 → 9 km
```

قد يكون الإجمالي:

```text
24 vehicle-km
```

مع pooling جيد:

```text
A+B+C → one vehicle → 13 km
```

قد ينخفض VKT.

لكن إذا كانت نقاط الالتقاط متباعدة:

```text
detour = 8 km
```

فقد تختفي الفائدة.

إذًا النجاح يعتمد على:

- كثافة الطلب.
- تشابه Origins/Destinations.
- نافذة الانتظار.
- الحد المقبول للانحراف.
- حجم الأسطول.
- سعة المركبات.
- توقيت الطلبات.
- جودة المطابقة.

# لماذا Dynamic Ride-Pooling مسألة صعبة؟

لنفترض وجود:

- 5,000 مركبة.
- 20,000 طلب نشط.
- عدة ركاب داخل بعض المركبات.

لا يمكن اختبار كل Combination ممكن بطريقة ساذجة.

فكل طلب جديد قد يدخل:

- قبل Pickup راكب آخر.
- بعده.
- بين Drop-offs.
- أو يُرفض.

ويجب احترام Constraints مثل:

```text
vehicle_capacity
maximum_wait_time
maximum_detour
pickup_time_window
dropoff_time_window
driver_constraints
service_area
```

لذلك ترتبط المشكلة بعائلات من:

- Dynamic Vehicle Routing.
- Dial-a-Ride Problem.
- Assignment.
- Combinatorial Optimization.

وهي مسائل قد تصبح حسابيًا صعبة جدًا مع ازدياد الحجم.

![مثال لمسألة توجيه المركبات على شبكة طرق: ثلاث مركبات تنطلق من مستودع مركزي D وتخدم نقاطًا موزعة بمسارات ملونة](/images/articles/body/smart-ai-ride-pooling-1.avif "مثال مبسط لمسألة توجيه المركبات (Vehicle Routing): ثلاث مركبات تتقاسم خدمة 11 نقطة انطلاقًا من مستودع مركزي — المصدر: Zootos، ويكيميديا كومنز، CC BY-SA 4.0")

# ما المسار الكامل لطلب راكب؟

يمكن تصور النظام كالتالي:

```text
1. Passenger Request
       ↓
2. Validate request
       ↓
3. Find candidate vehicles
       ↓
4. Generate feasible shared trips
       ↓
5. Estimate pickup + detour
       ↓
6. Score alternatives
       ↓
7. Assign vehicle
       ↓
8. Update route
       ↓
9. Track execution
       ↓
10. Re-optimize when state changes
```

كل مرحلة لها هدف مختلف.

# 1. استقبال الطلب

الطلب النموذجي قد يحتوي:

```text
pickup_location
dropoff_location
request_time
max_wait
max_detour
passenger_count
accessibility needs
```

ولا ينبغي للنظام جمع بيانات إضافية لا يحتاجها.

# 2. البحث عن المركبات المرشحة

بدل مقارنة الطلب بكل مركبة في المدينة، يمكن تضييق البحث حسب:

- ETA إلى نقطة الالتقاط.
- المنطقة الجغرافية.
- السعة الشاغرة.
- اتجاه الرحلة الحالي.
- إمكانية إدخال الطلب في Route الموجودة.

هذه الخطوة تقلل مساحة البحث.

# 3. هل يمكن إدخال راكب جديد في رحلة قائمة؟

لنفترض أن Route الحالية:

```text
Pickup A
Dropoff A
```

وصل طلب B.

قد يجرب النظام:

```text
Pickup A
Pickup B
Dropoff A
Dropoff B
```

أو:

```text
Pickup A
Pickup B
Dropoff B
Dropoff A
```

ثم يحسب:

- كم سيزداد انتظار B؟
- كم سيزداد زمن A؟
- هل تتجاوز السعة؟
- هل ما زالت Time Windows صالحة؟

إذا فشل أي Constraint، الطلب غير قابل للإدراج في هذه المركبة.

![مخطط يوضح مسار مركبة حالي لالتقاط الراكب A وإنزاله، ثم ترتيبين ممكنين لإدراج الراكب B أحدهما مقبول والآخر مرفوض لتجاوز تأخير A الحد المسموح، مع قائمة القيود المفحوصة](/images/articles/body/smart-ai-ride-pooling-3.avif "اختبار الإدراج: يجرّب النظام ترتيبات Pickup وDropoff الممكنة للطلب الجديد، ويقبل الترتيب فقط إذا بقي الانتظار والانحراف والسعة ونوافذ الوقت ضمن الحدود — رسم توضيحي: تكنو إنجاز")

# Request-Trip-Vehicle Graph

من أشهر الأطر البحثية المؤثرة في Dynamic Ride-Sharing عمل Alonso-Mora وزملائه المنشور عام 2017.

الفكرة المبسطة:

1. معرفة أي Requests يمكن مشاركتها.
2. بناء Trips ممكنة تحقق القيود.
3. معرفة أي Vehicle تستطيع تنفيذ كل Trip.
4. حل Assignment بين Trips والمركبات.

يمكن تمثيل ذلك مفاهيميًا:

```text
Requests
   ↓
Feasible shared trips
   ↓
Trip ↔ Vehicle compatibility
   ↓
Global assignment
```

في تجربة الدراسة على بيانات نحو 3 ملايين رحلة تاكسي في نيويورك، أظهر الباحثون أن خوارزمية المطابقة الديناميكية يمكنها تحقيق معدلات خدمة مرتفعة باستخدام أسطول أصغر في نموذج المحاكاة، مع Trade-off واضح بين:

- Fleet size.
- Vehicle capacity.
- Waiting time.
- Passenger delay.

لكن هذه نتائج **محاكاة على Dataset وسيناريو محددين**، وليست وعدًا بأن أي مدينة ستحصل على النسب نفسها.

# لماذا لا نستخدم Greedy Matching فقط؟

Greedy قد يقول:

> أعطِ الطلب لأقرب مركبة متاحة الآن.

الميزة:

- سريع.
- بسيط.
- سهل التشغيل.

لكن قد ينتج قرارًا سيئًا بعد خمس دقائق.

مثال:

مركبة A هي الأقرب إلى طلب صغير، لكن هناك بعد دقيقة طلبان متوافقان جدًا في نفس منطقة A.

لو استخدمنا A الآن قد نخسر Pooling أفضل مستقبلًا.

هذا يسمى الاختلاف بين:

- **Myopic decision**
- **Anticipatory decision**

# الخوارزميات المستخدمة في Ride-Pooling

لا يوجد Algorithm واحدة تصلح لكل منصة.

## Greedy / Insertion Heuristics

تختبر إدراج طلب جديد داخل Route حالية.

مناسبة عندما نريد:

- سرعة.
- Baseline قوي.
- نظام أبسط.

## Integer / Mixed Integer Optimization

يمكن صياغة Assignment كمسألة Optimization.

مفيدة عندما نحتاج:

- حلًا عالميًا أفضل.
- Constraints واضحة.

لكن وقت الحساب قد يصبح تحديًا عند Scale كبير.

## Metaheuristics

مثل:

- Large Neighborhood Search.
- Genetic Algorithms.
- Simulated Annealing.

قد تساعد في إيجاد حلول جيدة لمساحات بحث كبيرة.

لكن لا يوجد ضمان أن تكون أسرع أو أفضل في كل سيناريو.

## Machine Learning

يمكن استخدام ML في أجزاء من النظام بدل استبدال Optimization كاملة.

مثل:

- ETA prediction.
- Demand forecasting.
- Acceptance probability.
- Travel time.
- Candidate pruning.

## Reinforcement Learning

يمكن استخدام RL في قرارات طويلة الأمد مثل:

- Rebalancing.
- Pricing.
- Zone selection.
- Anticipatory control.

لكن RL ليست حلًا سحريًا لمسألة المطابقة.

في كثير من الأنظمة البحثية الأقوى يكون التصميم **Hybrid**:

```text
Machine Learning predicts
Optimization decides
Simulation evaluates
```

أو:

```text
GNN/RL chooses strategic action
        ↓
Assignment solver handles hard constraints
```

# لماذا تستخدم Graph Neural Networks؟

شبكة الطرق Graph بطبيعتها.

```text
Node = zone / intersection
Edge = road / adjacency
```

والطلب في منطقة يؤثر على مناطق قريبة.

يمكن لـGNN أن تبني Representation للحالة:

```text
zone demand
available vehicles
travel time
neighbor congestion
```

ثم تنتج Embeddings تمثل العلاقات المكانية.

مثلًا:

```text
Urban Graph
   ↓
GNN
   ↓
Spatial Representation
   ↓
RL / Prediction / Optimization
```

لكن استخدام GNN لا يعني تلقائيًا أن النموذج أفضل من الطرق التقليدية.

يجب مقارنته بـBaselines تحت:

- نفس البيانات.
- نفس Constraints.
- نفس Compute budget.
- نفس KPIs.

# ما دور Deep Reinforcement Learning؟

في Ride-Pooling، القرار الحالي يؤثر في المستقبل.

إذا أرسلنا مركبة إلى غرب المدينة الآن:

```text
current reward
```

قد يكون أقل، لكن بعد عشر دقائق قد تظهر كثافة طلب مرتفعة هناك.

RL تحاول تعلم Policy تعظم Reward على Horizon زمني بدل قرار واحد.

يمكن أن تحتوي State مثلًا:

```text
vehicle distribution
active requests
forecast demand
traffic state
seat occupancy
```

والAction:

```text
reposition vehicle
change zone
prioritize request group
adjust policy parameter
```

والReward:

```text
+ served trips
+ occupancy
- waiting time
- detour
- deadheading
- rejection
- emissions proxy
```

لكن تصميم Reward حساس جدًا.

إذا أعطينا وزنًا كبيرًا للإيرادات فقط، قد يتجاهل النظام العدالة.

إذا أعطينا وزنًا كبيرًا لـOccupancy، قد يسبب Detours مزعجة.

# هل MADRL-GNN هي البنية المثالية؟

الحلقة البحثية الأصلية تقترح دمج:

**Multi-Agent Deep Reinforcement Learning + Graph Neural Networks**

وهي فكرة منطقية بحثيًا لأن:

- المركبات متعددة.
- الشبكة Graph.
- القرارات متتابعة.
- الطلب Spatio-temporal.

لكن لا ينبغي تحويل ذلك إلى:

> MADRL-GNN هي أفضل خوارزمية مثبتة لمشاركة الرحلات.

فالمقارنة العادلة تحتاج:

- Implementation مكتمل.
- Baselines.
- Hyperparameter tuning.
- عدة Seeds.
- Datasets حقيقية.
- Ablation studies.
- Statistical significance.
- Compute cost.
- Out-of-distribution tests.

كما أن عبارة أن الاستدلال بعد التدريب يصبح **O(1)** ليست صحيحة بصورة عامة.

كلفة GNN مثلًا تعتمد على:

- عدد Nodes.
- عدد Edges.
- عدد Layers.
- حجم Features.

وكلفة Assignment solver تعتمد على عدد:

- المركبات.
- الطلبات.
- الرحلات الممكنة.
- Constraints.

# ما هو Fleet Rebalancing؟

حتى لو كانت المطابقة ممتازة، قد يتجمع الأسطول في المكان الخطأ.

مثلًا:

```text
08:00
Residential zones → many requests
Downtown → few cars available later
```

بعد إسقاط الركاب في المركز:

```text
10:00
Downtown → many idle cars
Residential → new demand
```

Rebalancing يعني توجيه مركبات فارغة استباقيًا.

لكن هنا مفارقة:

> إعادة التموضع تساعد على تقليل الانتظار، لكنها تضيف Deadheading.

إذًا يجب أن يكون الهدف:

```text
benefit of future positioning
>
cost of empty travel
```

![مخطط من لوحتين: في الساعة 8 صباحًا تنقل المركبات الركاب من الأحياء السكنية إلى وسط المدينة، وفي الساعة 10 تتكدس المركبات الفارغة في المركز فيُعاد توجيه بعضها إلى الأحياء حيث يظهر طلب جديد](/images/articles/body/smart-ai-ride-pooling-4.avif "إعادة توزيع الأسطول: نقل المركبات الفارغة استباقيًا يقلل الانتظار لاحقًا، لكنه يضيف Deadheading، لذلك يجب أن تفوق فائدة التموضع كلفة السير بلا ركاب — رسم توضيحي: تكنو إنجاز")

# كيف نتنبأ بالطلب؟

Demand Forecasting تحاول تقدير:

```text
requests(zone, time)
```

اعتمادًا على:

- Historical demand.
- Time of day.
- Day of week.
- Weather.
- Events.
- holidays.
- transit disruptions.
- current demand trend.

يمكن استخدام:

- Time-series models.
- Gradient boosting.
- LSTM/GRU.
- Temporal CNN.
- GNN.
- Transformers.

لكن لا يوجد "معيار ذهبي" واحد.

النموذج الأفضل يعتمد على:

- Dataset.
- spatial granularity.
- forecast horizon.
- city dynamics.

# هل التنبؤ لمدة 15–45 دقيقة دائمًا مناسب؟

لا.

هذا Horizon يجب اختياره حسب قرار التشغيل.

## 5 دقائق

مفيد لـ:

- near-term rebalancing.

## 30 دقيقة

مفيد لـ:

- fleet positioning.

## ساعات

مفيد لـ:

- staffing.
- charging.
- supply planning.

الأهم ليس Forecast accuracy وحدها.

قد يكون Model أقل دقة لكنه يؤدي إلى Fleet decisions أفضل.

لذلك يجب قياس:

> **Operational value of forecast**

وليس RMSE فقط.

# بنية منصة Ride-Pooling حقيقية

يمكن تصميمها طبقيًا:

```text
Passenger / Driver Apps
          ↓
      API Layer
          ↓
Event / Request Stream
          ↓
┌─────────────────────────┐
│ Real-time State Store   │
│ Vehicle positions       │
│ Active requests         │
│ Current routes          │
└─────────────────────────┘
          ↓
┌─────────────────────────┐
│ Intelligence Layer      │
│ ETA prediction          │
│ Demand forecast         │
│ Matching                │
│ Routing                 │
│ Rebalancing             │
└─────────────────────────┘
          ↓
    Dispatch Decisions
          ↓
 Driver / Passenger Apps
```

وبجانبها:

```text
Historical Data
     ↓
Training / Analytics
     ↓
Model Registry
```

![مخطط بنية منصة مشاركة الرحلات: تطبيقات الراكب والسائق ثم طبقة API ومجرى الأحداث ومخزن الحالة اللحظية وطبقة الذكاء التي تصدر قرارات الإرسال، مع مسار غير لحظي من البيانات التاريخية إلى التدريب وسجل النماذج](/images/articles/body/smart-ai-ride-pooling-5.avif "بنية منصة Ride-Pooling: مسار لحظي من التطبيقات إلى مخزن الحالة وطبقة الذكاء وقرارات الإرسال، ومسار غير لحظي يدرّب نماذج التنبؤ والمطابقة من البيانات التاريخية — رسم توضيحي: تكنو إنجاز")

# هل نحتاج Big Data فعلًا؟

ليس كل نظام يحتاج "Big Data".

منصة صغيرة في مدينة محدودة قد تعمل بكفاءة عبر:

- قاعدة بيانات جغرافية.
- stream processing بسيط.
- optimization service.

مصطلح Big Data يصبح ذا معنى عندما نملك Scale أو Velocity أو Variety تحتاج Architecture موزعة فعلًا.

الهدف ليس:

> "استخدام Kafka وData Lake لأن النظام ذكي."

بل:

> بناء أبسط Architecture تستطيع تحقيق SLA المطلوبة.

# ما البيانات التي يحتاجها النظام؟

## من الراكب

- Origin.
- Destination.
- request time.
- party size.
- max waiting preference.
- accessibility needs عند الحاجة.

## من المركبة

- current location.
- route.
- occupied seats.
- capacity.
- status.
- energy/fuel state إذا كان ذلك مهمًا.

## من الشبكة

- travel times.
- closures.
- incidents.
- congestion.

## تاريخيًا

- demand by zone/time.
- cancellations.
- wait times.
- pickup success.
- detours.
- deadheading.

# Map Matching

GPS لا يعطي دائمًا موقعًا دقيقًا على الطريق.

قد تظهر النقطة:

```text
10 meters beside the road
```

Map Matching تربط Telemetry بأقرب Segment منطقي في شبكة الطرق.

هذه خطوة مهمة لأن Route optimization تعتمد على Graph صحيحة.

# هل Edge Computing ضرورية؟

ليس دائمًا.

كثير من Ride-Pooling يمكن أن يعمل عبر Cloud / Data Center لأن قرار Dispatch مركزي بطبيعته.

Edge قد تكون مفيدة لـ:

- local traffic processing.
- privacy filtering.
- connected vehicle systems.
- low-latency roadside analytics.

لكن وضع "AI داخل كل مركبة" ليس شرطًا للمشاركة الديناميكية.

# كيف نحدد Objective Function؟

نظام سيئ التحسين قد يحقق Metric واحدة ويضر بالبقية.

مثال:

## تقليل VMT فقط

قد يجعل الركاب ينتظرون طويلًا.

## تقليل الانتظار فقط

قد يرسل مركبات كثيرة منفصلة.

## زيادة Occupancy فقط

قد يفرض Detours كبيرة.

لذلك نحتاج Multi-objective Optimization.

مثال مبسط:

```text
Cost =
  a × waiting_time
+ b × passenger_detour
+ c × empty_distance
+ d × rejected_requests
+ e × operating_cost
+ f × emissions
```

الأوزان ليست "قيمًا علمية ثابتة".

هي تعبر عن Policy وBusiness goals ويجب اختبار حساسيتها.

# ما مؤشرات الأداء الصحيحة؟

## مؤشرات تجربة الراكب

- Mean wait time.
- P90/P95 wait time.
- in-vehicle time.
- detour time.
- cancellation rate.
- rejection rate.
- pickup reliability.

## مؤشرات الأسطول

- Vehicle occupancy.
- pooling rate.
- deadheading distance.
- revenue kilometers.
- idle time.
- trips per vehicle-hour.

## مؤشرات الشبكة

- total VKT.
- VHT.
- average speed.
- congestion delay.

## مؤشرات الاستدامة

- fuel/energy use.
- CO₂e.
- emissions per passenger-km.

## العدالة

- wait time by zone.
- rejection by zone.
- service coverage.
- accessibility.

هذا يمنع النظام من تحسين وسط المدينة فقط وترك الأطراف بخدمة سيئة.

# لماذا P95 أهم من المتوسط أحيانًا؟

لو كان متوسط الانتظار:

```text
4 min
```

قد يبدو ممتازًا.

لكن إذا:

```text
10% of users wait 18+ min
```

فهناك مشكلة.

لذلك راقب Distribution وليس Mean فقط.

# كيف نقيس الازدحام؟

لا يكفي:

> عدد المركبات التي وفرناها نظريًا.

استخدم:

- Vehicle Kilometers Traveled — VKT.
- Vehicle Hours Traveled — VHT.
- Vehicle Hours of Delay — VHD.
- speed.
- queue length.
- network throughput.

ويجب احتساب:

```text
occupied travel
+
pickup deadheading
+
between-trip deadheading
+
rebalancing
+
detours
```

# هل Ride-Pooling تقلل الانبعاثات دائمًا؟

لا.

الفائدة البيئية تعتمد على:

```text
avoided vehicle travel
-
new deadheading
-
pooling detours
-
mode substitution
```

إذا انتقل شخص من سيارة خاصة إلى Ride-Pool مشتركة، قد تظهر فائدة.

أما إذا انتقل من:

- Metro.
- Bus.
- walking.
- cycling.

إلى مركبة Ride-Pool، فقد تزيد الطاقة أو الانبعاثات.

وهذا سبب أن الأدبيات تعطي نتائج مختلفة بين المدن.

المراجعات المنهجية تشير إلى أن Pooling لديها **إمكانات** كبيرة لخفض VMT والطاقة، لكن النتائج الفعلية تعتمد على:

- نسبة المشاركة الحقيقية.
- Occupancy.
- deadheading.
- modal substitution.
- city form.
- transit network.

# أهم Metric بيئي: الانبعاث لكل راكب-كيلومتر

مقارنة:

```text
CO₂ per vehicle
```

قد تكون مضللة.

الأفضل في كثير من الحالات:

```text
CO₂e / passenger-km
```

لأن مركبة تحمل ثلاثة ركاب قد تستهلك أكثر قليلًا من مركبة تحمل واحدًا، لكنها توزع الاستهلاك على ركاب أكثر.

ومع السيارات الكهربائية يجب أيضًا تحديد Scope:

- Tailpipe emissions.
- electricity generation.
- lifecycle emissions.

# ماذا عن EV Ride-Pooling؟

كهربنة الأسطول يمكن أن تقلل الانبعاثات التشغيلية حسب مزيج الكهرباء.

لكنها تضيف Constraints جديدة:

```text
state of charge
charger location
charging time
charger queue
battery reserve
```

فتحول Optimization إلى:

```text
passenger assignment
+
routing
+
rebalancing
+
charging
```

وقد يكون إرسال EV بعيدة إلى طلب غير جيد إذا أدى إلى Charging downtime لاحقًا.

# المحاكاة: كيف نثبت أن النظام مفيد؟

إذا لم توجد بيانات تشغيل حقيقية، Simulation هي أداة أساسية.

لكن يجب أن نكون واضحين:

> **المحاكاة دليل تجريبي داخل نموذج، وليست إثباتًا تلقائيًا لأداء مدينة حقيقية.**

# استخدام SUMO

SUMO يدعم محاكاة Demand Responsive Transport عبر Taxi Device.

التوثيق الحالي يتضمن Dispatch algorithms مثل:

- greedy.
- greedyClosest.
- greedyShared.
- routeExtension.
- custom dispatch عبر TraCI.

وهذا يجعله مناسبًا لبناء Baseline واختبار خوارزمية خارجية.

# تصميم تجربة جيدة

## Baseline A: Private Trips

كل طلب → مركبة منفصلة.

## Baseline B: Ride-Hailing

مركبة لكل Request مع Deadheading.

## Baseline C: Greedy Pooling

Pooling بسيط.

## Model D: Advanced Optimization

خوارزمية المقارنة.

ثم ثبّت:

- نفس Demand.
- نفس Network.
- نفس travel-time assumptions.
- نفس vehicle capacity.
- نفس maximum wait/detour.

وقارن.

# لا تقارن AI بخوارزمية ضعيفة عمدًا

خطأ بحثي شائع:

```text
AI Model
vs
naive nearest-car baseline
```

ثم القول:

> AI أفضل بكثير.

يجب إضافة Baselines قوية مثل:

- insertion heuristic.
- optimization-based assignment.
- predictive rebalancing.
- established ride-pooling algorithm.

وإلا لا نعرف هل المكسب من "AI" أم من أن المقارنة ضعيفة.

# Ablation Study

إذا كان النظام:

```text
Demand Forecast
+ GNN
+ RL
+ Rebalancing
```

اختبر:

```text
without forecast
without GNN
without RL
without rebalancing
```

حتى نعرف ما الذي أضاف القيمة.

# الاختبار عبر عدة Seeds

بيئة المرور stochastic.

تشغيل Simulation مرة واحدة لا يكفي.

استخدم:

- عدة Random seeds.
- Confidence intervals.
- statistical tests عند الحاجة.

ولا تقل:

> "خفضنا الازدحام 27%"

إذا كان الرقم من Run واحدة.

# سيناريوهات الضغط

اختبر:

## Demand +20%

هل ينهار النظام؟

## حادث مروري

هل يعيد التوجيه؟

## Rain/event surge

هل Forecast تتكيف؟

## GPS noise

هل Map matching مستقرة؟

## Driver shortage

هل Rejection يرتفع بصورة عادلة؟

## Communication delay

هل القرارات ما زالت صالحة؟

# ما مشكلة Rejection Rate؟

يمكن للنظام تحسين متوسط الانتظار عبر رفض الطلبات الصعبة.

مثلًا:

```text
serve easy downtown requests
reject remote requests
```

فتبدو Metrics جيدة.

لذلك يجب مراقبة:

- Served demand.
- rejection.
- geography.
- rider class.

معًا.

# العدالة في Ride-Pooling

Optimization قد تتعلم أن بعض المناطق "أقل ربحية".

إذا لم نضع Constraints، قد يحدث:

```text
central zone → great service
outer zone   → high rejection
```

يمكن إضافة:

- minimum service coverage.
- maximum geographic disparity.
- fairness penalties.
- zone-level KPIs.

لكن العدالة ليست Weight واحدًا فقط؛ تحتاج تعريفًا واضحًا لما يعنيه الإنصاف في سياق المدينة.

# الخصوصية: بيانات الحركة حساسة

Ride-Pooling يعرف عادة:

- أين تبدأ الرحلة.
- أين تنتهي.
- متى يتحرك الشخص.
- تكرار الزيارات.
- أنماط الحياة.

حتى لو حذفنا الاسم، يمكن أن تكون Mobility traces قابلة لإعادة التعرف في بعض الظروف.

لذلك استخدم:

## Data Minimization

لا تجمع ما لا تحتاجه.

## Retention Limits

لا تحتفظ بموقع عالي الدقة إلى الأبد.

## Access Control

افصل:

- العمليات الحية.
- analytics.
- research datasets.

## Aggregation

Forecasting على مستوى Zone قد لا يحتاج Trajectory خام لكل مستخدم.

## Pseudonymization

مفيدة، لكنها ليست ضمانًا كاملًا لإخفاء الهوية.

# الأمن

النظام قد يتحكم في آلاف المركبات.

يجب حماية:

- API.
- driver app.
- passenger app.
- dispatch engine.
- admin access.
- GPS telemetry.
- model endpoints.

ومن المخاطر:

- fake ride requests.
- GPS spoofing.
- account takeover.
- route manipulation.
- denial-of-service.
- data leakage.

# هل يمكن للذكاء الاصطناعي نفسه أن يسبب مشكلة مرورية؟

نعم.

تخيل Model تتنبأ بأن Zone A ستصبح ساخنة.

فتعيد 500 مركبة إليها.

كل المركبات تتصرف بالطريقة نفسها.

النتيجة:

> Rebalancing congestion.

لهذا يجب أن يكون التحكم:

- capacity-aware.
- network-aware.
- coordinated.

لا يكفي Forecast ممتاز.

# العلاقة مع النقل العام

أفضل Ride-Pooling لا يجب بالضرورة أن يحاول استبدال:

- Metro.
- Bus.
- Tram.

قد تكون القيمة الأكبر في:

- First-mile.
- Last-mile.
- low-demand hours.
- underserved zones.

أي:

```text
Ride-Pool
   ↓
Transit Hub
   ↓
Metro / BRT / Rail
```

بدل:

```text
Ride-Pool
   ↓
40 km across city
```

الدمج مع النقل العام قد يكون أكثر استدامة من المنافسة معه.

# Dynamic Pricing: هل هو جزء من الذكاء؟

يمكن استخدام السعر لتغيير:

- الطلب.
- قبول المشاركة.
- توازن العرض.

مثل:

```text
private ride = higher price
pooled ride  = discount
```

لكن التسعير الديناميكي قد يثير:

- fairness.
- affordability.
- price discrimination concerns.

ويجب ألا يكون هدف النظام:

> ملء السيارات بأي ثمن.

بل تحسين خدمة النقل مع حماية المستخدمين.

# ماذا عن المركبات الذاتية؟

يمكن أن تغير Economics لأن تكلفة السائق قد تختفي.

لكن هذا قد يؤدي أيضًا إلى:

- مزيد من الرحلات الفارغة.
- repositioning أكبر.
- induced demand.

لذلك Autonomous Ride-Pooling ليست تلقائيًا أقل ازدحامًا.

الخوارزمية يجب أن تقلل:

```text
empty movement
```

وليس فقط تكلفة التشغيل.

# ماذا عن eVTOL والنقل الجوي الحضري؟

يمكن تمديد أفكار:

- assignment.
- scheduling.
- fleet management.

نظريًا إلى eVTOL.

لكن هذه منطقة بحثية وتنظيمية مختلفة كليًا، وتشمل:

- airspace.
- vertiports.
- battery safety.
- weather.
- aviation certification.

لذلك لا ينبغي عرضها كامتداد بسيط لنفس تطبيق Ride-Pooling.

# إطار عملي لبناء النظام

## المرحلة 1: لا تبدأ بـAI

ابنِ Baseline:

```text
nearest feasible vehicle
+
simple insertion
```

واعرف الأداء.

## المرحلة 2: أضف Constraints

- wait.
- detour.
- capacity.
- service area.

## المرحلة 3: أضف Optimization

حل أفضل للمطابقة.

## المرحلة 4: أضف Demand Forecast

فقط إذا أثبتت أن Rebalancing تحتاجها.

## المرحلة 5: أضف Learning

مثل GNN/RL إذا كانت Baselines لم تعد تحقق الهدف.

## المرحلة 6: اختبر Operational KPIs

وليس Model loss فقط.

## المرحلة 7: اختبر Externalities

- VKT.
- congestion.
- emissions.
- equity.
- transit substitution.

# مثال Architecture عملية

```text
Passenger App
     ↓
Ride Request API
     ↓
Request Stream
     ↓
Candidate Search
     ↓
Travel Time Engine
     ↓
Feasible Trip Generator
     ↓
Assignment Optimizer
     ↓
Route Update
     ↓
Driver App

             Historical Data
                    ↓
            Demand Forecast
                    ↓
            Rebalancing Policy
                    ↓
              Fleet State
```

ويمكن إضافة GNN/RL داخل:

```text
Demand representation
or
Rebalancing policy
or
Strategic matching
```

بدل وضع "AI" في كل Component بلا حاجة.

# كيف نقرر هل النظام نجح؟

لا تقل:

> "النموذج حقق Accuracy 95%."

Ride-Pooling ليست Classification.

قل مثلًا:

```text
Served requests:        +x%
Median wait:            -y%
P95 wait:               -z%
Mean occupancy:         +a
Deadhead VKT:           -b%
Total VKT:              -c%
Passenger detour:       +d min
CO₂e/passenger-km:      -e%
```

ثم أضف:

- confidence interval.
- baseline.
- scenario.
- dataset.
- simulation assumptions.

# أهم تصحيحات يجب الانتباه لها

## "المشكلة NP-hard، إذًا الطرق التقليدية لا تعمل"

غير صحيح.

صعوبة Worst-case لا تعني أن كل Instance عملي غير قابل للحل.

Heuristics وOptimization الحديثة يمكن أن تكون قوية جدًا.

## "DRL تعمل O(1) بعد التدريب"

غير صحيح كقاعدة.

Inference تعتمد على حجم المدخلات والمعمارية، وقد تبقى هناك Assignment/route optimization مكلفة.

## "AI تلغي الازدحام"

مبالغة.

النتيجة تعتمد على سلوك المستخدمين والسياسات والطلب.

## "Pooling تخفض CO₂ دائمًا"

غير صحيح.

قد تفشل إذا ارتفعت:

- Deadheading.
- Detours.
- substitution from transit.

## "خفض عدد المركبات = خفض الانبعاثات بنفس النسبة"

غير صحيح.

يجب قياس:

- distance.
- speed.
- fuel/energy.
- occupancy.

## "نتيجة Simulation = نتيجة مدينة حقيقية"

غير صحيح.

المحاكاة تحتاج Calibration وValidation.

# الخلاصة

نظام مشاركة الرحلات الذكي ليس مجرد تطبيق يربط عدة ركاب بسيارة.

هو نظام تحكم واتخاذ قرار لحظي:

```text
Observe
   ↓
Forecast
   ↓
Generate feasible shared trips
   ↓
Optimize assignment
   ↓
Route
   ↓
Rebalance
   ↓
Measure
   ↓
Repeat
```

الذكاء الاصطناعي يمكن أن يساعد في:

- توقع الطلب.
- تقدير أزمنة السفر.
- تمثيل الشبكة بـGNN.
- تعلم سياسات Rebalancing.
- اختيار قرارات استباقية.

لكن الفائدة الحقيقية لا تُقاس باسم الخوارزمية.

تُقاس بما إذا كان النظام قد:

- رفع إشغال المركبات.
- قلل Deadheading.
- خفض Total VKT.
- حافظ على Wait/Detour مقبولين.
- خدم المناطق بصورة عادلة.
- تكامل مع النقل العام بدل سحب ركابه.
- وخفض الانبعاثات الفعلية لكل راكب-كيلومتر.

ولهذا فإن السؤال الأفضل ليس:

> "هل نستخدم MADRL أم GNN؟"

بل:

> **ما القرار الذي نحتاج تحسينه، وما Baseline الأقوى، وما Metric التي تثبت أن النظام حسّن المدينة لا الخوارزمية فقط؟**

## المصادر والمراجع

1. Alonso-Mora et al. — On-demand high-capacity ride-sharing via dynamic trip-vehicle assignment, PNAS  
   https://pmc.ncbi.nlm.nih.gov/articles/PMC5255617/

2. FHWA — Analysis of Travel Choices and Scenarios for Sharing Rides  
   https://ops.fhwa.dot.gov/publications/fhwahop21011/ch2.htm

3. Erhardt et al. — Do transportation network companies decrease or increase congestion?, Science Advances  
   https://www.science.org/doi/10.1126/sciadv.aau2670

4. Wenzel et al. — Travel and energy implications of ridesourcing service in Austin, Texas  
   https://doi.org/10.1016/j.trd.2019.03.005

5. KAPSARC — Impacts of Ride-Hailing on Energy and the Environment: A Systematic Review  
   https://www.kapsarc.org/research/publications/impacts-of-ride-hailing-on-energy-and-the-environment-a-systematic-review/

6. Eclipse SUMO — Taxi / Demand Responsive Transport documentation  
   https://sumo.dlr.de/docs/Simulation/Taxi.html

7. Ke, Yang, Zhu — On Ride-Pooling and Traffic Congestion, Transportation Research Part B  
   https://doi.org/10.1016/j.trb.2020.10.003
