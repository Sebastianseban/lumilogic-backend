import { Page } from "../models/Page.js";

export const seedPages = async (categories) => {
  await Page.deleteMany();

  /* ---------------- HOME ---------------- */
  await Page.create({
    title: "Home",
    slug: "home",
    type: "home",
    isPublished: true,
    seo: {
      title: "Home | LumiLogic",
      description: "AI & Cloud solutions for modern enterprises",
    },
    blocks: [],
  });

  /* ---------------- CLOUD MIGRATION ---------------- */
  await Page.create({
    title: "Cloud Migration Services",
    slug: "cloud-migration-services",
    type: "service",
    categoryId: categories.cloudMigration?._id, // Updated to optional chaining just in case
    isPublished: true,
    seo: {
      title: "Cloud Migration Services | LumiLogic",
      description:
        "Seamlessly migrate applications, data, and infrastructure to the cloud.",
    },
    blocks: [
      {
        type: "hero",
        data: {
          heading: "Cloud Migration",
          subheading: "Empower Your Business with Cloud Agility",
          description:
            "Cloud Migration services help organizations securely and efficiently move applications, data, and infrastructure from on-premises or legacy environments to the cloud. By adopting a structured migration approach, businesses can improve scalability, reduce costs, enhance security, and accelerate digital transformation.",
          ctaText: "Enquire Now",
          ctaLink: "/contact",
          backgroundImage: "/images/cloud-migration-hero.jpg"
        },
      },
      // 2. Why Cloud Migration?
      {
        type: "feature-split", // Text left, Image/Icon right
        data: {
          heading: "WHY CLOUD MIGRATION?",
          description:
            "Traditional infrastructure limits flexibility and increases operational overhead. Cloud migration enables organizations to modernize IT environments, scale resources on demand, and gain access to advanced cloud services while maintaining business continuity.",
          image: "/images/cloud-upload-icon.png", // Placeholder for the cloud icon
          imagePosition: "right"
        },
      },
      // 3. Our Cloud Migration Approach
      {
        type: "process-grid",
        data: {
          heading: "OUR CLOUD MIGRATION APPROACH",
          description: "We follow a proven, end-to-end methodology to ensure a smooth and risk-free transition to the cloud.",
          steps: [
            {
              number: "01",
              title: "Migration Planning",
              description: "Evaluate existing infrastructure, workloads, dependencies, and readiness to define the right cloud migration strategy."
            },
            {
              number: "02",
              title: "Strategy Selection",
              description: "Choose the optimal approach—Rehost, Replatform, Refactor, or Hybrid—based on business goals and technical requirements."
            },
            {
              number: "03",
              title: "App & Data Migration",
              description: "Securely migrate applications, databases, and workloads with minimal downtime and data integrity assurance."
            },
            {
              number: "04",
              title: "Architecture Design",
              description: "Design scalable, secure, and high-performance cloud architectures tailored to business needs."
            },
            {
              number: "05",
              title: "Testing & Validation",
              description: "Validate performance, security, and functionality before production cutover."
            },
            {
              number: "06",
              title: "Go-Live & Optimization",
              description: "Execute migration, optimize cloud resources, and ensure a smooth transition to live operations."
            }
          ]
        },
      },
      // 4. Cloud Migration Services We Offer
      {
        type: "services-grid",
        data: {
          heading: "CLOUD MIGRATION SERVICES WE OFFER",
          services: [
            { title: "On-premises to cloud migration", icon: "server" },
            { title: "Application and workload migration", icon: "code" },
            { title: "Database migration to cloud platforms", icon: "database" },
            { title: "Data center migration and consolidation", icon: "building" },
            { title: "Hybrid and multi-cloud migration", icon: "cloud" }
          ]
        },
      },
      // 5. Cloud Platforms We Support
      {
        type: "logo-grid",
        data: {
            heading: "CLOUD PLATFORMS WE SUPPORT",
            logos: [
                { name: "AWS", description: "Amazon Web Services", image: "/images/aws-logo.png" },
                { name: "Azure", description: "Microsoft Azure", image: "/images/azure-logo.png" },
                { name: "GCP", description: "Google Cloud Platform", image: "/images/gcp-logo.png" }
            ]
        }
      },
      // 6. Key Benefits
      {
        type: "benefits-grid",
        data: {
          heading: "KEY BENEFITS",
          benefits: [
            {
              title: "Cost Efficiency",
              description: "Reduced infrastructure and maintenance costs",
              icon: "money"
            },
            {
              title: "Scalability",
              description: "Improved scalability and flexibility",
              icon: "expand"
            },
            {
              title: "Security",
              description: "Enhanced security and compliance",
              icon: "shield"
            },
            {
              title: "Performance",
              description: "High availability and performance",
              icon: "speedometer"
            },
            {
              title: "Innovation",
              description: "Faster innovation and deployment",
              icon: "rocket"
            }
          ]
        },
      }
    ],
  });

  /* ---------------- APPLICATION MIGRATION ---------------- */
  await Page.create({
    title: "Application Migration Services",
    slug: "application-migration-services",
    type: "service",
    categoryId: categories.cloudMigration?._id,
    isPublished: true,
    seo: {
      title: "Application Migration Services | LumiLogic",
      description: "Secure, efficient, and disruption-free application migration to modern cloud platforms.",
    },
    blocks: [
      {
        type: "hero",
        data: {
          heading: "Application Migration Services",
          subheading: "Secure, Efficient, and Disruption-Free",
          description:
            "Application Migration Services help businesses move their applications from legacy systems, on-premises servers, or outdated environments to modern cloud or updated platforms. Our approach ensures secure, efficient, and disruption-free migration while improving performance, scalability, and maintainability of applications.",
          ctaText: "Enquire Now",
          ctaLink: "/contact",
          backgroundImage: "/images/app-migration-hero.jpg"
        },
      },
      // 2. Why Application Migration?
      {
        type: "feature-split",
        data: {
          heading: "WHY APPLICATION MIGRATION?",
          description:
            "As businesses grow, legacy applications often struggle with performance, scalability, and security. Application migration enables organizations to modernize their systems, reduce operational complexity, and unlock the full benefits of cloud and modern architectures.",
          image: "/images/why-app-migration.png",
          imagePosition: "right"
        },
      },
      // 3. Our Application Migration Approach
      {
        type: "process-grid",
        data: {
          heading: "OUR APPLICATION MIGRATION APPROACH",
          description: "We follow a structured and proven methodology to ensure smooth application transitions with minimal risk.",
          steps: [
            {
              number: "01",
              title: "Application Assessment & Discovery",
              description: "Evaluate existing applications, dependencies, performance, and compatibility to determine the optimal migration strategy."
            },
            {
              number: "02",
              title: "Migration Strategy & Planning",
              description: "Define the right approach—Rehost, Replatform, Refactor, or Replace—aligned with business goals and technical requirements."
            },
            {
              number: "03",
              title: "Application Modernization",
              description: "Upgrade frameworks, databases, and architectures to improve performance, security, and scalability."
            },
            {
              number: "04",
              title: "Secure Application Migration",
              description: "Migrate applications with minimal downtime, ensuring data integrity and continuity of operations."
            },
            {
              number: "05",
              title: "Testing & Validation",
              description: "Conduct functional, performance, and security testing to ensure applications work seamlessly in the new environment."
            },
            {
              number: "06",
              title: "Deployment & Go-Live",
              description: "Deploy applications to the target environment and ensure smooth production rollout."
            }
          ]
        },
      },
      // 4. Types of Application Migration We Offer
      {
        type: "services-grid",
        data: {
          heading: "TYPES OF APPLICATION MIGRATION WE OFFER",
          services: [
            { title: "Legacy application migration", icon: "archive" },
            { title: "On-premises to cloud application migration", icon: "cloud-upload" },
            { title: "Application migration between cloud platforms", icon: "exchange" },
            { title: "Monolithic to microservices migration", icon: "cubes" },
            { title: "ERP, CRM, and business application migration", icon: "briefcase" }
          ]
        },
      },
      // 5. Key Benefits
      {
        type: "benefits-grid",
        data: {
          heading: "KEY BENEFITS",
          benefits: [
            {
              title: "Performance",
              description: "Improved application performance and reliability.",
              icon: "speedometer"
            },
            {
              title: "Security",
              description: "Enhanced security and compliance.",
              icon: "shield"
            },
            {
              title: "Cost Reduction",
              description: "Reduced infrastructure and maintenance costs.",
              icon: "money"
            },
            {
              title: "Scalability",
              description: "Greater scalability and flexibility.",
              icon: "expand"
            },
            {
              title: "Innovation",
              description: "Faster application updates and innovation.",
              icon: "lightbulb"
            }
          ]
        },
      },
      // 6. Technologies & Platforms
      {
        type: "services-grid", // Adapting for tech list
        data: {
            heading: "TECHNOLOGIES & PLATFORMS",
            services: [
                { title: "Cloud Platforms", description: "AWS, Azure, Google Cloud", icon: "cloud" },
                { title: "Containers", description: "Docker, Kubernetes", icon: "docker" },
                { title: "Databases", description: "SQL & NoSQL", icon: "database" },
                { title: "Modern Tech", description: "Modern Frameworks & APIs", icon: "code" }
            ]
        }
      },
      // 7. Who Can Benefit?
      {
        type: "services-grid", // Or could be a list, using services-grid for consistency
        data: {
            heading: "WHO CAN BENEFIT?",
            services: [
                { title: "Enterprises modernizing legacy applications", icon: "building" },
                { title: "Businesses migrating to cloud-native platforms", icon: "briefcase" },
                { title: "Organizations improving application scalability and security", icon: "shield-check" }
            ]
        }
      },
       // 8. Post-Migration Support
       {
        type: "hero", // Reusing hero for a CTA section or similar big block, or feature-split
        data: {
          heading: "POST-MIGRATION SUPPORT",
          description: "We offer ongoing support, monitoring, performance tuning, and optimization to ensure your applications continue to operate efficiently and securely after migration.",
          ctaText: "Get Support",
          ctaLink: "/contact",
          backgroundImage: "/images/support-bg.jpg" // Placeholder
        },
      },
    ],
  });

  console.log("✅ Pages seeded successfully");
};