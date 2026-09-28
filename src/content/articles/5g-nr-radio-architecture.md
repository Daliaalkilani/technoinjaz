<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: كيف تعمل شبكات 5G تقنيًا؟ شرح 5G NR وOFDM وMIMO وFronthaul

Meta Description: دليل تقني لفهم ما يحدث داخل شبكة 5G: من 5G NR وOFDM وNumerology إلى MIMO وBeamforming والخفوت وFronthaul وبنية RU/DU/CU، مع تحديثات 5G-Advanced وRelease 19.

Suggested Slug: 5g-nr-radio-architecture

# كيف تعمل شبكات 5G تقنيًا؟ شرح 5G NR وOFDM وMIMO وFronthaul

**شبكة 5G ليست مجرد "4G أسرع".** الفرق الحقيقي يظهر في تصميم الواجهة الراديوية 5G NR، والمرونة في استخدام الطيف، وOFDM قابل للتكيّف، وMIMO وBeamforming، وتقسيم شبكة الوصول الراديوي إلى وظائف مثل RU وDU وCU، إضافة إلى Core جديد صُمم لخدمات أكثر تنوعًا.

لفهم 5G بصورة هندسية، من المفيد تفكيكها إلى سلسلة:

```text
User Equipment
      ↓
5G NR Radio Interface
      ↓
gNB / RAN
  ├── RU
  ├── DU
  └── CU
      ↓
5G Core
      ↓
Data Network / Edge / Cloud
```

هذا المقال يركز على **شبكة الوصول الراديوي والطبقة الفيزيائية** أكثر من التركيز على التطبيقات التجارية.

# ما الفرق بين 5G و5G NR؟

**5G** اسم المنظومة الكاملة.

أما **NR — New Radio** فهي الواجهة الراديوية التي طورتها 3GPP للجيل الخامس.

تصف مواصفات 3GPP سلسلة 38.xxx تفاصيل NR، ومنها:

- TS 38.211 للقنوات الفيزيائية والتعديل.
- TS 38.212 للMultiplexing وChannel Coding.
- TS 38.213 لإجراءات التحكم في الطبقة الفيزيائية.
- TS 38.214 لإجراءات نقل البيانات.
- TS 38.300 للوصف العام لـNR وNG-RAN.

إذًا عندما نتحدث عن:

- OFDM.
- Subcarrier spacing.
- Modulation.
- Beam management.
- MIMO.
- Physical channels.

فنحن غالبًا داخل عالم **5G NR**.

# ما المكونات الأساسية لشبكة 5G؟

يمكن تبسيطها إلى ثلاثة أجزاء.

## 1. UE — User Equipment

هو الجهاز المتصل بالشبكة، مثل:

- هاتف.
- مودم 5G.
- راوتر.
- جهاز صناعي.
- RedCap device.
- وحدة اتصال داخل مركبة.

## 2. NG-RAN

شبكة الوصول الراديوي.

العقدة الرئيسية تسمى **gNB**.

لكن gNB ليست دائمًا صندوقًا ماديًا واحدًا؛ يمكن تقسيم وظائفها إلى:

- RU — Radio Unit.
- DU — Distributed Unit.
- CU — Centralized Unit.

وهذا التقسيم مهم في الشبكات الحديثة وOpen RAN.

## 3. 5G Core — 5GC

يتعامل مع وظائف مثل:

- التسجيل والمصادقة.
- إدارة الجلسات.
- Mobility.
- Policy.
- توجيه حركة البيانات.
- Network slicing.
- الوصول إلى Data Networks.

المواصفة الأساسية لمعمارية 5GS هي **3GPP TS 23.501**، وما زالت تحت التطوير في Releases الحديثة.

# ما الفرق بين NSA وSA؟

## Non-Standalone — NSA

في مراحل النشر الأولى، استخدمت شبكات كثيرة 5G NR مع جزء من بنية LTE/EPC.

هذا سمح بإطلاق 5G بسرعة دون الانتقال الكامل إلى Core جديد.

## Standalone — SA

يستخدم:

