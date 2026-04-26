'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'amr-language'

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.skipToMain': 'Skip to main content',

    // Language Toggle
    'lang.current': 'English',
    'lang.switch': 'العربية',
    'lang.switchTo': 'Switch to Arabic',

    // Hero Section
    'hero.greeting': 'Hi, I\'m',
    'hero.name': 'Amr',
    'hero.title1': 'Full-Stack Developer',
    'hero.title2': 'Mobile App Developer',
    'hero.title3': 'UI/UX Designer',
    'hero.title4': 'Tech Consultant',
    'hero.description': 'I create exceptional digital experiences through innovative web applications and mobile solutions. Passionate about clean code, outstanding user experience, and cutting-edge technologies that deliver remarkable results.',
    'hero.badge1': '5+ Years of Experience',
    'hero.badge2': '50+ Projects Delivered',
    'hero.badge3': 'Full-Stack Expert',
    'hero.viewWork': 'View My Work',
    'hero.getInTouch': 'Get In Touch',
    'hero.availableForWork': 'Available for new projects',
    'hero.socialGithub': 'GitHub',
    'hero.socialLinkedin': 'LinkedIn',
    'hero.socialTwitter': 'Twitter',
    'hero.socialEmail': 'Email',

    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Passionate developer with a love for creating innovative digital solutions',
    'about.description1': 'With over 5 years of experience in web and mobile development, I specialize in creating scalable, user-friendly applications that solve real-world problems. My expertise spans frontend and backend technologies, with a particular focus on modern frameworks and industry best practices.',
    'about.description2': 'I believe in writing clean, maintainable code and staying current with the latest industry trends. When I\'m not coding, you can find me contributing to open-source projects, mentoring junior developers, or exploring emerging technologies.',
    'about.stat1': 'Projects Completed',
    'about.stat2': 'Years Experience',
    'about.stat3': 'Happy Clients',
    'about.photoPlaceholder': 'About Photo',
    'about.photoSubtext': 'Professional Image',
    'about.photoNote': 'Add about-image.jpg to public/assets/',

    // Skills Section
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'The tools and technologies I use to bring ideas to life',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.mobile': 'Mobile Development',
    'skills.tools': 'Tools & DevOps',
    'skills.learnMore': 'Learn more about',
    'skills.externalResource': 'external resource',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A showcase of my recent work and key achievements',
    'projects.project1.title': 'E-Commerce Platform',
    'projects.project1.description': 'Full-stack e-commerce solution featuring a React frontend, Node.js backend, and integrated payment processing. Key features include user authentication, comprehensive product management, and real-time inventory tracking.',
    'projects.project2.title': 'Task Management Mobile App',
    'projects.project2.description': 'Cross-platform mobile application built with React Native. Features include intuitive task creation, seamless team collaboration, push notifications, and robust offline synchronization capabilities.',
    'projects.project3.title': 'Real-Time Analytics Dashboard',
    'projects.project3.description': 'Interactive dashboard for comprehensive data visualization and analytics. Built with Vue.js and D3.js, featuring real-time data updates, fully customizable charts, and flexible export functionality.',
    'projects.project4.title': 'Social Media Platform',
    'projects.project4.description': 'Full-featured social media application with comprehensive user profiles, dynamic posts, interactive comments, real-time messaging, and intelligent content moderation. Built with modern web technologies and highly scalable architecture.',
    'projects.project5.title': 'Fitness Tracking App',
    'projects.project5.description': 'Native iOS and Android fitness application featuring comprehensive workout tracking, detailed progress analytics, engaging social features, and seamless integration with wearable devices. Built using Flutter for optimal cross-platform compatibility.',
    'projects.project6.title': 'AI-Powered Chatbot Platform',
    'projects.project6.description': 'Intelligent chatbot platform with advanced natural language processing, sophisticated machine learning capabilities, and flexible multi-channel deployment. Features comprehensive admin dashboard and detailed analytics for conversation insights.',
    'projects.liveDemo': 'Live Demo',
    'projects.github': 'GitHub',
    'projects.viewProject': 'View Project',

    // Experience Section
    'experience.title': 'Professional Experience',
    'experience.subtitle': 'My professional journey and key achievements',
    'experience.job1.period': '2022 - Present',
    'experience.job1.title': 'Senior Full-Stack Developer',
    'experience.job1.company': 'TechCorp Solutions',
    'experience.job1.description': 'Lead the development of enterprise web applications and mobile solutions. Manage a team of 5 developers and collaborate with cross-functional teams to deliver high-quality products. Successfully implemented CI/CD pipelines and improved deployment efficiency by 40%.',
    'experience.job2.period': '2020 - 2022',
    'experience.job2.title': 'Full-Stack Developer',
    'experience.job2.company': 'Digital Innovations Inc.',
    'experience.job2.description': 'Developed and maintained multiple client projects including e-commerce platforms, content management systems, and mobile applications. Collaborated closely with designers and product managers to create user-friendly interfaces and optimize the overall user experience.',
    'experience.job3.period': '2019 - 2020',
    'experience.job3.title': 'Frontend Developer',
    'experience.job3.company': 'StartupXYZ',
    'experience.job3.description': 'Focused on creating responsive and interactive user interfaces for web applications. Worked closely with UX/UI designers to implement pixel-perfect designs and ensure seamless cross-browser compatibility. Made significant contributions to the company\'s design system and component library.',
    'experience.job4.period': '2018 - 2019',
    'experience.job4.title': 'Junior Web Developer',
    'experience.job4.company': 'WebDev Agency',
    'experience.job4.description': 'Started my professional journey as a junior developer, working on various client websites and learning industry best practices. Gained valuable experience in both frontend and backend technologies while contributing to team projects and maintaining existing codebases.',

    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s discuss your next project or exciting opportunity',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.namePlaceholder': 'Your Name',
    'contact.form.emailPlaceholder': 'Your Email',
    'contact.form.subjectPlaceholder': 'Subject',
    'contact.form.messagePlaceholder': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Thank you! Your message has been sent successfully.',
    'contact.form.error': 'Something went wrong. Please try again.',
    'contact.form.fillFields': 'Please fill in all fields.',
    'contact.form.invalidEmail': 'Please enter a valid email address.',

    // Footer
    'footer.rights': 'All rights reserved.',

    // Theme Toggle
    'theme.switchToDark': 'Switch to dark theme',
    'theme.switchToLight': 'Switch to light theme',

    // Accessibility
    'a11y.openExternal': 'Opens in new window',
    'a11y.github': 'GitHub',
    'a11y.linkedin': 'LinkedIn',
    'a11y.twitter': 'Twitter',

    // Meta Tags
    'meta.title': 'Amr Khaled - Full Stack Developer & Tech Innovator',
    'meta.description': 'Full Stack Developer specializing in React, Node.js, Next.js, and modern web technologies. Creating innovative digital solutions and exceptional user experiences.',
    'meta.keywords': 'Full Stack Developer, React, Node.js, Next.js, JavaScript, TypeScript, Web Development, Mobile Development, UI/UX, Portfolio',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عني',
    'nav.skills': 'المهارات',
    'nav.projects': 'المشاريع',
    'nav.experience': 'الخبرة',
    'nav.contact': 'التواصل',
    'nav.skipToMain': 'انتقل إلى المحتوى الرئيسي',

    // Language Toggle
    'lang.current': 'العربية',
    'lang.switch': 'English',
    'lang.switchTo': 'التبديل إلى الإنجليزية',

    // Hero Section
    'hero.greeting': 'مرحباً، أنا',
    'hero.name': 'عمرو',
    'hero.title1': 'مطور ويب متكامل',
    'hero.title2': 'مطور تطبيقات الجوال',
    'hero.title3': 'مصمم واجهات المستخدم',
    'hero.title4': 'استشاري تقني',
    'hero.description': 'أقوم بإنشاء تجارب رقمية استثنائية من خلال تطبيقات الويب المبتكرة والحلول المحمولة. شغوف بالكود النظيف وتجربة المستخدم والتقنيات المتطورة لتقديم نتائج متميزة.',
    'hero.badge1': '+5 سنوات خبرة',
    'hero.badge2': '+50 مشروع منجز',
    'hero.badge3': 'خبير تطوير متكامل',
    'hero.viewWork': 'عرض أعمالي',
    'hero.getInTouch': 'تواصل معي',
    'hero.availableForWork': 'متاح لمشاريع جديدة',
    'hero.socialGithub': 'جيت هاب',
    'hero.socialLinkedin': 'لينكد إن',
    'hero.socialTwitter': 'تويتر',
    'hero.socialEmail': 'البريد الإلكتروني',

    // About Section
    'about.title': 'نبذة عني',
    'about.subtitle': 'مطور شغوف بحب إنشاء الحلول الرقمية',
    'about.description1': 'مع أكثر من 5 سنوات من الخبرة في تطوير الويب والجوال، أتخصص في إنشاء تطبيقات قابلة للتوسع وسهلة الاستخدام تحل المشاكل الحقيقية. خبرتي تمتد عبر تقنيات الواجهة الأمامية والخلفية، مع التركيز بشكل خاص على الأطر الحديثة وأفضل الممارسات.',
    'about.description2': 'أؤمن بكتابة كود نظيف وقابل للصيانة والبقاء على اطلاع بأحدث اتجاهات الصناعة. عندما لا أكون أبرمج، يمكنك أن تجدني أساهم في مشاريع مفتوحة المصدر، أو أرشد المطورين المبتدئين، أو أستكشف تقنيات جديدة.',
    'about.stat1': 'مشروع مكتمل',
    'about.stat2': 'سنة خبرة',
    'about.stat3': 'عميل راضي',
    'about.photoPlaceholder': 'صورة شخصية',
    'about.photoSubtext': 'صورة مهنية',
    'about.photoNote': 'أضف about-image.jpg إلى public/assets/',

    // Skills Section
    'skills.title': 'المهارات والتقنيات',
    'skills.subtitle': 'الأدوات والتقنيات التي أستخدمها لتحويل الأفكار إلى واقع',
    'skills.frontend': 'تطوير الواجهة الأمامية',
    'skills.backend': 'تطوير الواجهة الخلفية',
    'skills.mobile': 'تطوير التطبيقات المحمولة',
    'skills.tools': 'الأدوات والعمليات',
    'skills.learnMore': 'تعلم المزيد عن',
    'skills.externalResource': 'مصدر خارجي',

    // Projects Section
    'projects.title': 'المشاريع المميزة',
    'projects.subtitle': 'عرض لأحدث أعمالي وإنجازاتي',
    'projects.project1.title': 'منصة التجارة الإلكترونية',
    'projects.project1.description': 'حل تجارة إلكترونية متكامل مع واجهة React الأمامية وخادم Node.js الخلفي ومعالجة الدفع المتكاملة. تشمل الميزات المصادقة والمستخدمين وإدارة المنتجات وتتبع المخزون في الوقت الفعلي.',
    'projects.project2.title': 'تطبيق إدارة المهام للجوال',
    'projects.project2.description': 'تطبيق جوال متعدد المنصات مبني بـ React Native. يشمل إنشاء المهام والتعاون الجماعي والإشعارات الفورية وقدرات المزامنة دون اتصال.',
    'projects.project3.title': 'لوحة تحليلات في الوقت الفعلي',
    'projects.project3.description': 'لوحة تفاعلية لتصور البيانات والتحليلات. مبنية بـ Vue.js و D3.js، تتميز بتحديثات البيانات في الوقت الفعلي والرسوم البيانية القابلة للتخصيص ووظائف التصدير.',
    'projects.project4.title': 'منصة التواصل الاجتماعي',
    'projects.project4.description': 'تطبيق وسائل التواصل الاجتماعي كامل الميزات مع ملفات المستخدمين والمنشورات والتعليقات والرسائل الفورية وإدارة المحتوى. مبني بتقنيات ويب حديثة وهندسة قابلة للتوسع.',
    'projects.project5.title': 'تطبيق تتبع اللياقة البدنية',
    'projects.project5.description': 'تطبيق لياقة بدنية أصلي لـ iOS و Android مع تتبع التمارين وتحليلات التقدم والميزات الاجتماعية والتكامل مع الأجهزة القابلة للارتداء. مبني باستخدام Flutter للتوافق متعدد المنصات.',
    'projects.project6.title': 'منصة الدردشة الآلية المدعومة بالذكاء الاصطناعي',
    'projects.project6.description': 'منصة دردشة آلية ذكية مع معالجة اللغة الطبيعية وقدرات التعلم الآلي والنشر متعدد القنوات. تتميز بلوحة إدارة وتحليلات لرؤى المحادثات.',
    'projects.liveDemo': 'عرض مباشر',
    'projects.github': 'جيت هاب',
    'projects.viewProject': 'عرض المشروع',

    // Experience Section
    'experience.title': 'الخبرة المهنية',
    'experience.subtitle': 'رحلتي المهنية وإنجازاتي',
    'experience.job1.period': '2022 - الحاضر',
    'experience.job1.title': 'مطور ويب متكامل أول',
    'experience.job1.company': 'شركة تك كورب للحلول',
    'experience.job1.description': 'قيادة تطوير تطبيقات الويب المؤسسية والحلول المحمولة. إدارة فريق من 5 مطورين والتعاون مع فرق متعددة الوظائف لتقديم منتجات عالية الجودة. تنفيذ خطوط CI/CD وتحسين كفاءة النشر بنسبة 40%.',
    'experience.job2.period': '2020 - 2022',
    'experience.job2.title': 'مطور ويب متكامل',
    'experience.job2.company': 'شركة الابتكارات الرقمية',
    'experience.job2.description': 'تطوير وصيانة مشاريع عملاء متعددة بما في ذلك منصات التجارة الإلكترونية وأنظمة إدارة المحتوى وتطبيقات الجوال. التعاون مع المصممين ومديري المنتجات لإنشاء واجهات سهلة الاستخدام وتحسين تجربة المستخدم.',
    'experience.job3.period': '2019 - 2020',
    'experience.job3.title': 'مطور واجهة أمامية',
    'experience.job3.company': 'شركة ستارت أب إكس واي زد',
    'experience.job3.description': 'التركيز على إنشاء واجهات مستخدم متجاوبة وتفاعلية لتطبيقات الويب. العمل بشكل وثيق مع مصممي UX/UI لتنفيذ تصاميم دقيقة وضمان التوافق عبر المتصفحات. المساهمة في نظام التصميم ومكتبة المكونات للشركة.',
    'experience.job4.period': '2018 - 2019',
    'experience.job4.title': 'مطور ويب مبتدئ',
    'experience.job4.company': 'وكالة تطوير الويب',
    'experience.job4.description': 'بدأت رحلتي المهنية كمطور مبتدئ، أعمل على مواقع عملاء مختلفة وأتعلم أفضل ممارسات الصناعة. اكتسبت خبرة في تقنيات الواجهة الأمامية والخلفية أثناء المساهمة في مشاريع الفريق وصيانة قواعد الكود الموجودة.',

    // Contact Section
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'دعنا نناقش مشروعك القادم أو الفرصة',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.location': 'الموقع',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'الرسالة',
    'contact.form.namePlaceholder': 'اسمك',
    'contact.form.emailPlaceholder': 'بريدك الإلكتروني',
    'contact.form.subjectPlaceholder': 'الموضوع',
    'contact.form.messagePlaceholder': 'رسالتك',
    'contact.form.send': 'إرسال الرسالة',
    'contact.form.sending': 'جاري الإرسال...',
    'contact.form.success': 'شكراً لك! تم إرسال رسالتك بنجاح.',
    'contact.form.error': 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    'contact.form.fillFields': 'يرجى ملء جميع الحقول.',
    'contact.form.invalidEmail': 'يرجى إدخال عنوان بريد إلكتروني صحيح.',

    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',

    // Theme Toggle
    'theme.switchToDark': 'التبديل إلى الوضع المظلم',
    'theme.switchToLight': 'التبديل إلى الوضع المضيء',

    // Accessibility
    'a11y.openExternal': 'يفتح في نافذة جديدة',
    'a11y.github': 'جيت هاب',
    'a11y.linkedin': 'لينكد إن',
    'a11y.twitter': 'تويتر',

    // Meta Tags
    'meta.title': 'عمرو خالد - مطور ويب متكامل ومبتكر تقني',
    'meta.description': 'مطور ويب متكامل متخصص في React و Node.js و Next.js والتقنيات الحديثة. أقوم بإنشاء حلول رقمية مبتكرة وتجارب مستخدم استثنائية.',
    'meta.keywords': 'مطور ويب متكامل, React, Node.js, Next.js, JavaScript, TypeScript, تطوير الويب, تطوير التطبيقات المحمولة, UI/UX, معرض أعمال',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isLoading, setIsLoading] = useState(true)

  // Translation function
  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations['en']]
    return translation || key
  }

  // Set language with persistence and RTL handling
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)

    // Update document direction and lang attribute
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang

    // Update meta tags for better SEO
    const metaLang = document.querySelector('meta[name="language"]')
    if (metaLang) {
      metaLang.setAttribute('content', lang)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'language'
      meta.content = lang
      document.head.appendChild(meta)
    }
  }

  // Initialize language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language | null
    const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en'
    const initialLanguage = savedLanguage || browserLanguage

    setLanguageState(initialLanguage)
    document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = initialLanguage
    setIsLoading(false)
  }, [])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL: language === 'ar',
    isLoading
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
