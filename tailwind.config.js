
module.exports = {
    theme: {
      extend: {
          colors: {
              'loco-orange': '#e15829',
              'loco-tan': '#DCCFAF',
              'loco-umber': '#983820',
              'loco-blue': '#22432a'
          },
          inset: {
            '18p': '18%',
            '30p': '30%',
            '-50': '-50%',
            '-1px': '-1px'
          },
          fontFamily: {
              'sans': [ "Titillium Web", 'Helvetica', 'Arial', 'sans-serif' ],
              'serif': ['Claredon', 'Georgia', "Times New Roman", 'serif' ]
          },
          spacing: {
              '-2/5': '-40%',
              '-1/2': '-50%',
              '-1/4': '-25%',
              '-1/5': '-20%',
              '-1/10': '-10%',
              '-1px': '-1px',
              '1.5': '0.375rem',
              '-1.5': '-0.375rem',
              '2px': "2px",
              '0.5' : '.125rem'
          },
          zIndex: {
              '-1': '-1'
          },
          width: {
              '200p': "200%"
          },
          height: {
              '2px': "2px",
              '0.5' : '.125rem'
          },
          animation: {
            fadeIn: "fadeIn 750ms ease-in forwards"
          },
          keyframes: {
            fadeIn: {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 }
            }
          },
          translate: {
              '1.5': '0.375rem',
              '-1.5': '-0.375rem'
          }
      }
    },
    variants: {
        animation: ["motion-safe"]
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ]
  }