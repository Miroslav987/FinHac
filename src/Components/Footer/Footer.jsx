import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ width: "100%" }}>
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} color="white">
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: 40,
            marginBottom: 10,
          }}>
          OnlineShop
        </Typography>
        <Box marginBottom={3} borderBottom={1}></Box>
        <Container
          maxWidth="lg"
          sx={{ fontSize: 20, fontFamily: "sans-serif" }}>
          <Box className="footText">
            <ul>
              Help
              <li>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </li>
            </ul>

            <ul>
              Account
              <li>
                <Link href="/" color="inherit">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/" color="inherit">
                  Register
                </Link>
              </li>
            </ul>
            <ul>
              Messages
              <li>
                <Link href="/" color="inherit">
                  Backup
                </Link>
              </li>
              <li>
                <Link href="/" color="inherit">
                  History
                </Link>
              </li>
              <li>
                <Link href="/" color="inherit">
                  Roll
                </Link>
              </li>
            </ul>
          </Box>
          <Box marginTop={3} borderBottom={1}></Box>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Material UI Onlineshop &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
