export const teamMembers = [
  {
    id: 'abdulghani',
    name: 'م. عبد الغني الحمدي',
    nameEn: 'Eng. Abdulghani Alhamdi',
    title: 'م. عبد الغني الحمدي',
    titleEn: 'Eng. Abdulghani Alhamdi',
    role: 'مدير الفريق وقائد التطوير',
    roleEn: 'Team Director & Lead Architect',
    description: 'مدير الفريق وقائد المشاريع الهندسية',
    descriptionEn: 'Team Director & Engineering Projects Lead',
    department: 'الإدارة التقنية والقيادة',
    departmentEn: 'Technical Leadership & Management',
    specialization: '',
    specializationEn: '',
    image: '/images/team/abdulghani.jpg',
    link: '#team-showcase',
    bio: 'مدير الفريق، يتولى قيادة الاستراتيجية التقنية وإدارة المهام وتوجيه مهندسي الذكاء الاصطناعي والمطورين لضمان أعلى مستويات الابتكار والإتقان في المنتجات الرقمية.',
    bioEn: 'Team Director leading technical strategy, agile execution, and guiding AI engineers and developers to achieve excellence and innovation across digital products.',
    skills: ['قيادة الفرق التقنية', 'الاستراتيجية التكنولوجية', 'إدارة المشاريع المرنة', 'التوجيه والإشراف', 'الحلول السحابية'],
    skillsEn: ['Technical Leadership', 'Technology Strategy', 'Agile Management', 'Mentorship & Governance', 'Cloud Solutions'],
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
    name: 'م. عبد الهادي الكيلاني',
    nameEn: 'Eng. Abdulhady Alkilani',
    title: 'م. عبد الهادي الكيلاني',
    titleEn: 'Eng. Abdulhady Alkilani',
    role: 'مهندس برمجيات وذكاء اصطناعي',
    roleEn: 'Software & AI Engineer',
    description: 'مهندس برمجيات ونظم ذكية',
    descriptionEn: 'Full-Stack Software & Intelligent Systems Engineer',
    department: 'قسم هندسة البرمجيات والأنظمة الذكية',
    departmentEn: 'Software & Intelligent Systems Department',
    specialization: '',
    specializationEn: '',
    image: '/images/team/abdulhady.jpg',
    link: '#team-showcase',
    bio: 'مهندس برمجيات وتطوير شامل متخصص في بناء الأنظمة والخدمات السحابية وتطبيقات الموبايل الحديثة، مع توظيف نماذج الذكاء الاصطناعي وواجهات API عالية الأداء.',
    bioEn: 'Full-Stack Software Engineer specialized in cloud architectures, modern mobile applications, and AI model integrations with high-performance APIs.',
    skills: ['هندسة البرمجيات', 'تطبيقات الموبايل', 'الذكاء الاصطناعي', 'RESTful APIs', 'قواعد البيانات', 'هندسة النظم السحابية'],
    skillsEn: ['Software Engineering', 'Mobile Applications', 'Artificial Intelligence', 'RESTful APIs', 'Databases', 'Cloud Systems'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/abdulhadyalkilani?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/Abdulhady-Alkilani',
      facebook: 'https://www.facebook.com/abdulhady.alkilani?mibextid=ZbWKwL'
    },
    projects: [
      { name: 'منظومات الويب والأنظمة الذكية', desc: 'تطوير حلول برمجية متقدمة تربط التطبيقات بالخدمات السحابية ونماذج الذكاء الاصطناعي' }
    ],
    projectsEn: [
      { name: 'Intelligent Web & Mobile Systems', desc: 'End-to-end development bridging cross-platform applications with cloud services and AI APIs' }
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
    image: '/images/team/team-placeholder.png',
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
    image: '/images/team/team-placeholder.png',
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
    image: '/images/team/team-placeholder.png',
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
    image: '/images/team/team-placeholder.png',
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
    image: '/images/team/team-placeholder.png',
    link: '#team-showcase',
    bio: 'مقعد شاغر مخصص لنخبة المطورين والمهندسين للانضمام إلى فريق تكنو إنجاز قريباً.',
    bioEn: 'Reserved seat for elite software and AI engineers joining the Techno Enjaz core team soon.'
  }
];

export default teamMembers;
