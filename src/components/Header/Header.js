import styles from './Header.module.scss';

const Header = ({ title, description, hasInnerHTML }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        {title && <h1 className={styles.header__title}>{title}</h1>}

        {description && (
          <>
            <hr className={styles.header__divider} />
            {hasInnerHTML ? (
              <p
                className={styles.header__description}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            ) : (
              <p className={styles.header__description}>{description}</p>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
