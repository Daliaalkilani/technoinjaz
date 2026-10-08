# AI Student Assistance Robot with Touchscreen

An academic project to design and build **a smart robot with an interactive touchscreen that acts as an electronic student-affairs assistant** in colleges and universities, carried out by a team of students with technical assistance from **Techno Enjaz**. The robot lets students register their details, look up and update information, generate and print official documents, and get answers to frequently asked questions about registration and exams, through **text chat or voice commands in Arabic**.

The system relies on **an AI agent** built on a **Gemini**-family language model that understands the request and then performs the appropriate action on an **SQLite** database, generating documents from Word templates with the **DocxTpl** library, converting them to PDF, and printing them directly. The system was run and tested on a physical robot prototype with a touchscreen and carried out the required services correctly, without numerical performance measurements.

## Project Facts

| Item | Details |
|---|---|
| Project type | Service robot with a touchscreen and AI assistant for student services and documents |
| Field | Artificial intelligence, natural language processing, voice interaction, document automation |
| Year | 2025–2026 |
| Project status | Working physical prototype, tested on the robot in its operating environment |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, Gemini, AI agent with function calling and MCP, FastAPI and Uvicorn, SQLite, DocxTpl, Tkinter and HTML5/CSS3/JavaScript, WebSocket |
| Outputs | Arabic text and voice chat, student registration and record management, official document generation with PDF conversion and printing, FAQs and quick actions |

## The Problem

In many educational institutions, managing student documents and records still relies on manual entry and paper, which leads to slow transactions, repeated human errors, difficulty updating and archiving data, and the risk of documents being lost or damaged. Staff come under heavy pressure at peak times, and there are no systems able to understand a student's question and respond naturally.

The project set out to combine, in one device, record management, official document generation and printing, and an AI assistant that understands written and spoken Arabic requests, so students can get the service without going to a staff member.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that integrate LLM-based assistants with databases and interactive hardware.

## How the Robot Works

The project's workflow diagram shows the following sequence:

1. The student stands in front of the robot and chooses, on the main screen, text or voice interaction, or one of the FAQs or quick actions.
2. The student types the request on the touchscreen or speaks it, and speech is converted into processable text.
3. The AI assistant analyzes the request with the language model and identifies the user's intent.
4. Through **function calling**, the assistant performs the required operation: an information query, adding, editing, or searching a student record, or creating a document.
5. When a document is requested, the student's stored data is merged into a Word template and the document is converted to PDF.
6. The result is shown on screen, or the document is sent directly to the printer when needed.

## System Components

The system consists of the following integrated modules:

| Module | Role |
|---|---|
| Touchscreen GUI | Entry point to all services |
| Text chat module | Receives written questions and commands, with suggested commands |
| Voice chat module | Speech recognition and conversion to commands, with real-time voice conversation |
| AI module | Understands queries and routes them to the right tool |
| Database | Stores student data and handles create, read, update, and delete (CRUD) operations |
| Document management module | Generates official documents from templates |
| Printing module | Converts documents to PDF and sends them to the printer |

## Technology Stack

The project's technical study sets out the tools the system is built on:

- **AI:** the multimodal, Arabic-capable Gemini model, the AI agent concept, function calling, and the **Model Context Protocol (MCP)** for connecting the model to tools and databases through a unified interface.
- **Backend:** Python with the **FastAPI** framework and the asynchronous **Uvicorn** server, in a multi-layer service architecture, with data modeled using dataclasses.
- **Data:** an embedded **SQLite** database stored in a single file without a separate server.
- **Documents:** the **DocxTpl** library to fill pre-designed Word templates (using the Jinja2 engine), followed by PDF conversion and direct printing.
- **Interfaces:** a Tkinter desktop interface and web interfaces built with HTML5, CSS3, and JavaScript.
- **Voice:** speech recognition and real-time voice conversation over a persistent **WebSocket** connection.
- **Development and deployment:** Visual Studio Code, Git, and GitHub, with PyInstaller to package the application as a standalone executable.

Documents the system targets include student status statements, official requests, and grade transcripts.

## System Screens

| Screen | What it offers |
|---|---|
| Main screen | Choice between text and voice interaction, plus FAQs and quick actions |
| Text chat | Typing questions and commands with instant replies and suggested commands |
| Voice chat | Communicating by voice commands instead of typing |
| FAQs | Registration papers for new students, registration for returning students, faculties and specializations, and links to official channels |
| Quick actions | Register a student, search for a student, edit a student's data, create a document, and list students |

## Hardware and Physical Prototype

A touchscreen was mounted in a frame designed specifically to hold and secure it for use in educational institutions. The screen displays the system interfaces, receives text and voice input, and runs the AI assistant's services.

## Test Results

After development was completed, the system was run on the actual robot, and the text and voice interaction and the various services were checked for correct operation. The project concludes that the system carried out the required tasks and responded to user queries **with acceptable efficiency** in the real operating environment, through an easy, Arabic-capable interface.

This remains a functional assessment: the project does not report the number of test users, response time, accuracy in understanding voice and text commands, or transaction time compared with the traditional process.

## Challenges and Limitations of the Current Version

- Heavy code complexity from the number of components and from working with several languages and tools in one development environment.
- No purpose-built screens with the required specifications were available for this kind of robot, so an available touchscreen was used with a frame designed around it.
- Local restrictions on access to some AI platforms required finding alternative solutions to keep the system running.
- The scope is limited to administrative services and student documents; it does not cover lectures, timetables, exams, or distance learning.
- The system runs locally in a defined environment, without a direct link to the institution's central systems.

## Possible Future Development

According to the project's proposals:

- Turning the robot into a complete university assistant that answers students and visitors on all kinds of academic and administrative questions.
- Expanding the knowledge base to include study plans, specializations, courses, graduation requirements, and academic regulations.
- Connecting directly to the college or university's central systems for instant access to and updating of data.
- Using newer models to improve response speed, answer accuracy, and language understanding.
- Designing dedicated screens and frames for this type of application for a more professional experience.

## A Note on Privacy

The robot handles students' personal data and prints official documents, so any real deployment requires clear access controls that prevent anyone from viewing another person's data, and rules on which queries are sent to cloud AI services.

## Planning a Similar System?

If you are working on an interactive robot or a smart touch interface and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
