import styles from './Logo.module.scss';

const Logo = ({ title }) => {
  const isologo = '/assets/images/elalifatoblog-isologo.svg';
  const logotipo = '/assets/images/elalifatoblog-logotipo.svg';

  return (
    <div className={styles.logo}>
      <img className={styles.logo__isologo} src={isologo} alt={title} />
      <img className={styles.logo__logotipo} src={logotipo} alt={title} />
    </div>
  );
};

export default Logo;
