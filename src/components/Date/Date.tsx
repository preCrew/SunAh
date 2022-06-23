import React, { ChangeEvent, useState } from 'react';
import styles from './Date.module.scss';
import { ITask } from './Interfaces'
import TodoTask from './TodoTask';

export type DateProps = {
    month: number;
    day: number;
    date: number;
}

export default function Date({ month, day, date }: DateProps) {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    const [displayMonth, setDisplayMonth] = React.useState('');
    const [displayDay, setDisplayDay] = React.useState('');
    const [displayDate, setDisplayDate] = React.useState(1);

    const [task, setTask] = useState<string>("");
    const [deadline, setDealine] = useState<number>(1);
    const [todoList, setTodoList] = useState<ITask[]>([]);


    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === "task") {
            setTask(event.target.value)
        } else {
            setDealine(Number(event.target.value))
        }

    };

    const addTask = (): void => {
        const newTask = { taskName: task, deadline: deadline }; //새 할일(제목, 날짜) 배열
        setTodoList([...todoList, newTask])
        setTask("");
        setDealine(0);

    };

    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(todoList.filter((task) => {
            return task.taskName != taskNameToDelete
        }))
    };

    React.useEffect(() => { //컴포넌트가 마운트 되고난 후
        setDisplayMonth(months[month]);
        setDisplayDay(days[day]);
        setDisplayDate(date);
    }, [month, day, date]);

    return (
        <div className={styles.dateClass}>
            <p className={styles.date}>{displayDate}</p>
            <div className={styles.dateMonth}>
                <p>{displayDay}</p>
                <p>{displayMonth}</p>
            </div>
            <div className={styles.toDoList}>
                <p>ToDoList</p>
                <div className={styles.header}>
                    <div className={styles.inputContainer}>
                        <input type="text" placeholder='Task...' name="task" value={task} onChange={handleChange} />
                        <input type="number" placeholder='Deadline (in Days)...' name="deadline" value={deadline} onChange={handleChange} />
                    </div>
                    <button className={styles.addTask} onClick={addTask}>Add Task</button>
                </div>
                <div className='todoList'>
                    {todoList.map((task: ITask, key: number) => {
                        return <TodoTask key={key} task={task} completeTask={completeTask} />
                    })}
                </div>
            </div>
        </div>);
}