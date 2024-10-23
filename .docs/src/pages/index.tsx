import Layout from "@theme/Layout";
import { Header } from "@site/src/components/Header";
import { Features } from "@site/src/components/Features";
import { featuresConfig } from "../config/features";
import { siteConfig } from "../config/global";
import { linksConfig } from "../config/links";

const App = () => {
    const { actions } = linksConfig;
    const { title, description, base } = siteConfig;

    return (
        <Layout description={description}>
            <Header
                title={title}
                actions={actions}
                subtitle={`${description}`}
                background={`${base}img/hero.webp`}
            />
            <Features features={featuresConfig} />
        </Layout>
    );
};

export default App;
