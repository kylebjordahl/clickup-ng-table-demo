import { createSelector } from '@ngrx/store'
import { Column } from '../components/county-list/models/column.model'
import { AppState } from './app.state'

export const selectColumns = createSelector(
  (state: AppState) => state.columns,
  (columns: Array<Column>) => columns
)
