'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const Experience = () => {
  const { t, isRTL } = useLanguage()

  const experiences = [
    {
      id: 1,
      period: t('experience.job1.period'),
      title: t('experience.job1.title'),
      company: t('experience.job1.company'),
      description: t('experience.job1.description'),
      skills: ['React', 'Node.js', 'AWS', 'Team Leadership']
    },
    {
      id: 2,
      period: t('experience.job2.period'),
      title: t('experience.job2.title'),
      company: t('experience.job2.company'),
      description: t('experience.job2.description'),
      skills: ['Vue.js', 'Python', 'PostgreSQL', 'React Native']
    },
    {
      id: 3,
      period: t('experience.job3.period'),
      title: t('experience.job3.title'),
      company: t('experience.job3.company'),
      description: t('experience.job3.description'),
      skills: ['JavaScript', 'CSS3', 'Angular', 'SASS']
    },
    {
      id: 4,
      period: t('experience.job4.period'),
      title: t('experience.job4.title'),
      company: t('experience.job4.company'),
      description: t('experience.job4.description'),
      skills: ['HTML5', 'CSS3', 'PHP', 'MySQL']
    }
  ]

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark dark:text-gray-100 mb-4 relative">
            {t('experience.title')}
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-15 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
          </h2>
          <p className="text-lg text-gray-medium dark:text-gray-300 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary dark:bg-primary-light hidden lg:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-16`}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={index * 100}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-medium z-10 hidden lg:block" />

                {/* Content */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-light dark:shadow-[0_8px_24px_rgba(0,0,0,0.85)] hover:shadow-medium transition-all duration-400 relative border border-black/5 dark:border-white/10">
                    {/* Arrow for desktop */}
                    <div className={`absolute top-8 w-0 h-0 border-t-[10px] border-b-[10px] border-t-transparent border-b-transparent hidden lg:block ${
                      index % 2 === 0
                        ? 'right-[-10px] border-l-[10px] border-l-white dark:border-l-gray-800'
                        : 'left-[-10px] border-r-[10px] border-r-white dark:border-r-gray-800'
                    }`} />

                    <div className="text-primary font-semibold text-sm mb-2">
                      {experience.period}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-dark dark:text-gray-100 mb-2">
                      {experience.title}
                    </h3>
                    <h4 className="text-gray-medium dark:text-gray-300 font-medium mb-4">
                      {experience.company}
                    </h4>
                    <p className="text-gray-medium dark:text-gray-300 leading-relaxed mb-6">
                      {experience.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-light text-primary text-sm font-medium rounded-full border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for the other half */}
                <div className="w-full lg:w-1/2 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
