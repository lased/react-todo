import React from 'react'

import { ICategory } from '../components/Categories/Category/Category'
import { ITask } from '../components/Card/CardItem/CardItem'
import { ADD, EDIT, REMOVE, RELOAD } from './actionTypes'
import { DBTableName, DB } from '../db'

export interface ReducerAction {
  type: string
  item: ICategory | ITask
  tableName: DBTableName
  items?: (ICategory | ITask)[]
}

const reducerInit = (items: (ICategory | ITask)[]) => [...items]

const reducer: React.Reducer<(ICategory | ITask)[], ReducerAction> = (state, action) => {
  const res = DB.crud(action.type, action.tableName, action.item)
  let list = [...state]

  if (!res && action.type !== RELOAD) return state
  
  switch (action.type) {
    case ADD:
      list.push(action.item)
      break
    case EDIT:
      list = list.map(v => v.id === action.item.id ? action.item : v)
      break
    case REMOVE:
      list = list.filter(v => v.id !== action.item.id)
      break
    case RELOAD:
      list = reducerInit(action.items || [])
      break
  }

  return list
}

export { reducer, reducerInit }