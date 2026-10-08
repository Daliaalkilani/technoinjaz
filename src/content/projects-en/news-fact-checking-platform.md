# Official News Platform for Combating Fake News

The **Official News Platform for Combating Fake News** is an academic project carried out by a team of students with technical assistance from **Techno Enjaz**. It aims to build an official news reference for post-liberation Syria, through which the competent authorities publish verified news and correct misleading claims. The platform lets users **report suspicious external content** (a link, text, or images); a team of editors verifies it and then publishes an official post that confirms or debunks the claim, **linking the fake news item to its correction** so the reader gets the full context.

The platform is built with the **Laravel** framework, PHP, and a relational **MySQL** database, with HTML, CSS, Bootstrap, and JavaScript interfaces that support Arabic and right-to-left layout, plus separate dashboards for editors and the system administrator. Verification in the implemented version relies on **human review by editors**; the platform does not include AI-based automatic fake news detection, which is listed as a future development.

## Project Facts

| Item | Details |
|---|---|
| Project type | Web platform for publishing official news, managing reports, and editorial verification |
| Field | Fact-checking, digital content management, web development |
| Year | 2024–2025 |
| Project status | Academic working prototype documented with implemented interfaces and dashboards |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Laravel (MVC), PHP, MySQL, XAMPP and Apache, HTML, CSS, Bootstrap, JavaScript |
| Outputs | Official news site, report form with image attachments, linking fake news to corrections, search by keyword and governorate, editor and admin dashboards |

## The Problem: Fake News in a Post-Conflict Period

The project starts from the observation that fake news and misinformation spread faster and wider on social media than true news, making it hard for citizens to tell truth from falsehood and eroding their trust in media and government institutions. The risk is greater in post-conflict regions: in the Syrian context, old images and videos, or footage from other places, were circulated as current events, and after the conflict such content can stir up tensions and hinder reconciliation, the return of refugees, and reconstruction efforts.

The project argues that relying on independent fact-checkers alone is not enough, because their corrections often arrive after the damage is done. It therefore proposes a **direct official channel**, run by authorized bodies, to publish confirmed news and debunk rumors quickly, while involving citizens as first-line reporters of suspicious content.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for web platforms that combine content management, editorial workflows, and role-and-permission systems.

## How Does the Fact-Checking Platform Work?

A report moves through a clear editorial pipeline from submission to the official response:

1. A visitor browses the official news and searches it by keyword or by governorate, without needing an account.
2. The user creates an account, logs in, and submits a **report about suspicious external content** containing a title, the source link, and the text of the claim, with the option to attach supporting images.
3. The report appears in the **pending reports** list on the editor's dashboard.
4. The editor reviews the report details, verifies it, and sets the post status: **true, fake, or under verification**.
5. The editor creates an official post (text, images, and video) that confirms or debunks the claim, and the report is linked to that post as its response.
6. When a claim is debunked, the fake post is linked to the correction post, and the platform shows a **comparison view of the false claim and the true claim**.
7. The user follows their reports from their dashboard and saves important news to a favorites list.

## Roles and Permissions

The use-case diagram defines four actors in a hierarchical inheritance relationship, where each role inherits the permissions of the role below it:

| Role | Permissions |
|---|---|
| Guest | View posts and news, search by keyword or governorate, view site information, sign up and log in |
| Registered user | Edit profile, report questionable content, view own reports, add or remove posts from favorites |
| Editor / content checker | Create and edit official posts and manage their media, review reports, set post status, link a fake post to its correction post |
| System administrator | Manage users and their roles (CRUD), manage governorates and regions, manage site information (About and contact details) |

## Database and Data Model

The database was first drafted, then modeled as an entity-relationship diagram (ERD), and implemented with **Laravel Migrations** following normalization principles. A key design decision is that a report is no longer tied to a post inside the platform; it represents **external content** and carries a `resolution_post_id` field pointing to the official post that resolved it, so one post can answer several reports.

| Table | Role in the system |
|---|---|
| users | User data and permissions, optionally linked to a governorate |
| governorates | Reference list of governorates |
| regions | Regions belonging to each governorate, with details such as coordinates |
| posts | Official posts and their type (true, fake, under verification), with a self-reference linking a fake item to its correction, and an optional link to a region |
| post_images / post_videos | Images and videos attached to posts |
| claims | User reports about external content, their review status, and the post that resolved them |
| claim_images | Images attached to reports as visual evidence |
| favorites | Junction table for the many-to-many relationship between users and saved posts |
| About | Static site content such as contact information and introductory text |

## Platform Interfaces and Dashboards

The project documents the final interfaces with screenshots covering all roles:

| Interface | Function |
|---|---|
| Home page | Displays official news to visitors and users |
| Claim comparison | Shows the false claim alongside the official correction |
| News archive | Browse and search previous posts |
| Admin dashboard | Manage users, governorates and regions, and site information |
| Editor dashboard | Manage posts and review reports |
| Regular user dashboard | Follow reports and favorites |

## Environment and Tools

- **XAMPP** as a local development environment bundling the **Apache** server, the **MySQL** database, and **PHP**.
- **Laravel** to manage application logic following the **MVC** pattern and to work with the database.
- **HTML, CSS, Bootstrap, and JavaScript** to build responsive interfaces.

Non-functional requirements set by the project include hashing passwords with an algorithm such as bcrypt, securing dashboards with a role-and-permission system, optimized queries for responsiveness, and full Arabic and RTL support.

## Documented Results

The project concludes that it achieved its main goal by building an official channel for publishing news that lets users take part in verification, with a Laravel back end and a relational database managing the relationships between users, posts, reports, and media, plus Arabic-supporting interfaces and dashboards. The abstract and conclusion describe the output as a web platform and a mobile app, while the implementation chapter documents the interfaces and dashboards through screenshots without a separate technical description of the mobile app.

The reported results are **functional**: the project includes no quantitative measurements such as response time, load testing, or a trial with real users. The figures cited in the literature review (such as 92% accuracy for a CNN model or 80% for crowdsourced assessment) are results of other studies and do not belong to this platform.

## Limitations of the Current Version

- Report verification is fully manual and depends on editors' expertise; there is no automatic prioritization of reports by suspicion level.
- Search is based on keywords and governorate only, not semantic search.
- There is no instant notification system to alert users when a widespread rumor is debunked.
- There is no analytics dashboard on rumor types and where they originate.
- No real-world operation with an official body, and no performance or security testing, is documented.

## Possible Future Development

According to the outlook in the project, the platform could be extended through:

- Integrating machine learning models for preliminary fake news detection, by analyzing the linguistic patterns of reported texts or the propagation networks of links, so the most suspicious reports reach editors with higher priority.
- An instant alerts and notifications system sent to users' phones when important news is published or a widespread rumor is debunked.
- A data analytics and statistics dashboard tracking the most widespread rumor types, the regions they start from, and the topics they target.
- Semantic search instead of keyword-only search, and advanced archiving of fake news and their corrections by topic and date to serve researchers and journalists.
- Integration with social media platforms through APIs, which could in the future allow warning labels on suspicious content in cooperation with those platforms.

These items remain **future developments**, not features of the current version.

## Do You Have a Similar Project?

If you need to develop a platform for managing digital content or systems for review and verification, the Techno Enjaz team can study the project's requirements and provide the appropriate technical solution.

## Planning a Similar System?

If you are working on a web platform for managing and analyzing content and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
