import React from "react";
import "../styles/Switch.css";

export interface SwitchProps {
  checked: boolean;
  setChecked: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  setChecked,
}): React.ReactElement => {
  const handleCheck = () => {
    setChecked((prev: boolean) => !prev);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.code === "Space") {
      setChecked(!checked);
      e.preventDefault();
    }
  };

  return (
    <label className="Switch" tabIndex={0} onKeyDown={handleKeyPress}>
      <div className={`Switch-track ${checked ? "Switch-track_active" : ""}`}>
        <span className={`Switch-dot ${checked ? "Switch-dot_active" : ""}`} />
      </div>
      <input
        className="Switch-input"
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
      />
    </label>
  );
};

export default Switch;
