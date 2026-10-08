# Code Analysis Assistant for Evaluating Code-Generation Models

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to build a platform called **EHCode Hub**, which works as a **benchmark harness** for comparing AI code-generation models and also includes **an intelligent coding assistant** and a code editor that analyzes, fixes, and converts code between languages. The platform compared three models: **GLM-5.1** by Zhipu AI, **DeepSeek V4 Pro**, and **MiMo V2.5 Pro** by Xiaomi, across 20 unified programming tasks in ten development categories.

The platform's server was built with **Node.js** using only its built-in modules, with no external dependencies, alongside an Arabic interface in HTML5, CSS3, and vanilla JavaScript, and the **EHCode** assistant, built on the open-source **opencode** agent, is embedded through an iframe. The three models produced 60 projects, and GLM-5.1 topped the evaluation with a weighted score of 8.78 out of 10, followed by DeepSeek V4 Pro at 8.75 and MiMo V2.5 Pro at 7.96.

## Project Facts

| Item | Details |
|---|---|
| Project type | Code-generation model evaluation platform with an intelligent coding assistant |
| Field | Software engineering, large language models (LLMs), developer tools |
| Year | 2025–2026 |
| Project status | Platform running locally on Windows, tested on 60 generated projects |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Node.js (built-in modules), HTML5, CSS3, Vanilla JS, opencode, MCP, Playwright, Batch Scripts |
| Outputs | Interactive project viewer, automatic launching, per-project guide, model comparison table, smart code editor, EHCode assistant with web and CLI interfaces |

## The Problem

As large language models spread into code writing, developers and organizations struggle to choose the right model, because common evaluations are either narrow in scope or rely on automated metrics that do not reflect the real quality of output in actual projects. Models may also excel at frontends while falling short on backends or mobile apps.

The project adds practical problems: running generated projects by hand wastes time installing dependencies and freeing ports, many of these projects have no documentation, and current evaluation environments offer no coding assistant to help understand the code during evaluation. This led to the idea of a single platform that combines automatic scanning, display, launching, documentation, comparison, and coding assistance.

## Project Objectives

- Design 20 unified programming tasks covering ten categories: full-stack web apps, APIs, frontends, Python applications, e-commerce, data visualization, 3D modeling, Flutter mobile apps, and automation tools.
- Build a lightweight viewer server with no external dependencies that automatically detects each project's type, entry point, and port.
- Launch any project with one click, installing dependencies, freeing ports, and showing the output inside an iframe.
- Generate a run guide for each project and embed a coding assistant in the platform.
- Provide an objective comparison table that shows model indicators and gives a recommendation.
- A unified launcher that starts the whole platform with a single click on Windows.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for developer-tool projects and applications built on large language models.

## How the Platform Works

1. The viewer server scans the `/models` folder and classifies each project by its files: `package.json` for Node.js, `requirements.txt` for Python, `pubspec.yaml` for Flutter, and anything else as a static project.
2. Models are shown in sections, and each project has a card showing its name, description, type, port, and status.
3. When the user clicks "Open project", the server receives the request at `/api/launch` and stops any other project to free the port.
4. Static projects are served directly; Node.js projects run `npm install` then `node`, Python projects run `pip install` then `python`, and for Flutter projects the user is directed to run them manually because of their complex environment.
5. The frontend polls server readiness via `/api/probe` every 1.5 seconds for up to 20 attempts, then loads the project in an iframe or shows the reason for failure.
6. The process manager tracks each project's state (idle, starting, running, crashed, stopped), logs errors, and releases the port as soon as the process ends.

## Platform Components

