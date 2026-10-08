# Intelligent Security and Surveillance System Using AI

An academic project to develop **an intelligent security system for protecting gold shops** that combines computer vision, deep learning, physical sensing, and IoT, carried out by a team of students with technical assistance from **Techno Enjaz**. The system analyzes the surveillance camera feed to detect three kinds of threat: **weapons** with the YOLO algorithm, **violent behavior** with a recurrent neural network (RNN), and **theft attempts** such as reaching into drawers, using body-pose estimation with the MediaPipe library.

Alongside the camera, a **PIR** motion sensor and a **flame** sensor monitor abnormal movement and fire indicators through a **NodeMCU ESP8266** controller. When any threat is detected, the system sounds an alarm inside the shop, saves a video clip of the event, and sends an alert to the shop owner through a **Telegram bot** describing the incident. The project documents these functions working with test screenshots, without publishing numerical accuracy metrics.

## Project Facts

| Item | Details |
|---|---|
| Project type | Intelligent surveillance system combining AI video analysis with physical sensors |
| Field | Computer vision, deep learning, IoT, security systems |
| Year | 2024–2025 |
| Project status | Working prototype with practical tests documented by screenshots |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, YOLO (pre-trained Ultralytics models), RNN, MediaPipe, OpenCV, NodeMCU ESP8266, HC-SR501 PIR sensor, flame sensor, Telegram Bot |
| Outputs | Weapon, violence, and theft detection, motion and flame detection, local alarm, saved event video clips, Telegram alerts |

## The Problem

Gold shops are among the commercial premises most exposed to theft, because they hold high-value goods that are easy to liquidate. Yet many rely on traditional means: cameras that record without analyzing, or alarms that trigger on a mechanical fault without interpreting the nature of the threat. In many cases the owner learns of an incident only after it has happened.

The project started from the need for a low-cost, easy-to-install system that moves protection from after-the-fact documentation to **early detection and instant alerting**, by analyzing the scene in real time and combining image, motion, and flame data in one system.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that integrate computer vision models with IoT controllers and sensors in practical security applications.

## How the System Works

According to the project's component integration diagram:

1. The camera feeds video frames to the **Python** processing unit, with **OpenCV** handling video reading and result display.
2. Three AI modules analyze the frames in parallel: YOLO for weapon detection, an RNN for analyzing motion sequences to detect violence, and MediaPipe for spotting suspicious behavior.
3. At the same time, the motion and flame sensors feed live readings to the **NodeMCU** controller.
4. The NodeMCU coordinates the sensor inputs and the outputs of the software analysis.
5. When a threat is detected (weapon, violence, theft attempt, suspicious motion, or flame), an alarm sounds inside the shop and a video clip of the event is saved to a dedicated folder.
6. An instant alert is sent to the shop owner through a **Telegram bot**, including a description of the incident, the detection time, and a link to the video.

## AI Detection Modules

| Module | Technology | What it detects |
|---|---|---|
| Weapon detection | YOLO via pre-trained Ultralytics models (such as YOLOv5 and YOLOv8) | A weapon in the frame, marked with a box and a label such as "knife" |
| Violence detection | Recurrent neural network (RNN) | Violent patterns in motion sequences within the video |
| Theft detection | MediaPipe pose estimation (33 body landmarks, 21 hand landmarks) | A hand entering a predefined restricted region (ROI) such as drawers or display cases |

The project used ready-made YOLO models from Ultralytics rather than building a model from scratch, customizing them for the project's needs.

## Hardware Components

| Component | Documented specifications | Role in the system |
|---|---|---|
| NodeMCU ESP8266 | 32-bit Tensilica L106 processor, 2.4 GHz Wi-Fi (802.11 b/g/n), 11 usable GPIO pins | Reads the sensors, coordinates, and sends alerts over the network |
| HC-SR501 PIR motion sensor | Detection range up to about 7 meters, adjustable sensitivity, delay from 1 second to 3 minutes | Detects any entry or abnormal movement in or around the shop |
| Infrared flame sensor | Detects wavelengths of 760–1100 nm over about 60 degrees, with a potentiometer for sensitivity | Early detection of fire |
| Surveillance camera | Video feed to the Python unit | Frame source for the detection algorithms |

## What the Practical Tests Documented

The project presented a set of tests, documented with screenshots, to show the components working together:

- **Theft detection:** MediaPipe detected a hand inside a sensitive region, and the on-screen alert "ALERT: Hand in Restricted Area!" appeared.
- **Weapon detection:** YOLO identified a knife held by a person, marked with a box and the label "knife".
- **Violence detection:** the alert "Violence Detected!" appeared when a fight scene between two people was analyzed.
- **Telegram alerts:** the shop owner received messages such as "Motion detected!", "Violence detected!", and "Weapon detected!" with the detection time.

These tests show the functions working in the scenarios presented, but the project **publishes no figures** for weapon or violence detection accuracy, false-alarm rates, or response time, and does not state the size of the test data. Percentages mentioned in the project's theory chapters, such as 97.4% accuracy for an RNN model on the UCSD Ped2 dataset, are results of earlier studies, not of this system.

## Limitations of the Current Version

- Evaluation is qualitative, based on test screenshots, rather than a numerical test on a defined dataset.
- The project itself notes the need to improve the algorithms' accuracy under different lighting, varied viewing angles, and crowds, to reduce false alarms.
- The system is designed for a single shop and does not yet include a dashboard or a link to external responders.

## Possible Future Development

According to the directions set out in the project:

- Integrating the system into wider central security systems for large organizations, banks, and museums.
- Improving YOLO, RNN, and MediaPipe accuracy in difficult lighting, varied angles, and crowded spaces.
- Adding sound sensors for sounds such as breaking glass, and pressure sensors in floors.
- An interactive dashboard with heat maps of the highest-risk areas and periodic analytical reports.
- A continuous-learning mechanism to update the models from new data.
- Extending the response to direct contact with security services, automatic door locking, and activation of fire suppression systems.

## A Note on Privacy

The system analyzes video of people inside the shop and stores clips of it, so any real deployment requires informing customers and staff that monitoring is in place, controls over clip retention and access rights, and compliance with local video-surveillance regulations.

## Planning a Similar System?

If you are working on an AI-based security surveillance system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
