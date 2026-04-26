'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

const Skills = () => {
  const { t } = useLanguage()

  // Frontend Technologies
  const frontendTech = [
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer/0055FF' },
    { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
    { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
    { name: 'Sass', icon: 'https://cdn.simpleicons.org/sass/CC6699' },
  ]

  // Backend Technologies  
  const backendTech = [
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/000000' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
    { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma/2D3748' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
    { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  ]

  // Tools & Deployment
  const toolsTech = [
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
    { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
  ]

  // Marquee component for animated tech stack
  const TechMarquee = ({ technologies, direction = 'left' }: { technologies: typeof frontendTech, direction?: 'left' | 'right' }) => (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <motion.div
        className="flex gap-8 pr-8"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-black rounded-xl border border-black/20 dark:border-white/20 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap group"
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={24}
              height={24}
              unoptimized
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-medium text-black dark:text-white group-hover:font-semibold transition-all duration-300">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            My Skills
            <br />
            <span className="relative">
              The Secret Sauce
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-black dark:bg-white"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Passionate about leveraging cutting-edge technologies to create exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Animated Tech Stack */}
        <div className="space-y-8 mb-20">
          {/* Frontend Technologies */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-lg font-semibold text-black dark:text-white mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Frontend Technologies
            </motion.h3>
            <TechMarquee technologies={frontendTech} direction="left" />
          </motion.div>

          {/* Backend Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
              Backend & Database
            </h3>
            <TechMarquee technologies={backendTech} direction="right" />
          </motion.div>

          {/* Tools & Deployment */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
              Tools & Deployment
            </h3>
            <TechMarquee technologies={toolsTech} direction="left" />
          </motion.div>
        </div>


      </div>
    </section>
  )
}

export default Skills
