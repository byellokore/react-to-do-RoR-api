import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class List extends Component {
    async deleteTask(task) {
        if(window.confirm(`Are you sure? "${task.title}" will be deleted!`)) {
            await fetch(`http://localhost:3001/tasks/${task.id}`, { method: 'DELETE'});
            this.props.loadTasks();
        }
    }
    async checkTask(task) {
        await fetch(`http://localhost:3001/tasks/${task.id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    task: { done: true }
                })
            }
        )

        this.props.loadTasks();
    }
    render(){
        return(
            <div>
                <Card>
                    <Card.Body>
                        <Table responsive>
                            <tbody>
                                {this.props.tasks.map((task, index)=> {
                                    return <tr key={task.id}>
                                        <td className="col-md-10">{task.title}</td>
                                        <td>
                                            {
                                                task.done == false
                                                ? <a className="check" href="#">
                                                    <FontAwesomeIcon icon="check-circle" onClick={() => this.checkTask(task)}/>
                                                </a>
                                                : null
                                            }
                                        </td>
                                        <td>
                                            <a className="delete" href="#">
                                                <FontAwesomeIcon icon="trash-alt" onClick={() => this.deleteTask(task)}/>
                                            </a>    
                                        </td>
                                    </tr>;
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default List;