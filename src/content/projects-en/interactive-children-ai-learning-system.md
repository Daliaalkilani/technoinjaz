# Interactive AI Learning System for Children Using Artificial Intelligence and Computer Vision

An academic project carried out by a team of students **with technical assistance from Techno Enjaz** to build **an interactive learning system for children** that uses a computer camera to recognize **animals, colors, and numbers**, then shows the result on screen and plays an Arabic audio file that pronounces it. The system relies on **YOLO11** for animal detection, the **HSV** color space for color identification, and **OCR** for reading numbers, within a graphical interface built with **Tkinter** and **Python**.

The project documents detailed technical results for each function: the animal detection models recorded mAP50 values between 0.856 and 0.992 depending on the class, the system read 7 of 10 numbers correctly in a direct test, and color reading remains dependent on lighting and camera conditions. The project includes no educational study measuring its effect on children's learning.

## Project Facts

| Item | Details |
|---|---|
| Project type | Interactive learning system / prototype |
| Field | Artificial intelligence, computer vision, early-learning technology |
| Project status | Academic prototype implemented and tested on a laptop |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, OpenCV, NumPy, YOLO11, OCR (EasyOCR), HSV, Tkinter, Playsound |
| Input | The computer's built-in camera |
| Outputs | The name of the animal, color, or number on screen, with pre-recorded Arabic audio |

## System Concept and Learning Goals

The system is built on live interaction: the child shows an animal, a colored object, or a number to the camera, and the program recognizes it automatically and says its name clearly. This direct link between image and sound aims to strengthen the child's visual and language understanding in a way close to the sensory learning typical of early childhood.

The system was designed to be simple enough for a child to use without constant supervision, with Arabic audio content to develop pronunciation, and an interface suited to children in its colors, element sizes, and ease of interaction.

## Techno Enjaz's Role

The project was carried out by the students within an academic framework, with **technical assistance from Techno Enjaz** during the development of the prototype and the testing of its components. The office's contribution included supporting the technical work and guiding the development process to help turn the idea into a testable prototype, while the academic execution of the project remained the students' responsibility.

The project reflects practical experience with computer vision applications and with connecting AI models to user interfaces and testable image-processing pipelines.

## System Components

| Component | Role |
|---|---|
| Laptop | Built-in camera for live capture and internal speaker for audio output, with no extra devices |
| Python | Language used to develop the application and connect its components |
| OpenCV | Capturing and processing frames, converting them to HSV, and enhancing images before analysis |
| NumPy | Numerical operations on image arrays |
| YOLO11 | Detecting and classifying animals in the image |
| OCR (EasyOCR) | Extracting the number shown to the camera as text |
| Tkinter | The graphical interface and navigation between activities |
| Playsound | Automatically playing the pre-recorded audio file matching the result |

## How the System Works

Each activity follows a clear processing path:

1. From the main screen, the child chooses one of three buttons: animals, colors, or numbers.
2. The activity screen offers two options: "Open camera" and "Back".
3. The camera captures a frame, which is preprocessed (resized, color-converted, and denoised).
4. The frame is passed to the matching tool: YOLO11 for animals, HSV thresholds for colors, or OCR for numbers.
5. The name of the detected item is shown in the interface.
6. A pre-recorded Arabic audio file matching the result plays without user intervention.

## Animal Recognition Using YOLO11

**YOLO11** models were trained on custom animal-detection data, and each model was evaluated separately with Precision, Recall, mAP, and F1, along with the speed of each processing stage.

### Detection Model Results

| Model | mAP50 | mAP50-95 | Best F1 (at confidence threshold) | Inference time |
|---|---:|---:|---:|---:|
| Eagle | 0.956 | 0.824 | 0.92 (0.409) | 18.8 ms |
| Cats | 0.992 | 0.784 | 0.98 (0.591) | 28.4 ms |
| Fish | 0.856 | 0.551 | 0.81 (0.449) | 21.2 ms |

### What the Confusion Matrices Show

- **Eagle:** 168 correct detections versus 25 samples misclassified as background.
- **Cats:** 64 images correctly classified as "cat" with very few background errors; Precision reached 1.00 at a confidence threshold of 0.799.
- **Fish:** 948 correct detections versus 331 false positives and 165 false negatives, which explains the lower mAP50-95 of 0.551 compared with the other two classes.

These values reflect the detection models' performance within the project's tests and do not represent a single accuracy figure for the whole learning system. Inference time also depends on the hardware used in testing.

## Color Recognition Using HSV

The color function reads the color value at a point in the center of the screen, converts it to the **HSV** space, and identifies the color name by comparing it with set thresholds for each color; the name is then shown and its audio played.

The function was tested manually by showing ten colors to the camera (red, green, blue, yellow, orange, brown, white, black, purple, and pink) and comparing the output name with the actual color. The report gives no final accuracy figure for this test; it includes only an illustrative example of how accuracy is calculated. The project identified the factors that affect color reading: lighting, camera type, shadows and reflections, similarity between some colors such as orange and brown, and the distance between the object and the camera.

## Number Recognition Using OCR

The numbers function uses **OCR** (optical character recognition) to extract the number shown to the camera and convert it to text, then displays the number and plays its audio.

| Number shown | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| OCR reading | 1 | 2 | 3 | 4 | S | 6 | 7 | B | 9 | 1O |

In this direct test, **7 of 10** samples were read correctly (70%). Errors occurred on visually similar shapes: 5 was read as the letter S, 8 as B, and 10 was read with the letter O instead of zero.

The report also presents a separate evaluation of **EasyOCR** performance on number detection: Accuracy of 87.4%, Precision of 0.89, Recall of 0.83, and F1 of 0.86, with 45 false positives and 81 false negatives. Because this evaluation's context differs from the ten-digit test, the two results are presented separately and not merged into a single accuracy figure.

The project proposed ways to improve reading: even lighting without shadows, higher contrast between the number and the background, clear fonts such as Arial or OCR-B, larger numbers in the frame, a straight camera angle, and programmatic correction of common errors such as converting O to 0 and B to 8.

## Key Technical Challenges

- Changing lighting and its effect on reading colors and images.
- Similarity between some color shades when using HSV.
- Camera quality, distance, and the angle of the object.
- Confusion between some numbers and letters with OCR, with reading affected by font size, font type, and background.
- Varying performance of the animal detection models depending on the class and the evaluation data.

## Limitations of the Current Version

- The system supports speech in one language (Arabic) through pre-recorded audio files for a set number of results.
- Documented animal detection is limited to three classes evaluated with separate models: eagle, cats, and fish.
- The report gives no final accuracy figure for the color test, and the direct number test used only ten samples.
- The materials include no educational study measuring learning gains or the system's effect on children's learning, so the results published here are limited to the prototype's technical performance and documented software experiments.

## Possible Future Development

The project identified several directions for later versions:

- Improving recognition accuracy in complex settings such as changing lighting and cluttered backgrounds.
- Adding speech recognition to strengthen voice interaction.
- Integration with augmented reality (AR) and virtual reality (VR).
- Multi-language support and adaptive learning matched to the child's level.
- Group and collaborative learning activities between children.
- Performance analytics tools that track children's progress and provide tailored reports.

These items are **future proposals**, not functions of the current version.

## A Note on Privacy

The system uses a camera pointed at the child and their surroundings, so in any real use it is preferable to keep processing local to the device and not to store children's images except with parental consent and under clear rules.

## Planning a Similar System?

If you are working on an interactive computer-vision learning app and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
