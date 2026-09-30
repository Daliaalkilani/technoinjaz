<!--
FILE: 02-article.md
PURPOSE: Published article content
VERIFICATION DATE: 2026-09-21
-->

SEO Title: UART أم I2C أم SPI أم RS-232؟ دليل اختيار بروتوكول الاتصال للنظم المدمجة

Meta Description: مقارنة عملية بين UART وI2C وSPI وRS-232 في الأنظمة المدمجة: الأسلاك، السرعة، التزامن، العنونة، المسافة، الجهد، الأخطاء، وأفضل استخدام لكل واجهة، مع تحديث I3C.

Suggested Slug: embedded-serial-protocols

# UART أم I2C أم SPI أم RS-232؟ دليل اختيار بروتوكول الاتصال للنظم المدمجة

**لا يوجد بروتوكول اتصال واحد هو الأفضل لكل نظام مدمج.**  
الاختيار الصحيح يعتمد على سؤال أبسط بكثير:

> ما الذي تريد توصيله، وعلى أي مسافة، وبأي سرعة، وكم جهازًا، وبأي جهد كهربائي وقيود PCB؟

في مشروع واحد قد نجد:

- UART للتصحيح وConsole.
- I²C للحساسات.
- SPI لذاكرة Flash أو شاشة.
- RS‑232 للاتصال مع جهاز صناعي أو حاسب قديم.

المشكلة أن هذه الأسماء تُستخدم أحيانًا كأنها تقنيات متكافئة تمامًا، بينما هي ليست في المستوى نفسه.

أهم مثال:

> **UART ليست RS‑232.**

UART تصف آلية إرسال واستقبال تسلسلية غير متزامنة داخل المتحكم أو المعالج، بينما RS‑232 معيار واجهة كهربائية ووظيفية يستخدم مستويات جهد مختلفة عن GPIO/UART المنطقية ويحتاج عادةً إلى Transceiver.

لذلك يمكن أن يكون لدينا:

```text
MCU UART
   ↓ 3.3 V logic
RS-232 Transceiver
   ↓ ± voltage signaling
RS-232 cable
```

# ما المقصود ببروتوكول اتصال في النظام المدمج؟

داخل النظام المدمج نحتاج إلى اتفاق بين جهازين أو أكثر حول كيفية تبادل البيانات.

قد يتضمن هذا الاتفاق:

- شكل الإشارة الكهربائية.
- متى تُقرأ البتات.
- وجود Clock أو عدمه.
- ترتيب البتات.
- طريقة اختيار الجهاز.
- العنونة.
- ACK/NACK.
- كشف الأخطاء.
- Flow control.
- شكل Frame.

لكن ليست كل واجهة تحدد كل هذه الطبقات.

مثلًا:

- **I²C** تحدد Bus ثنائي الأسلاك مع Clock وعناوين وACK/Arbitration.
- **SPI** تصف Bus متزامنة عالية البساطة، لكن كثيرًا من تفاصيل أوامر الجهاز نفسها تأتي من Datasheet الخاصة به.
- **UART** توفر Framing غير متزامن، لكن لا تحدد وحدها جهد الخط أو Connector.
- **RS‑232** تحدد خصائص كهربائية ووظيفية للواجهة فوق رابط تسلسلي.

ولهذا فإن مقارنة الأسماء فقط من دون فهم طبقة كل واحدة قد تؤدي إلى تصميم خاطئ.

# قبل المقارنة: Serial لا تعني دائمًا الشيء نفسه

"Serial Communication" تعني أن البتات تنتقل تباعًا عبر خط أو عدد صغير من الخطوط بدل إرسال عدد كبير من البتات بالتوازي.

لكن Serial interfaces تختلف جذريًا.

## اتصال غير متزامن

لا يوجد Clock line مشتركة.

مثال:

**UART**

الطرفان يتفقان مسبقًا على Baud Rate وشكل Frame.

## اتصال متزامن

يوجد Clock تقود توقيت النقل.

أمثلة:

- SPI.
- I²C.

وجود Clock يبسط تحديد لحظة أخذ العينة، لكنه يضيف قيود Signal Integrity عند ارتفاع السرعة أو المسافة.

# جدول سريع: UART vs I²C vs SPI vs RS-232

| الخاصية | UART | I²C | SPI | RS‑232 |
|---|---|---|---|---|
| التزامن | غير متزامن | متزامن | متزامن | غالبًا يحمل UART/serial async |
| Clock line | لا | نعم SCL | نعم SCK | لا كخط بيانات أساسي |
| خطوط البيانات الأساسية | TX + RX | SDA + SCL | SCK + data + CS | TX/RX + GND، وقد توجد Handshake lines |
| Duplex | Full duplex عادةً | Half-duplex منطقيًا على SDA ثنائي الاتجاه | Full duplex عادةً | Full duplex ممكن |
| العنونة | لا | نعم | لا توجد عنونة Bus موحدة؛ CS يختار الجهاز غالبًا | Point-to-point |
| عدة أجهزة | يحتاج تصميمًا إضافيًا | طبيعي | ممكن مع CS إضافية/طرق أخرى | لا على الخط نفسه عادةً |
| السرعة | تعتمد على Hardware/Clock | أوضاع معيارية حتى عدة Mbit/s | لا يوجد حد عالمي موحد؛ يعتمد على الأجهزة | أقل عادةً من واجهات PCB المحلية |
| الاستخدام المعتاد | Debug، modules، MCU↔MCU | Sensors/ICs متعددة | Flash، ADC، Displays | أجهزة صناعية/Legacy/PC interfaces |
| مسافة PCB | جيدة عند السرعات المناسبة | قصيرة غالبًا بسبب السعة | قصيرة غالبًا | مصمم أكثر للكابلات |
| مستوى الإشارة | CMOS/TTL حسب الجهاز | CMOS/open-drain | CMOS/push-pull غالبًا | مستويات RS‑232 موجبة/سالبة |
| Pull-ups | لا عادةً | نعم | لا عادةً | لا |
| Clock polarity/phase | لا | لا بالشكل نفسه | CPOL/CPHA مهمان | لا |

