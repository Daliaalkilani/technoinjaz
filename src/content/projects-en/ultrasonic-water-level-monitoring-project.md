# System for Measuring the Water Level Inside a Tank Using an Ultrasonic Sensor

This project was developed as an academic prototype for measuring **the water level percentage inside a tank** using an ultrasonic sensor, displaying the reading directly on an LCD screen and transmitting it wirelessly to a mobile application over Bluetooth. The student carried out the project with the assistance of the **Techno Enjaz office** during the prototype development path.

The project reflects hands-on experience in integrating sensors, microcontrollers, and a mobile interface within a single system — starting from measuring the distance to the water surface, through processing the reading on an Arduino Nano, to displaying the level percentage on the screen and sending it to the phone.

## Project Facts

| Item | Details |
| --- | --- |
| Project type | Academic prototype for a water-level measurement system |
| Sector | Embedded systems and sensor-based monitoring |
| Techno Enjaz role | Assisting the student during the development of the project and the prototype |
| Project status | Tested prototype |
| Year | 2024–2025 |
| Controller unit | Arduino Nano |
| Sensor | HC-SR04 Ultrasonic Sensor |
| Display screen | LCD 16×2 |
| Wireless communication | HC-05 Bluetooth |
| Mobile application | MIT App Inventor |

## About the Project

The system relies on an HC-SR04 sensor mounted at the top of the tank to measure the distance between the sensor and the water surface. The reading is sent to an Arduino Nano, where it is processed and converted into **a percentage representing the water level inside the tank** according to the lower and upper height limits defined in the prototype. The percentage is then shown on the LCD screen and is also sent via the HC-05 module to a mobile application built using MIT App Inventor.

The documented version of the project relies on Bluetooth for communication with the phone, so wireless monitoring takes place within Bluetooth range — it is not internet-based monitoring or a cloud platform.

## The Role of the Techno Enjaz Office

The project was implemented by the student in an academic context **with the assistance of the Techno Enjaz office**. The office's contribution consisted of supporting the development path of the project's prototype, while the detailed work of each party — such as designing the circuit, writing the firmware, or building the mobile application — is not itemized in the available materials; these tasks are therefore not attributed to the office alone on this page.

## System Components

The prototype consists of a set of elements that work together within a single measurement-and-display path:

- **Arduino Nano:** receives the sensor reading, processes it, and converts it into a level percentage.
- **HC-SR04:** measures the distance between the top of the tank and the water surface using ultrasonic waves.
- **LCD 16×2:** displays the water level percentage locally.
- **HC-05 Bluetooth:** transmits the reading wirelessly to the phone.
- **MIT App Inventor:** used to build the application interface that receives the data and displays it to the user.

## How the System Works

Measurement begins with the HC-SR04 sensor sending ultrasonic waves toward the water surface and measuring the time it takes for the echo to return. This information is used to calculate the distance between the sensor and the water surface. The Arduino Nano then processes the distance value and converts it into a percentage representing the water level within the tank's defined height.

The result is sent to two paths at the same time: the LCD screen, to display the reading directly next to the tank, and the HC-05 module, which transmits the percentage to the mobile application over Bluetooth. In this way, users can check the water level without needing to open or manually inspect the tank.

## Technical Challenges

Developing the prototype surfaced a number of practical challenges directly related to integrating electronic and software systems:

- **Component integration:** connecting the sensor, the LCD screen, and the Bluetooth module to the Arduino required tuning the wiring and coordinating the data exchange between the components.
- **Measurement sensitivity to the environment:** the project noted that factors such as temperature and humidity can affect the ultrasonic sensor's reading, which made it necessary to account for correcting readings during development.
- **Wireless link stability:** temporary Bluetooth dropouts appeared when the distance increased or interference was present.
- **Reading processing:** converting the raw distance into an easily understood percentage required tuning the algorithm and the measurement limits specific to the tank.

## Testing and Results

The prototype was tested in three main tank states:

### The Empty Tank

When the tank was tested empty, the system displayed a reading of **0%**, confirming the operation of the minimum reference point in the prototype.

### A Mid-Level Amount

When the tank was filled to a level described in the report as close to the middle of the height, the system displayed a reading of approximately **58%**. This test shows that the system converts the measured distance into a relative reading between the empty and full points. This case alone is not used to compute an accuracy figure, because the reference level itself was described as approximate.

### The Full Tank

When the tank was filled to the upper limit used in the experiment, the system displayed a reading of **100%**, demonstrating the operation of the upper reference point in the prototype.

## What Does the Prototype Prove?

The tests show that the prototype was able to carry out the basic measurement-and-display cycle across three different tank states, with the sensor, controller, screen, and phone communication all integrated. The available materials do not include an extended calibration test or a documented error rate across the full measurement range, so the results are presented here as functional tests of the prototype rather than as a certified measurement accuracy.

## Future Development Opportunities

The prototype can be extended in the future by improving calibration, adding auxiliary sensors to compensate for the effect of temperature and humidity, or replacing Bluetooth with a networked communication medium such as Wi‑Fi when monitoring from outside the local range is needed. Level-limit alerts could also be added, or the system could be developed to integrate with the control of a pump or valve — these functions are treated as future developments and are not part of the currently documented version.

For the bigger picture of how such a prototype grows into a connected system, read our article [What Is the Internet of Things (IoT)? Architecture, Protocols, Applications, and Security](/articles/internet-of-things-iot).

## Have a Similar Project?

If you are working on a prototype or a monitoring system based on sensors and microcontrollers, you can contact **Techno Enjaz** to discuss the project's requirements and the appropriate scope of technical support.

## Planning a Similar System?

If you are working on a sensor and electronics monitoring system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
