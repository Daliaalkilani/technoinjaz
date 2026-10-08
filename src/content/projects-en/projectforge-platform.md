# ProjectForge — Intelligent Project Proposal & Planning Platform

**ProjectForge** is a mobile app and intelligent platform that helps final-year students **choose an academic project that fits their skills, plan it, and form a balanced team**. It is built around a **digital skills profile (Project-DNA)** created from a skills questionnaire; a **weighted recommendation algorithm** then matches it against the requirements of available projects, a **roadmap** with timeline phases and risks is generated, and a **project Readiness Indicator** is calculated. It was carried out by a team of students with technical assistance from **Techno Enjaz**.

The mobile app is built with **Flutter** for Android and iOS, with a **Laravel (PHP)** server exposing REST APIs and a **MySQL** database. The **Gemini 3.5 Flash** model is integrated to generate project descriptions, milestones, and risk suggestions, with the **MCP (Model Context Protocol)** used to retrieve the student's data context in a controlled way. The project stresses that the Readiness Indicator is **a guidance value based on design-chosen weights**, not a calibrated predictive model.

## Project Facts

| Item | Details |
|---|---|
| Project type | Mobile app and recommendation-and-planning platform for academic projects |
| Field | Recommender systems, educational technology (EdTech), generative AI, project management |
| Year | 2025–2026 |
| Project status | Implemented app with student, advisor, and admin screens, tested with mock data |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter, Dart, Dio, Laravel, Sanctum, MySQL, Gemini 3.5 Flash, MCP |
| Outputs | Project-DNA skills profile, recommended project list, Readiness Indicator with factor analysis, work plan with phases and risks, team and supervision-request management |

## The Problem

Many final-year students struggle to choose a project that matches their actual skills, to plan it over time and assess its risks, and to form a team with well-distributed skills; teams are often formed around personal relationships rather than complementary abilities. The lack of a clear method and roadmap leads a share of students' software projects to stall.

Global platforms address separate parts of the problem: **Devpost** for team formation in hackathons, **SkyHive** for skills analysis with its Skill-DNA concept, and **Pymetrics** for estimating a person's fit for a task. ProjectForge brings these stages together in **a single workflow**, from skills assessment to work-plan generation, tailored to the academic setting and its time constraints.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for apps that combine recommendation algorithms, Laravel back ends, and language-model integration through MCP.

## How Does ProjectForge Work?

1. The student creates an account and logs in through the app, authenticated with a **Laravel Sanctum** token.
2. They complete a three-part **skills questionnaire**, building their Project-DNA profile with proficiency levels from 1 to 5 for each skill.
3. The recommendation engine compares the profile with each project's required skills and their weights, and ranks projects in descending order of **match score**.
4. The student browses available projects and teams, and joins a team or creates a new one.
5. When a project is selected, the system calculates the **Readiness Indicator** and shows the factors behind it and their detailed analysis.
6. The simulation module (Sandbox) generates a **work plan** with sequential phases, start and end dates, and potential risks, which the student follows from the start through progress stages.
7. The team sends a supervision request to an **academic advisor**, who accepts it or rejects it with a stated reason, approves teams, and approves projects.

## Core Algorithms

### Recommendation and Matching Algorithm

The match score is computed by summing the product of the student's proficiency in each skill (1–5) and that skill's weight in the project (0–1), then dividing by the maximum proficiency (5); the closer the result is to 1, the better the match. In the documented example, a student with Flutter at level 4, Dart at level 3, and Firebase at level 2, and a project with weights 0.4, 0.3, and 0.3, gets a match score of **62%**.

### Project Readiness Indicator

The indicator is a weighted sum of three factors:

| Factor | Weight | How it is calculated |
|---|---|---|
| Skill coverage | 0.5 | How well the student's skills cover the project's weighted requirements; for a team, the highest level per skill across members is used |
| Difficulty factor | 0.3 | 1 − (difficulty − 1) / 5, so the easiest project (1) approaches 1.0 and the hardest (5) approaches 0.2 |
| Team balance | 0.2 | Based on the standard deviation and mean of proficiency levels among members; 1.0 for a solo student, about 0.85 for a well-distributed four-member team, about 0.40 when 60% of the skills sit with one person |

Documented examples: a solo student with 50% coverage on a difficulty-3 project gets an indicator of **63%**, and a four-member team with 78% coverage and 85% balance on a difficulty-4 project gets **68%**. The project explains that these weights are **design decisions**, not statistically derived, because sufficient data from past projects is not available.

### Work Plan (Sandbox Simulation)

