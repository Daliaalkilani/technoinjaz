# FocusBac — Baccalaureate Learning App

**FocusBac** is a free mobile learning app for Syrian Baccalaureate students in the scientific and literary tracks, built by a team of students with technical assistance from **Techno Enjaz**. The app organizes the curriculum into a clear hierarchy (track, then subject, then unit, then lesson), delivers lessons as **short videos** following the microlearning approach, and links each lesson to **a short quiz: the next lesson unlocks only after the student scores 60% or more**.

The app is built with **Flutter** for Android in its first phase, with a **Laravel** backend, a **MySQL** database, and a **Filament** admin panel from which supervisors manage content, quizzes, and users. It adds gamification elements such as points, achievements, and per-subject progress, aiming to reduce scattering across sources and organize revision before exams.

## Project Facts

| Item | Details |
|---|---|
| Project type | Educational mobile app with an admin panel and an API |
| Field | E-learning, mobile learning, Flutter and Laravel development |
| Project status | First version implemented: admin panel, API backend, and core app screens |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter and Dart, Laravel and PHP, Filament, MySQL, RESTful API, Laravel Sanctum, YouTube API |
| Outputs | Android app for scientific and literary track students, supervisor admin panel, ten-entity database, API |

## The Problem: A Dense Curriculum and Scattered Sources

Baccalaureate students face a dense, sprawling curriculum, while revision methods remain largely traditional. Delivering a large amount of information in a short time raises **cognitive load** and weakens deep understanding and retention. Without a tool to organize learning, students move between many scattered sources, making it hard to tell reliable content from unreliable or to know what actually matches the curriculum.

Many video channels and general apps also rely on passive viewing with no check of understanding, which can create an "illusion of competence": students feel they have understood a lesson, then struggle to recall it in the exam. Moving to a new lesson without confirming the previous one leads to accumulating knowledge gaps, and the lack of immediate feedback means weaknesses surface too late.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for educational mobile app projects that combine a Flutter frontend, a Laravel backend, and an admin panel.

## App Objectives

- **Mastery learning:** requiring students to pass each lesson's quiz at a set score before moving to the next lesson.
- **Small, organized content (microlearning):** breaking the curriculum into small, clear units, mostly short videos.
- **Supporting self-directed learning:** showing points, achievements, and progress as immediate feedback.
- **Usability and accessibility:** a simple interface that works on a phone anytime, anywhere.
- **Reducing anxiety and organizing study time:** a predefined learning path that eases pre-exam chaos.

## How the App Works

Students follow a mandatory cumulative learning path:

1. Create an account or log in with email and password, with a password recovery option.
2. Choose their track (scientific or literary); the choice is saved and content is tailored to it.
3. Navigate hierarchically through subjects, then units, then lessons.
4. Watch the lesson video hosted on YouTube, with the option of low-quality playback for weak connections.
5. Take the lesson quiz: questions are shown, answers are submitted, and the score is calculated against the correct answers and displayed as a percentage.
6. With **60% or more**, the next lesson unlocks; otherwise the student retries.
7. Progress updates automatically, showing points, achievements, and completion percentage per subject.

## Supervisor Functions

| Category | Functions |
|---|---|
| Content management | Adding, editing, and deleting subjects per track, dividing them into sequential units, and adding lessons with their video link |
| Assessment management | Creating a short quiz for each lesson and setting the pass mark (60%), adding multiple-choice or true/false questions, and defining the correct answer and distractors |
| Monitoring | Tracking student progress (completed lessons, results, attempts), viewing reports and statistics, and managing accounts (activate, suspend, reset password) |

## Technical Architecture

| Layer | Technologies and role |
|---|---|
| Mobile app | Flutter and Dart with Material Design widgets, state management via Provider and BLoC, server communication via Dio/HTTP, the youtube_player_flutter player, and local storage via SharedPreferences and sqflite |
| Backend | Laravel on PHP using MVC, with Eloquent ORM, routing, Middleware for permission checks, Validation for registration data and quiz answers, and API Resources returning JSON |
| Admin panel | Filament for managing tracks, subjects, units, lessons, quizzes, users, and points, with roles and permissions (RBAC) |
| Database | MySQL normalized to third normal form (3NF), with tables created through Laravel Migrations |
| Integration | RESTful API with unified JSON responses (status, message, data), and YouTube Data API v3 for video hosting |

The API endpoints fall into four groups: authentication (register, log in, log out, refresh access token), content (tracks, subjects, units, lessons), quizzes and progress (fetch quiz, submit attempt, track progress, leaderboard), and profile and achievements.

## Data Model

The database was derived from the use cases into ten related entities:

| Entity | Description |
|---|---|
| User | Students and supervisors, distinguished by a role field |
| Branch | Study tracks (scientific, literary) |
| Subject | Subjects, linked to a track (one-to-many) |
| Unit | Units, linked to a subject |
| Lesson | Lessons, linked to a unit and holding the video link |
| Quiz | The lesson quiz, holding the pass mark |
| Question | Quiz questions |
| AnswerOption | Answer options with an is_correct field |
| UserProgress | Lesson completion status and attempts per student |
| QuizAttempt | Each quiz attempt and its result |

## Security and Performance in the Design

The design relies on token authentication through **Laravel Sanctum**, with a short-lived access token and a refresh token kept in secure storage on the device, role-based permission checks through Middleware, passwords stored hashed with bcrypt, encrypted connections, validation of all inputs, and returning only the necessary fields. For performance, the design includes caching in Laravel, lazy loading of lists in Flutter, and compression of JSON data and images.

## What the Implementation Documents

The project's implementation chapter presents the following components:

| Implemented component | What it shows |
|---|---|
| users table in phpMyAdmin | Users with ID, name, email, hashed password, and track ID, plus two test accounts (admin and regular user) |
| Admin panel login | Email and password with show/hide and a "remember me" option, rejecting incorrect attempts |
| Admin dashboard home | A sidebar for users, points, tracks, subjects, units, lessons, and quizzes |
| User management | A table of name, email, role, and track with search, filtering, adding, and editing |
| AuthController | Logic for registration, login, and logout with data validation |
| api.php file | Routes for registration, profile, track selection, subjects, lessons, quizzes, and submitting answers, protected by the auth middleware |
| Migration files | Creating the users table linked to tracks via branch_id, plus session and password-reset tables |
| App screens | Onboarding, login, registration, track selection, and the home screen with "continue learning" and per-subject progress |

## Limitations of the Current Version

- The first version targets **Android** only; iOS support is deferred to a later phase.
- The app covers the scientific and literary tracks and does not include the vocational track or other education stages.
- It has no chat or direct communication between students and teachers, and does not accept external links or sources not managed by supervisors.
- The implementation chapter shows the admin panel, login, and home screens, but includes no screenshots of the lesson and quiz screens themselves.
- The document reports no trial with real students and no measurements of the app's effect on achievement or of server performance; the percentages cited in the review of previous studies belong to other research.

## Possible Future Development

According to the outlook set out in the project:

- Releasing an iOS version and building a web app for computers and tablets.
- Adding the vocational track and studying expansion to other education stages.
- Adaptive learning that adjusts recommended content or question difficulty based on each student's performance.
- A recommender system suggesting lessons or revision sources based on answer patterns, supported by generative AI where possible.
- Discussion forums per unit, followed by moderated chat supervised by staff.
- Content delivery networks (CDNs) to speed up video loading in areas with uneven connectivity.
- Learning analytics tools for supervisors on completion rates, pass rates, and common weak points, plus stricter data-protection policies.

## Planning a Similar System?

If you are working on an educational app or academic platform for students and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
