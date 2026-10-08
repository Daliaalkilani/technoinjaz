# Automated Chemical Mixing Station with PLC Control

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to design **an automated control system for a chemical liquid mixing station** based on a Delta **Programmable Logic Controller (PLC)**. The system transfers two materials (A and B) from two feed tanks into a main mixing tank using **sequential control** driven by level sensor readings, then runs the mixer motor once filling is complete, while monitoring the mixture temperature.

The project was implemented **in a simulation environment**: Ladder Diagram programming for a **Delta DVP-ES2** PLC in **ISPSoft**, an operation and monitoring **HMI** designed in **DOPSoft**, and the two linked through Delta's software emulator and COM Manager. The simulation showed the operating sequence working: safe start and stop, sequential pump control, liquid transfer, mixer start after filling, and temperature monitoring on an animated graphical interface.

## Project Facts

| Item | Details |
|---|---|
| Project type | Automated control system for an industrial process (liquid mixing automation) |
| Field | Industrial automation, PLC programming, HMI monitoring |
| Project status | Programmed system tested in a software simulation environment |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Delta DVP-ES2, Ladder Diagram, ISPSoft, Delta WPLSoft, DOPSoft, Delta Emulator, COM Manager |
| Outputs | Sequential control program, interactive HMI, full simulation of the fill and mix cycle |

## The Problem

Many conventional chemical mixing systems still rely partly on manual operation or limited control systems, which leads to:

- Poor accuracy in controlling the proportions of materials entering the tank.
- Difficulty achieving repeatable, stable mixing results because of human intervention.
- Weak real-time monitoring of key variables such as liquid level and temperature, delaying the detection of abnormal conditions.
- No integration between sensors, alarm systems, and controllers, increasing the chance of errors during filling, mixing, and discharge.

Temperature monitoring matters all the more because temperature is a critical factor in many chemical reactions, and exceeding its limits can create serious operational risks. This led to the idea of a PLC system that runs mixing in a safe logical sequence with continuous monitoring.

## Project Objectives

- Manage the inflow of materials A and B based on liquid level sensor readings.
- Build a logical sequence of stages: filling, then mixing, then discharge.
- Run the mixer motor for a fixed period (10 seconds in the design) to ensure a homogeneous mixture.
- Continuously monitor the mixture temperature and trigger an alarm when it exceeds the allowed limit.
- Reduce reliance on human intervention and improve accuracy and repeatability.
- Provide an expandable, hands-on educational model of industrial automation concepts.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for industrial automation projects, PLC programming, and HMI interfaces.

## System Components

| Component | Role in the system |
|---|---|
| Delta DVP-ES2 PLC | Executes the sequential control logic |
| Two feed tanks and the main tank | Store materials A and B, then receive the mixture |
| Sensors S1, S2, and S3 | Confirm that liquids are present and at safe operating levels before the pumps start; wired to digital inputs |
| Two pumps (outputs Y0 and Y1) | Pump liquids from the feed tanks to the mixing tank |
| Mixer motor | Mixes the liquids in the main tank once filling is complete |
| Temperature indicator | Tracks the state of the mixture during operation |
| Start, Stop, and Emergency buttons | Start, stop, and emergency shutdown |

## Control Program in Ladder Diagram

The control program was developed in ISPSoft using Ladder Diagram and divided into several logic networks:

1. **Start/stop circuit:** based on the Start, Stop, and Emergency buttons; it energizes internal relay **M0**, which represents the overall running state of the system.
2. **Timer T0:** organizes the operating sequence and prevents all operations from starting at once, so pumping runs in an orderly timed sequence.
3. **Pump control:** the two pumps run only after the conditions from sensors S1, S2, and S3 are met.
4. **Mixing control and temperature monitoring:** the mixer motor starts after the main tank is filled, and conditional compare instructions check the values stored in data registers to keep the temperature from reaching unsafe values.
5. **MOV instructions:** move values into PLC registers to update HMI elements such as the temperature indicator and the various operating states.

The project summary refers to programming in Delta WPLSoft, while the implementation chapter developed the program in ISPSoft; both are Delta tools for the DVP series.

## Operation and Monitoring HMI

The interface was designed in DOPSoft and shows the liquid tanks, the pumps, the main mixing tank, the start and stop buttons, the sensors, and a temperature indicator. It animates the state of the pumps, the flow of liquid through the pipes, and the mixer motor, with the mixer impeller changing color when mixing starts.

## Simulation and Software Integration

The system was tested without physical hardware, using Delta's software emulator. **COM Manager** was used to connect ISPSoft with DOPSoft over the local address (localhost) using Delta protocols, allowing real-time data exchange between the virtual PLC and the HMI during simulation.

## Documented Results

The simulation showed the system successfully performing the following functions:

- Starting and stopping the system safely.
- Sequential pump control.
- Transferring liquids from the feed tanks to the mixing tank.
- Starting the mixer motor after filling is complete.
- Monitoring temperature during operation.
- Displaying the process graphically and interactively on the HMI.
- Integrating the PLC and the monitoring interface in a complete simulation environment.

These are functional simulation results; the project reports no timing measurements and no tests on real hardware or actual liquids.

## Limitations of the Current Version

- The system was implemented and tested in simulation only, without installation on a real control panel or tanks.
- It does not cover high-capacity production lines or complex chemical reactions that require mathematical models or advanced control.
- It does not use SCADA or DCS systems in full and does not integrate AI or machine learning into control.
- The discharge stage and the temperature alarm appear in the design objectives and conclusion, while the simulation results shown focus on filling, mixing, and temperature monitoring.
- It does not include a detailed economic feasibility study.

## Possible Future Development

According to the directions set out in the project, the system could be developed by:

- Adding a **SCADA** system for better centralized monitoring and control.
- Extending the system to more tanks and production lines for high-capacity applications.
- Using more accurate analog sensors and advanced input modules for steadier level and temperature readings.
- Integrating industrial communication protocols such as **Modbus TCP** and **Ethernet/IP** for connection with the Industrial Internet of Things (IIoT).
- Advanced control algorithms to improve mixing quality and reduce energy use, plus smarter alarm and response systems.

## Planning a Similar System?

If you are working on a PLC-based control system or industrial process automation and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
