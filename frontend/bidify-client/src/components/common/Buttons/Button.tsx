import "./Button.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({ text, onClick, disabled, type = "button" }: ButtonProps) => {
  return (
    <div className="btn-div">
      <button disabled={disabled} type={type} onClick={onClick} className="btn">
        {text}
      </button>
    </div>
  );
};

export default Button;
