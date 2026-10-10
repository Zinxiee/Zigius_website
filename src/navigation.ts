import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Home', href: getPermalink('/') },
    { text: 'About', href: getPermalink('/#about') },
    { text: 'Projects', href: getPermalink('/#projects') },
    { text: 'Contact', href: getPermalink('/#contact') },
    { text: 'Blog', href: getBlogPermalink() },
  ],
  actions: [{ text: 'Email me', href: 'mailto:ZachDanzig@gmail.com' }],
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
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/zachary-danzig/' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:ZachDanzig@gmail.com' },
  ],
  footNote: `
    Wow! Thanks for making it to the end of my website. This either means you loved the content, or scrolled right to the bottom!
  `,
};
