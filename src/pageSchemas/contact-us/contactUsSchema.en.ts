import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_NUMBER } from "@/resources/constants";

const contactPage: PageSchema = {
    meta: {
        title: `Contact Us — ${COMPANY_NAME}`,
        description: `Reach out to ${COMPANY_NAME}. Whether you have questions, need support, or want to collaborate — we’re here to help.`,
        keywords: [
            `${COMPANY_NAME} contact`,
            "support",
            "get in touch",
            "customer service",
        ],
        canonical: "/contact-us",
        ogImage: {
            title: `Contact ${COMPANY_NAME}`,
            description: "Your message matters — let’s talk.",
            bg: "#f9fafb",
            color: "#111827",
        },
    },
    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Let's Build Something Great Together",
            highlight: "Talk to a Real Human, Not a Bot",
            description: `Have a question about ${COMPANY_NAME}, need tailored advice, or want to collaborate? Reach out — our team typically replies within 24 hours on business days.`,
            primaryCta: { text: "Send a Message", link: "#contact-form" },
            secondaryCta: { text: `Email ${COMPANY_EMAIL}`, link: `mailto:${COMPANY_EMAIL}` },
            align: "right",
            showTrustBadge: true,
            eyebrowRotator: ["We're here", "Reply in 24h"],
            panel: {
                docName: "your-message.md",
                section1: {
                    label: "Message Preview",
                    rows: [72, 90, 66, 84],
                },
                section2: {
                    label: "Team Availability",
                    bars: [55, 90, 92, 88, 75],
                },
                section3: {
                    label: "Response Time",
                    points: [90, 82, 70, 60, 48, 40, 30, 22],
                },
                stats: [
                    { value: "< 24h", label: "Typical reply" },
                    { value: "Mon–Fri", label: "Human support" },
                ],
                chip: "We'll get back to you",
            },
        },

        // 🔹 Contact Form
        {
            type: "custom",
            component: "ContactForm",
        },

        // 🔹 FAQ для довіри
        {
            type: "faq",
            items: [
                {
                    question: "How soon will I get a reply?",
                    answer:
                        "We usually respond within 24 hours on business days.",
                },
                {
                    question: "Can I schedule a meeting?",
                    answer:
                        "Yes, send us your request via the form and we’ll arrange a call.",
                },
                {
                    question: "Do you offer customer support on weekends?",
                    answer:
                        "Currently, our support is available Monday to Friday, but we’ll get back to you the next business day.",
                },
            ],
        },
    ],
};

export default contactPage;
