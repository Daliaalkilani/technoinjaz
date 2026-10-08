# Kindergarten Management System with Flutter and Laravel

A project to design and develop **an integrated kindergarten management system** that connects kindergarten administration with parents, carried out by a team of students with technical assistance from **Techno Enjaz**. The system consists of **an Android app for parents built with Flutter**, a **web dashboard for the administration**, and a back end built with **Laravel** and a MySQL database, with a RESTful API documented according to **OpenAPI (YAML)** standards.

The system covers the kindergarten's daily operations: attendance, child profiles and classrooms, health records and indicators, daily meals, weekly schedules, events and trips, learning resources, media, and messaging between parents and administration. Its design revolves around three groups: the parent, the kindergarten administration, and the child as the center of the data, with a fully Arabic interface.

## Project Facts

| Item | Details |
|---|---|
| Project type | Management system: mobile app for parents and web dashboard for administration |
| Field | Mobile apps, web development, educational institution management, early childhood education |
| Year | 2024–2025 |
| Project status | Working system tested in a local test environment |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter and Dart, Laravel and PHP, MySQL, RESTful API, OpenAPI (YAML), Bootstrap |
| Outputs | Android app for parents, web admin dashboard with thirteen screens, documented API, central database |

## The Problem

Many kindergartens rely on paper records and traditional management methods, which makes accurate information hard to access, delays communication with parents, and exposes data to loss. As enrollment grows, these processes become even more complex.

Administrators struggle to deliver announcements and updates to parents quickly, tracking children's health and nutrition requires manual effort, and parents lack a secure way to follow their children's daily activities through photos and reports. The project also noted that international systems such as Brightwheel, Kinderpedia, and Illumine do not always allow services to be tailored to kindergartens in Arabic-speaking countries, and focus on administration more than on supporting learning itself.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for management-system projects that combine a Flutter app with a Laravel back end and a documented API.

## How the Kindergarten Management System Works

1. The administration signs in to the web dashboard with email and password, manages user accounts and roles, and activates parent accounts.
2. The administration registers children, linking each child to a parent and a classroom, and creates classrooms with their age groups.
3. Attendance is recorded daily per child or for a whole class at once, with check-in and check-out times and notes.
4. The administration adds daily meals, weekly schedules, events and trips, learning resources, and photos and videos, and publishes announcements targeted at specific groups.
5. Data flows through the RESTful API to the Flutter app, where the parent signs in.
6. From the app, the parent follows the child's attendance, meals, activities, and health indicators, receives notifications, messages the administration, and submits feedback.

## Administration Web Dashboard

| Screen | Function |
|---|---|
| Login | Email and password, with remember-me and password recovery |
| Main dashboard | Attendance rate; total, present, and absent children; latest events, announcements, and enrollments |
| Attendance | Child search, class and date selection, bulk class check-in, entry and exit times |
| Children management | List with photos, age, gender, date of birth, class, and parent, with add, edit, delete, and search |
| Classroom management | Class name, description, age group, and number of children |
| Users and parents | Accounts by role and their status (active or inactive) |
| Meals | Add meals and view them by date and class |
| Announcements | Create announcements and target them to a specific group |
| Events and trips | Name, time, location, and number of participants |
| Learning resources | Classified by type, subject, and target age |
| Media | Photos and videos by type, upload date, and class |
| Messages | Inbox and outbox with read status and new-message option |
| Parent feedback | Feedback by parent, child, and date |

## Parent App (Flutter)

The app was designed for Android devices. Its main menu includes meals, daily media, daily activities, attendance, notes, health indicators, health record, learning materials, events, and educational games. Key screens include:

- **Home page:** a greeting for the parent with notifications about events, meal updates, and periodic medical reminders.
- **Health indicators:** colored rings showing indicators for drinking, eating, mental well-being, physical activity, vision, and hearing.
- **Weekly activity schedule** and **upcoming events** with their timing and organizer.
- **Communication:** message threads with the administration and the option to start a new one.
- **Classrooms:** the class groups (such as Group A and Group B) and the type of activities in each.
- **Games gallery:** educational games such as memory, coloring, letters, and bubbles.
- **Profile:** edit personal data and change password.

## Technical Architecture and Data Model

- **Front end:** Flutter with Dart for a responsive mobile app.
- **Back end:** Laravel with PHP in an MVC architecture, plus a web admin dashboard using Bootstrap.
- **Integration:** a RESTful API documented with OpenAPI (YAML) to make it easier to connect other interfaces or services in the future.
- **Database:** MySQL, with main entities: users (the central entity for all roles), children, health_records, weekly_schedules, activities, educational_materials, meals, messages, feedbacks, and media_files.

Each child is linked to one parent, a parent can be responsible for several children, and most of the system's data (health records, schedules, meals, notes, and media) revolves around the child. The system applies role separation: the administration has create, update, and delete operations, while parents are limited to viewing and interacting.

## Documented Results

According to the project's documentation:

- The administration dashboard and the parent app were developed with all the screens listed above, and screenshots of each are presented.
- The system automated tasks previously done by hand: organizing child data, tracking attendance, following health and behavioral status, and organizing classes, meals, and activities.
- The system was stable during tests in the local environment, and the initial evaluation described flexible use, a reduction in the time needed for administrative tasks compared with manual methods, and better communication thanks to notifications and messaging.

The report gives no figures for these observations, such as measured response time, number of test users, or percentage of time saved, so they should be read as results of a **working system tested locally**, not as measurements from live operation in a kindergarten.

## Limitations of the Current Version

- The app targets Android only and does not support iOS at this stage.
- The interface is in Arabic only.
- It does not include e-payment, data-analytics tools, or artificial intelligence.
- There is no dedicated interface for teachers; recording and management are done through the admin dashboard.
- Testing took place in a local test environment, not in an operating kindergarten.

## Possible Future Development

According to the proposals in the project, the system could be developed by:

- In-app electronic payment of fees and expenses.
- A parallel iOS app, and support for additional languages, especially English.
- Exporting child reports as PDF and Excel.
- Dedicated teacher interfaces for recording daily notes and assessments.
- Expanding the educational games library with assessment of the child's understanding.
- A personalized notification system based on user behavior, and Google Calendar integration for event, vaccination, and meal reminders.
- A business-intelligence module with analytics on attendance, activities, and health, and an AI module to suggest proactive educational or health interventions.

## Privacy Note

The system handles children's data, photos, and health records, which is why the project lists encryption and permission management among its security requirements. Any real deployment needs parental consent and clear rules on who can access media and how long it is retained.

## Planning a Similar Management System?

If you are building a mobile management platform and need technical help developing the idea or delivering a working product, you can contact the **Techno Enjaz office** to discuss the project's requirements and the appropriate scope of support.
