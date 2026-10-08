# API & MCP Tool for Converting Markdown to PDF

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to design and build **a cloud service that converts Markdown documents to PDF files**, running entirely on a **Serverless** architecture on the **Cloudflare** platform. The service tackles three areas where many conversion tools struggle: **Arabic and right-to-left (RTL) text support**, **embedding PlantUML diagrams as SVG vector graphics** instead of raster images, and **rendering LaTeX equations** with KaTeX.

The service is available in three ways: a **web interface** with an editor and live preview, a documented **REST API** for developers, and an **MCP server** (Model Context Protocol) that lets AI agents call the conversion directly. The final PDF is generated inside a headless Chromium browser via **Cloudflare Browser Rendering (Puppeteer)**. The project's functional tests successfully converted basic formatting, Arabic text, equations, code highlighting, and three types of PlantUML diagrams.

## Project Facts

| Item | Details |
|---|---|
| Project type | Web service, API, and MCP server for document conversion |
| Field | Serverless and edge computing, document processing, AI tool integration |
| Project status | System deployed on Cloudflare and functionally tested on sample documents |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Cloudflare Pages Functions, Cloudflare Browser Rendering (Puppeteer), Cloudflare D1, Hono, Zod, JWT, bcryptjs, Marked, Gray-matter, Highlight.js, KaTeX, PlantUML |
| Outputs | RTL-capable PDFs, bilingual web interface, documented REST API, MCP server, OpenClaw Skill file, conversion history |

## The Problem

Markdown has become a common standard for writing technical documentation under the Docs-as-Code approach, but converting it into a professional PDF still runs into clear obstacles:

- **Weak Arabic support:** many conversion engines fail to apply bidirectional (BiDi) text rules, so word order is reversed and Arabic text gets mixed up with code.
- **Diagrams and equations:** PlantUML diagrams are often converted into low-resolution raster images, and LaTeX equations may be ignored or rendered incorrectly.
- **Server burden:** many tools rely on traditional servers that impose operating and maintenance costs and limit automatic scaling.

## Techno Enjaz's Role

The project was carried out academically by a team of students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for serverless cloud services, APIs, and MCP integrations with AI tools.

## How the System Converts Markdown to PDF

1. A request arrives from the web interface, the REST API, or the MCP server, carrying the Markdown text and conversion settings.
2. The back end, built with the **Hono** framework, verifies the user's identity via **JWT** when required and validates the input with **Zod**, stopping with an error message if anything is wrong.
3. **Gray-matter** extracts the frontmatter metadata, such as title, author, and keywords.
4. **Marked** converts the document to HTML, **Highlight.js** colors the code blocks, and **KaTeX** turns LaTeX equations into HTML and CSS.
5. PlantUML diagrams are encoded with the PlantUML Encoder and sent to a PlantUML server, and the response is embedded in the page as **inline SVG**.
6. The unified HTML page is sent to **Cloudflare Browser Rendering**, where headless Chromium loads it, applies fonts, CSS, and print settings, and creates the PDF with backgrounds printed.
7. The operation is logged in the **D1** database (execution time and status), and the file is returned directly or as Base64 depending on the interface used.

## Architecture and Components

The system uses a multi-tier architecture that runs entirely on Cloudflare's edge network:

| Tier | Components | Role |
|---|---|---|
| Client | Web interface in HTML, CSS, and JavaScript; external systems; AI agents | Send documents and receive PDF files |
| Back end | Hono on Cloudflare Pages Functions, Zod, JWT, bcryptjs | Routing, authentication, data validation, request handling |
| Conversion engine | Gray-matter, Marked, Highlight.js, KaTeX, PlantUML Encoder | Convert Markdown into a complete HTML page |
| Cloud services | Cloudflare Browser Rendering, Cloudflare D1, PlantUML server | PDF generation, data storage, SVG graphics generation |

Plain (vanilla) web technologies were chosen for the front end instead of frameworks such as React or Vue to keep files small and loading fast, with the **Noto Sans Arabic** font for Arabic text and **Fira Code** for code. The SQLite-based **D1** database holds tables for users, roles, user profiles, refresh tokens, documents, conversion settings, themes, and API usage logs.

## System Interfaces

- **Home page:** sign in or continue as a guest, choose the interface language (Arabic or English), set text direction to RTL or LTR, and access conversion history and API documentation.
- **Conversion editor:** a Markdown editor next to a live preview that uses the same conversion engine, with ready-made templates, theme color options, drag-and-drop upload of .md files, and a "Convert to PDF" button.
- **Guest mode:** allows conversion without an account, keeping history only within the current browser session.
- **Quick Markdown guide:** a built-in reference for headings, lists, links, and code syntax.
- **Interactive API documentation:** endpoints, HTTP methods, parameters, and their types, including registration and login APIs, plus a feature overview covering items such as a cover page and multiple themes.

## MCP Integration with AI Agents

An **MCP server** was implemented on top of Cloudflare Pages using the **Streamable HTTP** transport, with a single endpoint that any protocol-compatible client can use. The server provides tools to convert Markdown to PDF, list saved documents, fetch a specific document, and create temporary sessions for guest users. The project also includes an **OpenClaw Skill** file that describes the service's capabilities and parameters so AI tools can call it directly.

## Documented Results

The project ran functional tests on sample documents, which showed:

| Test | What was tested | Documented result |
|---|---|---|
| System features | RTL, live preview, PDF export, equations, code highlighting, PlantUML | All working without extra configuration |
| Basic formatting | Headings, bold and italic, ordered and unordered lists, links | Converted with no layout or text-direction distortion |
| Equations (LaTeX) | Inline and display equations, matrices, complex expressions | Rendered with symbols, sizes, and positions preserved |
| Code highlighting | JavaScript, Python, CSS, SQL, JSON | Syntax highlighting applied for each language inside the PDF |
| PlantUML diagrams | Sequence diagram, class diagram, activity/flow diagram | Converted to vector SVG graphics, with no raster images |

These are **functional verification results** documented with screenshots of the output. The report did not measure response times, load capacity, or the number of conversions tested, so no specific performance figures are attributed to the service.

## Limitations of the Current Version

- PlantUML diagram generation relies on an external PlantUML server, so it must be reachable at conversion time.
- Input is Markdown and output is PDF only.
- There is no parallel processing for large documents and no collaboration or version-management features.
- No quantitative performance measurements were published; the report's statements about response speed are based on the nature of the edge architecture rather than load testing.

## Possible Future Development

According to the outlook in the project, the service could be expanded by:

- Supporting additional input and output formats, and customizable professional templates.
- Processing large documents in parallel to improve performance.
- Collaboration features between users and version management.
- Integrating AI to suggest improvements to document structure and detect errors before conversion.
- Supporting cloud storage services, and finer permission management and usage tracking.
- Extending MCP support to integrate with more platforms and AI agents.

## Planning a Similar System?

If you are working on an API or MCP integration for your product and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
