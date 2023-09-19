import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styles from './Layout.module.scss';

import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';

import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;

  const { homepage, metadata = {} } = useSite();

  if (!metadata.og) {
    metadata.og = {};
  }

  metadata.og.url = `${homepage}${asPath}`;

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate: process.env.WORDPRESS_PLUGIN_SEO === true ? '%s' : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Gelasio:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
        },
        // Favicon sizes and manifest generated via https://favicon.io/
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    }),
  };

  return (
    <div className={styles.layout}>
      <Helmet {...helmetSettings} />

      <Nav />

      <Main>{children}</Main>

      <Footer />
    </div>
  );
};

export default Layout;
