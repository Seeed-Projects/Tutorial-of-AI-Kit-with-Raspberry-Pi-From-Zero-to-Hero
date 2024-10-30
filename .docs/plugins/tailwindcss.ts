const tailwindCssPlugin = (context, options) => {
    return {
        name: "tailwindcss-plugin",
        configurePostCss(postcssOptions) {
            postcssOptions.plugins = [
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer"),
            ];
            return postcssOptions;
        },
    };
};

export default tailwindCssPlugin;
