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
  { to: "/categories/sureditores", label: "surEditores" },
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
    avatar: "/avatar.png",
  },
];

export const categories = [
  { slug: "general", name: "General" },
  { slug: "ensayos", name: "Ensayos" },
  { slug: "entrevistas", name: "Entrevistas" },
  { slug: "convocatorias", name: "Convocatorias" },
  { slug: "noticias", name: "Noticias" },
  { slug: "sureditores", name: "surEditores" },
];

export const tags = [
  { slug: "escritura", name: "Escritura" },
  { slug: "poesia", name: "Poesía" },
  { slug: "habana", name: "La Habana" },
  { slug: "palestina", name: "Palestina" },
  { slug: "mitin-virtual", name: "Mitin Virtual" },
  { slug: "festival-2024", name: "Festival 2024" },
  { slug: "festival-2025", name: "Festival 2025" },
  { slug: "festival-2026", name: "Festival 2026" },
  { slug: "festival-2027", name: "Festival 2027" },
  { slug: "homenaje", name: "Homenaje" },
  { slug: "libros", name: "Libros" },
  { slug: "ebooks", name: "E-books" },
];
