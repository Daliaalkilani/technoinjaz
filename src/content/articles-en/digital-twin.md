<!--
FILE: 02-article.md
PURPOSE: Published article content
-->

SEO Title: What Is a Digital Twin? How It Works, Its Applications, and Its Main Challenges

Meta Description: A comprehensive guide to understanding the Digital Twin: how it works, its components, the difference between it and simulation, and its key applications in industry, buildings, and healthcare, along with the challenges it faces.

Suggested Slug: digital-twin

# Digital Twin: What Is It, How Does It Work, and What Are Its Key Applications?

**A Digital Twin is a data-based digital representation of a real-world entity or process, synchronized with reality to a degree and at a frequency suited to the purpose of its use.** Its role goes beyond displaying the shape of an asset: it can be used to monitor its state, analyze its behavior, test scenarios, predict problems, and support decision-making.

The Digital Twin Consortium defines the digital twin as a virtual representation of real-world entities and processes, synchronized at a specified frequency and fidelity. This formulation matters because it corrects a common misconception: **a digital twin is not required to update in real time in the literal sense**. Synchronization may happen in seconds, minutes, or hours, or upon a specific event, depending on the use case.

NIST also notes that the field still uses relatively multiple definitions across sectors, so the best starting point for any project is not choosing a technology platform, but defining the thing the twin will represent, the decision it must support, and the level of fidelity required to achieve that.

## How Did the Idea of the Digital Twin Begin?

The practical roots of the idea are tied to a long history of modeling and simulation in aerospace programs. NASA explains that the Apollo program used vehicles, simulators, and ground models to study the situations spacecraft could face in space, and the Apollo 13 experience is frequently cited as an early example of the idea that later evolved into the concept of the digital twin.

The modern conceptual model, however, goes back to the work of **Michael Grieves** in Product Lifecycle Management (PLM). NASA's historical materials explain that Grieves presented a conceptual model in 2002 linking the physical world and the virtual world and the data flows between them, before the name Digital Twin later settled into use. In 2010, the introduction of the term into NASA's roadmap was associated with the name John Vickers.

It is therefore more accurate to distinguish between **the practical roots of the concept**, **its formulation as a modern model**, and **the spread of the term itself**, rather than attributing the history of the technology to a single event.

## How Does a Digital Twin Work?

Most Digital Twin systems can be understood as an interconnected chain that starts in the real world and ends with information or a decision.

![A digital twin loop diagram: the real asset, then data and sensors, then integration and connectivity, then the digital model, then analysis and simulation, then the decision that returns to the asset as a recommendation or a control command](/images/articles/body/digital-twin-3.avif "The stages of the digital twin as a loop: measurement from the asset, data synchronization with the model, then analysis and a decision that returns to reality as an operator recommendation or as controlled actuation — Illustration: Techno Enjaz")

### 1. The Real Asset or Process

The system starts with something or a process to be represented digitally, such as:

- A machine or industrial equipment.
- A production line.
- A building or group of buildings.
- An HVAC system.
- A vehicle.
- A power grid.
- Infrastructure.
- An operational or logistics process.

Modern definitions are not necessarily limited to a single physical object; a Digital Twin may represent a process, a complex system, or a set of interconnected entities.

### 2. Data and Sensors

The twin needs data describing the state of the thing it represents. This may include:

- Temperature.
- Pressure.
- Vibration.
- Speed.
- Location.
- Energy consumption.
- Equipment status.
- Space occupancy.
- Operations and maintenance records.
- Information from enterprise systems.

Internet of Things (IoT) and Industrial Internet of Things (IIoT) technologies play an important role in collecting this data, but they are not the only source; data may also come from SCADA, ERP, EAM, databases, design files, or business systems.

### 3. The Digital Model

The system turns the data into a representation that helps in understanding the real asset and its behavior.

The model may rely on:

- A physical model.
- A mathematical model.
- A 3D model.
- A simulation engine.
- A statistical model.
- Machine Learning.
- Or a combination of several types.

What matters is not building the most complex model, but building a model whose **accuracy is sufficient for the required purpose**.

