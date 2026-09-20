<!--
FILE: 02-article.md
PURPOSE: Published article content
-->

SEO Title: ما هو بروتوكول MCP؟ كيف يربط نماذج الذكاء الاصطناعي بالأدوات والبيانات؟

Meta Description: دليل عملي لفهم Model Context Protocol (MCP): معماريته، الأدوات والموارد والقوالب، طرق النقل الحديثة، الأمان، والفرق بينه وبين APIs وFunction Calling وLangChain.

Suggested Slug: model-context-protocol-mcp

# ما هو بروتوكول MCP؟ كيف يربط نماذج الذكاء الاصطناعي بالأدوات والبيانات؟

**Model Context Protocol (MCP) هو معيار مفتوح يوفّر طريقة موحدة لربط تطبيقات الذكاء الاصطناعي بالأدوات والبيانات والأنظمة الخارجية.** بدل أن يبني المطور تكاملًا مختلفًا لكل نموذج ولكل خدمة، يمكنه إنشاء MCP Server يعرّف قدراته بطريقة معيارية، ثم تتصل به تطبيقات تدعم MCP لاكتشاف هذه القدرات واستخدامها.

يمكن تشبيه الفكرة بمنفذ موحّد لتطبيقات الذكاء الاصطناعي:

> التطبيق الذكي يعرف كيف يتحدث MCP، والخادم يعرف كيف يعرض الأدوات والبيانات عبر MCP، فيقل مقدار "Glue Code" المطلوب بين الطرفين.

ظهر MCP في نوفمبر 2024 عندما قدمته Anthropic كمعيار مفتوح لربط أنظمة الذكاء الاصطناعي بمصادر البيانات والأدوات. ثم توسع اعتماده بسرعة، وفي ديسمبر 2025 تم التبرع بالمشروع إلى **Agentic AI Foundation (AAIF)** التابعة لـLinux Foundation، بهدف ترسيخ حوكمة محايدة ومفتوحة للمشروع.

وبحلول 2026 أصبح MCP مستخدمًا في عدد كبير من منتجات ووكلاء الذكاء الاصطناعي وبيئات التطوير، كما تبنته منصات متعددة خارج منظومة Anthropic.

## ما المشكلة التي يحاول MCP حلها؟

النموذج اللغوي وحده لا يستطيع عادةً الوصول مباشرة إلى:

- قاعدة بيانات شركتك.
- ملفات جهازك.
- GitHub.
- CRM.
- نظام الفوترة.
- التقويم.
- محرك بحث داخلي.
- خدمات SaaS.
- أدوات تنفيذ الكود.
- APIs خاصة بالمؤسسة.

لكي يستخدم النموذج هذه الأنظمة، يجب وجود طبقة ربط.

قبل وجود معيار مشترك، كان التكامل غالبًا يأخذ شكلًا مثل:

```text
LLM A → Integration خاص → Service 1
LLM A → Integration خاص → Service 2
LLM B → Integration مختلف → Service 1
LLM B → Integration مختلف → Service 2
```

ومع ازدياد عدد النماذج والأدوات تصبح شبكة التكاملات صعبة الصيانة.

أما MCP فيحاول تحويلها إلى:

```text
AI Application
      │
   MCP Client
      │
──────── MCP ────────
      │
   MCP Server
      │
Tools / Data / APIs
```

هذا لا يلغي APIs أو قواعد البيانات؛ بل يضيف **طبقة معيارية موجهة لتطبيقات ووكلاء الذكاء الاصطناعي** فوقها.

# هل MCP هو API جديد؟

**ليس بديلًا عن API بالمعنى التقليدي.**

إذا كان لديك REST API مثل:

```text
GET /customers/123
POST /tickets
```

فقد يستخدم MCP Server هذه الـAPI خلف الكواليس.

الفرق أن MCP يحدد طريقة موحدة يستطيع تطبيق AI من خلالها:

- اكتشاف ما هو متاح.
- قراءة وصف الأدوات.
- معرفة Schema المدخلات.
- استدعاء الأداة.
- استلام النتيجة.
- الوصول إلى موارد وسياق.
- استخدام Prompts أو قدرات إضافية يدعمها الخادم.

إذًا:

**REST/OpenAPI** تصف واجهة لخدمة أو نظام.

أما **MCP** فيصف طريقة تواصل بين تطبيقات AI وخوادم تقدم لها أدوات وسياقًا.

والاثنان يمكن أن يعملا معًا.

# ما الفرق بين MCP وFunction Calling؟

