# Electronic Voting System — Developing a Web Platform for Digital Voting Management

The **Electronic Voting System** is a web platform built with **Laravel** on the backend and **Bootstrap** for the interface. It automates a complete digital election cycle: account creation, submitting and reviewing candidacy requests, publishing candidates' résumés and campaign programs, and casting a vote with a confirmation step that prevents later changes. The project was carried out by a team of students with technical assistance from **Techno Enjaz**.

The system is built around three roles: the **voter** (regular user), the **candidate**, who is promoted after administrative approval, and the **system administrator**, who manages requests and candidates and monitors voting and its results. The data model enforces two core rules: one candidacy request per user and one vote per user. It is an academic application prototype that demonstrates the concept, not an accredited election system.

## Project Facts

| Item | Details |
|---|---|
| Project type | Multi-role web platform for electronic voting management |
| Field | Web applications, information systems |
| Year | 2024–2025 |
| Project status | Academic application prototype |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Laravel (MVC architecture), Bootstrap, relational database |
| Users | Voter, candidate, system administrator |
| Outputs | Account registration, candidacy requests with clear statuses, candidate résumé pages, a voting page with final confirmation, an admin dashboard |

## The Problem

Traditional elections rely on slow, costly paper-based and manual procedures that increase the chance of human error, delay results, and can make participation difficult for people facing geographic or health barriers to reaching polling stations. Voters also need clear, consistent information about candidates and their programs to make an informed choice.

The project aims to bring these steps together in one platform: organized user registration, a formal candidacy path reviewed by the administration, candidate profile pages, and electronic voting that is recorded once and cannot be modified, with tools for the administrator to monitor the process.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for multi-role web applications built with Laravel, from organizing the workflow between roles to designing the database and the relationships between entities.

## How the System Works

1. **Sign-in:** the user signs in with email and password or goes to the account creation page.
2. **Account creation:** the user enters first name, last name, phone number, national ID number, email, and password; the account is created immediately without email confirmation or an OTP code in the current version, and the user is sent to the dashboard for their account type.
3. **Candidacy request:** a user who chooses to be a candidate first enters as a regular user, and their request is sent to the administration with the status "pending verification".
4. **Admin review:** the administrator accepts or rejects the request, with notes documenting the reason; if rejected, the user remains a regular voter, and if accepted, they get a page for managing their résumé.
5. **Candidate profile:** the candidate adds their full name, photo, campaign slogans, résumé, and links to campaign videos (such as YouTube).
6. **Getting to know candidates:** the voter browses the list of candidates with their detailed résumés.
7. **Voting:** the voting page shows candidates' names and photos with a vote button for each; pressing it shows a confirmation message, and after confirmation the vote cannot be deleted, changed, or cast for another candidate.
8. **Monitoring:** the administrator monitors the voting process and reviews the results from the admin dashboard.

## Role Permissions

| Role | Permissions |
|---|---|
| Voter | Create an account, a simple profile page (name, email, photo), browse candidates and their résumés, vote for one candidate once |
| Candidate | All voter permissions including voting, plus managing their résumé page and campaign content |
| System administrator | Review candidacy requests and accept or reject them, add candidates manually and fully edit their résumés, monitor voting and review results |

## System Interfaces

| Interface | Function |
|---|---|
| Candidate requests (admin dashboard) | View incoming requests and decide to accept or reject them |
| Candidate résumé page | Candidate details, photo, slogans, and campaign video |
| Candidate list | All candidates with their full résumés to help voters compare |
| Voting interface | Candidates' names and photos with a vote button next to each |
| Vote completion | Confirmation message and locking of the choice once the vote is cast |

## Database and System Design

The database was designed with an ERD around four main entities:

| Entity | Key fields and rules |
|---|---|
| Users | Unique ID, first and last name, email, password, phone number, national ID number, email-verified flag, user type, "has voted" flag, profile photo |
| Candidacy requests | Request number, linked user, status (pending, accepted, rejected), admin notes; only one request per user |
| Résumés | Full name, official photo, candidate summary, slogans, campaign video link; one résumé per candidate (1:1), created only after the request is accepted |
| Votes | Operation ID, voter ID, candidate ID; one vote per user (1:1), and unlimited votes per candidate (N:1) |

These constraints are enforced at the level of database relationships to prevent duplicate candidacy requests or voting more than once.

## What the Prototype Achieved

- A complete electronic voting cycle from account creation to casting a vote.
- Separation of permissions by role (voter, candidate, administrator).
- A documented candidacy path with clear statuses and admin notes.
- Display of candidate data and programs before voting.
- Prevention of duplicate voting and of changes after confirmation through database constraints and interface design.

The book includes no performance or security testing and no trial with real users, so these results are functional: they show the election cycle working in the prototype environment.

## Project Limitations

- The system is an academic application prototype, not a governmental election system or an officially accredited electoral platform.
- The system does not currently verify voter identity via email or OTP; accounts are activated immediately after registration.
- The book acknowledges that the system relies on a conventional database and password authentication and lacks advanced measures such as full encryption, blockchain, or zero-knowledge proofs.
- The vote record links the voter ID to the candidate ID, so the system is not presented as guaranteeing ballot secrecy or full security before undergoing security testing and obtaining independent certifications.

## Possible Future Development

According to the directions set out in the project:

- Two-step verification with an OTP code sent to the user's phone.
- Multilingual support, and a more interactive interface with charts and tables for data analysis.
- Integrating blockchain to store votes in a tamper-proof ledger, with a mechanism that lets voters confirm their vote was recorded without revealing their identity.
- An AI system that analyzes voting patterns to detect abnormal behavior.
- Additional candidate eligibility checks, communication tools between candidates and voters, and a system for handling complaints and inquiries.
- Improving the infrastructure to support more concurrent users, and enabling voting for citizens abroad.

## A Note on Privacy

The system collects sensitive personal data such as national ID and phone numbers, and stores vote records linked to users. Any real-world use therefore requires encrypting this data, separating voter identity from the vote, controlling access rights, and an independent security review.

## Planning a Similar System?

If you are working on a web platform for voting or institutional operations and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