- 5G NR.
- 5G Core.

وهنا تظهر قدرات 5G المعمارية بصورة أكثر اكتمالًا، مثل بعض أشكال:

- Network slicing.
- Service-based architecture.
- قدرات صناعية متقدمة.
- إدارة QoS أكثر مرونة.

لذلك وجود أيقونة "5G" على الهاتف لا يخبرك وحده عن نوع البنية المستخدمة.

# كيف تستخدم 5G الطيف؟

من الأخطاء الشائعة اختزال 5G في mmWave.

5G NR يمكن أن تعمل عبر نطاقات ترددية مختلفة.

عمليًا يمكن التفكير في:

## النطاقات المنخفضة

تعطي عادة:

- تغطية أفضل.
- اختراقًا أفضل نسبيًا.
- سعة أقل مقارنة بالنطاقات الأعلى.

## النطاقات المتوسطة

أصبحت من أهم طبقات 5G التجارية لأنها تقدم توازنًا بين:

- التغطية.
- عرض النطاق.
- السعة.

## الترددات العالية / FR2

تتيح قنوات أعرض وسعات كبيرة، لكن انتشار الإشارة يصبح أصعب وتزداد أهمية:

- Beamforming.
- كثافة المواقع.
- Line of sight.
- التعامل مع العوائق.

ومع توسع NR، امتدت المواصفات إلى ترددات أعلى حتى نطاقات تصل إلى 71 GHz في إصدارات 3GPP الحديثة.

# لماذا لا يمكن أن نربط التغطية باسم "5G" فقط؟

لأن خصائص الانتشار مرتبطة بالتردد والبيئة.

شبكة 5G منخفضة التردد قد تغطي مسافة كبيرة.

أما 5G على تردد مرتفع جدًا فقد:

- تضعف أسرع مع المسافة.
- تتأثر أكثر بالحواجز.
- تحتاج Beamforming.
- تحتاج خلايا أكثر كثافة.

لذلك عبارة:

> "5G مداها أقصر من 4G"

ليست صحيحة بصورة مطلقة.

وكذلك:

> "5G تغطي أكثر من 4G"

ليست صحيحة بصورة مطلقة.

السؤال الصحيح هو:

**أي Band، وبأي قدرة، وبأي هوائيات، وفي أي بيئة؟**

# ما OFDM؟ ولماذا تستخدمه 5G؟

OFDM اختصار لـ:

**Orthogonal Frequency Division Multiplexing**

الفكرة الأساسية هي تقسيم قناة واسعة إلى عدد كبير من الحوامل الفرعية Subcarriers المتعامدة.

بدل إرسال Stream واحد على حاملة واحدة واسعة، يُوزع الإرسال على Subcarriers متعددة.

هذا يساعد على التعامل بكفاءة مع:

- القنوات متعددة المسارات.
- الانتقائية الترددية.
- تخصيص الموارد.
- عرض النطاق الكبير.

5G NR تستخدم OFDM في الوصلة الهابطة، وتستخدم OFDM-based waveforms في الوصلة الصاعدة أيضًا.

لكن الابتكار المهم ليس "استخدام OFDM" وحده، لأن LTE تستخدم OFDM أيضًا.

الاختلاف المهم هو **المرونة الأكبر في Numerology**.

# ما هي Numerology في 5G NR؟

في LTE، كانت 15 kHz Subcarrier Spacing هي المرجع الأساسي.

أما NR فصُممت لتدعم قيمًا متعددة من Subcarrier Spacing.

في التصميم الأساسي لـNR:

```text
15 kHz
30 kHz
60 kHz
120 kHz
240 kHz
```

ومع توسعات لاحقة نحو نطاقات أعلى ظهرت خيارات إضافية لبعض السيناريوهات.

لماذا؟

لأن الشبكة التي تعمل على:

- تردد منخفض.
- خلية كبيرة.
- قنوات أضيق.

ليست لها المتطلبات نفسها التي تعمل عند ترددات عالية جدًا.

## Subcarrier spacing أصغر

يعني عادة Symbol duration أطول.

