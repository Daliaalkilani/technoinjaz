# AI Diagnosis of Oral and Dental Diseases

A project developing an **intelligent web system for diagnosing oral and dental diseases** using state-of-the-art AI and computer vision, delivering an interactive diagnostic platform that analyzes digital images (clinical and radiographic) with high accuracy and speed.

At its core, the system uses an advanced Vision-Language Model (VLM) that understands the image contextually and generates a preliminary Arabic diagnostic report as strict JSON, including detected conditions (caries, gingivitis, fractures) with locations mapped to the global FDI numbering system.

## Technical Environment

- Vision-Language Model (Gemini)
- SAM — Segment Anything Model
- React 19
- TypeScript
- Flask
- Python
- SQLite
- FDI Numbering

## AI techniques

- **Contextual visual understanding:** a VLM analyzes images and produces structured preliminary diagnostic reports.
- **Precise segmentation:** Meta's SAM model crops the affected region at pixel level and produces polygons that outline the lesion anatomically, beyond approximate bounding boxes.
- **Interactive medical encyclopedia:** an in-platform reference for conditions and concepts.
- **Chatbot support center:** an interactive assistant answering user questions.

## Software architecture

A modern architecture separates frontend and backend: the UI is built with React 19 and TypeScript featuring an interactive dental chart and dark mode, while a Flask/Python backend calls the Gemini/Kimi cloud APIs and runs SAM locally, with SQLite managing patient records and examinations.

## Impact

Combining multimodal cloud models with local segmentation yields a high-accuracy diagnostic aid that supports clinical decisions and reduces reliance on manual examination, with room to expand to more conditions and advanced analyses.

## Planning a Similar System?

If you are working on an AI-based medical diagnosis system and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