هذه مقارنة مفاهيمية. لا تستخدم أرقام "حد أقصى" عامة من جدول إنترنت بدل Datasheet الخاصة بالمتحكم والطرفية واللوحة والكابل.

# UART: أبسط طريق بين جهازين

UART اختصار:

**Universal Asynchronous Receiver/Transmitter**

وهي وحدة Hardware موجودة في كثير من المتحكمات والمعالجات.

في أبسط صورة نحتاج:

```text
Device A TX → Device B RX
Device A RX ← Device B TX
GND ↔ GND
```

لا يوجد Clock line.

كيف يعرف المستقبل توقيت كل Bit؟

الطرفان يتفقان على Baud Rate.

مثل:

```text
9600
115200
1000000
```

إذا كان Hardware يدعمها ضمن Error tolerance المناسبة.

# كيف يبدو UART Frame؟

أحد أشهر الإعدادات:

```text
115200 8N1
```

يعني:

- 115200 baud.
- 8 Data bits.
- No parity.
- 1 Stop bit.

Frame مبسطة:

```text
Idle
  ↓
Start
D0 D1 D2 D3 D4 D5 D6 D7
Stop
```

ويمكن إضافة Parity في إعدادات أخرى.

# ما دور Start وStop Bits؟

لأن الطرفين لا يملكان Clock مشتركة على السلك، يحتاج المستقبل إلى اكتشاف بداية الحرف ثم أخذ Samples وفق Baud Rate المتفق عليها.

Start bit تحدد بداية Frame.

Stop bit تعطي نهاية/فترة Idle مطلوبة قبل Frame التالية.

إذا اختلف Clock الطرفين أكثر مما يسمح به Receiver، يمكن أن تظهر:

- Framing errors.
- corrupted bytes.

# ما Parity؟ وما الذي لا تفعله؟

Parity تضيف Bit يمكن استخدامها لاكتشاف بعض أخطاء النقل.

مثل:

- Even parity.
- Odd parity.

لكن العبارة:

> "Parity تضمن عدم ضياع المعلومات"

غير صحيحة.

Parity قد تكشف بعض أنماط الأخطاء فقط.

لا توفر:

- تصحيح الخطأ.
- ضمان وصول الرسالة.
- كشف جميع الأخطاء متعددة البتات.
- Retransmission.

إذا كانت سلامة الرسائل مهمة، يمكن إضافة Protocol أعلى يحتوي:

- CRC.
- sequence number.
- ACK.
- timeout.
- retry.

# Baud Rate أم Bit Rate؟

المصطلحان ليسا مترادفين في الاتصالات عمومًا.

**Baud** = عدد الرموز Symbols في الثانية.

**Bit rate** = عدد البتات في الثانية.

في UART التقليدية التي يمثل فيها كل Symbol قيمة Bit واحدة، غالبًا يكون الرقم العددي متساويًا تقريبًا:

```text
115200 baud ≈ 115200 line bits/s
```

لكن Payload الفعلية أقل لأن Frame تحتوي Start/Stop/Parity.

في 8N1:

```text
1 start + 8 data + 1 stop = 10 bits
```

لذلك 115200 baud تعطي نظريًا نحو:

```text
11520 bytes/s
```

قبل أي بروتوكول إضافي.

# هل UART لها حد أقصى 115200؟

لا.

115200 قيمة شائعة تاريخيًا، وليست Maximum عالميًا للـUART.

بعض المتحكمات تدعم سرعات أعلى بكثير، حسب:

- Peripheral clock.
- Baud-rate divider.
- oversampling.
- Clock accuracy.
- PCB.
- الطرف الآخر.

لهذا لا تكتب في التصميم:

> UART = 115.2 kbps max.

اقرأ Datasheet للطرفين.

# UART ليست دائمًا TTL 5V

من الأخطاء الشائعة:

> UART = TTL.

الأصح:

UART peripheral قد تعمل على I/O voltage الخاصة بالشريحة، مثل:

- 1.8 V.
- 3.3 V.
- 5 V.

ولا يجوز وصل 5 V UART مباشرة إلى Input غير 5V-tolerant.

تحقق من:

- VIH.
- VIL.
- VOH.
- VOL.
- Absolute Maximum Ratings.

وقد تحتاج:

**Level Shifter**

بين جهدين مختلفين.

# لماذا UART ممتازة للـDebug؟

لأنها:

- بسيطة.
- لا تحتاج Clock.
- سهلة مع USB-to-UART adapter.
- مناسبة لـConsole logs.
- يمكن مراقبتها بمنطق Analyzer بسهولة.

مثال:

```text
MCU UART
   ↓
USB-UART Bridge
   ↓
Laptop Terminal
```

ولهذا تبقى من أول الواجهات التي يستخدمها مهندس Firmware عند Bring-up للوحة.

# متى لا تكون UART مناسبة؟

عندما تحتاج:

- عدة أجهزة على نفس Bus بلا Hardware إضافي.
- Bandwidth مرتفع جدًا بين ICs.
- Clocked deterministic transfers.
- عنونة مدمجة.

هنا غالبًا ننظر إلى I²C أو SPI أو غيرهما.

# RS‑232: ليست UART بجهد أعلى فقط

RS‑232 معيار تاريخي للاتصال التسلسلي Point-to-Point.

السبب في استمرار الخلط:

كثير من الأنظمة تستخدم:

```text
UART frames
   ↓
RS-232 electrical transceiver
```

لكن الفصل بينهما مهم.

## UART side

قد تكون:

```text
0 V / 3.3 V
```

