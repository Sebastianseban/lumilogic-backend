import { Page } from "../models/Page.js";

export const seedPages = async (categories) => {
  await Page.deleteMany();

  // ------------------------
  // HOME PAGE
  // ------------------------
  await Page.create({
    title: "Home",
    slug: "home",
    type: "home",
    isPublished: true,
    blocks: [
      {
        type: "hero",
        data: {
          heading: "Empower Your Business with",
          highlight: "AI & Cloud-Native Technologies",
          ctaText: "Our Services",
          ctaLink: "/services",
        },
      },
      {
        type: "stats",
        data: {
          items: [
            { value: "10+", label: "Years Experience" },
            { value: "150+", label: "Projects Delivered" },
            { value: "99%", label: "Client Satisfaction" },
          ],
        },
      },
    ],
    seo: {
      title: "Home | Lumilogic",
      description: "AI & Cloud solutions for modern enterprises",
    },
  });

  // ------------------------
  // SERVICE PAGE
  // ------------------------
  await Page.create({
    title: "Cloud Migration Services",
    slug: "cloud-migration-services",
    type: "service",
    categoryId: categories.migration._id,
    isPublished: true,
    blocks: [
      {
        type: "hero",
        data: {
          heading: "Cloud Migration & Modernization",
          subheading: "Seamless, secure, scalable cloud adoption",
        },
      },
      {
        type: "content",
        data: {
          title: "Why Cloud Migration?",
          text: "Move faster, scale better, and reduce infrastructure costs.",
        },
      },
    ],
    seo: {
      title: "Cloud Migration Services",
      description: "Secure and scalable cloud migration solutions",
    },
  });
};