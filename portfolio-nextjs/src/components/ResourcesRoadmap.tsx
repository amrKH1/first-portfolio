'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code,
  Smartphone,
  Brain,
  Database,
  Palette,
  Globe,
  BookOpen,
  Video,
  DollarSign,
  Wrench,
  ChevronRight,
  CheckCircle,
  Circle,
  ArrowRight,
  Lightbulb,
  Target,
  Users,
  Clock,
  TrendingUp,
  Zap,
  Star,
  Map,
  Layers,
  GitBranch,
  Terminal,
  Server,
  Layout,
  Cpu,
  FileText,
  Youtube
} from 'lucide-react'

interface RoadmapStep {
  id: string
  title: string
  description: string
  duration: string
  resources: {
    articles: { title: string; url: string; type: 'free' | 'paid' }[]
    courses: { title: string; url: string; price?: string }[]
    videos: { title: string; url: string; channel: string }[]
    tools: { name: string; description: string; url: string }[]
  }
  completed?: boolean
}

interface Roadmap {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  targetAudience: string
  outcome: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  color: string
  steps: RoadmapStep[]
  tips: string[]
}

const ResourcesRoadmap = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'articles' | 'courses' | 'videos' | 'tools'>('articles')

  const roadmaps: Roadmap[] = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      icon: <Layout className="w-6 h-6" />,
      description: 'Master modern web development from HTML/CSS to React and beyond',
      targetAudience: 'Beginners who want to build beautiful, interactive websites',
      outcome: 'Build production-ready web applications with modern frameworks',
      duration: '6-8 months',
      difficulty: 'Beginner',
      color: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      steps: [
        {
          id: 'html-css',
          title: 'HTML & CSS Fundamentals',
          description: 'Master the foundation of web development - structure and styling',
          duration: '3-4 weeks',
          resources: {
            articles: [
              { title: 'MDN HTML Complete Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'free' },
              { title: 'MDN CSS Complete Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', type: 'free' },
              { title: 'CSS Tricks - Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'free' },
              { title: 'CSS Grid Complete Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'free' },
              { title: 'Frontend Masters CSS In-Depth', url: 'https://frontendmasters.com/courses/css-in-depth-v2/', type: 'paid' },
              { title: 'Smashing Magazine CSS Articles', url: 'https://www.smashingmagazine.com/category/css', type: 'free' }
            ],
            courses: [
              { title: 'The Complete HTML & CSS Course 2024', url: 'https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/', price: '$49.99' },
              { title: 'Build Responsive Real-World Websites', url: 'https://www.udemy.com/course/advanced-css-and-sass/', price: '$84.99' },
              { title: 'CSS - The Complete Guide (incl. Flexbox, Grid)', url: 'https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/', price: '$59.99' },
              { title: 'FreeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', price: 'Free' }
            ],
            videos: [
              { title: 'HTML Full Course - Build a Website', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', channel: 'FreeCodeCamp' },
              { title: 'CSS Full Course - Zero to Hero', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', channel: 'FreeCodeCamp' },
              { title: 'Flexbox in 100 Seconds', url: 'https://www.youtube.com/watch?v=K74l26pE4YA', channel: 'Fireship' },
              { title: 'Learn CSS Grid in 20 Minutes', url: 'https://www.youtube.com/watch?v=9zBsdzdE4sM', channel: 'Web Dev Simplified' },
              { title: 'Responsive Web Design Tutorial', url: 'https://www.youtube.com/watch?v=srvUrASNj0s', channel: 'Kevin Powell' }
            ],
            tools: [
              { name: 'Visual Studio Code', description: 'Best code editor for web development', url: 'https://code.visualstudio.com/' },
              { name: 'Chrome DevTools', description: 'Browser debugging and testing tools', url: 'https://developer.chrome.com/docs/devtools/' },
              { name: 'CodePen', description: 'Online HTML/CSS/JS playground', url: 'https://codepen.io/' },
              { name: 'Can I Use', description: 'Browser compatibility checker', url: 'https://caniuse.com/' },
              { name: 'CSS Validator', description: 'W3C CSS validation service', url: 'https://jigsaw.w3.org/css-validator/' }
            ]
          }
        },
        {
          id: 'javascript',
          title: 'JavaScript Programming',
          description: 'Learn programming fundamentals and modern JavaScript ES6+',
          duration: '6-8 weeks',
          resources: {
            articles: [
              { title: 'JavaScript.info - Modern Tutorial', url: 'https://javascript.info/', type: 'free' },
              { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type: 'free' },
              { title: 'You Don\'t Know JS (Book Series)', url: 'https://github.com/getify/You-Dont-Know-JS', type: 'free' },
              { title: 'Eloquent JavaScript (Online Book)', url: 'https://eloquentjavascript.net/', type: 'free' },
              { title: 'JavaScript30 - 30 Day Challenge', url: 'https://javascript30.com/', type: 'free' },
              { title: 'ES6 Features Complete Guide', url: 'http://es6-features.org/', type: 'free' }
            ],
            courses: [
              { title: 'The Complete JavaScript Course 2024', url: 'https://www.udemy.com/course/the-complete-javascript-course/', price: '$89.99' },
              { title: 'JavaScript: Understanding the Weird Parts', url: 'https://www.udemy.com/course/understand-javascript/', price: '$74.99' },
              { title: 'Modern JavaScript From The Beginning', url: 'https://www.udemy.com/course/modern-javascript-from-the-beginning/', price: '$49.99' },
              { title: 'JavaScript Algorithms and Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', price: 'Free' }
            ],
            videos: [
              { title: 'JavaScript Full Course for Beginners', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', channel: 'FreeCodeCamp' },
              { title: 'JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c', channel: 'Traversy Media' },
              { title: 'Async JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=PoRJizFvM7s', channel: 'Traversy Media' },
              { title: 'JavaScript ES6 Tutorial', url: 'https://www.youtube.com/watch?v=WZQc7RUAg18', channel: 'Dev Ed' },
              { title: 'JavaScript DOM Manipulation', url: 'https://www.youtube.com/watch?v=5fb2aPlgoys', channel: 'Web Dev Simplified' }
            ],
            tools: [
              { name: 'Node.js', description: 'JavaScript runtime for server-side', url: 'https://nodejs.org/' },
              { name: 'npm', description: 'Package manager for JavaScript', url: 'https://www.npmjs.com/' },
              { name: 'Babel', description: 'JavaScript compiler for ES6+', url: 'https://babeljs.io/' },
              { name: 'ESLint', description: 'JavaScript linting utility', url: 'https://eslint.org/' },
              { name: 'Webpack', description: 'Module bundler for JavaScript', url: 'https://webpack.js.org/' }
            ]
          }
        },
        {
          id: 'react',
          title: 'React & Modern Frameworks',
          description: 'Build interactive UIs with React, Next.js, and modern tools',
          duration: '8-10 weeks',
          resources: {
            articles: [
              { title: 'React Official Documentation', url: 'https://react.dev/', type: 'free' },
              { title: 'React Patterns & Best Practices', url: 'https://www.patterns.dev/posts/reactpatterns/', type: 'free' },
              { title: 'Next.js Documentation', url: 'https://nextjs.org/docs', type: 'free' },
              { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'free' },
              { title: 'React Hook Form Guide', url: 'https://react-hook-form.com/get-started', type: 'free' },
              { title: 'Redux Toolkit Documentation', url: 'https://redux-toolkit.js.org/', type: 'free' }
            ],
            courses: [
              { title: 'React - The Complete Guide 2024', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', price: '$99.99' },
              { title: 'Complete Next.js Developer', url: 'https://www.udemy.com/course/complete-nextjs-developer-zero-to-mastery/', price: '$84.99' },
              { title: 'Epic React by Kent C. Dodds', url: 'https://epicreact.dev/', price: '$599' },
              { title: 'Full Stack Open - React Course', url: 'https://fullstackopen.com/en/', price: 'Free' }
            ],
            videos: [
              { title: 'React Course - Beginner to Advanced', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', channel: 'FreeCodeCamp' },
              { title: 'Next.js 14 Full Course', url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', channel: 'JavaScript Mastery' },
              { title: 'React Hooks Crash Course', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', channel: 'Traversy Media' },
              { title: 'React Testing Tutorial', url: 'https://www.youtube.com/watch?v=8Xwq35cPwYg', channel: 'Codevolution' },
              { title: 'React Performance Optimization', url: 'https://www.youtube.com/watch?v=b0IZo2Aho9Y', channel: 'Web Dev Simplified' }
            ],
            tools: [
              { name: 'Create React App', description: 'React app bootstrapping tool', url: 'https://create-react-app.dev/' },
              { name: 'Next.js', description: 'Full-stack React framework', url: 'https://nextjs.org/' },
              { name: 'Vite', description: 'Fast build tool for React', url: 'https://vitejs.dev/' },
              { name: 'React DevTools', description: 'Browser extension for debugging', url: 'https://react.dev/learn/react-developer-tools' },
              { name: 'Vercel', description: 'Deployment platform for React apps', url: 'https://vercel.com/' }
            ]
          }
        },
        {
          id: 'advanced-frontend',
          title: 'Advanced Frontend Topics',
          description: 'State management, testing, performance optimization, and PWAs',
          duration: '4-6 weeks',
          resources: {
            articles: [
              { title: 'Web Performance Optimization Guide', url: 'https://web.dev/fast/', type: 'free' },
              { title: 'Progressive Web Apps Guide', url: 'https://web.dev/progressive-web-apps/', type: 'free' },
              { title: 'Frontend Testing Best Practices', url: 'https://testingjavascript.com/', type: 'paid' },
              { title: 'Web Accessibility Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/', type: 'free' },
              { title: 'SEO for Developers', url: 'https://developers.google.com/search/docs', type: 'free' }
            ],
            courses: [
              { title: 'Testing React with Jest and RTL', url: 'https://www.udemy.com/course/react-testing-library/', price: '$54.99' },
              { title: 'Web Performance Masterclass', url: 'https://frontendmasters.com/courses/web-perf/', price: '$39/month' },
              { title: 'Progressive Web Apps Course', url: 'https://www.udemy.com/course/progressive-web-apps/', price: '$49.99' }
            ],
            videos: [
              { title: 'Web Performance Explained', url: 'https://www.youtube.com/watch?v=z8mDJvHE-sY', channel: 'Google Chrome Developers' },
              { title: 'React Testing Crash Course', url: 'https://www.youtube.com/watch?v=OVNjsIto9xM', channel: 'Laith Academy' },
              { title: 'PWA Tutorial', url: 'https://www.youtube.com/watch?v=WbbAPfDVqfY', channel: 'The Net Ninja' }
            ],
            tools: [
              { name: 'Lighthouse', description: 'Performance auditing tool', url: 'https://developers.google.com/web/tools/lighthouse' },
              { name: 'Jest', description: 'JavaScript testing framework', url: 'https://jestjs.io/' },
              { name: 'Cypress', description: 'E2E testing framework', url: 'https://www.cypress.io/' },
              { name: 'Bundle Analyzer', description: 'Webpack bundle analyzer', url: 'https://github.com/webpack-contrib/webpack-bundle-analyzer' }
            ]
          }
        }
      ],
      tips: [
        'Practice building real projects, not just following tutorials',
        'Join developer communities and participate in discussions',
        'Contribute to open source projects to gain experience',
        'Build a portfolio website to showcase your work',
        'Stay updated with the latest web development trends'
      ]
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      icon: <Server className="w-6 h-6" />,
      description: 'Build robust server-side applications and APIs',
      targetAudience: 'Developers who want to handle server logic and databases',
      outcome: 'Design and implement scalable backend systems',
      duration: '6-9 months',
      difficulty: 'Intermediate',
      color: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      steps: [
        {
          id: 'programming-basics',
          title: 'Programming Fundamentals',
          description: 'Master a backend programming language (Node.js, Python, or Java)',
          duration: '4-6 weeks',
          resources: {
            articles: [
              { title: 'Node.js Official Documentation', url: 'https://nodejs.org/docs/', type: 'free' },
              { title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'free' },
              { title: 'Java Programming Guide', url: 'https://docs.oracle.com/javase/tutorial/', type: 'free' },
              { title: 'Backend Development Roadmap', url: 'https://roadmap.sh/backend', type: 'free' },
              { title: 'Clean Code Principles', url: 'https://www.freecodecamp.org/news/clean-coding-for-beginners/', type: 'free' }
            ],
            courses: [
              { title: 'Node.js - The Complete Guide', url: 'https://www.udemy.com/course/nodejs-the-complete-guide/', price: '$84.99' },
              { title: 'Python for Backend Development', url: 'https://www.udemy.com/course/python-django-the-practical-guide/', price: '$74.99' },
              { title: 'Java Spring Boot Masterclass', url: 'https://www.udemy.com/course/spring-boot-master-class/', price: '$89.99' },
              { title: 'Backend Developer Bootcamp', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', price: 'Free' }
            ],
            videos: [
              { title: 'Node.js Full Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', channel: 'FreeCodeCamp' },
              { title: 'Express.js Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', channel: 'Traversy Media' },
              { title: 'Python Backend Tutorial', url: 'https://www.youtube.com/watch?v=jBzwzrDvZ18', channel: 'Programming with Mosh' },
              { title: 'Java Spring Boot Tutorial', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U', channel: 'Amigoscode' }
            ],
            tools: [
              { name: 'Postman', description: 'API testing and documentation', url: 'https://www.postman.com/' },
              { name: 'Insomnia', description: 'REST client for API testing', url: 'https://insomnia.rest/' },
              { name: 'Thunder Client', description: 'VS Code API testing extension', url: 'https://www.thunderclient.com/' },
              { name: 'npm/yarn', description: 'Package managers for Node.js', url: 'https://www.npmjs.com/' }
            ]
          }
        },
        {
          id: 'databases',
          title: 'Database Management',
          description: 'Master both SQL and NoSQL databases',
          duration: '4-6 weeks',
          resources: {
            articles: [
              { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', type: 'free' },
              { title: 'MongoDB University', url: 'https://university.mongodb.com/', type: 'free' },
              { title: 'MySQL Tutorial', url: 'https://dev.mysql.com/doc/mysql-tutorial-excerpt/', type: 'free' },
              { title: 'Redis Documentation', url: 'https://redis.io/documentation', type: 'free' },
              { title: 'Database Design Best Practices', url: 'https://www.vertabelo.com/blog/database-design-best-practices/', type: 'free' }
            ],
            courses: [
              { title: 'Complete SQL + Databases Bootcamp', url: 'https://www.udemy.com/course/complete-sql-databases-bootcamp-zero-to-mastery/', price: '$79.99' },
              { title: 'MongoDB - The Complete Developer Guide', url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/', price: '$69.99' },
              { title: 'Database Design & PostgreSQL', url: 'https://www.udemy.com/course/database-design/', price: '$54.99' }
            ],
            videos: [
              { title: 'SQL Full Course', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', channel: 'FreeCodeCamp' },
              { title: 'MongoDB Crash Course', url: 'https://www.youtube.com/watch?v=ofme2o29ngU', channel: 'Web Dev Simplified' },
              { title: 'Database Design Course', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc', channel: 'FreeCodeCamp' },
              { title: 'Redis Crash Course', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ', channel: 'Web Dev Simplified' }
            ],
            tools: [
              { name: 'MongoDB Compass', description: 'GUI for MongoDB', url: 'https://www.mongodb.com/products/compass' },
              { name: 'pgAdmin', description: 'PostgreSQL management tool', url: 'https://www.pgadmin.org/' },
              { name: 'DBeaver', description: 'Universal database tool', url: 'https://dbeaver.io/' },
              { name: 'TablePlus', description: 'Modern database management', url: 'https://tableplus.com/' }
            ]
          }
        },
        {
          id: 'api-development',
          title: 'API Design & Development',
          description: 'Build RESTful APIs and learn GraphQL',
          duration: '3-4 weeks',
          resources: {
            articles: [
              { title: 'REST API Best Practices', url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/', type: 'free' },
              { title: 'GraphQL Documentation', url: 'https://graphql.org/learn/', type: 'free' },
              { title: 'API Security Guide', url: 'https://owasp.org/www-project-api-security/', type: 'free' },
              { title: 'OpenAPI Specification', url: 'https://swagger.io/specification/', type: 'free' }
            ],
            courses: [
              { title: 'REST APIs with Node.js', url: 'https://www.udemy.com/course/nodejs-api-masterclass/', price: '$74.99' },
              { title: 'GraphQL with Node.js', url: 'https://www.udemy.com/course/graphql-bootcamp/', price: '$69.99' }
            ],
            videos: [
              { title: 'REST API Design Best Practices', url: 'https://www.youtube.com/watch?v=1Wl-rtew1_E', channel: 'Coding Tech' },
              { title: 'GraphQL Full Course', url: 'https://www.youtube.com/watch?v=ed8SzALpx1Q', channel: 'FreeCodeCamp' }
            ],
            tools: [
              { name: 'Swagger', description: 'API documentation', url: 'https://swagger.io/' },
              { name: 'GraphQL Playground', description: 'GraphQL IDE', url: 'https://github.com/graphql/graphql-playground' }
            ]
          }
        },
        {
          id: 'authentication',
          title: 'Authentication & Security',
          description: 'Implement secure authentication and authorization',
          duration: '2-3 weeks',
          resources: {
            articles: [
              { title: 'JWT Authentication Guide', url: 'https://jwt.io/introduction', type: 'free' },
              { title: 'OAuth 2.0 Simplified', url: 'https://aaronparecki.com/oauth-2-simplified/', type: 'free' },
              { title: 'OWASP Security Cheatsheet', url: 'https://cheatsheetseries.owasp.org/', type: 'free' }
            ],
            courses: [
              { title: 'Node.js Security Course', url: 'https://www.udemy.com/course/nodejs-security/', price: '$59.99' }
            ],
            videos: [
              { title: 'JWT Authentication Tutorial', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', channel: 'Web Dev Simplified' },
              { title: 'OAuth 2.0 and OpenID Connect', url: 'https://www.youtube.com/watch?v=996OiexHze0', channel: 'OktaDev' }
            ],
            tools: [
              { name: 'Auth0', description: 'Authentication platform', url: 'https://auth0.com/' },
              { name: 'Passport.js', description: 'Node.js authentication', url: 'http://www.passportjs.org/' }
            ]
          }
        }
      ],
      tips: [
        'Focus on understanding RESTful API design principles',
        'Learn about authentication and security best practices',
        'Practice database optimization and indexing',
        'Understand microservices architecture',
        'Master debugging and logging techniques'
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Developer',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Create native and cross-platform mobile applications',
      targetAudience: 'Developers interested in iOS and Android development',
      outcome: 'Build and deploy mobile apps to app stores',
      duration: '5-7 months',
      difficulty: 'Intermediate',
      color: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      steps: [
        {
          id: 'react-native',
          title: 'React Native Fundamentals',
          description: 'Cross-platform mobile development',
          duration: '6-8 weeks',
          resources: {
            articles: [
              { title: 'React Native Docs', url: 'https://reactnative.dev/', type: 'free' }
            ],
            courses: [
              { title: 'React Native Complete Guide', url: '#', price: '$89' }
            ],
            videos: [
              { title: 'React Native Tutorial', url: '#', channel: 'William Candillon' }
            ],
            tools: [
              { name: 'Expo', description: 'React Native toolchain', url: 'https://expo.dev/' }
            ]
          }
        }
      ],
      tips: [
        'Test on real devices, not just simulators',
        'Understand platform-specific design guidelines',
        'Optimize for performance and battery life',
        'Learn about app store submission process'
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Engineer',
      icon: <Brain className="w-6 h-6" />,
      description: 'Dive into artificial intelligence and machine learning',
      targetAudience: 'Developers with strong math background interested in AI',
      outcome: 'Build and deploy machine learning models',
      duration: '8-12 months',
      difficulty: 'Advanced',
      color: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      steps: [
        {
          id: 'python-basics',
          title: 'Python for Data Science',
          description: 'Python programming and data manipulation',
          duration: '4-6 weeks',
          resources: {
            articles: [
              { title: 'Python Data Science Handbook', url: '#', type: 'free' }
            ],
            courses: [
              { title: 'Python for ML', url: '#', price: '$99' }
            ],
            videos: [
              { title: 'Python ML Course', url: '#', channel: 'Sentdex' }
            ],
            tools: [
              { name: 'Jupyter Notebook', description: 'Interactive coding', url: 'https://jupyter.org/' }
            ]
          }
        }
      ],
      tips: [
        'Strong foundation in mathematics is crucial',
        'Start with simple projects and gradually increase complexity',
        'Participate in Kaggle competitions',
        'Stay updated with latest research papers'
      ]
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      icon: <GitBranch className="w-6 h-6" />,
      description: 'Master CI/CD, cloud services, and infrastructure',
      targetAudience: 'Developers who want to bridge development and operations',
      outcome: 'Automate deployment and manage cloud infrastructure',
      duration: '6-8 months',
      difficulty: 'Advanced',
      color: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      steps: [
        {
          id: 'docker',
          title: 'Docker & Containerization',
          description: 'Container technology fundamentals',
          duration: '3-4 weeks',
          resources: {
            articles: [
              { title: 'Docker Documentation', url: 'https://docs.docker.com/', type: 'free' }
            ],
            courses: [
              { title: 'Docker Mastery', url: '#', price: '$79' }
            ],
            videos: [
              { title: 'Docker Tutorial', url: '#', channel: 'TechWorld with Nana' }
            ],
            tools: [
              { name: 'Docker Desktop', description: 'Container platform', url: 'https://www.docker.com/' }
            ]
          }
        }
      ],
      tips: [
        'Learn Infrastructure as Code (IaC) principles',
        'Master Git and version control workflows',
        'Understand monitoring and logging best practices',
        'Get familiar with multiple cloud providers'
      ]
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Designer',
      icon: <Palette className="w-6 h-6" />,
      description: 'Design beautiful and user-friendly interfaces',
      targetAudience: 'Creative individuals interested in design and user experience',
      outcome: 'Create stunning designs and improve user satisfaction',
      duration: '4-6 months',
      difficulty: 'Beginner',
      color: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700',
      steps: [
        {
          id: 'design-principles',
          title: 'Design Fundamentals',
          description: 'Color theory, typography, and layout',
          duration: '3-4 weeks',
          resources: {
            articles: [
              { title: 'Design Principles Guide', url: '#', type: 'free' }
            ],
            courses: [
              { title: 'UI/UX Complete Course', url: '#', price: '$69' }
            ],
            videos: [
              { title: 'Design Basics', url: '#', channel: 'The Futur' }
            ],
            tools: [
              { name: 'Figma', description: 'Design tool', url: 'https://www.figma.com/' }
            ]
          }
        }
      ],
      tips: [
        'Build a strong portfolio with diverse projects',
        'Study successful designs and understand why they work',
        'Get feedback from users and iterate',
        'Learn basic frontend development to understand constraints'
      ]
    }
  ]

  const selectedRoadmapData = roadmaps.find(r => r.id === selectedRoadmap)

  const RoadmapCard = ({ roadmap }: { roadmap: Roadmap }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => setSelectedRoadmap(roadmap.id)}
      className="group cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {roadmap.icon}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {roadmap.title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {roadmap.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {roadmap.duration}
          </span>
          <span className={`px-2 py-1 rounded-md ${
            roadmap.difficulty === 'Beginner' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
            roadmap.difficulty === 'Intermediate' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          } border border-gray-200 dark:border-gray-700`}>
            {roadmap.difficulty}
          </span>
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  )

  const StepCard = ({ step, index, totalSteps }: { step: RoadmapStep; index: number; totalSteps: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Connection Line */}
      {index < totalSteps - 1 && (
        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />
      )}
      
      <div className="flex gap-4">
        {/* Step Number */}
        <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center font-bold text-gray-900 dark:text-white">
          {index + 1}
        </div>
        
        {/* Step Content */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {step.duration}
            </span>
          </div>
          
          {/* Resources Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'articles'
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3 h-3" />
                Articles
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'courses'
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <DollarSign className="w-3 h-3" />
                Courses
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'videos'
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Youtube className="w-3 h-3" />
                Videos
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'tools'
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Wrench className="w-3 h-3" />
                Tools
              </button>
            </div>
            
            {/* Resources Content */}
            <div className="space-y-2">
              {activeTab === 'articles' && step.resources.articles.map((article, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{article.title}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    article.type === 'free' 
                      ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {article.type}
                  </span>
                </div>
              ))}
              
              {activeTab === 'courses' && step.resources.courses.map((course, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{course.title}</span>
                  </div>
                  {course.price && (
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {course.price}
                    </span>
                  )}
                </div>
              ))}
              
              {activeTab === 'videos' && step.resources.videos.map((video, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{video.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {video.channel}
                  </span>
                </div>
              ))}
              
              {activeTab === 'tools' && step.resources.tools.map((tool, i) => (
                <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start gap-3">
                    <Wrench className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tool.name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{tool.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6 py-12">
        {!selectedRoadmap ? (
          <>
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Map className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                  Learning Roadmaps
                </h1>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Step-by-step guides to master different programming paths. Choose your journey and start learning with curated resources.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-4 gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 mb-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">6</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Roadmaps</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Resources</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">100+</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hours Content</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">Free</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">& Paid</p>
              </div>
            </motion.div>

            {/* Roadmap Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Roadmap Detail View */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedRoadmap(null)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back to Roadmaps
              </button>

              {/* Roadmap Header */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedRoadmapData?.color} flex items-center justify-center`}>
                    {selectedRoadmapData?.icon}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedRoadmapData?.title} Roadmap
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedRoadmapData?.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-500 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Target Audience
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedRoadmapData?.targetAudience}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-500 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Expected Outcome
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedRoadmapData?.outcome}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-500 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedRoadmapData?.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    selectedRoadmapData?.difficulty === 'Beginner' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                    selectedRoadmapData?.difficulty === 'Intermediate' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  } border border-gray-200 dark:border-gray-700`}>
                    {selectedRoadmapData?.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {selectedRoadmapData?.steps.length} learning steps
                  </span>
                </div>
              </div>

              {/* Learning Path */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <GitBranch className="w-6 h-6" />
                  Learning Path
                </h2>
                
                {selectedRoadmapData?.steps.map((step, index) => (
                  <StepCard key={step.id} step={step} index={index} totalSteps={selectedRoadmapData.steps.length} />
                ))}
              </div>

              {/* Tips Section */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6" />
                  Tips & Best Practices
                </h2>
                <div className="space-y-3">
                  {selectedRoadmapData?.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

export default ResourcesRoadmap
