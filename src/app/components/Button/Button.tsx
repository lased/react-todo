import React, { CSSProperties } from 'react'

import './Button.scss'

interface IButonProps {
    label: string
    icon?: string
    primary?: boolean
    transparent?: boolean
    disabled?: boolean
    fill?: boolean
    onClick?: (event: React.MouseEvent) => void
}

const Button: React.FC<IButonProps> = props => {
    const classes = ['btn']
    const styles: CSSProperties = {}

    if (props.primary) classes.push('btn_bg_green')
    if (props.transparent) classes.push('btn_bg_transparent')
    if (props.fill) styles.width = '100%'

    return (
        <button
            disabled={props.disabled}
            className={classes.join(' ')}
            style={styles}
            onClick={props.onClick}>
            {props.icon && <i className="btn__icon">{props.icon}</i>}
            <span>{props.label}</span>
        </button>
    )
}

export default Button