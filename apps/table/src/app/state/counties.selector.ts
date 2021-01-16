import { createSelector } from '@ngrx/store'

import type { County } from '../api.types'
import { Column } from '../components/county-list/models/column.model'
import { AppState } from './app.state'
import { selectColumns } from './columns.selector'

export const selectCounties = createSelector(
  (state: AppState) => state.counties,
  (counties: Array<County>) => counties
)

export const selectFilteredCounties = createSelector(
  selectCounties,
  selectColumns,
  (counties: County[], columns: Column[]) => {
    // make an array of filter functions to run
    const activeFilters = columns
      .filter((col) => col.filterValue.length > 0)
      .map((col) => (county) => col.filter(county, col.filterValue))
    // filter the list by filter functions
    if (activeFilters.length === 0) {
      return counties
    } else {
      return counties.filter((county) =>
        activeFilters.every((filter) => filter(county))
      )
    }
  }
)
