import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

interface IFeature {
    title: string;
    description: string;
}

interface FeaturesProps {
    features: IFeature[];
}

export const Features = (props: FeaturesProps) => {
    const { features } = props;
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {features.map(({ title, description }, index) => (
                        <div className={clsx("col col--4")} key={index}>
                            <div className="text--center padding-horiz--md">
                                <Heading as="h3">{title}</Heading>
                                <p>{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
