# Rifq — Smart Pet Care & Protection Platform

**Rifq** is an integrated Arabic web platform for the care and protection of pets and stray animals, developed by a team of students with technical assistance from **Techno Enjaz** and designed for the needs of the Syrian community. The platform brings together electronic shelter management, a documented adoption system, medical and behavioral records for animals, and an **AI clinic** that uses the **Google Gemini API** to analyze images and video, along with an online store for pet supplies and a loyalty points system.

The platform is built with **Laravel 12**, the **Filament** admin panel, and a **MySQL** database. Instead of relying on IoT devices, each animal is linked to **a unique QR code** printed on a sticker or an ordinary collar; scanning it with any smartphone opens a public page showing the animal's profile and medical record without logging in.

## Project Facts

| Item | Details |
|---|---|
| Project type | Integrated web platform for animal care and adoption management |
| Field | Web development, generative AI, veterinary informatics |
| Year | 2025–2026 |
| Project status | Working system whose main components were tested in a simulated operating environment |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Laravel 12, Filament, MySQL, Google Gemini API, Spatie Permission, Tailwind CSS, Alpine.js, Simple QRCode |
| Outputs | Digital animal profiles with QR codes, online adoption marketplace, AI clinic, behavior-expert chat, store and loyalty points, admin panel with five roles |

## The Problem

Most animal-welfare associations and veterinary centers in Syria rely on paper records, which leads to lost data and makes it hard to track animals' medical cases. There are no unified systems that identify animals digitally and link them to their health records, no applications that make adoption and communication between citizens, associations, and veterinarians easy, and the use of AI in local veterinary diagnosis remains limited.

After reviewing similar systems such as the Anna platform, Doctor Vet, Scribenote, and Petfinder, the project noted that each addresses only one aspect, such as health records, adoption, or clinical documentation, so Rifq was designed to bring these aspects together in a single Arabic platform.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for web platforms that combine generative AI with management and e-commerce systems.

## How Does Rifq Work?

1. An association or shelter representative registers a stray animal in the system, and a unique UUID and an SVG QR code are generated for it with the Simple QRCode library.
2. The code is printed on a sticker or an ordinary collar; scanning it shows the animal's profile: name, species, breed, age, photo, and medical records.
3. The veterinarian adds medical records, treatments, and vaccinations to the animal's profile.
4. A citizen browses the adoption marketplace, accepts the adoption terms and submits a request, then follows its status on the "My Requests" page, with notifications on approval or rejection.
5. The user uploads an image or video to the smart clinic; the system sends the media to Gemini and returns an analysis that is saved in the scan-results table.
6. The user buys supplies from the store and collects loyalty points from their activity on the platform.

### The Animal's Life Cycle in the System

A state diagram defines the animal's path through the system: it starts by being registered as **stray** and issued a QR code, then moves to the **shelter**, where it may receive **veterinary treatment** or become **ready for adoption**. When an adoption request is approved it moves to **"adopted"**, and it can return to the shelter if the adopter gives it back; it can also move to a deceased state at any stage. This structure prevents illogical transitions between states.

## The AI Clinic with Google Gemini

The project did not build deep-learning models from scratch; it relies on the **Google Gemini API** with the **gemini-2.5-flash** and **gemini-3.1-pro-preview** models, through an internal service (AIService) that sends HTTP requests containing text and base64-encoded media.

| Feature | Media type | Main outputs | Storage |
|---|---|---|---|
| Image analysis | JPEG/PNG image | Species, breed, health status, behavior, confidence score | ai_scans table |
| Video analysis | Video from which several frames are extracted | Comprehensive behavioral analysis across multiple frames | ai_scans table |
| Behavior-expert chat | Text | Interactive behavioral consultation, adding loyalty points | chat_messages table |
| Daily tips | Text request | Five daily care tips | Cached for 24 hours |

The clinic aims at a **preliminary diagnosis** of skin conditions and analysis of behavioral and psychological state. It includes an interface for uploading images and video with preview before upload and drag-and-drop, plus a **veterinary medicines guide**.

## Roles and Permissions

The system uses role-based access control (RBAC) through the **Spatie Laravel Permission** package, with custom middleware and model-level policies:

