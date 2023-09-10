import styles from './Logo.module.scss';

const Logo = () => {
  const isologo = '/images/elalifatoblog-isologo.svg';
  const isologoAlt = 'Isologo de elalifato.blog';
  const logotipo = '/images/elalifatoblog-logotipo.svg';
  const logotipoAlt = 'Logotipo de elalifato.blog';

  return (
    <div className={styles.logo}>
      <img className={styles.logo__isologo} src={isologo} alt={isologoAlt} />
      <img className={styles.logo__logotipo} src={logotipo} alt={logotipoAlt} />
    </div>
  );
};

export default Logo;
