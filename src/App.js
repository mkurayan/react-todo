import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ToDo from './components/ToDo/ToDo';
import {inSessionStore}  from './api/api';
import { createMuiTheme, makeStyles, responsiveFontSizes  } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: { 
    [theme.breakpoints.up("sm")]: {
      boxShadow: "0px 0px 60px rgba(0,0,0,0.4)",
      borderRadius: "10px",
      margin: [[theme.spacing(5), 0]]
    },
    [theme.breakpoints.up("md")]: {
      margin: [[theme.spacing(8), 0]]
    },
    [theme.breakpoints.up("lg")]: {
      margin: [[theme.spacing(10), 0]]
    }, 
  }
}));

let theme = createMuiTheme({});

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToDo taskApi={inSessionStore} styleName={classes.root}/>
    </ThemeProvider>  
  );
}