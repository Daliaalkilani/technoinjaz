# AI-Powered Technical Voice Chatbot Robot

A project to develop an **educational voice chatbot robot** that acts as a technical assistant for students in programming, computer engineering, and networking, carried out by a team of students with technical assistance from **Techno Enjaz**. The robot takes the user's spoken question through a web interface, converts it to text, and sends it to Google's **Gemini-live-2.5-flash** AI model to generate a contextual answer that is shown as text and spoken aloud, while a servo motor moves the robot's arm in sync with the reply.

The project brings three fields together in one system: **generative AI and natural language processing (NLP)**, **real-time web technologies** through a Node.js server and the WebSocket protocol, and **IoT and embedded systems** through a **NodeMCU ESP8266** board and an **MG995** servo. Practical tests showed working voice conversations and arm motion synchronized with the reply, although the report gives no numerical measurements of answer accuracy or response time.

## Project Facts

| Item | Details |
|---|---|
| Project type | Educational voice chatbot robot with physical interaction |
| Field | AI in education, natural language processing, Internet of Things |
| Year | 2025–2026 |
| Project status | Working physical prototype tested in live voice conversations |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Gemini-live-2.5-flash (Gemini Live API), JavaScript, Node.js, WebSocket, NodeMCU ESP8266, MG995 servo |
| Outputs | Voice and text conversation, spoken replies (TTS), synchronized arm motion, web interface with a debug log |

## The Problem

Students in technical fields need quick answers to programming and technical questions outside lectures and office hours, while instructors spend time answering repeated, common questions. The project belongs to the field of **AI in Education (AIEd)** and aims to provide a digital assistant available around the clock that understands the context of a question, not just its keywords, and encourages **self-learning** in a setting where students can ask without embarrassment.

To make the interaction feel more real, the project went beyond a software chat app and gave the robot a physical body with a moving arm and a speaker.

## Project Objectives

- Develop a chatbot that works as a technical learning assistant and gives immediate support in programming and technical subjects.
- Support self-learning by giving students fast answers without being tied to office hours.
- Understand the student's intent and language using NLP and large language models.
- Integrate software and hardware through a NodeMCU ESP8266 board and a single servo motor that moves the robot while it replies.
- Build a technical knowledge base of programming explanations and concepts.
- Provide a multimodal interface supporting text and voice through speech recognition.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that connect cloud language models with electronic hardware and the Internet of Things.

## How the Robot Works

The system runs on two synchronized paths that meet at the central server:

1. The user speaks to the robot through the web interface in the browser.
2. The interface converts speech to text using **Speech-to-Text**.
3. The text is sent to the central server (**Node.js**) over a real-time **WebSocket** connection.
4. The server passes the text to the **Gemini API** over HTTPS (port 443) to generate a contextual answer.
5. The server returns the reply to the interface using **streaming**, where it is displayed as text and converted to audible speech with **Text-to-Speech**.
6. On the physical path, the ESP8266 board sends periodic requests to the server via **HTTP polling** on the local network to ask for the required motion state.
7. The server links the conversation state to motion, and the board generates **PWM** signals that move the robot's arm through the servo in sync with the spoken reply.
8. A switch sends the on/off state to the server.

## System Architecture

| Block | Role |
|---|---|
| User interface (Web Client) | Captures speech and converts it to text; displays the reply and converts it to speech |
| Central server (Node.js Backend) | Manages requests, organizes data flow, and synchronizes the robot's state |
| AI service (Google Gemini API) | Processes text and generates answers with the language model |
| Electronics (ESP8266) | Controls the servo motor and receives on/off commands |

The interface uses WebSocket with the server for real-time data transfer, the server talks to Google's servers over HTTPS, and the controller connects to the server via HTTP polling. The Gemini API offers two modes: a REST API for standard JSON requests and a Live API based on WebSocket for low-latency two-way communication, with settings such as Temperature, Top-K, and Top-P to control the nature of the output.

## Hardware Components

| Component | Role and documented specifications |
|---|---|
| NodeMCU ESP8266 | Wi-Fi connectivity (802.11 b/g/n) and servo control; L106 32-bit processor at 80–160 MHz, 3.3V operation |
| TowerPro MG995 servo | Moves the robot's arm; digital servo with metal gears, 4.8–7.2V, 10–12 kg/cm torque, rotation up to 180 degrees |
| 18650 lithium-ion batteries | Power source; 3.6–3.7V nominal, 4.2V fully charged |
| LM2596 voltage regulator | Steps voltage down to a stable level for the circuits; 4.5–40V input, adjustable 1.23–37V output, up to 3A |
| Battery management system (BMS) | Protection against overcharge, deep discharge, overcurrent, and short circuits |
| AC-to-DC switching adapter | Converts AC mains to DC to power the circuits |
| Speaker | Outputs the spoken replies |

Power flows from the source to the BMS for protection, then to the LM2596 regulator, and the servo connects to the ESP8266 through power and signal lines with a common ground shared by all components. The outer body is made of lightweight parts that hide the electronics while keeping them easy to reach for maintenance.

## User Interface

A simple web interface was designed for voice conversations and real-time system monitoring. It includes:

- A section showing the text transcribed from speech.
- An area showing the assistant's reply.
- Voice and connection control buttons.
- Controls for the robot's state and for turning it on or off.
- A debug log window for tracking the connection and internal operations, along with the connection status of the Gemini Live service.

## Documented Results

Practical tests of the prototype showed:

- Successful real-time communication between the interface and the server over WebSocket.
- Successful speech-to-text conversion and direct reception of voice commands in the browser.
- Stable reception of Gemini API replies and their conversion to audible speech.
- Synchronization between the spoken reply and the robot's arm motion.
- The ESP8266 receiving and executing motion commands via HTTP polling, with the servo running steadily without major jitter or signal dropouts.
- A stable supply voltage for the components through the LM2596 and the BMS circuit.

These are **functional results for a prototype**. The report gives no quantitative figures for answer accuracy, response time, or the number of questions tested, so no unverified accuracy figures are attributed to the system.

## Limitations of the Current Version

- The system depends entirely on cloud processing and an internet connection and cannot run offline.
- Motion is limited to one arm driven by a single servo, with no locomotion or complex movements.
- There is no camera, face recognition, or emotion analysis; interaction is text and voice only.
- The system is intended for technical learning support; it gives no medical, legal, or psychological advice and is not used to run exams or issue official assessments.
- It does not keep long-term conversation memory in the current version; this is listed as future work.

## Possible Future Development

According to the directions set out in the project:

- Moving additional parts such as both arms or the eyes for richer physical interaction.
- Improving speech recognition accuracy and supporting multiple dialects.
- Adding conversation memory that keeps dialogue context for longer.
- Building a version that works without a full internet connection using local AI models.
- Supporting cameras and computer vision for face recognition or gesture analysis.
- Expanding the knowledge base to educational fields beyond technical subjects.
- A smartphone app, and an improved physical body using 3D printing.

## Planning a Similar System?

If you are working on an AI-powered voice chatbot or intelligent assistant built on language models and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
