export const teamMembers = [
  {
    id: 'abdulghani',
    name: 'عبد الغني',
    nameEn: 'Abdulghani',
    title: 'عبد الغني',
    titleEn: 'Abdulghani',
    role: 'مدير الفريق وقائد التطوير',
    roleEn: 'Team Director & Lead Architect',
    description: 'مدير الفريق وقائد المشاريع الهندسية',
    descriptionEn: 'Team Director & Engineering Projects Lead',
    department: 'الإدارة التقنية والقيادة',
    departmentEn: 'Technical Leadership & Management',
    specialization: 'معمارية النظم والذكاء الاصطناعي',
    specializationEn: 'System Architecture & AI Leadership',
    image: '/abdulghani.jpg',
    link: '#team-showcase',
    bio: 'مدير الفريق، يتولى قيادة الاستراتيجية التقنية وإدارة المهام وتوجيه مهندسي الذكاء الاصطناعي والمطورين لضمان أعلى مستويات الابتكار والإتقان في المنتجات الرقمية.',
    bioEn: 'Team Director leading technical strategy, agile execution, and guiding AI engineers and developers to achieve excellence and innovation across digital products.',
    skills: ['قيادة الفرق التقنية', 'الاستراتيجية التكنولوجية', 'معمارية النظم والذكاء الاصطناعي', 'إدارة المشاريع المرنة', 'التوجيه والإشراف'],
    skillsEn: ['Technical Leadership', 'Technology Strategy', 'AI & System Architecture', 'Agile Management', 'Mentorship & Governance'],
    socials: {
      linkedin: 'https://linkedin.com/in/abdulghani',
      github: 'https://github.com/abdulghani',
      email: 'abdulghani@company.com'
    },
    projects: [
      { name: 'استراتيجية تطوير النظام المتكامل', desc: 'إعادة هيكلة بنية الفريق التقني ورفع الإنتاجية بنسبة 50%' },
      { name: 'قيادة إطلاق المنظومة الذكية', desc: 'إشراف مباشر على دمج نماذج الذكاء الاصطناعي مع الواجهات والخدمات السحابية' }
    ],
    projectsEn: [
      { name: 'Enterprise Modernization Strategy', desc: 'Restructuring core infrastructure, boosting overall team velocity by 50%' },
      { name: 'Intelligent Platform Rollout', desc: 'Direct supervision of AI model integration across cloud and web services' }
    ],
    email: 'abdulghani@company.com',
    location: 'حماة، سوريا',
    locationEn: 'Hama, Syria'
  },
  {
    id: 'abdulhady-alkilani',
    name: 'عبد الهادي الكيلاني',
    nameEn: 'Abdulhady Alkilani',
    title: 'عبد الهادي الكيلاني',
    titleEn: 'Abdulhady Alkilani',
    role: 'مهندس برمجيات وتكامل الذكاء الاصطناعي',
    roleEn: 'Full-Stack Developer & AI Integration',
    description: 'مهندس برمجيات متخصص في Laravel وFlutter وتكامل الذكاء الاصطناعي',
    descriptionEn: 'Full-Stack & Mobile Developer specializing in Laravel, Flutter, and AI Integration',
    department: 'قسم هندسة البرمجيات وتطبيقات الموبايل',
    departmentEn: 'Software & Mobile Engineering Department',
    specialization: 'Laravel & Flutter',
    specializationEn: 'Laravel & Flutter',
    image: '/abdulhady.jpg',
    link: '#team-showcase',
    bio: 'مهندس برمجيات وتطوير شامل متخصص في بناء الأنظمة الخلفية والخدمات السحابية باستخدام Laravel وتطبيقات الموبايل الحديثة عبر Flutter، مع ربط وتكامل نماذج الذكاء الاصطناعي وواجهات API عالية الأداء.',
    bioEn: 'Full-Stack Software Engineer specialized in robust Laravel backends, cross-platform mobile apps with Flutter, and seamless AI model integrations with high-performance APIs.',
    skills: ['Laravel', 'Flutter', 'AI Integration', 'RESTful APIs', 'قواعد البيانات', 'هندسة البرمجيات الشاملة'],
    skillsEn: ['Laravel', 'Flutter', 'AI Integration', 'RESTful APIs', 'Databases', 'Full-Stack Engineering'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/abdulhadyalkilani?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/Abdulhady-Alkilani',
      facebook: 'https://www.facebook.com/abdulhady.alkilani?mibextid=ZbWKwL'
    },
    projects: [
      { name: 'منظومات الويب وتطبيقات الموبايل المتكاملة', desc: 'تطوير حلول برمجية متكاملة تربط تطبيقات Flutter بخدمات Laravel السحابية ونماذج الذكاء الاصطناعي' }
    ],
    projectsEn: [
      { name: 'Integrated Mobile & Cloud Systems', desc: 'End-to-end development bridging Flutter cross-platform applications with Laravel cloud services and AI APIs' }
    ],
    location: 'حماة، سوريا',
    locationEn: 'Hama, Syria'
  }
];

