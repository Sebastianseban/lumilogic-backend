import { Category } from "../models/Category.js";

export const seedCategories = async () => {
    try {
        await Category.deleteMany();
        console.log("Deleted existing categories");

        /* ================== TOP LEVEL ================== */

        const awsLL = await Category.create({
            title: "AWS & LL",
            slug: "aws-ll",
            order: 1,
        });

        const services = await Category.create({
            title: "Services",
            slug: "services",
            order: 2,
        });

        const aboutUs = await Category.create({
          title: "About Us",
          slug: "about-us",
          order: 3,
        });

        /* ================== AWS & LL SUB-CATEGORIES ================== */

        // 1. Cloud Migration & Modernization (From Image 1)
        const cloudMigration = await Category.create({
            title: "Cloud Migration & Modernization",
            slug: "cloud-migration-modernization",
            parentId: awsLL._id,
            order: 1,
        });

        await Category.create([
            { title: "Cloud Migration Services", slug: "cloud-migration-services", parentId: cloudMigration._id, order: 1 },
            { title: "Application Migration Services", slug: "application-migration-services", parentId: cloudMigration._id, order: 2 },
            { title: "Database Migration Services", slug: "database-migration-services", parentId: cloudMigration._id, order: 3 },
            { title: "Application Modernization", slug: "application-modernization", parentId: cloudMigration._id, order: 4 },
            { title: "Database Modernization Services", slug: "database-modernization-services", parentId: cloudMigration._id, order: 5 },
            { title: "Database Migration & Modernization", slug: "database-migration-modernization", parentId: cloudMigration._id, order: 6 },
        ]);

        // 2. Generative AI Solutions (From Image 4 - No arrow shown, assuming no children for now or keeping flat)
        await Category.create({
            title: "Generative AI Solutions",
            slug: "generative-ai-solutions",
            parentId: awsLL._id,
            order: 2,
        });

        // 3. Data & Analytics (From Image 4 - No arrow shown)
        await Category.create({
            title: "Data & Analytics",
            slug: "data-analytics",
            parentId: awsLL._id,
            order: 3,
        });

        // 4. AWS for Financial Services (From Image 4 - Has arrow)
        const awsFinance = await Category.create({
            title: "AWS for Financial Services",
            slug: "aws-financial-services",
            parentId: awsLL._id,
            order: 4,
        });

        // Preserving these from original code as likely content
        await Category.create([
            { title: "Advanced Analytics", slug: "advanced-analytics", parentId: awsFinance._id, order: 1 },
            { title: "Accelerate Data Preparation for ML", slug: "accelerate-data-prep-ml", parentId: awsFinance._id, order: 2 },
        ]);

        /* ================== SERVICES SUB-CATEGORIES ================== */

        // 1. Business Applications (From Image 3)
        const businessApps = await Category.create({
            title: "Business Applications",
            slug: "business-applications",
            parentId: services._id,
            order: 1,
        });

        await Category.create([
            { title: "SAP Services", slug: "sap-services", parentId: businessApps._id, order: 1 },
            { title: "ServiceNow", slug: "servicenow", parentId: businessApps._id, order: 2 },
            { title: "Customer Experience", slug: "customer-experience", parentId: businessApps._id, order: 3 },
        ]);

        // 2. Data & AI (From Image 5)
        const dataAI = await Category.create({
            title: "Data & AI", // Note: This duplicates the title "Data & AI" under "AWS & LL" but under a different parent. Slug must be unique.
            slug: "services-data-ai", // Unique slug
            parentId: services._id,
            order: 2,
        });

        await Category.create([
            { title: "Intelligence Fabric", slug: "intelligence-fabric", parentId: dataAI._id, order: 1 },
            { title: "Data Foundations", slug: "data-foundations", parentId: dataAI._id, order: 2 },
            { title: "Analytics & AI", slug: "analytics-ai", parentId: dataAI._id, order: 3 },
            { title: "Workplace AI", slug: "workplace-ai", parentId: dataAI._id, order: 4 },
        ]);

        // 3. Application Services (From Image 6 - Has arrow)
        const appServices = await Category.create({
            title: "Application Services",
            slug: "application-services",
            parentId: services._id,
            order: 3,
        });

        // Preserving from original code
        await Category.create([
            { title: "Modern Applications", slug: "modern-applications", parentId: appServices._id, order: 1 },
            { title: "DevOps", slug: "devops", parentId: appServices._id, order: 2 },
            { title: "Application Security", slug: "application-security", parentId: appServices._id, order: 3 },
            { title: "Data & AI", slug: "app-data-ai", parentId: appServices._id, order: 4 }, // Another Data & AI? Keeping it safe with unique slug
        ]);

        // 4. Cloud Services (From Image 2)
        const cloudServices = await Category.create({
            title: "Cloud Services",
            slug: "cloud-services",
            parentId: services._id,
            order: 4,
        });

        await Category.create([
            { title: "Cloud Migration", slug: "cloud-migration", parentId: cloudServices._id, order: 1 },
            { title: "Cloud Managed Services", slug: "cloud-managed-services", parentId: cloudServices._id, order: 2 },
            { title: "Security", slug: "cloud-security", parentId: cloudServices._id, order: 3 },
            { title: "FinOps", slug: "finops", parentId: cloudServices._id, order: 4 },
            { title: "Cloud Providers", slug: "cloud-providers", parentId: cloudServices._id, order: 5 },
        ]);

        console.log("✅ Categories seeded successfully");
        
        return {
            awsLL,
            services,
            cloudMigration,
        };
    } catch (error) {
        console.error("❌ Error seeding categories:", error);
    }
};