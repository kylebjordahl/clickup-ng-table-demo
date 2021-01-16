import { createReducer, on } from '@ngrx/store'
import {
  allColumns,
  Column,
} from '../components/county-list/models/column.model'
import { reorderColumnList, setColumnFilter } from './columns.actions'

export const initialState: ReadonlyArray<Column> = allColumns

export const columnsReducer = createReducer(
  initialState,
  // convert list of ids to columns
  on(reorderColumnList, (columns, { columnIds }) =>
    columnIds.map((id) => columns.find((c) => c.id === id))
  ),
  on(setColumnFilter, (columns, { columnId, filterValue }) => [
    ...columns.map((c) => ({
      ...c,
      filterValue: c.id === columnId ? filterValue : c.filterValue,
    })),
  ])
)
