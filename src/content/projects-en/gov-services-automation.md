# Automating Inquiries, Complaints & Utility Bills for Government Departments

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to develop **a government e-services portal** that moves a number of paper-based transactions in government departments onto an automated digital track. The portal focuses on three services: **electronic complaints**, **public inquiries** such as family records and non-employment certificates, and **viewing bills, fees, and fines** and documenting their payment, with status tracking for every request (in progress, completed, rejected).

The system was built as a bilingual (Arabic and English) web application using **Laravel**, a **MySQL** database, **Tailwind CSS** interfaces, and **Filament** dashboards, with three separate interfaces for citizens, employees, and the system administrator. It uses Google's **Gemini** model to analyze complaints, assign their priority and summarize them, improve their wording, and generate draft official replies that an employee reviews before sending. The project runs as **a simulation prototype**, with no live connection to state records or bank payment gateways.

## Project Facts

| Item | Details |
|---|---|
| Project type | Web application for government e-services (simulation prototype) |
| Field | Digital transformation, e-government, management information systems |
| Project status | Implemented system with citizen, employee, and admin interfaces, not connected to real government records |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Laravel, Blade, Tailwind CSS, Alpine.js, Livewire, Filament, MySQL, Eloquent ORM, Gemini API |
| Outputs | Bilingual citizen portal, employee dashboard, admin dashboard, notifications, audit log, AI analysis and replies |

## The Problem: Paper Transactions and Repeated Visits

Paper and in-person visits remain the usual way to complete many transactions in government departments. The project identifies four practical problems:

- **Wasted time and effort:** citizens travel long distances and wait for hours to obtain a simple document or file a complaint.
- **Weak internet:** local connection speeds are slow and unstable, so heavy websites do not load easily, which calls for a lightweight system that works on minimal connectivity.
- **Transaction backlog:** papers pass through many offices, causing delays and occasional loss, and increasing the chance of human error in recording names or calculating bills.
- **Unclear request status:** citizens do not know where their transaction stands or why it was rejected except through repeated visits.

The project compared its solution with regional platforms such as Absher, Digital Egypt, and Dubai Now, concluding that these require advanced infrastructure, digital identity, and banking integration, whereas this project targets flexible administrative automation of everyday services with lower technical requirements.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for administrative web application projects built on Laravel and Filament, with language models integrated into the workflow.

## Project Objectives

- Build a web platform that moves routine transactions from paper to an automated electronic track.
- Provide a unified portal where citizens file complaints and inquiries and view their bills without travelling or queuing.
- An administrative dashboard that receives, sorts, and processes requests and updates their status so citizens stay informed.
- A lightweight, responsive architecture suited to available internet speeds and able to accommodate new services.
- Reduce errors caused by manual processing and shorten transaction completion time.

## How the System Works

A transaction goes through a complete lifecycle within the system:

1. The citizen creates an account with their national ID, name, email, phone number, and password, then logs in with the national ID.
2. From the dashboard, they choose a quick action: new complaint, new inquiry, or pay a bill.
3. They select the complaint or inquiry type, write the description, and attach documents; complaint text can be improved with AI.
4. The Gemini model analyzes the complaint and suggests its priority level and a summary of its content.
5. The assigned employee reviews the request, adds internal notes the citizen cannot see, and enters the inquiry result as text or a file.
6. The employee changes the request status and can generate an automatic official reply with AI, reviewing it before sending.
7. The citizen receives a notification of the status update or result, and every action is recorded in the system log.

## The Three System Interfaces

| Interface | Key functions |
|---|---|
| Citizen | Home page in Arabic and English, registration and login, a dashboard showing the number of complaints, inquiries, and unpaid bills plus recent transactions, complaint and inquiry lists with search and filters, submitting requests with attachments, bill list and payment-notice upload, notifications |
| Employee | Dashboard of pending and completed requests, managing and editing complaints and inquiries, viewing AI complaint analysis (priority and summary), changing status and generating replies, entering inquiry results and attaching documents |
| System administrator | General indicators (users, total complaints, paid bills) and a complaints-over-time chart, managing and editing bills, assigning complaints and inquiries to employees, managing and activating complaint and inquiry types, managing roles and users, system logs |

