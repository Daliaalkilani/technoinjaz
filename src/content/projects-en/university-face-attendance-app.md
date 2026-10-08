# University Face-Recognition App for Attendance & Access Control

A project to develop **an intelligent system that records student attendance and controls access to lecture and exam halls using face recognition**, carried out by a team of students with technical assistance from **Techno Enjaz**. The system captures live video from the camera, detects faces, converts them into a numerical representation (embedding) that it compares with the student database, and records attendance only if the student passes the liveness check and is registered for the correct session and hall within the allowed time.

The system was built as a **Python** desktop application using **OpenCV**, **DeepFace**, and **MediaPipe** for anti-spoofing, with an **SQLite** database, **Excel** reports, and multi-role **CustomTkinter** interfaces. It was tested on a laptop's built-in camera, and the report states that recognition ran in real time with high accuracy and near-instant response, without giving numerical values for that accuracy.

## Project Facts

| Item | Details |
|---|---|
| Project type | Desktop application for face-recognition attendance and access control |
| Field | Computer vision, biometrics, academic administration |
| Year | 2025–2026 |
| Project status | Working system tested on a laptop's built-in camera |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python 3.11, OpenCV, YOLOv8, DeepFace (FaceNet512/ArcFace), MediaPipe, SQLite, Pandas, OpenPyXL, CustomTkinter |
| Outputs | Automatic attendance, rejection of spoofing attempts, academic administration, daily reports and historical logs in Excel, analytics dashboard |

## The Problem

Many educational institutions still record attendance with paper lists or simple electronic systems. These methods consume lecture time, are prone to human error, and make manipulation and impersonation easy. The problem is more sensitive in exam halls, where each student must enter the hall assigned to them according to the official name lists issued by the exams department, which include names, university IDs, and hall assignments.

## Project Objectives

- Automatically verify a student's identity before recording attendance or allowing entry.
- Ensure that only authorized students enter halls according to predefined groups and official lists.
- Reduce the time spent recording attendance.
- Limit cheating and impersonation, especially in exams.
- Provide digital reports that support academic administration.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for computer vision projects that combine face recognition and liveness detection with data management systems.

## How the System Works

1. **Video capture:** The camera in the hall runs and the live stream is split into frames, with **frame skipping** so that only one frame in several is processed, reducing CPU load.
2. **Face detection:** A **YOLOv8** model locates the face and separates it from the background, so only the face image passes to the next stages.
3. **Identity recognition:** The **DeepFace** library converts the face image into a numerical vector (512 dimensions with the FaceNet512 model), which is compared with stored vectors using **Euclidean distance** against a predefined matching threshold.
4. **Liveness check in parallel:** **MediaPipe** extracts facial landmarks to track blinking (via the Eye Aspect Ratio) and head movement, together with motion analysis between frames and texture analysis to distinguish printed photos and videos from a real face.
5. **Academic check:** The system confirms that the student is registered for the current session, is in the correct hall, and is within the allowed time.
6. **Decision:** If any check fails (spoofing attempt, wrong hall, late arrival), registration is rejected and an alert is shown; if all stages pass, attendance is saved to the database with the registration time.

## Technologies Used

| Tool / technology | Use in the system |
|---|---|
| Python 3.11 | System development and integration of all components |
| OpenCV | Video capture, frame processing, and image enhancement |
| YOLOv8 | Detecting faces in the frame |
| DeepFace + FaceNet512 | Extracting facial features and recognizing identity |
| MediaPipe | Liveness detection and anti-spoofing (blinking and head movement) |
| SQLite | Storing student, session, and attendance data |
| Pandas and OpenPyXL | Processing attendance data and exporting reports to Excel |
| CustomTkinter | Graphical user interface design |
| Threading | Running cameras and processing in parallel without freezing the interface |

Note: the report's tools table names **FaceNet512** for feature extraction, while the workflow description and conclusion refer to the **ArcFace** model within DeepFace; both are models supported by the library.

