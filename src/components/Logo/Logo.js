import styles from './Logo.module.scss';

const Logo = ({ title, isBig, isMinimal }) => {
  const isologo = '/assets/images/elalifatoblog-isologo.svg';
  const logotipo = '/assets/images/elalifatoblog-logotipo.svg';

  return (
    <div className={styles.logo}>
      <img className={isBig ? styles.logo__isologoBig : styles.logo__isologo} src={isologo} alt={title} />
      {!isMinimal && (
        <img className={isBig ? styles.logo__logotipoBig : styles.logo__logotipo} src={logotipo} alt={title} />
      )}
    </div>
  );
};

export default Logo;
