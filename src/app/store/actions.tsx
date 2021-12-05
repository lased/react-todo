import { ITask } from "../components/Card/CardItem/CardItem"
import { ICategory } from "../components/Categories/Category/Category"
import { ADD, REMOVE, EDIT, RELOAD } from "./actionTypes"
import { ReducerAction } from "./reducers"
import { DBTableName } from "../db"

export const addItem = (tableName: DBTableName, item: ICategory | ITask): ReducerAction => ({
    type: ADD,
    tableName,
    item
})
export const removeItem = (tableName: DBTableName, item: ICategory | ITask): ReducerAction => ({
    type: REMOVE,
    tableName,
    item
})
export const editItem = (tableName: DBTableName, item: ICategory | ITask): ReducerAction => ({
    type: EDIT,
    tableName,
    item
})
export const reloadItems = (items: (ICategory | ITask)[]): ReducerAction => ({
    type: RELOAD,
    tableName: '' as DBTableName,
    item: {} as ICategory | ITask,
    items
})