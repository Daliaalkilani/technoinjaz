# Multi-Link Ground Robot Prototype with Remote Control and Computer Vision

An academic project titled **"Design and Implementation of a Robot for Special Tasks"**, carried out by a team of students with technical assistance from **Techno Enjaz**, to build a prototype of a remotely controlled ground robot. It combines embedded control on an **Arduino UNO**, three wireless links (**Bluetooth**, **Wi-Fi**, and **433 MHz RF**), and a camera that streams its images to a computer running the **YOLO** algorithm to detect and classify people.

The book frames the project as a field robot that reduces people's exposure to danger in hazardous environments, but the implemented prototype is entirely a lab model: **it carries no weapon, ammunition, or explosive material**, and its responses are simulated with audio clips stored on an MP3-TF-16P module. A highlight of the documentation is the **CST** modeling of the HC-05 Bluetooth module's antenna, which showed a center frequency of 2.3819 GHz and a standing wave ratio of about 1.2.

## Project Facts

| Item | Details |
|---|---|
| Project type | Prototype of a remotely controlled ground robot |
| Field | Embedded systems, robotics, wireless communications, computer vision |
| Project status | Prototype tested in a simulated environment, not a field system |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Arduino UNO and Arduino Nano, L298N, HC-05, RF433MHz, MG995 and SG90, MP3-TF-16P, Python, YOLO, CST |
| Outputs | Mobile platform moving in four directions, camera images streamed over Wi-Fi, computer-vision detection and classification, separate wireless payload module, HC-05 antenna model |

## The Problem

The project starts from the fact that hazardous environments, such as mined, rugged, or exposed areas, put people at direct risk when they enter them. The book proposes a robot operated remotely from a safe position that sends the scene back to the operator, helps detect people and analyze images automatically, and can carry a payload to a set location and then move away from it.

The first chapter reviews well-known ground robots such as PackBot 525, TALON, MAARS, and Dragon Runner as background; their specifications are not results of this project.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**, covering the integration of the electronic components, connecting the control and communication modules, and testing the robot's software. It is presented among the office's work as an example of its support for projects that combine embedded systems, wireless communications, and computer vision.

## How the Robot Works

The system works in integrated layers, each with its own communication link:

1. **Motion control over Bluetooth:** the operator sends commands from the computer keyboard through a Python script to the HC-05 module connected to the Arduino UNO. The book notes that control was previously done through an app built with MIT App Inventor, which this project replaced with a Python environment.
2. **Motor driving:** the Arduino UNO processes the commands and sends control signals to the L298N driver, which runs the TT-type DC motors so the robot moves in the four main directions.
3. **Image streaming over Wi-Fi:** the camera mounted on the robot connects to the computer through an IP address, separately from the Bluetooth link, so images reach a Python script for processing.
4. **Detection and classification with YOLO:** when a person is detected in the image, the system follows them and classifies them by the type of clothing they wear.
5. **Automatic response:** when a person is classified in the specified category, the robot stops automatically and follows their movement, then the MP3-TF-16P module plays a stored audio clip that simulates the response, instead of any real ammunition.
6. **Camera and gripper actuation:** the robot carries two MG995 servos; the first holds the camera and runs automatically without manual control, and the second moves a gripper whose angle is not adjusted manually; it only releases the payload when it receives the command.
7. **Payload control over 433 MHz RF:** after releasing the payload, the robot moves a set distance away and sends a wireless command through the RF433MHz transmitter, and the payload plays a stored explosion sound only, with no explosive material.

## Hardware Components

The prototype consists of two independent circuits: the robot circuit and the payload circuit.

### Robot Circuit

| Component | Role in the system |
|---|---|
| Arduino UNO | Main controller for all robot operations |
| L298N driver | Controls the direction and speed of the DC motors |
| TT-type DC motors | Drive the platform |
| HC-05 Bluetooth module | Receives motion commands from the computer over UART |
| RF433MHz transmitter | Sends wireless commands to the payload circuit |
| Two MG995 servos | Hold the camera and move the gripper |
| MP3-TF-16P audio module | Plays the stored audio clips |
| DC-DC step-down regulator | Steps the battery voltage down from 12 V to 5 V to power the circuits |
| Batteries and charging circuit | Power the system and keep it running |
| Wi-Fi camera | Sends images to the computer through an IP address |

