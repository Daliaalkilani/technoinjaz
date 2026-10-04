<!--
FILE: 02-article.md
PURPOSE: Published article content
-->

SEO Title: What Is a Digital Twin? How It Works, Its Applications, and Its Main Challenges

Meta Description: A comprehensive guide to understanding the Digital Twin: how it works, its components, the difference between it and simulation, and its key applications in industry, buildings, and healthcare, along with the challenges it faces.

Suggested Slug: digital-twin

# Digital Twin: What Is It, How Does It Work, and What Are Its Key Applications?

**A Digital Twin is a data-based digital representation of a real-world entity or process, synchronized with reality to a degree and at a frequency suited to the purpose of its use.** Its role is not limited to displaying the shape of an asset; it extends to monitoring its state, analyzing its behavior, testing scenarios, predicting problems, and supporting decision-making.

The Digital Twin Consortium defines a digital twin as an integrated, data-driven virtual representation of real-world entities and processes, with synchronized interaction at a specified frequency and fidelity. This wording matters because it corrects a common belief: **not every digital twin needs to update in real time in the literal sense**; synchronization may happen every few seconds, minutes, or hours, or when a particular event occurs, depending on the use case.

NIST, for its part, notes that the field still uses relatively varied definitions across sectors. That is why the right starting point for any project is not choosing a technology platform, but defining what the twin will represent, the decision it must support, and the level of fidelity needed to achieve that.

## From Apollo to Grieves: The Roots of the Idea

The practical roots of the digital twin lie in a long history of modeling and simulation in aviation and space programs. According to NASA, the Apollo program used vehicles, simulators, and ground models to study the situations spacecraft might face in space, and the Apollo 13 experience is often cited as an early example of the idea that later evolved into the digital twin concept.

The modern conceptual model, however, traces back to the work of **Michael Grieves** in Product Lifecycle Management (PLM). NASA's historical materials explain that in 2002 Grieves presented a model linking the physical world, the virtual world, and the data flows between them, before the name Digital Twin later settled into use. In 2010, introducing the term into NASA's roadmap became associated with the name John Vickers.

So it is more accurate to distinguish between **the practical roots of the concept**, **its formulation as a modern model**, and **the spread of the term itself**, rather than attributing the technology's history to a single event.

## How Does a Digital Twin Work?

Most Digital Twin systems can be understood as a connected loop that starts in the real world and ends with information or a decision that returns to it.

![A digital twin loop diagram: the real asset, then data and sensors, then integration and connectivity, then the digital model, then analysis and simulation, then the decision that returns to the asset as a recommendation or a control command](/images/articles/body/digital-twin-3.avif "The stages of the digital twin as a loop: measurement from the asset, data synchronization with the model, then analysis and a decision that returns to reality as an operator recommendation or as controlled actuation — Illustration: Techno Enjaz")

### The Real Asset or Process

The loop begins with a thing or process to be represented digitally: a machine or piece of industrial equipment, a production line, a building or group of buildings, an HVAC system, a vehicle, an energy grid, infrastructure, or an operational or logistics process. Modern definitions are not necessarily limited to a single physical object; a twin may represent a process, a composite system, or a set of interconnected entities.

### Data and Sensors

The twin needs data describing the state of what it represents, such as temperature, pressure, vibration, speed, location, energy consumption, equipment status, and space occupancy, along with operation and maintenance logs and information from enterprise systems. Internet of Things (IoT) and Industrial Internet of Things (IIoT) technologies play an important role in collecting this data, but they are not its only source; it may also come from SCADA, ERP, or EAM systems, or from databases, design files, and business systems.

### The Digital Model

At this stage, data is turned into a representation that helps in understanding the real asset and its behavior. This representation may be a physical, mathematical, or 3D model, a simulation engine, a statistical model, a machine-learning model, or a mix of all these. What matters is not building the most complex model, but building one whose **fidelity is sufficient for the intended purpose**.

### Integration and Connectivity

Data must move between real and digital systems reliably, and this is where APIs, IoT gateways, message brokers, the OPC UA protocol, databases, cloud systems, and SCADA, ERP, and EAM systems come in. Integration between systems from different vendors and generations is often the hardest part of the entire project.

### Analysis and Simulation

