const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

const isDev = process.env.APP_ENV === "development";

const plugins = [
  tailwindcss('tailwind.config.js'),
  autoprefixer,
];

if (!isDev) {
    const purgecss = require('@fullhuman/postcss-purgecss');
    const cssnano = require('cssnano');
    
  
    [].push.apply(plugins, [
      purgecss({
        content: ['src/**/*.liquid', 'src/**/*.md', 'src/**/*.js'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }),
      cssnano({
          preset: 'default',
        }),
    ]);
  }

module.exports = { plugins };


