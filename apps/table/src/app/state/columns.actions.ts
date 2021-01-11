import { createAction, props } from '@ngrx/store'
import {
  Column,
  SortOrder,
} from '../components/county-list/models/column.model'

export const reorderColumnList = createAction(
  '[Columns] Reordered',
  props<{ columns: Column[] }>()
)