## RS‑232 side

تستخدم مستويات موجبة وسالبة، مع عكس دلالة المنطق مقارنة بكثير من UART logic.

بحسب شروحات RS‑232 القياسية:

- Logic 1 / Mark يكون بجهد سالب.
- Logic 0 / Space يكون بجهد موجب.
- توجد منطقة غير معرفة حول الصفر في Receiver thresholds.

لهذا **لا تصل UART pin مباشرة إلى RS‑232 connector**.

قد يؤدي جهد RS‑232 إلى إتلاف GPIO.

# ما وظيفة MAX232-class Transceiver؟

يقوم بوظيفتين أساسيتين:

1. تحويل مستويات الجهد.
2. عكس الإشارة حسب الحاجة.

الصورة:

```text
MCU UART 3.3/5V
      ↓
 RS-232 Transceiver
      ↓
 RS-232 Cable
```

بعض Transceivers تحتوي Charge Pump لتوليد الفولتية المطلوبة من Supply واحدة منخفضة.

# هل RS‑232 تحتاج DB‑25؟

لا.

التاريخ يتضمن DB‑25، لكن DB‑9 شائع جدًا، وقد تستخدم المنتجات Connectors أخرى أيضًا.

المعيار أوسع من شكل Connector واحد في كل تطبيق.

وفي أبسط اتصال قد نستخدم:

```text
TX
RX
GND
```

بينما تطبيقات أخرى تستخدم Hardware Flow Control مثل:

- RTS.
- CTS.

# DTE وDCE: لماذا تظهر هذه المصطلحات؟

RS‑232 طورت أصلًا لربط:

- DTE — Data Terminal Equipment.
- DCE — Data Communication Equipment.

مثل Terminal/Computer مع Modem.

هذا يؤثر تاريخيًا في اتجاه Pins.

لكن في الأنظمة المدمجة الحديثة قد يكون كل ما يهمك عمليًا:

- من يرسل على أي Pin؟
- ما Connector pinout؟
- هل نحتاج Null-modem/crossover؟
- هل توجد RTS/CTS؟

لا تعتمد على تسمية "TX" وحدها قبل مراجعة Pinout.

# RTS وCTS

في Hardware Flow Control التقليدي:

- RTS = Request To Send.
- CTS = Clear To Send.

لكن تنفيذ Handshake ووظيفة Pins قد تختلف بين Hardware وDrivers والأنماط الحديثة.

لذلك لا تبنِ دائرة من رسم عام فقط.

اقرأ:

- MCU UART manual.
- Transceiver datasheet.
- الطرف المقابل.
- Operating-system serial settings.

# هل طول RS‑232 ثابت عند 15 مترًا؟

ليست قاعدة صلبة.

المواصفات الحديثة تاريخيًا انتقلت من Length ثابت إلى قيود كهربائية مثل Capacitance.

المسافة الفعلية تعتمد على:

- cable capacitance.
- data rate.
- noise.
- grounding.
- transceiver.
- environment.

القاعدة الهندسية:

> كلما زادت المسافة أو البيئة الصناعية والضوضاء، فكر أيضًا في واجهات Differential مثل RS‑485 أو CAN بدل دفع RS‑232 خارج ظروفها.

# I²C: جهازان فقط من الأسلاك، وعدة أجهزة على Bus

I²C اختصار:

**Inter-Integrated Circuit**

طورتها Philips Semiconductors، المعروفة اليوم بـNXP.

تستخدم خطين:

```text
SDA = Serial Data
SCL = Serial Clock
```

الميزة الأساسية:

> عدة Targets يمكن أن تشترك على Bus نفسها عبر Addresses.

مثال:

```text
MCU Controller
  │
  ├── Temperature Sensor 0x48
  ├── EEPROM             0x50
  ├── RTC                0x68
  └── IMU                0x6A
```

بخطوط SDA/SCL مشتركة.

# لماذا I²C تحتاج Pull-up Resistors؟

خطوط I²C تعمل تقليديًا بأسلوب:

**Open-drain / open-collector behavior**

الجهاز يسحب الخط إلى LOW، لكنه لا يدفعه HIGH بالطريقة المعتادة.

Pull-up resistor ترفع الخط إلى HIGH عندما لا يسحبه أي جهاز.

مفهوميًا:

```text
VDD
 |
Rpullup
 |
SDA -------- devices
```

وهذا يسمح لعدة أجهزة بمشاركة الخط دون صراع Push-pull مباشر.

# هل اختيار Pull-up مجرد "4.7 kΩ دائمًا"؟

لا.

القيمة تعتمد على:

- Bus capacitance.
- Supply voltage.
- سرعة I²C.
- Rise-time requirement.
- sink-current capability.

4.7 kΩ شائعة في أمثلة كثيرة، لكنها ليست قانونًا.

إذا كانت Resistance كبيرة جدًا:

- Rise time تصبح بطيئة.

إذا كانت صغيرة جدًا:

- يزيد Current عند LOW.
- قد يتجاوز الجهاز قدرة السحب.

# ما سرعات I²C الحالية؟

وفق مواصفة NXP UM10204 Rev. 7:

### Standard-mode

حتى:

**100 kbit/s**

### Fast-mode

حتى:

**400 kbit/s**

### Fast-mode Plus

حتى:

**1 Mbit/s**

### High-speed mode

حتى:

**3.4 Mbit/s**

كما تعرف المواصفة Ultra Fast-mode أحادي الاتجاه حتى 5 Mbit/s، وهو نمط مختلف وليس بديلًا شائعًا للاستخدام التقليدي ثنائي الاتجاه.

لذلك الجدول القديم:

> I²C = 400 kbps max

غير صحيح كقاعدة عامة.

# كيف تبدأ I²C Transaction؟

في نموذج بسيط:

