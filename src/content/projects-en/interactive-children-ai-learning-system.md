# Interactive AI Learning System for Children Using Artificial Intelligence and Computer Vision

This academic project was developed by students **with technical and engineering assistance from Techno Enjaz** to build an interactive educational prototype for children based on artificial intelligence and computer vision. The system combines animal recognition, color analysis, and number reading through the camera, then displays the result visually and pairs it with audio feedback.

The project represents an applied experiment in integrating several computer vision techniques within a single interface designed for educational use — including testing animal detection models and measuring their performance, and trying color and number recognition under different operating conditions.

## Project Information

| Item | Details |
|---|---|
| Project type | Interactive educational system / prototype |
| Field | Artificial intelligence, computer vision, and educational technology |
| Status | Implemented and tested academic prototype |
| Year | 2024–2025 |
| Techno Enjaz role | Technical and engineering assistance and development support |
| Execution method | Carried out by the students within the academic project with Techno Enjaz's assistance |
| Key technologies | Python, OpenCV, NumPy, YOLO11, OCR, HSV, Tkinter |
| Inputs | Computer camera and still images |
| Outputs | Visual results and audio feedback |

## About the Project

The system was designed to provide direct visual interaction with the child through three main functions: animal recognition, color recognition, and number recognition. Each function runs on a different processing path, while a single graphical interface ties them together, allowing the user to move between activities, start the camera, and return to the home screen.

The project used image-processing and computer vision techniques to turn whatever appears in front of the camera into information that can be both displayed and heard. The prototype thus goes beyond showing the name of the item — it links the processing result to a suitable audio file to deliver direct feedback.

## Techno Enjaz's Role

The project was carried out by the students within an academic framework, **with technical and engineering assistance from Techno Enjaz** during the development of the prototype and the testing of its components. The office's contribution included supporting the technical work and guiding the solution's development in a way that helped turn the idea into a testable prototype, while the academic execution of the project remained the students' responsibility.

The project reflects practical experience in working with computer vision applications and in connecting AI models to user interfaces and testable image-processing pipelines.

## How the System Works

The system relies on a processing path that starts by capturing an image from the camera and passing it to the selected function:

1. The user selects the desired recognition function from the main interface.
2. The camera opens to capture the item, color, or number.
3. The image is processed using the tools appropriate to each function.
4. The result appears in the interface.
5. An audio file associated with the result is played to provide direct feedback.

## Animal Recognition Using YOLO11

The animal detection part relies on YOLO models to detect the animal in the image and show the detected class. The report includes separate evaluation results for detecting eagles, cats, and fish.

### Detection Model Results

| Model | mAP50 | mAP50-95 | F1 | Recorded inference time |
|---|---:|---:|---:|---:|
| Eagle | 0.956 | 0.824 | 0.92 | 18.8 ms |
| Cats | 0.992 | 0.784 | 0.98 | 28.4 ms |
| Fish | 0.856 | 0.551 | 0.81 | 21.2 ms |

These values show the detection models' performance within the project's tests; they do not represent a single accuracy figure for the educational system as a whole. The inference times also depend on the environment used for testing.

## Color Recognition Using HSV

The color recognition function captures an image of the item held in front of the camera, converts the color data into the **HSV** space, and uses defined ranges to identify the dominant color. The color's name then appears in the interface and its associated audio file is played.

The experiment showed that color recognition quality is affected by factors such as lighting, shadows and reflections, the similarity of certain colors, the camera type, and the distance between the item and the camera. The project therefore treated this function as a practical test dependent on capture conditions — not as a fixed measurement independent of the environment.

## Number Recognition Using OCR

The number function uses **OCR** (optical character recognition) to extract the digit shown in front of the camera, convert it to a text value, display the number, and play its associated audio.

In a live test of the digits 1 through 10, 7 of the 10 samples were read correctly. Typical errors appeared on visually similar shapes, such as reading the digit 5 as the letter S, the digit 8 as B, and reading 10 as `1O`.

The report also presents a separate evaluation set for EasyOCR with an Accuracy of 87.4%, along with Precision of 0.89, Recall of 0.83, and F1 of 0.86. Because this evaluation's context differs from the ten-digit test, the two results are presented separately and are not merged into a single accuracy value.

## Interface and Audio Feedback

The interface was built with **Tkinter** to bring the system's functions together into one experience. After an animal, color, or number is recognized, the program displays the result and pairs it with a pre-recorded audio file that plays automatically, giving the child a visual and auditory output at the same time.

## Key Technical Challenges

The tests revealed a set of factors affecting the prototype's performance, most notably:

- Lighting changes and their effect on reading colors and images.
- The similarity of certain color shades when using HSV.
- Camera quality, distance, and the angle of the item.
- Ambiguity between certain digits and letters when using OCR.
- Variation in the animal detection models' performance depending on the class and the data used for evaluation.

These tests helped identify the areas needing improvement in any later version, rather than treating the prototype as a finished, complete product.

## Technologies Used

- **Python** for developing the application and wiring its components together.
- **OpenCV** for capturing and processing images and converting color spaces.
- **NumPy** for data and array manipulation.
- **YOLO11** for detecting animals in images.
- **OCR / EasyOCR** within the number recognition experiments.
- **HSV** for color analysis.
- **Tkinter** for building the graphical interface.
- **Playsound** for playing the audio files associated with the results.

## Results

The prototype succeeded in integrating three computer vision tasks within a single educational interface, backed by documented tests of the animal detection models' performance and practical experiments with colors and numbers. The results show performance varying by task, which provides a clear basis for evolving the prototype and improving the accuracy of each function independently.

The available materials do not include a pedagogical study measuring learning gains or the system's effect on children's learning; the project results published here are therefore limited to the prototype's technical performance and the documented software experiments.

## Future Development

The project identified several directions that could be explored in later versions, including improving the handling of lighting and complex backgrounds, adding voice recognition, supporting multiple languages, and introducing technologies such as augmented reality or adaptive learning. These items are **future proposals**, not functions of the current version.

## Have a Similar Project?

If you are planning an application that needs image or video analysis and connecting computer vision models to an interactive interface, you can contact **Techno Enjaz** to discuss the technical requirements and the appropriate development scope.

## Planning a Similar System?

If you are working on an interactive computer-vision learning app and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
