import axiosClient from "./axiosConfig";

export interface Task {
    id?: number,
    title: string,
    description: string,
    dueDate: Date,
    priority: string,
    status: number
}
class TodoService {
    async getAll() {
        return await axiosClient.get('http://localhost:5678/todo')
            .then((data) => [data.data, null])
            .catch((e) => [null, e])
    }
    async create(data: Task) {
        return await axiosClient.post('http://localhost:5678/todo', data)
            .then((data) => [data, null])
            .catch((e) => [null, e])
    }
    async update(id: number, data: Task) {
        return await axiosClient.put('http://localhost:5678/todo/' + id, data)
            .then((data) => [data, null])
            .catch((e) => [null, e])
    }
    async delete(id: number) {
        return await axiosClient.delete('http://localhost:5678/todo/' + id)
            .then((data) => [data, null])
            .catch((e) => [null, e])
    }

}
export default TodoService