قد يكون مناسبًا أكثر لبعض نطاقات التردد المنخفضة.

## Subcarrier spacing أكبر

يعني Symbols أقصر.

يساعد في التعامل مع بعض خصائص الترددات الأعلى ومتطلبات زمنية مختلفة.

إذًا Numerology تمنح NR مرونة لاختيار بنية زمن/تردد مناسبة لحالة الاستخدام.

# ما Resource Block؟

لا تمنح الشبكة المستخدم "ترددًا كاملًا" بصورة ثابتة.

تُقسم الموارد إلى وحدات زمنية وترددية يمكن للScheduler تخصيصها.

Resource Block في NR يتكون من **12 Subcarriers** في المجال الترددي.

لكن عرضه بالهرتز يتغير مع Subcarrier Spacing.

مثلًا:

- عند 15 kHz يصبح عرض 12 subcarriers أقل.
- عند 30 أو 60 kHz يصبح أوسع.

وهذا جزء من مرونة NR.

# ماذا يفعل Cyclic Prefix؟

القنوات اللاسلكية ليست مسارًا مستقيمًا واحدًا.

الإشارة قد تصل عبر:

- مسار مباشر.
- انعكاس عن مبنى.
- انعكاس عن مركبة.
- تبعثر.
- مسارات متعددة.

فتصل نسخ متأخرة من الإشارة.

يضيف OFDM **Cyclic Prefix** للمساعدة على تقليل مشكلة Inter-Symbol Interference الناتجة عن Multipath ضمن حدود التصميم.

لكن Cyclic Prefix ليس حلًا سحريًا لكل مشكلة قناة؛ طول التأخير وخصائص البيئة يظلان مهمين.

# كيف تختار الشبكة Modulation وCoding؟

NR لا تستخدم مستوى Modulation واحدًا طوال الوقت.

بحسب جودة القناة يمكن اختيار Modulation/Coding أكثر أو أقل عدوانية.

أمثلة Modulation المستخدمة في NR تشمل:

- QPSK.
- 16QAM.
- 64QAM.
- 256QAM في السيناريوهات المدعومة.

وفي بعض أجزاء uplink توجد صيغ BPSK/π/2-BPSK محددة.

الفكرة:

## قناة جيدة

يمكن استخدام Modulation أعلى:

> Bits أكثر لكل Symbol.

## قناة سيئة

تخفض الشبكة Modulation أو تستخدم Coding أكثر تحفظًا.

هذا هو جوهر **Adaptive Modulation and Coding — AMC**.

# ما MCS؟

MCS اختصار لـ:

**Modulation and Coding Scheme**

وهو مؤشر يساعد على تحديد مزيج:

- Modulation order.
- Coding rate.

وفق ظروف القناة والإجراءات المعتمدة.

كلما ارتفعت جودة الإشارة، يمكن غالبًا اختيار MCS أعلى وتحقيق Throughput أكبر.

وعندما تضعف القناة، يخفض النظام MCS لتحسين احتمال الاستقبال الصحيح.

لكن القول إن النظام يصل إلى "معدل خطأ يقارب الصفر" تعميم غير صحيح؛ الهدف هو العمل ضمن Targets محددة مع آليات مثل:

- Coding.
- HARQ.
- Retransmission.
- Link adaptation.

# ما هو Channel Coding في 5G؟

استخدم LTE Turbo Codes بصورة مهمة.

أما 5G NR فاعتمد:

- **LDPC** لقنوات بيانات المستخدم بصورة رئيسية.
- **Polar Codes** لبعض قنوات التحكم.

هذه نقطة مهمة عند مقارنة LTE وNR.

لذلك لا ينبغي وصف Turbo Codes على أنها ترميز البيانات المركزي في 5G NR.

# لماذا القناة اللاسلكية صعبة؟

الإشارة أثناء انتقالها لا تواجه مجرد "مسافة".

هناك ثلاثة مفاهيم يجب الفصل بينها:

## 1. Path Loss

الانخفاض المتوسط في القدرة مع زيادة المسافة والبيئة والتردد.

## 2. Shadowing