// الدوائر الخاصة بـ Circle Map (السيركل ماب) للتيم مع الحفاظ على الدوائر الشاغرة لإضافة باقي التيم لاحقاً
export const teamCircleSlots = [
  ...teamMembers,
  {
    id: 'team-slot-3',
    isPlaceholder: true,
    name: 'عضو الفريق القادم',
    nameEn: 'Future Team Member',
    title: 'عضو الفريق القادم',
    titleEn: 'Future Team Member',
    role: 'مقعد هندسي شاغر',
    roleEn: 'Reserved Engineering Seat',
    description: 'نعمل على استقطاب نخبة الكفاءات الهندسية للانضمام للفريق',
    descriptionEn: 'Expanding our engineering team with elite talent',
    department: 'قسم التطوير والابتكار',
    departmentEn: 'Innovation & Development Department',
    specialization: 'انضم إلى فريقنا',
    specializationEn: 'Join our team',
    image: '/team-placeholder.png',
    link: '#team-showcase',
    bio: 'مقعد شاغر مخصص لنخبة المطورين والمهندسين للانضمام إلى فريق تكنو إنجاز قريباً.',
    bioEn: 'Reserved seat for elite software and AI engineers joining the Techno Enjaz core team soon.'
  },
  {
    id: 'team-slot-4',
    isPlaceholder: true,
    name: 'عضو الفريق القادم',
    nameEn: 'Future Team Member',
    title: 'عضو الفريق القادم',
    titleEn: 'Future Team Member',
    role: 'مقعد هندسي شاغر',
    roleEn: 'Reserved Engineering Seat',
    description: 'نعمل على استقطاب نخبة الكفاءات الهندسية للانضمام للفريق',
    descriptionEn: 'Expanding our engineering team with elite talent',
    department: 'قسم التطوير والابتكار',
    departmentEn: 'Innovation & Development Department',
    specialization: 'انضم إلى فريقنا',
    specializationEn: 'Join our team',
    image: '/team-placeholder.png',
    link: '#team-showcase',
    bio: 'مقعد شاغر مخصص لنخبة المطورين والمهندسين للانضمام إلى فريق تكنو إنجاز قريباً.',
    bioEn: 'Reserved seat for elite software and AI engineers joining the Techno Enjaz core team soon.'
  },
  {
    id: 'team-slot-5',
    isPlaceholder: true,
    name: 'عضو الفريق القادم',
    nameEn: 'Future Team Member',
    title: 'عضو الفريق القادم',
    titleEn: 'Future Team Member',
    role: 'مقعد هندسي شاغر',
    roleEn: 'Reserved Engineering Seat',
    description: 'نعمل على استقطاب نخبة الكفاءات الهندسية للانضمام للفريق',
    descriptionEn: 'Expanding our engineering team with elite talent',
    department: 'قسم التطوير والابتكار',
    departmentEn: 'Innovation & Development Department',
    specialization: 'انضم إلى فريقنا',
    specializationEn: 'Join our team',
    image: '/team-placeholder.png',
    link: '#team-showcase',
    bio: 'مقعد شاغر مخصص لنخبة المطورين والمهندسين للانضمام إلى فريق تكنو إنجاز قريباً.',
    bioEn: 'Reserved seat for elite software and AI engineers joining the Techno Enjaz core team soon.'
  },
  {
    id: 'team-slot-6',
    isPlaceholder: true,
    name: 'عضو الفريق القادم',
    nameEn: 'Future Team Member',
    title: 'عضو الفريق القادم',
    titleEn: 'Future Team Member',
    role: 'مقعد هندسي شاغر',
    roleEn: 'Reserved Engineering Seat',
    description: 'نعمل على استقطاب نخبة الكفاءات الهندسية للانضمام للفريق',
    descriptionEn: 'Expanding our engineering team with elite talent',
    department: 'قسم التطوير والابتكار',
    departmentEn: 'Innovation & Development Department',
    specialization: 'انضم إلى فريقنا',
    specializationEn: 'Join our team',
    image: '/team-placeholder.png',
    link: '#team-showcase',
    bio: 'مقعد شاغر مخصص لنخبة المطورين والمهندسين للانضمام إلى فريق تكنو إنجاز قريباً.',
    bioEn: 'Reserved seat for elite software and AI engineers joining the Techno Enjaz core team soon.'
  },
  {
    id: 'team-slot-7',
    isPlaceholder: true,
    name: 'عضو الفريق القادم',
    nameEn: 'Future Team Member',
    title: 'عضو الفريق القادم',
    titleEn: 'Future Team Member',
    role: 'مقعد هندسي شاغر',
    roleEn: 'Reserved Engineering Seat',
    description: 'نعمل على استقطاب نخبة الكفاءات الهندسية للانضمام للفريق',
    descriptionEn: 'Expanding our engineering team with elite talent',
    department: 'قسم التطوير والابتكار',
    departmentEn: 'Innovation & Development Department',
    specialization: 'انضم إلى فريقنا',
    specializationEn: 'Join our team',
    image: '/team-placeholder.png',
    link: '#team-showcase',
    bio: 'مقعد شاغر مخصص لنخبة المطورين والمهندسين للانضمام إلى فريق تكنو إنجاز قريباً.',
    bioEn: 'Reserved seat for elite software and AI engineers joining the Techno Enjaz core team soon.'
  }
];

export default teamMembers;
