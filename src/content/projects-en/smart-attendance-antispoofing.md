# Smart Face Attendance with Anti-Spoofing

A fully integrated intelligent system for **automated student attendance** built on AI, computer vision, and IoT — replacing traditional methods with a contactless face-recognition solution using deep learning models, combined with liveness detection (anti-spoofing) to eliminate proxy attendance.

The system captures student images through connected cameras, extracts facial embeddings stored in a central database, then performs instant matching during lectures to register attendance automatically.

## Technical Environment

- Python
- FaceNet512
- Anti-Spoofing
- SQLite
- Multithreading
- NodeMCU ESP8266
- CustomTkinter
- Pandas
- OpenPyXL
- OpenCV

## Key capabilities

- **Deep recognition:** FaceNet512 extracts unique 512-dimensional facial embeddings, robust to changing lighting.
- **Anti-spoofing:** texture and 3D-depth analysis distinguishes live faces from printed photos or screen replays.
- **Concurrent processing:** live streams from multiple rooms (up to 4) handled simultaneously via multithreading.
- **IoT feedback:** a NodeMCU ESP8266 receives recognition results wirelessly to light green/red LED indicators instantly.

## Management and reporting

The system manages class sessions, rooms, and courses, generating accurate reports and statistics with Python, Pandas, and OpenPyXL, plus a modern CustomTkinter GUI for managing educational operations.

## Impact

The system is a practical model of AI and communications applications in smart educational environments, addressing wasted lecture time, unreliable paper records, and the administrative burden of manual data entry.
