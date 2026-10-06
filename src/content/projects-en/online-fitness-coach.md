# Online Fitness Coach — AI-Powered Training Platform

**Online Fitness Coach** is an interactive platform built on generative AI to deliver accurate, personalized training guidance — bridging the gap between home workouts and professional coaching, and addressing the movement errors that cause injuries and weak results in self-guided online training.

The system's intelligence relies entirely on the Gemini API, generating custom training plans from personal data (age, weight, height, goals, activity level) without extra sensing hardware or complex video processing.

## Technical Environment

- Flutter / Dart
- Gemini API
- Cloudflare Workers
- Cloudflare R2
- Cloudflare D1
- Generative AI

## Smart features

- **Personalized training plans:** generated automatically from personal data and goals.
- **Daily smart tips:** fresh guidance matching the user's progress.
- **Periodic analytical reports:** tracking progress and analyzing outcomes.
- **Natural-language chat:** responding to user questions conversationally.

## Cloud architecture

The UI is built with Flutter and Dart for a smooth, responsive experience; the backend runs on Cloudflare Workers providing edge computing that cuts latency, with R2 cloud storage for videos and files and a D1 relational database managing users, plans, and appointments.

## Value

The platform delivers an interactive, low-cost training environment combining accessibility with AI-backed guidance quality, putting professional-grade coaching within reach of home users.
