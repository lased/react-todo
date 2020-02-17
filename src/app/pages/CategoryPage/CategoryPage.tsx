import React, { useReducer, useEffect } from "react"
import { useParams } from "react-router-dom"

import { Card } from "../../components"
import { ICategory } from "../../components/Categories/Category/Category"
import { DB } from "../../db"
import { ITask } from "../../components/Card/CardItem/CardItem"
import { removeItem, addItem, editItem, reloadItems } from "../../store/actions"
import { reducer, reducerInit } from "../../store/reducers"
import './CategoryPage.scss'

interface CategoryPageProps {
    id?: number
    onChangeTitle: (category: ICategory) => void
}

const CategoryPage: React.FC<CategoryPageProps> = props => {
    const { id: idParams } = useParams()
    const id = props.id !== undefined ? props.id : idParams
    const tasks = DB.getTasks(Number(id))
    const ctg = DB.getById('categories', Number(id)) as ICategory
    const [tasksState, tasksDispatch] = useReducer(reducer, tasks, reducerInit)
    const empty = <div className="empty">Задачи отсутствуют</div>
    const onAddTask = (task: ITask) => {
        tasksDispatch(addItem('tasks', task))
    }
    const onRemoveTask = (task: ITask) => {
        tasksDispatch(removeItem('tasks', task))
    }
    const onEditTask = (task: ITask) => {
        tasksDispatch(editItem('tasks', task))
    }

    useEffect(() => {
        tasksDispatch(reloadItems(DB.getTasks(Number(id))))
    }, [id])

    if (ctg) return (
        <Card
            {...ctg}
            tasks={tasksState as ITask[]}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onChangeTitle={() => props.onChangeTitle(ctg)} />
    )
    else return empty
}

export default CategoryPage