import React from "react";
import { Button } from "@mui/material";

const ButtonElement = ({ label, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth
      sx={{ width: "100px" }}
    >
      {label}
    </Button>
  );
};

export default ButtonElement;
