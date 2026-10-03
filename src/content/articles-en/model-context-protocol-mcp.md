<!--
FILE: 02-article.md
PURPOSE: Published article content
-->

SEO Title: What Is the MCP Protocol? How Does It Connect AI Models to Tools and Data?

Meta Description: A practical guide to understanding the Model Context Protocol (MCP): its architecture, tools, resources, and prompts, modern transports, security, and how it differs from APIs, Function Calling, and LangChain.

Suggested Slug: model-context-protocol-mcp

# What Is the MCP Protocol? How Does It Connect AI Models to Tools and Data?

**The Model Context Protocol (MCP) is an open standard that provides a unified way to connect AI applications to tools, data, and external systems.** Instead of building a different integration for every model and every service, a developer can create an MCP Server that exposes its capabilities in a standardized way, and MCP-capable applications can then connect to it to discover and use those capabilities.

The idea is best likened to a universal port for AI applications:

> The intelligent application knows how to speak MCP, and the server knows how to expose tools and data over MCP, so the amount of "glue code" required between the two sides shrinks.

MCP appeared in November 2024 when Anthropic introduced it as an open standard for connecting AI systems to data sources and tools. Adoption then expanded rapidly, and in December 2025 the project was donated to the **Agentic AI Foundation (AAIF)** under the Linux Foundation, with the goal of anchoring neutral, open governance for the project.

By 2026, MCP had become part of a large number of AI products, agents, and development environments, and it has been adopted by multiple platforms outside the Anthropic ecosystem.

## What Problem Is MCP Trying to Solve?

On its own, a language model usually cannot access:

- Your company's database.
- Files on your machine.
- GitHub.
- A CRM.
- A billing system.
- A calendar.
- An internal search engine.
- SaaS services.
- Code execution tools.
- Enterprise-internal APIs.

For the model to use these systems, a bridging layer must exist.

Before a common standard existed, integration often took the shape of:

```text
LLM A → Proprietary Integration → Service 1
LLM A → Proprietary Integration → Service 2
LLM B → Different Integration → Service 1
LLM B → Different Integration → Service 2
```

As the number of models and tools grows, the web of integrations becomes hard to maintain.

MCP instead tries to turn it into:

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

This does not eliminate APIs or databases; it adds a **standardized layer aimed at AI applications and agents** on top of them.

![A diagram comparing connecting three language models to three services through nine cross-cutting proprietary integrations, versus connecting them through a single MCP layer where each service corresponds to an MCP Server](/images/articles/body/model-context-protocol-mcp-1.avif "Without a common standard, every model needs a proprietary integration with every service (N × M); with MCP, it is enough for each side to speak the protocol once (N + M) — Illustration: Techno Enjaz")

# Is MCP a New API?

**It is not a replacement for the API in the traditional sense.**

If you have a REST API such as:

```text
GET /customers/123
POST /tickets
```

an MCP Server may use that API behind the scenes.

The difference is that MCP defines a uniform way for an AI application to:

- Discover what is available.
- Read tool descriptions.
- Learn the input schema.
- Invoke the tool.
- Receive the result.
- Access resources and context.
- Use prompts or additional capabilities the server supports.

So:

**REST/OpenAPI** describes an interface to a service or system.

**MCP** describes how AI applications communicate with servers that offer them tools and context.

And the two can work together.

# What Is the Difference Between MCP and Function Calling?

This is one of the most common questions.

## Function Calling

This is a capability inside a model or API that lets the model choose a function from a set of functions defined for it.

Example:

```text
get_weather(city)
send_email(to, subject, body)
```

But the developer usually remains responsible for:

- Defining the functions.
- Wiring them to services.
- Managing the connection.
- Returning results.
- Writing the integration.

## MCP

Unifies a larger portion of that stack.

A server can expose a set of tools and resources in a standardized way, and a compatible client can discover them and work with them.

In short:

> Function Calling defines how the model requests a function invocation, while MCP defines a broader interface for discovering, wiring, and using external capabilities between an AI application and an independent server.

And the two are not necessarily competitors; an MCP application may use the model's internal tool-calling mechanism to decide which tool from an MCP server should be invoked.

# What Is the Difference Between MCP and LangChain or LlamaIndex?

The difference lies in the architectural layer.

## LangChain

A framework for building applications and agents that rely on language models.

It may manage:

- Agents.
- Tools.
- Workflows.
- Model calls.
- Retrieval.
- State.

## LlamaIndex

A framework focused heavily on connecting AI models to data and building Retrieval/RAG systems and data agents.

## MCP

