# Sports Injury Detection via Image & Video Analysis

An academic project to develop **a smart system that analyzes resistance exercises from video and detects movement errors** that may lead to musculoskeletal injuries, carried out by a team of students with technical assistance from **Techno Enjaz**. The application, called **Gym AI**, extracts a digital skeleton of the body with **MediaPipe Pose** (the BlazePose model, 33 joint landmarks), then analyzes the movement sequence over time with an **LSTM** network to judge whether the form is correct or incorrect.

The system covers three common exercises: **the squat**, **the bicep curl**, and **lateral raises**, and works on a live camera feed or a saved video file. Tests showed it can distinguish correct from incorrect form in these exercises under suitable recording conditions with near-real-time response. Its aim is an objective, low-cost tool that helps athletes when no qualified coach is present.

## Project Facts

| Item | Details |
|---|---|
| Project type | Desktop application for movement-quality analysis using computer vision and deep learning |
| Field | Computer vision, human pose estimation, temporal modeling, sports safety |
| Project status | Working prototype named Gym AI, tested on examples from the camera and video files |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, MediaPipe Pose (BlazePose), LSTM / LSTM Autoencoder, TensorFlow/Keras, OpenCV, NumPy, Tkinter |
| Outputs | Form classification (correct/incorrect) with a confidence value, skeleton overlay on the image, camera and video-file support |

## The Problem

Many athletes train with resistance exercises without direct supervision from a coach, so they miss errors such as excessive forward knee travel in the squat or loss of balance during a lift. These deviations can accumulate and cause chronic injuries.

The technical difficulty is that an exercise cannot be judged from a single frame: the knee angle may look correct at one moment, while its evolution across the full movement, from the descent to the lowest point and back up, reveals a balance or stability problem. The project therefore built its approach on **analyzing the temporal sequence of movement** rather than isolated frames, with a focus on prevention before injury occurs.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that combine human pose estimation with temporal neural networks in sports and health applications.

## How the System Works

Gym AI follows the sequence documented in the project:

1. Receive a frame from the live camera or from a video file.
2. Extract **33 body landmarks** with MediaPipe Pose, each with (x, y, z) coordinates and a visibility value.
3. Convert each frame's landmarks into a numerical vector of **99 values** (33 points × 3 coordinates), turning the video into a multivariate time series.
4. Pass the sequence to the trained temporal model built on LSTM layers.
5. Compute the result, either as a direct classification or through the **reconstruction error**.
6. Display the final assessment to the user over the image with the digital skeleton.

## LSTM and Movement Anomaly Detection

The project presents two temporal approaches:

| Aspect | Standard LSTM | LSTM Autoencoder |
|---|---|---|
| Learning type | Usually supervised | Unsupervised |
| Main goal | Classify or predict the movement | Reconstruct the time sequence |
| Need for incorrect examples | Yes | No; training on correct movements is enough |
| Error detection mechanism | Direct classification decision | Reconstruction error rising above a set threshold |

The idea behind the LSTM Autoencoder is that correct movement has a regular temporal pattern the model can compress and reconstruct accurately, while incorrect movement disrupts this pattern and raises the reconstruction error, so it is flagged as an anomaly. This approach helps because collecting enough examples of every kind of error is hard: movement errors are many and varied.

## Training Data

Training data was gathered from three sources:

| Source | Content |
|---|---|
| Videos recorded specifically for the project | People performing the exercises correctly and incorrectly |
| AI-generated videos from PixVerse AI | Specific movement patterns and form errors with controllable type and severity |
| Open datasets from Kaggle | Variety in camera angles, lighting, backgrounds, and body types |

The videos were processed automatically: each video is read frame by frame, landmarks are extracted with MediaPipe, and the time series are saved to a CSV file used to train the model. The project does not state the number of videos or how they were split between training and testing.

## Software Tools

| Tool | Role |
|---|---|
| Tkinter and filedialog | GUI and video-file selection |
| OpenCV | Frame reading, color conversion, and pre-processing |
| Pillow | Displaying images in the interface |
| MediaPipe | Extracting body landmarks |
| NumPy | Converting landmarks into numerical arrays |
| TensorFlow and Keras | Building, loading, and running the model |
| Joblib | Saving and loading models |
| threading | Keeping the interface from freezing during processing |

The Gym AI interface consists of a welcome screen with a "Start" button that loads the model and initializes MediaPipe, a screen for choosing the input source (Camera or Video File), and a window that shows the frames and the analysis result, with the option to go back and choose again.

## What the Tests Showed

The project presented practical examples from the application:

- **Bicep curl via camera:** the system returned "Bicep Correct" with a confidence value of 1.00.
- **Incorrect squat:** a large reconstruction difference appeared, and the movement was classified "Squat Wrong" with a value of 1.00.
- **A home setting different from the training environment:** despite different background, lighting, and camera angle, the joints were extracted and the movement error was detected.
- **Frontal camera angle:** allowed analysis of knee alignment over the feet, and the incorrect squat was classified correctly.

These are illustrative examples: **the project provides no overall numerical metrics** such as accuracy on a test set, a confusion matrix, or per-frame processing time. It describes the response as near real time, while noting that it depends on the processing power of the device used.

## Limitations of the Current Version

- The system is limited to 2D kinematic analysis and does not provide clinical medical diagnosis.
- Joint tracking accuracy drops in poor lighting or when a limb is partially occluded.
- Depth estimation is limited and affected by camera angle.
- Relative slowdowns can occur on low-resource devices.
- Assessment is limited to a binary judgment (correct/incorrect) for three exercises, within the scope of the data the model was trained on.

## Possible Future Development

According to the project's proposals:

- Expanding the dataset to cover more exercises and error patterns.
- Moving to 3D pose estimation to reduce the effect of camera angle.
- Trying Transformer models once larger datasets are available.
- Detailed feedback that explains the type and location of the error and how to correct it, instead of a binary label.
- Connecting the system to mobile apps or online training platforms for athletes and coaches at home and in training centers.

## A Note on Use

The system analyzes video of a person exercising and provides only an assistive assessment of movement quality; it does not replace a qualified coach or medical advice when there is pain or injury.

## Planning a Similar System?

If you are working on an AI-based sports image and video analysis system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