### Payload Circuit

| Component | Role in the system |
|---|---|
| Arduino Nano | Main controller for the payload circuit |
| RF433MHz receiver | Receives wireless commands from the robot |
| SG90 servo | Moves the payload mechanism |
| MP3-TF-16P audio module | Plays a stored sound when the command arrives |

The book's theory chapters explain these components in detail, including the H-bridge principle in the L298N, signal modulation in RF433MHz modules such as ASK, and wiring the HC-05 to the controller through the TX and RX pins. To understand the interface linking the HC-05 module to the controller, read our article [UART vs I2C vs SPI vs RS-232 in embedded systems](/articles/embedded-serial-protocols).

## The Three Communication Links

| Link | Module | Function |
|---|---|---|
| Bluetooth | HC-05 | Controlling the robot's motion from the computer |
| Wi-Fi | Camera via IP address | Sending images to Python for analysis and target identification |
| 433 MHz RF | RF transmitter and receiver | Remotely controlling the separate payload module |

Separating the links this way lets motion control over Bluetooth continue independently of the heavier image stream over Wi-Fi.

## Computer Vision with YOLO

The AI part relies on **YOLO (You Only Look Once)**, which detects objects in an image in a single pass through the neural network. The book reviews the evolution of YOLO versions and compares them with algorithms such as R-CNN and SSD, explains the **Roboflow** platform and the stages of training YOLO models on it (uploading images, annotation, data preparation, training, and deployment), and gives a theoretical explanation of the **Kalman filter** used for state estimation and object tracking.

The book does not state the size of the training dataset, the YOLO version used, or accuracy metrics for the implemented model.

## HC-05 Antenna Modeling in CST

The team studied the HC-05 Bluetooth module's antenna through electromagnetic simulation in **CST**, modeling the antenna structure, then adding the feed and analyzing its characteristics:

| Parameter | Simulated value |
|---|---|
| Center frequency (from the S11 curve) | 2.3819 GHz |
| Frequency band | 2.3555 to 2.4074 GHz |
| Best standing wave ratio (SWR) | About 1.2 at resonance |
| Directivity at 2.4 GHz | 4.710 dBi |

These values indicate good matching between the antenna and the transmission line within the simulation; they are modeling results, not lab measurements on the physical module.

## Documented Results

The robot was tested in a simulated environment, and the book reports that the following functions worked:

- The robot moved accurately in different directions via Bluetooth commands.
- The camera sent clear images over Wi-Fi, which were analyzed with image-processing algorithms to classify people.
- The payload release mechanism and its RF control worked in sync with the robot's commands.
- The simulated audio clips played through the audio module.
- The power supply stayed stable thanks to the voltage regulator and charging circuit.

These are descriptive functional results; the book reports no quantitative measurements for the implemented system, such as detection accuracy, response time, frames per second, actual link range, or battery runtime, so no undocumented accuracy or performance figures are attributed to the prototype.

## Limitations of the Current Version

- Control is manual from a laptop keyboard; the prototype has no autonomous navigation or automatic obstacle avoidance.
- Control range is limited to Bluetooth range, and image processing depends on an external computer and a Wi-Fi network.
- Classification relies on clothing appearance alone, a limited criterion that can be wrong, and its accuracy was not documented.
- Testing took place in a simulated environment on a lab prototype, without trials on real terrain.

## Possible Future Development

According to the book's future-outlook chapter, the idea could be developed through:

- Better batteries and power-management systems, and sources such as solar power, to extend runtime.
- Better mobility on difficult terrain with adaptive wheels or limbs, and LiDAR sensors.
- 3D, thermal, and infrared cameras for low-light operation.
- Greater autonomy and cooperation between several robots.
- Steering the technology toward humanitarian uses such as delivering medical supplies to affected areas, demining, search and rescue, and damage assessment.

## A Note on Ethics and Safety

The book devotes a section to the ethical dimensions of using robots in conflict, noting that automated systems do not grasp the ethical complexity of life-and-death decisions and that any such use must be subject to strict legal frameworks that ensure respect for human rights. The prototype shown here is an educational experiment in control, communications, and computer vision, with no real destructive capability.

## Planning a Similar System?

If you are working on a remote-controlled ground robot and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