```text
START
Address + R/W
ACK
Data
ACK
Data
ACK
STOP
```

هناك أيضًا:

- Repeated START.
- NACK.
- 7-bit addressing.
- 10-bit addressing.
- multi-controller arbitration.
- Clock stretching في السيناريوهات المدعومة.

# هل عنوان I²C "تعينه Philips لكل جهاز"؟

لا بهذه الصورة.

عنوان الجهاز قد يكون:

- ثابتًا في Datasheet.
- قابلًا للتغيير عبر Pins.
- قابلًا للتهيئة برمجيًا.
- ضمن Range محددة.

وهناك Addresses محجوزة لأغراض خاصة.

لذلك عند اختيار عدة Sensors من النوع نفسه، انتبه:

> هل تستطيع تغيير العنوان؟

إذا كان لدى ثلاثة Sensors العنوان نفسه ولا يمكن تغييره، قد تحتاج:

- I²C multiplexer.
- Bus switch.
- عدة Controllers.
- Interface أخرى.

# ما ACK وNACK؟

بعد Byte معينة، توجد مرحلة Acknowledge.

تساعد في معرفة ما إذا كان الطرف المقابل استجاب.

لكن ACK ليست:

- CRC.
- ضمانًا لسلامة Payload بالكامل.
- Authentication.
- End-to-end confirmation.

إذا كان الجهاز حساسًا للأخطاء، راجع ما إذا كان Device protocol نفسه يوفر:

- checksum.
- PEC.
- CRC.

# Multi-controller وArbitration

I²C ليست محصورة بمتحكم واحد نظريًا.

المواصفة تدعم Multi-controller وتستخدم Arbitration لمنع تلف البيانات عندما يحاول أكثر من Controller البدء في الوقت نفسه.

لكن ليس كل MCU driver أو RTOS stack يتعامل بسهولة مع كل سيناريو Multi-controller.

دعم المعيار ≠ سهولة التنفيذ في Platform الخاصة بك.

# Clock Stretching

بعض Targets قد تبقي SCL منخفضة لإبطاء Controller عندما تحتاج وقتًا إضافيًا.

لكن عمليًا:

- ليس كل Controller implementation يتعامل معه بالطريقة نفسها.
- بعض الأنظمة تضع Timeouts.
- بعض الأجهزة لا تستخدمه.

راجع Datasheet بدل افتراض السلوك.

# لماذا طول I²C محدود عمليًا؟

ليس هناك "1 متر" يصلح كقاعدة لكل I²C.

التحدي الأساسي هو:

- Bus capacitance.
- rise time.
- noise.
- pull-up.
- topology.
- speed.

I²C صممت أساسًا للاتصال بين ICs داخل جهاز/لوحة.

إذا أخذتها عبر Cable طويلة، قد تعمل في بعض الظروف بسرعات منخفضة وتصميم جيد، لكنها تصبح أكثر حساسية.

للكابلات الصناعية الطويلة، غالبًا توجد حلول أنسب.

# SPI: سرعة وبساطة على حساب Pins أكثر

SPI اختصار:

**Serial Peripheral Interface**

هي Bus متزامنة تستخدم غالبًا:

```text
SCK
MOSI / SDO
MISO / SDI
CS / SS
```

في التسمية التقليدية:

- MOSI = Master Out Slave In.
- MISO = Master In Slave Out.

تتبنى بعض الوثائق الحديثة أسماء وظيفية مثل:

- Host / Controller.
- Target / Peripheral.
- SDO / SDI.

الفكرة واحدة: هناك Clock وخط إرسال وخط استقبال واختيار Device.

# لماذا SPI سريعة؟

بعكس I²C التقليدية:

- الخطوط غالبًا Push-pull.
- يوجد Data line مستقلة لكل اتجاه.
- لا توجد Address phase موحدة لكل Byte.
- Protocol overhead منخفض.

لذلك هي ممتازة لمكونات تحتاج Throughput أعلى مثل:

- SPI NOR Flash.
- Displays.
- ADC/DAC.
- High-rate sensors.
- FPGAs/peripherals.

# هل SPI لها سرعة قصوى 10 MHz؟

لا.

لا توجد قيمة Universal واحدة للـSPI.

يمكن أن تعمل بعض الأجهزة عند:

- 1 MHz.
- 10 MHz.
- عشرات MHz.
- أكثر حسب Device/Mode/PCB.

الحد الحقيقي يأتي من:

- Controller.
- Target.
- setup/hold timing.
- trace length.
- loading.
- voltage.
- signal integrity.
- board layout.

قاعدة مهمة:

> سرعة SPI يحددها أبطأ عنصر في الرابط وتوقيت اللوحة، لا اسم SPI نفسه.

# SPI Full Duplex

لوجود خطين منفصلين:

```text
Controller → Target
Controller ← Target
```

يمكن نقل Bits في الاتجاهين في Clock cycle نفسها.

لكن هذا لا يعني أن Application-level protocol يستفيد دائمًا من Full Duplex.

كثير من Chips تستخدم Transaction مثل:

```text
send command/address
then receive data
```

فتكون Full Duplex كهربائيًا، لكن الاستخدام الفعلي قد يبدو Half-duplex منطقيًا.

# عدة Targets على SPI

المصدر القديم قد يصف SPI بأنها Point-to-Point.

لكن من الشائع جدًا وجود:

```text
SCK  مشتركة
MOSI مشتركة
MISO مشتركة

CS0 → Flash
CS1 → ADC
CS2 → Display
```

إذًا يمكن لـSPI خدمة عدة Targets.

المشكلة:

كل Target تقليديًا يحتاج Chip Select خاصًا.

كلما زاد عدد الأجهزة:

- Pins أكثر.
- Routing أكثر.
- firmware management أكثر.

وهنا I²C قد تكون أجمل للحساسات الكثيرة منخفضة البيانات.

