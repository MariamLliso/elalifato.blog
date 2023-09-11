import { useRouter } from 'next/router';
import styles from './Button.module.scss';
import Icon from 'components/Icon/Icon';
import React from 'react';

const Button = React.forwardRef(({ children, href, isCta, iconLeftName, iconRightName, iconSize, ...rest }, ref) => {
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
    <button ref={ref} type="button" onClick={handleClick} className={buttonClassName} {...rest}>
      {iconLeftName && <Icon name={iconLeftName} iconSize={iconSize} />}
      {children}
      {iconRightName && <Icon name={iconRightName} iconSize={iconSize} />}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
