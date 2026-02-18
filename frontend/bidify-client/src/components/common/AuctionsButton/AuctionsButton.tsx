import "./AuctionsButton.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const AuctionsButton = ({ text, onClick }: ButtonProps) => {
  return (
    <>
      <button className="auction-btn" onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default AuctionsButton;
