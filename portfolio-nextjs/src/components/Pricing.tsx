'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'

const Pricing = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      monthlyPrice: '$29',
      yearlyPrice: '$199',
      features: [
        'Access to all basic features',
        '20 GB of cloud storage',
        'Email support',
        'Single user account',
      ],
      buttonText: 'Subscribe Now',
      popular: false,
    },
    {
      id: 2,
      name: 'Professional Plan',
      monthlyPrice: '$59',
      yearlyPrice: '$499',
      features: [
        'All features in Basic Plan',
        '50 GB of cloud storage',
        'Priority email and chat support',
        'Multi-user support (up to 5 users)',
      ],
      buttonText: 'Subscribe Now',
      popular: true,
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      monthlyPrice: '$119',
      yearlyPrice: '$999',
      features: [
        'All features in Professional Plan',
        'Unlimited cloud storage',
        '24/7 dedicated support',
        'Unlimited user access',
      ],
      buttonText: 'Subscribe Now',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-black relative overflow-hidden transition-all duration-700">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-700">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-sm transition-colors duration-700">
            Discover flexible subscription plans tailored to meet your needs. Select the plan that best fits your goals and enjoy a growing enterprise with no limits.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Glow Effect */}
              <div
                className={`absolute -inset-[10px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 ${
                  hoveredCard === plan.id ? 'opacity-50' : ''
                }`}
                style={{ borderWidth: '10px' }}
              />
              
              {/* Card */}
              <div className={`relative bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 border h-full shadow-sm dark:shadow-none transition-all duration-700 ${
                plan.popular 
                  ? 'border-purple-500 dark:border-purple-500' 
                  : 'border-gray-200 dark:border-gray-800'
              }`}>
                {/* Plan Name */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-700">
                  {plan.name}
                </h3>
                
                {/* Price */}
                <div className="mb-6">
                  <motion.span 
                    key={plan.monthlyPrice}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white inline-block transition-colors duration-700"
                  >
                    {plan.monthlyPrice}
                  </motion.span>
                  <span className="text-gray-500 dark:text-gray-500 text-sm transition-colors duration-700">
                    /month
                  </span>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <button
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
