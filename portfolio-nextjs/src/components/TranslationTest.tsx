'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function TranslationTest() {
  const { language, setLanguage, t, isRTL } = useLanguage()

  const testKeys = [
    'nav.home',
    'nav.about', 
    'nav.skills',
    'nav.projects',
    'nav.experience',
    'nav.contact',
    'hero.name',
    'hero.title1',
    'hero.description',
    'about.title',
    'skills.title',
    'projects.title',
    'experience.title',
    'contact.title'
  ]

  return (
    <div className={`p-8 max-w-4xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
      <h1 className="text-3xl font-bold mb-6">Translation System Test</h1>
      
      <div className="mb-6">
        <p className="mb-2">Current Language: <strong>{language}</strong></p>
        <p className="mb-2">Is RTL: <strong>{isRTL ? 'Yes' : 'No'}</strong></p>
        <p className="mb-4">Document Direction: <strong>{document.documentElement.dir}</strong></p>
        
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Switch to {language === 'en' ? 'Arabic' : 'English'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testKeys.map(key => (
          <div key={key} className="p-4 border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">{key}</div>
            <div className="font-medium">{t(key)}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">RTL Layout Test</h3>
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-4 mb-4`}>
          <div className="w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white">1</div>
          <div className="w-16 h-16 bg-green-500 rounded flex items-center justify-center text-white">2</div>
          <div className="w-16 h-16 bg-red-500 rounded flex items-center justify-center text-white">3</div>
        </div>
        <p className="text-sm text-gray-600">
          Boxes should flow from {isRTL ? 'right to left' : 'left to right'} in {language === 'ar' ? 'Arabic' : 'English'} mode.
        </p>
      </div>
    </div>
  )
}
