import styles from './PostHeader.module.scss';

const PostHeader = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>{children}</div>
    </header>
  );
};

export default PostHeader;
