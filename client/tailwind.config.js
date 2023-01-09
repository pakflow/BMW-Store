module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    // styled: true,
    themes: [
      {
        mytheme: {
          primary: '#570DF8',
          secondary: '#F000B8',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
          '.navbar': {
            width: '95%',
            margin: '20px auto',
            'border-radius': '16px',
            'background-color': '#F9FAFB',
          },
        },
      },
    ],
    // base: true,
    // utils: true,
    // logs: true,
    // rtl: false,
    // prefix: "",
    // darkTheme: "dark",
  },
}
