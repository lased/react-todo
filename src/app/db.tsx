import { ICategory } from "./components/Categories/Category/Category";
import { ITask } from "./components/Card/CardItem/CardItem";
import { ADD, EDIT, REMOVE } from "./store/actionTypes";

export type DBTableName = 'categories' | 'tasks'

export class DB {

    private static get(key: string) {
        const localData = localStorage.getItem(key)
        let data: (ITask | ICategory)[] = []

        try {
            data = JSON.parse(localData as string)
        } catch (_) { }

        return data || []
    }

    private static set(key: string, value: (ITask | ICategory)[]) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static init() {
        if (!DB.get('categories') && DB.get('categories') instanceof Array) DB.set('categories', [])
        if (!DB.get('tasks') && DB.get('tasks') instanceof Array) DB.set('tasks', [])
    }

    static crud(type: string, name: 'categories' | 'tasks', item: ICategory | ITask) {
        let list = DB.get(name)
        let res

        switch (type) {
            case ADD:
                item.id = list.length ? list[list.length - 1].id as number + 1 : 0
                list.push(item)
                break
            case EDIT:
                list = list.map(v => item.id === v.id ? item : v)
                break
            case REMOVE:
                list = list.filter(v => v.id !== item.id)

                if (name === 'categories') {
                    let listTasks = DB.get('tasks') as ITask[];

                    listTasks = listTasks.filter(v => v.category !== item.id)
                    DB.set('tasks', listTasks)
                }
                break
        }

        DB.set(name, list)
        res = DB.get(name).find(v => item.id === v.id) || null

        if (type === REMOVE && res === null) return item

        return res
    }

    static getAll(name: 'categories' | 'tasks') {
        const list = DB.get(name);

        return list || []
    }

    static getById(name: 'categories' | 'tasks', id: number) {
        const list = DB.get(name);
        const item = list.find(v => v.id === id) || null

        return item
    }


    static getTasks(category: number) {
        let tasks = DB.get('tasks') as ITask[];

        tasks = tasks.filter(v => v.category === category)

        return tasks || []
    }
}