### 4. Integration and Connectivity

Data must move between the real and digital systems in a reliable way.

Technologies that may come into play here include:

- APIs.
- IoT Gateways.
- Message Brokers.
- OPC UA.
- Databases.
- Cloud systems.
- SCADA.
- ERP.
- EAM.

Integration between systems from different vendors and generations is often one of the hardest parts of the project.

### 5. Analysis and Simulation

Once the data reaches the model, the practical value begins to appear. A Digital Twin can be used for:

- Performance monitoring.
- Detecting abnormal conditions.
- Analyzing failure causes.
- Testing What-if scenarios.
- Predicting future state.
- Optimizing energy consumption.
- Supporting maintenance.
- Comparing different operating strategies.

### 6. Decision and Feedback

The twin's role may be limited to providing information to the user, or it may send recommendations to operational systems. In some advanced applications it can be linked to control systems that allow changes to be made to the real asset, provided appropriate security and operational safeguards are in place.

![A diagram comparing the data flow between the physical object and the digital object in the digital model, the digital shadow, and the digital twin](/images/articles/body/digital-twin-1.avif "The difference between the digital model, the digital shadow, and the digital twin according to the degree of data flow automation in both directions between the real asset and its digital representation — Source: Martina Signorini, Wikimedia Commons, CC BY-SA 4.0")

## Does a Digital Twin Have to Run in Real Time?

**No, not necessarily.**

The required synchronization speed depends on the nature of the asset and the decision the twin will support.

A fast-moving system in a factory may need very frequent updates, while syncing a building's data every 15 minutes may be enough for analyzing its thermal environment. The Digital Twin Consortium's definition explicitly notes that synchronization frequency may be instantaneous or daily, or tied to a particular phase or event.

The right question is therefore not "Is the system Real-Time?", but:

> Are the data update speed and the model's fidelity sufficient for the purpose the twin was designed for?

## What Is the Difference Between a Digital Twin and Simulation?

Simulation and the digital twin are related, but they are not the same thing.

| Aspect | Digital Twin | Traditional Simulation |
|---|---|---|
| Link to reality | Tied to a specific real entity or process | May run without a specific real-world counterpart |
| Data | Uses the asset's actual and historical data | May rely on assumptions and defined inputs |
| Synchronization | An essential element depending on the use case | Not a requirement |
| Purpose | Monitoring, analysis, prediction, optimization, and simulation | Testing a scenario or analyzing behavior |
| Lifecycle | Can continue alongside the asset | May end when the study ends |
| Feedback | Possible depending on the system | Not required |

So simplifying the difference by saying "simulation is static and the twin is real-time" is inaccurate. The most important distinction is **the existence of an organized link and synchronization between the digital representation and the real entity or process**.

## Is a 3D Model a Digital Twin?

**Not automatically.**

A CAD or BIM model can represent the asset's geometry with high precision, but it does not become a Digital Twin merely because it visually resembles reality.

![A BIM model of a mechanical room showing the piping system above a lidar-captured point cloud](/images/articles/body/digital-twin-2.avif "A BIM model of a mechanical room built from a lidar scan: it represents the piping geometry precisely, but it needs operational data and synchronization to become a digital twin — Source: Oregon State University, Wikimedia Commons, CC BY-SA 2.0")

A twin typically needs additional elements such as:

- Operational data.
- Current state.
- Relationships between components.
- Synchronization.
- A behavior model.
- Analysis or simulation.
- A clear operational objective.

BIM or CAD can therefore be **part of the digital twin** without being a complete twin on their own.

## What Does the Internet of Things Have to Do with the Digital Twin?

**The Internet of Things provides a means of collecting data and connecting to assets, while the Digital Twin places that data within a model that describes the entity, its relationships, and its behavior.**

The relationship can be simplified like this:

**IoT: What is happening now?**

**Digital Twin: What does what is happening mean? What might happen next? And what is the right decision?**

Even so, not all of a twin's data has to come from IoT; it may come from business systems, databases, engineering files, or other sources.

