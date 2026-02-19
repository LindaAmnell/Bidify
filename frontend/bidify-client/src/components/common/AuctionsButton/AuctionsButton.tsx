import "./AuctionsButton.css";
type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const AuctionsButton = ({ text, onClick, disabled }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled} className="auction-btn">
      {text}
    </button>
  );
};

export default AuctionsButton;