تغير أبطأ في القدرة بسبب عوائق كبيرة مثل:

- مبنى.
- تل.
- جدار.

## 3. Small-scale Fading

تغيرات أسرع ناتجة عن تداخل نسخ الإشارة متعددة المسارات والحركة.

هذه الظواهر لا تعني الشيء نفسه.

# ما Multipath؟

تصل الإشارة إلى المستقبل عبر أكثر من مسار.

مثال:

```text
Base Station ───────→ UE
      ↘
       Building
          ↘
           UE
```

المساران:

- لهما طول مختلف.
- زمن وصول مختلف.
- Phase مختلف.

وعند المستقبل قد:

- يتعززان.
- أو يلغي أحدهما الآخر جزئيًا.

هذا هو أحد مصادر Fading.

# هل الانعكاس والانكسار والتبعثر هي كل القصة؟

هي آليات مهمة في الانتشار، لكن نمذجة القناة الحديثة تتضمن أكثر من قائمة ثلاثية بسيطة.

تعتمد القناة أيضًا على:

- Frequency.
- Doppler.
- Delay spread.
- زاوية الوصول.
- زاوية المغادرة.
- Line-of-sight / NLOS.
- Polarization.
- Mobility.
- بيئة حضرية أو داخلية أو ريفية.

لذلك تستخدم أنظمة 5G نماذج قناة أكثر تعقيدًا للاختبار والمحاكاة.

# ما Diversity؟

الفكرة هي إعطاء النظام أكثر من فرصة لاستقبال المعلومة عبر مسارات أو موارد غير متطابقة.

أنواعها تشمل:

## Time Diversity

إرسال Redundancy عبر أزمنة مختلفة.

## Frequency Diversity

استخدام ترددات أو Subcarriers مختلفة.

## Spatial Diversity

استخدام هوائيات متعددة أو مسارات Spatial مستقلة.

## Coding Diversity

استخدام Channel Coding لنشر المعلومات وإتاحة تصحيح الأخطاء.

لكن أنظمة 5G الحديثة لا تعتمد فقط على فكرة "نرسل نفس النسخة عدة مرات".

MIMO يمكن أن تستخدم المجال المكاني أيضًا **لزيادة السعة** وليس فقط للتنوع.

# ما MIMO؟

MIMO اختصار:

**Multiple Input Multiple Output**

يعني استخدام عدة هوائيات في طرف أو طرفي الاتصال.

لكن MIMO يمكن أن تحقق أهدافًا مختلفة.

## 1. Spatial Diversity

تحسين Reliability.

## 2. Spatial Multiplexing

إرسال Streams مختلفة بالتوازي لزيادة Data Rate.

## 3. Beamforming

تشكيل نمط الإشعاع لتوجيه الطاقة بصورة أفضل نحو اتجاه معين.

وهذا يختلف جذريًا عن التفسير المبسط:

> "MIMO ترسل نفس الإشارة عدة مرات حتى تصل واحدة."

هذا وصف لنمط Diversity فقط، وليس MIMO كلها.

# ما Massive MIMO؟

عندما تمتلك محطة القاعدة عددًا كبيرًا من عناصر الهوائي، يمكنها استغلال المجال المكاني بدرجة أكبر.

هذا يساعد على:

- تكوين Beams.
- خدمة مستخدمين متعددين.
- تحسين الكفاءة الطيفية.
- زيادة السعة.

لكن عدد العناصر الفيزيائية لا يساوي بالضرورة عدد Spatial Layers التي يحصل عليها كل مستخدم.

الأمر يعتمد على:

- القناة.
- الجهاز.
- عدد المستخدمين.
- التردد.
- تكوين الشبكة.

# ما Beamforming؟

بدل بث الطاقة بالتساوي في جميع الاتجاهات، يمكن لمصفوفة الهوائيات تشكيل نمط إشعاع يركز الإشارة.

في الترددات العالية، تصبح هذه القدرة مهمة لأن:

- Path loss أعلى.
- الهوائيات أصغر.
- يمكن بناء Arrays أكثر كثافة.

