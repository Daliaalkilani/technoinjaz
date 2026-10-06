# Smart Calorie Counter Using Computer Vision

A project to develop a **smart, accurate, and fast system for counting calories** in food products based on images, by automatically analyzing food components and estimating their nutritional values — an innovative solution that overcomes traditional challenges such as inaccurate manual counting and the difficulty of estimating portion sizes.

## Project Idea

The system enables users to track their food intake easily and with greater awareness: simply photographing a plate is enough for the system to recognize its components and estimate its caloric value automatically. The project is particularly useful for people with diabetes, athletes, and nutrition specialists, in line with the concept of **"smart health"** in the digital age.

## How Does the System Work?

The project relies on the **YOLO** algorithm to detect food components within the image, then estimates the quantities and nutritional values of each component using pre-trained models.

- **Capture:** a photo of the plate taken with the camera or chosen from the image gallery.
- **Detection:** YOLO identifies the food components and their locations.
- **Estimation:** the calories of each component and the total for the plate are calculated.
- **Display:** clear results are presented in an interactive interface.

## Technical Environment

- **YOLO + the Ultralytics library** for loading the model and analyzing images quickly and effectively.
- **OpenCV** for precise image processing.
- **Tkinter** for building the main interface and an interactive user experience.
- **Roboflow** for improving training data and managing the dataset.
- **Visual Studio Code** as the development environment.

## Project Results

The system demonstrated that estimating calories from images is practical within the test environment, providing an effective tool that promotes nutritional awareness and supports health decisions without the need to weigh food or manually search nutrition tables.

## Development Opportunities

The system can be developed to support a wider variety of dishes and different food cultures, estimate portion sizes more accurately using depth references, and evolve into a full mobile application with a daily intake log and personalized dietary recommendations.

## Planning a Similar Vision-Based Application?

If you are working on a computer vision or health-tech project and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss the project's requirements and the appropriate scope of support.