هذا من أكثر الأسئلة شيوعًا.

## Function Calling

هي قدرة داخل نموذج أو API تسمح للنموذج باختيار دالة من مجموعة دوال تم تعريفها له.

مثال:

```text
get_weather(city)
send_email(to, subject, body)
```

لكن المطور لا يزال مسؤولًا عادةً عن:

- تعريف الدوال.
- توصيلها بالخدمات.
- إدارة الاتصال.
- إعادة النتائج.
- كتابة التكامل.

## MCP

يوحد جزءًا أكبر من هذه المنظومة.

يمكن للخادم أن يعرض مجموعة من الأدوات والموارد بطريقة معيارية، ويستطيع Client متوافق اكتشافها والتعامل معها.

باختصار:

> Function Calling يحدد كيف يطلب النموذج استدعاء وظيفة، بينما MCP يحدد واجهة أوسع لاكتشاف وربط واستخدام قدرات خارجية بين تطبيق AI وخادم مستقل.

وهما ليسا متنافسين بالضرورة؛ قد يستخدم تطبيق MCP آلية Tool Calling داخل النموذج كي يقرر أي Tool من خادم MCP يجب استدعاؤها.

# ما الفرق بين MCP وLangChain أو LlamaIndex؟

هناك فرق في الطبقة المعمارية.

## LangChain

إطار لبناء تطبيقات ووكلاء تعتمد على النماذج اللغوية.

قد يدير:

- Agents.
- Tools.
- Workflows.
- Model calls.
- Retrieval.
- State.

## LlamaIndex

إطار يركز بصورة كبيرة على ربط نماذج الذكاء الاصطناعي بالبيانات وبناء نظم Retrieval/RAG ووكلاء البيانات.

## MCP

ليس Framework لبناء التطبيق كاملًا.

هو **Protocol / Standard** يحدد طريقة تواصل بين التطبيق وخدمات خارجية.

لهذا يمكن أن يستخدم تطبيق مبني بـLangChain أو LlamaIndex خوادم MCP، بدل أن يكون MCP بديلًا عنهما.

الفرق المفاهيمي:

```text
LangChain / LlamaIndex = كيف أبني التطبيق؟

MCP = كيف يتحدث التطبيق مع أدوات وبيانات خارجية بطريقة معيارية؟
```

# ما مكونات معمارية MCP؟

يُشرح MCP عادةً عبر ثلاثة أدوار رئيسية:

## 1. MCP Host

هو التطبيق الذي يتفاعل معه المستخدم ويستخدم قدرات MCP.

أمثلة محتملة:

- مساعد ذكي.
- محرر أكواد.
- تطبيق Desktop.
- Agent Platform.
- تطبيق مخصص داخل مؤسسة.

المضيف يقرر كيف يعرض الأدوات للموديل، وكيف يدير موافقة المستخدم، وما البيانات التي تدخل إلى السياق.

## 2. MCP Client

هو المكوّن الذي يتحدث بروتوكول MCP مع Server.

يتولى مهام مثل:

- الاتصال.
- تفاوض نسخة البروتوكول.
- اكتشاف القدرات.
- إرسال الطلبات.
- استلام النتائج.
- إدارة الأخطاء.

قد يكون Client جزءًا داخليًا من Host، فلا يراه المستخدم مباشرة.

## 3. MCP Server

يعرض وظائف أو بيانات للتطبيق.

قد يلتف حول:

- Database.
- SaaS API.
- File System.
- Git repository.
- Cloud service.
- خدمة داخلية.
- أداة تحليل.
- نظام أعمال.

مهم جدًا:

> MCP Server ليس النموذج اللغوي نفسه.

هو خدمة تتيح لتطبيق AI الوصول إلى قدرات خارجية بطريقة منظمة.

# ماذا يعرض MCP Server؟

من أكثر المفاهيم الأساسية في MCP:

## Tools

وظائف يمكن استدعاؤها لتنفيذ عملية.

مثل:

```text
create_ticket
search_repository
run_query
send_message
generate_report
```

الأداة عادةً تحتوي على:

- اسم.
- وصف.
- Input schema.
- أحيانًا Output schema.
- منطق تنفيذ فعلي داخل Server.

في أحدث مواصفة 2026 أصبحت Tool schemas تدعم نطاقًا أوسع من JSON Schema 2020-12، ما يجعل توصيف المدخلات والمخرجات أكثر مرونة.

## Resources

بيانات أو محتوى يمكن للتطبيق الوصول إليه.