Beamforming لا يعني "شعاع ليزر" ثابتًا.

قد تتغير الـBeam مع:

- حركة المستخدم.
- الظروف.
- القياسات.
- إدارة Beam.

وفي Release 19 استمرت 3GPP بتطوير MIMO وBeam Management، بما في ذلك دعم **UE-initiated/event-driven beam management** في أعمال NR MIMO Phase 5.

# ما علاقة MIMO بالخـفوت؟

Multipath ليس دائمًا عدوًا.

إذا كانت المسارات Spatial مختلفة بما يكفي، يمكن لـMIMO استغلالها.

مثلًا:

- Diversity لتحسين الاعتمادية.
- Multiplexing لزيادة السعة.

أي أن البيئة متعددة المسارات التي تسبب Fading يمكن أيضًا أن تصبح موردًا مفيدًا لنظام MIMO عندما تكون القناة مناسبة.

# ما Maximal Ratio Combining — MRC؟

MRC طريقة Diversity Combining.

إذا استقبلنا نسخًا من الإشارة عبر عدة فروع:

```text
Branch 1
Branch 2
Branch 3
```

فلا نعطيها الوزن نفسه.

MRC تعطي Weight أكبر للفروع ذات جودة القناة الأفضل ثم تجمعها.

في نموذج مثالي مع معرفة القناة، يؤدي ذلك إلى تحسين SNR الناتج مقارنة بالاعتماد على فرع واحد.

لكن MRC مفهوم كلاسيكي للتنوع، ولا ينبغي تقديمه وكأنه الخوارزمية التي تشرح كل Receiver في 5G الحديثة.

مستقبلات NR تستخدم منظومة أوسع من:

- Channel estimation.
- Equalization.
- MIMO detection.
- Coding.
- HARQ.
- Beam processing.

# ما الفرق بين SNR وSINR؟

## SNR

Signal-to-Noise Ratio.

تقارن قدرة الإشارة بالضجيج.

## SINR

Signal-to-Interference-plus-Noise Ratio.

تضيف التداخل إلى الضجيج.

في شبكة خلوية حقيقية، SINR غالبًا أكثر دلالة لأن المستخدم قد يتأثر بـ:

- خلايا أخرى.
- مستخدمين.
- Beams.
- Inter-cell interference.

# لماذا سرعة 5G النظرية تختلف عن السرعة الفعلية؟

Throughput النهائي يتأثر بـ:

- Bandwidth.
- Modulation.
- Coding rate.
- عدد Spatial layers.
- Carrier aggregation.
- جودة القناة.
- Scheduler.
- عدد المستخدمين.
- TDD configuration.
- Protocol overhead.
- Core/backhaul.
- Server.
- الجهاز نفسه.

لذلك لا توجد معادلة:

> 5G = رقم سرعة واحد.

حتى على الشبكة نفسها، يمكن لمستخدمين في مكانين مختلفين رؤية نتائج مختلفة جدًا.

# ما Fronthaul؟

هذه نقطة تقنية مهمة في بنية RAN.

عندما نفصل وظائف محطة القاعدة، نحتاج وصلات بين الأجزاء.

بصورة مبسطة:

```text
Radio Unit
   ↓
Fronthaul
   ↓
Distributed Unit
   ↓
Midhaul
   ↓
Centralized Unit
   ↓
Backhaul
   ↓
5G Core
```

المصطلحات والتقسيمات تختلف حسب Architecture، لكن الفكرة هي أن **Fronthaul أقرب إلى الراديو**.

# هل ما زال نموذج RRH + BBU كافيًا لشرح 5G؟

هو مفيد تاريخيًا، لكنه لم يعد كافيًا وحده.

التصميم الحديث يتحدث أكثر عن:

- RU.
- DU.
- CU.
- Functional splits.
- Virtualized RAN.
- Open RAN.

لذلك ينبغي عدم اختزال Fronthaul اليوم بأنه مجرد:

> RRH ↔ BBU

فقط.

# ما IEEE 1914.1 و1914.3؟