Once data reaches the model, practical value begins to emerge. The twin is used to monitor performance, detect abnormal conditions, analyze the causes of failures, run What-if scenarios, predict future states, optimize energy consumption, support maintenance, and compare different operating strategies.

### Decision and Feedback

The twin's role may be limited to providing information to the user, or it may send recommendations to operating systems. In some advanced applications it is connected to control systems that allow changes to be made to the real asset, which requires appropriate security and operational safeguards. The degree to which this two-way flow is automated is what distinguishes a twin from simpler forms of digital representation.

![A diagram comparing the data flow between the physical object and the digital object in the digital model, the digital shadow, and the digital twin](/images/articles/body/digital-twin-1.avif "The difference between the digital model, the digital shadow, and the digital twin according to the degree of data flow automation in both directions between the real asset and its digital representation — Source: Martina Signorini, Wikimedia Commons, CC BY-SA 4.0")

## What Makes a Digital Representation a Twin?

Once the loop is understood, three recurring questions emerge that draw the concept's boundaries precisely.

### Must a Digital Twin Operate in Real Time?

**No, not necessarily.** The required synchronization speed is determined by the nature of the asset and the decision the twin will support. A fast system in a factory may need very frequent updates, whereas synchronizing a building's data every 15 minutes is enough to analyze its thermal environment. The Digital Twin Consortium's definition explicitly states that synchronization frequency may be real-time, daily, or tied to a particular phase or event. So the right question is not "Is the system real-time?" but:

> Are the data update speed and model fidelity sufficient for the purpose the twin was designed for?

### What Is the Difference Between a Digital Twin and Simulation?

Simulation and the digital twin are closely related, but they are not the same thing:

| Aspect | Digital Twin | Traditional Simulation |
|---|---|---|
| Link to reality | Tied to a specific real entity or process | May run without a specific real-world counterpart |
| Data | Uses the asset's actual and historical data | May rely on assumptions and defined inputs |
| Synchronization | An essential element depending on the use case | Not a requirement |
| Purpose | Monitoring, analysis, prediction, optimization, and simulation | Testing a scenario or analyzing behavior |
| Lifecycle | Can continue alongside the asset | May end when the study ends |
| Feedback | Possible depending on the system | Not required |

Simplifying the difference by saying "simulation is static and the twin is live" is therefore inaccurate; the most important distinction is **the existence of a structured link and synchronization between the digital representation and the real entity or process**.

### Is a 3D Model a Digital Twin?

**Not automatically.** A CAD or BIM model may represent an asset's geometry with great precision, but it does not become a Digital Twin merely because it looks like reality.

![A BIM model of a mechanical room showing the piping system above a lidar-captured point cloud](/images/articles/body/digital-twin-2.avif "A BIM model of a mechanical room built from a lidar scan: it represents the piping geometry precisely, but it needs operational data and synchronization to become a digital twin — Source: Oregon State University, Wikimedia Commons, CC BY-SA 2.0")

A twin usually needs additional elements: operational data, a current state, relationships between components, synchronization, a behavioral model, analysis or simulation, and a clear operational goal. Hence BIM or CAD can be **part of a digital twin** without being a complete twin on its own.

## The Surrounding Technologies: IoT and Artificial Intelligence

### The Internet of Things: What Is Happening Now?

**The Internet of Things provides a means of collecting data and connecting to assets, while a Digital Twin places that data within a model that describes the entity, its relationships, and its behavior.** Put briefly, IoT answers the question "What is happening now?", while the digital twin answers further questions: What does what is happening mean? What might happen next? And what is the right decision? Still, not all of a twin's data has to come from IoT; it may come from business systems, databases, engineering files, or other sources.

### Artificial Intelligence: An Added Capability, Not a Prerequisite

