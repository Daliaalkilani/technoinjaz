# System for Measuring the Water Level Inside a Tank Using an Ultrasonic Sensor

This project was developed as an academic prototype for measuring **the water level percentage inside a tank** using an **HC-SR04** ultrasonic sensor and an **Arduino Nano** board, displaying the reading directly on a **16×2 LCD** and sending it wirelessly through an **HC-05 Bluetooth** module to an Android phone app built with **MIT App Inventor**. The student carried out the project with the assistance of the **Techno Enjaz office** during the prototype development path.

The project reflects hands-on experience in integrating sensors, microcontrollers, and a mobile interface within a single system — from contactless measurement of the distance to the water surface, through processing the reading on the Arduino Nano, to displaying the level percentage on the screen and the phone. In the documented tests the system showed **0%** for an empty tank, about **58%** at a level close to the middle, and **100%** when full.

## Project Facts

| Item | Details |
| --- | --- |
| Project type | Academic prototype for a water-level measurement system |
| Field | Embedded systems and sensor-based monitoring |
| Year | 2024–2025 |
| Project status | Prototype tested in three tank states |
| Techno Enjaz role | Technical support and assistance to the student during project development |
| Core technologies | Arduino Nano, HC-SR04, 16×2 LCD, HC-05 Bluetooth, Arduino IDE, MIT App Inventor |
| Outputs | Water-level percentage on the LCD and on the phone app via Bluetooth |

## The Problem

Many homes and facilities rely on manual estimates or simple tools to know how much water is in their tanks, and these methods do not give accurate or up-to-date readings. This can lead to a tank running dry unnoticed and water being cut off suddenly at home, or to disruption of production processes that depend on a steady water supply in industrial settings, as well as water waste due to a lack of clear visibility of consumption.

The project proposes a simple solution that measures the level without contact with the water and displays it at the tank and on a phone, so the user knows the water level without opening or manually checking the tank.

## Project Objectives

- Measure the distance between the water surface and the device with an ultrasonic sensor and convert it into a water level using mathematical equations.
- Provide an immediate visual readout on an LCD connected to the system.
- Build a phone app for following the water level without direct access to the tank.
- Integrate wireless communication via the HC-05 module to transfer data without cables.
- Offer a solution that can be adapted to residential and industrial settings.

## The Role of the Techno Enjaz Office

The student carried out the project in an academic context **with the assistance of the Techno Enjaz office**. The office's contribution consisted of supporting the prototype development path, while the detailed work of each party — such as circuit design, firmware writing, or building the mobile app — is not detailed in the available materials, so these tasks are not individually attributed to the office on this page.

## How the System Works

1. The HC-SR04 sensor is mounted at the top of the tank, facing the water surface.
2. The Arduino Nano sends a pulse of at least 10 microseconds to the **Trigger** pin, and the sensor emits ultrasonic waves toward the water surface.
3. The echo return time is measured on the **Echo** pin using the `pulseIn()` function.
4. Distance is calculated as **Distance = (Time × Speed of sound) ÷ 2**, where the speed of sound in air is about 343 m/s at room temperature, and the result is divided by 2 because the wave travels the distance there and back.
5. A software algorithm on the Arduino Nano converts the distance into a **water-level percentage** based on the tank's minimum and maximum height limits.
6. The percentage is shown on the 16×2 LCD, which refreshes periodically with the latest reading.
7. The same percentage is sent through the HC-05 module (UART interface) to the phone app, which displays it to the user.

The documented version of the project relies on Bluetooth to communicate with the phone, so wireless monitoring works within Bluetooth range; it is not internet-based or cloud-platform monitoring.

## System Components

