import type { Dictionary } from './es'

const en: Dictionary = {
  meta: {
    title: 'MySmartWindow — Resource hub | IoT Fenster',
    description:
      'Manuals, video tutorials and step-by-step cards to get the most out of your Connect and the MySmartWindow app.',
  },

  nav: {
    home: 'Home',
    recursos: 'Resources',
    videos: 'Videos',
    dispositivos: 'Devices',
    ingenieria: 'Engineering',
    ecosistemas: 'Ecosystems',
    distribuidores: 'Distributors',
    noticias: 'News',
    soporte: 'Support',
    contacto: 'Contact',
    areaCliente: 'Client Area',
    menu: 'Menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
  },

  common: {
    search: 'Search',
    searchPlaceholder: 'Search a manual, a video, a device…',
    close: 'Close',
    viewAll: 'View all',
    download: 'Download',
    open: 'Open',
    preview: 'Preview',
    watch: 'Watch video',
    watchOnYoutube: 'Watch on YouTube',
    readMore: 'Read more',
    loading: 'Loading…',
    back: 'Back',
    new: 'New',
    filters: 'Filters',
    clearFilters: 'Clear filters',
    results: 'results',
    result: 'result',
    noResults: 'No results',
    noResultsHint: 'Try different terms or remove a filter.',
    all: 'All',
    category: 'Category',
    type: 'Type',
    device: 'Device',
    updated: 'Updated',
    views: 'views',
    unavailable: 'Unavailable',
    unavailableHint: 'This document is not published yet. Write to us and we will send it over.',
    copyLink: 'Copy link',
    copied: 'Link copied',
    grid: 'Grid',
    list: 'List',
    commandHint: 'to search',
  },

  hero: {
    badge: 'MySmartWindow App',
    title: 'Everything your',
    titleAccent: 'Connect',
    titleEnd: 'can do for you',
    subtitle:
      'Control your enclosures wherever you are, whenever you want, with whoever you choose. We gathered every manual, video and card in one place that is actually searchable.',
    ctaPrimary: 'Explore resources',
    ctaSecondary: 'Watch tutorials',
    statManuals: 'Manuals',
    statVideos: 'Video tutorials',
    statCards: 'Step-by-step cards',
    statCategories: 'Categories',
    scroll: 'Scroll',
    blindUp: 'Raise the blind',
    blindStop: 'Stop the blind',
    blindDown: 'Lower the blind',
    blindToggle: 'Pulsar: raise or lower the blind',
  },

  pillars: {
    eyebrow: 'Your way into the ecosystem',
    title: 'Three formats, one same answer',
    subtitle: 'Choose how you prefer to learn. The content is the same; the format is up to you.',
    manual: {
      title: 'Manuals',
      description: 'Illustrated guides with the full step by step, split by typology and category.',
      bullet1: 'Real illustrations and screenshots',
      bullet2: 'Organised by category',
      bullet3: 'Downloadable as PDF',
    },
    video: {
      title: 'Videos',
      description: 'Video tutorials with on-screen guidance, grouped into playlists.',
      bullet1: 'Synced with the channel',
      bullet2: 'Playlists',
      bullet3: 'Play without leaving the site',
    },
    card: {
      title: 'Cards',
      description: 'One-page summaries with simple instructions for using the devices.',
      bullet1: 'One page, one goal',
      bullet2: 'Perfect to print',
      bullet3: 'Straight to the point',
    },
  },

  explorer: {
    eyebrow: 'What do you need?',
    title: 'Resource hub',
    subtitle: 'Search across all the training material. Filter by category, format or device.',
    searchLabel: 'Search the resource hub',
    resultsFor: 'Results for',
    showing: 'Showing',
    of: 'of',
    sortRelevance: 'Relevance',
    sortRecent: 'Most recent',
    sortAZ: 'A–Z',
    sortBy: 'Sort by',
    shareSearch: 'Share this search',
    categoryIntro: 'Browse the materials by category',
  },

  videos: {
    eyebrow: 'MySmartWindow channel',
    title: 'Video tutorials',
    subtitle:
      'Automatically synced with our YouTube channel: when we publish a video, it shows up here.',
    latest: 'Latest videos from the channel',
    playlists: 'Playlists',
    fromCatalog: 'From the resource hub',
    visitChannel: 'Visit the channel',
    subscribe: 'Subscribe',
    sourceApi: 'Synced through the YouTube Data API',
    sourceRss: 'Synced through the channel public feed',
    sourceNone: 'YouTube could not be reached. Showing the local catalogue.',
    syncedAt: 'Last sync',
    empty: 'There are no videos to show right now.',
  },

  devices: {
    eyebrow: 'Hardware',
    title: 'Devices in the ecosystem',
    subtitle: 'Every piece of engineering, with its documentation one click away.',
    resourcesFor: 'Resources for this device',
    noResources: 'There is no device-specific material yet.',
    seeProduct: 'Product page',
    soonEyebrow: 'Coming soon',
    soonTitle: 'New products on the way',
    soonText: 'We keep designing: the next device in the ecosystem is already on the drawing board.',
    soonCta: 'Be the first to know',
  },

  ecosystems: {
    eyebrow: 'Integrations',
    title: 'Works with what you already have',
    subtitle:
      'Look for our brand to integrate IoT Fenster devices into the ecosystems you already use at home.',
    guides: 'guides available',
    guide: 'guide available',
  },

  partners: {
    eyebrow: 'Official distributors',
    title: 'Where to buy',
    subtitle:
      'IoT Fenster works with enclosure manufacturers, not directly with end users. These are our official distributors: get in touch with them to get our devices.',
    noOnlineNotice:
      'Online purchase is not available: each distributor handles orders through their own sales team.',
    brandsLabel: 'Brands they distribute',
    visitSite: 'Visit website',
    contact: 'Contact',
    country: 'Country',
  },

  values: {
    eyebrow: 'Why IoT Fenster',
    title: 'Engineering you notice every day',
    warranty: {
      title: 'Warranty',
      description:
        'We design quality devices, built to last and requiring barely any maintenance.',
    },
    usability: {
      title: 'Usability',
      description:
        'Our enclosure engineering is designed to make life easier for manufacturers and end users alike.',
    },
    support: {
      title: 'Support',
      description:
        'We provide technical support to prevent issues and keep the technology running properly.',
    },
  },

  news: {
    eyebrow: 'What is new',
    title: 'News',
    subtitle: 'Enclosure engineering and specialised home automation.',
    readArticle: 'Read the article',
    minRead: 'min read',
    related: 'Keep reading',
    empty: 'No news published yet.',
    backToNews: 'Back to news',
  },

  faq: {
    eyebrow: 'Quick answers',
    title: 'Frequently asked questions',
    subtitle: 'What you ask us the most, answered in two lines.',
    stillNeedHelp: 'Still need a hand?',
    contactUs: 'Write to us',
  },

  contact: {
    eyebrow: 'Let us talk',
    title: 'Contact',
    subtitle: 'Tell us what you need and a real person will get back to you.',
    name: 'Name',
    email: 'Email',
    company: 'Company (optional)',
    subject: 'Subject',
    message: 'Message',
    messagePlaceholder: 'Describe your question in as much detail as you can…',
    consent: 'I have read and accept the privacy policy.',
    consentLink: 'Read the policy',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Message sent. We will get back to you as soon as possible.',
    error: 'It could not be sent. Please try again in a moment.',
    profile: 'Who are you?',
    profiles: {
      manufacturer: 'Manufacturer',
      distributor: 'Distributor',
      installer: 'Installer',
      user: 'End user',
    },
    subjects: {
      support: 'Technical support',
      commercial: 'Sales enquiry',
      docs: 'Documentation',
      other: 'Other',
    },
    errors: {
      name: 'Tell us your name.',
      email: 'We need a valid email.',
      profile: 'Tell us where you are writing from.',
      subject: 'Pick a subject.',
      message: 'Tell us a bit more (at least 10 characters).',
      consent: 'We need your consent to reply.',
    },
  },

  newsletter: {
    title: 'What is new',
    subtitle:
      'Subscribe and get the latest news on enclosure engineering and specialised home automation!',
    placeholder: 'Your email',
    submit: 'Subscribe!',
    success: 'Done! You are subscribed.',
    error: 'Check the email and try again.',
  },

  footer: {
    tagline: 'IoT engineering for enclosures.',
    quickLinks: 'Quick links',
    resources: 'Resources',
    social: 'IoT Fenster is also on social media.',
    legal: 'Legal',
    privacy: 'Privacy policy',
    notice: 'Legal notice',
    cookies: 'Cookies',
    cookieSettings: 'Cookie settings',
    rights: 'All rights reserved.',
    builtWith: 'Demo site built from the public IoT Fenster portal.',
  },

  legal: {
    eyebrow: 'Legal information',
    lastUpdated: 'Last updated',
    contents: 'Contents',
    related: 'Other legal documents',
  },

  cookies: {
    title: 'Cookies',
    text: 'We only store the essentials in your browser: your choice here and whether you prefer the light or dark theme. No analytics, no advertising. YouTube videos only set their cookies if you press play.',
    accept: 'Accept',
    reject: 'Reject',
    more: 'More information',
  },

  notFound: {
    title: 'Nothing here',
    subtitle: 'The page you are looking for moved, or never existed.',
    cta: 'Go to the resource hub',
    home: 'Back home',
  },

  assistant: {
    launcher: 'We help you find it',
    title: 'Assistant',
    subtitle: 'Two clicks and you are where you need to be',
    restart: 'Start again',
    close: 'Close',
    root: 'Hi! What do you need?',
    optProblem: 'Something is not working',
    optDocs: 'I am looking for a manual or a video',
    optBuy: 'I want to buy it',
    optDevices: 'Show me the devices',
    askDevice: 'Which device?',
    optOtherDevice: 'Another one, or not sure',
    deviceAnswer:
      'There you have its manuals, videos and cards. If that does not solve it, write to us and we will look into it with you.',
    goDevice: 'See its resources',
    goAllDevices: 'See every device',
    askFormat: 'How do you prefer to learn it?',
    formatAnswer: 'Taking you to the search with that filter already applied.',
    goResources: 'See the list',
    askProfile: 'Who are you?',
    proAnswer: 'Great. Leave us your details and the sales team will get back to you.',
    goContact: 'Open the form',
    userAnswer:
      'We do not sell directly to end users: our official distributors do.',
    goPartners: 'See distributors',
    devicesAnswer: 'This is the whole ecosystem, each device with its documentation.',
    whatsappSales: 'Ask on WhatsApp',
    whatsappSupport: 'Report the issue on WhatsApp',
  },

  engineering: {
    eyebrow: 'Engineering',
    title: 'The whole solution, under one roof',
    subtitle:
      'Electronics, firmware, cloud and app: every layer of the MySmartWindow ecosystem is designed here. That is why they fit together, and why we answer for them.',
    homeCta: 'See how we do it',
    layers: {
      hardware: {
        title: 'Electronics',
        description:
          'We design our own devices to live inside the window profile, not hanging off a wall.',
      },
      firmware: {
        title: 'Firmware',
        description:
          'The logic lives in the device: it keeps working when the connection drops, and updates over the air without touching the window.',
      },
      cloud: {
        title: 'Cloud',
        description:
          'Every enclosure has its digital twin: its real state, right now, from the living room or from the other side of the world.',
      },
      app: {
        title: 'App',
        description:
          'MySmartWindow is ours, not a borrowed app. And whatever it does not cover integrates through our API or with Alexa, Google Home and IFTTT.',
      },
    },
    reasonsTitle: 'What changes when one engineering team owns it all',
    reasons: {
      fit: {
        title: 'It fits your profile, not the other way around',
        description:
          'We work with the manufacturer from the design stage, so the device fits their joinery without redesigning it.',
      },
      single: {
        title: 'One single contact',
        description:
          'When the electronics, the firmware and the app come from the same team, there is no passing the buck between suppliers: the answer comes from here.',
      },
      evolves: {
        title: 'It improves after installation',
        description:
          'Updates reach the installed device over the air: new features without changing the hardware.',
      },
    },
    ctaTitle: 'Do you manufacture or distribute enclosures?',
    ctaText: 'Tell us which profile you work with and we will show you how the ecosystem fits.',
    ctaButton: 'Talk to us',
  },

  contactChannels: {
    eyebrow: 'Direct contact',
    sales: {
      title: 'Sales inquiry',
      description: 'Pricing, catalog and availability for your project.',
      emailCta: 'Send an email',
      whatsappCta: 'Chat on WhatsApp',
    },
    support: {
      title: 'Technical support',
      description: 'Already have a device installed and something is wrong?',
      emailCta: 'Send an email',
      whatsappCta: 'Chat on WhatsApp',
    },
  },
}

export default en
