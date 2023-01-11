import React, { useState, useEffect, useContext } from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    makeStyles,
    TextField
}
from "@material-ui/core";
import { addTask, getTaskList } from '../api';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    tasktable: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    taskdetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%'
    }
}))

export default function TaskList() {

    const classes = useStyles();
    const [tasklist, setTasklist] = useState([]);
    const [taskname, setTaskname] = useState('');
    const { userData, setUData } = useContext(AuthContext);

    const onChangeTaskname = (e) => {
        setTaskname(e.target.value);
    }

    const onAddTask = () => {
        console.log(userData);
        if(taskname && userData) {
            console.log('!');
            addTask(taskname, false, userData.id).then(() => {
               //Load();
            })
        }
    }

    const listview = () => {
        for (let i=0; i<tasklist.docs.length; i++) {
            <span>
                {tasklist.docs[i].data().taskname}
                {tasklist.docs[i].data().completion}
                {tasklist.docs[i].data().user}
            </span>
        }
    }

    const Load = () => {
        getTaskList().then((res) => {
            if (res[0].id != '') {
                const TL = res.map((item) => {
                    return {
                        ...item,
                    }
                })
                setTasklist(TL);
            }
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        Load();
    })

    return (

        <div>
            <h2>Task List</h2>
            <span>
                <TextField
                    type="text"
                    label="Task Name"
                    onChange={onChangeTaskname}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onAddTask}
                >
                    ADD
                </Button>
            </span>
            <span className={classes.taskdetail}>
                <h3>Task Name</h3>
                <h3>Completion</h3>
                <h3>User</h3>
            </span>
        </div>
    )
}