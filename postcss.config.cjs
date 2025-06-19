module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
      mixins: {
        button: {
          lineHeight: 'normal',
          height: 'unset',
          border: 'none',
          padding: '10.5px 16px',
          fontWeight: 700,
          fontSize: 13,
          '--button-color': 'var(--mantine-color-neutral-1)',
          '@media (min-width: 36em)': {
            fontSize: 14,
            paddingBlock: '12.5px 11.5px',
            paddingInline: '24px 25px',
          },
        },
      },
    },
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
