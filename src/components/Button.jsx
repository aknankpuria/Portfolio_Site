const Button = ({ name, isBeam = false, containerClass, onClick, icon }) => {
  return (
    <button className={`btn ${containerClass}`} onClick={onClick}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping_dot"></span>
        </span>
      )}
      {icon && <img src={icon} alt="icon" className="w-5 h-5" />}
      {name}
    </button>
  );
};

export default Button;
