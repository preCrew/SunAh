import React from 'react'
import { ITask } from "./Interfaces";
import styles from './Date.module.scss';

interface Props {
    task: ITask;
    completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
    return (
        <div className={styles.task}>
            <div className={styles.content}>
                <span>{task.taskName}</span>
                <span>{task.deadline}</span>
            </div>
            <button onClick={() => {
                completeTask(task.taskName);
            }}>x</button>
        </div>
    )
}

export default TodoTask