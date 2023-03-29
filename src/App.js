import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Router from './component/Router';
import {
  Button,
  Card,
  CardContent,
  Grid
}
from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { clearLocalStorage } from './api';

const useStyles = makeStyles(() => ({
  main : {
      display : 'flex',
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center'
  },
  bar : {
      width : 'full',
      backgroundColor : "#0800FF",
      padding : '15px 20px 15px 15px',
      borderRadius: '0%',
      textAlign: 'right'
  },
  textField : {
      marginTop : '10px',
      marginButtom : '10px'
  },
  loginButton : {
      backgroundColor : '#28EE28',
  }
}))

function App() {

  const classes = useStyles();
  const { userData, setUData } = useContext(AuthContext);

  return (
    <div className="App">
      <Card className={classes.bar}>
        {
          userData == undefined ?
          <Button
            variant="contained"
            component={Link}
            to="/login"
          >
            Log in
          </Button> :
          <Button
            variant="contained"
            onClick={clearLocalStorage}
          >
            Log Out
          </Button>
        }
        
      </Card>
      <h3> </h3>
      <main>
	 		  <Router />
		  </main>
    </div>
  );
}

export default App;
