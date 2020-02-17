import React from 'react'

import Category, { ICategory } from './Category/Category'
import './Categories.scss'

interface ICategoriesProps {
    list: (ICategory & { isRemovable: boolean })[]
    selected?: ICategory
    onClick: (category: ICategory) => void
    onRemove: (category: ICategory) => void
}

const Categories: React.FC<ICategoriesProps> = props => (
    <ul className="ctgs">
        {props.list.map(v => (
            <Category
                {...v}
                key={v.id}
                isRemovable={v.isRemovable}
                active={v.id === props.selected?.id}
                onClick={() => props.onClick(v)}
                onRemove={() => props.onRemove(v)} />
        ))}
    </ul>
)

export default Categories