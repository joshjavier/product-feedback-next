import '@mantine/core/styles.css';
import './global.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { jost } from '@/fonts';
import { theme } from '../theme';

export const metadata = {
  title: 'Frontend Mentor | Product feedback app',
  description:
    'A full-stack product feedback app built with Next.js. Users can submit, upvote, and comment on feature requests to help prioritize product development.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps} className={jost.className}>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