مثل:

- ملف.
- Documentation.
- سجل.
- Schema قاعدة بيانات.
- محتوى مشروع.

يمكن التفكير في Resources على أنها سياق قابل للقراءة أكثر من كونها أفعالًا تنفيذية.

## Prompts

قوالب أو تدفقات Prompt يوفرها Server كي يستطيع Client عرضها أو استخدامها.

قد تكون مفيدة عندما يريد الخادم توفير Workflow لغوي جاهز مرتبط بأدواته أو بياناته.

لكن يجب عدم التعامل مع Prompts وكأنها تعليمات أمنية موثوقة تلقائيًا؛ Host هو المسؤول عن كيفية دمج أي تعليمات خارجية داخل سياق النموذج.

# كيف يعمل استدعاء أداة عبر MCP؟

يمكن تبسيط العملية هكذا:

1. يتلقى التطبيق سؤال المستخدم.
2. يتعرف Host/Model على الحاجة إلى قدرة خارجية.
3. يعرف Client الأدوات المتاحة من MCP Server.
4. يختار النموذج أو منطق التطبيق Tool مناسبة.
5. قد يطلب Host موافقة المستخدم إذا كانت العملية حساسة.
6. يرسل Client طلب Tool Call.
7. ينفذ MCP Server العملية.
8. يعيد Server النتيجة.
9. يضيف التطبيق النتيجة إلى السياق.
10. يولد النموذج استجابة نهائية أو يتابع خطوات أخرى.

مثال:

المستخدم:

> "اعرض لي آخر ثلاث تذاكر دعم مفتوحة للعميل X."

بدل أن يخمن النموذج:

```text
User
 ↓
AI Host
 ↓
MCP Tool: search_support_tickets
 ↓
MCP Server
 ↓
Support System API
 ↓
Structured Result
 ↓
LLM
 ↓
Answer
```

قيمة MCP هنا ليست أن النموذج "أصبح يعرف التذاكر"، بل أن الوصول إليها أصبح عبر واجهة منظمة يمكن إعادة استخدامها.

# هل MCP يستخدم JSON-RPC؟

نعم، يستخدم MCP رسائل منظمة مبنية على **JSON-RPC 2.0**.

لكن يجب الانتباه إلى أن تفاصيل دورة الاتصال تطورت مع إصدارات البروتوكول.

المقالات التي تصف MCP في بداية 2025 قد تختلف تقنيًا عن المواصفة الحالية في 2026.

# ما أحدث نسخة مهمة من MCP في 2026؟

في **28 يوليو 2026** صدر إصدار مواصفة MCP `2026-07-28`، وهو من أكبر التحديثات منذ إطلاق البروتوكول.

أحد أهم التغييرات هو انتقال Core البروتوكول على HTTP إلى نموذج **Stateless request/response** بصورة أكبر.

الفائدة التشغيلية:

- سهولة وضع Servers خلف Load Balancers.
- تقليل الاعتماد على Sticky Sessions.
- تحسين قابلية التوسع.
- جعل كل طلب أكثر استقلالًا.
- تسهيل Routing وAuthorization في البنية التحتية.

كما أضاف الإصدار:

- Header-based routing.
- تحسينات Authorization.
- Cache hints لقوائم Tools/Prompts/Resources.
- Extensions framework.
- تغييرات في العمليات طويلة المدة والتفاعلات متعددة الجولات.

هذه نقطة مهمة جدًا عند قراءة Tutorials قديمة: **MCP تطور بسرعة، لذلك يجب دائمًا التحقق من Protocol Version التي يستهدفها المثال.**

# ما طرق النقل الحالية في MCP؟

## stdio

مناسب خصوصًا عندما يشغل Host خادم MCP محليًا كعملية Child Process.

التواصل يتم عبر:

- stdin.
- stdout.

هذا شائع في الأدوات المحلية ومحررات الكود.

مميزاته:

- بسيط محليًا.
- لا يحتاج فتح Port شبكي.
- مناسب للأدوات المحلية.

لكن الخادم يحصل على مستوى الوصول الذي يمنحه له نظام التشغيل والبيئة التي شُغّل فيها، لذلك تشغيل Server غير موثوق محليًا يمكن أن يكون خطرًا.

## Streamable HTTP

هو المسار الحديث للخوادم البعيدة.

يسمح باستخدام بنية HTTP العادية مع دعم Streaming عند الحاجة.

وفي مواصفة `2026-07-28` أصبحت البنية أكثر Stateless على مستوى البروتوكول.