AI is not a prerequisite for a Digital Twin, but it greatly expands its capabilities. AI and Machine Learning can be applied to detecting abnormal patterns, predictive maintenance, failure prediction, forecasting consumption or performance, discovering relationships within large volumes of data, and providing recommendations. It can also be used for improving operating settings, and adding interactive query interfaces through [modern language models](#article/next-token-prediction) or monitoring operator interaction through [Affective Computing](#article/affective-computing) applications.

But adding AI does not automatically make the model reliable; the more important the decision, the greater the need to validate the model and quantify the uncertainty in its outputs.

## Five Functions That Create a Digital Twin's Value

The value a Digital Twin provides can be organized into five core functions, progressing from understanding to action:

| Function | What It Provides |
|---|---|
| Monitoring | An up-to-date picture of the asset's or process's state instead of separate, disconnected readings |
| Diagnosis | Studying the causes of degraded performance or a fault, and linking current events to the system's historical context |
| Prediction | Estimating the future state, such as the likelihood of equipment failure or rising energy consumption |
| Simulation | Testing changes and scenarios before implementing them in the real world |
| Optimization | Comparing alternatives and choosing more suitable operating settings or plans |

NIST uses similar classifications when discussing system monitoring, diagnosis, behavior prediction, process optimization, and decision support.

## Where Is the Digital Twin Used?

### Manufacturing

Manufacturing is one of the most mature fields for Digital Twins, where twins are used to monitor production lines, detect bottlenecks, perform predictive maintenance, carry out Virtual Commissioning, test modifications before implementing them, optimize material flow, analyze equipment health, and improve schedules and operating plans.

The **ISO 23247** series provides a standard framework for the digital twin in manufacturing. In July 2026, **ISO 23247-6:2026** was published, addressing the composition and linking of multiple digital twins and defining integrated, unified, and federated models to improve interoperability between twins developed by different parties.

![Orange industrial robots welding car frames on a production line at the BMW plant in Leipzig](/images/articles/body/digital-twin-4.avif "A car body welding line with industrial robots at the BMW plant in Leipzig: a typical environment for digital twins that monitor the line and test modifications before implementing them — Source: BMW Werk Leipzig, Wikimedia Commons, CC BY-SA 2.0 de")

### Buildings and Energy

BIM data, sensors, HVAC systems, weather, occupancy, and energy simulation can be combined into a single digital twin of a building, helping to analyze thermal performance, monitor energy consumption, test control strategies, detect inefficient operation, and assess the impact of operational changes before applying them.

### Healthcare

Digital Twins are used to model care facilities, their resources, and their processes, and there is also research on patient models and medical systems. But this field demands a high level of data protection, privacy, clinical validation, model interpretability, security, and risk management, and a successful research model does not automatically mean it is proven for clinical use.

### Cities and Infrastructure

A digital twin can integrate information on traffic, buildings, energy, water, utilities, the environment, and public assets. But building a twin at the scale of an entire city multiplies the challenges of integration, standards, governance, and data quality.

### Aviation and Space

This field remains the one most closely tied to the history of the Digital Twin, as NASA uses modeling and digital twins to support testing, monitoring, and behavior prediction for complex systems, including applications related to modern space missions.

## Lessons from Real-World Cases

Real cases reveal what definitions cannot, and the three cases below differ in domain but converge in their lessons.

### An Indoor Environment Using EnergyPlus

A study at the University of California, Berkeley developed a framework for a digital twin of an indoor environment based on EnergyPlus. The lab had **more than 300 sensors** measuring variables such as temperature, humidity, airflow, and pressure, and data was collected at **15-minute** intervals to match the time step used inside EnergyPlus.

The study ran 24 experiments, but a large number of them did not reach the required steady state within the experiment time, so the final analysis was limited to **13 experiments**. The lesson is clear: building a Digital Twin is not just connecting a sensor to a simulation; **calibrating and validating the model's match with reality is an essential part of the project**.

### A Flexible Manufacturing System Using Process Simulate

A study published in 2024 used Siemens Process Simulate to build a digital twin of a flexible manufacturing system. The simulation analysis revealed a bottleneck at the unloading station with a downtime of **81.53%**. After modifying the process design, including creating a parallel station and integrating a robot in the exit area, working times improved to **95.03%** according to the study's results. The value here lies not in the numbers alone, but in the ability to uncover the bottleneck and test the solution digitally before risking a change to the actual system.

### A Cloud Framework for Emergency Departments

A study published in 2025 proposed a framework using Azure Digital Twins, Azure IoT Hub, Azure Functions, and a Flutter app with location data to recommend the most suitable hospital based on bed availability and arrival time. But reading the study carefully is essential: **bed occupancy status in the model was generated by a software simulation using Python**, not by deploying a full sensor network in real hospitals. The study is a technical prototype and a promising case study, but it is not final clinical evidence of the system's effectiveness in real-world medical use.

## Tools for Building a Digital Twin

No single platform suits every project, but some tools recur across projects and research.

### Azure Digital Twins

Microsoft Azure Digital Twins makes it possible to create models of assets and environments and link twins within a Twin Graph. Models rely on the **Digital Twins Definition Language (DTDL)**, built on JSON-LD, and the platform currently supports DTDL v2 and v3, with Microsoft recommending v3 for new models when its features fit.

### ThingWorx

PTC offers ThingWorx as an Industrial IoT and AI platform, including a Thing Model that represents assets and processes and links their operational data.

### Siemens Insights Hub

Older research may mention the name **MindSphere**, but the current name Siemens uses is **Insights Hub (formerly MindSphere)**, an Industrial IoT solution that helps connect and analyze asset data and link it to digital twin applications.

### Simulation and Modeling Tools

Depending on the domain, tools such as EnergyPlus, Process Simulate, Simcenter, MATLAB/Simulink, ANSYS, Revit, and CAD and CAE platforms may be used. But having a model inside any of these tools does not automatically mean having a Digital Twin.

## How Do You Start a Digital Twin Project?

### Start with the Decision, Not the Platform

Do not start with the question "Which Digital Twin platform should we buy?" but with "What problem or decision should the twin help us solve?" The goal might be reducing failures, cutting energy consumption, detecting a bottleneck, improving production, testing operating settings, or monitoring a remote asset.

### Define the System Boundaries and the Required Data

Once the goal is set, the system's boundaries follow: What is the asset or process? Where do its boundaries end? What variables matter? What decisions will the twin support? What level of fidelity is required?

Then comes the data, bearing in mind that a twin's success does not mean collecting as much of it as possible, but specifying each item's source, quality, frequency, units, precision, timing, ownership, and access permissions.

### Choose the Model and Build the Integration Layer

The model may be physics-based, statistical, machine-learning, or a hybrid combining more than one type. The choice of model must follow the use case, not the other way around. Then the integration layer is built to tie the whole loop together: from the asset to the data, through integration to the model, then to analysis, and finally to the decision.

### Validate the Model

This is one of the most important stages, and much general content about Digital Twins overlooks it. This is where the concept of **Verification, Validation and Uncertainty Quantification (VVUQ)** comes in. If the model does not reflect reality with the required fidelity, it may give wrong recommendations even if its technical interface is excellent.

![A graph comparing a digital twin model's prediction and its uncertainty band against actual measurements that match it within the calibration range and then deviate from it outside that range](/images/articles/body/digital-twin-5.avif "The VVUQ idea: within the calibration range the measurements fall within the uncertainty band; outside it the uncertainty widens and the deviating measurements reveal that the model needs recalibration — Illustration: Techno Enjaz")

### Secure the System

A Digital Twin may link digital data to real operational assets, so a cybersecurity problem can turn into an operational and safety problem. That is why you must plan for Identity and Access Management, encryption, API protection, Network Segmentation, data integrity, logging, key and secret management, protecting the IT–OT link, and updating systems and components.

### Monitor the Twin Itself

A twin is not a project built once that stays correct forever. Its fidelity may decline because of changes in equipment, sensor drift, process changes, software updates, shifting environmental conditions, or changes in the relationships between variables. That is why the model itself needs monitoring and periodic validation.

## The Main Digital Twin Challenges in 2026

### Interoperability

Connecting models, assets, and systems from different vendors remains a fundamental challenge, and NIST stresses that standards are essential for moving from custom, isolated solutions to scalable, integrable systems.

### Data Quality

If data is incomplete, delayed, or inaccurate, the model will not fix the problem automatically. Common problems include missing data, sensor drift, unit mismatches, timing errors, outliers, and poor-quality historical data.

### Validation and Uncertainty Quantification

The more important the decision a twin is responsible for, the greater the need to know whether the model is correct, where the limits of its validity lie, how much uncertainty its outputs carry, and when its prediction should not be trusted.

### Cybersecurity

NIST issued report IR 8356 on security and trust considerations for Digital Twin Technology, reflecting the importance of protecting data, connectivity, component identity, and the credibility of the twin itself.

### Cost and the Skills Gap

A project may need sensors, networks, cloud or edge computing, integration, data engineering, modeling and simulation, cybersecurity, and specialists from several fields. So the expected return of each use case must be assessed rather than applying a digital twin just because it is a modern technology. These projects also usually require collaboration among experts in engineering, software, data, simulation, IoT, OT, and cybersecurity.

The NIST report published on **July 21, 2026** brought these threads together, with interoperability, VVUQ, cybersecurity, and workforce readiness standing out among the core challenges still facing the expansion of Digital Twins in manufacturing.

## When Don't You Need a Digital Twin?

Not every project needs a digital twin. A simulation, a dashboard, or data analytics may suffice when there is no need to synchronize the model with a real asset, when the study is a one-off, when data is insufficient or unreliable, when there are no ongoing operational decisions that benefit from the model, when integration and maintenance costs exceed the expected return, or when the problem can be solved with a simpler tool.

So the most important question is not "Can we build a Digital Twin?" but:

> Will a Digital Twin deliver operational or economic value that justifies the cost of building, validating, and maintaining it?

## Where Is the Future of the Digital Twin Heading?

The field is moving toward interconnected systems rather than standalone twins. Its most prominent trends include integrating AI with digital twins, Federated Digital Twins, the Digital Thread, edge computing, keeping a Human-in-the-loop, advancing VVUQ methods, expanding standards and interoperability, and composing systems made up of several interconnected twins. This trend is clearly reflected in **ISO 23247-6:2026**, which addresses the composition of multiple digital twins and the communication, aggregation, and interoperability among them.

## Conclusion

A digital twin is not just a 3D model, nor a new name for simulation, nor does it need real-time updates in every case. It is **a data-based digital representation of a real entity or process, synchronized with reality at the level appropriate to the use case, for the purpose of understanding, monitoring, simulation, prediction, or better decision-making**.

Its value appears when the system is complex enough to justify this integration, and when data, model, and decision are clearly connected. A project's success depends less on choosing a famous platform than on a clear use case, data quality, model validity, integration, security, interoperability, and the ability to quantify confidence and uncertainty in the results.

## Sources and References

1. Digital Twin Consortium — Definition of a Digital Twin  
   https://www.digitaltwinconsortium.org/initiatives/the-definition-of-a-digital-twin/

2. NIST — Definitions and State of the Art  
   https://www.nist.gov/digital-twins/definitions-and-state-art

3. NASA — Why does the world (and NASA) need digital twins?  
   https://science.nasa.gov/biological-physical/why-does-the-world-and-nasa-need-digital-twins/

4. NASA Technical Reports Server — Digital Twin chronology and origins  
   https://ntrs.nasa.gov/api/citations/20220015961/downloads/2022-10-26_ESDT-Workshop_JLM-Intro.pdf

5. NIST — Validating and Advancement  
   https://www.nist.gov/digital-twins/validating-and-advancement

6. NIST — Digital Twin Standardization  
   https://www.nist.gov/digital-twins/digital-twin-standardization

7. NIST — Digital Twins Workshops Summary Report, July 21, 2026  
   https://www.nist.gov/publications/digital-twins-workshops-summary-report

8. NIST IR 8356 — Security and Trust Considerations for Digital Twin Technology  
   https://csrc.nist.gov/pubs/ir/8356/final

9. ISO 23247-6:2026 — Digital twin composition  
   https://www.iso.org/standard/87426.html

10. Microsoft Learn — Azure Digital Twins  
    https://learn.microsoft.com/en-us/azure/digital-twins/

11. Microsoft Learn — DTDL models  
    https://learn.microsoft.com/en-us/azure/digital-twins/concepts-models

12. Siemens — The Digital Twin / Insights Hub  
    https://www.siemens.com/en-gb/company/insights/digital-twin/

13. PTC — ThingWorx  
    https://www.ptc.com/en/products/thingworx

14. UC Berkeley — Developing a Digital Twin for Indoor Environments: A Case Study  
    https://www2.eecs.berkeley.edu/Pubs/TechRpts/2021/Archive/EECS-2021-232.pdf

15. Machines (2024) — Digital Twin for Flexible Manufacturing Systems and Optimization Through Simulation: A Case Study  
    https://www.mdpi.com/2075-1702/12/11/785

16. Engineering, Technology & Applied Science Research (2025) — Cloud-based Digital Twin Framework and IoT for Smart Emergency Departments in Hospitals  
    https://etasr.com/index.php/ETASR/article/view/10290