| Component | Role in the system | Documented specifications |
| --- | --- | --- |
| Arduino Nano | Receives the sensor reading, processes it, and converts it to a percentage | 5V operation, 7–12V input, 16 MHz oscillator, 14 digital pins and 8 analog inputs |
| HC-SR04 | Measures the distance to the water surface using ultrasonic waves | 5V, 2–400 cm range, 15-degree effective measuring angle, about 15 mA while operating |
| 16×2 LCD | Displays the water-level percentage locally | 16 characters on two lines, HD44780 controller, 4-bit wiring (D4–D7) with a potentiometer for contrast |
| HC-05 Bluetooth | Sends the reading wirelessly to the phone | 3.3–5V, Bluetooth V2.0, UART serial link over TX/RX |
| MIT App Inventor app | Receives and displays the data on an Android phone | Visual block-based environment (Designer and Blocks Editor) |

The controller program was written in the **Arduino IDE**, and the power, ground, and signal pins of each element were wired according to the final circuit diagram.

## Technical Challenges

Developing the prototype revealed several practical challenges directly related to integrating electronic and software systems:

- **Component integration:** Connecting the sensor, LCD, and Bluetooth module to the Arduino required repeated wiring and code changes to solve data-transfer issues between the parts.
- **Environmental sensitivity:** The project noted that temperature and humidity slightly affected the ultrasonic sensor's readings, which called for additional mathematical equations to correct them.
- **Wireless link stability:** Temporary Bluetooth dropouts occurred with greater distance or interference and were addressed by improving the connection settings.
- **Reading processing and timing:** Turning the raw distance into an easy-to-understand percentage required tuning the algorithm and the tank's measurement limits, with a careful balance between responsiveness and accuracy.

## Testing and Results

The prototype was tested in three main tank states:

| Tank state | Displayed reading |
| --- | --- |
| Completely empty | 0% |
| Filled to roughly half its height | about 58% |
| Filled to the upper limit used in the test | 100% |

### Empty Tank

When tested with an empty tank, the system displayed a reading of **0%**, confirming that the lower limit point of the prototype works.

### Medium Level

When the tank was filled to a level described in the report as close to mid-height, the system displayed a reading of roughly **58%**. This test shows that the system converts the measured distance into a relative reading between the empty and full points. This case alone is not used to calculate an accuracy percentage, because the reference level itself was described as approximate.

### Full Tank

When the tank was filled up to the upper limit used in the test, the system displayed a reading of **100%**, showing that the upper limit point of the prototype works.

## What Does the Prototype Prove?

The tests show that the prototype was able to carry out the basic measurement and display cycle across three different tank states, integrating the sensor, the controller, the screen, and the phone connection. The available materials do not include extended calibration testing or a documented error rate across the full measurement range, so the results here are presented as functional tests of the prototype rather than a standard certification of measurement accuracy.

## Limitations of the Current Version

- The system shows a **percentage** of the water level; it does not show water volume in liters in the documented app.
- The phone connection is local via Bluetooth, with no internet-based monitoring.
- The current version has no low-level alerts or consumption reports; these are proposed as future work.
- Testing was done on a single test tank in three states, without systematic measurement of the error rate.

## Future Development Opportunities

According to the recommendations in the project, the prototype could be extended by:

- Improving accuracy with several sensors working in parallel or more advanced sensors to handle the effect of temperature and humidity.
- Developing processing algorithms that reduce delay and interference errors, and using AI to analyze data and forecast water consumption.
- Adding more information and alerts on the LCD when the level drops below a set point.
- Adding weekly or monthly reports and instant notifications in the app for leaks or lost connection.
- Replacing Bluetooth with a longer-range, more stable technology such as Wi-Fi or Zigbee.
- Customizable settings for different tank types and sizes, and better resistance to dust and humidity.
- Integrating the system with IoT technologies as part of a smart home or wider water management systems.

These remain future developments and are not part of the current documented version.

For the bigger picture of how such a prototype grows into a connected system, read our article [What Is the Internet of Things (IoT)? Architecture, Protocols, Applications, and Security](/articles/internet-of-things-iot).

## Have a Similar Project?

If you are working on a prototype or a monitoring system based on sensors and microcontrollers, you can contact **Techno Enjaz** to discuss the project's requirements and the appropriate scope of technical support.

## Planning a Similar System?

If you are working on a sensor and electronics monitoring system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
