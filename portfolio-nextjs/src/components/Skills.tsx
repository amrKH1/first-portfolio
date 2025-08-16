'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Code2,
  Smartphone,
  Database,
  Settings,
  Palette,
  Zap,
  Cpu,
  Globe,
  Server,
  Cloud,
  GitBranch,
  Layers,
  Wrench,
  Monitor,
  ExternalLink
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function getResourceType(url?: string) {
  if (!url) return 'Learning Resource'
  const u = url.toLowerCase()
  if (u.includes('developer.mozilla.org')) return 'Official Documentation'
  if (
    u.includes('react.dev') ||
    u.includes('vuejs.org') ||
    u.includes('angular.dev') ||
    u.includes('nodejs.org') ||
    u.includes('kotlinlang.org') ||
    u.includes('swift.org') ||
    u.includes('php.net') ||
    u.includes('ruby-lang.org')
  ) return 'Official Guide'
  if (
    u.includes('docs.aws.amazon.com') ||
    u.includes('docs.docker.com') ||
    u.includes('firebase.google.com') ||
    u.includes('mongodb.com') ||
    u.includes('postgresql.org')
  ) return 'Official Documentation'
  if (u.includes('coursera') || u.includes('codecademy') || u.includes('freecodecamp')) return 'Learning Course'
  return 'Tutorial Guide'
}