## ماذا عن HTTP + SSE؟

هذه نقطة تحتاج تحديثًا من كثير من الشروحات القديمة.

النقل القديم المبني على HTTP+SSE كان مستخدمًا في الإصدارات السابقة، لكن في أحدث مواصفة أصبح **Legacy HTTP+SSE transport deprecated** مع فترة انتقال.

لذلك عند بناء تكامل جديد في 2026، لا ينبغي تقديم HTTP+SSE القديم على أنه الطريق الأساسي الحديث.

# ماذا تغير في MCP 2026 غير النقل؟

هناك عدة تغييرات مهمة.

## Header-based routing

طلبات Streamable HTTP الحديثة تحمل معلومات مثل Method/Name في Headers معيارية، ما يساعد:

- Gateways.
- WAF.
- Load Balancers.
- Rate Limiting.
- Authorization layers.

على اتخاذ قرارات دون الحاجة إلى Parsing كامل للجسم في كل مرة.

## Cacheable lists

نتائج مثل:

- tools/list
- prompts/list
- resources/list
- resources/read

يمكن أن تتضمن معلومات Caching، ما يقلل إعادة جلب القوائم بلا داعٍ.

## Authorization hardening

أصبحت المواصفة أكثر صرامة في بعض تفاصيل OAuth وIssuer validation وعزل الاعتمادات بين Authorization Servers.

## Extensions

أصبح هناك Framework رسمي للامتدادات بدل إدخال كل ميزة جديدة إلى Core.

ومن الأمثلة:

- Tasks.
- MCP Apps.
- Enterprise-oriented extensions.

## Features deprecated

في إصدار 2026، تم وضع Features مثل:

- Roots.
- Sampling.
- Logging.

في مسار Deprecation ضمن Core، مع بدائل واتجاهات أحدث.

هذا لا يعني أنها تختفي فورًا؛ توجد سياسة Deprecation وفترة توافق، لكنه يعني أن المشاريع الجديدة يجب أن تقرأ المواصفة الحالية بدل الاعتماد على أمثلة قديمة.

# هل MCP يجعل نظام الذكاء الاصطناعي آمنًا تلقائيًا؟

**لا.**

هذه من أهم النقاط التي يجب فهمها.

MCP يوحد طريقة الاتصال، لكنه لا يحل تلقائيًا:

- سوء تصميم الصلاحيات.
- Prompt Injection.
- Tool misuse.
- تسريب الأسرار.
- تنفيذ أوامر خطرة.
- Server غير موثوق.
- Schema مضلل.
- نتائج خبيثة من الأدوات.
- Confused Deputy problems.
- Excessive permissions.

إذا أعطيت أداة:

```text
delete_all_customer_data()
```

صلاحيات كاملة، فلن يجعلها MCP آمنة لمجرد أنها مكشوفة عبر بروتوكول معياري.

الأمان مسؤولية مشتركة بين:

- Host.
- Client.
- Server.
- Identity Provider.
- الأداة الخلفية.
- المطور.
- المستخدم أو المؤسسة.

# ما أهم ممارسات أمان MCP؟

## 1. Least Privilege

أعط كل Server وTool أقل صلاحيات ممكنة.

لا تعط أداة قراءة:

- صلاحية كتابة.
- صلاحية Admin.
- وصولًا إلى كل Tenant.

إذا كانت تحتاج قراءة Tickets فقط، لا تمنحها صلاحية حذف الحسابات.

## 2. افصل القراءة عن الكتابة

من الأفضل تصميم Tools مثل:

```text
get_customer
list_invoices
```

منفصلة عن:

```text
refund_invoice
delete_customer
```

حتى يستطيع Host تطبيق Approval Policies مختلفة.

## 3. استخدم موافقة المستخدم للعمليات الحساسة

قبل:

- إرسال بريد.
- نشر محتوى.
- حذف ملف.
- تحويل مال.
- إنشاء مستخدم.
- تعديل Production.

يمكن للHost طلب Confirmation واضحة.

OpenAI، على سبيل المثال، يدعم في تكامل MCP داخل Responses API نمط Approval لطلبات Tool الحساسة بدل السماح بكل الأدوات بلا مراجعة.

## 4. لا تثق بوصف Tool وحده

Tool Description تأتي من Server.

إذا كان الخادم غير موثوق، قد يعرض Tool وصفها مضلل.

تعامل مع MCP Servers مثل أي Software Dependency:

