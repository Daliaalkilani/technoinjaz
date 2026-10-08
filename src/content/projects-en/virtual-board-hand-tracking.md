# Interactive Virtual Board with Hand Motion Tracking

A project to develop an **interactive virtual board** that lets you write, draw, erase, and pick colors with hand movements in front of a camera, without touching a screen or using a stylus, relying on computer vision and hand tracking to turn gestures into commands that appear directly on the virtual board. The student carried out the project with technical assistance from **Techno Enjaz**.

The prototype was built in **Python** using **MediaPipe** to track finger positions, **OpenCV** for video processing, and **NumPy** for data processing, within an **Anaconda** environment. Real use cases were tried, such as drawing, changing color, pausing interaction, and partial or full erasing, and drawing updates on screen were close to real time in the test environment, with no published numerical measurements of accuracy or response time.

## Project Facts

| Item | Details |
| --- | --- |
| Project type | Interactive gesture-control prototype |
| Field | Educational technology and computer vision |
| Year | 2024–2025 |
| Project status | Prototype developed and functionally tested |
| Techno Enjaz role | Technical support and assistance to the student during project development |
| Core technologies | Python, MediaPipe, OpenCV, NumPy, Anaconda, VS Code |
| Outputs | Digital board for gesture-based writing and drawing, color palette, partial and full erase, pause state |

## The Problem

The traditional blackboard is still the main tool in many classrooms. It forces the teacher to turn their back to the students while writing, which reduces eye contact and makes it harder to follow their reactions, and students in the back rows sometimes struggle to read what is written. The project proposes a digital board that the teacher controls with hand movements in front of a camera, writing, changing colors, and erasing without touching any surface while still facing the students.

The project suggests the idea could extend beyond classrooms to training centers, virtual meetings, and presentations.

## Techno Enjaz's Role

The project was carried out academically by the student, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for prototypes that combine hand tracking, video processing, and interactive interfaces.

## How Does the Virtual Board Work?

The prototype was designed with two interfaces merged into one: an interface that captures and tracks hand motion through the camera, and a black board layer containing interaction tools such as the color palette and erasing. This merge shows the effect of each gesture directly in the drawing area while the video is being processed.

1. The camera in front of the user captures their hand movement in real time.
2. OpenCV processes the video frames and passes them to MediaPipe.
3. MediaPipe locates the hand and finger joints in each frame.
4. The program analyzes the finger configuration to recognize the current gesture.
5. The system maps the gesture to the right function: draw, pick a color, erase, or pause.
6. The board layer is updated immediately with the resulting strokes or edits.

## Documented Gestures and Functions

| State | How it was performed in testing |
| --- | --- |
| Drawing and writing | Moving the index and middle fingers held close together, turning the motion into digital strokes on the board |
| Color selection | Choosing a color from the palette (red was selected in the test) and continuing to draw with it |
| Pausing interaction | Opening the hand fully, so the system performs no drawing or erasing command, limiting unintended interactions |
| Partial erase | A dedicated erase gesture removes a selected part of the writing or drawing |
| Full erase | A **Clear** button on the board removes all content to start over |

## Technical Environment

| Tool | Role |
| --- | --- |
| Python | Main programming language |
| Anaconda | Creating an isolated environment for the project and reducing library compatibility issues |
| VS Code | Code editor |
| MediaPipe | Hand tracking and finger position detection |
| OpenCV | Video capture and image and frame processing |
| NumPy | Data-processing operations |

This architecture handles the camera's video stream, analyzes hand motion, and then updates the board interface according to the detected gesture.

## Technical Challenges

Testing revealed several practical challenges related to real-time motion tracking:

- Lower tracking accuracy with fast or complex finger movements, which can lose the gesture and execute the command incorrectly.
- Degraded performance when lighting is very low or excessively bright.
- Misinterpretation of some simple gestures when there is random movement or other people in the camera's field of view, plus the effect of moving objects and light reflections.
- A slight delay in executing some commands on lower-spec devices, which can become noticeable slowness or failure to run on weak machines.
- The need to align data between MediaPipe and the digital display interface.
- The need to choose clear fonts and colors suitable for all students, including those with visual difficulties.

These challenges were an important part of the experiment, because they showed the factors to consider when moving from an experimental prototype to a more stable application for everyday use.

## Prototype Results

The experiment showed that hand-motion tracking can be integrated with a digital writing and drawing interface and that the prototype's core functions work. In the test environment, drawing and writing updates on screen were close to real time, while performance remained dependent on lighting, device specifications, and the speed of movement in front of the camera.

The project does not publish numerical measurements of accuracy, response time, or the number of users tested, so this page focuses on the functions that were actually implemented and observed rather than using undocumented performance figures.

## Limitations of the Current Version

- The prototype relies on one camera with one user in front of it and is affected by other people in the scene.
- Performance is sensitive to lighting, hand speed, and device specifications.
- It does not include voice control, augmented reality, or a phone app; these are ideas for future development.
- The prototype was tested experimentally and was not evaluated with quantitative measurements in real classrooms.

## Development Opportunities

The project set out several recommendations that could be explored in later versions:

- **Improving tracking accuracy:** using newer MediaPipe versions or alternative deep-learning techniques, tuning camera sensitivity, and applying contrast analysis and noise reduction.
- **Reducing response time:** cutting unnecessary computation and using hardware acceleration through a GPU.
- **Improving the user interface:** clearer visual elements, sound and visual effects, and compatibility with different screen sizes.
- **Better adaptation to different environments:** filtering irrelevant elements in the scene and adjusting sensitivity automatically based on camera angle and lighting.

Broader future ideas were also proposed, such as integrating augmented and virtual reality to display 3D models, voice commands such as "clear the screen" and "change color", a phone and tablet app that works offline, and support for people with disabilities and sign language, but these remain **ideas for future development, not functions implemented in the current version**.

## Planning a Similar Interactive System?

If you are working on a prototype based on computer vision or gesture interaction and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss the project's requirements and the appropriate scope of support.
