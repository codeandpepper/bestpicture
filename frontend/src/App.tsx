import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MoviesListPage from "./Movies/MoviesListPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <LocalMoviesIcon />
          <Typography variant="h6" className={classes.title}>
            Best Picture
          </Typography>
        </Toolbar>
      </AppBar>
      <MoviesListPage />
    </div>
  );
}

export default App;
