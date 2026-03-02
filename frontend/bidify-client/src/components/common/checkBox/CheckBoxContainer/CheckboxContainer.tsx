import Checkbox from "../Checkbox";
import "./CheckBoxContainer.css";

interface Option {
  label: string;
  checked: boolean;
  onChange: () => void;
}

interface Props {
  options: Option[];
}

const CheckboxContainer = ({ options }: Props) => {
  return (
    <div className="check-div">
      {options.map((option, index) => (
        <Checkbox
          key={index}
          label={option.label}
          checked={option.checked}
          onChange={option.onChange}
        />
      ))}
    </div>
  );
};

export default CheckboxContainer;
