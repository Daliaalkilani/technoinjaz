# AI-Based Breast Cancer Diagnosis

An academic project carried out by a team of students with technical assistance from **Techno Enjaz** to develop **an intelligent system to support breast cancer diagnosis** through two complementary tracks: a visual track that analyzes **breast radiology images** with the **YOLO** algorithm to detect visual indicators of a tumor, and a numerical track that analyzes **laboratory test data** with the **Random Forest** algorithm to produce a prediction of the case.

The system was built in Python with the Ultralytics, TensorFlow, and scikit-learn libraries and a Tkinter graphical interface that accepts input in three ways: uploading a radiology image, uploading an Excel file of test results, or entering values manually, and then saves the predicted result to a new file. The project describes the system's performance as accurate and fast but reports no figures or test dataset, so the current version is presented as a prototype assistive tool for physicians, not an approved clinical diagnostic tool.

## Project Facts

| Item | Details |
|---|---|
| Project type | AI-assisted breast cancer diagnosis system |
| Field | Computer vision, machine learning, medical informatics |
| Project status | Prototype with a working desktop graphical interface |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, YOLO (Ultralytics), Random Forest, scikit-learn, TensorFlow, Tkinter |
| Outputs | Tumor detection result on the radiology image, case prediction from lab data, Excel file with the result |

## The Problem

Breast cancer is among the most common and dangerous diseases affecting women's health, and early detection plays a central role in improving the chances of treatment. Conventional diagnosis, however, relies heavily on breast radiography (mammography) and on radiologists' expertise in reading the images, a process that is complex, costly, and prone to human error that can lead to false positives or false negatives.

From its review of earlier studies, the project also notes that AI models in this field face challenges such as limited diversity in training data, the difficulty of explaining deep models' decisions (the "black box" problem), and the need for large amounts of data and computing resources. This led to the idea of a system that brings together visual data (radiology) and numerical data (lab tests) to give a fuller picture of the patient's condition.

## Project Objectives

- Raise diagnostic accuracy by combining radiology image analysis with laboratory data processing.
- Deliver results faster by automating the analysis of images and Excel files.
- Reduce operating costs and full reliance on specialist experts.
- Provide a flexible interface for choosing the input method: images, files, or manual entry.
- Produce results that can be stored and shared to help physicians follow up cases.
- Allow future integration with electronic medical systems in healthcare institutions.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that apply computer vision and machine learning in medical applications.

## How the System Works

The process starts at the main interface, where the user chooses one of two tracks:

### Track 1: Radiology Image Analysis with YOLO

1. Load the trained YOLO model.
2. Upload a radiology image from the device through the image upload interface.
3. Pass the image to the model to detect and identify suspicious regions.
4. Display the tumor detection result immediately in a dedicated window, with the option to show more details about the finding.
5. The system keeps accepting new images until the user chooses to exit.

### Track 2: Laboratory Data Analysis with Random Forest

1. Load the trained prediction model.
2. Enter test data manually in dedicated fields, upload a ready Excel file, or attach an image of a lab report.
3. Clean the data of missing or invalid values and prepare it in the required format.
4. Pass the cleaned data to the model to make the prediction.
5. Display the result in a dedicated window and save it to a new Excel file containing the patient's data and the predicted result.

## System Interfaces

| Interface | Function |
|---|---|
| Main interface | Starting point for choosing the image track or the lab data track |
| Image upload interface (YOLO) | Select a radiology image from the device and send it for analysis |
| Detection result window | Show the image with the tumor detection result |
| Data entry interface | Enter values manually, upload an Excel file, or attach a lab report image |
| Prediction interface | Show the predicted result based on the entered data |
| Results file | Excel file containing the patient's data and the predicted result |

## Software and Tools

| Tool | Role in the project |
|---|---|
| Ultralytics | Building, training, and running YOLO models in the image track |
| scikit-learn | Classification algorithms and data processing in the lab track |
| TensorFlow | Deep learning library within the software environment |
| Tkinter | Building the graphical interfaces and windows |
| VS Code and Jupyter Notebook | Environments for writing and running code and analyzing data |

The theoretical part of the project reviews image classification models such as ResNet50V2, ResNet152V2, InceptionV3, Xception, and MobileNet, along with decision trees and the SVC algorithm, as scientific background. The two tracks implemented in the system rely on YOLO and Random Forest.

## Documented Results

The project concludes that the system performed well in supporting breast cancer diagnosis, that processing of images and data was fast compared with conventional methods, and that the multiple input methods (images, Excel files, manual entry) made the system flexible and easy to use. It also states that combining the two tracks raises accuracy and reliability compared with using either one alone.

However, the book **reports no quantitative values** such as accuracy, sensitivity, mAP, or processing times, does not identify the training and test datasets or their sizes, and does not describe a specific mechanism that merges the outputs of the two tracks into one decision; in the interfaces, the two tracks appear as separate paths that the user chooses between. The published results therefore reflect **the functional success of a prototype**, not a clinical evaluation. Figures quoted in the literature review chapter belong to other studies.

## Limitations of the Current Version

- No published performance metrics for the system and no description of the training and test datasets.
- The system has not been tested in a real working environment inside a medical institution, which the project itself proposes as a next step.
- The two tracks work independently in the interface, with no documented mechanism for combining their outputs.
- The system currently covers breast cancer only.
- The system is an assistive tool and does not replace the radiologist's reading or confirmatory tests.

## Possible Future Development

According to the recommendations set out in the project, the system could be developed by:

- Expanding the training and test data with larger and more diverse samples to improve accuracy and generalization.
- Adding deep learning techniques such as recurrent neural networks to analyze time-series data related to the patient's history.
- Extending the system to diagnose other types of tumors or diseases visible in medical images.
- Improving integration with electronic medical record platforms to share results between departments.
- Supporting multiple languages and adding visual tools and alerts that explain results to non-specialists.
- Running field trials inside medical institutions to measure the system's effectiveness in practice.

## A Note on Privacy

The system handles sensitive radiology images and laboratory data, so any real-world use requires patient consent, clear controls over access to the Excel files and saved results and how long they are kept, and an independent clinical evaluation before relying on it.

## Planning a Similar System?

If you are working on a deep-learning medical diagnosis system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
