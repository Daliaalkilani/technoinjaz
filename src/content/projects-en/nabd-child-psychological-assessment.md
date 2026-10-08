# Nabd — AI Psychological Assessment Support for Children

**Nabd** is an intelligent web system that supports **the preliminary psychological assessment of war-affected children** by analyzing non-verbal behavior and vocal cues with artificial intelligence, developed as a student academic project with technical assistance from **Techno Enjaz**. It lets a therapist run **a live analysis session using the camera and microphone** or **analyze a recorded video**; the data is sent to the **Google Gemini 3 Flash Preview** model, and the system displays numeric indicators from 0 to 100 and behavioral labels in Arabic, then helps prepare a preliminary report that the therapist reviews and approves.

The system is built with a **React 19 and TypeScript** front end, a **Laravel 12** server, and a **MySQL** database. In testing within a simulated environment, it recorded a response time of **1.5 to 4 seconds per analysis frame**, with one frame captured every 3 seconds. The project stresses that Nabd is **a decision-support tool, not a replacement for clinical diagnosis**; the decision remains with the psychologist.

## Project Facts

| Item | Details |
|---|---|
| Project type | AI-supported web platform for psychological assessment |
| Field | Multimodal AI, child mental health, medical informatics |
| Year | 2025–2026 |
| Project status | Working system tested in a simulated environment for live-analysis and video-analysis sessions |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Google Gemini 3 Flash Preview, React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4, Laravel 12, PHP 8.2, Axios, MySQL |
| Outputs | Live and video analysis, numeric indicators and Arabic labels, real-time alerts, child profiles, reports with review and approval |

## The Problem

War and armed conflict leave long-lasting psychological effects on children, such as anxiety, depression, and post-traumatic stress disorder (PTSD), and these conditions are hard to detect early because many children cannot accurately put their feelings into words.

The project describes the limits of traditional assessment tools in unstable settings: structured clinical interviews need a highly trained interviewer, a lot of time, and a quiet setting; self-report questionnaires depend on the child's ability to understand and express themselves; and parent questionnaires may be affected by the parents' own trauma. Add to this the shortage of specialists, language and cultural barriers, social stigma, and the fact that these tools give a one-off snapshot rather than continuous monitoring. The project therefore turned to **non-verbal behavior and voice** as indicators that do not depend on language and can be captured with simple devices.

## Techno Enjaz's Role

The project was carried out academically by the student, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that apply multimodal models to sensitive health applications while keeping a qualified human as the decision-maker.

## Theoretical Basis of the Analysis

The project adopts a theoretical model in which trauma (such as losing family, displacement, and direct violence) can lead to conditions such as PTSD, C-PTSD, anxiety, and depression, which in turn show up as observable non-verbal behavior: an **avoidance pattern** (expressionless face, low voice, avoiding eye contact) or a **hyperarousal pattern** (rapid movements, broken gaze, tense voice).

The model draws on indicators described in the literature, such as facial action units (FACS), gaze behavior, and vocal features like fundamental frequency, MFCC, jitter, shimmer, and HNR. This is the project's theoretical foundation; the actual analysis in the system is performed by the Gemini model, as described below.

## How Nabd Works

1. The therapist signs in, then creates a profile for a new child or selects an existing one, and links it to one or more guardians.
2. The therapist creates an assessment session and chooses its type: **live analysis** with camera and microphone, or **analysis of a recorded video**.
3. The Laravel server sends the data to Gemini; in a live session one frame is captured every 3 seconds.
4. The model returns a strict **JSON** response, which the server sanitizes and converts into numeric indicators (0–100) and Arabic behavioral labels.
5. Results are shown in real time in the interface, a **real-time alert** appears when indicators require the therapist's attention, and notes can be added during the session.
6. When the session is complete, a **draft report** is created that brings together the indicators, notes, alerts, and charts.
7. The therapist reviews the report and adds recommendations; it moves from "draft" to "under review" to "approved" and is saved in the child's record to follow progress across sessions.

## AI Model Configuration

The same model is used for all three tasks, with a different thinking level for each:

