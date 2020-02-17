import React from 'react'

import remove from '../../../../assets/images/remove.svg'
import lines from '../../../../assets/images/lines.svg'
import './Category.scss'

export interface ICategory {
	id?: number
	name: string
	color: string
}

interface ICategoryProps extends ICategory {
	active?: boolean
	isRemovable?: boolean
	onClick: (event: React.MouseEvent) => void
	onRemove?: (event: React.MouseEvent) => void
}

const Category: React.FC<ICategoryProps> = props => {
	const liClasses = ['ctg']
	const iClasses = ['ctg__circle']

	if (props.active) liClasses.push('ctg_active')
	if (props.color) iClasses.push(`fill_bg_${props.color}`)

	return (
		<li onClick={props.onClick} className={liClasses.join(' ')}>
			{
				props.isRemovable
					? <i className={iClasses.join(' ')}></i>
					: <img style={{ marginRight: '6px' }} src={lines} alt="lines" />
			}

			<span>{props.name}</span>
			{
				props.isRemovable &&
				<img className="ctg__remove" onClick={props.onRemove} src={remove} alt="remove" />
			}
		</li>
	)
}

export default Category