**IEEE 1914.1-2019** يحدد معمارية ومتطلبات Packet-based fronthaul transport networks، بما في ذلك متطلبات:

- Data rate.
- Timing.
- Synchronization.
- QoS.
- Functional partitioning.

أما **IEEE 1914.3-2023** فهو الإصدار النشط الحالي لمعيار Radio over Ethernet Encapsulations and Mappings، وقد حل محل إصدار 2018.

الإصدار الحديث يغطي نقل Radio protocols عبر:

- Ethernet frames.
- IP packets.

ويتضمن آليات لإدارة mapping/demapping وOAM.

هذه نقطة تحديث مهمة مقارنة بمراجع تعتمد فقط على IEEE 1914.3-2018.

# أين يدخل O-RAN؟

O-RAN لا يساوي 5G ولا يحل محل 3GPP.

3GPP تحدد الكثير من وظائف وبروتوكولات الشبكة الخلوية.

أما O-RAN Alliance فتطور مواصفات للواجهات المفتوحة والافتراضية والذكية في RAN.

من أشهر الأمثلة:

**Open Fronthaul بين O-RU وO-DU باستخدام Lower Layer Split Option 7.2x.**

وفي 2026 واصلت O-RAN تحديث مواصفات واختبارات التوافق لهذه الواجهة.

الهدف هو تحسين:

- Interoperability.
- تعدد الموردين.
- إدارة RAN.
- Testing.

لكن "Open" لا يعني أن جميع مكونات كل مورد تتكامل بلا اختبار؛ Conformance وInteroperability Testing يظلان أساسيين.

# ما الفرق بين Fronthaul وBackhaul؟

## Fronthaul

يربط أجزاء RAN القريبة من الراديو.

قد تكون متطلباته شديدة في:

- Latency.
- Synchronization.
- Jitter.
- Throughput.

## Backhaul

يربط RAN بالشبكة الأساسية أو شبكات التجميع.

غالبًا تكون له متطلبات مختلفة.

بسبب Massive MIMO والقنوات الواسعة، قد يصبح Fronthaul تحديًا كبيرًا إذا نُقلت كميات ضخمة من I/Q الخام.

لهذا ظهرت Functional Splits لتوزيع المعالجة بصورة أكثر عملية.

# لماذا Timing وSynchronization مهمان؟

الشبكة الراديوية تعتمد على توقيت دقيق.

خصوصًا في:

- TDD.
- Coordinated transmission.
- Industrial time-sensitive networking.
- بعض أشكال MIMO.
- Distributed radio systems.

لذلك ليست Bandwidth هي المقياس الوحيد لجودة Fronthaul.

قد يكون لديك رابط سريع جدًا لكنه غير مناسب إذا لم يحقق متطلبات:

- Latency.
- Jitter.
- Timing.
- Synchronization.

# كيف ترتبط 5G التقنية بإنترنت الأشياء؟

ليس عبر "السرعة فقط".

خصائص RAN المختلفة تخدم أجهزة مختلفة.

## حساس بسيط

قد يستخدم:

- NB-IoT.
- LTE-M.

ولا يحتاج Full NR high throughput.

## RedCap

يخفض تعقيد 5G لبعض الأجهزة التي تقع بين LPWA و5G كامل القدرات.

## كاميرا صناعية

تستفيد من:

- Bandwidth.
- Edge.
- QoS.
- Private 5G.

## روبوت أو AGV

قد يهتم أكثر بـ:

- Reliability.
- Latency.
- Mobility.
- handover.
- deterministic behavior.

لذلك يجب فصل مقال "كيف تعمل 5G تقنيًا" عن مقال "متى تحتاج IoT إلى 5G".

# ما 5G-Advanced؟

تطلق الصناعة اسم **5G-Advanced** على المرحلة التطورية التالية من 5G، ويمثل **3GPP Release 18** أول Release ضمن هذه المرحلة.

تطورت معها مجالات مثل:

- MIMO.
- Positioning.
- Energy efficiency.
- RedCap.
- XR.
- AI/ML support.
- NTN.
- Industrial capabilities.