# CPOL وCPHA: فخ SPI الشهير

SPI لديها Modes تعتمد على:

- Clock Polarity — CPOL.
- Clock Phase — CPHA.

فتوجد أربعة Modes شائعة:

```text
Mode 0
Mode 1
Mode 2
Mode 3
```

إذا Controller وTarget لا يتفقان على Mode:

- سترى Clock.
- سترى Data.
- لكن Bytes ستكون خاطئة.

لهذا أول ما تراجعه عند SPI لا تعمل:

> CPOL/CPHA + bit order + CS timing.

# هل SPI تحتوي ACK أو Addressing؟

ليست مثل I²C.

SPI الأساسية لا تقدم Bus-level ACK أو Addressing موحدين.

كل Chip لديها Command protocol في Datasheet.

مثل Flash قد تستخدم:

```text
0x03 = Read
0x02 = Page Program
0x9F = Read JEDEC ID
```

بينما Sensor آخر يستخدم Commands مختلفة تمامًا.

لذلك:

> "SPI" تخبرك كيف تنتقل البتات، لكنها لا تخبرك بالضرورة معنى البايتات.

# UART vs SPI: متى أختار كل واحدة؟

## اختر UART عندما:

- جهازان فقط.
- Debug console.
- Modem/GNSS/Bluetooth module.
- لا تريد Clock line.
- البيانات ليست هائلة.
- تحتاج كابلًا بسيطًا ضمن مستويات كهربائية مناسبة.

## اختر SPI عندما:

- Peripheral على PCB.
- تحتاج Throughput مرتفعًا.
- Flash/Display/ADC.
- Pins الإضافية مقبولة.
- تستطيع التحكم بتوقيت Clock بدقة.

# I²C vs SPI: المقارنة الأشهر

## I²C

أفضل عادةً عندما:

- عدة Sensors.
- تريد خطين فقط.
- Bandwidth متوسطة/منخفضة.
- العنونة مفيدة.

## SPI

أفضل عادةً عندما:

- السرعة أهم.
- عدد الأجهزة صغير.
- Latency قليلة.
- Full-duplex مفيد.
- Pins متوفرة.

مثال لوحة Sensor Hub:

```text
I²C:
Temperature
Humidity
RTC

SPI:
High-speed IMU
Flash
Display
```

لا يوجد مانع أن تستخدم الاثنين في المشروع نفسه.

# UART vs RS‑232: المقارنة الصحيحة

السؤال:

> UART أم RS‑232؟

يشبه جزئيًا سؤال:

> هل أريد شكل Frame أم طبقة كهربائية للكابل؟

يمكن استخدام UART من المتحكم ثم تحويلها إلى:

- RS‑232.
- RS‑485.
- USB عبر Bridge.
- Logic-level UART مباشرة.

لذلك RS‑232 ليست منافسًا مباشرًا لـUART في كل حالة.

# كيف أختار البروتوكول؟ Decision Tree

ابدأ بالسؤال الأول:

## هل الطرف داخل PCB نفسها؟

### نعم

اسأل:

**كم جهازًا؟**

- جهاز أو اثنان + throughput مرتفع → SPI.
- عدة Sensors + Pins قليلة → I²C.
- Module بسيط/Debug → UART.

### لا، يوجد Cable

اسأل:

**ما المسافة والضوضاء؟**

- مسافة قصيرة وبيئة هادئة → UART logic قد تكون ممكنة حسب التصميم.
- معدات Legacy/Industrial Point-to-point → RS‑232 قد يناسب.
- مسافة أطول/بيئة noisy/multi-drop → انظر أيضًا إلى RS‑485 أو CAN.

# لا تختَر حسب السرعة وحدها

هذه معايير أهم كثيرًا:

## 1. عدد الأجهزة

- I²C ممتازة للعديد من Targets.
- SPI تحتاج CS لكل Target غالبًا.
- UART Point-to-point عادةً.

## 2. Pins

لو لديك MCU صغيرة:

- I²C توفر Pins.
- SPI قد تستهلك عدة Chip Selects.

## 3. Bandwidth

- Display/Flash → SPI عادةً.
- Temperature sensor → I²C كافية غالبًا.

## 4. Latency

SPI يمكن أن تكون مباشرة وسريعة.

I²C لديها Address/ACK overhead.

UART لديها Start/Stop framing.

## 5. Power

لا تحكم من اسم البروتوكول فقط.

الطاقة تعتمد على:

- frequency.
- pull-ups.
- duty cycle.
- sleep modes.
- peripheral implementation.

## 6. Software ecosystem

اسأل:

- هل Driver موجود؟
- هل Linux/RTOS يدعمه؟
- هل Vendor SDK ناضج؟
- هل DMA متاح؟

## 7. Debuggability

UART هي الأسهل غالبًا في Debug اليدوي.

I²C/SPI تحتاج Logic Analyzer غالبًا لفهم التوقيت.

## 8. EMI / Signal Integrity

Clock سريع + traces طويلة قد تسبب مشاكل.

# طبقة الجهد أهم من اسم البروتوكول

قبل وصل جهازين:

```text
Check VDD
Check VIH/VIL
Check output type
Check 5V tolerance
Check pull-ups
Check absolute maximum
```

مثال:

MCU تعمل 1.8 V.

Sensor I²C تعمل 3.3 V.

حتى لو كلاهما "I²C"، قد تحتاج:

**bidirectional level shifter**

بحسب thresholds والدوائر.

البروتوكول المتوافق لا يعني الجهد متوافق.

# Open-drain vs Push-pull

## I²C

Open-drain + Pull-up.

خصائصها:

- multiple devices share line.
- rise time RC-limited.
- wired arbitration possible.

## SPI/UART غالبًا

Push-pull.

خصائصها:

- edge أسرع.
- drive HIGH/LOW مباشرة.
- لا تربط Outputين متعارضين معًا بلا تصميم.

