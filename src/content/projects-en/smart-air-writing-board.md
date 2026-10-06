# Smart Air-Writing and Drawing Board

The **Smart Board** is an interactive system that turns a conventional webcam into an input device enabling drawing and writing in the air within a digital workspace — no extra input hardware or specialized equipment needed — as a low-cost alternative to smart whiteboards and digital drawing tablets.

It relies on MediaPipe Hands for hand tracking, combined with numerical processing algorithms and geometric distance calculations to distinguish gestures, and adds a cognitive dimension by analyzing handwritten mathematical equations.

## Technical Environment

- Python
- MediaPipe Hands
- OpenCV
- NumPy
- PIL
- Google Gemini API

## Interactive functions

- **Drawing and writing:** finger motion converted into instant digital strokes.
- **Color selection and erasing:** gesture commands for color picking and partial or full erase.
- **Saving results:** exporting the board's content when finished.
- **Equation analysis:** Google Gemini API integration analyzes handwritten math equations, extracts solution steps, and displays them in the interface.

## Technical architecture

The system is designed and implemented in Python, using OpenCV for real-time video processing, MediaPipe for pose estimation and hand tracking, and NumPy and PIL for numerical processing and image handling, with full integration into the Google Gemini API for the cognitive layer.

## Results

Practical implementation demonstrated natural gesture-based interaction running efficiently on mid-range hardware, with the system extensible toward additional cognitive tasks that enhance its educational and practical value.
