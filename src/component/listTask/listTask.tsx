import { FC, FunctionComponent, useState, useEffect } from "react";
import TaskC, { TaskProps } from "../task/task"
import style from "./listTask.module.scss"
import TodoService from "../../service/todoService";
const ListTask: FC<any> = () => {
    const [checkAdd, setCheckAdd]: any = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const todoService = new TodoService
    const [data, setData] = useState([])
    const [tasksData, setTasksData] = useState([])
    const getAll = async () => {
        let [data, err] = await todoService.getAll()
        if (!err) {
            data.map((item: TaskProps) => item.dueDate = new Date(String(item.dueDate)))
            setTasksData(data)
            setData(data)
        }
    }
    const getMessage = (message: string) => {
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }
    let getData = async () => {
        setLoading(true)
        await getAll()
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    const handleSearch = (e: any) => {
        // console.log(e.target.value);
        e.target.value ? setTasksData(() => data.filter((item: any) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))) : getAll()
    }
    return (
        <>
            {loading && <div className={style.loading}>
                <div className={style.custom_loader}></div>
            </div>}
            {message && <div className={style.nofication}>
                {message}
            </div>}

            <div className={style.listTask} style={{ maxWidth: "1024px", margin: ' 20px auto' }}>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <h2 style={{ margin: '30px 0' }}>List Task</h2>
                    <button onClick={() => setCheckAdd((d: boolean) => !d)} >{checkAdd ? "Close New Task" : "Add New Task"}</button>
                </div>
                <div className={style.search}>
                    <input type="text" placeholder="Search Title..." onChange={handleSearch} />
                </div>
                {checkAdd && <div className={style.newTask}>
                    <TaskC updateTask={getAll} message={getMessage} />
                </div>}

                {tasksData.length > 0 ? tasksData.map((item: TaskProps) => <TaskC data={item} updateTask={getAll} message={getMessage} />) : <h3>No Data</h3>}
            </div>

        </>
    );
}

export default ListTask;