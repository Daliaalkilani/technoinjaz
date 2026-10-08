# AI Decision-Support System for Reconstruction and Damage Documentation

**An Intelligent System for Supporting Reconstruction Decision-Making in Damaged Areas** is an academic project carried out by a team of students with technical assistance from **Techno Enjaz**, to document damage in affected areas of Syria and analyze it with multimodal AI. Volunteers and field staff use a **mobile app** to collect reports containing **geotagged photos**, a text description, and the area name; a **Laravel** server then passes the reports to an **AI Agent** powered by the **Gemini 3.5 Flash** model, which normalizes area names and classifies the damage level from text and image together.

Processed results are shown in a **web platform and dashboard** with an interactive map of damage locations, statistics, and charts, so decision-makers can see how damage is distributed and how severe it is across districts and governorates and prioritize interventions. The system keeps raw field data exactly as received, separate from processed data, with a log of every AI request and response.

## Project Facts

| Item | Details |
|---|---|
| Project type | Decision-support system for damage documentation: mobile app, web platform, and dashboard |
| Field | Multimodal AI, geographic information systems, humanitarian work and reconstruction |
| Project status | Implemented system with documented screens, tested with input scenarios simulating field work |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter (Android), Laravel, MySQL, Queues, Gemini 3.5 Flash (text and vision), AI Agent, interactive maps |
| Outputs | Geotagged damage reports, normalized area names, damage level and percentage, interactive map, statistics and charts |

## The Problem: Inconsistent Field Damage Data

Years of conflict in Syria caused widespread destruction of infrastructure, housing, and services, with no unified databases. Most documentation relies on paper reports or unstructured field data gathered from multiple sources, and the project identifies its main problems:

- **Inconsistent area names:** free-text entries shaped by local dialects and spelling errors, so one location appears under several names and spatial data becomes fragmented.
- **Unsystematic human estimates of damage level:** with no unified standard, objective comparison between locations or over time is not possible.
- **Weak reliability of raw data:** due to varying experience among those documenting and no automated validation and processing.
- **Difficulty turning text, images, and locations into quantitative indicators** for statistical and spatial analysis.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for systems that combine field data-collection apps, Laravel servers, multimodal AI models, and decision-support dashboards.

## How Does the Damage Documentation System Work?

1. The field user logs into the app and creates a damage report containing one or more photos of the site, a text description, and the area name.
2. The report is linked to its location automatically, from the geotagged photo's metadata or via GPS, with the option to pin the location on a map and attach PDF files and video links.
3. The Laravel server receives the report through APIs and stores it **as raw data without modification**, then its status changes to "processing".
4. The user gets an immediate confirmation of receipt, while the processing job runs in the background through **Queues**, so the user does not have to wait.
5. The AI Agent prepares the text and images and sends them in a standard format to Gemini 3.5 Flash, which **normalizes the area name** and analyzes image and text together to **classify the damage level**, then returns structured results.
6. If analysis succeeds, a record is created in the processed reports table linked to a reference governorate and area, and the status becomes "processed"; if it fails, the status becomes "failed".
7. The administrator views only processed reports on the interactive map and in the statistics, filters and exports them, and manages users.

## AI in the System

### The AI Agent

The agent is not a standalone model but a **control layer** between the server and the Gemini API: it prepares text and image inputs, sends them in a unified format, receives structured results, and enforces unified classification and assessment logic that limits variation between reports. The project does not develop AI models from scratch; it relies on ready-made APIs.

### Normalizing Geographic Area Names

The agent analyzes the area name as entered by the user and compares it with standard names, so reports about the same location are merged into a single spatial entity. Examples shown in the project:

| User input | Normalized form | Governorate |
|---|---|---|
| ريف دمشق دوما (Rif Dimashq Douma) | ريف دمشق – دوما (Rif Dimashq – Douma) | Damascus |
| دوما الريف (Douma al-Rif) | ريف دمشق – دوما (Rif Dimashq – Douma) | Damascus |
| حلب السكري (Aleppo Sukkari) | محافظة حلب – حي السكري (Aleppo Governorate – Sukkari district) | Aleppo |

