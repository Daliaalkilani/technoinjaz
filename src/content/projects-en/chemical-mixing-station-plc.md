# Automated Chemical Mixing Station with PLC Control

A design-and-implementation project for an **automated chemical liquid mixing station** built on a Programmable Logic Controller (PLC) programmed with Delta WPLSoft, managing the mixing process with high accuracy through sequential control that executes filling, mixing, and discharge stages automatically and in an organized sequence.

The project minimizes human intervention and improves industrial process accuracy, serving as a practical model for understanding industrial control principles and PLC programming — simple to implement and low-cost, making it suitable for educational environments and small-to-medium industrial applications.

## Technical Environment

- Delta PLC
- Delta WPLSoft
- DOPSoft
- Ladder Logic / SFC
- Liquid Level Sensors
- RTD Temperature Sensor
- Solenoid Valves

## Automated operating cycle

- **Filling:** solenoid valves for materials A and B are controlled based on liquid level sensor readings in the main tank.
- **Mixing:** the mixer motor runs for a fixed period (10 seconds) to ensure mixture homogeneity.
- **Discharge:** the final mixture is released automatically following a defined logical sequence.
- **Thermal monitoring:** a temperature sensor continuously tracks the mixture temperature during operation.

## Industrial safety and alarming

The system includes an early-warning alarm that activates when the mixture temperature exceeds allowed limits, strengthening industrial safety and reducing operational risks. Integrating sensors, solenoid valves, and the controller provides real-time monitoring of operating variables and fast response to abnormal conditions.

## Simulation and testing

The control logic was developed in Delta WPLSoft using ladder networks, timers, counters, and MOV instructions, with a monitoring interface built in DOPSoft. The system was validated in a simulation environment covering the fill–mix–discharge cycle and the consistency of operating conditions.

## Project boundaries

The project does not cover large-scale production lines or complex chemical reactions, does not use SCADA or DCS systems in full, and does not integrate AI into the control loop.

## Planning a Similar System?

If you are working on a PLC-based control system or industrial process automation and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
