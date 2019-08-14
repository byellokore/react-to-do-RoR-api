import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

function RemoveAllTasks(props) {
    const handleRemoveAll = (() => {
        const promises = props.tasks.map(task => {
            return fetch(`http://localhost:3001/tasks/${task.id}`, { method: 'DELETE'});
        });
        
        Promise.all(promises).then(results => {
            props.loadTasks();
        })
        
    });
    return (
        <div>
            <Button onClick={ handleRemoveAll } variant="danger" className="float-right remove_all_tasks_btn">
             - Remove All
            </Button>
        </div>
    );
}

export default RemoveAllTasks;