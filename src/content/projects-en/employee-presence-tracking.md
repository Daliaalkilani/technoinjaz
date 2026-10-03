# Smart Attendance Monitoring System for Work Areas Using Computer Vision

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to develop a prototype that uses computer vision to detect and track people inside defined work areas, calculate how long each tracked person remains within the area, and then organize the temporal data and export it as reviewable reports.

For implementation, the prototype relied on **YOLOv8** for person detection and **DeepSORT** for tracking people across video frames, together with software logic that computes presence duration and links the results to structured data that can be exported to an Excel file. The experiment was run on a video clip simulating an office environment, so the results represent a **functional proof of concept for a prototype** rather than a production deployment inside an actual company.

## Project Facts

| Item | Details |
|---|---|
| Project type | Computer vision and video analytics prototype |
| Field | Artificial intelligence, computer vision, person tracking |
| Year | 2024–2025 |
| Project status | Prototype tested on a video simulating an office environment |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | YOLOv8, DeepSORT, OpenCV, pandas, datetime |
| Outputs | Person tracking, defined work areas, presence-time calculation, structured data, export to Excel |

## About the Project

The project focused on building a model capable of analyzing video of a work environment, detecting the people in the scene, and then tracking each person's movement across frames using an independent tracking ID. The tracked positions are then compared against predefined work areas, and the time each tracked person spends inside their area is computed.

The goal of the prototype is to test whether computer vision techniques can automate part of the attendance-recording process inside work areas, while providing temporal data that can be reviewed administratively. The current version does not rely on face recognition to confirm employee identity; it focuses on **tracking people in the scene using tracking IDs**, while linking those IDs to a confirmed employee identity remains an area for subsequent development.

## Techno Enjaz's Role

The project was carried out academically by the students, **with technical assistance and support from Techno Enjaz during the development phases**. It is presented among the office's work as an example of its contribution to supporting applied projects that combine artificial intelligence, computer vision, and video analytics.

This page does not attribute full project execution or independent training of all models to Techno Enjaz; the office's role in this project was **technical assistance to the students during development**.

## How the System Works

The prototype goes through several interconnected stages:

1. Receiving the video clip representing the experimental work environment.
2. Using **YOLOv8** to detect the people within each frame.
3. Passing the detection results to **DeepSORT** to maintain a tracking ID for each person across frames.
4. Comparing each tracked person's position against the predefined work areas.
5. Calculating the tracked person's presence duration inside the area using software timing logic.
6. Recording the data associated with the ID, area, duration, and date.
7. Producing the data in a reviewable form, including exporting it to Excel in the documented version.

## Technical Challenges

Among the challenges the project addressed are **people overlapping in the scene and temporary loss of tracking** — well-known problems in multi-object tracking systems. Moving from an experimental model to a real application also requires handling additional variables, such as lighting variation, crowd density, multiple cameras, and maintaining a tracked person's identity when they leave the scene and return.

Another important aspect is distinguishing between a **tracking ID** and an **actual employee identity**. The documented version of the project tracks people within the video, but it does not provide evidence of an independent identity-verification layer such as face recognition or employee ID cards.

## Documented Results from the Prototype

The experiment demonstrated that the following core functions can be implemented within the test scenario:

- Detecting the people in the scene.
- Maintaining tracking IDs as people move through the video.
- Determining when a tracked person is inside a predefined work area.
- Computing the time a tracked person spends inside the area and displaying it in seconds.
- Visually changing the area's status when the tracked person leaves it.
- Storing data associated with the ID, area, duration, and date.
- Exporting the data to an Excel file for review.

These results represent **functional success of the prototype** and are not a measurement of a production system's accuracy. The source did not report project-specific quantitative values such as Precision, Recall, mAP, FPS, IDF1, or ID-switch rate, so no undocumented accuracy or speed figures are attributed to the current version.

## Technologies Used

### YOLOv8

Used to detect people within the video frames and determine their positions in the scene.

### DeepSORT

Used to track people across frames and assign tracking IDs that allow each person's movement to be followed for as long as they appear in the video.

### OpenCV

Used within video and frame processing and for displaying the analysis results visually.

### pandas and datetime

Used to organize the data and handle the temporal values needed to compute presence duration and prepare the records.

## Limitations of the Current Prototype

The project was designed as an academic prototype, so its results should be read within that frame:

- The documented testing was performed on a video simulating an office environment, not on a production deployment inside a company.
- The time display unit is the second, but no benchmark test measuring the time-computation error has been published.
- A tracking ID does not automatically equal a confirmed employee identity.
- The report lacks sufficient quantitative metrics to judge detection or tracking accuracy under wide operating conditions.
- Face recognition and integration with human resources systems are mentioned as future development directions, not as proven functions of the current version.

## Practical Value of the Project

The project offers hands-on experience in integrating **person detection, multi-object tracking, regions of interest, time computation, and data management** within a single pipeline. Its value as an applied study lies in moving from detecting a person in an image to following their presence over time and tying that presence to a specific area and a reviewable record.

For Techno Enjaz, the project reflects part of the office's experience in **supporting applied projects built on computer vision and artificial intelligence**, while maintaining a clear distinction between the office's contribution and the academic role of the students who carried out the project.

## Potential Future Development

According to the development directions stated in the project, the prototype could be extended in the future through:

- Adding a reliable mechanism for verifying employee identity, such as face recognition where the appropriate legal and privacy requirements are in place.
- Improving performance under different lighting conditions and heavier crowding.
- Connecting the data to human resources management systems.
- Developing an administrative interface for viewing records and reports.
- Expanding the alerting system and the work-area rules.

These items remain **future developments** and are not functions attributed to the current version.

## A Note on Privacy

Because this type of system processes video of people inside a work environment, any actual use requires clear controls covering consent, the purpose of the monitoring, access permissions, data retention periods, and the protection of images and records.

## Planning a Computer Vision Project?

If your project needs video analytics, person or object detection, tracking, or a computer-vision-based prototype, you can contact **Techno Enjaz** to discuss the technical requirements and the appropriate scope of support for the project.
