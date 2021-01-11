import { County } from '../api.types'
import { Column, Sort } from '../components/county-list/models/column.model'

export interface AppState {
  counties: ReadonlyArray<County>
  columns: ReadonlyArray<Column>
  sort: Sort
}
