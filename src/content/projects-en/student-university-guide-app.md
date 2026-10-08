# Developing the Digital Student Guide

An academic project to develop **a digital university student guide app**, carried out by a team of students with technical assistance and support from **Techno Enjaz** during development. The app brings together in one interface the academic information a student needs: majors and their study plans, courses by year, teaching staff, and university achievements, with global search and a virtual assistant, instead of relying on scattered sources that may be out of date.

The mobile app was built with **Flutter**, and the back end and web administration dashboard with **Laravel**, together with a relational database and **RESTful APIs** secured with **Laravel Sanctum**. The virtual assistant uses **Google Gemini** to understand the intent of the user's question and match it against a defined list of frequently asked questions, then shows the approved answer from the local knowledge base rather than a freely generated one.

## Project Facts

| Item | Details |
|---|---|
| Project type | Academic guide mobile app with a web administration dashboard |
| Field | Mobile apps, web development, digital university services |
| Year | 2024–2025 |
| Project status | Working academic prototype with mobile (Android) interfaces and an admin dashboard |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter / Dart, Laravel / PHP, Eloquent ORM, Laravel Sanctum, relational database, Google Gemini |
| Outputs | Multi-screen mobile app, web admin dashboard, API linking the app to the server, virtual assistant bounded by an FAQ base |

## The Problem the Project Addressed

The project started from a difficulty many students face, especially in their first years: finding accurate, complete information about their majors, required courses, the instructors responsible for each subject, and graduation requirements. Students often rely on scattered verbal or paper sources that may be inaccurate or out of date, which weakens their ability to plan their studies.

The project therefore focused on creating a unified digital access point that lets students search academic content in an organized way, with an administration dashboard that allows information to be updated regularly so the app does not become static content that falls behind changes in curricula and staff.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. This page does not attribute ownership of the project, or the standalone implementation of all Flutter, Laravel, database, and virtual assistant elements, to the office; its role was **technical support to the students during implementation**.

## Work Stages

The project followed an agile methodology in four stages:

1. Requirements analysis, identifying user needs and core functions.
2. Designing a relational database covering the main entities and their relationships, with scalability in mind.
3. Designing the interfaces according to UI/UX principles, focusing on simplicity and ease of navigation.
4. Developing the Flutter app and the Laravel dashboard and linking them through APIs.

## The Student Experience Inside the App

The documented version includes the following screens:

| Screen | What it shows |
|---|---|
| Home screen | Sections for academic majors, teaching staff, and graduation projects with direct search, plus dark-mode support |
| Side menu | Home, My profile, My registered courses, Academic calendar, Timetables, Settings, and Log out |
| Profile | Name, email, student ID, major, and enrollment year, with profile editing and password change |
| Global search | Results from majors and courses together for a search term |
| Academic majors | List of the available engineering majors and a details page for each |
| Study plan | A chart showing the sequence of subjects and their prerequisites for each major |
| Courses | Browsing courses by study year from the first to the fifth, with the number of credits for each course |
| Virtual assistant | Chat for answering frequently asked questions |
| University achievements | Competitions and activities with the date the information was last updated |

## The Virtual Assistant

The virtual assistant is built into the Flutter app around a **Google Gemini** model (the project cites gemini-1.5-flash as an example) and works as follows:

1. When the screen opens, the model and a chat session are initialized, and the assistant sends a welcome message that includes a list of questions it can answer.
2. If the user's message is only a greeting, the app replies with a greeting directly.
3. Otherwise, the question is sent to Gemini together with the full FAQ list in a structured prompt, and the model is asked to return the exactly matching question or the phrase "not available".
4. If the model returns a question that exists in the local list, the app displays the corresponding answer stored in the app, which was taken from the university's official website.
5. If there is no match, the assistant apologizes, explains that it is designed for the defined FAQs only, and suggests trying another question from the list.

This approach keeps the project's AI function specific: **analyzing the question and performing semantic matching against a controlled knowledge base**, rather than generating open-ended academic answers or giving unrestricted personal academic advice, which reduces the chance of presenting unapproved information.

For the background, see our articles on [how AI models predict the next word](/articles/next-token-prediction) and [what the MCP protocol is and when a direct integration is simpler](/articles/model-context-protocol-mcp).

## The Administration Dashboard and Content Management

Alongside the mobile app, the project includes a web administration dashboard built with Laravel, covering:

| Screen | Function |
|---|---|
| Dashboard | Quick statistics on active events, instructors, courses, and students, plus a graduation-projects section |
| Faculty management | Add faculties and list them with Arabic and English names, with edit and delete |
| Major management | Add majors and show their status and parent faculty, with filtering |
| Course management | Add and edit courses with Arabic and English names, code, major, and credit hours |
| Registration requests review | Students' registration requests for events or courses, with status, date, and student ID |
| System administrators | Add administrators and assign roles such as general administrator or content administrator |

## Technical Architecture

The project separates the mobile app from the back end and the administration dashboard:

- **Flutter / Dart:** the mobile app and its interfaces.
- **Laravel / PHP:** server logic following the MVC pattern, with an **Eloquent** model for each table and controllers split between an Api folder (JSON responses for the app) and an Admin folder (Blade views for the dashboard).
- **Authentication:** Laravel sessions for dashboard administrators through a separate guard (admin_web), and **Laravel Sanctum** tokens for app students, with API routes protected by the auth:sanctum middleware.
- **Validation and formatting:** Form Request classes to validate input, and API Resources to standardize and slim down JSON responses, with pagination and eager loading of relationships.
- **Relational database:** tables for students, faculties, majors, courses, instructors, projects, events, media, and notifications, link tables for student enrollment in courses and events, and tables that log administrators' actions on content.
- **Google Gemini:** analyzing the intent of a query and matching it against the defined FAQs.

Other tools the project covers include the Bootstrap framework for responsive web interfaces and Hostinger hosting.

## What the Project Reports as Results

The project states that the experience was evaluated through user tests within the university, observing an improvement in how quickly students reach information **estimated at about 25%**, and an increase in engagement with university content **of nearly 40%** compared with the traditional approach. It does not state the number of participants or how these percentages were measured, so they should be read as preliminary estimates rather than the results of a systematic evaluation.

Other percentages in the project's introduction, such as rates of student use of university apps, come from earlier studies and reports and are not results of this app.

## Limitations of the Current Version

The documented version of the project is not an official academic information system integrated with all institutional systems. Its limitations include:

- Covering only specific majors whose data was provided by cooperating departments, rather than all faculties.
- Supporting Android only in the first version, with iOS deferred to later stages.
- Focusing on display and browsing without deeper interaction such as rating courses.
- No integration with official grades and timetable systems; data is updated manually from the dashboard.
- No advanced statistics in the administration dashboard at this stage.
- The virtual assistant is limited to the programmed FAQs and needs an internet connection to reach Gemini.

## Possible Future Development

According to the project's proposals:

- Support for iOS.
- Integration with the university's official systems for course registration, grades, and timetables.
- A smart notification system that sends alerts based on students' interests or content changes.
- Single sign-on (SSO) through the university email.
- Allowing teaching staff to upload educational content directly.
- Statistical tools and reports to analyze student interaction with the system.
- A space for extracurricular activities and volunteering opportunities.

## A Similar Student Project?

If you are working on a software project or a digital system and need technical support in planning, development, or review, you can contact **Techno Enjaz** to discuss the scope of assistance appropriate for your project.

## Planning a Similar System?

If you are working on a digital guide app with a virtual assistant and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