هذه الفروقات الكهربائية تفسر كثيرًا من الفرق في السرعة والطوبولوجيا.

# Signal Integrity: لماذا تعمل على Breadboard ثم تفشل على المنتج؟

قد تعمل SPI عند 20 MHz على أسلاك قصيرة ثم تفشل مع Ribbon cable.

المشكلة ليست Firmware دائمًا.

قد تكون:

- ringing.
- overshoot.
- crosstalk.
- ground bounce.
- poor return path.
- long stubs.
- impedance discontinuity.

# أعراض Signal Integrity في SPI

- Bits تتغير عشوائيًا عند رفع Clock.
- تعمل عند 1 MHz وتفشل عند 20 MHz.
- Flash ID خاطئ أحيانًا.
- أول Byte صحيحة والباقي corrupted.

الحلول قد تشمل:

- traces أقصر.
- Ground return أفضل.
- تقليل Clock.
- series resistor قرب Driver.
- Layout أفضل.
- Scope measurement.

# أعراض I²C سيئة

- SDA لا ترتفع إلى HIGH بسرعة.
- Bus stuck LOW.
- NACK عشوائية.
- تعمل مع Sensor واحدة وتفشل عند إضافة أخرى.

افحص:

- pull-up resistance.
- capacitance.
- address conflicts.
- voltage.
- clock stretching.
- topology.

# Logic Analyzer: أداة لا غنى عنها

يمكن لـLogic Analyzer Decode:

- UART.
- I²C.
- SPI.

بدل النظر إلى waveform خام فقط.

مثال I²C:

```text
START
0x68 W ACK
0x1B ACK
0x00 ACK
STOP
```

فورًا يمكن اكتشاف:

- Address خاطئ.
- NACK.
- Missing STOP.
- Register خاطئ.

لكن Logic Analyzer لا يكشف دائمًا مشكلة Analog edge quality.

لهذا عند مشاكل كهربائية:

> استخدم Oscilloscope.

# Logic Analyzer أم Oscilloscope؟

## Logic Analyzer

ممتاز لـ:

- Decode bytes.
- long capture.
- protocol sequence.
- timing logic.

## Oscilloscope

ممتاز لـ:

- rise/fall time.
- overshoot.
- ringing.
- noise.
- voltage thresholds.

أفضل Debug أحيانًا يستخدم الاثنين.

# أخطاء تصميم شائعة

## 1. توصيل UART مباشرة إلى RS‑232

قد يتلف الدخل أو لا يعمل بسبب مستويات الجهد.

## 2. I²C بدون Pull-ups

الخطوط لن تعمل كما هو متوقع.

## 3. Pull-up غير مناسبة

تسبب Rise time بطيئة أو Current عاليًا.

## 4. SPI Mode خاطئة

CPOL/CPHA غير متوافقة.

## 5. افتراض سرعة ثابتة للبروتوكول

لا يوجد "SPI = 10 MHz" أو "UART = 115200 max" كقانون.

## 6. Ground غير مشترك في Logic-level interface

تحتاج Reference مشتركة في كثير من الروابط Single-ended.

## 7. ربط جهدين مختلفين

Protocol-compatible ≠ electrically compatible.

## 8. نفس I²C address لجهازين

يؤدي إلى Bus conflict على مستوى الاستجابة.

## 9. طول Cable دون حساب

Bus صممت للوحة قد لا تصلح لمسار طويل.

## 10. Parity كبديل عن CRC

Parity ليست حماية شاملة للرسائل.

# ماذا عن RS‑485 وCAN؟

عند تصميم نظام صناعي أو سيارة أو Cable طويلة، لا تحصر نفسك في البروتوكولات الأربعة.

## RS‑485

مفيدة عندما نحتاج:

- Differential signaling.
- مسافة أطول.
- multi-drop.
- تحمل ضوضاء أكبر.

لكن RS‑485 تحدد الطبقة الكهربائية أساسًا، وقد تحتاج Protocol أعلى مثل Modbus RTU.

## CAN

مناسبة عندما نحتاج:

- Multi-node bus.
- arbitration.
- error detection.
- بيئات صناعية/مركبات.

لذلك اختيار UART/I²C/SPI/RS‑232 ليس دائمًا القائمة الكاملة.

# ماذا عن USB؟

إذا أردت ربط Product حديثة بحاسب:

قد تكون USB أفضل من RS‑232 الأصلي.

لكن يمكن أن يكون داخل الجهاز:

```text
MCU UART
   ↓
USB-UART Bridge
   ↓
USB
```

وهنا الكمبيوتر يرى Virtual COM Port.

مرة أخرى: الطبقات مهمة.

# التوجه الحديث: I3C

مع زيادة عدد Sensors، ظهرت حاجة إلى Bus تحافظ على بساطة I²C لكن تقدم أداء وميزات أحدث.

طورت MIPI:

**I3C**

وفي 2025 أصبح الإصدار الحالي:

- MIPI I3C v1.2.
- MIPI I3C Basic v1.2.

I3C تستخدم Two-wire interface وتقدم إمكانات مثل:

- Dynamic addressing.
- In-band interrupts.
- أداء أعلى.
- إدارة طاقة أفضل.
- coexistence مع عدد من أجهزة I²C القديمة على Bus نفسها ضمن الشروط المدعومة.

تصف MIPI I3C بأنها خليفة لـI²C في فئات من التطبيقات وليست "إلغاءً فوريًا" لـI²C.

تذكر MIPI معدلًا نموذجيًا يبلغ 11.1 Mbit/s مع أوضاع High Data Rate أعلى تصل إلى نحو 100 Mbit/s في الخيارات المدعومة.

# هل I3C ستحل محل SPI؟

ليس بالضرورة.

SPI ما تزال ممتازة عندما نحتاج:

