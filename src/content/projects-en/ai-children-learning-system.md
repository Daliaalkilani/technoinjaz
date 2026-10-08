# AI-Powered Children's Learning System

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to develop **an interactive learning system for children based on artificial intelligence and image processing**. A child points the camera at an everyday object, such as a cup, a ball, or a book, and the system recognizes it, displays its name on screen, and speaks the name aloud. It also identifies the color of an object held in front of the camera and recognizes the objects in an image the user uploads from the device.

The working prototype was built in **Python** and uses **YOLOv8** (through the ultralytics library) for object recognition, the **HSV color model** with **OpenCV** for color detection, and **Tkinter** for a three-button graphical interface. The prototype carried out all three of its tasks in the documented practical tests. The project reports no quantitative accuracy measurements, so its results are presented as a functional proof of a prototype.

## Project Facts

| Item | Details |
|---|---|
| Project type | Interactive learning system based on computer vision |
| Field | Educational technology, artificial intelligence, image processing |
| Year | 2024–2025 |
| Project status | Working desktop prototype, tested on a variety of objects, colors, and images |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, YOLOv8 (ultralytics), OpenCV, HSV, Tkinter, Anaconda |
| Outputs | Object recognition with spoken names, color detection, recognition of uploaded image content |

## The Problem

The project starts from the view that a child's early years have the greatest influence on intellectual and language development, and that traditional education often relies on rote learning, makes the teacher the only source of information, and offers few interactive methods that encourage children to explore and learn by doing.

Children naturally learn by observing and handling the things around them. The project therefore aimed at a tool that links the child directly to their surroundings: when a child points the camera at a ball or a flower and hears its name immediately, the word is tied to the real object, and color recognition adds a further dimension to visual learning.

## Project Objectives

- Promote interactive learning by connecting the child to nearby objects through the camera.
- Expand children's vocabulary and improve their ability to recognize and name objects.
- Encourage children's curiosity to explore their environment in an enjoyable way.
- Strengthen the link between names and objects, supporting visual and verbal memory.
- Provide an extensible learning tool that keeps pace with AI technologies.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for educational projects that apply computer vision and AI in tools designed for children.

## How the System Works

The system runs through a graphical interface with three buttons, each with its own task:

1. **Start the camera:** the system captures the live feed from the computer's camera and passes the frames to the **YOLOv8** model, which identifies the object in front of the camera.
2. **Display and speak the name:** the system writes the detected object's name on screen and plays audio that pronounces it clearly, so the child sees the object and hears its name at the same moment.
3. **Detect the color:** in color mode the child holds an object in front of the camera; the system converts the frame from BGR to **HSV**, identifies the color, and shows it on screen.
4. **Upload an image:** the user selects an image from the device, and the system recognizes the objects in it and writes their names on the image.

## Color Recognition with the HSV Model

The HSV model separates **hue**, **saturation**, and **value (brightness)**, which makes defining a range for each color less sensitive to lighting changes than the RGB model. The book explains the OpenCV-based HSV thresholding method in these steps:

- Convert each frame from BGR to HSV with `cvtColor`; hue runs from 0 to 179, and saturation and value from 0 to 255.
- Define lower and upper bounds for each color as NumPy arrays, with two separate ranges for red because it sits at both ends of the hue range.
- Create a binary mask with `inRange`, then clean it with erosion and dilation.
- Extract object outlines with `findContours`, ignore small areas, and write the color name over the detected object.

## Software and Tools

| Tool | Role in the project |
|---|---|
| Python | Main development language |
| Anaconda | Isolated environment with a specific Python version to avoid package conflicts |
| OpenCV | Video capture, image processing, and color analysis |
| YOLOv8 (ultralytics) | Object recognition in the live feed and uploaded images |
| Tkinter | The three-button graphical interface |
| Jupyter Notebook and VS Code | Environments for writing and testing code |

## Documented Results

The three tasks were tested in practice, with the results described by the project as follows:

| Task | What was tested | Documented result |
|---|---|---|
| Recognizing objects and speaking their names | Various objects in front of the camera, such as a ball, a book, and a pen, under different lighting | Recognized objects well, especially in good lighting; the documented example shows "cup" displayed and spoken |
| Color detection | Basic colors such as red, green, and blue under different lighting | Identified the object's color and displayed it on screen |
| Recognizing uploaded image content | Images containing animals and household items | Recognized the objects and wrote their names, including a cat in the documented example |

The project concluded that the system performed all three tasks well and consistently and met its intended goals. However, the book **reports no project-specific quantitative values** such as precision, recall, mAP, or processing speed, nor the number of test samples, and while its conclusion mentions positive interaction from children, it gives no method or data for that evaluation. The accuracy figures in the theoretical chapter belong to other studies and are not results of this system.

## Challenges and Limitations of the Current Version

- Confusion when classifying some objects that look alike in shape or color, and weaker recognition of objects that are partly hidden or overlap others.
- Color detection is affected by ambient lighting; colors with close shades are sometimes misclassified, and the system can identify the right object but the wrong color because of reflections or shadows.
- Slight delay when running the model on low-spec computers, and difficulty running it on weak phones.
- Speech output had to be synchronized with on-screen results without delay.
- Lower recognition accuracy on low-quality or blurry images, and more errors in cluttered scenes.
- Some objects were poorly represented in the data, calling for retraining on larger datasets.
- The Tkinter interface needs visual restructuring to be more appealing to children.
- The documented version is a desktop application using the computer's camera; a mobile app remains part of the development plans.

## Possible Future Development

According to the proposals set out in the project, the system could be developed by:

- Adopting newer YOLO versions and improving color processing to reduce the effect of lighting.
- Expanding the database with more objects and colors, using images from different angles and settings.
- Building a complete mobile app.
- A more child-friendly interface with learning games such as matching colors to objects, encouraging audio feedback, and age-specific customization.
- Pronouncing names in more than one language and dialect.
- Integrating augmented reality to show the detected object in 3D.
- Adapting the system for children with special needs and connecting it to e-learning platforms.
- A dashboard for parents and teachers with periodic reports on the objects and colors the child has learned.

## Have a Similar Project?

If you are developing an educational project or a system based on artificial intelligence and computer vision, you can contact Techno Enjaz to discuss the technical requirements and develop the right solution.

## Planning a Similar System?

If you are working on a computer-vision-based learning app and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
