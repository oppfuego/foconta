import type {Metadata} from "next";
import enExpertTerms from "@/pageSchemas/expert-terms/expertTerms.en";

import PageCreator from "@/components/features/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";
import styles from "@/resources/PolicyPage.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enExpertTerms.meta);
}

export default function Page() {
    return (
        <div className={styles.privacyContainer}>
            <PageCreator schemaMap={{ sv: enExpertTerms, en: enExpertTerms }} />
        </div>
    );
}
