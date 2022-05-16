import { HexColorPicker } from "react-colorful";

const ColorPicker = ({ id, value, onChange}) => {
  const handleChange = (color) => {
    onChange(color);
  }

  return <HexColorPicker color={value || ''} onChange={handleChange} />
}

export default ColorPicker;
