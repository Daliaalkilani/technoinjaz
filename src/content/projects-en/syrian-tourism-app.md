# Smart Tourism Application for Promoting Tourism in Syria

An academic project to develop **a digital tourism app for promoting domestic tourism in Syria**, carried out by a team of students with technical assistance and support from **Techno Enjaz**. The app brings together in one platform the exploration of categorized tourist destinations, a city guide and travel tips, hotel and room booking, a digital store for Syrian handicraft products, a tourism blog and articles, and visitor experiences, with favorites and notifications.

The mobile app was built with **Flutter** and Dart, and the back end, APIs, and administration dashboard with **Laravel** following the MVC pattern, on a relational **MySQL** database. The system serves three main roles: **tourist**, **artisan**, and **system administrator**. The documented outcome is a working prototype with mobile interfaces and an admin dashboard, without operational data on economic impact or an actual increase in tourism.

## Project Facts

| Item | Details |
|---|---|
| Project type | Digital tourism platform: mobile app and administration dashboard |
| Field | Smart tourism, mobile apps, e-commerce for handicrafts |
| Project status | Implemented prototype with preliminary functional testing |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Flutter / Dart, Laravel / PHP, MySQL, Eloquent ORM, REST API, Bootstrap, JavaScript, Apache server |
| Outputs | Tourist and artisan app, handicraft store with cart and orders, hotel booking, tourism content, comprehensive admin dashboard |

## The Problem

The project notes that tourism in Syria fell sharply after 2011 and has begun to recover: the Ministry of Tourism figures it cites put visitors in 2024 at about 4.55 million. Yet the local market lacks a comprehensive digital platform with up-to-date content covering the variety of archaeological, natural, and religious sites, and tools to help visitors make decisions, so they turn to scattered sources.

Local artisans also struggle to reach tourists. The project therefore aimed to build a single app combining a tourist guide, booking, educational content, visitor experiences, and a digital handicraft market, so users can plan their trip without relying on outside sources.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that build multi-party platforms with a Flutter app, a Laravel server, and a relational database.

## User Roles

The project's use-case diagram defines three roles:

| Role | What they can do |
|---|---|
| Tourist | Explore tourist sites, read articles and experiences, edit their profile, book hotels and activities, rate places, and share experiences |
| Artisan | Add, edit, and delete products in the digital market, follow purchase orders, read content, and comment on experiences |
| System administrator | Manage the dashboard, review articles before publication, manage sites and users, and oversee bookings and orders |

Private operations such as booking, purchasing, and managing products require prior login.

## Mobile App Screens

The final screens documented in the project include:

- Login, a welcome screen, and the main menu.
- **Tourist destinations** with a description of each, and **visitor experiences** for each destination.
- **City guide** and **travel tips and guidance**.
- **Hotels**, plus **invoices and bookings** with details of each booking.
- **Products and handicrafts**, product details, a **shopping cart**, and order details.
- **Tourism blog** and articles.
- **Favorites** for saving sites, products, hotels, and articles.
- **Alerts and notifications** and their settings.

The interface is in Arabic by default.

## Administration Dashboard

| Section | What it manages |
|---|---|
| Dashboard | System overview |
| Users | Viewing and editing user information |
| Products | Product categories, products, and purchase orders with their details |
| Tourist sites | Site categories, sites with details and editing, and tourist activities |
| Hotels | Hotels, room types, rooms, and hotel bookings with their details |
| Content | Tourist-site experiences, and articles with details and editing |

## Technical Architecture and Database

- **Flutter / Dart:** a cross-platform app from a single codebase, with a layered structure separating presentation from services, models, and data repositories.
- **Laravel / PHP:** the back end, REST APIs, and admin dashboard following MVC, with Eloquent ORM for database access.
- **Bootstrap and JavaScript:** the admin dashboard interfaces.
- **Infrastructure:** an Apache web server and a central MySQL database.

The relational database is designed around the following tables:

| Area | Tables |
|---|---|
| Users | Users with account type and role, UserProfiles kept separate from login data, and UserPhoneNumbers for multiple numbers |
| Store | Products, hierarchical ProductCategories, ShoppingCartItems, ProductOrders, and ProductOrderItems |
| Tourism | TouristSites with coordinates, images, and video, SiteCategories, and TouristActivities with timing, duration, and participant count |
| Hotels | Hotels, HotelRoomTypes, HotelRooms with price, area, and availability, and HotelBookings with guest count and booking and payment status |
| Content and interaction | Articles with publication states, SiteExperiences, and Favorites, Ratings, and Comments using a polymorphic structure (target_type and target_id) |

Relationships rely on foreign keys with deliberate delete policies (cascade, restrict, or set null) according to data sensitivity, and timestamp fields in most tables.

## Test Results

The team verified the core functions, tested usability for the different user groups, and checked the flexibility of the dashboard and the accuracy of data handling. The project describes the results as **preliminary**, indicating a stable platform, smooth navigation between screens, and quick response in search, data entry, and editing.

The project provides no figures for response time or the number of test users, and no operational data to measure economic impact or an actual increase in tourism. Figures in its introduction about apps such as Visit Jordan, Visit Singapore, and Tiqets are results of those apps, not of this project.

## Challenges and Limitations of the Current Version

- The team faced difficulties linking the front end to the back end, managing complex tourism-classification data, and coordinating some screens; these were addressed by dividing the work and organizing tasks.
- The system does not yet include international online payment gateways; the project lists them as a later goal.
- The interface is currently in Arabic; support for other languages is a proposed development.
- The system is an academic prototype and has not been launched for public use.

## Possible Future Development

According to the project's proposals:

- An AI recommendation system that suggests destinations based on the tourist's interests and browsing or purchase history.
- Augmented reality for a virtual preview of sites before visiting, or interactive content through the camera on site.
- Integration with international online payment gateways to make booking from abroad easier.
- Multilingual interfaces, such as English, French, and Russian.
- Expanding coverage to remote villages and less-known areas.
- Cooperation with tourism and cultural bodies to enrich content with 3D images and interactive maps.

## Planning a Similar System?

If you are working on a tourism app or a digital platform that brings several services together and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
