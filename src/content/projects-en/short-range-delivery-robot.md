# Short-Range Order Delivery Robot

A design-and-implementation project for a **low-cost mobile robot** that transports orders and small objects over short distances in indoor environments such as hospitals, laboratories, offices, and educational institutions, combining autonomous mobility with a robotic arm for picking up and carrying objects.

The project addresses the high cost and complexity of commercial robotic systems, delivering a practical prototype suited to educational and research applications, with room for future upgrades such as autonomous navigation and obstacle avoidance.

## Technical Environment

- Arduino Uno (ATmega328P)
- Arduino IDE
- TT Gear Motors
- L293D Motor Driver
- Servo Motor
- HC-05 Bluetooth
- HC-SR04 Ultrasonic Sensor
- Lithium Battery + BMS

## Components and architecture

- **Control unit:** an Arduino Uno board as the main controller.
- **Mobility:** four DC gear motors driven through an L293D driver.
- **Robotic arm:** an arm with a servo-driven gripper to pick up and hold small objects.
- **Wireless control:** an HC-05 Bluetooth module with a phone app for driving.
- **Sensing:** an HC-SR04 ultrasonic sensor for distance measurement.
- **Power:** a lithium battery with a BMS protection circuit.

## Integration and operation

The mechanical chassis was designed and the system programmed in the Arduino IDE to achieve seamless integration between electronic and mechanical components, coordinating the robot's motion with the arm during delivery tasks, with a mobile app interface for control and monitoring.

## Test results

Practical tests showed the robot performing pickup and delivery tasks with satisfactory stability and reliability within its design limits: flat indoor floors and light objects matched to the motor and arm capacity, without AI or autonomous navigation in the current version.

## Planning a Similar System?

If you are working on a mobile robot or autonomous vehicle and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
