import { createSelector } from '@ngrx/store'
import type { County } from '../api.types'
import { AppState } from './app.state'

export const selectCounties = createSelector(
  (state: AppState) => state.counties,
  (counties: Array<County>) => counties
)
