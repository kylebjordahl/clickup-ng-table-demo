import { createReducer, on } from '@ngrx/store'
import { Sort, SortOrder } from '../components/county-list/models/column.model'
import { setSortColumn } from './sort.actions'

export const initialState: Readonly<Sort> = {
  columnId: 'state',
  order: SortOrder.Asc,
}

export const sortReducer = createReducer(
  initialState,
  on(setSortColumn, (_, sort) => sort)
)
