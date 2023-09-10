const Icon = ({ name, ...rest }) => {
  return (
    <span className="material-symbols-rounded" {...rest}>
      {name}
    </span>
  );
};

export default Icon;
