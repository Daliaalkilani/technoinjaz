# FocusBac — Baccalaureate Learning App

**FocusBac** is a free digital learning app for Baccalaureate students in both scientific and literary tracks, providing an organized, interactive learning environment that tackles dense curricula and scattered resources, with a cumulative-learning mechanism that requires passing lesson quizzes to unlock subsequent content.

Built on the microlearning concept — content delivered as short, focused segments — the app adds gamification through progress tracking and points to boost motivation and sustained engagement.

## Technical Environment

- Flutter / Dart
- Laravel (PHP)
- MySQL
- Filament
- Eloquent ORM
- RESTful API
- Caching

## Mastery-based learning flow

- **Learning for mastery:** students advance to the next lesson only after passing a short quiz on the current one with the required score.
- **Chunked content:** the curriculum is broken into small, clear units that help sustain focus.
- **Progress tracking:** points and achievements provide immediate feedback that supports self-regulated learning.
- **Study-time organization:** a clear learning path reduces pre-exam stress and chaos.

## Administration and content management

An admin dashboard manages users, subject categories, tracks, and educational links, with full authentication, per-student progress tracking, and follow-up reports.

## Technical architecture

The frontend is built with Flutter for Android and iOS; the backend uses Laravel with the MVC pattern, Eloquent ORM, and the Filament admin panel, a relational database managed through migrations, RESTful API communication, and caching for performance.
