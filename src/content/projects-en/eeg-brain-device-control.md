# EEG-Based Brain Signal Device Control

A project building a **non-invasive Brain-Computer Interface (BCI)** that receives EEG signals from an 8-channel OpenBCI Cyton board, cleans and time-segments the signal, classifies it into five motor states (rest, right/left hand movement, right/left foot movement), then translates the classifications into control commands sent over serial to an Arduino Uno driving relays that control the motors of a model car — a closed loop from thought to motion.

A unified software architecture supports three operating tracks: offline training on the public PhysioNet dataset, personal calibration via live recording, and real-time inference with immediate command transmission.

## Technical Environment

- OpenBCI Cyton (8 channels)
- Python
- EEGNet
- ShallowConvNet
- Shrinkage LDA
- PhysioNet
- Arduino Uno
- HC-05 Bluetooth
- DSP Filters

## Processing pipeline

- **Digital filtering:** a 50 Hz notch filter and an 8–30 Hz band-pass filter.
- **Common average reference and resampling:** with z-score normalization.
- **Classification:** deep networks (EEGNet, ShallowConvNet) or classical classifiers (Shrinkage LDA).
- **Command mapper:** translating classes into S/F/B/R/L driving commands for the motors.

## Results

The eyes open/closed model achieved the highest recorded accuracy at 86.22%; the best binary motor-task accuracy on PhysioNet reached about 69.42%. The vehicle-control system was successfully tested on a prototype with a response latency under 500 ms from signal acquisition to command issuance.

## Boundaries and safety

Main challenges are the scarcity of clean personal calibration data, poor channel quality, and the domain shift between recording devices. The system is an **educational research tool, not a medical device**; any expanded use requires safety layers such as an emergency stop, speed limits, and low-confidence command rejection.

## Planning a Similar System?

If you are working on a brain-computer interface or bio-signal control system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
