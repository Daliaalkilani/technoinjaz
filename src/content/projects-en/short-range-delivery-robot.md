# Short-Range Order Delivery Robot

An academic project to design and build a **low-cost delivery robot** that carries orders and small objects over short distances in indoor environments such as hospitals, laboratories, offices, and educational institutions. It was carried out by a team of students with technical assistance from **Techno Enjaz**, and is built on an **Arduino Uno**, four DC motors with an **L293D** driver, a gripper driven by a **servo motor**, and an **HC-SR04** distance sensor, controlled from a phone app over **Bluetooth HC-05**.

The robot stops automatically when an obstacle comes closer than **30 cm**, and tests showed that app commands arrive with a delay of no more than **50 ms** within a range of up to **8 meters** indoors. The project provides a practical prototype for educational and research use that can later be extended with autonomous navigation and computer vision.

## Project Facts

| Item | Details |
|---|---|
| Project type | Prototype of a remotely controlled indoor delivery robot |
| Field | Mobile robotics, embedded systems, wireless communication |
| Project status | Assembled prototype tested in practice indoors |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Arduino Uno (ATmega328P), Arduino IDE and C++, L293D, TT motors, servo motor, HC-05, HC-SR04, 18650 batteries with BMS |
| Outputs | Four-wheel robot with an order compartment, gripper for picking up orders, phone control app, automatic stop at obstacles |

## The Problem

Hospitals, laboratories, warehouses, and educational institutions frequently need to move small objects and materials over short distances. Although commercial robotic systems exist for this, most are expensive and complex, which limits their use in educational projects and small applications with limited budgets.

The project set out to build a mobile robot that picks up and carries objects while reducing human involvement in routine transport, using available, low-cost electronic components while keeping acceptable performance and making it easy to operate, maintain, and extend.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for low-cost mobile robotics and embedded-systems projects.

## How the Delivery Robot Works

1. On power-up, the program initializes the input/output pins and sets up the communication module, motors, and sensor.
2. The user connects to the robot from the phone app over Bluetooth through the HC-05 module.
3. The app sends single-letter commands: **F** forward, **B** backward, **R** right, **L** left, **S** stop, **G** close the gripper, and **O** open it.
4. The controller parses the command and sends direction and speed (PWM) signals to the L293D to drive the wheels, or a PWM signal to the servo to open or close the gripper.
5. While moving, the program continuously reads the HC-SR04 sensor to measure the distance ahead.
6. If the distance drops below **30 cm**, the controller immediately stops all motors to avoid a collision, then waits for a new command from the user.

The program is split into independent functions for each task, which makes it easy to modify or extend without rebuilding it entirely.

## Mechanical Structure

The robot has a **lower base** carrying the four-wheel drive system and an **upright body** containing a dedicated compartment for orders, with a front opening that makes loading and unloading easy. The sensor is mounted at the front of the base facing the direction of travel, the components are distributed evenly to reduce vibration, and the outer shell is simple and enclosed to protect the components while keeping them accessible for maintenance.

## Electronic Components

| Component | Role in the system |
|---|---|
| Arduino Uno (ATmega328P) | Main controller: receives commands and manages all modules |
| Four TT gear motors | Drive the four wheels; the two motors on each side are wired in parallel |
| L293D driver | Controls the direction and speed of the right and left motor pairs |
| Servo motor | Opens and closes the gripper to pick up orders and release them at the drop-off point |
| HC-SR04 ultrasonic sensor | Measures the distance ahead and detects obstacles |
| HC-05 Bluetooth module | Receives app commands wirelessly |
| Three 18650 lithium-ion cells | Wired in series to give about 11.1 V for the board and motors |
| BMS protection circuit | Protects against overcharge, deep discharge, overcurrent, and short circuits |

### Arduino Uno Pin Assignment

| Module | Pins used |
|---|---|
| L293D (right motors) | D8 and D9 for direction, D10 for speed (PWM) |
| L293D (left motors) | D11 and D12 for direction, D13 for speed |
| Servo motor | D3 for the gripper angle signal |
| HC-SR04 | D4 to send the pulse (TRIG), D5 to receive the echo (ECHO) |
| HC-05 | D6 and D7 via SoftwareSerial to avoid conflicts with D0 and D1 |
| Power | Battery to the Arduino's Vin pin and to the L293D's Vcc2, with a common ground for all components |

The motors are powered directly from the battery through the L293D, while the controller logic, servo, sensor, and Bluetooth module run on 5 V from the board, isolating the control circuit from the motors' high loads.

## Phone Control App

The team developed a dedicated smartphone app that connects to the HC-05, with a simple interface containing the basic motion buttons and the gripper open/close buttons, each in a distinct color to make them easy to recognize during operation. The interface design allows adding buttons later for speed control or advanced operating modes.

## Documented Results

The practical tests covered the wireless link, movement in different directions, the distance sensor's response, and gripper control:

| Test | Documented result |
|---|---|
| HC-05 link | The connection worked and the robot responded to commands directly with no noticeable delay |
| App response time | No more than 50 ms within a range of up to 8 meters indoors |
| Movement | The robot moved steadily in all required directions indoors |
| HC-SR04 sensor | Detected obstacles and stopped the robot when closer than 30 cm |
| Gripper | Stable performance opening and closing and handling orders |

The book does not state the maximum payload in grams, travel speed, battery runtime, or the number of test repetitions.

## Limitations of the Current Version

- The robot operates indoors on flat floors relatively free of large obstacles; it was not designed for outdoor environments or rough surfaces.
- It carries light objects whose weight and size suit the capacity of the motors and gripper.
- Steering is manual from the phone, with no autonomous navigation, AI, or computer vision; the distance sensor only stops the robot and does not plan an alternative path.
- Control range is limited by Bluetooth range, and obstacle detection relies on a single front sensor.

## Possible Future Development

According to the outlook in the project:

- Autonomous navigation that takes the robot to its destination without direct control, with AI to analyze the work environment.
- Remote control and monitoring over Wi-Fi or the Internet of Things.
- A camera and computer-vision systems to recognize the surroundings and choose a route.
- Combining several sensors to improve obstacle-avoidance accuracy.
- A complete app showing the robot's status and battery level, letting users set each order's destination and organize deliveries.
- A lighter, sturdier chassis, and higher-capacity batteries with automatic return to a charging station.

## Planning a Similar System?

If you are working on a mobile robot or autonomous vehicle and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