## ماذا عن Release 19؟

وفق بوابة 3GPP الحالية:

- Release 18: Frozen.
- Release 19: Frozen منذ ديسمبر 2025.
- Release 20: Open في 2026.
- Release 21: Open.

وتتضمن Release 19 تطورات إضافية في NR، ومنها استمرار تطوير:

- MIMO.
- Beam management.
- mobility.
- duplexing.
- power saving.

لذلك "5G" في 2026 ليست مواصفة ثابتة توقفت عند Release 15.

# هل 6G حلّت محل 5G؟

لا.

في 2026، 6G/IMT-2030 ما تزال في مرحلة:

- المتطلبات.
- التقييس.
- الدراسات.
- تقييم التقنيات المرشحة.

بينما 5G و5G-Advanced هما النظام التجاري الجاري تطويره ونشره.

# أخطاء شائعة في شرح 5G

## "5G = mmWave"

خطأ. 5G تعمل في نطاقات عديدة.

## "5G أسرع 100 مرة دائمًا"

خطأ. Peak capability لا تساوي تجربة المستخدم.

## "MIMO ترسل نسخة احتياطية من الإشارة فقط"

ناقص. MIMO تستخدم أيضًا Spatial Multiplexing وBeamforming.

## "5G تغطي مسافة أكبر دائمًا"

خطأ. التغطية تعتمد على Band والبيئة.

## "Fronthaul = كابل بين RRH وBBU"

شرح تاريخي مبسط جدًا للبنية الحديثة.

## "كل IoT يحتاج 5G"

خطأ. Connectivity يجب أن تتبع متطلبات الجهاز.

## "1 ms هو Ping الطبيعي في 5G"

خطأ. الأرقام المعيارية ترتبط بسيناريوهات وطبقات محددة، وليست ضمانًا لأي تطبيق End-to-end.

## "Turbo Coding هو أساس 5G"

غير دقيق. NR تعتمد LDPC لبيانات المستخدم وPolar Codes لقنوات تحكم محددة.

# إطار عملي لفهم أداء وصلة 5G

عند تحليل شبكة لا تسأل عن "قوة الإشارة" فقط.

افحص:

```text
Frequency band
Channel bandwidth
Subcarrier spacing
RSRP
RSRQ
SINR
MCS
Number of MIMO layers
Beam state
Scheduler load
TDD pattern
Latency
Packet loss
Backhaul
Core path
Server location
```

قد يملك المستخدم RSRP جيدًا لكن Throughput ضعيفًا بسبب:

- SINR منخفض.
- ازدحام.
- Bandwidth قليل.
- Scheduler load.
- Backhaul.

وقد يملك RSRP أضعف نسبيًا مع Throughput جيد إذا كانت:

- SINR جيدة.
- القناة واسعة.
- MIMO layers متاحة.
- الشبكة غير مزدحمة.

# الخلاصة

شبكات 5G ليست تقنية واحدة؛ هي مجموعة طبقات تعمل معًا.

في الراديو:

- NR.
- OFDM.
- Flexible numerology.
- Adaptive modulation and coding.
- LDPC/Polar coding.
- MIMO.
- Beamforming.
- Channel estimation.

وفي شبكة الوصول:

- gNB.
- RU.
- DU.
- CU.
- Fronthaul.
- Synchronization.
- Open interfaces.

وفي الخلف:

- 5G Core.
- QoS.
- Edge.
- Service architecture.

وعندما تتغير القناة، تعمل كل هذه الطبقات معًا للتعامل مع:

- Path loss.
- Shadowing.
- Multipath.
- Fading.
- Interference.
- Mobility.

ولهذا لا يمكن تفسير أداء 5G برقم واحد مثل "10 Gbps" أو "1 ms".

الفهم الحقيقي يبدأ من:

> **الطيف + القناة + الطبقة الفيزيائية + الهوائيات + المعمارية + الحمل + مسار البيانات كاملًا.**

## الأسئلة الشائعة

### ما معنى 5G NR؟

NR اختصار New Radio، وهي الواجهة الراديوية التي طورتها 3GPP للجيل الخامس.

