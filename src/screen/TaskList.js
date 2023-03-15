import React, { useState, useEffect, useContext } from "react";
import {
    Button,
    makeStyles,
    TextField
}
from "@material-ui/core";
import { addTask, getTaskList, delTask, editTask } from '../api';
import { AuthContext } from '../context/AuthContext';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    tasktable: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        paddingLeft: '9vw'
    },
    taskdetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '81vw'
    },
    actbutton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '27vw'
    },
    newtask: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskrowdetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '27vw'
    },
    complbutton: {
        display: 'flex',
        width: '17vw',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        height: '50px'
    }
}))

export default function TaskList() {

    const classes = useStyles();
    const [tasklist, setTasklist] = useState([]);
    const [taskname, setTaskname] = useState('');
    const { userData, setUData } = useContext(AuthContext);
    const [taskEdit, setTaskEdit] = useState({});

    const onChangeTaskname = (e) => {
        setTaskname(e.target.value);
    }

    const onAddTask = () => {
        //console.log(userData);
        if(taskname && userData) {
            addTask(taskname, false, userData.id).then(() => {
                Load();
            })
        }
    }

    const onDelTask = (id) => {
        if(id) {
            delTask(id).then(() => {
                Load();
            })
        }
    }

    const onEditTask = (id, taskname) => {
        if (_.isEmpty(taskEdit)) {
            setTaskEdit({id, taskname});
        }
        else if (id) {
            editTask(id, taskEdit.taskname);
            setTaskEdit({});
            Load();
        }
    }

    const onEditTaskCompl = (id, completion) => {
        editTask(id, undefined, completion);
        Load();
    }

    const onEditTaskname = (e) => {
        setTaskEdit({
            id: taskEdit.id,
            taskname: e.target.value
        })
    }

    const Load = () => {
        getTaskList().then((res) => {
            setTasklist(res);
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        Load();
    }, [])

    return (

        <div>
            <h2>Task List</h2>
            <span className={classes.newtask}>
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
            <div className={classes.tasktable}>
                <span className={classes.taskdetail}>
                    <h3 className={classes.taskrowdetail}>Task Name</h3>
                    <h3 className={classes.taskrowdetail}>Completion</h3>
                    <h3 className={classes.taskrowdetail}>Action</h3>
                </span>
                {
                    tasklist.map((item) => {
                        return (
                            <span className={classes.taskdetail}>
                                {
                                    taskEdit && taskEdit.id === item.id ?
                                    //only when id of taskEdit and id of item matches
                                    <TextField
                                        type="text"
                                        className={classes.taskrowdetail}
                                        value={taskEdit.taskname}
                                        onChange={onEditTaskname}
                                    />
                                    : <h4 className={classes.taskrowdetail}>{item.taskname}</h4>
                                }
                                {
                                    item.completion === false ?
                                    <Button 
                                        className={classes.complbutton}
                                        onClick={() => onEditTaskCompl(item.id, true)}
                                    >
                                        <HighlightOffIcon/>
                                    </Button> :
                                    <Button 
                                        className={classes.complbutton}
                                        onClick={() => onEditTaskCompl(item.id, false)}
                                    >
                                        <CheckCircleIcon/>
                                    </Button>
                                }
                                <div className={classes.actbutton}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => onEditTask(item.id, item.taskname)}
                                    >
                                        {
                                            taskEdit.id === item.id ?
                                            <SaveIcon/> :
                                            <EditIcon/>
                                        }
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => onDelTask(item.id)}
                                    >
                                        <DeleteIcon/>
                                    </Button>
                                </div>
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}