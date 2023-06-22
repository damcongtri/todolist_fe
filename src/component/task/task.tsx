import { FC, useState, useEffect } from 'react';
import style from './task.module.scss'
import DatePicker from "react-datepicker"
import { Resolver, useForm } from 'react-hook-form';
import TodoService, { Task } from '../../service/todoService';

export interface TaskProps {
    id?: number,
    title?: string,
    description?: string,
    dueDate?: Date,
    priority?: string,
    status?: number
}

type FormValues = {
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
};


const TaskC: FC<any> = ({ data, updateTask, message }: { data: any, updateTask: () => Promise<void>, message: (message: string) => void }) => {
    const [dueDate, setDueDate] = useState(data?.dueDate || new Date());
    const [isChecked, setIsChecked] = useState(false);
    const todoService = new TodoService
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({});
    console.log('err', errors);

    const handleCheckboxChange = async (event: any) => {
        const isChecked = event.target.checked;
        let status = isChecked ? 1 : 0
        let [dataa, err] = await todoService.update(data?.id, { ...data, status: status })
        if (!err) {
            setIsChecked(isChecked)
            isChecked && message('Very well! 🎉🎉')
        }
        console.log(isChecked);
    }
    const showDetail = () => {
        const contForm = document.getElementById('contForm' + data?.id) as HTMLElement

        const content = document.getElementById('form' + data?.id) as HTMLElement

        let maxHeight = content.scrollHeight

        // console.log(content[0].clientHeight);
        if (contForm.clientHeight) {
            contForm.style.height = '0'
        } else {
            // contForm.style.height = contForm.scrollHeight + 'px'
            contForm.style.height = maxHeight + 30 + 'px'
        }
    }
    useEffect(() => {
        if (data?.id) {
            const contForm = document.getElementById('contForm' + data?.id) as HTMLElement
            contForm.style.height = '0'
        }
    }, [])

    const deleteTask = async (id: number) => {
        if (id) {
            let [data, err] = await todoService.delete(id)
            if (!err) {
                await updateTask()
                message('Delete Successfuly!')
            }
        }
    }
    const onSubmit = handleSubmit(async (dataF: FormValues) => {
        if (Object.keys({ ...data }).length !== 0) {
            let [res, err] = await todoService.update(Number(data?.id), { ...dataF, status: Number(data?.status) })
            if (!err) {
                message('Update Successfuly!')
            }
        }
        else {
            console.log({ ...dataF, status: 0 });
            let [data, err] = await todoService.create({ ...dataF, status: 0, dueDate: dueDate })
            if (!err) {
                reset()
                message('Create Successfuly!')
            }
        }
        await updateTask()

    });
    return (
        <div className={style.task} style={{ backgroundColor: Object.keys({ ...data }).length === 0 ? "#FBFFDC" : "" }}>
            {Object.keys({ ...data }).length !== 0
                ?
                <div style={{ backgroundPosition: !data.status ? '' : "left top" }} className={style.header}>
                    <div >
                        <input type="checkbox" checked={data.status} id={'h' + String(data?.id)} onChange={(e) => handleCheckboxChange(e)} />
                        <label htmlFor={'h' + String(data?.id)} className={style.taskTitle}>{data?.title}</label>
                    </div>
                    <div >
                        <button onClick={showDetail}>detail</button>
                        <button onClick={() => deleteTask(Number(data?.id))}>Remove</button>
                    </div>
                </div>
                :
                <h3 style={{ textAlign: "center", paddingTop: '30px' }}>New Task</h3>}
            <form action="#" id={'contForm' + data?.id} className={style.showDetail} onSubmit={onSubmit}>
                <div className={style.form_task} id={'form' + data?.id}>
                    <input type="text" style={{ borderColor: errors.title ? "red" : '' }} placeholder='Add new task title...' defaultValue={data?.title} {...register("title", { required: true })} />
                    {errors.title && <span style={{ color: 'red' }}>Title is required</span>}
                    <label htmlFor="desc">Description</label>
                    <textarea {...register("description")} cols={30} rows={10}>
                        {data?.description}
                    </textarea>
                    <div className={style.row}>
                        <div className={style.col}>
                            <label htmlFor="due">Due Date</label>
                            <DatePicker closeOnScroll={true} minDate={new Date()} selected={dueDate} onChange={(dueDate: Date) => {
                                console.log('date', dueDate);

                                setDueDate(dueDate)
                            }} />
                            <input type="hidden"  {...register("dueDate", { value: dueDate })} />
                        </div>
                        <div className={style.col}>
                            <label htmlFor="priority">Priority</label>
                            <select {...register("priority")} defaultValue={data?.priority}>
                                <option value="normal">Normal</option>
                                <option value="low">Low</option>
                                {/* <option value="medium">Medium</option> */}
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    {Object.keys({ ...data }).length !== 0 ? <button type="submit">update</button> : <button type="submit">Add</button>}
                </div>
            </form>
        </div>


    );
}
export default TaskC