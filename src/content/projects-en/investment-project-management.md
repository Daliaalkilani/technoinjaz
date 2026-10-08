# Engineering Project Management Platform for Investment Companies

A project to develop **a centralized web platform for managing engineering projects funded by incoming foreign investment**, carried out by a team of students with technical assistance from **Techno Enjaz**. The platform connects the foreign investor, the local engineering management, and field staff in a single digital environment. It divides each project into **technical workshops** to which tasks and workers are assigned, with separate dashboards for each role: senior management, project manager, investor, engineer, worker, workshop supervisor, and reviewer.

The platform is built with **Laravel 12** and the **TALL Stack** (Tailwind CSS, Alpine.js, Laravel, Livewire), with the **Filament** package for dashboards and a **MySQL** database on a local server. Its headline aim is to end what the project calls the **"investment black box"**: the investor gets a view-only portal to follow their projects and their technical and financial reports without interfering in execution.

## Project Facts

| Item | Details |
|---|---|
| Project type | Web platform for engineering project and human-resources management |
| Field | Project management, foreign investment, web application development |
| Project status | Implemented web system with documented interfaces for every role, designed for a single company on a local server |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Laravel 12, Filament, Livewire, Tailwind CSS, Alpine.js, MySQL, XAMPP, HTML5, CSS3, Bootstrap |
| Outputs | Portals for seven roles, technical-workshop system, task and cost management, technical and financial reports, recruitment and CV review, public services portal |

## The Problem

Engineering projects funded from abroad suffer from geographic distance between funder and implementer, which weakens communication and direct oversight. Administrative processes in the construction sector still rely heavily on paper documentation and unstructured individual correspondence, so investors pour money into projects that resemble closed boxes, with no real tools to track how budgets are spent or how work is progressing.

On the other side, local engineering management lacks centralized task allocation and handles workshops and staff without accurate databases of skills and experience. This affects execution quality, increases waste of time and resources, and makes it harder to attract reconstruction projects that require governance and transparency standards.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for administrative web platforms built with Laravel and multi-role Filament dashboards.

## How the Investment Project Management Platform Works

A project's life cycle inside the platform is distributed across the different roles:

1. Senior management creates user accounts and assigns roles, registers investment company files, and builds the skills directory.
2. Engineers and workers apply for jobs through a four-step form that includes their CV and skills.
3. The reviewer (auditor) checks CVs and verifies applicants' data and qualifications before approval.
4. The project manager creates the project, links it to the funding investor and investment amount, then divides it into technical workshops, each with a supervisor.
5. Tasks are assigned to workshops and workers, recording estimated cost, actual cost, and progress for each task.
6. Workers and engineers update the status of their tasks (received, in progress, completed), and engineers, supervisors, and the manager submit technical and financial reports.
7. From their view-only portal, investors follow the status of their projects, completed tasks, and submitted reports.

## Roles and Interfaces

| Role | Main features of its interface |
|---|---|
| Senior management (Admin) | Real-time overview of projects and tasks; users, roles, and skills management; CVs; linking investors to projects and investment amounts; workshops, tasks, and reports; services and proposals |
| Project manager | Construction project and workshop management, task assignment and tracking, reports submitted to the manager |
| Investor | Dashboard to track investments; view linked projects and their reports (view only) |
| Engineer | Dashboard of tasks and assigned projects, profile and CV, creation of technical reports |
| Worker | Own tasks, workshop, and overdue tasks; CV; workshops currently assigned |
| Workshop supervisor | Status of workshops and field tasks, worker and workshop performance reports, workshop tasks and workers, "My Workshops" view |
| Reviewer/auditor | Pending CVs and count of approved ones, CV review, evaluation of service proposals before escalation to management |

The platform also includes a **public portal** for visitors and potential clients to request engineering or consulting services and to propose new services, which go through an administrative review and approval cycle.

## Data Model

A relational MySQL database was designed around the users table. Its main tables are:

| Table | Purpose |
|---|---|
| User, Role, User_Role | Users and their roles in a many-to-many relationship (role-based access control) |
| CV, Skill | CVs with acceptance status, and the technical skills directory |
| Project | The project with its budget, dates, status, and manager |
| Project_Investor_Link | Links investors to projects and records the investment amount |
| Workshop, Worker_Workshop_Link | Technical workshops and their supervisors, worker assignments and join dates |
| Tasks | Tasks with progress, estimated and actual cost, and status |
| Reports | Technical and financial reports linked to projects |
| Service, Service_Requests, New_Service_Proposal | Services, service requests, and proposals for new services |

## Technical Architecture

- **Backend:** Laravel 12 with an MVC architecture and Eloquent ORM for database access, using the framework's protections against CSRF, XSS, and SQL injection, plus password hashing.
- **Interactivity:** Livewire for real-time server-driven UI updates without complex JavaScript, and Alpine.js for micro-interactions.
- **Dashboards:** The Filament package to build tables, forms, and admin panels for each role, built on Tailwind CSS.
- **Front end:** HTML5, CSS3, and Bootstrap with a responsive design that works on desktops, tablets, and phones.
- **Data and runtime:** MySQL within the local XAMPP environment, with tables managed through phpMyAdmin.

Non-functional requirements defined by the project include strict separation of permissions (an investor can only access their own project's data and a worker cannot reach financial reports), encryption of sensitive data, logs of sensitive operations, and scalability to add new modules in the future.

## Documented Results

The project documents implemented interfaces for all roles, from the multi-step recruitment form to the investor and workshop-supervisor dashboards. According to its conclusions, the system achieved:

- Direct, documented monitoring for investors without interfering in execution, addressing the "black box" problem.
- Administrative organization by dividing projects into workshops and linking human and financial resources to each workshop.
- Clear separation of permissions through multiple roles, each with its own interface.
- Integration of human-resources management and recruitment with project management and reporting in a single platform.

These are **functional and analytical results** for an implemented system. The report includes no quantitative performance measurements, no trial in a real company, and no user evaluation.

## Limitations of the Current Version

- The platform is designed for the needs of a single company and does not support multiple companies.
- The system and database run on a local server within the company's internal network, which is why the project proposes moving to the cloud to improve access flexibility and availability for investors.
- There is no dedicated mobile app; field staff use the responsive interfaces in a browser.
- This version has no artificial-intelligence or predictive-analytics modules and no automated CV scoring; CV review is manual through the reviewer role.

## Possible Future Development

According to the proposals in the project, the platform could be developed by:

- Moving to cloud computing instead of local servers, with automatic backups and disaster recovery.
- Mobile apps for field workers and supervisors to update tasks, upload photos and reports from the site, and receive notifications.
- Integrating artificial intelligence to analyze progress data, predict delays, suggest better resource allocation, and detect early signs of waste.
- Analytics dashboards and KPIs showing progress rates, schedule and budget deviations, and workshop efficiency.
- Multi-company support with full isolation of data and permissions.
- Strengthening security and compliance through comprehensive audit logs, data encryption, and adherence to international privacy standards.

## Planning a Similar System?

If you are working on an engineering project-management platform for companies and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
