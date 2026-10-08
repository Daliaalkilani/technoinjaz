# Smart Air-Writing and Drawing Board

The **Smart Board** is an interactive system that turns **an ordinary webcam** into an input tool for writing and drawing in the air with a finger inside a digital workspace, with no pen, colored marker, or extra hardware. It was carried out by a team of students with technical assistance from **Techno Enjaz**, in **Python**, using **MediaPipe Hands** to track 21 hand landmarks and **OpenCV** for video processing and the interface.

The system recognizes gestures from the number of raised fingers and the geometric distances between them: the index finger to write, two fingers to choose colors and tools, and the thumb to save a snapshot of the board. It adds an educational layer by sending **a handwritten math equation** to the **Google Gemini API**, which returns the solution with its steps inside the same interface, making it a low-cost alternative to smart boards and digital drawing tablets that runs on mid-range computers without a GPU.

## Project Facts

| Item | Details |
|---|---|
| Project type | Interactive system for writing and drawing in the air with hand gestures |
| Field | Computer vision, human–computer interaction, hand tracking, educational technology |
| Project status | Working system tested in practice with a webcam on a mid-range computer |
| Techno Enjaz role | Technical support and assistance to the students during project development |
| Core technologies | Python, MediaPipe Hands, OpenCV, NumPy, PIL, threading, Google Gemini API |
| Outputs | Finger drawing and writing, color selection, eraser and full clear, snapshot saving, solving handwritten equations with steps |

## The Problem

Human–computer interfaces are moving toward motion and gestures instead of traditional input devices, but well-known interactive teaching tools such as smart boards and digital drawing tablets are expensive and not widespread in schools with modest resources, and they come with their own physical constraints.

The project reviewed earlier approaches and found limits in each: **Air Canvas** systems that track a colored pen by converting RGB to HSV are sensitive to lighting and need an external marker; the MediaPipe Hands framework offers accurate tracking but is a developer framework rather than a complete educational application; gesture-based virtual-mouse apps lack the path stability needed for writing; and depth-sensor systems such as Kinect are accurate but need costly hardware. The Smart Board was designed to combine accurate hand tracking, stable strokes for writing and drawing, and clear gesture logic, using only an ordinary camera.

## Techno Enjaz's Role

The project was carried out academically by the students, with **technical assistance and support from Techno Enjaz during development**. It is presented among the office's work as an example of its support for projects that combine computer vision, gesture interaction, and generative AI in educational applications.

## How the Smart Board Works

1. Initialize the system and load the MediaPipe Hands model, then open the webcam.
2. Enter a loop that grabs the current frame from the stream and passes it to the model.
3. Extract the coordinates of the hand's 21 landmarks and analyze the finger positions.
4. Check whether the hand is performing one of the defined gestures, and run the matching task if so.
5. Display the result on the interface, which overlays the drawing layer and interface elements on the camera feed.
6. When needed, the user selects the equation written on the board and confirms sending; its image is sent to Gemini and the solution is displayed.
7. The loop repeats until the program is stopped.

## Gestures and Their Functions

| Gesture | Function |
|---|---|
| Index finger only raised | Writing and drawing mode on the board |
| Two fingers raised | Selection mode: drawing stops and colors or tools can be chosen from the interface |
| Thumb only raised | Special commands such as saving a snapshot of the board |

Gestures are distinguished by the number of raised fingers and by the distances between fingertips, or between them and the wrist. Where gestures looked alike because of hand angle or overlapping fingers, extra conditions were added to reduce unintended mode switches. The gestures are not fixed; they can be changed or replaced by editing the program's conditions. The interface tools include changing the drawing color, an eraser, and a full clear.

## Solving Math Equations with Google Gemini

Gemini is used as a dedicated engine for analyzing and solving handwritten equations, not as a general text assistant:

- **On-demand calls:** the model does not run automatically; the user selects the equation and then confirms sending, to save resources and avoid analyzing unintended content.
- **Image preparation:** only the equation region is cropped, then converted to grayscale with inverted colors to make the handwriting clearer.
- **Constrained instructions:** the prompt restricts the task to mathematics and enforces a structured output format; the model converts the equation to text and returns the final answer with its steps.
- **Validation:** if the equation is unclear, the system shows a warning instead of an unreliable result.
- **Parallel processing:** the call to the model runs in a separate thread, because a response can take several seconds, so the camera feed and hand tracking continue without freezing.

## Python Libraries Used

| Library | Role in the system |
|---|---|
| OpenCV (cv2) | Capturing the camera feed, displaying frames, drawing lines, buttons, and text |
| MediaPipe | Extracting hand landmark coordinates with a ready, pre-trained model |
| NumPy and math | Handling images as arrays, cropping screen regions, geometric calculations between coordinates |
| threading | Running the model call in the background without stopping the feed |
| requests, json, and base64 | Sending requests to Gemini, structuring data, and encoding the image for transmission |
| PIL, os, and dotenv | Rendering text with special encodings, managing files, keeping the API key outside the source code |

The project uses the ready-made MediaPipe Hands model without retraining or changing its weights; its output is adapted through mathematical conditions and geometric relationships between landmarks, so no additional training data was needed.

## Documented Results

The practical implementation showed that the system:

- Tracks the hand in real time and performs writing, drawing, color changes, partial and full erasing, and saving results.
- Runs with an ordinary webcam and mid-range computer hardware without relying on a GPU.
- Analyzes handwritten equations and displays their solution steps within the interface.

The book does not report quantitative measurements such as frames per second, gesture-recognition accuracy, the share of equations solved correctly, or the specifications of the test machine.

## Challenges and Limitations of the Current Version

- The system tracks one hand only and works in a standard environment with adequate lighting.
- **Landmark jitter** between frames can make strokes unstable; this was partly addressed with motion smoothing.
- **Finger self-occlusion** when the hand tilts can make gestures ambiguous.
- The lack of **depth** information in a webcam limits the ability to tell whether the hand is near or far.
- Dim light or strong backlighting, and fast movement that causes blur, reduce tracking accuracy.
- In equation analysis, some digits and symbols can be confused because of shaky strokes, fractions and exponents are hard to draw precisely, and the model may infer an inaccurate formula from unclear input.
- Equation solving depends on a cloud service and an internet connection.

## Possible Future Development

According to the outlook in the project:

- Tracking two or more hands for interactions such as zooming and collaborative work.
- Better stability under changing light through image pre-processing and light compensation.
- New gestures for controlling menus and navigating between screens.
- Connecting the board to e-learning platforms and video-conferencing apps.
- Lower response time and higher frame rates, especially on low-resource devices.
- Using the system for presentations, remote training, and augmented-reality applications.

## Planning a Similar System?

If you are working on an interactive system based on computer vision and tracking and need technical help developing the idea or building a prototype, you can contact the **Techno Enjaz office** to discuss your project's requirements and the appropriate scope of support.
