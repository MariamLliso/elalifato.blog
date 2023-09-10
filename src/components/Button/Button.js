import { useRouter } from 'next/router';
import styles from './Button.module.scss';
import Icon from 'components/Icon/Icon';

const Button = ({ children, href, isCta, iconLeftName, iconRightName, ...rest }) => {
  const router = useRouter();
  let buttonClassName = styles.button;

  if (isCta) {
    buttonClassName = `${buttonClassName} ${styles.active}`;
  }

  if (href && !isCta) {
    buttonClassName = `${buttonClassName} ${router.asPath === href ? styles.active : ''}`;
  }

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <button type="button" onClick={handleClick} className={buttonClassName} {...rest}>
      {iconLeftName && <Icon name={iconLeftName} />}
      {children}
      {iconRightName && <Icon name={iconRightName} />}
    </button>
  );
};

export default Button;