The system first checks whether milestones and risks are already stored for the project; otherwise it generates them from **ready-made templates** according to project type (mobile app, web app, intelligent system, and so on), then computes each phase's dates so that each starts as soon as the previous one ends. Each project gets three baseline risks, with additional high-impact risks added when difficulty reaches 4 or 5. The Gemini model is used to generate custom milestones when no suitable template exists.

## Gemini and MCP Integration

The Flutter app requests personalized content from the Laravel server, which calls an **MCP Client** to pull the student's data (skills and proficiency levels) from MySQL while applying access policies; a context is then built and sent to Gemini over HTTPS, and results come back as JSON. Controls on the model's use include:

- **Temperature = 0.4** for more consistent outputs.
- **Function Calling** with 8 custom tools, including generate_roadmap, analyze_risks, generate_recommendations, and generate_project_description.
- **Structured Output** in JSON in the TodoGenerator task generator.
- **Three layers against hallucination:** a fixed system message forbidding fabricated data, then five validation stages (protocol, JSON structure, content, tools, logic), then a fallback to a **static template** if validation fails.

The generated risks and recommendations are **advisory** and do not replace the academic advisor's assessment.

## Technical Architecture and Database

- **Mobile app:** Flutter and Dart, with the **Dio** library for server communication, and tokens stored encrypted via flutter_secure_storage (Keystore / Keychain).
- **Back end:** Laravel with MVC and RESTful APIs, Middlewares and Policies for permissions, Queues for long-running tasks, and Eloquent ORM.
- **MySQL database:** four groups of tables: users, students, and majors (Users, Students, Majors); skills and matching (Skills, User Skills, Project Skills); projects and teams (Projects, Project Types, Teams, Team Members, Milestones, Risks); and analysis results (Success Estimations).

| Security control | Implementation |
|---|---|
| Encrypted transport | HTTPS (TLS 1.3) with all HTTP traffic redirected |
| Authentication | Limited-validity Laravel Sanctum tokens |
| Permissions (RBAC) | RoleMiddleware for the roles: student, advisor, admin |
| API keys | Gemini keys stored in a .env file excluded from Git |
| SQL injection protection | Eloquent ORM instead of handwritten queries |
| Data separation | Student data (students) kept separate from login data (users) |

## App Screens

| User | Screens |
|---|---|
| Student | Welcome, login, and sign-up; skills questionnaire (3 parts); home page; available teams and projects; profile and skills; team creation; Readiness Indicator and its factors; work plan |
| Academic advisor | Dashboard; incoming supervision requests and their details; rejecting a request with a reason; profile |
| System administrator | Dashboard; project management with filtering by status, semester, and year; user and team management; an AI assistant for querying system data; general notifications and announcements; team settings |

## Documented Results

The project documents the implemented app with screens for all three roles, the algorithms applied to worked examples (62% match, Readiness Indicators of 63% and 68%), and testing with mock data. It describes operation performance **qualitatively**: generating a work plan from templates is fast, Gemini-based generation depends on the network and the service's response time, usage stays within free-tier limits, and repeated results are cached.

The project states that there is **currently no quantitative evaluation** (such as Precision, Recall, or F1) of the recommendation and success-estimation algorithms, because labeled reference data is not available. The figures cited in the introduction about other platforms or studies (such as 90% accuracy for SkyHive) do not belong to ProjectForge.

## Limitations of the Current Version

- The Readiness Indicator is advisory, with fixed weights, and has not been statistically calibrated on completed projects.
- Recommendation accuracy has not been tested on real students; testing used mock data.
- Work plans rely mainly on ready-made templates by project type.
- The skills profile relies on the student's self-assessment in the questionnaire.
- Gemini outputs are advisory and need the advisor's review.

## Possible Future Development

According to the outlook in the project:

- A proposed evaluation plan after using the platform for two semesters (about 8–12 months) and collecting at least 30 projects: measuring recommendations with Precision@k, Recall@k, and NDCG@k, and the Readiness Indicator with R², MAE, and RMSE, treating R² > 0.7 and MAE < 15% as signs of acceptable accuracy.
- Deriving weights with regression or machine learning models from real data, and dynamic recommendations that update as the student's skills develop.
- Fully custom work plans generated by Gemini instead of templates, and a virtual academic mentor.
- Support for multidisciplinary teams, links with employers, and use across more than one educational institution.
- Offline mode, desktop support, interactive charts, and voice commands.
- Multi-factor authentication, end-to-end encryption, and student control over profile privacy.

## Planning a Similar System?

If you are working on an intelligent web platform for managing projects and teams and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
