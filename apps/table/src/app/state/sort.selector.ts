import { createSelector } from '@ngrx/store'
import type {
  Column,
  Sort,
} from '../components/county-list/models/column.model'
import type { AppState } from './app.state'
import { selectColumns } from './columns.selector'

export const selectSort = createSelector(
  (state: AppState) => state.sort,
  (sort: Sort) => sort
)

export const selectSortWithCompare = createSelector(
  selectSort,
  selectColumns,
  (sort: Sort, columns: Column[]) => {
    const column = columns.find((c) => c.id === sort.columnId)
    return {
      ...sort,
      compareFn: column.compare,
    }
  }
)
