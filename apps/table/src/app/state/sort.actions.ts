import { createAction, props } from '@ngrx/store'
import { Sort } from '../components/county-list/models/column.model'

export const setSortColumn = createAction(
  '[Columns] Sort order change',
  props<Omit<Sort, 'compareFn'>>()
)