const Skills = () => {
  const { t, isRTL } = useLanguage()
  const resourceLinks: Record<string, string> = {
    'HTML5': 'https://developer.mozilla.org/docs/Web/HTML',
    'CSS3': 'https://developer.mozilla.org/docs/Web/CSS',
    'JavaScript': 'https://developer.mozilla.org/docs/Web/JavaScript',
    'React': 'https://react.dev/learn',
    'Vue.js': 'https://vuejs.org/guide/introduction.html',
    'Angular': 'https://angular.dev/overview',

    'Node.js': 'https://nodejs.org/en/learn',
    'Python': 'https://docs.python.org/3/tutorial/index.html',
    'Ruby': 'https://www.ruby-lang.org/en/documentation/',
    'PHP': 'https://www.php.net/manual/en/intro-whatis.php',
    'MongoDB': 'https://www.mongodb.com/docs/',
    'PostgreSQL': 'https://www.postgresql.org/docs/current/tutorial-start.html',

    'React Native': 'https://reactnative.dev/docs/environment-setup',
    'Flutter': 'https://docs.flutter.dev/get-started/install',
    'Swift': 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/',
    'Kotlin': 'https://kotlinlang.org/docs/home.html',
    'Ionic': 'https://ionicframework.com/docs',
    'Xamarin': 'https://learn.microsoft.com/xamarin/',

    'Git': 'https://git-scm.com/doc',
    'Docker': 'https://docs.docker.com/get-started/',
    'AWS': 'https://docs.aws.amazon.com/index.html',
    'Firebase': 'https://firebase.google.com/docs',
    'Analytics': 'https://developers.google.com/analytics/devguides/collection',
    'UI/UX Design': 'https://www.coursera.org/learn/ui-ux-design-specialization' // reputable course overview
  }

  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: Monitor,
      color: 'from-blue-400 to-cyan-400',
      skills: [
        { name: 'HTML5', icon: Globe, level: 95 },
        { name: 'CSS3', icon: Palette, level: 90 },
        { name: 'JavaScript', icon: Zap, level: 88 },
        { name: 'React', icon: Code2, level: 92 },
        { name: 'Vue.js', icon: Layers, level: 85 },
        { name: 'Angular', icon: Code2, level: 80 },
      ]
    },
    {
      title: t('skills.backend'),
      icon: Server,
      color: 'from-green-400 to-emerald-400',
      skills: [
        { name: 'Node.js', icon: Server, level: 90 },
        { name: 'Python', icon: Code2, level: 85 },
        { name: 'Ruby', icon: Code2, level: 80 },
        { name: 'PHP', icon: Database, level: 82 },
        { name: 'MongoDB', icon: Database, level: 88 },
        { name: 'PostgreSQL', icon: Database, level: 85 },
      ]
    },
    {
      title: t('skills.mobile'),
      icon: Smartphone,
      color: 'from-purple-400 to-pink-400',
      skills: [
        { name: 'React Native', icon: Smartphone, level: 88 },
        { name: 'Flutter', icon: Smartphone, level: 85 },
        { name: 'Swift', icon: Smartphone, level: 80 },
        { name: 'Kotlin', icon: Smartphone, level: 78 },
        { name: 'Ionic', icon: Zap, level: 75 },
        { name: 'Xamarin', icon: Code2, level: 70 },
      ]
    },
    {
      title: t('skills.tools'),
      icon: Settings,
      color: 'from-orange-400 to-red-400',
      skills: [
        { name: 'Git', icon: GitBranch, level: 95 },
        { name: 'Docker', icon: Layers, level: 85 },
        { name: 'AWS', icon: Cloud, level: 82 },
        { name: 'Firebase', icon: Database, level: 88 },
        { name: 'Analytics', icon: Database, level: 80 },
        { name: 'UI/UX Design', icon: Palette, level: 85 },
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 md:py-24 lg:py-28 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark dark:text-gray-100 mb-4 relative">
            {t('skills.title')}
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-15 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
          </h2>
          <p className="text-lg text-gray-medium dark:text-gray-300 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 p-4 md:p-6 bg-transparent">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-white dark:bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-sm dark:shadow-[0_8px_24px_rgba(0,0,0,0.85)] hover:shadow-medium hover:-translate-y-1.5 transition-transform duration-300 border border-gray-100 dark:border-white/10 relative group h-full"
              data-aos="fade-up"
              data-aos-delay={categoryIndex * 100}
            >
              {/* Top border animation */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-primary-dark group-hover:w-full transition-all duration-600" />
              
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                  <span className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 will-change-transform">
                    <category.icon className="w-6 h-6" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="relative"
                  >
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-200">
                          <skill.icon className="w-4 h-4" />
                        </div>
                        <div className="relative inline-flex items-center group/skill">
                          <a
                            href={resourceLinks[skill.name]}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${t('skills.learnMore')} ${skill.name} - ${t('skills.externalResource')}`}
                            aria-describedby={`skill-tip-${categoryIndex}-${skillIndex}`}
                            onKeyDown={(e) => { if (e.key === 'Escape') (e.currentTarget as HTMLAnchorElement).blur() }}
                            className="font-medium text-sm text-gray-800 dark:text-gray-200 hover:underline hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                          >
                            {skill.name}
                          </a>
                          {/* Tooltip */}
                          {resourceLinks[skill.name] && (
                            <div
                              id={`skill-tip-${categoryIndex}-${skillIndex}`}
                              role="tooltip"
                              className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-1 md:-translate-y-1 group-hover/skill:opacity-100 group-focus-within/skill:opacity-100 group-hover/skill:translate-y-0 group-focus-within/skill:translate-y-0 transition-all duration-200 md:bottom-full md:mb-2 top-full mt-2"
                            >
                              <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-lg ring-1 ring-primary/30">
                                {getResourceType(resourceLinks[skill.name])}
                              </div>
                              {/* Arrows */}
                              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 md:hidden" />
                              <span className="hidden md:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                        {skill.level}%
                        {resourceLinks[skill.name] && (
                          <div className="relative inline-flex items-center group/icon">
                            <a
                              href={resourceLinks[skill.name]}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open external learning resource for ${skill.name}`}
                              aria-describedby={`skill-tip-icon-${categoryIndex}-${skillIndex}`}
                              onKeyDown={(e) => { if (e.key === 'Escape') (e.currentTarget as HTMLAnchorElement).blur() }}
                              className="text-gray-400 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            {/* Tooltip for icon */}
                            <div
                              id={`skill-tip-icon-${categoryIndex}-${skillIndex}`}
                              role="tooltip"
                              className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-1 md:-translate-y-1 group-hover/icon:opacity-100 group-focus-within/icon:opacity-100 group-hover/icon:translate-y-0 group-focus-within/icon:translate-y-0 transition-all duration-200 md:bottom-full md:mb-2 top-full mt-2"
                            >
                              <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-lg ring-1 ring-primary/30">
                                {getResourceType(resourceLinks[skill.name])}
                              </div>
                              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 md:hidden" />
                              <span className="hidden md:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900" />
                            </div>
                          </div>
                        )}
                      </span>
                    </div>

                    {/* Skill Level Bar with in-view animation */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full skill-bar`}
                        style={{ width: `${skill.level}%`, ['--skill-level' as any]: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
