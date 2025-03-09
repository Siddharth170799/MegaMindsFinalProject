import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = ({
  SubMenu1,
  SubMenu2,
  SubMenu3,
  handleSignUp,
  handleLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              handleSignUp();
              handleMenuClose();
            }}
          >
            {SubMenu1}
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>{SubMenu2}</MenuItem>

          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuClose();
            }}
          >
            {SubMenu3}
          </MenuItem>
        </Menu>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          My Books
        </Typography>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Button
            onClick={handleSignUp}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            {SubMenu1}
          </Button>

          <Button color="inherit" sx={{ textTransform: "none" }}>
            {SubMenu2}
          </Button>

          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            {SubMenu3}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
