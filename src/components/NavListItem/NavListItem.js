import styles from './NavListItem.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavListItem = ({ className, item }) => {
  const router = useRouter();
  let ancorStyles = styles.ancor;

  if (item.path) {
    ancorStyles = `${ancorStyles} ${router.asPath === item.path ? styles.active : ''}`;
  }

  const nestedItems = (item.children || []).map((item) => {
    return <NavListItem key={item.id} item={item} />;
  });

  return (
    <li key={item.id}>
      {/* 
        Before rendering the Link component, we first check if `item.path` exists
        and if it does not include 'http'. This prevents a TypeError when `item.path` is null.
      */}
      {item.path && !item.path.includes('http') && !item.target && (
        <Link href={item.path} title={item.title} className={ancorStyles}>
          {item.label}
        </Link>
      )}
      {/* 
        Before rendering the `a` tag, we first check if `item.path` exists
        and if it includes 'http'. This prevents a TypeError when `item.path` is null.
      */}
      {item.path && item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target} className={ancorStyles}>
          {item.label}
        </a>
      )}

      {nestedItems.length > 0 && <ul className={(className, ancorStyles)}>{nestedItems}</ul>}
    </li>
  );
};

export default NavListItem;