- تحقق من المصدر.
- راجع الكود أو المزود.
- Pin versions عند الحاجة.
- راقب التحديثات.
- لا تثبت Servers عشوائية بصلاحيات واسعة.

## 5. تحقق من جميع المدخلات

MCP Tool ليست معفاة من قواعد الأمن التقليدية.

يجب منع:

- SQL Injection.
- Command Injection.
- Path Traversal.
- SSRF.
- Unsafe deserialization.

## 6. افصل أسرار الاعتماد

لا تضع API Keys داخل Prompt.

استخدم:

- Secret managers.
- OAuth.
- Scoped tokens.
- Short-lived credentials.

## 7. سجل العمليات ذات الأثر

يفضل وجود Audit Trail يوضح:

- من طلب الفعل؟
- ما Tool المستخدمة؟
- متى؟
- بأي Parameters؟
- ما النتيجة؟
- هل تمت موافقة المستخدم؟

مع عدم تخزين معلومات حساسة بلا داعٍ.

## 8. ضع Rate Limits

النموذج قد يستدعي أداة عدة مرات.

استخدم:

- Limits.
- Quotas.
- Budgets.
- Timeouts.
- Idempotency عندما يلزم.

## 9. تعامل مع Tool Output كبيانات غير موثوقة

إذا جلب Server محتوى من الإنترنت أو مستند خارجي، قد يحتوي على Prompt Injection.

لا ينبغي أن تتحول كل جملة داخل Tool Output إلى تعليمات ذات سلطة أعلى.

## 10. اعزل التنفيذ

إذا كانت Tool تنفذ كودًا أو أوامر نظام:

- Container.
- Sandbox.
- Filesystem restrictions.
- Network restrictions.
- CPU/Memory limits.

لكن **Sandboxing ليس شيئًا يفعله MCP تلقائيًا**؛ يجب على التطبيق والخادم توفير هذه الحدود.

# كيف تعمل المصادقة في MCP؟

في Remote MCP عبر HTTP، يمكن أن تدخل OAuth في عملية الوصول.

الفكرة العامة:

1. MCP Server يمثل Resource Server.
2. Client يكتشف متطلبات Authorization.
3. يحصل المستخدم/التطبيق على Token من Authorization Server مناسب.
4. Server يتحقق من Token.
5. يتم تقييد الصلاحيات بالـScopes والهوية.

في إصدار 2026 تم تعزيز متطلبات Authorization، ومنها التحقق من Issuer ومنع إعادة استخدام Credentials عبر Authorization Servers بطريقة غير صحيحة.

المبدأ المهم للمطور:

> Authentication تجيب "من أنت؟"، أما Authorization فتجيب "ما الذي يسمح لك بفعله؟".

وجود Login ناجح لا يعني أن Tool يجب أن تحصل على كل الصلاحيات.

# هل MCP مخصص لـClaude فقط؟

لا.

رغم أن Anthropic قدمت MCP أصلًا عام 2024، أصبح البروتوكول معيارًا أوسع بكثير.

تم التبرع به في ديسمبر 2025 إلى Agentic AI Foundation تحت Linux Foundation، وأصبح مستخدمًا عبر شركات ومنتجات متعددة.

ومن الأمثلة الحالية:

- Claude وClaude Desktop/Code.
- OpenAI API ومنتجات تدعم MCP.
- Google Antigravity.
- Visual Studio Code ومحررات/وكلاء آخرون.
- Dify.
- تطبيقات مؤسسية ومخصصة.

لهذا يجب عدم وصف MCP اليوم على أنه "بروتوكول Claude".

# كيف تستخدم OpenAI MCP حاليًا؟

تدعم OpenAI استخدام MCP ضمن **Responses API** من خلال Tool من النوع `mcp`.

يمكن للتطبيق ربط Remote MCP Server باستخدام Server URL، كما توجد آليات للاتصال بخوادم خاصة أو خلف Firewall عبر Secure MCP Tunnel في المنتجات المدعومة.

ويمكن تحديد:

- Server.
- الأدوات المسموح بها.
- Authorization.
- Approval policy.

هذا مثال مهم على قيمة البروتوكول: نفس Server يمكن أن يُستهلك من بيئات AI مختلفة إذا كانت تدعم MCP بدل بناء Connector خاص لكل مزود.

# كيف يستخدم Claude MCP؟

كان Claude Desktop من أوائل البيئات التي دعمت MCP.

وتطورت التجربة لاحقًا مع **Desktop Extensions / MCP Bundles** لتسهيل تثبيت Servers المحلية بدل مطالبة المستخدم بتعديل ملفات Config يدويًا في كل مرة.

