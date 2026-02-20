import "./Button.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="btn-div">
      <button type="button" onClick={onClick} className="btn">
        {text}
      </button>
    </div>
  );
};

export default Button;
