import type { Config } from "@docusaurus/types";
import { siteConfig } from "./src/config/global";
import { linksConfig } from "./src/config/links";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";
import tailwindCssPlugin from "./plugins/tailwindcss";

const config: Config = {
    url: siteConfig.url,
    title: siteConfig.title,
    baseUrl: siteConfig.base,
    favicon: siteConfig.favicon,
    tagline: siteConfig.description,
    themeConfig: {
        image: siteConfig.social,
        navbar: {
            title: siteConfig.title,
            items: linksConfig.navigators,
            logo: { src: siteConfig.logo },
        },
        i18n: { defaultLocale: "en", locales: ["en"] },
        footer: { style: "light", copyright: siteConfig.copyright },
        prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
        themeConfig: {
            colorMode: {
                disableSwitch: true,
                respectPrefersColorScheme: true,
            },
        },
    } satisfies Preset.ThemeConfig,
    presets: [
        [
            "classic",
            {
                docs: { sidebarPath: "./sidebars.ts", path: "../articles" },
                theme: { customCss: "./src/css/custom.css" },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [tailwindCssPlugin],
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
};

export default config;
