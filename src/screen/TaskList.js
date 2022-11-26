import React, { useState, useEffect, useContext } from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField
}
from "@material-ui/core";
import { addTask, getTaskList } from '../api';
import { AuthContext } from '../context/AuthContext';

export default function TaskList() {
    
    const [tasklist, setTasklist] = useState([]);
    const [taskname, setTaskname] = useState('');
    const { userData, updateUserData } = useContext(AuthContext);

    const onChangeTaskname = (e) => {
        setTaskname(e.target.value);
    }

    const TL = tasklist.map((item) => {
        return (
            <div>
                {item}
                {console.log(item)}
            </div>
        )
    })

    const onAddTask = () => {
        console.log(userData);
        if(taskname && userData) {
            console.log('!');
            addTask(taskname).then(() => {
                window.location.href="/";
            })
        }
    }

    useEffect(() => {
        getTaskList().then((res) => {
            setTasklist(res);
        })
        .catch((err) => console.log(err))
    })

    return (

        <div>
            <h2>Task List</h2>
            {TL}
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
        </div>
    )
}