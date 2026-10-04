# Developing the Digital Student Guide at Al-Wataniya Private University – Faculty of Engineering

## Project Summary

The **Student Guide at Al-Wataniya Private University – Faculty of Engineering** project is a digital application prepared by students as a computer engineering graduation project, **with technical assistance and support from the Techno Enjaz office during the project's development stages**. The system aims to bring together the academic information a student needs within a single interface, instead of relying on scattered sources, while providing an administration dashboard for updating content and managing parts of the system.

The project relied on **Flutter** for the mobile application and **Laravel** for the back end and administration dashboard, together with a relational database and API interfaces. It also includes a virtual assistant that uses **Google Gemini** to analyze the intent behind the user's question and match it against a defined FAQ base, so that when a suitable match is found, the approved answer from the local knowledge base is displayed.

> **Techno Enjaz's role:** providing technical assistance and support to the students during project implementation.

---

## Project Facts

| Item | Details |
|---|---|
| Project type | Digital university guide application / academic graduation project |
| Academic institution | Al-Wataniya Private University – Faculty of Engineering – Computer Engineering Department |
| Year | 2024–2025 |
| Techno Enjaz role | Technical assistance and support for the students during project implementation |
| Mobile application | Flutter / Dart |
| Back end | Laravel / PHP |
| Authentication | Laravel Sanctum, as implemented in the project |
| Database | Relational database |
| Virtual assistant | Google Gemini with a defined FAQ base |
| Project status | Working academic prototype with mobile interfaces and an administration dashboard |

## The Problem the Project Addressed

The project started from the problem of the information a university student needs being scattered across multiple sources, including information about majors, courses, study plans, faculty members, previous graduation projects, and content related to university life. This scatter can make reaching information slower and increases the student's reliance on scattered sources that may not be continuously updated.

The project therefore focused on creating a unified digital access point that allows students to search for and reach academic information in an organized way, along with an administration dashboard that helps the administration side keep the content updated.

## Project Scope

The project covered developing a working prototype that includes a set of interconnected functions, most notably:

- Browsing the academic majors and their information.
- Displaying study plans.
- Browsing courses and their details.
- Searching within the academic content.
- Displaying content related to graduation projects and university achievements.
- A student profile within the application's interfaces.
- An administration dashboard for managing faculties, majors, courses, requests, and system administrators.
- Authentication and linking between the mobile application and the back end via API.
- A virtual assistant for answering a defined set of frequently asked questions.

## Techno Enjaz's Role in the Project

The project was implemented by the students **with the assistance of Techno Enjaz**. The office's contribution, as presented on this page, was **technical support and assistance during project implementation**, while maintaining a clear separation between the students' work and the assistance provided by the office.

Nor does this page attribute full ownership of the project, or the standalone implementation of all Flutter, Laravel, database, and virtual assistant elements, to Techno Enjaz.

## The Student Experience Inside the Application

The application's interfaces were designed to bring access to academic content into a single user journey. The documented version includes a home screen, global search, major browsing, study plans and courses, in addition to other sections related to university content.

## Study Plans and Courses

The application provides access to study plans and courses according to major and academic year, with pages that display course details within an organized structure. This part aims to reduce the need to search through separate files and sources when trying to find out the academic path and the relevant courses.

## The Virtual Assistant

The project includes a virtual assistant that uses **Google Gemini** at the stage of understanding the question's intent and matching it against a predefined list of frequently asked questions. When a match is found, the application retrieves the corresponding answer from the local FAQ base and displays it to the user.

This approach keeps the project's artificial intelligence function specific: **analyzing the question and performing semantic matching against a controlled knowledge base**, rather than generating open-ended academic answers or providing unrestricted personal academic guidance.

For the background, see our articles on [how AI models predict the next word](/articles/next-token-prediction) and [what the MCP protocol is and when a direct integration is simpler](/articles/model-context-protocol-mcp).

## The Administration Dashboard and Content Management

Alongside the mobile application, the project includes an administration dashboard built within the Laravel environment for managing parts of the academic and administrative content. The interfaces document functions for managing faculties, majors, courses, registration requests, and system administrators, which allows the student experience to be separated from data administration tasks.

## Technical Architecture

The project relied on separating the mobile application from the back end and the administration dashboard:

- **Flutter / Dart:** for building the mobile application and the user interfaces.
- **Laravel / PHP:** for managing the server-side logic, the administration dashboard, and the API interfaces.
- **Laravel Sanctum:** for authenticating API requests, as documented in the implementation.
- **Relational database:** for organizing data on students, majors, courses, faculty members, projects, and related content.
- **Google Gemini:** for analyzing the intent of an inquiry and matching it against a defined FAQ set.

## Limitations of the Current Version

The documented version of the project is not a complete, official university information system integrated with all of the university's systems. Its current limitations include:

- Reliance on a defined scope of faculty and major data available to the project.
- The absence of documented direct integration with official grades and timetable systems.
- Manual updating of part of the content from the administration dashboard.
- First-version support for a single mobile platform within the project scope, with support for other platforms planned as later development.
- The absence of an advanced analytics system documented within the current version.

## Project Deliverables

The documented deliverables include:

- A mobile application with multiple interfaces for the student.
- A web administration dashboard.
- A relational database.
- An API linking the application to the back end.
- An authentication mechanism within Laravel Sanctum.
- A virtual assistant bounded by an FAQ base.
- Interfaces for managing parts of the academic content.

## A Similar Student Project?

If you are working on a software project or a digital system and need technical support in planning, development, or review, you can contact **Techno Enjaz** to discuss the scope of assistance appropriate for your project.