كما يدعم نظام Anthropic وAPI الخاص به الاتصال بخوادم MCP في سيناريوهات مختلفة.

القيمة ليست "ذاكرة سحرية" داخل Claude؛ بل أن MCP يسمح بربط Claude بخدمات خارجية يمكن أن توفر:

- Files.
- Search.
- Databases.
- Tools.
- Memory stores.

الذاكرة نفسها تأتي من النظام الخارجي، لا من MCP باعتباره قاعدة بيانات.

# ماذا عن Google Antigravity؟

توثق Google دعم **MCP Servers محلية وبعيدة** داخل Antigravity.

يمكن للمطور ربط بيئة Agent بخوادم Google/Google Cloud أو Servers أخرى، واستخدام MCP لتوفير أدوات وسياق خارجي.

هذا مثال أوضح من الادعاء أن "MCP زاد دقة Antigravity بنسبة معينة"؛ فالدعم موثق، أما مقدار تحسن الدقة أو الإنتاجية فيحتاج دراسة قياس مستقلة.

# ماذا عن Dify؟

Dify أضاف دعم MCP تدريجيًا ثم قدم دعمًا أصليًا في اتجاهين:

- استخدام MCP Servers كأدوات داخل Agents/Workflows.
- عرض تطبيقات أو Workflows Dify كـMCP Server لتستهلكها Clients خارجية.

هذا يجعل Dify مثالًا جيدًا على قابلية البروتوكول للعمل في الاتجاهين:

```text
Dify → MCP Client → External Server
```

أو:

```text
External Client → MCP → Dify App/Workflow
```

لكن يجب دائمًا التحقق من **Protocol Version** التي يدعمها إصدار Dify المحدد، لأن MCP نفسه يتغير بسرعة.

# هل MCP هو نفسه RAG؟

لا.

## RAG

يسترجع معلومات مرتبطة بالسؤال ويضعها في سياق النموذج.

مثال:

```text
Question
 ↓
Vector Search
 ↓
Relevant Documents
 ↓
LLM
```

## MCP

معيار اتصال عام.

يمكن لخادم MCP أن يعرض Tool تقوم بـRAG Search.

لكن يمكنه أيضًا:

- إنشاء Issue.
- تشغيل Query.
- إرسال رسالة.
- قراءة ملف.
- تشغيل Workflow.

إذًا RAG هو Pattern/Technique، بينما MCP هو Protocol يمكن أن يحمل قدرات تشمل RAG وغيره.

# هل MCP هو Agent Framework؟

لا.

MCP لا يحدد وحده:

- Plan.
- Memory policy.
- Reasoning loop.
- Retry strategy.
- Multi-agent orchestration.
- Goal decomposition.

هذه مسؤولية Agent Framework أو Host.

MCP يعطي Agent طريقة معيارية للوصول إلى العالم الخارجي.

# متى تحتاج MCP فعلًا؟

يكون MCP مفيدًا عندما:

- لديك عدة أدوات ومصادر بيانات.
- تريد دعم أكثر من AI Host.
- تريد فصل Integration logic عن التطبيق.
- تبني Ecosystem من أدوات قابلة لإعادة الاستخدام.
- تحتاج Tool discovery.
- تريد تبديل النموذج دون إعادة بناء كل Connector.
- تريد نشر خدمة ذكاء اصطناعي يمكن لعدة Clients استخدامها.

# متى قد لا تحتاج MCP؟

قد يكون Integration مباشر أبسط إذا:

- لديك Tool واحدة فقط.
- التطبيق صغير وثابت.
- لا تحتاج Interoperability.
- خدمة خارجية لديها SDK مباشر ممتاز.
- لا يوجد احتمال لإعادة استخدام Connector.
- إضافة MCP ستضيف طبقة تشغيل بلا قيمة واضحة.

المعيار الجيد لا يعني أنه يجب استخدامه في كل مشروع.

# مثال معماري لمشروع داخل شركة

لنفترض أن المؤسسة تريد مساعدًا يستطيع:

- البحث في الوثائق.
- قراءة CRM.
- إنشاء Support Ticket.
- تشغيل تقرير مبيعات.

يمكن بناء:

```text
AI Assistant
│
├── MCP Client → Documents MCP Server
├── MCP Client → CRM MCP Server
├── MCP Client → Support MCP Server
└── MCP Client → Analytics MCP Server
```

كل Server يمكن أن يملك:

