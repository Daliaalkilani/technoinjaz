# Robotic Hand for Motion Control via Computer Vision and Hand Tracking

An academic project titled **"Design and Implementation of a Robotic Hand Mimicking Human Hand Motion Using Artificial Intelligence and Computer Vision"**, carried out by a team of students with technical assistance from **Techno Enjaz**. The system captures the user's hand with a camera, locates the finger joints and infers the state of each finger (extended or folded), then sends this state wirelessly over **Bluetooth HC-05** to an **Arduino UNO** board, which drives the **servo motors** of the robotic hand to mimic the same motion.

The project is an applied example of **Human–Robot Interaction** and gesture control without gloves or sensors on the hand. The prototype successfully mimicked opening and closing the fingers in real time, and the tests showed that the wireless link was more efficient and reliable than a wired link for controlling the hand.

## Project Facts

| Item | Details |
|---|---|
| Project type | Prototype of a robotic hand controlled by hand gestures |
| Field | Robotics, computer vision, pose estimation, embedded systems |
| Project status | Implemented prototype tested in practice |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Computer-vision hand tracking and pose estimation, Arduino UNO, servo motors, HC-05, DC-DC step-down regulator |
| Outputs | Robotic hand, finger-state detection, five-value control array, wireless control system for six servo motors |

## The Problem

The human hand is a highly complex system with many degrees of freedom: the fingers, wrist, and palm can work together or independently. Conventional robots usually rely on fixed, pre-programmed instructions, so they cannot interact naturally with changing tasks, and it is hard to build a traditional mathematical model that reproduces every hand movement.

The project proposes using computer vision and AI instead: a camera captures the hand's motion and algorithms turn it into control commands, so a robotic hand can be driven by natural hand movement rather than fixed programming. The project sees potential for this idea in smart prosthetics, assistive devices for people with disabilities, and remote control in hazardous environments.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**, covering the integration of the computer-vision components with embedded control and the development of the operating experience. It is presented among the office's work as an example of its support for robotics and gesture-control projects.

## How the Robotic Hand Works

The project's flowchart describes a loop that repeats for every video frame:

1. Initialize the detection tools and open the camera.
2. Capture the frame and convert it to the RGB color format.
3. Pass the frame to the hand-detection algorithm to locate its key points.
4. Analyze the extracted points to determine the state of each of the five fingers.
5. Build **a five-value array** representing the finger states; [1, 1, 1, 1, 1] means all five fingers are extended, and [0, 0, 0, 0, 0] means they are folded.
6. Send the array wirelessly through the HC-05 Bluetooth module to the Arduino UNO.
7. The Arduino moves the servo motors to the corresponding angles, so the hand mimics the user's hand state.
8. The loop continues until the user presses the Q key to stop.

## Hand Tracking with Computer Vision

The book devotes a full chapter to pose estimation and Google's **MediaPipe** library, including the **MediaPipe Hands** model, which locates **21 key points** on the hand covering the joints, fingertips, and wrist, and works with simple cameras such as a laptop webcam. The book explains its stages: detecting the hand on the first frame or when it is lost, cropping the hand region, then estimating the 21 landmarks, using the previous frame to speed up tracking.

The book also reviews the BlazePose body-pose model and Face Mesh face tracking, alongside the basics of digital image processing, machine learning, deep learning, and convolutional neural networks as the project's theoretical foundation.

## Hardware Components

| Component | Role in the system |
|---|---|
| Camera | Captures the user's hand in real time |
| Arduino UNO (ATmega328P microcontroller) | Main controller: receives the finger states and generates PWM signals for the motors |
| Six servo motors (SERVO1 to SERVO6) | Move the parts of the robotic hand to set angles |
| HC-05 Bluetooth module | Short-range wireless link over UART between the computer and the controller |
| DC-DC step-down regulator | Lowers the supply voltage to a suitable, stable level for the board and motors |
| Power source | Battery or adapter powering the system |

The book lists the HC-05's specifications as Bluetooth V2.0 in the 2.4–2.485 GHz band, with a typical range of 10 to 100 meters and an operating voltage of 3.3 to 5 V.

## Documented Results

According to the practical results reported in the book:

- The robotic hand mimicked human hand movements using the computer-vision-based gesture recognition system.
- The system translated finger states (extended or folded) into control signals, and the hand responded instantly and smoothly, as shown in the open-hand and closed-hand trials.
- Tests showed that **the wireless link was more efficient and reliable than a wired link** for controlling the hand.

These are descriptive results from a practical demonstration; the book does not report quantitative measurements such as finger-state recognition accuracy, response time in milliseconds, or the number of trials and users.

## Limitations of the Current Version

- The system handles two states per finger (extended or folded) and does not reproduce intermediate finger angles or wrist motion.
- The documented demonstration did not include tests of grasping objects or handling different weights.
- Hand-tracking accuracy is affected by poor lighting, by the hand being hidden behind another object, or by it leaving the camera's field of view, as the book notes in discussing MediaPipe Hands' challenges.
- Control range is limited to the range of the HC-05 Bluetooth module.

## Possible Future Development

According to the future outlook in the project:

- Improving hand-detection and gesture-analysis algorithms with deep learning to understand more complex gestures and reduce response time.
- Replacing the servos with stepper motors or DC motors with encoders for finer control of torque and position and for handling different weights.
- Adding force and touch sensors in the fingertips to handle fragile materials, and depth cameras to perceive 3D space.
- Control gloves with haptic feedback, and learning tasks by observation.
- Integrating the hand into IoT systems, developing it into a full robotic arm, and exploring GSM to improve range instead of the HC-05.
- Building a flexible software framework with path planning and simulation tools to test algorithms virtually before applying them to the physical hand.

## Planning a Similar System?

If you are working on a motion-tracking robotic hand and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
