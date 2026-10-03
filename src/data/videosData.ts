const droneNanoImg = '/images/videos/video-drone-nano.768.avif';
const armWeldingImg = '/images/videos/video-arm-welding.768.avif';
const armVisionImg = '/images/videos/video-arm-vision.768.avif';

export interface VideoItem {
  id: string;
  title: string;
  titleEn: string;
  tag: string;
  tagEn: string;
  duration: string;
  cover: any;
  youtubeUrl: string;
  description: string;
  descriptionEn: string;
}

export const videosList: VideoItem[] = [
  {
    id: 'video-drone-nano',
    title: 'طائرة درون ذكية بمتحكم Arduino وبث ESP-CAM اللحظي',
    titleEn: 'Autonomous Smart Drone with Arduino & Real-Time ESP-CAM Streaming',
    tag: 'أنظمة طيران مسيّر',
    tagEn: 'Smart Drone',
    duration: '01:07',
    cover: (droneNanoImg as any)?.src || droneNanoImg,
    youtubeUrl: 'https://www.youtube.com/watch?v=4Sew-i8sB2s',
    description: 'استعراض هندسي متكامل لطائرة درون تعتمد على معالجة استقرار الجايروسكوب، والاتصال اللاسلكي RF433، والبث المرئي الحي عبر ESP-CAM بدقة واحترافية.',
    descriptionEn: 'An integrated quadcopter engineering design combining gyro flight stabilization, RF433 wireless control, and real-time ESP-CAM video streaming.'
  },
  {
    id: 'video-arm-welding',
    title: 'ذراع روبوتية صناعية متقدمة للحام الدقيق بغاز الأرجون',
    titleEn: 'Industrial Robotic Arm for High-Precision Argon Welding',
    tag: 'ميكاترونيكس وروبوتات',
    tagEn: 'Industrial Robotics',
    duration: '01:12',
    cover: (armWeldingImg as any)?.src || armWeldingImg,
    youtubeUrl: 'https://www.youtube.com/watch?v=L2ya6z4tZhg',
    description: 'تطوير ذراع روبوتية متعددة المحاور مبرمجة للأتمتة الصناعية ولحام المعادن فائق الدقة باستخدام غاز الأرجون مع تحكم ميكاترونيكي سلس وموثوق.',
    descriptionEn: 'Development of a multi-axis robotic arm engineered for industrial automation and high-precision argon welding with seamless mechatronic control.'
  },
  {
    id: 'video-arm-vision',
    title: 'التحكم في الذراع الروبوتية بالرؤية الحاسوبية والذكاء الاصطناعي',
    titleEn: 'Vision-Guided AI Robotic Arm Control with Python & OpenCV',
    tag: 'رؤية حاسوبية',
    tagEn: 'Computer Vision',
    duration: '00:16',
    cover: (armVisionImg as any)?.src || armVisionImg,
    youtubeUrl: 'https://www.youtube.com/watch?v=poKdf5HdaAM',
    description: 'ربط خوارزميات الرؤية الحاسوبية في بايثون مع متحكمات الأردوينو لتتبع الأجسام بالزمن الحقيقي وتوجيه الذراع الروبوتية لمناولتها ذاتياً بدقة فائقة.',
    descriptionEn: 'Real-time integration of computer vision algorithms in Python with Arduino microcontrollers for autonomous object tracking and manipulation.'
  }
];
