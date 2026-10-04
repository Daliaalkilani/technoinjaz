<!--
FILE: 02-article.md
PURPOSE: Published article content
-->

SEO Title: What Is the MCP Protocol? How Does It Connect AI Models to Tools and Data?

Meta Description: A practical guide to understanding the Model Context Protocol (MCP): its architecture, tools, resources, and prompts, modern transports, security, and how it differs from APIs, Function Calling, and LangChain.

Suggested Slug: model-context-protocol-mcp

# What Is the MCP Protocol? How Does It Connect AI Models to Tools and Data?

**The Model Context Protocol (MCP) is an open standard that provides a unified way to connect AI applications to tools, data, and external systems.** Instead of building a different integration for every model and every service, a developer can create an MCP Server that exposes its capabilities in a standardized way, so that MCP-capable applications can connect to it, discover those capabilities, and use them.

The idea can be likened to a universal port for AI applications:

> The AI application knows how to speak MCP, and the server knows how to expose tools and data via MCP, so the amount of "glue code" needed between the two shrinks.

MCP appeared in November 2024, when Anthropic introduced it as an open standard for connecting AI systems to data sources and tools, and its adoption then spread quickly. In December 2025, the project was donated to the Linux Foundation's **Agentic AI Foundation (AAIF)**, with the aim of establishing neutral, open governance for it. By 2026, MCP was in use across a large number of AI products, agents, and development environments, and multiple platforms outside the Anthropic ecosystem had adopted it.

## The Problem MCP Tries to Solve

A language model alone usually cannot directly access your company's database, the files on your machine, GitHub, a CRM, the billing system, the calendar, an internal search engine, SaaS services, code execution tools, or the organization's private APIs. For the model to use these systems, there must be a connection layer.

Before a shared standard emerged, integration was built in a handcrafted way: every language model needed its own integration with every service, written in the project's language and with its team's assumptions. Model A connects to the documents service through a connector its team wrote, and to the billing system through another connector of entirely different design; then model B arrives and needs both bridges rebuilt from scratch with a third and fourth interface. The result is a web of crisscrossing integrations whose size equals the number of models multiplied by the number of services, each strand with its own release history, security vulnerabilities, and maintenance cycle. As models and tools multiply, this web swells until adding a single service becomes an enterprise project in its own right.

MCP flips the equation through a single unified intermediate layer: each AI application talks to external services through an **MCP Client** the developer embeds in the application, each data or tool provider exposes its capabilities through an **MCP Server** that follows the protocol, and the conversation between the two runs over the **MCP protocol**, which standardizes the format for discovering capabilities, invoking tools, and reading resources. Complexity thus turns from a product into a sum: each side adopts the standard only once, so new services appear to every model without modification, and new models reach every existing service without building special bridges.

This does not eliminate APIs or databases; it adds on top of them **a standardized layer oriented toward AI applications and agents**.

![A diagram comparing connecting three language models to three services through nine cross-cutting proprietary integrations, versus connecting them through a single MCP layer where each service corresponds to an MCP Server](/images/articles/body/model-context-protocol-mcp-1.avif "Without a common standard, every model needs a proprietary integration with every service (N × M); with MCP, it is enough for each side to speak the protocol once (N + M) — Illustration: Techno Enjaz")

## MCP Versus What Resembles It

MCP is often confused with technologies that sit in different layers, and distinguishing among them is a prerequisite for understanding its real role.

### Is MCP a New API?

**It is not a replacement for an API in the traditional sense.** If you have a REST API offering operations such as fetching customer 123's data via `GET /customers/123` or creating a ticket via `POST /tickets`, an MCP Server may use that API behind the scenes.

The difference is that MCP defines a unified way for an AI application to discover what is available, read tool descriptions, learn the input schema, invoke the tool, receive the result, access resources and context, and use the prompts or extra capabilities the server supports. **REST/OpenAPI** describes the interface of a service or system, while **MCP** describes how AI applications communicate with servers that offer them tools and context, and the two can work together.

### MCP and Function Calling

This is one of the most common questions. **Function Calling** is a capability within a model or its API that lets the model choose a function from a set of functions defined for it, such as `get_weather(city)` or `send_email(to, subject, body)`. But the developer usually remains responsible for defining the functions, wiring them to services, managing the connection, returning the results, and writing the integration.

**MCP** standardizes a larger part of this system: the server exposes a set of tools and resources in a standardized way, and any compatible client can discover and work with them. In short:

> Function Calling defines how the model requests a function invocation, while MCP defines a broader interface for discovering, connecting, and using external capabilities between an AI application and an independent server.

