import React, { useState } from "react";
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
import { signUp } from '../api/index.js';

const useStyles = makeStyles((theme) => ({
    main : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : '10px'
    },
    card : {
        width : '400px',
        backgroundColor : "#FDF96D",
        borderRadius: "5%",
        marginBottom : '10px'
    },
    textField : {
        marginTop : '10px',
        marginButtom : '10px'
    },
    signupButton : {
        backgroundColor : '#28EE28',
    }
}))

export default function Signup() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconf, setPasswordconf] = useState('');

    const classes = useStyles();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangePasswordconf = (e) => {
        setPasswordconf(e.target.value);
    }

    const onSignUp = () => {
        if (
            email.length >= 10,
            username.length >= 4,
            name.length >= 4,
            password.length >= 6,
            passwordconf
        )
        {
            signUp(email, username, name, password, passwordconf).then((res) => {
                window.location.href = "/"
            })
            .catch((err) => console.log('SignUp Err:', err));
        }
        else {
            alert('Either email, username, name, or password is not in the correct term');
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
                        <h3>Sign up here</h3>
                        <TextField
                            className={classes.textField}
                            type="text"
                            label="Email address"
                            required
                            onChange={onChangeEmail}
                        />
                        <TextField
                            className={classes.textField}
                            type="text"
                            label="Username"
                            required
                            onChange={onChangeUsername}
                        />
                        <TextField
                            className={classes.textField}
                            type="text"
                            label="Name"
                            required
                            onChange={onChangeName}
                        />
                        <TextField
                            className={classes.textField}
                            type="password"
                            label="Password"
                            required
                            onChange={onChangePassword}
                        />
                        <TextField
                            className={classes.textField}
                            type="password"
                            label="Password confirmation"
                            required
                            onChange={onChangePasswordconf}
                        />
                        <h5> </h5>
                        <Button
                            className={classes.signupButton}
                            variant="contained"
                            onClick={onSignUp}
                        >
                            Sign up
                        </Button>
                        <h5>Already have an account?</h5>
                        <Button
                            variant="text"
                            color="primary"
                            size="small"
                            component={Link}
                            to="/login"
                        >
                            Log in
                        </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}