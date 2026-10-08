# Smart Access Control Security System Using Face Recognition

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to develop **a prototype face-recognition access control system** for a sensitive area, within an applied bank-vault scenario. The system relies on the **laptop's built-in camera** with no extra hardware, uses the **OpenCV** library to capture and process frames and the **face-recognition** library to extract facial features and compare them with photos of authorized people, all built in **Python**.

When an authorized person is recognized, their face is framed in green, their name is shown, and their entry time is logged automatically. A non-matching face is marked with a red frame and the word "Unknown", its image is saved to a dedicated folder, and an **audible alarm** is triggered through the `playsound` library. The project is an experimental academic prototype; its materials do not indicate deployment inside a real bank or any published accuracy measurements.

## Project Facts

| Item | Details |
| --- | --- |
| Project type | Prototype access control system |
| Field | Computer vision, face recognition, physical security |
| Use context | Controlling entry to a sensitive area within a bank-vault scenario |
| Project status | Completed academic prototype, tested with images and a laptop camera |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, OpenCV, `face-recognition` (built on dlib), `playsound`, Anaconda, Jupyter Notebook |
| Outputs | Distinguishing authorized from unauthorized people, entry-time logging, saving images of unknown faces, instant audible alarm |

## The Problem the Project Addresses

Many systems that secure sensitive areas, such as vaults and data storage rooms, rely on ID cards or passwords. These can be stolen, cloned, or shared, which may let an unauthorized person in without being detected. Electronic locks and surveillance cameras without analytical capabilities still depend on human monitoring: a guard may miss someone moving quickly or in a crowd, and such systems often cannot respond immediately when a breach occurs.

The project also observed that most research on AI in banking has focused on electronic threats, such as fraud and money laundering, without practical solutions for **physical security** that monitor people at the entrance to a sensitive area. Hence the idea of a system that automatically distinguishes authorized from unauthorized people, documents every entry attempt, and alerts immediately when an unknown face appears.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's previous work as an academic experiment the office helped support, while the project itself remains the students' work.

This page does not attribute to Techno Enjaz the implementation of a security system inside a bank or its operation in a real banking facility.

## Project Objectives

- Develop a system that automatically and instantly distinguishes authorized from unauthorized people.
- Create a documented record of authorized people's entry dates and times for later review or investigation.
- Store images of unauthorized people in an organized way in dedicated folders for later use.
- Trigger an early alarm when an unauthorized entry is attempted.
- Reduce the burden on security staff by automating identity verification.

## How the System Works

The project's flowchart describes the following sequence:

1. Load the photos of authorized people from a dedicated folder, each named after its owner.
2. Extract facial features from each photo with the `face-recognition` library and store them as reference templates.
3. Start the laptop camera through OpenCV to capture real-time video.
4. Split the video into frames and downscale each frame to speed up processing.
5. Detect the face in the frame, then extract its features and compare them with the reference features.
6. On a match: the name appears above a green frame and the entry time is logged automatically.
7. With no match: a red frame labelled "Unknown" appears, an audible alarm is triggered, and the person's image is saved to the unauthorized folder.
8. After each cycle, the system checks whether it is still running, continuing the monitoring loop or ending the process when stopped.

## System Design and Component Integration

The system was designed to be simple and economical, relying on the laptop's built-in camera, which works directly through the operating system without extra connections. The laptop is placed where its camera can capture clear images of anyone approaching the restricted area, such as the vault door, with an angle chosen to cover the field of view in front of it and with attention to ambient lighting, since poor lighting degrades image quality and recognition accuracy.

| Component | Role in the system |
| --- | --- |
| Python | Language used to build the prototype and link processing, recognition, and alerting in one flow |
| OpenCV | Camera access, frame reading, and converting and downscaling frames before processing |
| face-recognition | Detecting faces, extracting their distinctive features, and comparing them with reference photos; built on the dlib library |
| playsound | Playing a sound file as an alarm when an unknown face is detected |
| Anaconda and Jupyter Notebook | Managing the programming environment and running code interactively |

## System Requirements

The project defined functional requirements including: face recognition to distinguish permitted people from others, logging the entry time of permitted people, capturing images of unauthorized people, sending an instant alert, and the ability to add people to the list while the system is running.

It also set non-functional requirements as **design targets**: a response time of no more than 2–3 seconds, an error rate below 5%, secure database storage, support for several cameras at once, and role-based access restrictions. The project presents no measurements showing that these values were achieved, so they remain targets rather than results.

## Data Organization

The project's conceptual schema includes four related tables:

| Table | Contents |
| --- | --- |
| `authorized_persons` | Data on people authorized to enter, such as their names and details |
| `entry_logs` | Every entry event, authorized or not, with its date and time |
| `unauthorized_persons` | Images of unauthorized people and details of their detection for investigation purposes |
| `alerts` | Audible alerts issued when an unauthorized person is detected |

## Results Presented in the Project

The implementation chapter presents four illustrated tests showing the prototype's behavior:

| Test | What it shows |
| --- | --- |
| Authorized photos folder | Reference photos, each named after its owner, from which facial features are extracted |
| Recognizing an authorized person | A green frame around the face with the name above it, and the entry time logged |
| Unauthorized folder | Images of unknown faces saved automatically under the name "unknown" |
| Detecting an unauthorized person | A red frame labelled "Unknown" and an instant audible alarm |

These tests show that **the functional pipeline works** within the presented scenario. However, the project includes no documented test measurements, such as correct-recognition rate, false-acceptance rate, actual response time, or number of people tested, so no performance figures are presented on this page.

## Limitations of the Current Version

- The prototype is built on a single laptop camera, and recognition quality depends on image clarity, lighting, and camera angle.
- The presented tests are illustrative on a limited number of images, not an evaluation in a real banking environment.
- The system includes no documented spoofing-detection mechanism, for example against a printed photo or a screen held up to the camera.
- Features such as simultaneous multi-camera operation, phone notifications, database encryption, and behavior analysis are listed as future developments, not proven functions of the presented version.

## Possible Future Development

According to the project, the system could be developed through:

- Detecting suspicious activity inside the vault using motion detection and behavior analysis, and predicting risks from past behavior patterns.
- Combining voice recognition with face recognition as an additional security layer.
- Instant notifications to officials by phone, text message, or email.
- A more advanced user interface for managing the system and reviewing logs, with periodic statistical analysis of security events.
- Encrypting the database of authorized and unauthorized people.
- Working with several cameras to monitor multiple areas, and improving storage to hold more images.
- Recognizing tools a person may carry before entering, and adding continuous learning from new data.
- Improving response speed with optimized algorithms, and using the system in other settings such as schools, hospitals, and airports.

## Experience the Project Demonstrates

The project demonstrates hands-on experience in linking the camera with image processing, face recognition, event logging, and audible alerting within a single prototype, alongside Techno Enjaz's experience in **helping students develop applied technical projects** and connecting theory to a testable model.

To understand how recognizing a person's identity differs from reading their facial expression, see our article [How Does AI Recognize Facial Expressions? FER, FACS, and CNN Explained](/articles/facial-expression-recognition-ai).

## A Note on Privacy

The system stores images of people's faces, including unauthorized people, which are sensitive biometric data. Any real deployment therefore needs a clear policy for informing people, defining access rights to the images and logs, setting how long they are kept, and protecting them with encryption.

## A Similar Project?

If you are working on a similar technical project and need to discuss requirements or benefit from Techno Enjaz's experience in applied projects, you can contact the office to explore the appropriate scope of assistance for the project.

## Planning a Similar System?

If you are working on a face-recognition security system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
