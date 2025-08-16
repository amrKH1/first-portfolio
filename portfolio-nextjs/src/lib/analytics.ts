// Google Analytics tracking functions
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // @ts-ignore
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Track events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // @ts-ignore
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}



// Track contact form submissions
export const trackContactForm = (formType: string) => {
  event({
    action: 'submit_contact_form',
    category: 'Contact',
    label: formType,
  })
}

// Track project views
export const trackProjectView = (projectName: string) => {
  event({
    action: 'view_project',
    category: 'Portfolio',
    label: projectName,
  })
}

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string) => {
  event({
    action: 'click_external_link',
    category: 'Outbound',
    label: `${linkText} -> ${url}`,
  })
}

// Track social media clicks
export const trackSocialClick = (platform: string, action: string) => {
  event({
    action: 'click_social',
    category: 'Social',
    label: `${platform}: ${action}`,
  })
}



// Track time spent on page
export const trackTimeOnPage = (pageName: string, timeSpent: number) => {
  event({
    action: 'time_on_page',
    category: 'Engagement',
    label: pageName,
    value: Math.round(timeSpent / 1000), // Convert to seconds
  })
}
