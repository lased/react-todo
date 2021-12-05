import React, { useState, useEffect } from "react";

import Button from "../Button/Button";
import ColorItem from "./ColorItem/ColorItem";
import { ICategory } from "../Categories/Category/Category";
import close from "../../../assets/images/close.svg";
import './Modal.scss'

export interface IModalProps {
    placeholder: string
    value?: string
    color?: string
    visible?: boolean
    onClose: (event: React.MouseEvent) => void
    onClick: (ctg: ICategory) => void
}

const colors = ['gray', 'green', 'blue', 'red', 'pink', 'black', 'purple', 'lightgreen']

const Modal: React.FC<IModalProps> = props => {
    const modalClass = ['modal']
    const [form, setForm] = useState({
        name: props.value || '',
        color: props.color || ''
    })
    const resetForm = () => {
        setForm({
            name: '',
            color: ''
        })
    }
    const onSubmit = (e: React.FormEvent) => {
        props.onClick(form)
        resetForm()
        e.preventDefault()
    }

    if (props.visible) modalClass.push('modal_visible')

    useEffect(() => {
        setForm({
            name: props.value || '',
            color: props.color || ''
        })
    }, [props.color, props.value])

    return (
        <form
            className={modalClass.join(' ')}
            onSubmit={onSubmit}>
            <input
                type="text"
                placeholder={props.placeholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <ul className="modal__colors">
                {colors.map(v => (
                    <ColorItem
                        key={v}
                        value={v}
                        checkedValue={form.color}
                        onChange={c => setForm({ ...form, color: c })} />
                ))}
            </ul>
            <Button
                primary
                fill
                label={props.color && props.value ? 'Сохранить' : 'Добавить'}
                disabled={!form.name || !form.color} />
            <img className="modal__close" src={close} alt="close" onClick={props.onClose} />
        </form>
    )
}

export default Modal