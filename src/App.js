import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ToDo from './components/ToDo/ToDo';
import {inSessionStore}  from './api/api';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: { 
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(1),
      boxShadow: "0px",
      borderRadius: "0px"
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5),
      boxShadow: "0px 0px 60px rgba(0,0,0,0.4)",
      borderRadius: "10px"
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(15),
    },
  }
}));

const theme = createMuiTheme({});

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center">
        <ToDo taskApi={inSessionStore} styleName={classes.root}/>
      </Box>  
    </ThemeProvider>
  );
}


