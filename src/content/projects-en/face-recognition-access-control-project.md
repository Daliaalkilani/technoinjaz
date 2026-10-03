# Smart Access Control Security System Using Face Recognition

## Project Summary

An academic graduation project aiming to develop a prototype access control system for a sensitive area, within an applied scenario of a bank vault, based on computer vision and face recognition technologies. The project was prepared by students at the Syrian Virtual University during the 2024–2025 academic year, **with assistance and support from Techno Enjaz during the project's preparation and development**.

The prototype uses the laptop camera to capture images, then applies the OpenCV library to process the frames and the `face-recognition` library to extract facial features and compare them against reference images. When an authorized person is recognized, their entry time is recorded; when a face is unrecognized, its image is saved and an audible alert is triggered using the `playsound` library.

## Project Information

| Item | Details |
| --- | --- |
| Project type | Academic graduation project / access control system prototype |
| Field | Computer vision and face recognition |
| Usage context | Access control to a sensitive area within a bank vault scenario |
| Academic institution | Syrian Virtual University |
| Academic year | 2024–2025 |
| Project status | Completed academic prototype |
| Techno Enjaz role | Assisting the students in preparing and developing the project |
| Programming language | Python |
| Key technologies | OpenCV, `face-recognition`, `playsound` |

## About the Project

The project focuses on building a model that can distinguish between known and unknown people in front of the camera and then take a different action depending on the match result. The bank vault environment was chosen as the project's applied scenario in order to study the use of face recognition for controlling access to sensitive areas.

The project is academic and experimental; the available materials do not indicate that it was deployed as an operational system inside an actual bank. The project therefore demonstrates experience in developing a technical prototype and integrating its software components — not the implementation of a complete commercial banking security system.

## Techno Enjaz's Role

Techno Enjaz contributed by **assisting the students throughout the preparation and development of the graduation project**. The project is presented among the office's previous work as an academic experience the office helped support, while the project itself remains the students' own work within their university framework.

This page does not attribute to Techno Enjaz the implementation of a security system inside a bank or its operation in an actual financial facility.

## How the Prototype Works

The system starts by loading the authorized persons' images and extracting the distinctive features of each face. The laptop camera is then activated to capture video, and every frame is processed to detect the faces that appear in it.

When a face is detected, the system extracts its representation and compares it against the pre-stored reference faces:

- If the face matches an authorized person, the person is identified and their entry time is recorded.
- If the system finds no match, the face is treated as unknown, its image is stored in a dedicated folder, and an audible alert is triggered.
- The system keeps reading frames and processing faces for as long as the program is running.

## Components and Technologies Used

### Python

The Python language was used to build the prototype and link the image-processing, face-recognition, and audible-alert components within a single pipeline.

### OpenCV

OpenCV is used to access the laptop camera, read the video frames, and prepare the images for processing within the system.

### face-recognition

The `face-recognition` library is used to detect faces, extract their features, and then compare the captured face against the reference images of authorized persons.

### playsound

The `playsound` library is used to trigger an audible alert when the prototype detects a face that does not match the authorized persons.

## Data Organization

The project's conceptual design includes a set of tables serving the system's core functions, among them:

- `authorized_persons` to store the data of authorized persons.
- `entry_logs` to record entry events and their times.
- `unauthorized_persons` to document the cases the system could not recognize.
- `alerts` to record alerts associated with unknown entry attempts.

This organization reflects an attempt to separate personal data, event logs, and alerts within the academic prototype.

## Results Presented in the Project

The project's practical materials demonstrate the experimental prototype's ability to perform a number of core functions:

- Using reference images for authorized persons.
- Capturing a face from the camera and comparing it against the stored images.
- Displaying the person's name upon recognition within the presented test.
- Recording the entry time when a match is verified.
- Classifying a non-matching face as unknown.
- Saving the unknown face's image in a dedicated folder.
- Triggering an audible alarm for the unknown case.

The available materials do not include documented test measurements that would allow publishing a final accuracy rate or a fixed response time for the system; no performance figures are therefore presented on this page.

## Considerations That Emerged During Development

The project material shows that face capture quality is tied to image clarity, lighting, and camera angle. For this reason, the laptop camera's position and field of view were taken into account in the prototype's operating concept.

The project is also built as a prototype using the laptop camera, while functions such as running multiple cameras simultaneously, phone notifications, database encryption, and behavior analysis remained among the proposed future developments — not proven functions of the presented version.

## Experience the Project Demonstrates

The project demonstrates hands-on experience in linking the camera with image processing, face recognition, event logging, and audible alerting within a single prototype, alongside Techno Enjaz's experience in **helping students develop applied technical projects** and connecting theory to a testable model.

## A Similar Project?

If you are working on a similar technical project and need to discuss requirements or benefit from Techno Enjaz's experience in applied projects, you can contact the office to explore the appropriate scope of assistance for the project.
