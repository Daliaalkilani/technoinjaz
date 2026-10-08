# Vehicle Data Analysis and Reporting System with OCR

A project to develop **a miniature smart border-station model** that recognizes **vehicle license plates** using computer vision and **optical character recognition (OCR)**, then compares the plate number with a database of authorized vehicles to decide automatically whether to open the barrier or keep it closed. The project was carried out by a team of students with technical assistance from **Techno Enjaz**.

The system combines a **Python** program that uses the **YOLO** algorithm to locate the plate and OCR to read it with a **NodeMCU ESP8266** board that controls a barrier driven by an **MG995** servo, plus an infrared sensor that detects an approaching vehicle, LED indicators, and automatic messages sent through an **HC-05 Bluetooth** module to an app on a receiving device, reporting toll deductions, violations, or a wanted vehicle. The project provides a functional proof of concept on a miniature model, without published numerical measurements of reading accuracy.

## Project Facts

| Item | Details |
|---|---|
| Project type | Miniature access-control model based on license plate recognition |
| Field | Computer vision, automatic license plate recognition (ALPR), embedded systems |
| Project status | Working miniature entry-station model |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, YOLO, OCR, NodeMCU ESP8266, MG995 servo, IR sensor, HC-05 Bluetooth |
| Outputs | Plate number reading, pass or deny decision, automatic barrier opening, LED indicators, toll, violation, and alert messages |

## The Problem

Traditional verification at entry points and border crossings relies on human intervention for checks and inspection, which makes it prone to error and delay, especially when an unauthorized vehicle requires an immediate response. The project aims to automate the check of a vehicle's right to enter by reading its plate and comparing it with a database, using a low-cost solution that does not need complex infrastructure.

## Project Objectives

- Verify vehicles automatically and prevent unauthorized ones from entering.
- Reduce human intervention in inspection and monitoring, and the errors that come with it.
- Speed up verification through immediate image processing and automatic database comparison.
- Build a scalable system that could later be used at more than one entry point.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that connect computer vision with electronic control in a single physical model.

## How the System Works

1. **Approach detection:** An infrared (IR) sensor detects a vehicle approaching the gate.
2. **Capture:** The sensor triggers the camera to take a picture of the vehicle's plate.
3. **Plate detection:** A Python program locates the plate in the image using the YOLO computer vision algorithm.
4. **Reading:** OCR extracts the text on the plate, i.e. the vehicle's number and identifying characters.
5. **Verification:** The extracted number is compared with the database of authorized vehicles and their document status.
6. **If allowed:** The NodeMCU board sends a command to the servo to open the barrier, a green LED lights up, and a toll-deduction notification is sent.
7. **If denied or in violation:** The barrier stays closed, a red LED lights up, and an alert with the vehicle's details is sent to the competent authority, along with a notice to the owner explaining the violation.

## Hardware Components

| Component | Role in the model |
|---|---|
| Camera | Captures the vehicle's plate image |
| Computer running the Python program | Detects the plate with computer vision, reads it with OCR, and compares it with the database |
| NodeMCU ESP8266 | Receives the entry decision and controls the barrier and indicators; 80 MHz (or 160 MHz) processor with Wi-Fi |
| MG995 servo | Opens and closes the entry barrier; about 10 kg·cm torque, about 180 degrees of travel, 4.8–7.2V supply |
| IR obstacle sensor | Detects the approaching vehicle; short adjustable range of roughly 2–30 cm |
| DC-DC step-down regulator | Lowers and stabilizes the supply voltage for the components |
| LED indicators (green and red) | Indicate pass or deny |
| HC-05 Bluetooth module | Sends notifications to the app on the receiving device |
| Resistors | Protect components and limit current |

## Notifications and Alerts

The report shows examples of automatic messages sent by the model, including:

- A toll deduction message (for example, $10 deducted) with a warning that the registration and insurance are about to expire and must be renewed.
- A toll deduction message with a violation recorded against the owner for not renewing the registration and insurance.
- An alert that a wanted vehicle has been found on the public road, asking the recipient to inform the nearest police point.

In the built model these messages reach an app on a nearby device over Bluetooth, so they simulate the notification channel rather than providing a real link to messaging systems or official authorities.

## Documented Results

The miniature model successfully carried out the full cycle: detecting the approaching vehicle, capturing and reading the plate, making the entry decision, opening the barrier or keeping it closed, showing the appropriate light indicator, and sending toll, violation, and alert messages.

The report describes the system as fast and accurate under varied lighting and plate styles, but it **gives no numerical measurements** of plate-reading accuracy, processing time, or the number of plates tested. The high accuracy figures in the literature review chapter (such as above 95% or 99%) come from other published studies and are not results of this project.

## Limitations of the Current Version

- The system is a miniature model of a single gate and was not tested at a real crossing or on full-size vehicles.
- The authorized-vehicle database is local and experimental, with no link to traffic or official databases.
- Notifications are sent over Bluetooth to a nearby device, not over a telecom network.
- No quantitative OCR accuracy figures were published for night lighting, fog, or difficult capture angles.

## Possible Future Development

According to the directions set out in the project:

- Supporting plates in multiple languages and styles (Arabic, English, and others) by expanding the data and training the model.
- Using live-stream cameras to analyze video in real time without stopping the vehicle.
- Strengthening the system's digital security with encryption and intrusion detection, since it handles sensitive data.
- Improving performance at night, in fog, and with noisy images by training on more varied data and newer versions such as YOLOv9 or YOLOv10.
- Integration with central government databases for traffic and transport systems.
- An interactive dashboard for the relevant authorities showing entry attempts, reports, and statistics, with data archiving.
- Adding a camera to detect driver violations at entry points, such as not wearing a seat belt or using a phone while driving.
- Tracking the vehicle after entry through GPS units or multi-point cameras.

## A Note on Data

Systems of this kind handle plate numbers, owner data, and violations, so any real deployment requires a clear legal framework, defined access rights, and protection of stored and transmitted data.

## Planning a Similar Automated System?

If you are working on an automated access-control or computer vision system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss the project's requirements and the appropriate scope of support.