| Component | Function |
|---|---|
| Viewer server (port 8800) | Scans and launches projects and serves the interface, using only the http, fs, path, url, and child_process modules |
| EHCode assistant (port 8801) | Chat interface built on `opencode web`, embedded via iframe, with model selection and session management |
| Smart code editor | Solve, Fix, Convert, Ask, and code analysis buttons, with syntax highlighting and line numbers |
| PHP-to-Laravel converter | Restructures a PHP project into Laravel's structure (Routes, Controllers, Models, Migrations, Blade), with both versions runnable and a live output panel |
| Model comparison page | Indicator table and weighted quality-criteria table, with the winning model announced |
| Unified launcher start.bat | Checks for node and opencode, frees ports 8800 and 8801, starts the viewer and the assistant, then opens the browser; stop.bat shuts them down |
| Portable EHCode distribution | A standalone ehcode.exe that needs no Node.js, with install.bat enabling Playwright MCP |

The assistant is available through a web interface and a command-line interface (CLI). In the code editor, the book shows an example of converting code from Python to C++, and an analysis report that explains what the code does and suggests improvements to quality and maintainability.

## Documented Results

### Distribution of Generated Projects

Each model produced 20 projects, and `start.bat` run files were present and error-free in all projects (20/20 for each model):

| Indicator | GLM-5.1 | DeepSeek V4 Pro | MiMo V2.5 Pro |
|---|---|---|---|
| Node.js projects | 3 | 3 | 4 |
| Python projects | 2 | 0 | 2 |
| Static projects | 13 | 17 | 12 |
| Flutter projects | 2 | 0 | 2 |
| Projects with a README file | 5 | 1 | 2 |

A key observation is that DeepSeek V4 Pro produced HTML pages instead of Flutter apps for the two mobile tasks, while GLM-5.1 and MiMo V2.5 Pro produced real Flutter apps as required.

### Software Quality Criteria Evaluation

The models were scored on eight weighted criteria: functional quality, performance, reliability, security, usability, maintainability, cost efficiency, and portability:

| Model | Top scores (out of 10) | Weighted total |
|---|---|---|
| GLM-5.1 | Functional quality 9.2, usability 9.0, maintainability 9.2 | 8.78 |
| DeepSeek V4 Pro | Performance 9.2, reliability 9.0, security 8.8, cost efficiency 9.5 | 8.75 |
| MiMo V2.5 Pro | Portability 9.0, with balanced performance on the other criteria | 7.96 |

On this basis, the project recommended GLM-5.1 for general use, DeepSeek V4 Pro for backend-focused projects, and MiMo V2.5 Pro for frontend projects. The platform also proved able to manage processes, free ports, and launch projects automatically; documented examples include running a blog platform and a 3D Earth globe from GLM-5.1's projects.

## Limitations of the Current Version

- The project itself states that score registration and updating the results data are still needed to complete the quantitative evaluation, and the book does not detail how scores or criterion weights were assigned.
- The comparison is based on 20 tasks and only three models, with one project per task from each model.
- Flutter projects are not launched automatically inside the platform.
- The platform is currently designed for Windows; Linux and macOS support is planned.
- The assistant does not yet receive the context of the open project automatically.
- The aggregate project counts in the book's summary differ slightly from the detailed per-model table; the table above is taken from the comparison chapter.

## Possible Future Development

According to the directions set out in the project, the platform could be developed by:

- Adding models such as GPT, Claude, Gemini, Qwen, and Grok, and harder tasks such as distributed systems, blockchain applications, and big data analysis.
- Passing the open project's context to the assistant, with two-way communication between the viewer and the assistant via postMessage.
- Automating multi-dimensional quantitative evaluation (runnability, code quality, visual quality, requirement completeness) and saving results to results.json with a statistics dashboard.
- Replacing polling with WebSocket, and adding caching, search, and filtering.
- Supporting Linux and macOS, a multilingual interface, a cloud version, and publishing the platform as open source with APIs for extensions.
- Integrating global benchmarks such as HumanEval, MBPP, and SWE-bench, and using the platform for teaching with a "challenge" mode pitting students against the models.

## Planning a Similar System?

If you are working on a smart tool for source-code analysis and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
