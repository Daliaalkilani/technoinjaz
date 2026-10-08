# EEG-Based Brain Signal Device Control

A project building a **non-invasive brain-computer interface (BCI)** that captures electroencephalography (EEG) signals from an 8-channel **OpenBCI Cyton** board, cleans them, segments them into time windows, and classifies them into five motor states (rest, right hand, left hand, right foot, left foot movement), then translates the classification into driving commands sent over a serial link (USB or HC-05 Bluetooth) to an **Arduino Uno** that switches four relays controlling the motors of a model car. The project was carried out by a team of students with technical assistance from **Techno Enjaz**.

The system is written in Python around a unified processing core that serves three tracks: offline training on the public **PhysioNet** dataset, personal calibration through live recording, and real-time inference with immediate command transmission. The best documented results are **86.22%** accuracy for distinguishing eyes open from eyes closed, about **69.42%** for binary motor tasks on PhysioNet, and a preliminary end-to-end latency under **500 ms** from signal acquisition to command; personal motor-imagery models, however, stayed close to chance level, which the book states openly.

## Project Facts

| Item | Details |
|---|---|
| Project type | Software and hardware BCI system controlling a model car |
| Field | Brain-computer interfaces, biosignal processing, machine learning, embedded systems |
| Year | 2025–2026 |
| Project status | Working educational research prototype; not a medical device |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | OpenBCI Cyton, BrainFlow, Python 3.11, SciPy, MNE, scikit-learn, PyTorch (EEGNet, ShallowConvNet), Shrinkage LDA, FastAPI, Tkinter, Arduino Uno, HC-05 |
| Outputs | Predicted class with confidence, signal-quality reports, trained models and a model registry, S/F/B/R/L driving commands for the car |

## The Problem

EEG offers a non-invasive, low-cost way to capture neural activity, open-source boards such as OpenBCI make experimental systems feasible, and the PhysioNet dataset provides recordings of 109 people in more than 1,500 recordings. Moving from a model trained on public data to live control of a real device, however, runs into a gap the project describes in four dimensions:

- **Fragmented software:** scattered scripts that do not unify processing across training, live recording, and file-based inference, with no single layer for turning outputs into physical commands.
- **Statistical leakage:** random splitting at the window level puts data from the same trial in both training and test sets, inflating reported accuracy.
- **Weak personal performance:** few calibration trials, poor quality on some channels, and the **domain shift** between PhysioNet (64 channels, 160 Hz) and OpenBCI (8 channels, 250 Hz).
- **No quality gate or safety layer:** models can be trained despite bad channels, and there is no rejection of low-confidence commands or emergency stop.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that connect biosignal processing and machine learning to a microcontroller-based physical control layer.

## How the System Works: From Signal to Motion

1. **Acquisition:** the OpenBCI Cyton board receives scalp signals at 250 samples per second through the BrainFlow library, and raw data are stored in microvolts as EDF and CSV with time markers.
2. **Quality check:** each channel is assessed (flatline, saturation, noise, offset, weak activity, and more), and channels and sessions are rated GOOD, WARNING, or BAD.
3. **Unified preprocessing:** a 50 Hz IIR notch filter and an 8–30 Hz fourth-order Butterworth band-pass filter with zero-phase filtering, followed by common average reference (CAR), resampling, and z-score normalization using training-data statistics only.
4. **Classification:** a sliding time window is passed to a deep network or a classical classifier, which returns the most probable class with a confidence score and a quality report.
5. **Safety decision:** if confidence is below the threshold or quality is critical, the system can abstain and show "uncertain", depending on the configured policy.
6. **Command mapping:** the command mapper translates the class into a single character: S to stop, F forward, B backward, R turn right, L turn left.
7. **Physical execution:** the character is sent over USB or HC-05 to the Arduino Uno, which decodes it, switches the relays in the pattern for that command, and ignores unknown commands.

## Classification Models

| Model | Description in the project |
|---|---|
| EEGNet | Compact convolutional network designed for EEG, about 5.5 thousand trainable parameters in the three-class version |
| ShallowConvNet | Shallow network that learns temporal and spatial filters and then computes log-scaled power, about 14.4 thousand parameters in the binary version |
| Shrinkage LDA | Linear discriminant analysis with covariance shrinkage on band-power features from five frequency bands and log-covariance matrices; the preferred track for small personal datasets |
| One-Class SVM | Anomaly detector with an RBF kernel |
| DeepConvNet | Architecture present in the code, with no trained model as of the review date |