### Classifying Damage Level from Text and Image

Linguistic cues of damage severity are extracted from the text description, and photos are analyzed with **Gemini 3.5 Flash Vision** to extract visual features such as collapses, cracks, and total destruction; the two sources are merged into a unified classification. When a sufficient text description is missing, the damage level can be estimated from the image alone. Each processed report stores the **damage level, its percentage, the analysis description, and a confidence indicator**.

## Technical Architecture and Database

- **Mobile app:** built with Flutter and targeting Android, with Arabic and English interfaces.
- **Back end:** Laravel with the MVC pattern and APIs exchanging JSON over HTTP, with asynchronous processing through Queues.
- **Database:** MySQL, designed to separate raw from processed data.
- **Dashboard:** web interfaces with an interactive map and charts; the project mentions Blade Templates or Vue.js for the views, and Chart.js or ApexCharts for charts.

| Table / entity | Role |
|---|---|
| Users | User data; no report exists without the user who created it |
| Raw reports | Data as entered: location name, coordinates, description, report status |
| Images | Multiple photos per report |
| AI log | Requests sent and responses received, for tracing and reviewing analysis |
| Processed reports | Damage level and percentage, analysis description, and confidence indicator, linked to a governorate and area |
| Governorates and areas | Reference tables for normalizing names and preventing duplicates |

## System Screens

| Part | Screens and functions |
|---|---|
| Website landing page | System concept in Arabic and English, features (AI damage analysis, GPS location tracking, photo and media upload), workflow steps, statistics |
| Admin screens | Dashboard with statistics and charts, latest reports, interactive map with pop-up info windows, report details and damage assessment, advanced search and filtering, adding, editing, and deleting reports, profile |
| User screens (web) | Tracking reports and their status, adding a report with map location, photos, PDF files, and video links, report details and analysis result, notifications, profile |
| Mobile app | Login, side menu, report lists in Arabic and English, filtering by status and damage level, three-step report creation, report details, drafts, profile editing |

## Documented Results

The project documents a complete system made up of a mobile app for collecting field data and a central web platform for managing, analyzing, and displaying reports, with automated analysis of text and images and normalization of place names. Testing relied on **input scenarios simulating field work**, varying the quality of descriptions, place naming, and damage levels.

The project reports **no quantitative measurements** of damage-classification or name-normalization accuracy, processing time, or the number of reports tested. The results should therefore be read as a functional proof of an implemented system, not as an evaluation of classification accuracy under real operating conditions.

## Limitations of the Current Version

- The spatial scope is limited to Syrian areas and their administrative divisions; expansion to other countries is outside the current scope.
- The field app targets Android only.
- Sending and processing reports requires an internet connection; offline work is not currently supported.
- Analysis depends on the Gemini model through an external API, and its accuracy was not measured in the project.
- The system does not analyze historical data or predict damage; it processes current reports.

## Possible Future Development

According to the project's recommendations:

- Offline Mode with automatic synchronization when the network is available.
- Predictive models using machine learning and historical data to anticipate needs and prioritize reconstruction.
- Integrating satellite imagery and remote sensing to improve assessment accuracy.
- Deeper integration with GIS to track changes in buildings and facilities during rehabilitation.
- Specialized assessment mechanisms for different types of buildings and infrastructure.
- Broader interactive reports and statistics, with performance indicators to follow the progress of assessment and reconstruction work.

## Data Note

The system collects photos and precise geographic locations of damaged areas, so any real deployment needs clear access controls, protection of photos and coordinates, and human review of AI classifications before they are used in planning and resource-allocation decisions.

## Planning a Similar System?

If you are working on a decision-support system based on data and image analysis and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
