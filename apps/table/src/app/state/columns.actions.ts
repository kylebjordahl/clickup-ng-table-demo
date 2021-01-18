import { createAction, props } from '@ngrx/store'
import { Column } from '../components/county-list/models/column.model'
import { FilterValueChange } from '../components/county-list/models/output.interfaces'

export const reorderColumnList = createAction(
  '[Columns] Reordered',
  props<{ columnIds: Column['id'][] }>()
)

export const setColumnFilter = createAction(
  '[Column] Filtered',
  props<FilterValueChange>()
)