Deep networks were trained in PyTorch with weighted cross-entropy loss to handle class imbalance, the Adam optimizer with an initial learning rate of 0.001, and early stopping after 15 epochs without improvement. To prevent leakage, the updated pipeline splits data stratified at the **trial** level before windows are extracted.

## Hardware Components and Control Layer

| Component | Role |
|---|---|
| OpenBCI Cyton | 8-channel EEG acquisition board at 250 samples/second |
| Arduino Uno (ATmega328P, 16 MHz) | Receives serial commands, decodes them, and drives the relays |
| Relay module (4 channels used) | Isolates the controller circuit (5 V) from the motor circuit and switches the motors per command |
| HC-05 Bluetooth | Wireless serial link appearing as a virtual COM port with a range of about 10 m; USB can be used instead |
| Step-down converter | Converts the car battery voltage (7.2–12 V) to the stable voltages the controller and modules need |
| Model car | Physical test platform for the closed control loop |

## Software Architecture and Interfaces

The project uses a single repository with a shared core used by three interfaces: a web interface (FastAPI and the Uvicorn server with plain HTML, CSS, and JavaScript), a desktop interface (Tkinter), and a command-line interface (CLI). Its layers cover signal sources (the board, PhysioNet files, local files, and a Mock signal generator for testing without hardware), raw storage, shared processing, learning, services, and outputs.

A **17-table** data model was designed in four groups (data collection and sessions, signal quality, dataset building and training, models and predictions). It mirrors the current file-based storage (EDF, CSV, JSON, NPZ, PT, joblib) and uses anonymous participant IDs such as S001. The system also checks each model's metadata for compatibility (channels, sampling rate, window length, normalization), blocks loading of outdated incompatible models, and promotes a model only when it passes a performance threshold.

The interface includes screens for collecting five-movement data, viewing the live signal, configuring the session and protocol timings, checking electrode readiness, running the session stages (baseline, preparation, movement, rest), training and testing models, browsing the model registry, and starting live prediction.

## Documented Results

| Experiment | Result |
|---|---|
| Eyes open vs. eyes closed | 86.22% (highest recorded accuracy) |
| Best binary motor task on PhysioNet | About 69.42% |
| Three-class personal calibration (rest, right hand, left hand) with deep learning | Test accuracy between 0% and 21.43% |
| Personal calibration with LDA (cross-validated balanced accuracy) | 33.63%, close to chance level (33.33%) |
| End-to-end closed-loop latency (preliminary results) | Under 500 ms from signal acquisition to command |

The project concludes that the **engineering goal** was achieved: a unified architecture running across all three tracks and a closed control loop tested on a model car. The **scientific validity of personal models** was not yet achieved; a typical personal calibration session had no more than 33 trials, and validation was confined to the same session. The project also observed that a classical classifier can outperform deep networks when personal data are scarce.

## Limitations of the Current Version

- Personal motor-imagery accuracy is close to chance, so live car control cannot be considered accurate or reliable at this stage.
- The current quality gate only warns, allowing training and model promotion even with channels rated BAD.
- The domain shift between PhysioNet and OpenBCI limits the transfer of models trained on public data to a user.
- The control safety layer (emergency stop, speed limits, systematic rejection of low-confidence commands) is incomplete.
- There is no full test suite yet, and the project targets Windows as its platform.

## Possible Future Development

- Enforcing a strict quality gate that blocks training on bad channels, and recording multiple sessions on different days per person with at least 20 valid trials per class per session.
- Strict splitting at the session or subject level, with nested cross-validation for hyperparameter selection.
- Extending the comparison to CSP and Riemannian approaches, domain adaptation, fine-tuning, and self-supervised learning.
- Decision algorithms that consider command history to avoid rapid switching, abstention when confidence is low, and per-session measurement of wrong-command rate and latency.
- Expanding to control of a multi-axis robotic arm, and an interface that lets users customize commands and classification sensitivity.

## A Note on Safety and Privacy

The system is **an educational research tool, not a medical device**. Any use with people or in open environments requires physical and software safety layers and a thorough risk assessment, and controlling a real vehicle or hazardous machinery would require standards and certification beyond the scope of this project. Brain signals are also sensitive biological data, and the data model was designed to use anonymous participant IDs.

## Planning a Similar System?

If you are working on a brain-computer interface or bio-signal control system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