- Data path بسيطة.
- Throughput عالي.
- Flash/display/peripheral ecosystem واسع.

I3C تهدف خصوصًا إلى تحسين Bus التحكم والحساسات وتقليل Pins والطاقة مع ميزات إدارة متقدمة.

المشروع قد يستخدم:

```text
I3C for sensors
SPI for flash
UART for debug
```

# المصطلحات الحديثة: Controller وTarget

ستجد في وثائق قديمة:

- Master.
- Slave.

وثائق ومعايير حديثة عديدة تنتقل إلى مصطلحات أكثر وصفًا للوظيفة مثل:

- Controller / Target.
- Host / Client.
- Peripheral.

في هذا المقال نستخدم **Controller/Target** كلما أمكن، مع ذكر المصطلحات القديمة فقط عندما تساعد في فهم Datasheets القديمة.

# الأداء الحقيقي: لا تعتمد على Clock Frequency فقط

إذا SPI تعمل 20 MHz، هذا لا يعني:

```text
20 Mbit/s payload
```

دائمًا.

لأن Transaction قد تحتوي:

- command.
- address.
- dummy cycles.
- chip-select gaps.
- protocol overhead.

وكذلك I²C تحتوي:

- START.
- address.
- R/W.
- ACK.
- STOP.

وUART تحتوي:

- start/stop/parity.

لذلك قس:

> Effective application throughput

وليس Clock فقط.

# مثال 1: Temperature Sensor

المتطلبات:

- 2 bytes كل ثانية.
- عدة Sensors.
- سرعة غير مهمة.
- Pins قليلة.

الاختيار المنطقي غالبًا:

**I²C**

# مثال 2: External NOR Flash

المتطلبات:

- قراءة كتل كبيرة.
- سرعة.
- عدد أجهزة محدود.

الاختيار:

**SPI/QSPI-class interface** حسب Device.

# مثال 3: GPS/GNSS Module

المتطلبات:

- رسائل نصية/ثنائية دورية.
- رابط مباشر.
- Debug سهل.

غالبًا:

**UART**

# مثال 4: جهاز قياس صناعي قديم

المتطلبات:

- كابل.
- Port موجود أصلًا.
- Point-to-point.
- Compatibility أهم من السرعة.

قد يكون:

**RS‑232**

# مثال 5: عشرات الحساسات الحديثة

إذا المنصة والأجهزة تدعمها:

**I3C** قد تكون جذابة بسبب:

- Two wires.
- Dynamic addressing.
- in-band interrupts.
- bandwidth أعلى من I²C التقليدية.

# مصفوفة اختيار عملية

| الحاجة | الخيار الذي تبدأ بفحصه |
|---|---|
| Debug Console | UART |
| Sensor بسيط | I²C |
| عدة Sensors على خطين | I²C / I3C |
| Flash عالية السرعة | SPI |
| Display | SPI |
| ADC عالي البيانات | SPI |
| MCU↔Module بسيط | UART |
| Legacy industrial point-to-point | RS‑232 |
| Cable طويل noisy | RS‑485 / CAN غالبًا |
| Automotive multi-node | CAN / LIN حسب المتطلبات |
| Modern sensor aggregation | I3C عند توافر الدعم |

هذا ليس حكمًا نهائيًا؛ Datasheets والمتطلبات هي الفيصل.

# Checklist قبل اختيار الواجهة

اكتب هذه القيم:

```text
Number of devices:
Required payload bandwidth:
Maximum latency:
Cable/trace length:
Supply voltages:
Available GPIO pins:
Need addressing?:
Need full duplex?:
Need hot-plug?:
Noise environment:
Power budget:
MCU peripheral availability:
DMA required?:
OS/driver support:
Expected product lifetime:
```

ثم قارن الخيارات.

# Checklist قبل تشغيل أول Prototype

## UART

- [ ] TX ↔ RX Crossed correctly.
- [ ] Ground shared.
- [ ] Same baud.
- [ ] Same data bits.
- [ ] Same parity.
- [ ] Same stop bits.
- [ ] Voltage compatible.
- [ ] Not accidentally RS‑232 voltage.

## I²C

- [ ] SDA/SCL correct.
- [ ] Pull-ups installed.
- [ ] Pull-ups to correct voltage.
- [ ] Address correct.
- [ ] Address conflict checked.
- [ ] Bus speed supported by all devices.
- [ ] Rise time acceptable.

## SPI

- [ ] SCK correct.
- [ ] MOSI/SDO and MISO/SDI correct.
- [ ] CS pin correct.
- [ ] CPOL correct.
- [ ] CPHA correct.
- [ ] bit order correct.
- [ ] max SCK within Target timing.
- [ ] CS setup/hold timing respected.

## RS‑232

- [ ] Transceiver exists between logic UART and cable.
- [ ] TX/RX pinout checked.
- [ ] DTE/DCE assumptions checked.
- [ ] RTS/CTS configured if needed.
- [ ] connector pinout verified.

# الأمن: هذه الواجهات لا تشفر بياناتك تلقائيًا

UART/I²C/SPI/RS‑232 ليست بروتوكولات أمنية.

إذا يستطيع المهاجم الوصول ماديًا إلى:

- UART debug header.
- SPI flash.
- I²C bus.

فقد يتمكن من:

- قراءة بيانات.
- التقاط Firmware.
- إرسال Commands.
- العبث بالـPeripheral.

لذلك في المنتجات الحساسة:

- أغلق Debug interfaces عند الإنتاج حسب الحاجة.
- استخدم Secure Boot.
- فعّل flash protection.
- تحقق من firmware signatures.
- لا تضع Secrets كنص خام في external flash.
- ضع Threat Model للوصول الفيزيائي.

# الخلاصة

الاختيار بين UART وI²C وSPI وRS‑232 لا يحسمه جدول سرعة واحد.

