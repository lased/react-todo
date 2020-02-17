import React from "react";

import './ColorItem.scss'

interface ColorItemProps {
    value: string
    checkedValue: string
    onChange: (value: string) => void
}

const ColorItem: React.FC<ColorItemProps> = props => {
    const id = `modal-radio-${props.value}`

    return (
        <li className="modal__color">
            <input
                type="radio"
                id={id}
                value={props.value}
                name="radio"
                checked={props.value === props.checkedValue}
                onChange={() => props.onChange(props.value)} />
            <label className={`fill_bg_${props.value}`} htmlFor={id}></label>
        </li>
    )
}

export default ColorItem