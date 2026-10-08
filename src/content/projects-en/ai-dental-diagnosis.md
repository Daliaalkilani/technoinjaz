# AI Diagnosis of Oral and Dental Diseases

A project to develop **an intelligent web platform for diagnosing oral and dental diseases**, called Smart Dent AI, carried out by a team of students with technical assistance from **Techno Enjaz**. The platform analyzes clinical and radiographic dental images and generates a preliminary Arabic diagnostic report that identifies detected conditions and their locations using the international **FDI** tooth-numbering system, then outlines each lesion at pixel level.

The system combines two complementary capabilities: a **vision-language model (VLM)** such as Gemini 3.1 Pro that understands the image in context and writes the report, and Meta's **SAM segmentation model**, running locally on the server, which turns approximate boxes into polygons that follow the boundaries of the affected area. The result is an assistive tool for the dentist; the final diagnosis remains the responsibility of a qualified dentist.

## Project Facts

| Item | Details |
|---|---|
| Project type | AI-assisted diagnostic web platform |
| Field | Computer vision, vision-language models, medical informatics |
| Year | 2025–2026 |
| Project status | Working prototype tested on a development machine and varied test images |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Gemini 3.1 Pro, Kimi k2.6, SAM (ViT-B), React 19, TypeScript, Flask, SQLite |
| Outputs | Arabic diagnostic report in JSON, lesion polygons, FDI tooth map, patient records, PDF export |

## The Problem

Most automated detection systems in dentistry rely on object-detection models such as YOLO, which return a disease name, a confidence score, and a rough rectangular box around the suspected area. This output is fast, but it is limited to the conditions the model was trained on, requires full retraining to add any new condition, gives the dentist no written description or treatment recommendation, and a rectangle does not reflect the true anatomical shape of the lesion.

The project set out to move past these limits with an approach that combines the **contextual understanding** of vision-language models with the **spatial precision** of segmentation models, inside an integrated clinic platform that covers patient management, reports, and billing as well as diagnosis.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that bring multimodal generative models and computer vision together in medical applications.

## How the System Works

An image follows a clear path inside the platform, from upload to report:

1. The dentist uploads a clinical or radiographic image from the patient's file.
2. The Flask backend sends the image to the vision-language model with carefully designed prompts.
3. The model returns an Arabic report as **strict JSON** containing the detected conditions, the FDI tooth number, severity, a confidence score, a treatment recommendation, and an approximate box for each lesion.
4. Each box is passed to the locally running **SAM** model, which produces a precise mask of the affected area.
5. OpenCV extracts a polygon with a small number of points from the mask, which is drawn over the image in the interface.
6. Affected teeth are highlighted automatically on the interactive tooth map, and the examination and its findings are saved to the database.
7. The dentist reviews and rates the results and can export the report as a PDF.

The prompts apply a **negative bias** that stops the model from reporting unconfirmed findings, to reduce false positives. The same design means new conditions can be added by editing the prompts alone, without retraining any model.

## Software Architecture

The system uses a single-page application (SPA) architecture that separates the frontend from the backend:

- **Frontend:** React 19 and TypeScript with Tailwind CSS v4, supporting dark and light modes.
- **Backend:** Flask on Python 3.11, handling API routes, image processing, calls to the cloud models (Gemini and Kimi), and running SAM locally.
- **Segmentation model:** the **ViT-B** version of SAM (about 93.74 million parameters, 358 MB), chosen to balance accuracy and speed on mid-range hardware.
- **Database:** SQLite with five related tables covering patients, examinations, findings, dentist ratings, and the medical encyclopedia.

## Platform Screens

The interface has seven main screens covering the workflow of a smart clinic:

| Screen | Function |
|---|---|
| Dashboard | Overall indicators on patients and examinations |
| Patient management | Add, edit, delete, and view patient data |
| Tooth map | Interactive FDI chart that highlights affected teeth automatically |
| AI diagnosis report | Image analysis results, polygons, and recommendations |
| Treatment reports | Report editor with per-tooth diagnosis and treatment items and a live preview |
| Pricing and costs | Invoices, revenue, and payment statuses |
| Medical encyclopedia | Reference covering eight dental conditions: symptoms, causes, treatment, prevention |

The system also includes a chatbot-based support center that answers user questions.

## Documented Results

### Response Time

Performance was measured on a development machine with an Intel Core i5-1135G7 processor and 8 GB of RAM, running SAM on the CPU without a GPU:

| Operation | Measured time |
|---|---|
| Loading SAM into memory (once) | 1.6 seconds |
| Gemini 3.1 Pro call | 10–40 seconds depending on the image and report length |
| SAM image encoding | 18.7 seconds |
| Mask prediction per box | under 1 second |
| Polygon extraction from the mask | about 10 ms |
| Full analysis of one image | about 58–60 seconds |

Optimizations applied include encoding each image once instead of once per condition (saving about 60% of the time), downscaling images to at most 1024 pixels, generating a single mask per box, and lazy-loading the model with a lock that prevents concurrent loading.

### Segmentation Accuracy

Polygon accuracy was measured with the **IoU** metric on varied test images. Values ranged from 0.815 to 0.939, with an average of about **0.89**, indicating a good match between the generated polygon and the affected area on the test images used.

### Comparison with a Conventional Detector

To illustrate the difference between the two approaches, a **YOLOv8** model was trained on a dataset of 1,800 images covering four conditions (dental caries, alveolar bone loss, periapical lesions, tooth fractures), split 70% training, 20% validation, and 10% test, over 100 epochs. The model achieved 92.4% precision, 89.7% recall, 93.1% mAP@0.5, and 74.8% mAP@0.5:0.95.

| Criterion | Local YOLOv8 | Proposed approach (VLM + SAM) |
|---|---|---|
| Output | Condition names and rough boxes | Detailed Arabic report and precise polygons |
| Flexibility | Limited to the four trained conditions | New conditions added by editing prompts |
| Response time | Under 1 second | Tens of seconds |
| Data privacy | Images stay on the device | Segmentation is local; language analysis is in the cloud |

The project concluded that YOLO wins on speed, while the proposed approach offers contextual understanding, written reports, and higher spatial precision, which justified choosing it despite the longer response time.

## Limitations of the Current Version

- A full analysis takes about a minute per image on the CPU, and the slowest stage is SAM's image encoding.
- VLM analysis depends on cloud services and a stable internet connection, which means images are currently sent to external servers.
- The IoU values were measured on a limited number of test images and do not represent a broad clinical evaluation.
- The platform is an assistive tool and does not replace the dentist's examination and treatment decision.

## Possible Future Development

According to the directions set out in the project, the platform could be extended by:

- Cutting image encoding from about 18.7 seconds to one or two seconds with a CUDA-enabled GPU, or speeding up CPU inference with ONNX Runtime, plus caching for repeated images.
- Supporting panoramic X-ray and CBCT images and 3D analysis.
- Connecting the language model to medical knowledge bases through **RAG** to reduce hallucination.
- Adding role-based permissions (dentist, receptionist, patient) and integrating with electronic medical records.
- Generating explainability heatmaps (XAI) that show which regions the model relied on.
- A mobile app for a preliminary camera-based check with results shared with the dentist.

## A Note on Privacy

The platform handles sensitive health images and data, so any real-world use requires patient consent, clear controls over access rights and data retention, and a review of the policy for sending images to cloud services.

## Planning a Similar System?

If you are working on an AI-based medical diagnosis system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
