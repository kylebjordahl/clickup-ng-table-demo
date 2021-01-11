import { createAction, props } from '@ngrx/store'
import type { County } from '../api.types'

export const retrievedCountiesList = createAction(
  '[CountiesList/API] Retrieve Counties Success',
  props<{ counties: County[] }>()
)
