'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Jost, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  colors: {
    grape: [
      '#fceaff',
      '#f1d3fe',
      '#dea4f7',
      '#cb72f2',
      '#bb48ed',
      '#b12dea',
      '#ad1fea', // primary
      '#9711d0',
      '#870bbb',
      '#7500a4',
    ],
    blue: [
      '#eaefff',
      '#d4dbff',
      '#a6b4f6',
      '#62bcfa', // quaternary
      '#4661e6', // secondary
      '#3351e3',
      '#2446e3',
      '#1638ca',
      '#0d31b6',
      '#002aa1',
    ],
    neutral: [
      '#f7f8fd', // neutral-0
      '#f2f4ff', // neutral-1
      '#c0c3d5',
      '#9da2c1',
      '#7f86b0',
      '#6c74a6',
      '#647196', // neutral-6
      '#525a8e',
      '#3a4374', // neutral-8
      '#373f68', // neutral-9
    ],
    orange: [
      '#ffeee6',
      '#ffdcd1',
      '#f8b7a3',
      '#f49f85', // tertiary
      '#ee6e47',
      '#eb592c',
      '#eb4e1e',
      '#d13e11',
      '#bb360d',
      '#a32b05',
    ],
  },
  primaryShade: 6,
  primaryColor: 'grape',
});
