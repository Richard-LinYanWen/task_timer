import React from "react";
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
                            required
                        />
                        <TextField
                            className={classes.textField}
                            type="password"
                            label="Password"
                            required
                        />
                        <h5> </h5>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            component={Link}
                            to="/"
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