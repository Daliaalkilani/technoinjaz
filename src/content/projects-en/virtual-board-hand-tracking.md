# Interactive Virtual Board with Hand Motion Tracking

A project to develop an **interactive virtual board** that allows writing, drawing, erasing, and selecting colors using hand motion in front of the camera — without touching a screen or using a stylus — relying on computer vision and hand-tracking technologies to convert gestures into commands that appear directly on the virtual board.

The project reflects hands-on experience in integrating hand tracking and video processing within a single interactive interface, with testing of actual use cases such as drawing, changing color, pausing interaction, and partial or full erasing.

## Project Information

| Item | Details |
| --- | --- |
| Project type | Advanced interactive prototype |
| Domain | Educational technologies and computer vision |
| Project status | Prototype developed and functionally tested |
| Academic year | 2024–2025 |
| Documented technologies | Python, MediaPipe, OpenCV, NumPy, Anaconda |

## About the Project

The project's idea is to turn hand motion in front of the camera into a means of controlling a digital board. The system captures the hand's motion and analyzes the positions of the fingers, then maps specific gestures to functions within the board's interface, such as drawing, selecting a color, and erasing.

The prototype was designed with two interfaces merged into one: an interface for capturing and tracking hand motion via the camera, and a board layer containing the interaction tools such as colors and erasing. This merge makes it possible to show the effect of a gesture directly inside the drawing area while the video is being processed at the same time.

## How Does the Virtual Board Work?

The prototype relies on a camera to capture hand motion, then uses hand-tracking techniques to extract the positions of the fingers and analyze the current gesture. The system then maps the gesture to the appropriate function within the digital board, allowing the user to move between the different interaction states without additional physical input tools.

The states documented in the experiment include:

- **Drawing and writing:** tracking the fingers' motion and converting it into digital lines that appear on the board.
- **Selecting a color:** choosing one of the available colors from the color palette and then continuing to draw with it.
- **Pausing interaction:** when the hand is fully open, the system does not execute a draw or erase command, to limit unintended interactions.
- **Partial erasing:** removing a specific part of the writing or drawing using the gesture designated for erasing.
- **Full erasing:** using the **Clear** command to remove the board's content and start over.

## The Technical Environment Used

The prototype relied on **Python** as its main programming language, with **Anaconda** used to manage the project environment. The **MediaPipe** libraries were installed and used for hand tracking, **OpenCV** for image and video processing, and **NumPy** within the data processing operations.

This architecture makes it possible to handle the video stream from the camera, analyze the hand's motion, and then update the board's interface according to the detected gesture.

## Technical Challenges

The experiments revealed several practical challenges related to real-time motion tracking. The most prominent were reduced tracking accuracy when fast or complex finger movements were performed, and degraded performance when the lighting was too low or unsuitably high.

Random movements, as well as the presence of other people or objects within the camera's field of view, can also cause interference with the tracking process. A slight delay in executing some commands was also observed when running the prototype on lower-specification devices, in addition to the need to tune the compatibility between the hand-tracking data and the digital display interface.

These challenges were an important part of the experiment, because they clarified the factors that must be considered when moving from an experimental prototype to a more stable application for daily use.

## Prototype Results

The experiment proved that hand motion tracking can be integrated with a digital writing and drawing interface and that the prototype's core functions can be operated. Within the test environment, updating the drawing or writing on the screen was close to real time, with performance remaining dependent on lighting conditions, device specifications, and the speed of motion in front of the camera.

The project does not provide published numerical measurements for accuracy or response time, so this page focuses on the functions that were actually implemented and observed instead of using undocumented performance figures.

## Development Opportunities

The project identified several directions that could be studied in later versions, including improving tracking accuracy under different lighting conditions, reducing response time on resource-limited devices, developing the user interface, and improving the system's ability to ignore unimportant elements in the scene.

Future ideas were also proposed, such as voice control, support for applications on mobile devices, and augmented and virtual reality, but these remain **ideas for future development and are not implemented functions in the current version**.

## Planning a Similar Interactive System?

If you are working on a prototype based on computer vision or gesture interaction and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss the project's requirements and the appropriate scope of support.
