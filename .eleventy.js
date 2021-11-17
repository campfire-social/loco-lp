const fs = require("fs");
const Image = require('@11ty/eleventy-img');
const path = require("path");
const classNames = require("classnames");
const outdent = require("outdent");


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

const ImageWidths = {
    ORIGINAL: null,
    PLACEHOLDER: 24,
    };

const imageShortcode = async (
    relativeSrc,
    alt,
    className,
    widths = [null, 400, 800, 1280],
    baseFormat = 'jpeg',
    optimizedFormats = ['webp'],
    sizes = '100vw'
    ) => {
    const { name: imgName, dir: imgDir } = path.parse(relativeSrc);
    const fullSrc = path.join('src', relativeSrc);
    
    const imageMetadata = await Image(fullSrc, {
        widths: [ImageWidths.ORIGINAL, ImageWidths.PLACEHOLDER, ...widths],
        formats: [...optimizedFormats, baseFormat],
        outputDir: path.join('dist', imgDir),
        urlPath: imgDir,
        filenameFormat: (hash, _src, width, format) => {
            const suffix = width === ImageWidths.PLACEHOLDER ? 'placeholder' : width;
            return `${imgName}-${hash}-${suffix}.${format}`;
          },
    });

    // Map each unique format (e.g., jpeg, webp) to its smallest and largest images
    const formatSizes = Object.entries(imageMetadata).reduce((formatSizes, [format, images]) => {
        if (!formatSizes[format]) {
        const placeholder = images.find((image) => image.width === ImageWidths.PLACEHOLDER);
        // 11ty sorts the sizes in ascending order under the hood
        const largestVariant = images[images.length - 1];
    
        formatSizes[format] = {
            placeholder,
            largest: largestVariant,
        };
        }
        return formatSizes;
    }, {});

    // Chain class names w/ the classNames package; optional
    const picture = `<picture class="${classNames('lazy-picture', className)}">
    ${Object.values(imageMetadata)
    // Map each format to the source HTML markup
    .map((formatEntries) => {
        // The first entry is representative of all the others since they each have the same shape
        const { format: formatName, sourceType } = formatEntries[0];

        const placeholderSrcset = formatSizes[formatName].placeholder.url;
        const actualSrcset = formatEntries
        // We don't need the placeholder image in the srcset
        .filter((image) => image.width !== ImageWidths.PLACEHOLDER)
        // All non-placeholder images get mapped to their srcset
        .map((image) => image.srcset)
        .join(', ');

        return `<source type="${sourceType}" srcset="${placeholderSrcset}" data-srcset="${actualSrcset}" data-sizes="${sizes}">`;
    })
    .join('\n')}
    <img
        src="${formatSizes[baseFormat].placeholder.url}"
        data-src="${formatSizes[baseFormat].largest.url}"
        width="400"
        alt="${alt}"
        class="lazy-img"
        loading="lazy">
    </picture>`;


    return picture;

};



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

    config.addShortcode('image', imageShortcode);

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