Is not a framework for building the entire application.

It is a **protocol/standard** defining how the application communicates with external services.

That is why an application built with LangChain or LlamaIndex can use MCP servers, rather than MCP being a replacement for them.

The conceptual difference:

```text
LangChain / LlamaIndex = How do I build the application?

MCP = How does the application talk to external tools and data in a standardized way?
```

# What Are the Components of MCP's Architecture?

MCP is usually explained through three primary roles:

## 1. MCP Host

The application the user interacts with, which consumes MCP capabilities.

Plausible examples:

- An intelligent assistant.
- A code editor.
- A desktop application.
- An Agent Platform.
- A custom application inside an enterprise.

The host decides how tools are presented to the model, how user approval is managed, and which data enters the context.

## 2. MCP Client

The component that speaks the MCP protocol with a server.

It handles tasks such as:

- Connecting.
- Negotiating the protocol version.
- Discovering capabilities.
- Sending requests.
- Receiving results.
- Handling errors.

A client may be an internal part of the host, so the user never sees it directly.

## 3. MCP Server

Exposes functions or data to the application.

It may wrap:

- A database.
- A SaaS API.
- A file system.
- A Git repository.
- A cloud service.
- An internal service.
- An analytics tool.
- A business system.

Very important:

> An MCP Server is not the language model itself.

It is a service that lets an AI application reach external capabilities in an organized way.

![MCP architecture diagram: a Host application containing the language model and three MCP Clients, each client connected over JSON-RPC to an MCP Server exposing Tools, Resources, and Prompts and wrapping a backend system](/images/articles/body/model-context-protocol-mcp-2.avif "The Host is the application the user deals with, and inside it sits an MCP client per server; the server is not the model but a layer exposing tools, resources, and prompts on top of a backend system — Illustration: Techno Enjaz")

# What Does an MCP Server Expose?

Among the most fundamental MCP concepts:

## Tools

Functions that can be invoked to perform an operation.

Such as:

```text
create_ticket
search_repository
run_query
send_message
generate_report
```

A tool typically includes:

- A name.
- A description.
- An input schema.
- Sometimes an output schema.
- Actual execution logic inside the server.

In the latest 2026 specification, Tool schemas now support the broader scope of JSON Schema 2020-12, making the description of inputs and outputs more flexible.

## Resources

Data or content the application can access.

Such as:

- A file.
- Documentation.
- A record.
- A database schema.
- Project content.

Resources are best thought of as readable context rather than executable actions.

## Prompts

Prompt templates or flows a server provides so the client can present or use them.

These can be useful when the server wants to offer a ready-made linguistic workflow tied to its tools or data.

But prompts must not be treated as security instructions trusted automatically; the host is responsible for how any external instruction is merged into the model's context.

# How Does Tool Invocation Work over MCP?

The process can be simplified as follows:

1. The application receives the user's question.
2. The Host/Model recognizes the need for an external capability.
3. The Client knows the tools available from the MCP Server.
4. The model or application logic selects a suitable tool.
5. The Host may request the user's approval if the operation is sensitive.
6. The Client sends a Tool Call request.
7. The MCP Server executes the operation.
8. The Server returns the result.
9. The application adds the result to the context.
10. The model generates a final response or continues with further steps.

Example:

The user:

> "Show me the last three open support tickets for customer X."

Instead of the model guessing:

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

MCP's value here is not that the model "somehow knows about tickets"; it is that access to them now flows through an organized, reusable interface.

