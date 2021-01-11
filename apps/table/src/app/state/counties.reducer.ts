import { createReducer, on } from '@ngrx/store'
import { County } from '../api.types'
import { retrievedCountiesList } from './counties.actions'

export const initialState: ReadonlyArray<County> = []

export const countiesReducer = createReducer(
  initialState,
  on(retrievedCountiesList, (_, { counties }) => [...counties])
)
