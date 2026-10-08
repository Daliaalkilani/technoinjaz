# CyberShield — AI-Powered File & Link Security Scanner

**CyberShield** is a mobile app that helps users check whether **files and web links** are safe before dealing with them, carried out by a team of students with technical assistance from **Techno Enjaz**. The app sends the link, or the file's SHA-256 digital fingerprint, to **VirusTotal**, which aggregates the verdicts of dozens of anti-malware engines, then passes the raw technical result to **Google Gemini** to turn it into a simplified security report that explains the risk level and its reason and gives preventive advice.

The app was built with **Flutter** for Android, with a serverless backend on **Cloudflare Workers** and the Hono framework, a **Cloudflare D1** database, **Cloudflare KV** caching, and **JWT** authentication. The documented outcome is a working prototype that scans links and files and presents a report non-specialists can understand, with a scan history and account management; the book does not include quantitative measurements of detection accuracy or response time.

## Project Facts

| Item | Details |
|---|---|
| Project type | AI-assisted cybersecurity mobile app |
| Field | Cybersecurity, URL and file scanning, generative AI |
| Year | 2025–2026 |
| Project status | Working prototype on Android with a cloud backend |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter, Riverpod, GoRouter, Dio, Cloudflare Workers, Hono, Cloudflare D1, Cloudflare KV, VirusTotal API, Google Gemini API, JWT |
| Outputs | Simplified security report (risk level, summary, preventive advice), VirusTotal result details, scan history, usage statistics |

## The Problem

Smartphones have become the main platform for everyday transactions, which makes them a direct target for phishing and malware that usually arrive through a link or a file. The project identifies three gaps in existing solutions:

- **Single-engine limits:** many security apps rely on one detection engine, which weakens detection of new threats.
- **Accuracy versus resources:** more accurate solutions, such as deep-learning models running on the device, drain the battery and CPU and increase latency.
- **The knowledge gap in reports:** typical security reports are technical and complex, and ordinary users cannot interpret them or act on them.

CyberShield addresses these gaps with a hybrid architecture: multi-engine scanning through a cloud service instead of a single local engine, sending a file's fingerprint instead of the file itself to reduce data usage, and an AI agent that turns the result into plain language.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for cybersecurity apps that combine cloud scanning services with language models in mobile applications.

## How the App Works

A scan request follows a sequential path from user input to the displayed report:

1. The user signs in, chooses to scan a file or a link, and taps the scan button.
2. The app sends the request to the backend, which creates a new scan record in the database with the status **Pending** and returns the scan ID, while the app shows a loading screen.
3. The backend contacts the **VirusTotal API**: for a file, the generated **SHA-256 hash** is sent, and if the service already knows it the report is retrieved directly without uploading the actual file; for a link, the URL itself is submitted for analysis.
4. VirusTotal returns a raw JSON report with the number of engines that classified the item as malicious, suspicious, harmless, or undetected, and the backend stores it linked to the scan record.
5. The backend sends the raw report to **Google Gemini** with a prompt, and the model generates a summary containing the risk level, a short description of the case, and preventive advice.
6. The simplified report is saved, the scan status is updated to **Completed**, and the report is returned to the app for display, with the option to view the technical details.

VirusTotal and Gemini are contacted only from the backend, never directly from the app, which protects the API keys and keeps data exchange organized.

## System Architecture

The system follows a multi-layer architecture that separates the interface from business logic and external services:

| Layer | Role |
|---|---|
| User layer | Receives user input and displays results, with no processing logic |
| Application layer (Flutter) | Manages the interface, sends requests, receives responses, and displays reports |
| Backend layer (Cloudflare Workers + Hono) | User verification, scan data management, database access, and coordination with external services |
| External services layer | VirusTotal API for scanning and Google Gemini API for the simplified report |

## Technical Environment

### Mobile App

