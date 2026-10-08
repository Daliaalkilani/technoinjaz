# Weapon Detection System Using Artificial Intelligence Technologies

A project to develop **a computer vision system for real-time detection of weapons** such as knives and pistols from the built-in camera of a laptop or phone, using the Ultralytics **YOLOv8** object detection algorithm. The project was carried out academically by a team of students with technical assistance from **Techno Enjaz** and aims at a low-cost tool that does not require specialized surveillance equipment and could be useful in schools, public buildings, and shops.

The system runs in **Python** with **OpenCV** for reading video and passes each frame to two trained models, one for knives (knife_model.pt) and one for pistols (gun_model.pt), drawing a yellow box labeled "Target Zone" around a detected weapon. The project documented successful knife and pistol detections in a live stream, with no published quantitative performance metrics.

## Project Facts

| Item | Details |
|---|---|
| Project type | Real-time AI object detection system |
| Field | Computer vision, deep learning, smart security systems |
| Year | 2024–2025 |
| Project status | Prototype tested with a live stream from a laptop camera |
| Techno Enjaz role | Technical support and assistance during project development |
| Core technologies | Python, OpenCV, Ultralytics YOLOv8, Anaconda, Jupyter Notebook, Visual Studio Code |
| Outputs | Real-time localization of a knife or pistol in the frame with a "Target Zone" box |

## The Problem

The project starts from the growing threats associated with carrying weapons in public and private places, and from the reliance of many surveillance systems on continuous human monitoring that can be delayed or mistaken. It proposes using a camera that already exists in a laptop or phone together with an object detection model, giving a flexible way to spot a weapon the moment it appears in front of the camera without expensive equipment or complex infrastructure.

## Project Objectives

- Develop an intelligent system for real-time weapon detection using AI.
- Rely on the cameras of mobile devices or those built into computers.
- Make the system applicable in multiple environments without costly equipment.
- Reduce reliance on human monitoring and speed up response.
- Design a flexible model that can be developed further.

## Techno Enjaz's Role

The project was carried out academically by a team of students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for YOLO-based object detection projects and real-time camera stream processing.

## How the System Works

1. **Camera initialization:** The program starts the camera and checks that it is ready.
2. **Model loading:** The YOLO model trained on weapons is activated.
3. **Processing loop:** The program enters a loop that runs as long as the camera is active.
4. **Frame capture:** OpenCV reads the current frame and prepares it in the format the model expects.
5. **Detection:** The model analyzes the frame and identifies the type and position of the detected object.
6. **Display:** The result is shown on screen immediately with a box marking the weapon's location.
7. **Exit:** The loop stops when the user presses the "q" key, closing the camera and ending the program.

## Tools and Technologies Used

| Tool | Role in the project |
|---|---|
| Python | Main programming language, chosen for its integration with YOLOv8 and OpenCV |
| OpenCV | Reading video from the camera and processing frames in real time |
| Ultralytics YOLOv8 | Object detection model, with the option to use pre-trained models or retrain them on new data |
| Custom models | knife_model.pt for detecting knives and gun_model.pt for detecting pistols |
| Anaconda | Managing an isolated environment for the OpenCV and Ultralytics libraries |
| Jupyter Notebook | Trying code step by step and viewing detection results |
| Visual Studio Code | Writing code and organizing project files |

The project summary states that the model was trained on a dataset containing various types of weapons under different lighting conditions and angles, without specifying the dataset's size, source, or split.

## Testing and Results

The system was tested with a live stream from the laptop camera:

| Case | What the report documents |
|---|---|
| Knife detection | A person holding a knife in a live stream was detected automatically and marked with a yellow "Target Zone" box using knife_model.pt |
| Pistol detection | The pistol held by the person was detected automatically and surrounded by a yellow box with the same label using gun_model.pt |

The report describes detection accuracy as "good" or "acceptable" and notes that the model may need further training to improve accuracy in different environments or changing lighting. The material includes no quantitative performance indicators such as mAP, Precision, Recall, or FPS, so no numerical accuracy or performance figures are shown. Figures such as 85%, 87%, or 93% mentioned in the report come from previously published studies and are not results of this system.

## Challenges and Limitations of the Current Version

- Varying lighting conditions affect detection quality, and further training is needed to work in different environments.
- Handling different viewing angles of objects, and balancing processing speed against detection accuracy.
- Detection is limited to two documented classes (knife and pistol) using two separate models.
- The report does not document an audible alarm, alerts sent to an external party, or timestamped log storage, even though these appear among the requirements; what the results show is the visual display of detections.
- The system was tested with a single laptop camera in a test setting, not on surveillance cameras at a real site.

## Possible Future Development

According to the directions set out in the project:

- Covering more types and sizes of weapons, and improving accuracy in low light and bad weather.
- Connecting to live-stream surveillance cameras to analyze video without storing large amounts of data.
- Strengthening system security with encryption and protection protocols against cyberattacks.
- Tracking the detected target through multi-angle cameras or GPS.
- Control interfaces for security teams with the ability to browse and analyze alert logs.
- Linking to security databases, and extending detection to hazardous materials or suspicious activities.

To see how object detection differs from classifying a whole image, read our article [How Does AI Image Classification Work? From CNN to Vision Transformers](/articles/ai-image-classification).

## Do You Have a Similar Project?

If you are working on a project that needs image or video analysis using artificial intelligence and computer vision technologies, you can contact Techno Enjaz to discuss the technical requirements and the appropriate scope of the solution.

## Planning a Similar System?

If you are working on a YOLO-based deep-learning detection system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