| Task | Model | Thinking level |
|---|---|---|
| Live streaming (real-time analysis) | gemini-3-flash-preview | Low, to reduce response time |
| Recorded video analysis | gemini-3-flash-preview | High, to improve analysis quality |
| Report generation | gemini-3-flash-preview | Medium, to balance speed and quality |

Other settings include a temperature of 1.0, a maximum of 8192 output tokens, high media resolution (media_resolution_high), and the application/json response type.

## Architecture and Interfaces

Nabd uses a multi-tier, client–server architecture:

- **Front end:** a single-page application (SPA) in React 19 and TypeScript, built with Vite and styled with Tailwind CSS, communicating with the server via Axios, with Arabic and RTL support.
- **Server:** Laravel 12 on PHP 8.2, exposing a REST API and handling business logic and communication with Gemini.
- **Storage:** MySQL with tables for users, children, guardians, sessions, analysis sessions, analysis notes, voice-analysis data, and reports with their notes and recommendations, plus tables for awareness articles, subscription plans, notifications, and activity logs.

| Screen | Function |
|---|---|
| Home page | Introduces the system and its services |
| Login and sign-up | Access by role (system administrator or therapist) |
| Dashboard | Statistics on children, sessions, and reports, with charts |
| Live analysis | Direct session with camera and microphone, live results and notes |
| Video analysis | Upload and analyze a recorded clip |
| Reports management | Search, filter, print, export, and track approval status |
| Child profiles | Basic data, status, sessions, and reports |
| Settings | Account, language, alerts, and security options |

The **system administrator** manages users, awareness articles, subscription plans, and system settings, while the **therapist** handles child profiles, sessions, analysis, and reports.

## Documented Results

The system was tested in a **simulated environment** for live-assessment and video-analysis sessions, and the project documents the following operational results:

| Indicator | Documented result |
|---|---|
| Response time per analysis frame | 1.5 to 4 seconds |
| Capture rate in live analysis | One frame every 3 seconds (20 frames per minute) |
| Output format | Unified JSON converted into 0–100 indicators and Arabic labels |
| Simultaneous display zones | 7 interactive zones |
| Key performance indicators | 4: attention engagement, vocal activity, eye contact, social interaction |
| Network error handling | Retry up to 3 times at 2-second intervals |

The seven display zones cover the four indicators, the live emotional state, behavior analysis across four detail cards, charts for vocal activity and social interaction, real-time alerts, and a notes list updated both manually and automatically.

These are **operational and technical results** (speed, output consistency, and continuity of operation). The report does not compare the system's indicators against specialists' assessments or include a study with children in a clinical setting, so no diagnostic accuracy for detecting anxiety or PTSD is attributed to Nabd.

## Limitations of the Current Version

- Testing took place in a simulated environment, not in centers or clinics with real children.
- There are no accuracy figures comparing the system's outputs with specialists' diagnoses.
- Analysis depends on the cloud-based Gemini service and an internet connection, which means session images and audio are sent to an external service.
- The indicators are estimates from a multimodal language model and always need the therapist's review before any report is approved.
- The interface is in Arabic; support for other languages is listed as future work.

## Possible Future Development

According to the outlook in the project, Nabd could be developed by:

- Broadening multimodal analysis by combining facial-expression, body-movement, and gaze-direction analysis with voice analysis.
- Smart alerts based on cumulative changes across sessions to detect early deterioration or improvement.
- Integration with the electronic medical records of psychological centers and clinics while protecting data security.
- Smartphone apps for running sessions and managing cases with data synchronization.
- An advanced statistics dashboard to analyze outcomes at the level of treatment centers.
- Support for additional languages to serve children in different conflict areas.
- Stronger encryption and audit logs for compliance with data-protection standards.
- Wider field testing in cooperation with psychological centers to evaluate performance and improve indicator accuracy based on specialists' feedback.

## Privacy and Ethics Note

Nabd processes video and audio recordings of children in fragile psychological situations, so any real use requires guardian consent, supervision by a qualified specialist, strict controls on access rights and data retention, and a review of the policy for sending media to cloud AI services. The system's results are supporting indicators, not a final medical diagnosis.

## Planning a Similar System?

If you are working on an AI-driven behavioral-analysis or psychological assessment system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
