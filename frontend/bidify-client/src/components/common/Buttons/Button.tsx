import "./Button.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <>
      <button onClick={onClick} className="btn">
        {text}
      </button>
    </>
  );
};

export default Button;
