const fs = require("fs");
const path = require("path");

const isDev = process.env.APP_ENV === "development";

const manifestPath = path.resolve(__dirname, "dist", "assets", "manifest.json");
const manifest = isDev ?
    {
        "main.js": "/assets/main.js",
        "main.css": "/assets/main.css",
    } :
    JSON.parse(fs.readFileSync(manifestPath, {
        encoding: "utf8"
    }));

module.exports = function (config) {

    config.setDataDeepMerge(true);

    config.setLiquidOptions({
        dynamicPartials: true,
    });

    config.addPassthroughCopy({
        "src/static": "/assets"
    });

    // Add a shortcode for bundled CSS.
    config.addShortcode("bundledCss", function () {
        return manifest["main.css"] ?
            `<link href="${manifest["main.css"]}" rel="stylesheet" />` :
            "";
    });

    // Add a shortcode for bundled JS.
    config.addShortcode("bundledJs", function () {
        return manifest["main.js"] ?
            `<script src="${manifest["main.js"]}"></script>` :
            "";
    });

    // Reload the page every time any JS/CSS files are changed.
    config.setBrowserSyncConfig({ files: [manifestPath] });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "includes",
            data: "data"
        },
        passthroughFileCopy: true,
        templateFormats: ["liquid", "html", "md"],
        htmlTemplateEngine: "liquid",
        markdownTemplateEngine: "liquid",
    };

}