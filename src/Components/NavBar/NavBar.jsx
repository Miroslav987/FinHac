import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { basketContext } from "../../context/BasketContextProvider";
import LiveSearch from "../LiveSearch/LiveSearch";
// import { authContext } from "../../context/AuthContextProvider";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { grey } from "@mui/material/colors";
import { chosenContext } from "../../context/ChosenContextProvider";
import { authContext } from "../../context/AuthContextProvider";

function NavBar() {
  const location = useLocation();
  const { basketCount } = React.useContext(basketContext);
  const { chosenCount } = React.useContext(chosenContext);
  const { user, handleLogout } = React.useContext(authContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <Button sx={{ color: "black" }} onClick={handleLogout}>
        LogOut
      </Button>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Link to="/basket">
            <Badge badgeContent={basketCount} color="error">
              <AddShoppingCartIcon sx={{ color: "black" }} />
            </Badge>
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit">
          <Link to="chosen">
            <Badge badgeContent={chosenCount} color="error">
              <StarIcon sx={{ color: "black" }} />
            </Badge>
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box style={{ width: "100%" }} sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          position: "relative",
          bgcolor: "#00000033",
          fontFamily: "sans-serif",
        }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}>
            OnlineShop
          </Typography>

          <Box
            className="Navtext"
            sx={{
              display: "flex",
              width: "75%",
              justifyContent: "space-evenly",
            }}>
            <Link to="/">Home</Link>
            {user.email === "mirsichkar@gmail.com" ? (
              <Link to="/add">Add Products</Link>
            ) : null}
            {location.pathname === "/list" ? (
              <span style={{ cursor: "pointer" }}>Products List</span>
            ) : (
              <Link to="/list">Products List</Link>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link style={{ display: "flex", alignItems: "center" }} to="/">
              {user.email ? user.email : <span>Не зашел</span>}
            </Link>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit">
              <Link to="/basket">
                <Badge badgeContent={basketCount} color="error">
                  <AddShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit">
              <Link to="chosen">
                <Badge badgeContent={chosenCount} color="error">
                  <StarIcon />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"></IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <Link to="/auth">
                <AccountCircle />
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default NavBar;