## AI in Request Processing

The system is connected to the **Gemini** model through an API key created in **Google AI Studio**, with the service provider, key, API endpoint, and model configured in the environment file (.env). In the implementation, the model is used for:

- **Improving complaint text** before the citizen submits it.
- **Analyzing complaints** by assigning a priority level and an automatic summary that helps employees grasp them quickly.
- **Generating an initial official reply** to a complaint or inquiry, which the employee or administrator reviews before sending.

The database design also includes fields for automatic attachment verification (is_ai_verified) and for storing text extracted from attachments by optical character recognition (ai_ocr_text), in line with the attachment analysis and description described in the use-case diagram.

## Data Model

| Module | Contents |
|---|---|
| Users and Roles | Users with national ID, name, email, and phone, each linked to a role (citizen, employee, administrator) following RBAC |
| Complaint Types and Inquiry Types | Complaint and inquiry types with description and activation status, so services can be added without code changes |
| Complaints and attachments | Type, description, status, assigned employee, and internal notes, with ai_priority and ai_summary fields |
| Inquiries and attachments | The request, its status and assigned employee, and the result as text (result_text) or a file (result_file_path) |
| Bills | Bill type, amount, amount paid, payment status, due and payment dates, with payment-receipt path and transaction ID |
| Notifications | Automatic notifications on status updates, and custom notifications sent by employees or administrators |
| System Logs | The acting user, action type, and affected entity, with old and new values stored as JSON for auditing |

## Technical Architecture

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS, and JavaScript, with Tailwind CSS inside Blade templates and Alpine.js for interactions such as dropdowns and modals |
| Backend | Laravel using MVC, with authentication and permission management |
| Admin dashboards | Filament, built on the TALL stack (Tailwind, Alpine.js, Laravel, Livewire), updating data without page reloads |
| Data | MySQL with Eloquent ORM for managing relationships and protecting against SQL injection |
| AI | Gemini API via Google AI Studio |

## What the Implementation Documents

The project's implementation chapter presents 51 figures covering the citizen, employee, and administrator interfaces and the Gemini service setup, demonstrating the transaction cycle from submission through status change and reply. The project concludes that a large part of the traditional paper procedures can be replaced with organized digital procedures that make follow-up easier for all parties.

The project includes no quantitative measurements, such as request processing time before and after the system, number of users in a real trial, or accuracy of AI priority assignment, so no specific improvement figures are attributed to it.

## Limitations of the Current Version

- The system works as **a simulation prototype** of the document cycle, with no live connection to ministry servers or state records.
- It includes no bank payment gateway; it displays bills and documents payment by uploading a payment or transfer notice, with the administrator updating the status.
- It is a browser-based web application, without standalone Android or iOS apps.
- It includes no certified electronic signature and relies on password-protected accounts.
- AI analysis relies on the cloud-based Gemini service, which means request text is sent to an external service.

## Possible Future Development

According to the outlook set out in the project:

- Integration with approved e-payment platforms so citizens pay bills directly and the status updates automatically.
- A large language model hosted locally within the institution's infrastructure, improving privacy and allowing training on local laws and administrative regulations.
- Smartphone apps (Android and iOS) with instant notifications.
- Integration with the national digital identity system and certified electronic signatures for issued documents.
- Restructuring around microservices and Redis caching for large-scale deployment.

## A Note on Privacy

The system handles sensitive personal data such as national IDs, attached documents, and financial data. Any real deployment therefore needs clear controls on access rights and data retention, and a review of what is sent to cloud AI services, which the proposed locally hosted language model is meant to address.

## Planning a Similar System?

If you are working on an automation system for services, inquiries, and bills and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
