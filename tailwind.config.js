
module.exports = {
    theme: {
      extend: {
          colors: {
              'loco-orange': '#e15829',
              'loco-tan': '#DCCFAF',
              'loco-umber': '#983820'
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
          },
          zIndex: {
              '-1': '-1'
          },
          width: {
              '200p': "200%"
          }
      }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ]
  }