- **Flutter** with Dart, with code organized into Core, Models, Services, and Providers layers.
- **Riverpod** for state management, separating business logic (authentication, scanning, history) from the interface.
- **GoRouter** for central routing that starts at the splash screen, sends the user to sign-in or the home screen based on authentication state, and blocks access to protected screens without permission.
- **Dio** for JSON communication with the backend, with interceptors and central handling of network errors such as timeouts and lost connections.
- **Flutter Secure Storage** to keep access tokens and session data encrypted via the Android Keystore instead of storing them as plain text.

### Backend and Data

| Component | Function in the project |
|---|---|
| Cloudflare Workers | Serverless runtime on the edge network for handling requests |
| Hono | Building REST APIs, routing, and applying middleware |
| Middleware | Intercepting requests, verifying the JWT, and handling errors |
| Cloudflare D1 | SQLite-based relational database for users, scans, and results |
| Cloudflare KV | Key-value cache to reduce repeated requests to external services |
| JWT | Stateless authentication; the token is attached to the Authorization header of every request |

### Data Model

The database has five related tables centered on the scans table:

| Table | Contents |
|---|---|
| Users | Basic user data and the hashed password; linked to scans in a one-to-many relationship |
| Scans | Each scan: type, target value, status, and date |
| VT_Results | Engine counts per verdict, the original report link, and the raw JSON response |
| AI_Analyses | Risk level, simplified summary, preventive guidance, and report date |
| File_Metadata | File name, size, type, and hash, without storing the file itself |

## App Screens

| Screen | Function |
|---|---|
| Home | Overall device status, file and link scan options, and recent scans |
| Link scan | URL input with options such as HTTPS-only scanning and language selection |
| Scan result | Link status, security summary, preventive advice, VirusTotal details, and the option to open the link once it is confirmed safe |
| Scan history | All previous scans with search, filtering, and the status of each scan (safe or malicious) |
| Profile | User data and statistics such as the number of links and files scanned and threats detected |
| Settings | Profile editing, notifications, privacy and security, scan-provider API keys, app language, and sign-out |

The system design also defines an administrator role limited to managing user accounts and monitoring API usage, without involvement in the scans themselves.

## Documented Results

The book reports that the app successfully performs file and link scans and presents the results clearly, while keeping a scan history and managing accounts and settings in an easy-to-use interface. The main achievements include:

- Integrating VirusTotal for multi-engine scanning and using its results.
- Using Google Gemini to generate simplified security summaries and preventive recommendations.
- A backend on Cloudflare Workers with D1 for data management and KV for faster data access.
- Secure user-session authentication with JWT.

The book contains no quantitative measurements of detection rate, false alarms, response time, or battery usage. A response time of no more than 3 seconds for repeated queries was set as a **target** in the project scope, not a measured result. The accuracy figures that appear in the book belong to earlier studies reviewed in the background chapter and are not results of this app.

## Limitations of the Current Version

- The app runs on **Android only** at this stage, without iOS support.
- It is limited to **static analysis** based on VirusTotal results, without dynamic analysis of file behavior, network traffic monitoring, or real-time on-device protection.
- Detection accuracy comes from the VirusTotal engines, and scanning requires an internet connection and the availability of external cloud services.
- The simplified report is generated by a general-purpose language model, so it remains an advisory summary best read together with the engine result details.
- The system was evaluated in a limited local environment, with no documented benchmark against other systems.

## Possible Future Development

According to the directions set out in the project, CyberShield could be extended by:

- Supporting scans of more file and digital media types.
- Integrating additional security scanning providers alongside VirusTotal to increase result reliability.
- Developing a specialized AI model for interpreting scan results instead of relying on general models.
- Instant notifications when new threats are detected or scan results are updated.
- Supporting additional operating systems with a unified user experience.
- An advanced admin dashboard for monitoring usage and analyzing statistics.
- Offline operation for some core functions, with data sync when the connection returns.
- Behavioral analysis and early threat detection, and integration with enterprise protection platforms and SIEM systems.

## A Note on Privacy

The app stores account data, the history of scanned links, and file metadata, and it sends links and file hashes to external services. Any real-world use therefore needs a clear policy on what is sent to VirusTotal and Gemini, how long scan history is retained, and who can access it.

## Planning a Similar System?

If you are working on an AI-powered security tool for scanning files and links and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
