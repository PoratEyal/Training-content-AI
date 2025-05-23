export const buildFaqSchema = (
  faqList: { q: string; a: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqList.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
});

export const buildHomeSchema = (
  locale: string,
  slogan: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ActivityWiz",
  url: "https://activitywiz.com/",
  inLanguage: locale,
  description: slogan,
});

export const buildContentSchema = (
  subjects: { name: string; metaTitle: string }[],
  baseRoute: string
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "תוכן פעילויות",
  hasPart: subjects.map((s) => ({
    "@type": "WebPage",
    name: s.metaTitle,
    url: `https://activitywiz.com${baseRoute}/${s.name}`,
  })),
});

export const buildSavedActivitiesSchema = (
  activities: { id: string; subject: string }[],
  baseRoute: string
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: activities.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "WebPage",
      name: a.subject,
      url: `https://activitywiz.com${baseRoute}/${a.id}`,
    },
  })),
});

