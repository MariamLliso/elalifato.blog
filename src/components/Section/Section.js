import styles from './Section.module.scss';

const Section = ({ children, className, ...rest }) => {
  return (
    <section className={className ? className : styles.section} {...rest}>
      {children}
    </section>
  );
};

export default Section;
