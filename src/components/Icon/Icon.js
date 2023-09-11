import styles from './Icon.module.scss';

const Icon = ({ name, iconSize, ...rest }) => {
  let iconClassName = `material-symbols-rounded`;

  switch (iconSize) {
    case 'large':
      iconClassName = `${iconClassName} ${styles.icon__large}`;
      break;

    default:
      iconClassName = `${iconClassName} ${styles.icon__regular}`;
      break;
  }

  return (
    <span className={iconClassName} {...rest}>
      {name}
    </span>
  );
};

export default Icon;
