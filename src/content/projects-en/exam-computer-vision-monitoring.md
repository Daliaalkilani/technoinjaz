# Developing a System for Detecting Misconduct in Exam Halls Using Computer Vision Technologies

An academic project to build a **computer vision prototype for exam monitoring** that analyzes camera frames to flag behavioral indicators that may be linked to cheating, chiefly **head turning** away from the forward direction. It was carried out by a team of students with technical assistance from **Techno Enjaz**, using Python and **OpenCV**, a **YOLO** model to locate the person in the scene, and **MediaPipe** to extract face and body landmarks.

In the implemented version, turning the head to the right or left, whether slightly or fully, is classified as a state that **warrants review** and a red frame is drawn around the student's face, while facing straight toward the screen is treated as normal and shown with a green frame. The prototype was tested with an ordinary camera in a controlled environment in terms of movement, lighting, and camera angle, not in real exam halls, and the project reports no numeric accuracy metrics of its own.

## Project Facts

| Item | Details |
|---|---|
| Project type | Computer vision prototype for analyzing behavior during exams |
| Field | Education, artificial intelligence, computer vision, pose estimation |
| Year | 2024–2025 |
| Project status | Prototype tested in a controlled environment with an ordinary camera |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, OpenCV, YOLO, MediaPipe, Visual Studio Code on Windows |
| Outputs | Real-time head-orientation classification, red frame for suspicious states and green frame for normal ones |

## The Problem

Exam monitoring traditionally relies on human invigilators, which faces clear difficulties: watching many students at once, inconsistent standards between invigilators, declining attention as fatigue builds over long exams, and high human and logistical costs in large exams. An invigilator may miss movements such as repeatedly turning toward a neighbor or shifting posture suspiciously.

The project proposes an assistive tool that analyzes students' movements from video frames using consistent, adjustable criteria, aiming to support the human invigilator rather than replace them and to provide indicators that can be reviewed later.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for applied projects that combine object detection and pose estimation for behavior analysis.

## How the System Works

The project documents an algorithm flowchart with the following steps:

1. Loading the **YOLO** model to detect people.
2. Capturing frames from the camera continuously.
3. Cropping the detected person's image and converting it to RGB.
4. Passing the image to **MediaPipe** to extract the required face and body points.
5. Analyzing the head's turning angle relative to the forward viewing axis.
6. When suspicious movement is detected, a visual alarm is raised and a red frame is drawn around the face; otherwise the system returns to periodic monitoring and the frame is shown in green.

## Practical Test Results

| Tested state | System response |
|---|---|
| Slight or full turn to the left | Classified as suspicious, red frame around the face |
| Slight or full turn to the right | Classified as suspicious, red frame around the face |
| Face directed straight at the screen | Normal state, green frame around the face |

The project reports that the system responded immediately to changes in head direction and distinguished focus from deviation within the test scenario. This result is **descriptive**, however: the book does not state the number of cases tested or any project-specific quantitative metrics such as Precision, Recall, false-alarm rate, or frames per second. The accuracy figures that appear in the book (such as 95% and 94%) belong to earlier studies reviewed in the background chapter, not to this prototype.

## Technologies Used

- **YOLO:** detecting people in the frame and defining the region of interest before pose analysis.
- **MediaPipe:** extracting face and body landmarks; the project reviews its BlazePose (body), Hands, and Face Mesh modules.
- **OpenCV:** reading and processing camera frames and drawing the colored frames on the image.
- **Python** in Visual Studio Code on Windows.

## Project Limitations

- The system **does not prove that cheating occurred**; it flags visual indicators that may need human review, and a head turn can be an innocent, natural movement.
- The implementation is limited to analyzing the head direction of one person in front of the camera, and it was not tested in crowded halls or multi-user educational settings.
- Experiments were run under controlled lighting, movement, and camera angle, and performance is affected when these conditions change.
- The project objectives mention instant alerts to invigilators with the time and location of the movement and records for later review, but the implementation documents only the visual alarm of the red frame, with no separate notification mechanism or log shown.
- There are no documented numeric performance metrics for the prototype.

## Possible Future Development

According to the proposals set out in the project:

- Extending testing to real exam halls with large numbers of students.
- Using multi-angle, higher-resolution cameras to cover the hall and overcome lighting and visual noise.
- Integrating models based on movement sequences over time, such as RNN or LSTM, instead of analyzing single frames.
- Training on a larger, more diverse dataset to reduce model bias.
- A layer for facial-expression analysis, and possibly supporting audio or environmental sensors.
- An interactive interface for invigilators to review alerts and give feedback that improves accuracy.
- Integration with learning management systems (LMS) and digital exam platforms.
- Lightweight models that run on low-resource devices, and evaluation studies with invigilators to verify alert reliability.

## A Note on Privacy

This kind of system processes images of students' faces and movements, so any real-world use requires informing students about the monitoring, defining its purpose, controlling access to recordings and how long they are kept, and keeping the final decision with a human invigilator.

## Get in Touch

If you are planning to develop solutions based on artificial intelligence and computer vision, the Techno Enjaz team can discuss your project's requirements and the suitable technical solutions.

## Planning a Similar System?

If you are working on a computer-vision-based monitoring system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