And they are not necessarily competitors; an MCP application may use the model's Tool Calling mechanism to decide which tool from an MCP server to invoke.

### MCP, LangChain, and LlamaIndex

The difference here lies in the architectural layer. **LangChain** is a framework for building applications and agents based on language models, and may manage agents, tools, workflows, model calls, retrieval, and state. **LlamaIndex** is a framework that focuses heavily on connecting AI models to data and building Retrieval/RAG systems and data agents. **MCP**, by contrast, is not a framework for building the whole application, but a **Protocol / Standard** that defines how the application communicates with external services.

That is why an application built with LangChain or LlamaIndex can use MCP servers, rather than MCP being a replacement for them. The two frameworks answer the question "How do I build the application?", while MCP answers "How does the application talk to external tools and data in a standardized way?"

### MCP and RAG

**RAG** retrieves information related to the question and places it into the model's context. In its typical path, the question enters a **vector search** over an embedding space, the **semantically closest documents** are retrieved and injected into the language model's context, and the model formulates its answer from them. The whole pattern revolves around filling the context with relevant content before generation, and goes no further.

**MCP**, on the other hand, is a general communication standard: an MCP server can expose a tool that performs a RAG search, but it can also create an issue, run a query, send a message, read a file, or trigger a workflow. RAG is a pattern or technique, while MCP is a protocol capable of carrying capabilities that include RAG and much more.

### Is MCP an Agent Framework?

No. MCP alone does not define the plan, the memory policy, the reasoning loop, the retry strategy, multi-agent orchestration, or goal decomposition; all of these are the responsibility of the agent framework or the host. What MCP gives an agent is a standardized way to reach the outside world.

## MCP Architecture: Three Roles

MCP is usually explained through three main roles.

### The Host (MCP Host)

This is the application the user interacts with and that uses MCP capabilities, whether an AI assistant, a code editor, a desktop application, an agent platform, or a custom application within an organization. The host is what decides how tools are presented to the model, how user approval is managed, and what data enters the context.

### The Client (MCP Client)

This is the component that speaks the MCP protocol with the server, handling the connection, protocol version negotiation, capability discovery, sending requests, receiving results, and error handling. The client may be an internal part of the host that the user never sees directly.

### The Server (MCP Server)

It exposes functions or data to the application, and may wrap a database, a SaaS API, a file system, a Git repository, a cloud service, an internal service, an analytics tool, or a business system. And here is a crucial point:

> An MCP Server is not the language model itself.

It is a service that lets an AI application access external capabilities in an organized way.

![MCP architecture diagram: a Host application containing the language model and three MCP Clients, each client connected over JSON-RPC to an MCP Server exposing Tools, Resources, and Prompts and wrapping a backend system](/images/articles/body/model-context-protocol-mcp-2.avif "The Host is the application the user deals with, and inside it sits an MCP client per server; the server is not the model but a layer exposing tools, resources, and prompts on top of a backend system — Illustration: Techno Enjaz")

## What Does an MCP Server Expose?

A server offers three basic kinds of capabilities, which are among the most important concepts in MCP.

### Tools

Callable functions that perform an operation, such as creating a ticket (`create_ticket`), searching a repository (`search_repository`), running a query (`run_query`), sending a message (`send_message`), or generating a report (`generate_report`). A tool usually contains a name, a description, an input schema, sometimes an output schema, and actual execution logic inside the server. In the latest 2026 specification, tool schemas support a wider range of JSON Schema 2020-12, giving input and output descriptions more flexibility.

### Resources

Data or content the application can access, such as a file, documentation, a log, a database schema, or project content. Resources can be thought of as readable context rather than executable actions.

### Prompts

Prompt templates or flows the server provides for the client to display or use, useful when the server wants to offer a ready-made language workflow tied to its tools or data. But these prompts must not be treated as automatically trusted security instructions; the host is responsible for how any external instructions are merged into the model's context.

## How Does a Tool Invocation Work over MCP?

The process follows a clear sequence: the application receives the user's question, the host or model recognizes the need for an external capability, the client knows the tools available on the MCP server, and the model or application logic selects the appropriate tool. The host may ask for the user's approval if the operation is sensitive, then the client sends the tool call request, the server executes the operation and returns the result, the application adds it to the context, and the model generates a final response or continues with further steps.

Take, for example, a user who asks: "Show me the last three open support tickets for customer X." Instead of the model guessing, the request travels an organized path: the user asks the host, which selects the appropriate tool, `search_support_tickets`, and invokes it through the MCP client; the request reaches the server, which translates it into a call to the support system's API. The result returns as structured data that enters the model's context, and the model formulates it into a readable answer. At every link in this chain, an interface with defined behavior is at work, not free guessing.

