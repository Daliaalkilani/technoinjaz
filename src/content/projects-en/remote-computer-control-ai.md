# AI Hand-Gesture Remote Control for Computer Applications

A project developing an **intelligent system for remotely controlling computer applications with hand gestures** — no traditional input devices required — within the field of human-computer interaction (HCI) and perceptual computing.

The system relies on computer vision and AI: MediaPipe extracts and tracks the 21 hand landmarks in real time, while OpenCV processes the webcam video feed.

## Technical Environment

- Python
- MediaPipe (Hands)
- OpenCV
- NumPy
- CNN
- LSTM
- Anaconda
- VS Code

## Gestures and functions

- **Virtual keyboard:** text interaction without touching input hardware.
- **Screen brightness control:** thumb–index pinch lowers brightness; spreading them raises it up to maximum.
- **Temporal gesture recognition:** motion sequences analyzed with CNN and LSTM rather than isolated frames.
- **Real-time processing:** hand tracking and gesture interpretation live from the camera stream.

## Processing pipeline

- Capturing webcam frames and processing them with OpenCV (color spaces, smoothing, edge detection, thresholding, background subtraction).
- Extracting the 21 hand landmarks via the MediaPipe framework with 2D and 3D pose estimation.
- Feeding the gesture's temporal sequence to a classification model to determine the intended action.
- Executing the OS command and displaying the result immediately.

## Environment and testing

The system was developed in Python within Anaconda and VS Code environments; runtime captures document real-time gesture recognition and execution of brightness-control and virtual-keyboard commands.
