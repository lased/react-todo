import React from 'react'

import remove from '../../../../assets/images/remove.svg'
import edit from '../../../../assets/images/edit.svg'
import './CardItem.scss'

export interface ITask {
    id?: number
    category: number
    name: string
    checked: boolean
}

interface ICardItemProps extends ITask {
    onChange: (event: React.MouseEvent) => void
    onRemove: (event: React.MouseEvent) => void
    onChecked: (event: React.ChangeEvent) => void
}

const CardItem: React.FC<ICardItemProps> = (props) => {
    return (
        <li className="card__item">
            <input
                className="card-item__checkbox"
                id={`card-item-${props.id}`}
                type="checkbox"
                checked={!!props.checked}
                onChange={props.onChecked} />
            <label className="card-item__label" htmlFor={`card-item-${props.id}`}>{props.name}</label>
            <img onClick={props.onChange} src={edit} alt="" />
            <img onClick={props.onRemove} src={remove} alt="" />
        </li>
    )
}

export default CardItem