# AI Hand-Gesture Remote Control for Computer Applications

**Remote control of computer applications with hand gestures** is an academic project carried out by a team of students with technical assistance from **Techno Enjaz**, to build a touchless interaction system that replaces the mouse and traditional controls with hand gestures in front of **an ordinary webcam**, without gloves, sensors, or depth cameras. The system uses **MediaPipe Hands** to extract and track **21 hand landmarks** in real time, **OpenCV** to capture and process video, and **PyAutoGUI** to execute commands on the operating system, all in **Python**.

The project documents the implementation of **screen brightness control** using the distance between thumb and index finger, with an on-screen bar showing the brightness level, plus **a six-gesture dictionary for mouse control** (move, left, right, and double click, drag and drop, and a safety gesture). It belongs to the field of human–computer interaction (HCI) and natural user interfaces (NUI), and the reported results are descriptive, from practical trials, without quantitative accuracy or speed measurements.

## Project Facts

| Item | Details |
|---|---|
| Project type | Computer-vision system for controlling a computer with hand gestures |
| Field | Human–computer interaction (HCI), computer vision, hand tracking |
| Project status | Working prototype on a personal computer with a webcam, tested with different hand poses |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, MediaPipe Hands, OpenCV, NumPy, PyAutoGUI, Anaconda, VS Code |
| Outputs | Gesture-based brightness control, six-gesture mouse emulation, visual feedback, stop and debug keys |

## The Problem

Most control systems still rely on the mouse and keyboard, which requires the user to be near the device and touch it, limits use in settings that require sterility or free hands, and makes use difficult for some people with motor impairments. At the same time:

- **Wearable** solutions (such as sensor gloves) are accurate but costly and less natural.
- **Traditional computer-vision** solutions are affected by occlusion, lighting changes, and skin-tone differences, and may require depth cameras.

The project therefore aimed for a solution that combines tracking accuracy, low cost with an ordinary webcam, and real-time operation on the CPU without a powerful GPU.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for computer-vision projects that turn hand tracking into real control commands on a computer.

## How Does the Hand-Gesture Control System Work?

1. OpenCV captures frames from the webcam, and each frame is mirrored so hand movement matches the cursor direction, with color conversion when needed.
2. MediaPipe Hands detects the hand and extracts 21 landmarks for the hand joints and fingertips, which are converted to pixel coordinates.
3. Each finger's state (open or closed) is computed with geometric rules: the thumb through three conditions of which two must hold, and the other fingers through a distance ratio above 1.15 or a straightness above 0.85.
4. Finger states are smoothed by majority vote over the last 5 frames, and a gesture is only accepted after it repeats in 3 consecutive frames.
5. The gesture is translated into a command: for movement, hand displacement is multiplied by a sensitivity factor of 2.0, exponentially smoothed (α = 0.4), and movements smaller than 8 pixels are ignored; for clicks, a 0.3-second cooldown prevents repeats.
6. PyAutoGUI executes the command on the operating system, while the interface shows the landmarks and current gesture as visual feedback.
7. The user can stop the system with the Q key or by moving the mouse to a screen corner, toggle smoothing with S, debug mode with D, and reset with R.

## Gesture-Based Screen Brightness Control

The system locates the thumb tip and index fingertip, continuously computes the distance between them, and converts it to a brightness percentage sent to the operating system immediately. The screen shows the detected hand model, the computed distance, and a bar indicating the current brightness level.

| Gesture | Finger position | Result |
|---|---|---|
| Lower brightness | Thumb and index close together | A low value in the lower brightness range |
| Raise brightness | Thumb moved away from index | The value updates upward as the hand moves |
| Maximum brightness | Largest possible gap between the two fingers | 100% brightness |

## Mouse-Control Gesture Dictionary

A dictionary of six gestures was designed across the range of hand openness, inspired by familiar everyday signs to reduce cognitive load:

| Gesture | Shape | Function |
|---|---|---|
| Fist | All fingers closed | Continuous cursor movement |
| Left click | Index and middle fingers open (victory sign) | Single click |
| Right click | Three fingers open | Right click |
| Double click | Index finger only | Double click |
| Drag and drop | Thumb and index open as if holding something | Keeps the mouse button pressed for the duration of the gesture |
| Open palm | Four or five fingers open | Safety key that returns the system to a neutral state and cancels any command in progress |

## Software Architecture

The system uses a four-layer architecture:

| Layer | Components |
|---|---|
| Presentation and interaction | User, webcam, screen |
| Capture and processing | Capture module, color conversion (RGB to HSV), mirroring |
| Analysis and interpretation | Hand tracking with MediaPipe Hands, distance and angle extraction, gesture classification, command mapping |
| Execution | Cursor smoothing filter, input simulation with PyAutoGUI, visual feedback |

System parameters (camera resolution, mouse sensitivity, number of gesture-confirmation frames, detection thresholds) are set from a central configuration file, with diagnostic tools to test the camera, a debug mode showing each finger's state, and the option to build an executable (EXE). The project was developed in Python within an Anaconda environment for package management and VS Code for writing and testing code.

## Documented Results

The system was tested in practice with several hand poses in front of the camera. The trials showed successful hand tracking and landmark extraction, and conversion of the thumb–index distance into gradual brightness values from very low levels up to 100%, with good tracking stability and no noticeable delay between hand movement and the brightness update. The conclusion states that the system also executed cursor control, some system commands, and volume control through predefined gestures.

These results are **descriptive**: the project reports no actual measurements of recognition accuracy, frame rate, or response time. The figures in the analysis (such as 30 frames per second, response time under 150 ms, and accuracy above 90%) are **targets, requirements, and expected estimates**, not measured results. The virtual-keyboard screenshots in the project come from previous studies reviewed for comparison and are not outputs of this system.

## Limitations of the Current Version

- No quantitative measurements of gesture-recognition accuracy or timing performance were published.
- Current recognition relies on geometric rules for finger states; deep-learning classification for complex gestures has not yet been integrated.
- The system handles one hand, and gestures are mostly static shapes.
- Tracking accuracy is affected by very strong or dim lighting and complex backgrounds, and depth is estimated computationally from a single camera.
- Thresholds and parameters need tuning for the camera and usage conditions.

## Possible Future Development

According to the outlook in the project:

- Adding more dynamic gestures to increase the number of supported commands.
- Integrating deep learning to classify complex gestures and improve accuracy.
- Supporting recognition of both hands at once for more advanced commands.
- Combining voice commands with gestures in a multimodal interface.
- A version for smartphones, tablets, and augmented-reality systems.
- Full control of presentations, office applications, and multimedia.
- Better performance under changing lighting and complex backgrounds.
- Linking with smart-home and IoT applications.

## Privacy Note

The system processes the camera stream locally on the computer without cloud servers, and one of its non-functional requirements is not to store or transmit the live video.

## Planning a Similar System?

If you are working on a system based on computer vision and gesture control and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
