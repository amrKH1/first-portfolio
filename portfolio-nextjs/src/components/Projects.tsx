'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const Projects = () => {
  const { t, isRTL } = useLanguage()

  const projects = [
    {
      id: 1,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: '/assets/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: '/assets/project2.jpg',
      technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      image: '/assets/project3.jpg',
      technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: t('projects.project4.title'),
      description: t('projects.project4.description'),
      image: '/assets/project4.jpg',
      technologies: ['Angular', 'Express.js', 'Socket.io', 'AWS'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: t('projects.project5.title'),
      description: t('projects.project5.description'),
      image: '/assets/project5.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: t('projects.project6.title'),
      description: t('projects.project6.description'),
      image: '/assets/project6.jpg',
      technologies: ['Python', 'TensorFlow', 'React', 'Docker'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ]

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark dark:text-gray-100 mb-4 relative">
            {t('projects.title')}
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-15 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
          </h2>
          <p className="text-lg text-gray-medium dark:text-gray-300 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
              className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-light dark:shadow-[0_8px_24px_rgba(0,0,0,0.85)] hover:shadow-heavy hover:transform hover:-translate-y-4 hover:scale-105 transition-transform duration-400 border border-black/5 dark:border-white/10 relative group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Top border animation */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-primary-dark group-hover:w-full transition-all duration-600 z-10" />
              
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-300 transition-transform duration-500 ease-out group-hover:scale-110">
                  <div className="text-4xl mb-2">🚀</div>
                  <div className="text-sm font-medium">{project.title}</div>
                  <div className="text-xs mt-1 opacity-70">Project Screenshot</div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/90 dark:bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <div className="flex gap-4">
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                      aria-label={`${t('projects.liveDemo')} - ${project.title}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                      aria-label={`${t('projects.github')} - ${project.title}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8 group-hover:transform group-hover:-translate-y-2 transition-transform duration-400">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-medium dark:text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: 'easeOut' }}
                      className="px-3 py-1 bg-gray-light text-primary text-sm font-medium rounded-full border border-gray-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
