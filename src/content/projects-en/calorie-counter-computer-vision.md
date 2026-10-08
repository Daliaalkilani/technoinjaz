# Smart Calorie Counter Using Computer Vision

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to develop **a smart system that recognizes foods from images and displays their nutritional values and calories**, based on the **YOLO** object detection algorithm. The user points the camera at a food or uploads an image from their device, and the system identifies the food and shows its fat, protein, sugars, fiber, carbohydrates, and calories **per 100 grams**.

The system focuses on **single, unmixed foods** such as an apple, a potato, or a tomato, and can recognize more than one item in the same frame. It was built in Python with the Ultralytics library, OpenCV, and a Tkinter interface; training data was prepared on the **Roboflow** platform and the model was trained in **Google Colab**. The system also includes a diet interface that shows a weekly meal plan, including a diet for people with diabetes.

## Project Facts

| Item | Details |
|---|---|
| Project type | Computer vision system for recognizing foods and displaying their nutritional values |
| Field | Computer vision, deep learning, smart health and nutrition |
| Year | 2024–2025 |
| Project status | Working desktop prototype on Windows |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, YOLO (Ultralytics), OpenCV, Tkinter, Roboflow, Google Colab |
| Outputs | Food recognition via live camera or image, nutritional values per 100 g, weekly diet plans |

## The Problem

A calorie is the unit of energy the body gets from food; each gram of carbohydrate or protein provides about 4 kilocalories, and each gram of fat about 9. Knowing these values is essential for weight control, diet planning, and preventing chronic diseases such as obesity, diabetes, and heart disease.

Manual calorie counting, however, runs into many difficulties that the project lists:

- It is hard to estimate the real weight or volume of food before eating it.
- Foods are varied and complex in composition, and calories change with the cooking method.
- Many foods lack clear nutritional information, especially at home and in restaurants.
- General tables may not reflect the properties of the actual food.
- Continuous manual entry invites human error and fatigue.

This led to the idea of a computer vision system that recognizes food directly from an image and shows its nutritional information without manual lookup.

## Project Objectives

- Develop a fast system that analyzes food and displays its nutrients and calories from images.
- Use YOLO to detect and classify foods in the image instantly.
- Link detected foods to a reliable nutrition database.
- Let users track their food intake at home, in restaurants, and at the gym.
- Provide a simple interface for presenting nutritional results.
- Support groups such as athletes, people with diabetes, and nutritionists, in line with the concept of "smart health".

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that apply computer vision and deep learning in health applications.

## System Functions

The system offers three main functions from the main interface:

| Function | What it provides |
|---|---|
| Live camera | Opens the camera, recognizes the food in front of it, shows its main nutritional information, and recognizes several items in the same frame |
| Upload an image from the device | Selects an image, analyzes it with the same model, and shows information for the detected item or items |
| Diet interface | Choose a diet type, such as a diet for people with diabetes, to show a meal list planned for a full week covering three daily meals |

The information shown for each detected item covers fat, protein, sugars, fiber, carbohydrates, and calories, all **per 100 grams** of the food.

## How the System Works

1. Initialize the YOLO model and load it through the Ultralytics library.
2. Capture a frame from the live camera, or read an image the user selects from the device.
3. Pass the frame to the model to detect food items and locate them.
4. Link each detected item to its stored nutritional values per 100 g.
5. Display the results in the interface; the program repeats this loop until the user stops it.

## Data Preparation and Model Training

- **Roboflow:** the platform was used to upload images, sort them by class, label each food by marking its location and class, and automatically split the images into training, test, and validation sets.
- **Data augmentation:** generating additional images from the originals through rotation, horizontal flipping, lighting changes, cropping, and added noise, to improve generalization and reduce overfitting.
- **Google Colab:** data was pulled directly into the Colab cloud environment through Roboflow's API to run training, inference, and analysis on GPU resources without a high-spec computer.

## Software Environment

| Tool | Role in the project |
|---|---|
| Python | Main development language |
| Visual Studio Code | Environment for writing and organizing code on Windows |
| Ultralytics | Loading the YOLO model and running detection |
| OpenCV | Video capture and image processing |
| Tkinter | Graphical interface for uploading images and showing results and diets |
| Roboflow and Google Colab | Preparing and labeling data and training the model |

## Documented Results

The implementation chapter shows screenshots of the working system: recognizing a food item and showing its nutritional information through the live camera, recognizing several items together via the camera and from an uploaded image, and the diet interface with meals for a diabetes diet. The project concludes that the system was effective at identifying food types and presenting their nutritional content.

However, the book **reports no performance metrics for the trained model**, such as mAP, accuracy, or detection speed, and does not state the number of images or classes in the dataset. The results therefore represent a functional proof of a prototype. Metrics explained in the theoretical chapter (such as IoU and mAP) are presented as general concepts, and the commercial apps covered in the literature review, such as SnapCalorie, Calorie Mama, and Cal AI, are not part of this system.

## Limitations of the Current Version

- The system works on single, unmixed foods and does not analyze composite meals or mixed dishes.
- Values are shown per 100 g; the system does not estimate the actual portion weight or amount from the image.
- It does not account for the cooking method and its effect on calories.
- No accuracy metrics are published for the model, and the supported items are limited by the training data.
- The current version is a desktop application; a mobile version is part of the development plans.
- The system is a nutrition-awareness tool and does not replace advice from a doctor or nutritionist, especially for people with diabetes.

## Possible Future Development

According to the directions set out in the project, the system could be developed by:

- A broader nutrition database covering foods from different cultures and cuisines, updated automatically from approved sources.
- Training the models on larger, higher-quality datasets to reduce the margin of error.
- Analyzing the cooking method, such as frying, grilling, or boiling, and its effect on nutritional value.
- Estimating weights and quantities automatically through visual measurement, and analyzing drinks and hidden ingredients in complex recipes.
- A version that runs in real time on mobile phones without a constant internet connection.
- Multilingual interfaces with personalized dietary recommendations based on the user's goals.
- Integration with smartwatches and activity trackers, and with medical systems as part of dietary treatment plans.
- Adding other nutritional indicators such as vitamins and minerals.

## Planning a Similar Vision-Based Application?

If you are working on a computer vision or health-tech project and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss the project's requirements and the appropriate scope of support.
