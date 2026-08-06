import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Home', href: getPermalink('/') },
    { text: 'About', href: getPermalink('/#about') },
    { text: 'Projects', href: getPermalink('/#projects') },
    { text: 'Contact', href: getPermalink('/#contact') },
  ],
  actions: [{ text: 'Email me', href: 'mailto:<INPUT_EMAIL_ADDRESS>' }],
};

export const footerData = {
  links: [
    {
      title: 'Portfolio',
      links: [
        { text: 'Projects', href: '#projects' },
        { text: 'About', href: '#about' },
        { text: 'Contact', href: '#contact' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '<INPUT_LINKEDIN_URL>' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:<INPUT_EMAIL_ADDRESS>' },
  ],
  footNote: `
    Wow! Thanks for making it to the end of my website. This either means you loved the content, or scrolled right to the bottom!
  `,
};