## What Does Artificial Intelligence Have to Do with the Digital Twin?

AI is not a requirement for a Digital Twin to exist, but it can substantially increase its capabilities.

AI and Machine Learning can be used for:

- Detecting abnormal patterns.
- Predictive maintenance.
- Predicting failures.
- Anticipating consumption or performance.
- Discovering relationships within large volumes of data.
- Improving operating settings, and adding interactive query interfaces through [modern language models](#article/next-token-prediction) or monitoring operator interaction through [Affective Computing](#article/affective-computing) applications.
- Providing recommendations.

But adding artificial intelligence does not automatically make the model trustworthy; the more important the decision, the greater the need to validate the model and quantify the uncertainty in its outputs.

## What Are the Main Benefits of a Digital Twin?

The value a Digital Twin delivers can be organized into five core functions:

### Monitoring

Building an up-to-date picture of the state of an asset or process instead of relying on separate, disconnected readings.

### Diagnosis

Investigating the causes of performance degradation or the emergence of a fault, and linking current events to the system's historical context.

### Prediction

Estimating the future state, such as the likelihood of equipment failure or a rise in energy consumption.

### Simulation

Testing changes and scenarios before implementing them in the real world.

### Optimization

Comparing alternatives and choosing more suitable settings or operating plans.

NIST uses similar categories when discussing monitoring systems, diagnosing them, predicting their behavior, optimizing their processes, and supporting decisions.

## Where Is the Digital Twin Used?

### Manufacturing

Manufacturing is one of the most mature fields for Digital Twins. Uses include:

- Monitoring production lines.
- Detecting bottlenecks.
- Predictive maintenance.
- Virtual Commissioning.
- Testing modifications before implementing them.
- Improving material flow.
- Analyzing equipment health.
- Optimizing schedules and operational plans.

The **ISO 23247** series covers a standardized framework for the digital twin in manufacturing. And in July 2026, **ISO 23247-6:2026** was published, addressing the composition of multiple digital twins and their interconnection, defining integrated, unified, and federated models to improve interoperability between twins developed by different parties.

![Orange industrial robots welding car frames on a production line at the BMW plant in Leipzig](/images/articles/body/digital-twin-4.avif "A car body welding line with industrial robots at the BMW plant in Leipzig: a typical environment for digital twins that monitor the line and test modifications before implementing them — Source: BMW Werk Leipzig, Wikimedia Commons, CC BY-SA 2.0 de")

### Buildings and Energy

BIM data, sensors, HVAC systems, weather, occupancy, and energy simulation can be combined into a digital twin of a building.

This helps with:

- Analyzing thermal performance.
- Monitoring energy consumption.
- Testing control strategies.
- Detecting inefficient operation.
- Evaluating the impact of operational changes before applying them.

### Healthcare

Digital Twins can be used to model care facilities, resources, and operations, and there is research on patient models and medical systems.

But this field requires a high level of:

- Data protection.
- Privacy.
- Clinical validation.
- Model interpretability.
- Security.
- Risk management.

The existence of a successful research model does not automatically mean it is proven for clinical use.

### Cities and Infrastructure

A digital twin can integrate information about:

- Traffic.
- Buildings.
- Energy.
- Water.
- Utilities.
- The environment.
- Public assets.

But building a Digital Twin at the scale of an entire city raises integration, standards, governance, and data quality challenges significantly.

### Aerospace and Aviation

This field remains the one most closely tied to the history of the Digital Twin. NASA uses modeling and digital twins to support testing, monitoring, and prediction for complex systems, including applications related to recent space missions.

## What Do We Learn from Real-World Case Studies?

### Case 1: An Indoor Environment Using EnergyPlus

A study at the University of California, Berkeley developed a framework for an EnergyPlus-based digital twin of an indoor environment.

The lab had **more than 300 sensors** measuring variables such as temperature, humidity, airflow, and pressure, and the study collected data at **15-minute** intervals to match the time step used inside EnergyPlus.

The study ran 24 experiments, but a large number of them failed to reach the required steady state within the experiment time, so the final analysis was limited to **13 experiments**.

This result reveals an important lesson: building a Digital Twin is not just wiring a sensor to a simulation. **Calibration and validating that the model matches reality are an essential part of the project**.

### Case 2: A Flexible Manufacturing System Using Process Simulate

A study published in 2024 used Siemens Process Simulate to build a Digital Twin model of a flexible manufacturing system.

The simulation analysis showed a bottleneck at the unload station, whose downtime reached **81.53%**. After redesigning the process, including adding a parallel station and integrating a robot into the exit area, working times improved to **95.03%** according to the study's results.

The value here is not just the numbers, but the ability to detect the bottleneck and test the fix digitally before risking changes to the actual system.

### Case 3: A Cloud Framework for Emergency Departments

A study published in 2025 proposed a framework using Azure Digital Twins, Azure IoT Hub, Azure Functions, and a Flutter app with location data to recommend a hospital based on bed availability and travel time.

It is important to read the study carefully: **bed occupancy in the model was generated through software simulation using Python**, not the result of deploying a full sensor network inside real hospitals.

The study therefore represents a technical Prototype and a promising case study, but not definitive clinical evidence of the system's effectiveness in real medical use.

## What Tools Are Used to Build a Digital Twin?

No single platform suits every project.

### Azure Digital Twins

Microsoft Azure Digital Twins lets you create models of assets and environments and link twins within a Twin Graph.

The models are based on the **Digital Twins Definition Language (DTDL)**, built on JSON-LD. Azure Digital Twins currently supports DTDL v2 and v3, with Microsoft recommending v3 for new models when its features are suitable.

### ThingWorx

PTC offers ThingWorx as an Industrial IoT and AI platform, including a Thing Model that represents assets and processes and links their operational data.

### Siemens Insights Hub

Older research may show the name **MindSphere**. The current name used by Siemens is **Insights Hub (formerly MindSphere)**, an Industrial IoT solution that helps connect asset data, analyze it, and link it to digital twin applications.

### Simulation and Modeling Tools

Depending on the field, tools such as the following may be used:

- EnergyPlus.
- Process Simulate.
- Simcenter.
- MATLAB/Simulink.
- ANSYS.
- Revit.
- CAD and CAE platforms.

But owning a model in any of these tools does not automatically mean owning a Digital Twin.

## How Do You Start a Digital Twin Project?

### 1. Start with the Decision, Not the Platform

Do not start with the question:

> Which Digital Twin platform should we buy?

Start with the question:

> What problem or decision should the twin help us solve?

Such as:

- Reducing failures.
- Lowering energy consumption.
- Detecting a bottleneck.
- Improving production.
- Testing operating settings.
- Monitoring a remote asset.

### 2. Define the System Boundaries

Define:

- What is the asset or process?
- What are the boundaries?
- What are the important variables?
- What decisions will it support?
- What level of fidelity is required?

### 3. Define the Required Data

The success of a Digital Twin does not mean collecting the largest possible amount of data.

You must specify:

- The data source.
- Its quality.
- Its frequency.
- The units.
- The resolution.
- The timing.
- Ownership.
- Access permissions.

### 4. Choose the Appropriate Model

You might use:

- A physics-based model.
- A statistical model.
- A machine-learning model.
- A hybrid model.

The choice of model should follow the Use Case, not the other way around.

### 5. Build the Integration Layer

Connect the chain:

**Asset → Data → Integration → Model → Analysis → Decision**

### 6. Validate the Model

This is one of the most important stages, and much general content about Digital Twins overlooks it.

This is where the concept of:

**Verification, Validation and Uncertainty Quantification (VVUQ)**

comes in: verification, validation, and uncertainty quantification.

If the model does not reflect reality with the required accuracy, it may produce wrong recommendations even if its technical interface is excellent.

![A graph comparing a digital twin model's prediction and its uncertainty band against actual measurements that match it within the calibration range and then deviate from it outside that range](/images/articles/body/digital-twin-5.avif "The VVUQ idea: within the calibration range the measurements fall within the uncertainty band; outside it the uncertainty widens and the deviating measurements reveal that the model needs recalibration — Illustration: Techno Enjaz")

### 7. Secure the System

A Digital Twin may link digital data to real operational assets, so a cybersecurity problem can become an operations and safety problem.

Think about:

- Identity and Access Management.
- Encryption.
- API protection.
- Network Segmentation.
- Data integrity.
- Logging.
- Managing keys and secrets.
- Protecting the IT/OT link.
- Updating systems and components.

### 8. Monitor the Twin Itself

A twin is not a project you build once and that stays correct forever.

Its accuracy may degrade because of:

- Equipment changes.
- Sensor Drift.
- Process changes.
- Software updates.
- Changing environmental conditions.
- Changing relationships between variables.

The model itself therefore needs periodic Monitoring and Validation.

## What Are the Main Digital Twin Challenges in 2026?

### Interoperability

Linking models, assets, and systems from different vendors remains a fundamental challenge. NIST explains that standards are essential for moving out of bespoke, isolated solutions into scalable, integrable systems.

### Data Quality

If the data is incomplete, delayed, or inaccurate, the model will not automatically fix the problem.

Common problems include:

- Missing Data.
- Sensor Drift.
- Inconsistent units.
- Timing errors.
- Outliers.
- Poor-quality historical data.

### Validation and Uncertainty Quantification

The more consequential the decision a Digital Twin is responsible for, the greater the need to know:

- Is the model correct?
- Where are the limits of its validity?
- How much uncertainty is there?
- When should its predictions not be trusted?

### Cybersecurity

NIST issued report IR 8356 on security and trust considerations for Digital Twin technology, reflecting the importance of protecting data and connectivity, component identity, and the trustworthiness of the twin itself.

### Cost

A project may need:

- Sensors.
- Networks.
- Cloud or Edge Computing.
- Integration.
- Data Engineering.
- Modeling and simulation.
- Cybersecurity.
- Specialists from multiple fields.

The expected return of each Use Case must therefore be evaluated rather than adopting a Digital Twin simply because it is a modern technology.

### Skills Shortage

Projects typically require collaboration among experts in the engineering domain, software, data, simulation, IoT, OT, and cybersecurity.

And in NIST's report published on **July 21, 2026**, interoperability, VVUQ, cybersecurity, and workforce readiness stood out among the core challenges still facing the expansion of Digital Twins in manufacturing.

## When Do You Not Need a Digital Twin?

Not every project needs a digital twin.

A simulation, a Dashboard, or Data Analytics may be enough if:

- There is no need to synchronize the model with a real asset.
- The study will be conducted once.
- The data is insufficient or unreliable.
- There are no continuous operational decisions that benefit from the model.
- The cost of integration and maintenance is higher than the return.
- The problem can be solved with a simpler tool.

The most important question is therefore not:

> Can we build a Digital Twin?

but rather:

> Will a Digital Twin deliver operational or economic value that justifies the cost of building, validating, and maintaining it?

## Where Is the Future of the Digital Twin Heading?

The field is heading toward more interconnected systems rather than isolated twins.

Among the most notable trends:

- Combining AI with Digital Twins.
- Federated Digital Twins.
- The Digital Thread.
- Edge Computing.
- Human-in-the-loop.
- Improving VVUQ.
- Expanding standards and interoperability.
- Composing systems that include multiple interconnected digital twins.

This trend is clearly visible in **ISO 23247-6:2026**, which addresses the composition of multiple digital twins and the communication, aggregation, and interoperability between them.

## Conclusion

A digital twin is not just a 3D model, nor a new name for simulation, nor does it require real-time updating in all cases.

It is **a data-based digital representation of a real entity or process, synchronized with reality at the level appropriate to the use case, with the goal of understanding, monitoring, simulation, prediction, or improving decisions**.

Its value appears when the system is complex enough to justify this integration, and when the data, the model, and the decision are clearly interconnected.

The success of a project depends not on choosing a famous platform so much as on the clarity of the Use Case, the quality of the data, the validity of the model, integration, security, interoperability, and the ability to measure trust and uncertainty in the results.

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
