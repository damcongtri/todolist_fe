import React, { createContext, useEffect, useState, ReactNode } from "react";
import TodoService from "../service/todoService"
export const AppContext = React.createContext<{ listTask: any, loadData: any }>({
    listTask: [],
    loadData: async () => { },
});

function AppProvider({ children }: any) {
    const todoService = new TodoService
    // Khai báo kiểu dữ liệu cho state
    const [listTask, setListTask] = useState<any>([]);
    const getTasks = async () => {
        let [data, err] = await todoService.getAll()
        if (!err) {
            setListTask(data)
        }
    };
    // Khai báo kiểu dữ liệu cho hàm loadData
    const loadData = async () => {
        await getTasks();
    }

    useEffect(() => { loadData() }, []);

    return (
        <AppContext.Provider value={{ listTask, loadData }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