MCP's value here is not that the model "now knows the tickets," but that access to them now runs through an organized, reusable interface.

![Sequence diagram of a tool invocation over MCP between the user, the Host, the client, the server, and the support system's interface, from the question and tool discovery to the final answer](/images/articles/body/model-context-protocol-mcp-3.avif "The ten steps of a tool call: tool discovery, model selection, user approval when needed, then tools/call and server execution, and an organized result returning to the context — Illustration: Techno Enjaz")

## The Protocol and Its Transports

### Does MCP Use JSON-RPC?

Yes, MCP uses structured messages built on **JSON-RPC 2.0**. But the details of the connection lifecycle have evolved with protocol releases, and articles that described MCP in early 2025 may differ technically from the current specification in 2026.

### The Most Important Release of 2026

On **July 28, 2026**, the `2026-07-28` specification was released, one of the biggest updates since the protocol's launch. Among its most important changes is the protocol core over HTTP moving further toward a **stateless request/response** model, which makes it easier to place servers behind load balancers, reduces reliance on sticky sessions, improves scalability, makes each request more independent, and simplifies routing and authorization in the infrastructure.

The release also added header-based routing, authorization improvements, cache hints for tool, prompt, and resource lists, an extensions framework, and changes to long-running operations and multi-turn interactions. This is critically important when reading older tutorials: **MCP is evolving fast, so always check which Protocol Version an example targets.**

### The stdio Transport

This transport suits especially cases where the host runs the MCP server locally as a child process, with communication over stdin and stdout. It is common in local tools and code editors, and its advantages are local simplicity and no need to open a network port. But the server receives whatever level of access the operating system and its launch environment grant it, so running an untrusted server locally can be dangerous.

### The Streamable HTTP Transport

This is the modern path for remote servers, allowing ordinary HTTP infrastructure to be used with streaming support when needed, and in the `2026-07-28` specification its structure became more stateless at the protocol level.

![A comparison between stdio transport, where the Host runs the MCP server as a child process on the same machine, and Streamable HTTP transport, where requests pass through a gateway to remote servers](/images/articles/body/model-context-protocol-mcp-4.avif "stdio: a local server as a child process exchanging messages over stdin/stdout with no network port. Streamable HTTP: independent requests that can be routed through a gateway and load balancer, while legacy HTTP+SSE is now deprecated — Illustration: Techno Enjaz")

### What About HTTP + SSE?

This is a point many older explainers need to update. The HTTP+SSE-based transport was used in earlier releases, but in the latest specification the **Legacy HTTP+SSE transport is deprecated**, with a transition period. So when building a new integration in 2026, legacy HTTP+SSE should not be presented as the main modern path.

## What Else Changed in MCP 2026 Besides Transport?

### Header-Based Routing

Modern Streamable HTTP requests carry information such as the method and name in standardized headers, helping gateways, web application firewalls (WAF), load balancers, rate limiters, and authorization layers make decisions without fully parsing the request body every time.

### Cacheable Lists

Results of operations such as tools/list, prompts/list, resources/list, and resources/read can include caching information, reducing needless re-fetching of lists.

### Authorization Hardening

The specification became stricter in some details of OAuth, issuer validation, and credential isolation between authorization servers.

### Extensions

The protocol now has an official extensions framework instead of pushing every new feature into the core, with examples such as Tasks, MCP Apps, and enterprise-oriented extensions.

### Features on the Deprecation Path

In the 2026 release, features such as Roots, Sampling, and Logging were placed on a deprecation path within the core, with newer alternatives and directions. This does not mean they disappear immediately; there is a deprecation policy and a compatibility period, but it does mean new projects should read the current specification instead of relying on old examples.

## Security: Standardization Is Not Protection

### Does MCP Make an AI System Secure Automatically?

**No**, and this is one of the most important points of all. MCP standardizes the way of communicating, but it does not automatically solve poor permission design, prompt injection, tool misuse, secret leakage, execution of dangerous commands, untrusted servers, misleading schemas, malicious tool results, confused deputy problems, or excessive permissions.

If you give a tool like `delete_all_customer_data()` full permissions, MCP will not make it safe merely because it is exposed through a standard protocol. Security is a shared responsibility among the host, the client, the server, the identity provider, the backend tool, the developer, and the user or organization.

### The Most Important MCP Security Practices

| Practice | What It Means in Practice |
|---|---|
| Least Privilege | Give each server and tool the fewest permissions possible; a read tool does not need write, admin, or access to every tenant, and a tool that reads tickets does not need permission to delete accounts |
| Separate reading from writing | Keep tools like `get_customer` and `list_invoices` separate from `refund_invoice` and `delete_customer`, so the host can apply different approval policies |
| User approval for sensitive operations | Before sending an email, publishing content, deleting a file, transferring money, creating a user, or modifying production, the host asks for clear confirmation |
| Do not trust a tool's description alone | The description comes from the server and may be misleading if the server is untrusted; treat servers like any software dependency: verify the source, review the code or vendor, pin versions where needed, and monitor updates |
| Validate all inputs | MCP tools are not exempt from traditional security rules; prevent SQL injection, command injection, path traversal, SSRF, and unsafe deserialization |
| Separate authentication secrets | Do not put API keys in the prompt; use secret managers, OAuth, and scoped, short-lived tokens |
| Log impactful operations | An audit trail showing who requested the action, with which tool, when, with what parameters, what the result was, and whether the user approved, without storing sensitive information needlessly |
| Set rate limits | The model may call a tool many times; use limits, quotas, budgets, timeouts, and idempotency where needed |
| Treat tool output as untrusted data | Content fetched from the internet or an external document may carry prompt injection, so not every sentence in it should become higher-authority instructions |
| Isolate execution | Tools that run code or system commands need containers, sandboxes, and restrictions on the file system, network, CPU, and memory |

As an example of the third practice, OpenAI supports, in its MCP integration within the Responses API, an approval mode for sensitive tool requests instead of allowing every tool without review. As for the last practice, **sandboxing is not something MCP does automatically**; the application and server must provide these boundaries.

### How Does Authentication Work in MCP?

In remote MCP over HTTP, OAuth can enter the access process. The general idea is that the MCP server acts as a resource server; the client discovers the authorization requirements, the user or application obtains a token from an appropriate authorization server, the server validates it, and permissions are restricted by scopes and identity. The 2026 release strengthened authorization requirements, including issuer validation and preventing credentials from being reused across authorization servers improperly. The key principle for developers:

> Authentication answers "Who are you?", while Authorization answers "What are you allowed to do?"

A successful login does not mean a tool should receive every permission.

## The Adoption Ecosystem: Who Uses MCP Today?

### Is MCP Only for Claude?

No. Although Anthropic originally introduced MCP in 2024, the protocol has become a much broader standard, especially after it was donated in December 2025 to the Agentic AI Foundation under the Linux Foundation. Current examples of its use include Claude and Claude Desktop/Code, the OpenAI API and products that support MCP, Google Antigravity, Visual Studio Code and other editors and agents, Dify, and enterprise and custom applications. That is why MCP should no longer be described as "the Claude protocol."

### How Does OpenAI Use MCP?

OpenAI supports MCP within the **Responses API** through a tool of type `mcp`. An application can connect a remote MCP server via its Server URL, and there are mechanisms for connecting to private servers or servers behind a firewall through the Secure MCP Tunnel in supported products. The server, the allowed tools, authorization, and the approval policy can all be specified. This is a clear example of the protocol's value: the same server can be consumed by different AI environments as long as they support MCP, instead of building a custom connector for every provider.

### How Does Claude Use MCP?

Claude Desktop was among the first environments to support MCP, and the experience later evolved with **Desktop Extensions / MCP Bundles**, making it easier to install local servers instead of asking users to edit configuration files by hand every time. Anthropic's platform and API also support connecting to MCP servers in various scenarios.

The value here is not some "magic memory" inside Claude, but that MCP allows it to be connected to external services that can provide files, search, databases, tools, and memory stores; the memory itself comes from the external system, not from MCP acting as a database.

### What About Google Antigravity?

Google documents support for **local and remote MCP servers** within Antigravity, so a developer can connect the agent environment to Google/Google Cloud servers or other servers and use MCP to provide external tools and context. This is a clearer example than claiming that "MCP increased Antigravity's accuracy by some percentage"; the support is documented, while the size of any accuracy or productivity gain requires an independent measurement study.

### What About Dify?

Dify added MCP support gradually and then introduced native support in two directions: using MCP servers as tools inside agents and workflows, and exposing Dify apps or workflows as an MCP server for external clients to consume. Dify thus becomes a good example of the protocol working in both directions: sometimes Dify is a client reaching an external server via MCP, and sometimes an external client reaches a Dify app or workflow via MCP. But you must always check the **Protocol Version** that a given Dify release supports, because MCP itself changes quickly.

## When Do You Actually Need MCP?

| MCP Is Useful When | A Direct Integration May Be Simpler When |
|---|---|
| You have several tools and data sources | You have only one tool |
| You want to support more than one AI host | The application is small and static |
| You want to separate integration logic from the application | You do not need interoperability |
| You are building an ecosystem of reusable tools | The external service has an excellent direct SDK |
| You need tool discovery | There is no chance the connector will be reused |
| You want to swap the model without rebuilding every connector | Adding MCP would add an operational layer with no clear value |
| You want to publish an AI service that multiple clients can use | |

A good standard does not mean it must be used in every project.

## An Architectural Example of a Company Project

Suppose an organization wants an assistant that can search documents, read the CRM, create a support ticket, and run a sales report.

This assistant can be built with a multi-server MCP architecture: among its components, the assistant contains one or more **MCP Clients**, and each client connects to a dedicated **MCP Server** for one part of the system: a documents server enabling search and reading, a CRM server exposing customer data, a support system server enabling ticket creation, and an analytics server running sales reports. When the user asks "Open a ticket for customer so-and-so and include their sales report," the assistant discovers through the protocol which server holds the needed tools, invokes the ticketing tool from the support server and the reporting tool from the analytics server, and combines the results into a single answer.

The real value of this separation shows in governance: each server can have its own **authentication** mechanism suited to its service's sensitivity, tightly set **scopes** granting the least privilege possible, independent **logging** that makes it easy to trace who did what and when, and **rate limits** protecting backend systems from abuse, plus a clearly **responsible team** for operating and developing it.

This organization is better engineering than giving a single model unified credentials that reach every system directly, because any breach or error remains confined to a single server's scope instead of spreading to the whole system.

## How Do You Design a Good MCP Tool?

### Specific

The tool `get_invoice(invoice_id)` is better than `do_accounting_task(text)`; the clearer the function, the easier it is to validate and to scope its permissions.

### With a Precise Schema

Define the types, the required fields, enumerated values (Enum) where possible, value ranges, and the output structure.

### With a Clear, Non-Promotional Description

From the description, the model should know what the tool does, what it does not do, when it should be used, and what its side effects are.

### Idempotent Where Possible

Re-reading a file is usually safe, but an operation like "Send Payment" needs more careful design to prevent unintended duplication.

### Separating Preview from Execution

For sensitive operations, separating a preview tool such as `preview_refund()` from an execution tool such as `execute_refund()` may be better than a single tool that executes directly.

## Common MCP Design Mistakes

| Mistake | Why It Is Dangerous |
|---|---|
| One server with every permission | It becomes a major point of risk |
| An overly generic tool such as `run_any_sql(query)` without restrictions | In many systems it is better to expose narrower operations or a read-only query layer |
| Passing secrets into the context | The model does not need to see an API key to use a tool |
| Trusting external tool data | External content may be malicious |
| No approval step | Especially for operations that change the outside world |
| Confusing protocol security with application security | Having OAuth does not protect you from a tool with bad logic |
| Relying on an old tutorial | MCP has evolved quickly, especially in transport and the protocol lifecycle in 2026 |

## What Should Be Watched in the Coming Period?

The roadmap published in August 2026 points to a continued focus on scalability, enterprise readiness, agent communication, governance, extensions, authorization improvements, and more mature operation on enterprise infrastructure. Any technical article about MCP should therefore be treated as content that needs periodic refreshing; the protocol is still evolving faster than mature network technologies such as HTTP or SMTP.

## Conclusion

The Model Context Protocol does not make the model smarter in itself, does not replace APIs, and does not build a complete agent. Its core value is **standardizing the way AI applications connect to external tools and data**.

The system is easiest to grasp through the division of roles within it: the language model understands the context, generates the answer, and decides when its task needs an external capability; the MCP protocol provides the standard communication language through which the model reaches that capability; the MCP Server defines the external capabilities and actually executes them behind a uniform interface; and the host orchestrates the whole scene, from managing the model and permissions to the user experience and the shared context. The language model generates the tool invocation request step by step based on [next-token prediction in language models](#article/next-token-prediction).

The most important change in 2026 is that MCP is no longer a nascent experiment from a single company, but a widely adopted standard that moved to independent governance, with its specification evolving toward a more scalable Streamable HTTP and a stateless core at the protocol level, along with major improvements in authorization and extensions.

But standardization is not a synonym for security. MCP's success in a production environment depends on least privilege, authentication and authorization, human approvals, input validation, isolation, auditability, server trust, version management, and not giving the model more than it needs.

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
