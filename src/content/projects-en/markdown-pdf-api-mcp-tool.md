# API & MCP Tool for Converting Markdown to PDF

A fully integrated project running entirely on Cloudflare's **Serverless** infrastructure, providing a high-performance Markdown-to-PDF conversion engine that overcomes traditional systems' limitations in right-to-left (RTL) language support — including Arabic — and in embedding PlantUML diagrams and LaTeX equations.

The system exposes a REST API and an interactive web interface, with a comprehensive pipeline starting at frontmatter parsing and ending with a print-ready PDF.

## Technical Environment

- Cloudflare Workers
- Cloudflare Browser Rendering (Puppeteer)
- Cloudflare D1
- KaTeX
- Highlight.js
- PlantUML / SVG
- REST API
- MCP
- JWT

## Conversion pipeline

- **Frontmatter parsing:** reading document metadata and unifying its settings.
- **HTML conversion with syntax highlighting:** via Highlight.js.
- **Math rendering:** KaTeX with LaTeX support.
- **PlantUML embedding:** diagrams fetched server-side and embedded as inline SVG vector graphics to preserve quality.
- **PDF generation:** via Cloudflare Browser Rendering (Puppeteer) with full RTL support and printed backgrounds.

## Security and data management

A robust security architecture covering user authentication (JWT), password hashing, and conversion-history management through a D1 database, with multiple output theme options.

## Outcomes

The system produces high-quality PDFs with optimal response times, making it an ideal solution for developers and writers that eliminates traditional server maintenance — available both as an API and as an MCP channel for AI-tool integration.

## Planning a Similar System?

If you are working on an API or MCP integration for your product and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
