# Smart Face Attendance with Anti-Spoofing

An academic project to develop **a smart student attendance system using face recognition with spoofing detection (anti-spoofing)**, carried out by a team of students with technical assistance from **Techno Enjaz**. The system captures student images through classroom cameras, extracts a 512-dimensional digital signature for each face with the **FaceNet512** deep learning model, and matches it against the signatures stored in an **SQLite** database to record attendance automatically during the lecture.

Before matching, each face passes through a liveness layer based on **MediaPipe Face Mesh** (468 facial landmarks) that detects blinking and analyzes depth and texture, aiming to stop proxy attendance with a printed photo or a phone screen. The result of each attempt is sent wirelessly to a **NodeMCU ESP8266** module that lights a green indicator for a recognized student and a red one for a rejected attempt. The project documents the design and the implemented interfaces; it does not include numerical measurements of recognition or spoofing-detection accuracy.

## Project Facts

| Item | Details |
|---|---|
| Project type | Automated face-recognition attendance system with liveness verification and IoT feedback |
| Field | Computer vision, deep learning, Internet of Things, smart educational systems |
| Project status | Working system with an implemented GUI, without published accuracy evaluation |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, OpenCV (Haar Cascade), DeepFace + FaceNet512, MediaPipe Face Mesh, SQLite, multithreading, CustomTkinter, Pandas, OpenPyXL, NodeMCU ESP8266 |
| Outputs | Automatic attendance recording, green/red LED indicators, management of sessions, rooms, and courses, present/late/absent reports, Excel export |

## The Problem

Manual roll calls consume the first minutes of every lecture, and paper records are easy to manipulate: **proxy attendance** is common and hard to control. Transcribing paper sheets and preparing reports is also an administrative burden prone to errors, damage, and data loss. Fingerprint systems, meanwhile, are slow with large numbers of students and require physical contact.

The project therefore set out to build a **contactless** solution based on computer vision that does not stop at matching a face, but first verifies that the face in front of the camera is live rather than a photo or a screen, handles several rooms at the same time, and provides instant feedback, central archiving, and exportable reports.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that combine face recognition and spoofing detection with IoT in educational applications.

## How the System Works

The project's activity diagram describes the attendance path for a single student as follows:

1. The student enters the camera's view; **OpenCV** captures the frames and pre-processes them (grayscale conversion and resizing).
2. The face is detected and located with a **Haar Cascade** classifier.
3. **Liveness layer:** MediaPipe Face Mesh extracts a mesh of 468 landmarks, the **Eye Aspect Ratio (EAR)** is computed to detect blinking, and depth and texture are analyzed. If an attack with a photo or screen is detected, a red-light command is sent immediately and the attempt ends.
4. **Recognition layer:** FaceNet512 extracts a 512-dimensional face embedding, and the **Euclidean distance** between it and the embeddings stored in SQLite is computed.
5. If the distance is below **the threshold set in the project (0.20)**, the student is considered recognized and attendance is recorded.
6. **IoT layer:** the command is wrapped in a **TCP** packet and sent over Wi-Fi to the NodeMCU's IP address: command "1" lights the green indicator, and command "0" lights the red one when the liveness check fails or no match is found.

## Anti-Spoofing Layers

| Protection layer | Mechanism | Targeted attack |
|---|---|---|
| Blink detection | Landmark tracking and EAR variation | Static photographs |
| Spatial depth analysis (3D depth) | Geometric variation between landmarks | Flat masks and display screens |
| Texture analysis | Spatial variance (Laplacian variance) | Distinguishing skin texture from screen pixels |
| Micro-movements | Differences between consecutive frames | Rigid faces and high-resolution photos |

The anti-spoofing feature can be switched on or off from the live recognition screen.

## Architecture and Components

The system architecture is split into two nodes connected over Wi-Fi (IEEE 802.11 b/g/n):

- **Processing server:** a PC or local server hosting the AI layers, the database, and the GUI. It relies on **multithreading**: a separate thread per camera and a separate thread for the database, with the user interface isolated from background processing to avoid freezing, and locks protecting shared resources. It was designed to handle **up to four rooms** concurrently.
- **Classroom node:** the cameras, the NodeMCU module, and the indicator lights.

| Component | Role in the system |
|---|---|
| NodeMCU ESP8266 | Wireless node with a 32-bit Tensilica L106 processor and 2.4 GHz radio; receives TCP commands through the LwIP stack and drives the indicators via GPIO pins |
| LED indicators | Green to confirm attendance, red for rejection |
| Jumper wires | Carry GPIO signals and power from the module to the indicators |
| USB 2.0 cable | Connects the PC to the board's serial converter chip (UART link, used for AT-command control) |
| Cameras | Capture the live stream, at 720p or higher |

Documented working environment: a multi-core processor, 8 GB of RAM or more, Windows 10/11 or Linux, and Python 3.8 or later.

## System Screens

The GUI is built with **CustomTkinter** and includes the following screens:

| Screen | Function |
|---|---|
| Login | Username and password, Arabic/English switching, and role-based access |
| Main screen | Quick access to student management, sessions, recognition, reports, analytics, and user management |
| University management | Tabs for faculties, specializations, courses, and rooms with add, edit, and delete |
| Academic years | Add, edit, and delete academic years |
| Attendance session setup | Choose the room and course, set the attendance window and lateness period, then start the session |
| Live recognition | Status of each room, start/stop, number of detected faces, session timer, camera selection, and anti-spoofing toggle |
| Session reports | Present, late, and absent counts per session and student attendance details, with viewing and export |
| Advanced analytics | Overall statistics and charts of attendance status distribution, per-student analytics, and Excel export |

Attendance records are processed with **Pandas** and exported to Excel files with **OpenPyXL**.

## What the Project Documents as Results

The project presents the implemented interfaces and the architecture, activity, and sequence diagrams, and concludes that the design meets the stated functional requirements. However, it **provides no numerical measurements** of recognition accuracy, false acceptance or rejection rates (FAR/FRR), spoofing-detection rate, response time, or actual performance across four rooms. The system's capabilities should therefore be read as designed and implemented capabilities, not measured evaluation results.

## Limitations of the Current Version

- No test data is published on the number of students or images or the test conditions.
- Spoofing detection relies on an ordinary camera and software algorithms, without depth or infrared sensors.
- The database is local (SQLite), which suits standalone operation but does not link several buildings to a central server.
- The matching threshold needs careful tuning; the studies reviewed in the project point to the risk of false positives in crowded rooms.
- Unshielded jumper wires are susceptible to electromagnetic interference in environments full of devices.

## Possible Future Development

According to the directions set out in the project:

- Moving to a central database such as MySQL or PostgreSQL to connect all buildings, with institution-wide dashboards and backups.
- RESTful APIs to integrate with learning management systems such as Moodle and Blackboard and with student-affairs systems.
- Edge computing: running lightweight models (such as MobileNet) on a Raspberry Pi 5 or NVIDIA Jetson Nano at each room entrance and sending only the student ID and arrival time.
- A mobile app for instructors to follow attendance live, adjust exceptional cases, and receive alerts when a cheating attempt is detected.
- Infrared or depth cameras (such as Intel RealSense) for faster, more decisive spoofing detection, plus shielded cables and high-gain external antennas.
- Newer models such as AdaFace or Vision Transformers.

## A Note on Privacy

The system stores facial embeddings and personal data of students, which is sensitive biometric data. Any real-world use requires clear student consent and controls over access rights, retention period, and data protection.

## Planning a Similar System?

If you are working on a face-recognition attendance system with anti-spoofing and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
