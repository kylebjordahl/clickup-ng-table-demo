import type { Column } from './column.model'

export interface FilterValueChange {
  columnId: Column['id']
  filterValue: Column['filterValue']
}
