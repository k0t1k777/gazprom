const rem = (size: number): string => {
  return `${size / 16}rem`;
}

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      // sm: '640px',
      // md: '768px',
      // lg: '1024px',
      // xl: '1280px',
      // xxl: '1536px',
    },
    fontSize: {
      // 7: [rem(7), { lineHeight: "1em" }],
      // 8: [rem(8), { lineHeight: "1em" }],
      // 9: [rem(9), { lineHeight: "1.2em" }],
      // 10: [rem(10), { lineHeight: "1.1em" }],
      // 12: [rem(12), { lineHeight: "1em" }],
      16: [rem(16), { lineHeight: "1.2em" }],
      // 18: [rem(18), { lineHeight: "0.95em" }],
      // 20: [rem(20), { lineHeight: "1em" }],
      // 24: [rem(24), { lineHeight: "0.86em" }],
      // 25: [rem(25), { lineHeight: "1em" }],
      // 30: [rem(30), { lineHeight: "1em" }],
      // 41: [rem(41), { lineHeight: "1em" }],
      // 46: [rem(46), { lineHeight: "0.83em" }],
      // 48: [rem(48), { lineHeight: "0.83em" }],
      // 100: [rem(170), { lineHeight: "1em" }],
    },
    extend: {
      spacing: {
        88.5: rem(354)
      },
      colors: {
        'white': {
          100: '#ffffff',
        },
        'light-gray': {
          100: '#d9d9d9',
        },
        'summer-sky': {
          100: '#33b1ff',
        },
      },
      boxShadow: {
        'shadow': '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