![Sequence diagram of a tool invocation over MCP between the user, the Host, the client, the server, and the support system's interface, from the question and tool discovery to the final answer](/images/articles/body/model-context-protocol-mcp-3.avif "The ten steps of a tool call: tool discovery, model selection, user approval when needed, then tools/call and server execution, and an organized result returning to the context — Illustration: Techno Enjaz")

# Does MCP Use JSON-RPC?

Yes — MCP uses structured messages based on **JSON-RPC 2.0**.

But note that the details of the connection lifecycle evolved across protocol versions.

Articles describing MCP in early 2025 may differ technically from the 2026 specification.

# What Is the Latest Major MCP Release in 2026?

On **July 28, 2026**, MCP specification version `2026-07-28` was released — one of the largest updates since the protocol launched.

One of the most significant changes is a shift of the protocol's HTTP core toward a more **Stateless request/response** model.

The operational benefits:

- Easier placement of servers behind load balancers.
- Less dependence on sticky sessions.
- Improved scalability.
- Making each request more self-contained.
- Easier routing and authorization at the infrastructure level.

The release also added:

- Header-based routing.
- Authorization improvements.
- Cache hints for tool/prompt/resource lists.
- An extensions framework.
- Changes to long-running operations and multi-turn interactions.

This is a crucial point when reading old tutorials: **MCP has evolved quickly, so always verify which protocol version an example targets.**

# What Are MCP's Current Transports?

## stdio

Especially suitable when a host runs a local MCP server as a child process.

Communication happens over:

- stdin.
- stdout.

This is common for local tools and code editors.

Its advantages:

- Simple locally.
- No network port needed.
- Suitable for local tools.

But the server gets the level of access its operating system and execution environment grant it, so running an untrusted server locally can be a risk.

## Streamable HTTP

The modern path for remote servers.

It allows the use of ordinary HTTP infrastructure with streaming support when needed.

And in specification `2026-07-28`, the architecture became more stateless at the protocol level.

![A comparison between stdio transport, where the Host runs the MCP server as a child process on the same machine, and Streamable HTTP transport, where requests pass through a gateway to remote servers](/images/articles/body/model-context-protocol-mcp-4.avif "stdio: a local server as a child process exchanging messages over stdin/stdout with no network port. Streamable HTTP: independent requests that can be routed through a gateway and load balancer, while legacy HTTP+SSE is now deprecated — Illustration: Techno Enjaz")

## What About HTTP + SSE?

This point needs an update in many older explainers.

The legacy transport built on HTTP+SSE was used in earlier versions, but in the latest specification the **legacy HTTP+SSE transport is deprecated**, with a transition period.

So when building a new integration in 2026, legacy HTTP+SSE should not be presented as the modern primary path.

# What Else Changed in MCP in 2026 Beyond Transport?

Several important changes.

## Header-based routing

Modern Streamable HTTP requests carry information such as Method/Name in standard headers, which helps:

- Gateways.
- WAFs.
- Load balancers.
- Rate limiting.
- Authorization layers.

make decisions without full parsing of the body every time.

## Cacheable lists

Results such as:

- tools/list
- prompts/list
- resources/list
- resources/read

can include caching information, reducing needless re-fetching of lists.

## Authorization hardening

The specification became stricter about some OAuth details, Issuer validation, and credential isolation between authorization servers.

## Extensions

There is now an official framework for extensions instead of pushing every new feature into Core.

Examples:

- Tasks.
- MCP Apps.
- Enterprise-oriented extensions.

## Deprecated features

In the 2026 release, features such as:

- Roots.
- Sampling.
- Logging.

were put on a deprecation path within Core, with replacements and newer directions.

This does not mean they vanish immediately; there is a deprecation policy and a compatibility period, but it does mean new projects should read the current specification rather than rely on old examples.

# Does MCP Automatically Make an AI System Secure?

**No.**

This is one of the most important points to understand.

MCP unifies the way systems communicate, but it does not automatically solve:

- Poorly designed permissions.
- Prompt injection.
- Tool misuse.
- Secret leakage.
- Dangerous command execution.
- Untrusted servers.
- Misleading schemas.
- Malicious tool results.
- Confused deputy problems.
- Excessive permissions.

If you give a tool:

```text
delete_all_customer_data()
```

full permissions, MCP will not make it safe merely because it is exposed through a standardized protocol.

Security is a shared responsibility among:

- The Host.
- The Client.
- The Server.
- The Identity Provider.
- The backend tool.
- The developer.
- The user or organization.

# What Are MCP's Key Security Practices?

## 1. Least Privilege

Give every server and tool the fewest permissions possible.

Do not give a read tool:

- Write permission.
- Admin permission.
- Access to every tenant.

If it only needs to read tickets, do not grant it the right to delete accounts.

## 2. Separate Reading from Writing

It is better to design tools such as:

```text
get_customer
list_invoices
```

separately from:

```text
refund_invoice
delete_customer
```

so the Host can apply different approval policies.

## 3. Require User Approval for Sensitive Operations

Before:

- Sending email.
- Publishing content.
- Deleting a file.
- Moving money.
- Creating a user.
- Modifying production.

the Host can demand explicit confirmation.

OpenAI, for example, supports an approval pattern for sensitive tool requests in its MCP integration within the Responses API, instead of allowing every tool without review.

## 4. Do Not Trust a Tool's Description Alone

The tool description comes from the server.

If the server is untrusted, it may present a tool with a misleading description.

Treat MCP servers like any software dependency:

- Verify the source.
- Review the code or the vendor.
- Pin versions when needed.
- Monitor updates.
- Never install random servers with broad permissions.

## 5. Validate All Inputs

An MCP tool is not exempt from traditional security rules.

You must prevent:

- SQL injection.
- Command injection.
- Path traversal.
- SSRF.
- Unsafe deserialization.

## 6. Keep Credentials and Secrets Separated

Never place API keys inside a prompt.

Use:

- Secret managers.
- OAuth.
- Scoped tokens.
- Short-lived credentials.

## 7. Log Impactful Operations

Preferably keep an audit trail showing:

- Who requested the action?
- Which tool was used?
- When?
- With what parameters?
- What was the result?
- Was user approval obtained?

without storing sensitive information unnecessarily.

## 8. Apply Rate Limits

The model may invoke a tool repeatedly.

Use:

- Limits.
- Quotas.
- Budgets.
- Timeouts.
- Idempotency where necessary.

## 9. Treat Tool Output as Untrusted Data

If a server fetches content from the internet or an external document, it may contain prompt injection.

Not every sentence inside tool output should turn into higher-authority instructions.

## 10. Isolate Execution

If a tool executes code or system commands:

- Container.
- Sandbox.
- Filesystem restrictions.
- Network restrictions.
- CPU/Memory limits.

But **sandboxing is not something MCP does automatically**; the application and the server must provide these boundaries.

# How Does Authentication Work in MCP?

With remote MCP over HTTP, OAuth can enter the access flow.

The general idea:

1. The MCP Server acts as the Resource Server.
2. The Client discovers the authorization requirements.
3. The user/application obtains a token from a suitable Authorization Server.
4. The Server validates the token.
5. Permissions are constrained by scopes and identity.

In the 2026 release, authorization requirements were strengthened, including Issuer validation and preventing the improper reuse of credentials across authorization servers.

The key principle for developers:

> Authentication answers "who are you?", while authorization answers "what are you allowed to do?".

A successful login does not mean a tool should get every permission.

# Is MCP Exclusive to Claude?

No.

Although Anthropic introduced MCP in 2024, the protocol has become a much broader standard.

It was donated in December 2025 to the Agentic AI Foundation under the Linux Foundation, and it is now used across multiple companies and products.

Current examples:

- Claude and Claude Desktop/Code.
- The OpenAI API and products supporting MCP.
- Google Antigravity.
- Visual Studio Code and other editors/agents.
- Dify.
- Enterprise and custom applications.

This is why MCP should no longer be described today as "Claude's protocol."

# How Does OpenAI Use MCP Today?

OpenAI supports MCP within the **Responses API** through a tool of type `mcp`.

The application can connect a remote MCP Server using a Server URL, and mechanisms exist to reach private servers or servers behind a firewall via Secure MCP Tunnel in supported products.

You can specify:

- The server.
- The allowed tools.
- Authorization.
- The approval policy.

This is an important illustration of the protocol's value: the same server can be consumed from different AI environments if they support MCP, instead of building a proprietary connector per vendor.

# How Does Claude Use MCP?

Claude Desktop was among the first environments to support MCP.

The experience later evolved with **Desktop Extensions / MCP Bundles** to ease installing local servers, instead of asking users to hand-edit config files every time.

The Anthropic stack and its API also support connecting to MCP servers in different scenarios.

The value is not "magical memory" inside Claude; it is that MCP lets Claude be wired to external services that can provide:

- Files.
- Search.
- Databases.
- Tools.
- Memory stores.

The memory itself comes from the external system, not from MCP as a database.

# What About Google Antigravity?

Google documents support for **local and remote MCP Servers** inside Antigravity.

A developer can wire an agent environment to Google/Google Cloud servers or other servers, and use MCP to provide external tools and context.

This is clearer evidence than the claim that "MCP improved Antigravity's accuracy by some percentage"; the support is documented, while the magnitude of any accuracy or productivity gain requires an independent measurement study.

# What About Dify?

Dify added MCP support gradually and then shipped native two-way support:

- Using MCP Servers as tools inside agents/workflows.
- Exposing Dify applications or workflows as an MCP Server for external clients.

This makes Dify a good example of the protocol working in both directions:

```text
Dify → MCP Client → External Server
```

or:

```text
External Client → MCP → Dify App/Workflow
```

But always verify the **protocol version** supported by the specific Dify release, because MCP itself changes quickly.

# Is MCP the Same as RAG?

No.

## RAG

Retrieves information relevant to the question and places it into the model's context.

Example:

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

Is a general connectivity standard.

An MCP server can expose a tool that performs a RAG search.

But it can also:

- Create an issue.
- Run a query.
- Send a message.
- Read a file.
- Trigger a workflow.

So RAG is a pattern/technique, while MCP is a protocol that can carry capabilities including RAG and much else.

# Is MCP an Agent Framework?

No.

MCP by itself does not define:

- A plan.
- A memory policy.
- A reasoning loop.
- A retry strategy.
- Multi-agent orchestration.
- Goal decomposition.

These are the responsibility of an agent framework or the host.

MCP gives an agent a standardized way to reach the outside world.

# When Do You Actually Need MCP?

MCP is useful when:

- You have multiple tools and data sources.
- You want to support more than one AI host.
- You want to separate integration logic from the application.
- You are building an ecosystem of reusable tools.
- You need tool discovery.
- You want to swap the model without rebuilding every connector.
- You want to publish an AI service that multiple clients can consume.

# When Might You Not Need MCP?

Direct integration may be simpler if:

- You have only one tool.
- The application is small and static.
- You do not need interoperability.
- The external service has an excellent direct SDK.
- There is no chance of reusing the connector.
- Adding MCP would add an operational layer with no clear value.

A good standard does not mean it belongs in every project.

# An Architectural Example Inside a Company

Suppose the organization wants an assistant that can:

- Search documentation.
- Read the CRM.
- Create a support ticket.
- Run a sales report.

You could build:

```text
AI Assistant
│
├── MCP Client → Documents MCP Server
├── MCP Client → CRM MCP Server
├── MCP Client → Support MCP Server
└── MCP Client → Analytics MCP Server
```

Each server can have:

- Its own authentication.
- Its own scopes.
- Independent logging.
- Rate limits.
- A team responsible for it.

And this is organizationally better than giving a single model unified credentials that reach directly into every system.

# How Do You Design a Good MCP Tool?

A good tool should be:

## Specific

Better:

```text
get_invoice(invoice_id)
```

than:

```text
do_accounting_task(text)
```

The clearer the function, the easier validation and permissions become.

## Precisely Schematized

Define:

- Types.
- Required fields.
- Enums where possible.
- Value bounds.
- Output structure.

## A Clear, Non-Marketing Description

The model should know:

- What does it do?
- What does it not do?
- When to use it?
- What side effects exist?

## Idempotent Where Possible

Re-reading a file is usually safe.

"Send Payment" needs more careful design to prevent unintended repetition.

## Separating Preview from Execute

For sensitive operations:

```text
preview_refund()
execute_refund()
```

may beat one tool that executes directly.

# What Are Common MCP Design Mistakes?

## One Server with Every Permission

It becomes a major risk point.

## Overly General Tools

Such as:

```text
run_any_sql(query)
```

without constraints.

In many systems, narrower operations or a read-only query layer is better.

## Passing Secrets Inside Context

The model does not need to see the API key to use a tool.

## Trusting External Tool Data

External content may be malicious.

## No Approval Step

Especially for operations that change the outside world.

## Confusing Protocol Security with Application Security

Having OAuth does not protect you from a tool with bad logic.

## Relying on an Old Tutorial

MCP has evolved quickly, especially transport and the protocol lifecycle in 2026.

# What Should Be Watched in MCP Going Forward?

The roadmap published in August 2026 points to continued focus on:

- Scalability.
- Enterprise readiness.
- Agent communication.
- Governance.
- Extensions.
- Authorization improvements.
- More mature operations on enterprise infrastructure.

Any technical article about MCP should be treated as content that needs periodic refreshes; the protocol is still evolving faster than mature networking technologies like HTTP or SMTP.

# Conclusion

The Model Context Protocol does not make the model smarter by itself, does not replace APIs, and does not build a complete agent.

Its core value is **standardizing how AI applications connect to external tools and data**.

It can be summarized as:

```text
LLM = understands, generates, and decides when it needs an external capability

MCP = provides a standard communication language for reaching that capability

MCP Server = defines and executes the external capabilities

Host = coordinates the model, permissions, the user, and the context
```

where the language model generates the tool invocation request step by step based on [next-token prediction in language models](#article/next-token-prediction).

The biggest change in 2026 is that MCP is no longer a nascent experiment from one company; it became a widely adopted standard that moved to independent governance, with its specification evolving toward more scalable Streamable HTTP and a stateless protocol-level core, plus major improvements in authorization and extensions.

But standardization is not a synonym for security.

MCP's success in a production environment depends on:

- Least privilege.
- Authentication & authorization.
- Human approvals.
- Validation.
- Isolation.
- Auditability.
- Server trust.
- Version management.
- And never giving the model more than it needs.

## Sources and References

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
