# AI-Powered Technical Voice Chatbot Robot

A development project for an **intelligent educational chatbot robot** based on artificial intelligence and natural language processing (NLP) to support students in technical fields, delivering personalized content and interactive explanations around the clock for programming and networking questions, backed by a specialized knowledge base.

The system goes beyond software: it integrates a hardware dimension combining wireless connectivity and simple robotic motion that makes the interaction feel more realistic and engaging.

## Technical Environment

- JavaScript
- Gemini LLM
- Natural Language Processing (NLP)
- Speech Recognition
- NodeMCU ESP8266
- MG995 Servo Motor
- 18650 Battery with LM2596 and BMS

## How does the system work?

The system analyzes user questions — typed or spoken — using NLP techniques and advanced AI models to understand the question's context rather than just its keywords, then generates an accurate contextual response from a specialized technical knowledge base of programming concepts and explanations.

- **Text and voice interaction:** supports typed input and voice commands with responses in both modes via speech recognition.
- **Contextual understanding:** analyzes the student's intent and handles complex technical questions accurately.
- **Physical interaction:** a servo motor moves the robot's arm during responses to simulate simple gestures.
- **Always available:** the service runs around the clock, unbound by office hours.

## Hardware and software architecture

On the software side, the system is built with JavaScript and uses APIs for voice interaction and network communication. On the hardware side, it uses a NodeMCU ESP8266 development board for wireless connectivity and data exchange with cloud services, plus a single servo motor for precise arm control, with a power subsystem comprising a lithium-ion battery, a buck converter, and a battery management system.

## Boundaries and future work

The system focuses exclusively on educational and technical support in programming, computer engineering, and networking; it provides no medical, legal, or psychological advice. It relies entirely on cloud processing and therefore cannot run offline, and its motion is limited to the arm. Future work could expand the knowledge base and add visual capabilities.
