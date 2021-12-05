import React, { useState } from 'react'

import CardItem, { ITask } from './CardItem/CardItem'
import { ICategory } from '../Categories/Category/Category'
import Button from '../Button/Button'
import edit from '../../../assets/images/edit.svg'
import './Card.scss'

interface ICardProps extends ICategory {
    tasks: ITask[]
    onChangeTitle: (event: React.MouseEvent) => void
    onAddTask: (task: ITask) => void
    onEditTask: (task: ITask) => void
    onRemoveTask: (task: ITask) => void
}

const Card: React.FC<ICardProps> = props => {
    const formInitialState = {
        visible: false,
        edit: false,
        task: {
            name: ''
        } as ITask
    }
    const [form, setForm] = useState(formInitialState)
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        form.edit
            ? props.onEditTask(form.task)
            : props.onAddTask({ ...form.task, category: props.id as number })
        setForm(formInitialState)
    }
    const titleClasses = ['card__title']

    if (props.color) titleClasses.push(`fill_text_${props.color}`)

    return (
        <div className="card">
            <div className={titleClasses.join(' ')}>
                <span>{props.name}</span>
                <img src={edit} alt="" onClick={props.onChangeTitle} />
            </div>
            <ul className="card__list">
                {props.tasks.map(v => (
                    <CardItem
                        {...v}
                        key={v.id}
                        onChange={() => setForm({ ...form, visible: true, edit: true, task: v })}
                        onChecked={() => props.onEditTask({ ...v, checked: !v.checked })}
                        onRemove={() => props.onRemoveTask(v)} />
                ))}
            </ul>
            {
                form.visible
                    ? <form
                        onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Текст задачи"
                            value={form.task.name}
                            onChange={(e) => setForm({
                                ...form,
                                task: {
                                    ...form.task,
                                    name: e.target.value
                                }
                            })} />
                        <Button
                            primary
                            disabled={!form.task.name}
                            label={`${form.edit ? 'Сохранить' : 'Добавить'} задачу`} />
                        &emsp;
                        <Button
                            label="Отмена"
                            onClick={() => setForm({ ...form, visible: false })} />
                    </form>
                    : <Button
                        transparent
                        icon="+"
                        label="Новая задача"
                        onClick={() => setForm({ ...form, visible: true })} />
            }
        </div>
    )
}

export default Card