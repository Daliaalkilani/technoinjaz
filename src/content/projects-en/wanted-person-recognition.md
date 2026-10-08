# Wanted-Person Recognition Using Deep Learning

A project to develop **a prototype smart surveillance system that recognizes wanted persons through face recognition**, carried out by a team of students with technical assistance from **Techno Enjaz**. The system loads the facial features of people registered in a database, then analyzes camera frames in real time and compares the faces it sees with them, showing the person's name and logging it with a timestamp on a match, or labeling the face "Unknown" when there is no match.

The prototype was built in **Python** within **Anaconda** and **Jupyter Notebook**, using the **face-recognition** library with **OpenCV**, **MediaPipe**, **NumPy/PIL**, and **Pandas**, and an **SQLite3** database for recognition logs. In the long term the project targets a distributed camera network in public places such as airports, shopping centers, and border crossings, but what the report documents in practice is a functional test with one registered person, without numerical accuracy measurements.

## Project Facts

| Item | Details |
|---|---|
| Project type | Prototype surveillance system based on face recognition |
| Field | Computer vision, deep learning, smart surveillance systems |
| Year | 2024–2025 |
| Project status | Prototype functionally tested through a "Combined Cameras" interface |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, face-recognition, OpenCV, MediaPipe, NumPy, PIL, Pandas, SQLite3, Jupyter Notebook, Anaconda |
| Outputs | Real-time recognition of registered faces, flagging of unknown faces, timestamped recognition log in the database |

## The Problem

Traditional security monitoring relies on staff reviewing images and videos for hours, which increases the chance of human error and delays the response; manual monitoring also struggles to cover multiple sites, and continuous human monitoring requires large budgets. The project proposes automating part of this process with face-recognition algorithms, so that a person on a predefined list is detected automatically and an alert is raised without constant human watching.

## Project Objectives

- Design a surveillance system that uses face recognition and artificial intelligence.
- Automate monitoring and reduce reliance on manual observation.
- Detect listed individuals immediately and alert the relevant authorities.
- Document events with timestamps to make review and tracing easier.
- Allow future expansion to a camera network and integration with existing security systems.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for computer vision projects that link face recognition with databases.

## How the System Works

The algorithm flowchart in the report describes the following path:

1. The system loads the face features stored in the database.
2. It starts receiving frames from the camera and checks for new frames.
3. Each new frame is resized to speed up processing.
4. Faces in the frame are detected and their numerical features extracted.
5. The extracted features are compared with the stored features.
6. On a match, the face is treated as wanted: a box with the person's name is drawn around the face, the alarm is triggered, the event is logged with a timestamp, and the flowchart describes sending the details to the competent authorities.
7. With no match, the face is shown as "Unknown" with a numeric ID and registered as a new face.
8. The system keeps monitoring in a loop until the user ends the program.

## Tools and Libraries

| Tool | Role in the project |
|---|---|
| Python | Main programming language |
| Jupyter Notebook | Writing and running code and viewing results interactively |
| Anaconda | Managing virtual environments and packages |
| face-recognition | Detecting faces, analyzing their features, and matching them with stored images |
| OpenCV | Reading cameras and displaying, enhancing, and converting images |
| MediaPipe | Extracting facial landmarks and analyzing motion |
| NumPy and PIL | Representing images as numerical data and opening and converting image formats |
| Pandas | Organizing and analyzing data |
| SQLite3 | Storing detected-face data: name, time, and camera ID |

## Documented Results

The report shows a practical test of the program's "Combined Cameras" interface:

| Case | What appeared in the test |
|---|---|
| Pre-registered person | A green box around the face with the registered name, and a text log repeating the name with a timestamp (14-08-2025 at 20:08:49) |
| Unregistered person | A box around the face labeled "Unknown (ID: 1)" in red, and a text log repeating the word Unknown |
| Database | An empty table prepared before running, then a record containing the name, ID 1, and the timestamp, with the camera_id field left empty |

The report describes the system as achieving high accuracy and fast response in varied environments, but it **gives no numerical values** for recognition accuracy, error rates, or processing time, nor the number of people or images used in testing. The results here are therefore read as **a functional proof of a prototype**, not an evaluation of an operational system.

## Limitations of the Current Version

- The documented test covered one registered person and one unregistered case, with no evaluation on a large database or in crowds.
- A distributed camera network is a project goal, while the camera ID field remained empty in the documented log.
- Performance is affected by changing or poor lighting, indirect capture angles, and variation in facial features and appearance.
- The report does not document an actual mechanism for sending alerts to external parties; it describes it only in the algorithm flowchart.

## Possible Future Development

According to the directions set out in the project:

- Improving recognition algorithms to raise accuracy in poor or changing lighting.
- Integrating other biometrics such as voice recognition or iris scanning.
- Developing more interactive interfaces for operating the system.
- Connecting the system to early-warning platforms for real-time handling of emergencies.
- Adding continuous learning so performance improves as data grows.
- Integration with security management systems and other data analysis tools, and better storage of historical data.
- Broader uses such as attendance tracking and controlling access to restricted areas.

## A Note on Privacy

Systems of this kind process face images and biometric data of people in public places. The report itself notes the controversy surrounding face-recognition surveillance and the need to comply with data protection laws and balance public security with individual rights. Any real-world use therefore requires a clear legal basis, an authorized operator, controls on data access and retention, and human review of any match before action is taken.

## Planning a Similar System?

If you are working on a deep-learning face-recognition system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
