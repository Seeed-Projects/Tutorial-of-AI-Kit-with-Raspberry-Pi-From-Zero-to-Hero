import clsx from "clsx";
import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

export interface IAction {
    to: string;
    label: string;
}

export interface HeaderProps {
    title: string;
    subtitle: string;
    background: string;
    actions?: IAction[];
}

export const Header = (props: HeaderProps) => {
    const { title, subtitle, background, actions } = props;
    return (
        <header
            className={clsx("hero hero--primary", styles.heroBanner)}
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {title}
                </Heading>
                <p className="hero__subtitle">{subtitle}</p>
                <div className={styles.buttons}>
                    {actions &&
                        actions.map(({ to, label }, index) => (
                            <Link
                                key={index}
                                className="button button--secondary button--lg"
                                to={to}
                            >
                                {label}
                            </Link>
                        ))}
                </div>
            </div>
        </header>
    );
};
