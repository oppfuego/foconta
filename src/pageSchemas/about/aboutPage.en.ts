import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `About ${COMPANY_NAME} — Our Mission, Vision & Team`,
        description: `${COMPANY_NAME} combines human expertise with artificial intelligence to make business planning faster, smarter, and more accessible. Discover our mission, our story, and the people behind the platform.`,
        keywords: [
            "about business planning platform",
            "AI business generator team",
            "our story",
            "business plan experts",
            "startup innovation",
            "artificial intelligence planning",
        ],
        canonical: "/about-us",
        ogImage: {
            title: `${COMPANY_NAME}`,
            description: "Where expert knowledge meets AI innovation.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: `Building the Future of Business Planning`,
            highlight: `${COMPANY_NAME}`,
            description: `${COMPANY_NAME} was founded with a single vision — to make professional business planning accessible to everyone.  
We blend human intelligence with cutting-edge AI to help founders, students, and professionals turn ideas into structured, investor-ready business plans — in hours, not weeks.`,
            image: "image7",
            align: "right",
            showTrustBadge: true,
        },

        // 🧭 OUR STORY
        {
            type: "section",
            title: "Our Story — From Consulting Desks to AI Innovation",
            description: `Our journey began with a group of business consultants and developers who realized how time-consuming and expensive traditional planning could be.  
We wanted to change that — to build a tool that saves time, cuts costs, and empowers entrepreneurs to focus on what matters most: execution.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: `The Idea Behind ${COMPANY_NAME}`,
                description: `${COMPANY_NAME} started as a collaborative project between strategy consultants, startup founders, and software engineers.  
We saw how many early-stage entrepreneurs were stuck — either paying thousands for expert help or struggling alone with templates.  
That’s why we created a platform that merges both worlds: expert knowledge + AI automation.`,
                bullets: [
                    "Founded by business strategists and AI engineers",
                    "Created to make planning faster and more transparent",
                    "Built on data-driven insights and global startup experience",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image2",
                alt: "Business founders working together",
            },
        },

        // 🎯 MISSION
        {
            type: "custom",
            component: "MissionBanner",
            title: "Our Mission",
            description: `${COMPANY_NAME} helps anyone with an idea — from students to startups — create a professional business plan with confidence.  
We merge automation and personalization, ensuring that every plan reflects both market data and your unique vision.`,
            image: "image10",
        },

        // 🧠 EXPERTISE & AI
        {
            type: "section",
            title: "Where Human Expertise Meets Artificial Intelligence",
            description: `We believe AI is not a replacement for human intelligence — it’s an extension of it.  
Our system was built to assist professional analysts, not replace them.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "image9",
                title: "Human Insight",
                description: `Our business experts bring years of experience in finance, strategy, and market analysis.  
They review every framework and ensure that each AI-generated plan follows real-world logic and investor standards.`,
                bullets: [
                    "Verified business analysts & consultants",
                    "Experience across 15+ industries",
                    "Specialists in market and competitor research",
                ],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                image: "image4",
                title: "AI Precision",
                description: `Our AI engine automates structure, forecasting, and presentation — saving up to 90% of time usually spent writing and formatting.  
It adapts tone, language, and metrics to your audience — whether you pitch investors or prepare academic work.`,
                bullets: [
                    "Instant generation powered by GPT-based models",
                    "Dynamic financial projections and visuals",
                    "Localized content for global markets",
                ],
            },
        },

        // ⚙️ OUR APPROACH
        {
            type: "section",
            title: "Our Approach to AI & Strategy",
            description: `Every feature inside ${COMPANY_NAME} is built around one simple philosophy:  
Technology should enhance decision-making, not replace it.  
Our hybrid model ensures that AI takes care of repetitive tasks, while human professionals set direction and strategy.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Balanced Intelligence",
                description: `We integrate AI-driven analytics with human judgment — producing plans that are both data-backed and contextually sound.`,
                bullets: [
                    "AI-driven forecasting with manual validation",
                    "Scenario planning based on real business cases",
                    "Continuous feedback from domain experts",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image11",
                alt: "Balanced AI and human strategy",
            },
        },

        // 💎 VALUES
        {
            type: "custom",
            component: "ValuesIcons",
            title: "Our Core Values",
            description: `Everything we create is driven by transparency, innovation, and respect for the people who trust us with their ideas.`,
            values: [
                {
                    icon: "🤝",
                    title: "Openness & Integrity",
                    text: "We value honesty and clarity — both in how we work and what we deliver.",
                },
                {
                    icon: "💡",
                    title: "Innovation with Purpose",
                    text: "Technology should empower creativity, not complicate it.",
                },
                {
                    icon: "📊",
                    title: "Data-Driven Precision",
                    text: "Our forecasts and strategies are based on real market insights.",
                },
                {
                    icon: "🌍",
                    title: "Global Accessibility",
                    text: "We make professional planning available to anyone — anywhere.",
                },
            ],
        },

        // 🌎 IMPACT
        {
            type: "section",
            title: "Global Impact & Community",
            description: `${COMPANY_NAME} supports entrepreneurs in over 40 countries.  
We collaborate with universities, incubators, and innovation hubs to make professional planning part of every entrepreneurial journey.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Educational Partnerships",
                description: `Our academic integrations help students learn how to transform ideas into validated business models.`,
                bullets: [
                    "Used in 30+ university entrepreneurship courses",
                    "Partnered with startup accelerators across Europe and Asia",
                    "Empowering next-generation founders",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image8",
                alt: "Global community of entrepreneurs",
            },
        },

        // 📰 PRESS & RECOGNITION
        {
            type: "custom",
            component: "ValuesIcons",
            title: "Press & Recognition",
            description: `Our platform and team have been recognized by top publications and tech events for our innovative approach to combining AI with human creativity.`,
            values: [
                {
                    icon: "🏆",
                    title: "Best AI Startup 2024",
                    text: "Awarded at the European Innovation Summit for our hybrid AI approach.",
                },
                {
                    icon: "📰",
                    title: "Featured in TechRadar & Business Insider",
                    text: "Praised as one of the most accessible tools for startups and SMEs.",
                },
                {
                    icon: "🎤",
                    title: "Global Tech Speaker",
                    text: "Invited to discuss AI ethics and automation at global conferences.",
                },
            ],
        },

        // 🤝 PARTNERSHIPS
        {
            type: "section",
            title: "Partnerships & Integrations",
            description: `We believe collaboration drives progress. ${COMPANY_NAME} integrates with the tools that businesses already use, ensuring seamless workflows and unified data.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Connected Ecosystem",
                description: `From financial platforms to productivity suites — we ensure your planning data moves where it’s needed most.`,
                bullets: [
                    "Integrations with Zoho, Notion, and Google Workspace",
                    "Export-ready business summaries for investors",
                    "API access for enterprise teams",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image12",
                alt: "API and business integrations illustration",
            },
        },

        // 🧑‍💼 TEAM
        {
            type: "custom",
            component: "TeamGrid",
            title: "Meet the Experts Behind the Plans",
            description:
                "Our core team includes business analysts, market researchers, and editors — each bringing years of consulting experience and startup knowledge.",
            members: [
                {
                    name: "Sophie Turner",
                    role: "Senior Business Analyst",
                    bio: "10+ years in strategy consulting. Specializes in startup scalability and investor communications.",
                    image: "team1",
                },
                {
                    name: "Luca Moretti",
                    role: "Financial Model Specialist",
                    bio: "Former Deloitte analyst building financial forecasts and performance simulations.",
                    image: "team2",
                },
                {
                    name: "Isabelle Dubois",
                    role: "Market Research Lead",
                    bio: "Expert in global trends and competitor benchmarking across 20+ industries.",
                    image: "team3",
                },
            ],
        },

        // 🚀 FUTURE VISION
        {
            type: "section",
            title: "Looking Ahead",
            description: `${COMPANY_NAME} continues to evolve.  
Our roadmap includes deeper financial analytics, team collaboration tools, and multilingual business plan generation — making strategic planning easier for a global audience.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Next Milestones",
                description: `We’re working on integrations with CRM, market data APIs, and real-time AI advisors — so your business plan becomes a living, adaptive tool.`,
                bullets: [
                    "Automated investor pitch decks",
                    "Live performance dashboards",
                    "Real-time collaboration & editing",
                    "Integration with Zoho, Notion, and Google Workspace",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image14",
                alt: "Future roadmap illustration",
            },
        },

        // 🔚 FINAL CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Join the Future of Business Planning",
            description: `At ${COMPANY_NAME}, we believe that every idea deserves a chance.  
Whether you’re an entrepreneur, student, or consultant — our mission is to help you plan smarter, faster, and with confidence.`,
            image: "image17",
        },

        // ❓ FAQ — Added section
        {
            type: "faq",
            items: [
                {
                    question: "How does the AI planning process actually work?",
                    answer: `${COMPANY_NAME} uses advanced GPT-based models trained on thousands of verified business frameworks.  
You simply describe your idea, choose a goal (pitch, study, or investor plan), and our system generates a professional structure — ready for review or download.`,
                },
                {
                    question: "Can I combine human expert review with AI generation?",
                    answer: "Yes. You can generate your plan instantly and then request a professional analyst to review and enhance it within 24 hours for investor-ready quality.",
                },
                {
                    question: "Is my business idea and data secure?",
                    answer: "Absolutely. All project data is encrypted and stored on secure servers. ${COMPANY_NAME} never shares your documents or business concepts with third parties.",
                },
                {
                    question: "Who are the experts behind the platform?",
                    answer: "Our team includes business consultants, economists, and AI engineers with backgrounds in global startups, finance, and data analytics. Each plan template is validated by real experts before use.",
                },
                {
                    question: "How can I collaborate or partner with your team?",
                    answer: `We’re open to partnerships with universities, accelerators, and tech ecosystems.  
You can contact us directly via the contact page or email our partnership department at support@${(COMPANY_NAME ?? "company").toLowerCase()}.com.`,
                },
            ],
        },
    ],
};

export default schema;