- Authentication مختلف.
- Scopes مختلفة.
- Logging مستقل.
- Rate Limits.
- فريقًا مسؤولًا عنه.

وهذا أفضل تنظيميًا من إعطاء نموذج واحد Credentials موحدة تصل مباشرة إلى جميع الأنظمة.

# كيف تصمم MCP Tool جيدة؟

الأداة الجيدة يجب أن تكون:

## محددة

أفضل:

```text
get_invoice(invoice_id)
```

من:

```text
do_accounting_task(text)
```

كلما كانت الوظيفة واضحة أصبح التحقق والصلاحيات أسهل.

## ذات Schema دقيقة

حدد:

- الأنواع.
- الحقول المطلوبة.
- Enum عندما يمكن.
- حدود القيم.
- Output structure.

## Description واضحة وغير تسويقية

يجب أن يعرف النموذج:

- ماذا تفعل؟
- ماذا لا تفعل؟
- متى تستخدم؟
- ما Side Effects؟

## Idempotent عندما يمكن

إعادة قراءة ملف آمنة عادةً.

أما "Send Payment" فتحتاج تصميمًا أكثر حذرًا لمنع التكرار غير المقصود.

## تفصل Preview عن Execute

في العمليات الحساسة:

```text
preview_refund()
execute_refund()
```

قد يكون أفضل من Tool واحدة تنفذ مباشرة.

# ما أخطاء تصميم MCP الشائعة؟

## Server واحدة بكل الصلاحيات

تتحول إلى نقطة خطر كبيرة.

## Tool عامة جدًا

مثل:

```text
run_any_sql(query)
```

بدون قيود.

أفضل في كثير من الأنظمة عرض عمليات أضيق أو طبقة Query Read-only.

## تمرير Secrets داخل Context

النموذج لا يحتاج رؤية API Key كي يستخدم Tool.

## الثقة في بيانات Tool الخارجية

المحتوى الخارجي قد يكون خبيثًا.

## عدم وجود Approval

خصوصًا للعمليات التي تغير العالم الخارجي.

## الخلط بين Protocol Security وApplication Security

وجود OAuth لا يحميك من Tool منطقها سيئ.

## الاعتماد على Tutorial قديم

MCP تطور بسرعة، وخصوصًا النقل ودورة البروتوكول في 2026.

# ما الذي يجب مراقبته في MCP خلال الفترة المقبلة؟

خارطة الطريق المنشورة في أغسطس 2026 تشير إلى استمرار التركيز على:

- قابلية التوسع.
- Enterprise readiness.
- Agent communication.
- Governance.
- Extensions.
- تحسينات Authorization.
- تشغيل أكثر نضجًا على البنية التحتية المؤسسية.

أي مقال تقني عن MCP يجب اعتباره محتوى يحتاج Refresh دوريًا؛ البروتوكول ما يزال يتطور بسرعة أكبر من تقنيات شبكية ناضجة مثل HTTP أو SMTP.

# الخلاصة

Model Context Protocol لا يجعل النموذج أذكى في حد ذاته، ولا يستبدل APIs، ولا يبني Agent كاملًا.

قيمته الأساسية هي **توحيد طريقة ربط تطبيقات الذكاء الاصطناعي بالأدوات والبيانات الخارجية**.

يمكن تلخيصه هكذا:

```text
LLM = يفهم ويولد ويقرر متى يحتاج قدرة خارجية

MCP = يوفر لغة اتصال معيارية للوصول إلى هذه القدرة

MCP Server = يعرّف وينفذ القدرات الخارجية

Host = ينسق النموذج، الصلاحيات، المستخدم، والسياق
```

