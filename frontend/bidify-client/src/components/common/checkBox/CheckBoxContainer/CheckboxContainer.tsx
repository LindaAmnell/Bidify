import Checkbox from "../Checkbox";
import "./CheckBoxContainer.css";

interface Props {
  showOpen: boolean;
  showClosed: boolean;
  setShowOpen: (value: boolean) => void;
  setShowClosed: (value: boolean) => void;
}

const CheckboxContainer = ({
  showOpen,
  showClosed,
  setShowOpen,
  setShowClosed,
}: Props) => {
  const handleOpenChange = () => {
    if (showOpen) {
      setShowOpen(false);
    } else {
      setShowOpen(true);
      setShowClosed(false);
    }
  };

  const handleClosedChange = () => {
    if (showClosed) {
      setShowClosed(false);
    } else {
      setShowClosed(true);
      setShowOpen(false);
    }
  };

  return (
    <div className="check-div">
      <Checkbox label="Open" checked={showOpen} onChange={handleOpenChange} />

      <Checkbox
        label="Closed"
        checked={showClosed}
        onChange={handleClosedChange}
      />
    </div>
  );
};

export default CheckboxContainer;