### هل 5G تستخدم OFDM؟

نعم. NR تستخدم OFDM-based waveforms، مع مرونة في Subcarrier Spacing أكبر من LTE.

### ما فائدة Numerology؟

تسمح بتغيير Subcarrier Spacing والبنية الزمنية بما يناسب نطاقات ترددية وحالات استخدام مختلفة.

### ما الفرق بين MIMO وBeamforming؟

MIMO مفهوم أوسع لاستخدام عدة هوائيات/قنوات مكانية، ويمكن أن تستخدم للتنوع أو Spatial Multiplexing. Beamforming تقنية لتشكيل اتجاه الإشعاع وهي إحدى القدرات المرتبطة بأنظمة الهوائيات المتعددة.

### ما الفرق بين Path Loss وFading؟

Path Loss انخفاض متوسط في القدرة مع المسافة والبيئة، بينما Fading تغير أسرع في الإشارة بسبب Multipath والحركة والتداخل الطوري.

### ما الفرق بين RU وDU وCU؟

هي تقسيمات وظيفية داخل RAN: RU أقرب إلى الراديو والهوائيات، DU تنفذ وظائف موزعة منخفضة/متوسطة المستوى، وCU تنفذ وظائف مركزية أعلى.

### ما Fronthaul؟

هو جزء النقل بين وظائف RAN القريبة من الراديو، مثل O-RU وO-DU في بعض التصاميم الحديثة.

### هل O-RAN هي نفسها 5G؟

لا. O-RAN تطور واجهات ومعماريات مفتوحة لـRAN، بينما 3GPP تحدد مواصفات أساسية لنظام 5G وNR.

### هل كل 5G هي mmWave؟

لا. معظم شبكات 5G تستخدم أيضًا نطاقات منخفضة ومتوسطة، وليس mmWave فقط.

### هل سرعة 5G تعتمد على MIMO فقط؟

لا. تعتمد على Bandwidth وSpectrum وMCS وMIMO layers والقناة والحمل والScheduler والبنية الخلفية وعوامل أخرى.

### ما 5G-Advanced؟

هي المرحلة التالية من تطور 5G، ويعد Release 18 أول Release ضمنها، مع تحسينات مستمرة في Releases اللاحقة.

## المصادر والمراجع

1. 3GPP — TS 38.211: NR; Physical channels and modulation  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3213

2. 3GPP — TS 38.214: NR; Physical layer procedures for data  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3216

3. 3GPP — TS 38.300: NR and NG-RAN Overall Description  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3191

4. 3GPP — TS 23.501: System architecture for the 5G System  
   https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=3144

5. 3GPP — Release status  
   https://portal.3gpp.org/Releases.aspx

6. IEEE — IEEE 1914.1-2019: Packet-based Fronthaul Transport Networks  
   https://standards.ieee.org/standard/1914_1-2019.html

7. IEEE — IEEE 1914.3-2023: Radio over Ethernet Encapsulations and Mappings  
   https://standards.ieee.org/ieee/1914.3/10629/

8. O-RAN Alliance — Specifications  
   https://www.o-ran.org/specifications

9. O-RAN Alliance — 2026 technical document updates / Open Fronthaul 7.2x  
   https://www.o-ran.org/blog/59-new-or-updated-o-ran-technical-documents-released-since-march-2026

10. ITU — IMT-2020  
    https://www.itu.int/en/itu-r/study-groups/rsg5/rwp5d/imt-2020/pages/default.aspx

## مقالات ودراسات ذات صلة في منصة تكنو إنجاز

- [كيف تؤثر شبكات 5G في إنترنت الأشياء؟ السرعة والزمن والتوسع و5G-Advanced](/articles/5g-iot)
- [ما هو إنترنت الأشياء (IoT)؟ البنية والبروتوكولات والتطبيقات والأمان](/articles/internet-of-things-iot)
- [UART أم I2C أم SPI أم RS-232؟ دليل اختيار بروتوكول الاتصال للنظم المدمجة](/articles/embedded-serial-protocols)