حيث يولد النموذج اللغوي طلب استدعاء الأداة خطوة بخطوة اعتمادًا على [آلية التنبؤ بالرمز التالي في النماذج اللغوية](#article/next-token-prediction).

وأهم ما تغير في 2026 هو أن MCP لم يعد مجرد تجربة ناشئة من شركة واحدة؛ أصبح معيارًا واسع التبني، انتقل إلى حوكمة مستقلة، وتطورت مواصفته نحو Streamable HTTP أكثر قابلية للتوسع وCore عديم الحالة على مستوى البروتوكول، مع تحسينات كبيرة في Authorization والامتدادات.

لكن المعيارية ليست مرادفًا للأمان.

نجاح MCP في بيئة إنتاجية يعتمد على:

- Least privilege.
- Authentication & Authorization.
- Human approvals.
- Validation.
- Isolation.
- Auditability.
- Server trust.
- Version management.
- وعدم إعطاء النموذج أكثر مما يحتاج إليه.

## الأسئلة الشائعة

### ما هو MCP باختصار؟

MCP هو معيار مفتوح يسمح لتطبيقات الذكاء الاصطناعي بالاتصال بخوادم تعرض أدوات وبيانات وموارد بطريقة موحدة بدل كتابة تكامل مخصص لكل نظام.

### هل MCP خاص بـClaude؟

لا. Anthropic أطلقته في 2024، لكنه أصبح معيارًا مفتوحًا متعدد الشركات وتم التبرع به إلى Agentic AI Foundation تحت Linux Foundation في 2025.

### هل MCP بديل عن REST API؟

لا. غالبًا يستخدم MCP Server الـREST API نفسها خلف الكواليس. MCP يوفر واجهة معيارية موجهة إلى تطبيقات AI فوق الخدمات الموجودة.

### ما الفرق بين MCP وFunction Calling؟

Function Calling تسمح للنموذج بطلب استدعاء دالة، بينما MCP ينظم اكتشاف وربط واستخدام أدوات وموارد خارجية من Server مستقل. ويمكن استخدام الاثنين معًا.

### ما الفرق بين MCP وRAG؟

RAG تقنية لاسترجاع معلومات وإضافتها إلى سياق النموذج. MCP بروتوكول اتصال يمكن أن يعرض أداة RAG أو أدوات تنفيذية وأنواعًا أخرى من الموارد.

### ما هي طرق النقل الحديثة في MCP؟

يستخدم MCP `stdio` للخوادم المحلية وStreamable HTTP للخوادم الشبكية. النقل القديم HTTP+SSE أصبح Deprecated في مواصفة 2026.

### هل MCP آمن تلقائيًا؟

لا. يجب تطبيق Least Privilege والمصادقة والتفويض والموافقات والتحقق من المدخلات وعزل التنفيذ وحماية الأسرار. البروتوكول وحده لا يمنع Prompt Injection أو Tool misuse.

### هل OpenAI يدعم MCP؟

نعم. تدعم OpenAI خوادم MCP ضمن Responses API، مع خيارات للاتصال بالخوادم البعيدة، وتحديد الأدوات، وAuthorization وسياسات Approval، إضافة إلى Secure MCP Tunnel لبعض سيناريوهات الخوادم الخاصة.

### هل Google يدعم MCP؟

نعم. توثق Google استخدام MCP Servers مع Antigravity وخدمات Google Cloud، بما في ذلك خوادم محلية وبعيدة.

### هل يجب استخدام MCP في كل مشروع AI؟

لا. إذا كان لديك تكامل واحد بسيط وثابت فقد تكون API مباشرة أبسط. MCP يصبح أكثر قيمة عندما تحتاج عدة أدوات، أو عدة AI Hosts، أو قابلية إعادة استخدام وتوسع.

## المصادر والمراجع

1. Anthropic — Introducing the Model Context Protocol, Nov 25, 2024  
   https://www.anthropic.com/news/model-context-protocol

2. Anthropic — Donating MCP to the Agentic AI Foundation, Dec 9, 2025  
   https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation

3. Model Context Protocol — 2026-07-28 Specification release  
   https://blog.modelcontextprotocol.io/posts/2026-07-28/

4. Model Context Protocol — 2026 Roadmap update, Aug 22, 2026  
   https://blog.modelcontextprotocol.io/posts/mcp-roadmap/

5. MCP TypeScript SDK v2 — current 2026 specification implementation  
   https://ts.sdk.modelcontextprotocol.io/v2/

6. OpenAI — MCP servers with the Responses API  
   https://developers.openai.com/api/docs/guides/tools-connectors-mcp

7. OpenAI — Secure MCP Tunnel  
   https://developers.openai.com/api/docs/guides/secure-mcp-tunnels

8. Google Cloud — Configure MCP in an AI application  
   https://docs.cloud.google.com/mcp/configure-mcp-ai-application

9. Google Developers — Developer Knowledge MCP server / Antigravity integration  
   https://developers.google.com/knowledge/mcp

10. Google Codelabs — Antigravity MCP Servers  
    https://codelabs.developers.google.com/getting-started-google-antigravity

11. Anthropic — Claude Desktop Extensions / MCP Bundles  
    https://www.anthropic.com/engineering/desktop-extensions

12. Dify — Built-in two-way MCP support  
    https://dify.ai/blog/v1-6-0-built-in-two-way-mcp-support
