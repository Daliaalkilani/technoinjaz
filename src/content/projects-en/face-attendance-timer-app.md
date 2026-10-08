# Face-Recognition Student Attendance with Session Timer

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to develop **an application that records student attendance in lectures through face recognition**, combined with a **session timer** that defines the allowed attendance window. A camera continuously captures frames of the classroom during the lecture; the system detects faces in them with the **YOLO** algorithm via the Ultralytics library, compares them with pre-stored student photos, and automatically records the name of every student it recognizes.

When the lecture ends, the application exports an **Excel file** listing the students present and their entry times. The system's rules mark anyone arriving after the allowed window as late or absent, refuse attendance for anyone not registered for that classroom, and clear the session data automatically in preparation for the next lecture. The project is a **working prototype**, and its report does not include quantitative measurements of recognition accuracy.

## Project Facts

| Item | Details |
|---|---|
| Project type | Prototype attendance application based on computer vision |
| Field | Artificial intelligence, computer vision, face recognition, educational administration |
| Project status | Prototype implemented with a live recognition interface and Excel export |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, YOLO (Ultralytics library), OpenCV, Anaconda, Jupyter Notebook, Visual Studio Code |
| Outputs | Automatic recognition of student faces, attendance logged with entry time, Excel file of attendees |

## The Problem: Why Traditional Attendance Methods Fall Short

Most educational institutions still record attendance with paper lists, roll calls, or handwritten signatures. These methods take up part of the lecture, are prone to human error such as forgetting or duplicating names, and allow manipulation through students signing on behalf of absent classmates. As student numbers grow, tracking absence and lateness by hand becomes an increasing administrative burden.

Cards, ID numbers, and fingerprint devices improve accuracy somewhat, but a card can be forgotten or lent, and, more importantly, many of these systems **record attendance without regard to entry time**: a student who arrives late may be marked present like everyone else. The project therefore set out to combine **identity verification through facial biometrics** with a **time-based mechanism** that distinguishes punctual students from late ones and blocks unauthorized registrations.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for applied projects that use computer vision and face recognition to automate administrative processes.

## Project Objectives

The project set out a number of objectives, chiefly:

- Recording attendance automatically as soon as a student enters the classroom, instead of spending lecture time on roll calls.
- Integrating a timer that clearly defines the allowed window, so punctual students are distinguished from late arrivals.
- Curbing proxy signing and identity fraud by relying on the biometric features of the face.
- Preventing attendance registration for anyone not listed in the classroom's database.
- Preparing the system for back-to-back lectures by clearing session data automatically when each one ends.
- Organizing attendance data automatically so administrators can follow attendance and absence rates.

## How the System Works

The project's workflow diagram describes the following processing sequence:

1. Load the **YOLO** model and the pre-registered student photos.
2. Open the camera and capture frames continuously throughout the session.
3. Pass each frame to the model to detect the people and faces visible in it.
4. Compare the detected faces with the stored student photos.
5. When a registered student is recognized, store their name and entry time automatically.
6. When the session or lecture time ends, export an Excel file listing the students present as the final output.

## Time-Based Attendance Rules

According to the scope described in the project, the system follows these rules:

| Rule | What happens |
|---|---|
| Allowed window | A student counts as present if the system recognizes them within the lecture's defined time window |
| Lateness | Anyone entering after the allowed time is automatically recorded as late or absent |
| Unregistered people | The system refuses attendance for anyone not registered in the classroom's database |
| End of lecture | Session data is cleared automatically to prepare for the next lecture without manual intervention |

## Software Environment and Tools

| Tool | Role in the project |
|---|---|
| Anaconda | Package management and isolated virtual environments that avoid version conflicts |
| Visual Studio Code | Main editor for writing and debugging the code |
| Jupyter Notebook | Running the algorithms interactively and documenting each step with its results |
| OpenCV | Image processing, computer vision tasks, and camera handling |
| Ultralytics | Running recent YOLO versions for real-time face detection |
| Microsoft Excel | Output file containing student names and entry times |

## What the Implementation Documents

The project's implementation chapter presents two main outputs:

- **The system interface in operation:** showing student faces being recognized in front of the camera and their attendance recorded automatically.
- **The Excel attendance file:** containing the names of the students the system recognized and their entry times.

These outputs demonstrate that **the core pipeline works**, from frame capture to the attendance file. However, the project reports no quantitative values of its own, such as correct-recognition rate, error rate, number of students tested, or processing time, so no specific accuracy figures are attributed to this version. The high accuracy figures quoted in the review of previous studies belong to other systems and are not results of this application.

## Limitations of the Current Version

The project itself sets out several constraints that frame its use:

- It works inside closed classrooms and requires high-resolution cameras and suitable lighting.
- It is limited to attendance at academic lectures and does not cover events outside the organized educational setting.
- It relies on a stable internet connection to record data without failures.
- It may struggle to recognize people wearing masks or in low light.
- Data is cleared after every lecture, so the system keeps no long-term records unless integrated with an external archiving system.
- No quantitative evaluation of recognition accuracy, or of how reliably the time rules are applied, has been published under broad operating conditions.

## Possible Future Development

According to the outlook set out in the project, the application could be developed through:

- Improving recognition accuracy by training the models on larger and more diverse datasets, reducing errors caused by changing lighting and camera angles.
- Connecting the system to e-learning platforms so attendance is recorded there automatically without manual entry.
- A mobile app that lets teachers and administrators view attendance lists directly.
- Instant notifications to absent students, or to classroom management when an unexpected attendance is recorded.
- Extending use to companies, conferences, and government institutions to automate check-in and check-out.
- Strengthening security by combining face recognition with additional verification such as ID cards or fingerprints.
- Analyzing attendance data and producing statistical reports that study the relationship between attendance and academic performance.

## A Note on Privacy

The system processes images of students' faces, which are sensitive biometric data. Any real deployment therefore needs clear consent from students, a definition of who may access the reference photos and attendance files, and a stated policy on how long they are kept and how they are protected.

## Planning a Similar System?

If you are working on a face-recognition attendance app and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
