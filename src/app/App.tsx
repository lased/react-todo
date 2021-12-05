import React, { useState, CSSProperties, useReducer, useEffect } from 'react'
import { Route, Switch, withRouter, useHistory } from "react-router-dom";

import { Categories, Button, Modal } from './components'
import { IModalProps } from './components/Modal/Modal'
import { ICategory } from './components/Categories/Category/Category'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import { reducer } from './store/reducers'
import { removeItem, addItem, editItem } from './store/actions'
import { DB } from './db'
import './App.scss'

const App: React.FC = () => {
  DB.init()

  const history = useHistory()
  const modalStyle: CSSProperties = { display: 'none' }
  const categories = (DB.getAll('categories') as ICategory[]).map(v => ({ ...v, isRemovable: true }))
  const [selectedCategory, setSelectedCategory] = useState(categories[0] as ICategory)
  const [ctgState, ctgDispatch] = useReducer(reducer, [
    {
      id: -1,
      name: 'Все задачи',
      color: '',
      isRemovable: false
    },
    ...categories
  ])
  const [modal, setModal] = useState<IModalProps>({
    visible: false,
    placeholder: '',
    onClick: () => { },
    onClose: () => { }
  })
  const addCategory = (ctg: ICategory) => {
    setModal({ ...modal, visible: false })
    ctgDispatch(addItem('categories', { ...ctg, isRemovable: true } as ICategory))
  }
  const editCategory = (ctg: ICategory) => {
    setModal({ ...modal, visible: false })
    ctgDispatch(editItem('categories', ctg))
  }
  const removeCategory = (ctg: ICategory) => {
    ctgDispatch(removeItem('categories', ctg))
  }
  const onChangeTitle = (ctg: ICategory) => {
    setModal({
      ...modal,
      onClick: c => editCategory({ ...ctg, ...c }),
      value: ctg.name,
      color: ctg.color,
      placeholder: 'Название папки',
      visible: true
    })
  }

  if (modal.visible) modalStyle.display = 'flex'

  return (
    <div className="wrapper">

      <div className="sidebar">
        {
          ctgState.length > 1
            ? <Categories
              list={ctgState as (ICategory & { isRemovable: boolean })[]}
              onClick={ctg => {
                setSelectedCategory(ctg)
                history.push(`/${Number(ctg.id) >= 0 ? ctg.id : ''}`)
              }}
              onRemove={removeCategory}
              selected={selectedCategory} />
            : ''
        }
        <Button
          fill
          transparent
          icon="+"
          label="Добавить папку"
          onClick={() => setModal({
            ...modal,
            onClick: addCategory,
            visible: true,
            placeholder: 'Название папки'
          })} />
      </div>

      <div className="content">
        <Switch>
          <Route path="/" exact>
            {
              categories &&
              categories.map(c => <CategoryPage key={c.id} id={c.id} onChangeTitle={onChangeTitle} />)
            }
          </Route>
          <Route path="/:id">
            <CategoryPage onChangeTitle={onChangeTitle} />
          </Route>
        </Switch>
      </div>

      <div
        className="modal-wrap"
        style={modalStyle}>
        <Modal
          visible={modal.visible}
          placeholder={modal.placeholder}
          value={modal.value}
          color={modal.color}
          onClick={modal.onClick}
          onClose={() => setModal({ ...modal, visible: false })} />
      </div>

    </div >
  )
}

export default withRouter(App)