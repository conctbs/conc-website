export const headerData = {
  links: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'About',
      links: [
        { text: 'About CONC', href: '/about' },
        { text: 'Executive', href: '/about/executive' },
        { text: 'Facilities', href: '/about/facilities' },
        { text: 'Philosophy', href: '/about/philosophy' },
      ],
    },
    {
      text: 'Training Service',
      links: [
        { text: 'Open Enrollment Programs', href: '/programs' },
        { text: 'Customized Training', href: '/training-service/customized-training' },
        { text: 'E-Documents', href: '/training-service/e-documents' },
        { text: 'Come teach with us', href: '/training-service/come-teach-with-us' },
      ],
    },
    {
      text: 'Consulting Service',
      links: [
        { text: 'Overview', href: '/services' },
        { text: 'Service Field', href: '/services/service-field' },
        { text: 'Case Method Learning', href: '/services/case-method-learning' },
        { text: 'Client List', href: '/services/client-list' },
      ],
    },
    {
      text: 'Life Long Learning',
      links: [
        { text: 'Overview', href: '/life-long-learning' },
        { text: 'CONC Thammasat Forum', href: '/life-long-learning/conc-thammasat-forum' },
        { text: 'CONC Knowledge', href: '/life-long-learning/conc-knowledge' },
        { text: 'Class Observation', href: '/life-long-learning/class-observation' },
      ],
    },
    {
      text: 'News & Events',
      links: [
        { text: 'News', href: '/news' },
        { text: 'Announcement', href: '/announcement' },
        { text: 'Event Calendar', href: '/event-calendar' },
        { text: 'Event Programs', href: '/event-programs' },
      ],
    },
  ],
  actions: [{ text: 'Contact Us', href: '/contact', variant: 'secondary' as const }],
};

export const footerData = {
  links: [
    {
      title: 'About',
      links: [
        { text: 'About CONC', href: '/about' },
        { text: 'Executive', href: '/about/executive' },
        { text: 'Facilities', href: '/about/facilities' },
      ],
    },
    {
      title: 'Training',
      links: [
        { text: 'Open Enrollment', href: '/programs' },
        { text: 'Customized Training', href: '/training-service/customized-training' },
        { text: 'E-Documents', href: '/training-service/e-documents' },
      ],
    },
    {
      title: 'Consulting',
      links: [
        { text: 'Service Field', href: '/services/service-field' },
        { text: 'Projects', href: '/projects' },
        { text: 'Client List', href: '/services/client-list' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { text: 'News', href: '/news' },
        { text: 'Contact Us', href: '/contact' },
        { text: 'Sitemap', href: '/sitemap' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Privacy Policy', href: '/privacy-policy' },
    { text: 'Sitemap', href: '/sitemap' },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'Line', icon: 'tabler:message-circle', href: '#' },
  ],
  footNote: `
    CONC frontend using the stale-satellite theme shell on top of Strapi-powered content routes.
  `,
};
