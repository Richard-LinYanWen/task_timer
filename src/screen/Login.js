import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {
    Button,
    Card,
    CardContent,
    Grid
}
from "@material-ui/core";
import { Link } from 'react-router-dom';
import { logIn } from '../api'
import AuthContextProvider, { AuthContext } from '../context/AuthContext.js';

const useStyles = makeStyles((theme) => ({
    main : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    card : {
        width : '400px',
        backgroundColor : "#93F5ED",
        borderRadius: "5%"
    },
    textField : {
        marginTop : '10px',
        marginButtom : '10px'
    },
    loginButton : {
        backgroundColor : '#28EE28',
    }
}))

export default function Login() {

    const classes = useStyles();

    const { userData, setUData } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onLogIn = () => {
        if(username && password) {
            logIn(username, password).then((uData) => {
                if (uData == null) {
                    alert("Invalid username or password");
                }
                else {
                    setUData(uData);
                    window.location.href="/";
                }
            })
        }
    }

    return (
        <div>
            <div className={classes.main}>
                <Card
                    variant="outlined"
                    className={classes.card}
                >
                    <CardContent>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                        >
                        <h2>Login page</h2>
                        <TextField
                            className={classes.textField}
                            type="text"
                            label="Username"
                            onChange={onChangeUsername}
                            required
                        />
                        <TextField
                            className={classes.textField}
                            type="password"
                            label="Password"
                            onChange={onChangePassword}
                            required
                        />
                        <h5> </h5>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            onClick={onLogIn}
                        >
                            Log in
                        </Button>
                        <h5>New here?</h5>
                        <Button
                            variant="text"
                            color="primary"
                            size="small"
                            component={Link}
                            to="/signup"
                        >
                            Sign up
                        </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}