فكر فيها كأدوات مختلفة:

## UART

رابط تسلسلي بسيط وغير متزامن، ممتاز للـDebug والموديولات.

## I²C

Bus ثنائية الأسلاك بعنونة، ممتازة للحساسات والأجهزة المتعددة على PCB.

## SPI

Bus متزامنة سريعة ومنخفضة الـOverhead، ممتازة للذاكرة والشاشات والمكونات عالية البيانات.

## RS‑232

واجهة كهربائية Point-to-point للكابلات والأنظمة التقليدية والصناعية، وغالبًا تحتاج Transceiver بين UART المنطقية والخط.

## I3C

تطور حديث للـSensor/Control buses يجمع Two-wire architecture مع Dynamic addressing وميزات أداء وإدارة أكثر تقدمًا.

بدل السؤال:

> "أي بروتوكول أسرع؟"

اسأل:

> **ما أقل واجهة تعقيدًا تحقق Bandwidth والمسافة وعدد الأجهزة والطاقة والموثوقية المطلوبة ضمن القيود الكهربائية الفعلية للتصميم؟**

## الأسئلة الشائعة

### ما الفرق بين UART وRS‑232؟

UART تنظم الإرسال التسلسلي غير المتزامن داخل المتحكم، بينما RS‑232 تحدد طبقة كهربائية ووظيفية Point-to-point بمستويات جهد مختلفة. يمكن استخدام UART مع RS‑232 عبر Transceiver.

### هل يمكن توصيل UART 3.3 V مباشرة بمنفذ RS‑232؟

لا. مستويات RS‑232 مختلفة وقد تكون موجبة وسالبة. استخدم RS‑232 transceiver مناسبًا.

### هل 115200 أعلى سرعة لـUART؟

لا. السرعة القصوى تعتمد على Hardware والClock والطرفين وجودة الرابط. 115200 مجرد قيمة شائعة.

### هل I²C محدودة بـ400 kbit/s؟

لا. المواصفة تتضمن Fast-mode Plus حتى 1 Mbit/s وHigh-speed mode حتى 3.4 Mbit/s، إضافة إلى أوضاع أخرى.

### لماذا تحتاج I²C مقاومات Pull-up؟

لأن SDA وSCL تعملان بأسلوب open-drain، فتحتاج الخطوط إلى Pull-up كي تعود إلى الحالة HIGH عندما لا يسحبها جهاز إلى LOW.

### هل يمكن وصل عدة أجهزة على SPI؟

نعم. يمكن مشاركة Clock/Data واستخدام Chip Select منفصل لكل Target في التصميم التقليدي.

### هل SPI لها سرعة قصوى موحدة؟

لا. السرعة تعتمد على Controller وTarget والتوقيت والـPCB والـSignal Integrity.

### ما الفرق الرئيسي بين I²C وSPI؟

I²C تستخدم خطين وعناوين وتناسب عدة أجهزة، بينما SPI تستخدم عادة خطوطًا أكثر لكنها أبسط وأسرع وتوفر Full-duplex كهربائيًا.

### هل Parity في UART تمنع فساد البيانات؟

لا. يمكنها كشف بعض الأخطاء فقط. للحماية الأقوى استخدم CRC وآليات ACK/Retry في Protocol أعلى إذا احتاج التطبيق.

### هل Baud Rate هي نفسها Bit Rate؟

ليس دائمًا في الاتصالات. في UART الثنائية التقليدية غالبًا يتطابق الرقم على مستوى الخط لأن الرمز يحمل Bit واحدة، لكن Payload الفعلية أقل بسبب Framing.

### ما I3C؟

I3C Bus ثنائية الأسلاك طورتها MIPI كخيار حديث للحساسات وواجهات التحكم، وتضيف Dynamic addressing وIn-band interrupts ومعدلات أعلى مع إمكانية التعايش مع بعض أجهزة I²C القديمة.

### متى أستخدم CAN أو RS‑485 بدل هذه الواجهات؟

عند الكابلات الأطول والضوضاء العالية أو الحاجة إلى Multi-node robust bus، تكون Differential interfaces مثل CAN أو RS‑485 أكثر ملاءمة غالبًا.

## المصادر والمراجع

1. NXP Semiconductors — UM10204, I2C-bus specification and user manual, Rev. 7.0  
   https://www.nxp.com/docs/en/user-guide/UM10204.pdf

2. MIPI Alliance — I3C and I3C Basic  
   https://www.mipi.org/specifications/i3c-sensor-specification

3. MIPI Alliance — I3C Basic v1.2  
   https://www.mipi.org/mipi-i3c-basic-download

4. Microchip — SPI Mode Overview  
   https://onlinedocs.microchip.com/

5. Texas Instruments — UART protocol and error overview  
   https://www.ti.com/video/6313217959112

6. Texas Instruments — Universal Asynchronous Receiver/Transmitter user documentation  
   https://www.ti.com/lit/ug/sprugp1/sprugp1.pdf

7. Analog Devices — Fundamentals of RS-232 Serial Communications  
   https://www.analog.com/en/resources/technical-articles/fundamentals-of-rs232-serial-communications.html

8. Analog Devices — RS232 Quick Guide  
   https://www.analog.com/media/en/technical-documentation/product-selector-card/rs232%20quick%20guide.pdf

## مقالات ودراسات ذات صلة في منصة تكنو إنجاز

- [ما هو إنترنت الأشياء (IoT)؟ البنية والبروتوكولات والتطبيقات والأمان](/articles/internet-of-things-iot)
- [كيف تؤثر شبكات 5G في إنترنت الأشياء؟ السرعة والزمن والتوسع و5G-Advanced](/articles/5g-iot)
- [التوأم الرقمي: ما هو وكيف يعمل وما أهم تطبيقاته؟](/articles/digital-twin)