### Software Structure and Multithreading

The system is divided into layers: the **user interface** (windows, live video, and reports), the **vision engine** (face detection, recognition, and liveness detection), the **database manager** (querying authorized students, recording attendance, and exporting reports), and the **local file system** for temporary face-print files and daily reports. The main UI thread is separated from the video-processing thread of each camera and from timer threads, with queues for safe data exchange, so that by design further cameras can be added.

## Database

A relational database with primary and foreign keys was designed, containing the following tables:

| Table | Contents |
|---|---|
| Majors | Majors and departments |
| Academic_Years | Academic years |
| Subjects | Courses linked to major and year |
| Students | Name, university ID, major, year, and the face-print file path (Face_Cache_Path) |
| Rooms | Lecture and exam halls |
| Sessions | Lectures or exams: course, hall, type, date, and time |
| Attendance | Links a student to a session with registration time and status |

## Application Interfaces

Use starts with a login screen, followed by a main interface with sections for student management, sessions, live streaming, reports, and university settings. The main interfaces include:

- **Academic administration:** majors, academic years, courses, halls, student data, and linking students to courses.
- **Face image management:** capturing new photos with the camera or loading them from files to create each student's biometric data.
- **Lecture session setup:** choosing the course and hall before attendance recording starts.
- **Recognition test:** checking the camera, recognition algorithms, and anti-spoofing protection.
- **Live stream:** displaying live video with real-time face recognition.
- **Reports:** completed reports, historical logs, daily reports, and an analytics dashboard for attendance and absence rates.
- **Role-based interfaces:** academic administrator, secretariat, and staff.

The Excel reports include session information (course, hall, date, number present) and a detailed list with name, university ID, registration time, and status.

## Documented Results

The system was tested on a Windows 10 computer using the **laptop's built-in camera**, and the report summarizes its results qualitatively:

| Criterion | Result stated in the report |
|---|---|
| Response speed | Near-instant |
| Face recognition accuracy | High, even with minor variations in lighting and angles |
| Spoofing detection | Effective against photos and videos |
| Interface stability | Stable during operation |
| Session and report management | Successful, with Excel export |
| Real-time operation | Supported |

These results are **descriptive**: the report does not give the number of students or images tested, nor numerical values for recognition accuracy, false acceptance or rejection rates, or processing time. The high accuracy figures for models such as ArcFace cited in the theoretical study come from published references on benchmark datasets and are not results of this system.

## Challenges and Limitations of the Current Version

The report lists a number of challenges, including:

- Recognition accuracy affected by poor lighting or high contrast in halls.
- Lower performance with side angles or large head rotation.
- Changed appearance due to glasses, masks, or hairstyles.
- High CPU and memory load when running cameras and deep models together.
- Managing concurrency between camera, processing, database, and report threads.
- Maintaining accuracy as the number of students grows, and protecting biometric data from unauthorized access.

In addition, the system was tested with a single built-in camera, the SQLite database runs on a local machine, and the report notes that scaling to many users may require moving to PostgreSQL or MySQL.

## Possible Future Development

According to the directions set out in the project:

- Running several synchronized cameras in large halls connected to a central network.
- More advanced techniques for detecting deepfakes and modern spoofing methods.
- Better recognition in low light, different angles, and fast motion, using newer models and GPU processing.
- Connecting the system to cloud services and central databases to manage several branches or institutions.
- A mobile app for following attendance, and instant notifications for absences or detected spoofing.
- An advanced permissions system, multi-language support, and automatic data backup and recovery.
- Integration with electronic exam systems and central academic systems.

## A Note on Privacy

The system processes students' face images and biometric data, so any real-world use requires informing students and obtaining their consent, defining access rights to face prints and attendance records, and encrypting the data and setting how long it is retained.

## Planning a Similar System?

If you are working on a face-recognition attendance and access-control system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
