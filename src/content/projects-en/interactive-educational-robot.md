# Interactive AI Educational Robot for Children

A project to design and build **an interactive educational robot for children based on artificial intelligence and computer vision**, carried out by a team of students with technical assistance from **Techno Enjaz**. Using a front-facing digital camera, the robot captures the card or object a child shows it and recognizes **numbers and English letters** with EasyOCR, **fruits** with the YOLO algorithm, and **colors** with the HSV color space, then immediately plays an educational audio clip that names the item.

The robot's body was made with 3D printing and houses an Arduino Nano board, an HC-05 Bluetooth module, and three MG995 servo motors (one for the arm, two for the legs), powered by two Li-ion 18650 batteries. The voice clips were pre-generated on the ElevenLabs platform with a custom robot voice. In practical testing, the robot successfully recognized all four categories, displaying the item name and a confidence score and playing the matching audio; the report does not provide quantitative recognition-accuracy measurements.

## Project Facts

| Item | Details |
|---|---|
| Project type | Interactive educational robot (embedded hardware + computer-vision software) |
| Field | Educational robotics, computer vision, embedded systems, early learning |
| Year | 2025–2026 |
| Project status | Assembled final prototype, tested in practice with cards and objects in front of the camera |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, EasyOCR, YOLO, HSV with OpenCV, ElevenLabs, Arduino Nano, HC-05, MG995 servos |
| Outputs | Recognition of numbers, English letters, fruits, and colors; instant voice response; welcome gesture; GUI with live feed and controls |

## The Problem

Many tools for teaching children still rely on rote learning and memorization with limited interaction, while early childhood calls for methods that combine visual, auditory, and physical engagement. Children struggle to learn basic concepts such as numbers, letters, and colors when they are presented only theoretically, without a way to link what they see to what they learn.

Many educational apps and electronic systems also present static content and do not use computer vision to recognize real objects in the child's environment. The project therefore set out to build a robot that recognizes the item a child holds up, answers with a clear voice, and does so in an engaging physical body that moves.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that combine computer vision with embedded systems and Arduino microcontrollers in educational applications.

## How the Educational Robot Works

The system follows a repeating path from image capture to voice response:

1. On startup, the robot performs a single **welcome gesture**, raising its arm via the servo motor controlled by the Arduino Nano.
2. The front digital camera is activated to capture an image of the item shown to it.
3. The image is preprocessed to improve its quality before recognition.
4. The item type is determined and routed to the right model: **EasyOCR** for numbers and English letters, **YOLO** for fruits, and **HSV** for colors.
5. The name of the detected item is extracted and shown in the interface with a bounding box and confidence score.
6. The decision layer selects the audio clip matching the item and plays it immediately.
7. The system checks whether a new item is in front of the camera; if so it repeats the cycle, otherwise it ends the run.

The system block diagram divides the work into five layers: input (camera), preprocessing, artificial intelligence (the three models), decision-making (selecting the audio clip), and output (sound and motion).

## Recognition Technologies

| Category | Technology | How it is used in the project |
|---|---|---|
| Numbers and English letters | EasyOCR | CRNN architecture combining a CNN for feature extraction, an LSTM for character sequences, and CTC for decoding the text |
| Fruits | YOLO | Detects the object in a single pass over the image, returning a bounding box, class, and confidence score |
| Colors | HSV color space | Converts the image from RGB to HSV, then applies color thresholding to extract a mask and determine the dominant color |
| Voice response | ElevenLabs | Pre-generated audio files for all words and phrases, played immediately after recognition |

HSV was chosen because it separates color information from brightness, making color recognition more stable under changing lighting than RGB. EasyOCR was chosen for its ease of use with Python and OpenCV and its built-in multilingual support. The project preferred **pre-generated voice clips** over on-the-fly speech generation to keep responses fast and pronunciation quality consistent; the voice was designed with a text prompt asking for a clear educational robot voice in Modern Standard Arabic, with a gentle, encouraging tone suited to children.

## Electronic Components of the Robot

| Component | Role in the robot |
|---|---|
| Arduino Nano (ATmega328P, 16 MHz) | Main controller for the servo motors |
| HC-05 Bluetooth module | Wireless serial (UART) link between the robot and the software when needed |
| 3 × MG995 servo motors | One for the arm, two for the legs; metal gears, 11 kg·cm torque at 6V |
| LM2596 step-down converter | Lowers the battery voltage to the level required by the board and motors |
| 2 × Li-ion 18650 batteries | Power source (3.7V nominal, 3300 mAh per cell) |
| Digital camera | Captures images of items at the front of the body |
| Speaker | Outputs the educational audio |

The control signals of the three motors are wired to pins D9, D10, and D11 on the Arduino, the HC-05 is connected to the TX/RX pins, and all modules share a common ground to reduce noise and communication errors. The components were chosen after comparison with alternatives such as Arduino Uno and ESP32, HC-06, SG90 and MG996R, and the 7805 regulator, based on size, power consumption, torque, and ease of integration.

## Software Interface

The computer-vision program was developed in **Python** with a graphical interface that shows the live camera feed, including:

- A bounding box around the detected item, with its name and confidence score in the display window.
- The final recognition result at the bottom of the screen.
- Controls to start and stop the system, test the servo motors, and adjust their angles.

The report shows four application screens: recognition of numbers, English letters, fruits, and colors.

## Documented Results

According to the practical testing documented in the project:

- The system recognized numbers, English letters, fruits, and colors directly from camera images.
- The interface displayed the detected item's name and confidence score in real time.
- The matching audio clip was played after each recognition, providing audio-visual interaction.
- The system ran stably during continuous operation, and motor movement could be tested from within the program.

These are **functional results for a prototype**. The report contains no project-specific quantitative tables, such as per-category recognition accuracy, the number of images tested, or response time, so no specific accuracy figures are attributed to the robot. General figures cited in the report about EasyOCR or YOLO are known properties of those tools, not measurements of this robot.

## How It Compares with Similar Educational Robots

The project compares itself with commercial educational robots such as Anki Cozmo, Miko 3, Roybi, and Wonder Workshop Dash. According to that analysis, those systems focus on conversation, language learning, coding, or ready-made content, with limited support for visually recognizing real objects in the child's environment. The project defines the gap it targets as combining computer vision with bilingual voice interaction in a single, extensible platform.

## Limitations of the Current Version

- Recognition is limited to four defined categories: numbers, English letters, fruits, and colors; it does not classify general objects outside them.
- The movement actually implemented is a single welcome gesture at startup, not tied to the result of each recognition.
- Voice responses are limited to pre-recorded clips in Arabic and English; the robot does not hold open conversations with the child.
- The system has no adaptive learning, child-level tracking, or learning management platform.
- It was designed to work within the operating environment and data it was tested on, and no performance measurements under varied lighting and environments were published.

## Possible Future Development

According to the outlook in the project, the robot could be developed by:

- Adding new learning categories such as animals, geometric shapes, and simple words, and expanding the item database for different age groups and curricula.
- Supporting additional languages.
- Improving the recognition models for higher accuracy and speed under varied lighting and environments.
- A companion smartphone app to control the robot and manage educational content, with content updates that need no reprogramming.
- A system to record the child's performance, analyze progress, and issue periodic reports.
- Improving the mechanical design and adding more varied interactive movements.
- Integrating generative AI to offer activities and questions tailored to each child's level, and connecting the robot to cloud-based learning platforms.

## Planning a Similar System?

If you are working on an interactive educational robot for children and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
