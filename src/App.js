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

  return (
    <body>
      <div className="App">
        <Card className={classes.bar}>
          <Button
            variant="contained"
            component={Link}
            to="/login"
          >
            Log in
          </Button>
        </Card>
        <h3> </h3>
        <main>
	 			  <Router />
	 		  </main>
      </div>
    </body>
    
  );
}

export default App;
