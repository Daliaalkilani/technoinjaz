# Intelligent Security and Surveillance System Using AI

A project to develop a **smart security system for protecting commercial premises** that integrates artificial intelligence, computer vision, and physical sensing technologies to detect threats early and respond to them automatically.

## Project Idea

The system targets premises that require a high level of protection, such as jewelry stores. It monitors cameras and sensors together to detect weapons, suspicious behavior, and patterns of violence, with an additional physical sensing layer for early-warning safety.

## How Does the System Work?

The system combines several integrated layers of intelligence:

- **Weapon detection:** the **YOLO** algorithm automatically detects weapons within the camera feeds.
- **Violence analysis:** an **RNN** model analyzes sequences of movement to detect patterns of violence in video.
- **Behavior analysis:** the **MediaPipe** library analyzes body poses and recognizes suspicious behaviors, such as unauthorized attempts to access sensitive storage areas like opening drawers or approaching them by people who are not authorized.
- **Physical sensing:** a **PIR** motion sensor monitors abnormal movement, and a **flame sensor** provides early detection of fire indicators.

## Response and Alerting

When theft-related behavior or a threat is detected, the system executes immediate alarm actions that alert the operator and document the event, adding an extra layer of security and rapid response before the situation escalates.

## Technical Environment

- **YOLO** for real-time weapon detection.
- **RNN** for analyzing motion sequences.
- **MediaPipe** for body pose estimation.
- **PIR** and **flame sensors** integrated with the monitoring system.

## Project Results

The system demonstrated a practical ability to combine intelligent visual analysis and physical sensing in a single protection system, covering multiple threat types that go beyond what traditional surveillance cameras — which merely record — can offer.

## Development Opportunities

The system can be expanded to support more cameras, add face recognition for authorized personnel, connect to external emergency services, and improve behavior-detection models to reduce false alarms in crowded spaces.

## Planning a Similar Security System?

If you are working on an AI-powered security or surveillance project and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss the project's requirements and the appropriate scope of support.