| Role | Key permissions |
|---|---|
| Admin | All permissions: users, animals, store, and support |
| Vet | View animals, manage medical records, view AI scans |
| Citizen | View animals, submit adoption requests, use the smart clinic and store |
| Organization representative (Org_Rep) | Manage the organization's animals and adoption requests, generate QR codes |
| Employee | Full view, user management, access to the admin panel |

## Architecture and Technologies

The platform uses a multi-layer architecture: the user interface, the Laravel server, the AI service, the database, and the animal's QR collar, communicating over HTTP/HTTPS and REST APIs.

- **Backend:** Laravel 12 with an MVC structure, Eloquent ORM, and database transactions to keep operations consistent, such as creating an order, deducting stock, and adding points in one step.
- **Admin panel:** Filament with ten main resources: animals, users, organizations, adoption requests, medical records, AI scans, products, orders, support tickets, and conversations.
- **Frontend:** Blade templates with Tailwind CSS, with full Arabic and RTL support, the Cairo font, and Material Design 3 colors; Alpine.js for interactivity, Vite for builds, and Axios for AJAX requests with the CSRF token.
- **Database:** MySQL with thirteen tables, chief among them Users, Roles, Organizations, Animals, Medical_Records, Adoption_Requests, and AI_Scans, with ENUM fields for animal status and soft deletes for sensitive models.
- **Additional services:** database-stored notifications, and PDF reports generated with DomPDF, such as medical-record reports and order invoices.

### The Store and Loyalty Points

The store uses a session-based shopping cart that supports adding items, changing quantities, and removing items with stock checks. Users earn points for sending a message in the expert chat, completing a purchase, or opening a support ticket, and points are grouped into levels: gold, silver, bronze, and beginner.

## Platform Screens

| Screen group | Screens |
|---|---|
| Public pages | Home page, main services, contact the administration |
| User account and adoption | Login, profile, adoption marketplace, search and browse animals, animal details, adoption terms, My Requests |
| Online store | Store home page, product listing |
| Smart clinic | Clinic home page, image and video upload, veterinary medicines guide |
| Admin panel | Home page, general statistics, animal management, adoption request management, user management |

The interfaces are responsive and support different screen sizes.

## Documented Results

The system's main components were tested in a **simulated operating environment**, covering linking animals to unique QR codes, image and video analysis through Gemini, and processing adoption requests and purchases. The book reports that the results confirmed these components work efficiently.

The book does not report quantitative measurements of the accuracy of Gemini's analyses, such as the share of correct diagnoses or the number of images tested, nor measured response times, so the smart clinic's outputs are **preliminary assistive analyses**, not a documented clinical evaluation.

## Limitations of the Current Version

- The system covers pets and stray animals only (cats, dogs, and birds), not wildlife or complex medical cases that require specialized veterinary diagnosis.
- Smart analysis depends on the cloud-based Gemini service and an internet connection, and its accuracy was not measured on a defined test set.
- The store has no electronic payment gateway in the current version.
- The platform is web-only for now, without native mobile apps.
- The QR code is a digital identifier, not a tracking device, so it cannot locate a lost animal.

## Possible Future Development

According to the outlook in the project:

- Mobile apps for Android and iOS using Flutter or React Native, to scan QR codes and analyze images directly from the camera.
- Secure electronic payment gateways in the store.
- Broader AI capabilities, including X-ray and ultrasound image analysis, a recommendation system that suggests the most suitable animal for each adopter, and support for English and other languages.
- GPS chips combined with QR codes to track lost animals.
- Integration with government databases, such as the Ministry of Agriculture or municipalities, for animal statistics and health and epidemic risk management.
- Advanced dashboards analyzing adoption patterns and the most common diseases.
- A volunteering module for shelters with volunteer-hour tracking.

## A Note on Privacy

The animal's public page is shown on QR scan without login, so real-world operation needs clear rules on which data is publicly visible, protection of user and adopter data, and a review of the policy for sending images and video to the cloud service. The smart clinic's analyses remain advisory and do not replace an examination by a veterinarian.

## Planning a Similar System?

If you are working on a care-services or management platform and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
