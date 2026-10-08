# Online Fitness Coach — AI-Powered Training Platform

**Online Fitness Coach** is a mobile app for home fitness training that uses **generative AI through the Gemini API** to generate personalized training plans from the user's data (age, weight, height, goals, activity level), deliver daily tips and periodic progress reports, and answer questions in natural language. It was carried out by a team of students with technical assistance from **Techno Enjaz**, and it brings together in one platform an **AI coach** and **human trainers** whom users can book sessions with and message.

The app's interface is built with **Flutter** and Dart, with a back end on **Cloudflare Workers**, **Cloudflare R2** storage for reference exercise videos and files, and a relational **Cloudflare D1** database. Personalization relies on **text and numeric data only**: the app does not analyze the user's photos or videos and needs no extra sensors, and the videos it shows are for reference and instruction only.

## Project Facts

| Item | Details |
|---|---|
| Project type | Mobile fitness-training app powered by generative AI |
| Field | Generative AI, natural language processing, digital health and home training |
| Project status | Implemented app with documented screens, without a field trial with users |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter, Dart, Gemini API, Cloudflare Workers, Cloudflare R2, Cloudflare D1 (SQLite) |
| Outputs | Generated weekly training plans, daily tips, monthly reports with charts, trainer session booking, inquiry system |

## The Problem

Many people are turning to home training and digital apps, but the lack of direct supervision raises the risk of injuries from incorrect technique and reduces the effectiveness of workouts because there is no feedback. Most traditional fitness apps also rely on static video content that does not adapt to the user, while personal trainers and gyms are expensive.

On the other hand, commercial apps that analyze movement with computer vision (such as Onyx, Kemtai, and Tempo) depend on high-end phones, LiDAR depth sensors, or costly subscriptions. The project therefore chose a lighter approach: **interactive, text-based fitness consultation** that runs on mid-range Android phones and addresses three gaps the project identified:

- **Personalization gap:** dynamic plans that change weekly with the user's progress instead of fixed plans.
- **Conversational gap:** an assistant that can be asked questions and understands the context of fitness questions.
- **Language and local-context gap:** a simplified Arabic interface with RTL support that understands common Arabic fitness terms.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for mobile apps that combine generative AI models with edge cloud infrastructure.

## How Does the Smart Fitness Coach Work?

1. The user selects their gender on the home screen (with male and female versions), then creates an account with name, email, and password, or through an external account.
2. They enter basic data such as age, height, and weight, on which the plans and health indicators are built.
3. They choose the **AI coach** or a human trainer from the list of available trainers according to specialty.
4. The Flutter app sends requests over HTTP / REST to the Cloudflare Workers back end, which acts as the API gateway and handles authentication.
5. The back end sends the user's text and numeric data to the **Gemini API** with engineered prompts that require answers grounded in fitness references, and receives the response in displayable **JSON**.
6. The plan, activities, and reports are stored in D1 and shown to the user as a weekly program, daily tips, and monthly reports.
7. The user logs meals and workouts daily, so tips and plans adapt to what they record, and can book a session with a trainer or send them an inquiry.

## Roles in the System

| Role | Tasks |
|---|---|
| Regular user | Create an account, enter personal and health data, request an AI plan, log activities and meals, book sessions, view reports, send inquiries |
| Personal trainer | Manage availability, review booking requests and accept or reject them, follow up on inquiries, give feedback and guidance |
| AI coach (Gemini) | Generate training plans automatically, give tips, analyze daily activity data, generate reports and summaries |
| Administrator | Manage trainer data, monitor users, oversee content and services, and monitor system operations |

## Cloud Architecture of the App

The system uses a multi-tier architecture with four components:

- **Flutter / Dart interface:** interactive screens with Arabic and RTL support, and asynchronous programming (async/await) that keeps the UI from freezing while waiting for AI responses. Libraries used include http and dio for API calls, video_player for reference videos, charts_flutter for charts, and camera and image_picker for images.
- **Cloudflare Workers:** a serverless back end at the edge, with modules for user management, exercises, bookings, reports, and inquiries, integrated with the Gemini API.
- **Cloudflare D1:** a relational database built on SQLite storing users, plans, daily activities, meals, reports, trainers, appointments, and inquiries.
- **Cloudflare R2:** S3-compatible object storage for reference exercise videos and files, with encryption in transit (TLS 1.3) and at rest (AES-256 GCM).

The entity-relationship (ER) diagram links the users table to workouts, meals, and monthly reports, trainers to appointments, inquiries to their messages, and training plans to their days.

## App Screens

| Screen | Function |
|---|---|
| Home screen | App introduction, gender selection, sign-up or login, with admin and trainer entry points |
| Personal data entry | Collects age, height, and weight to build plans |
| AI coach / trainer selection | Shows the AI coach and the list of human trainers with their specialties |
| User dashboard | Summary of current status, the daily plan, and progress level |
| Weekly training program | Completion percentage and the daily exercise schedule with each exercise's name, duration, and status |
| Daily tips | Logging meals and workouts and showing tips generated from activity and health data |
| Monthly reports | Charts of weight change and the number of meals and activities logged during the month |
| Inquiries | Lists the user's inquiries and creates a new one with a choice of trainer |

## Documented Results

The project documents the implementation of the app and its core screens, its integration with the Gemini API to generate plans, tips, and reports in JSON, and a platform with four roles covering planning, follow-up, and evaluation. Challenges it addressed include separating the reference videos stored on R2 from the AI-generated written tips, and limiting generic or inaccurate answers through prompt engineering and post-processing of responses before display.

The project includes **no quantitative measurements** of its own, such as actual response time, plan quality, or a trial with trainees. The Cloudflare figures it cites (such as edge latency and storage pricing) are general platform specifications, not results measured in this app.

## Limitations of the Current Version

- The app does not analyze exercise performance or body posture; guidance is text-based on the entered data, and it does not detect movement errors during workouts.
- The quality of plans and tips depends on the Gemini model's output and has not been scientifically evaluated against a human trainer.
- The app depends on an internet connection and cloud services.
- It mainly targets Android and core bodyweight exercises, and current plans are weekly.
- Its guidance does not replace consulting a specialist in case of injury or a health condition.

## Possible Future Development

According to the project's recommendations, the app could be extended through:

- Generating plans longer than one week and integrating nutrition and calorie data into the same model.
- Connecting smartwatches and fitness bands to collect heart rate and steps as extra inputs to the Gemini model, without resorting to video processing.
- Supporting weight-resistance, flexibility and balance training, yoga, and Pilates.
- Supporting iOS, web, and desktop, and improving battery and memory use on mid- and low-range phones.
- Running experimental studies comparing training with the system against training with a human coach.
- Adding languages such as English and French, and augmented reality (AR) guidance.

## Privacy Note

The app processes personal and health data such as weight, meals, and activities, so any real deployment needs clear data-protection policies, user consent for sending data to cloud AI services, and compliance with local and international regulations.

## Planning a Similar System?

If you are working on an AI-powered fitness app or smart coach and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
