import React from "react";
import { Button, Box, FormControl, InputLabel, Input } from "@mui/material";

const AddBookForm = ({
  inputElements,
  formData,
  handleInputChange,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Box display="flex" gap={2}>
          {inputElements.map((item, index) => (
            <FormControl key={index} fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor={item.name}>{item.label}</InputLabel>
              <Input
                id={item.name}
                name={item.name}
                value={formData[item.name]}
                onChange={handleInputChange}
                placeholder={item.placeholder}
              />
            </FormControl>
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddBookForm;
