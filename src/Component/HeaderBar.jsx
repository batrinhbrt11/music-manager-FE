import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    inherit: {
      main: "rgba(255, 255, 255, 0.7)",
    },
  },
});

const Headerbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Music Manager
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                className="buttonIcon"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="/">
                <MenuItem onClick={handleCloseNavMenu}>
                    <MusicNoteIcon />
                    <Typography textAlign="center">Music</Typography> 
                    
                  </MenuItem>
                  </Link>
                  <Link to="/genre">
                <MenuItem onClick={handleCloseNavMenu}>
                  <LibraryMusicIcon />
                  <Typography textAlign="center">Genre</Typography>
                </MenuItem>
                </Link>
                <Link to="/singer">
                <MenuItem onClick={handleCloseNavMenu}>
                  <RecordVoiceOverOutlinedIcon />
                  <Typography textAlign="center">Singer</Typography>
                </MenuItem>
                </Link>
                <Link to="/playlist">
                <MenuItem onClick={handleCloseNavMenu}>
                  <QueueMusicIcon />
                  <Typography textAlign="center">Playlist</Typography>
                </MenuItem>
                </Link>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Music
                  <MusicNoteIcon />
                </Button>
              </Link>
              <Link to="/genre">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Genre
                <LibraryMusicIcon />
              </Button>
              </Link>
              <Link to="/singer">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Singer
                <RecordVoiceOverOutlinedIcon />
              </Button>
              </Link>
              <Link to="/playlist">
              <Button
                className="buttonMenu"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Playlist
                <QueueMusicIcon />
              </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Headerbar;
