import { createReducer, on } from '@ngrx/store'
import {
  allColumns,
  Column,
} from '../components/county-list/models/column.model'
import { reorderColumnList } from './columns.actions'

export const initialState: ReadonlyArray<Column> = allColumns

export const columnsReducer = createReducer(
  initialState,
  on(reorderColumnList, (_, { columns }) => [...columns])
)
