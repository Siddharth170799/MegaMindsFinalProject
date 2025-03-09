import React from "react";
import { TextField } from "@mui/material";

const InputElement = ({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      fullWidth
      sx={{ mb: 2, mt: 2, width: "300px", backgroundColor: "lightblue" }}
    />
  );
};

export default InputElement;
