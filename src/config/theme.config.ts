const siteUrl = (
  import.meta.env.SITE_URL ||
  import.meta.env.PUBLIC_SITE_URL ||
  "https://festivaldepoesia.com"
).replace(/\/$/, "");

export const SITE = {
  name: "Festival de Poesía de La Habana",
  description:
    "Sitio oficial del Festival de Poesía de La Habana.",
  url: siteUrl,
  locale: "es-ES",
  language: "es",
  repositoryUrl: "https://github.com/josmiguel92/festivaldepoesia-alpine",
};

export const NAVIGATION = [
  { to: "/", label: "Inicio" },
  { to: "/blog", label: "Artículos" },
  { to: "/about", label: "Nosotros" },
  { to: "/contact", label: "Contacto" },
];

export const CONTACT = {
  email: "karelalexei@gmail.com", // Other emails: maripolo.cu@gmail.com, alpausanias@gmail.com
  socialHandle: "@festivalpoesia",
  socialUrl: "https://www.festivaldepoesiadelahabana.com/",
};

export const FORMS = {
  contact: {
    action: "",
    method: "post",
    enctype: "application/x-www-form-urlencoded",
  },
  newsletter: {
    action: "",
    method: "post",
    enctype: "application/x-www-form-urlencoded",
  },
};

export const SOCIAL_LINKS = [
  { href: "/rss.xml", label: "RSS feed", icon: "rss" },
  { href: CONTACT.socialUrl, label: `${SITE.name} on X`, icon: "twitter" },
  { href: SITE.repositoryUrl, label: `${SITE.name} on GitHub`, icon: "github" },
  { href: `mailto:${CONTACT.email}`, label: "Email", icon: "mail" },
];

export const authors = [
  {
    slug: "cubapoesia",
    name: "Cubapoesia",
    bio: "Sitio oficial del Festival de Poesía de La Habana.",
    longBio:
      "Sitio oficial del Festival de Poesía de La Habana, promoviendo la literatura y la cultura.",
    avatar: "/avatars/elena-march.svg",
  },
];

export const categories = [
  { slug: "general", name: "General" },
  { slug: "essays", name: "Ensayos" },
  { slug: "interviews", name: "Entrevistas" },
];

export const tags = [
  { slug: "writing", name: "Escritura" },
  { slug: "poetry", name: "Poesía" },
  { slug: "habana", name: "La Habana" },
];
