import type { County } from '../../../api.types'

export interface Column {
  /** unique ID of the column */
  id: keyof County
  /** the display title of the column */
  title: string
  /** optional alt text for the column */
  description?: string
  /** getter for the displayed value of a column */
  display(county: County): string
  /** function used for sorting the column */
  compare(countyA: County, countyB: County): number
  /** resizable column width, default is 100 */
  width: number
}

export const allColumns: Column[] = [
  {
    id: 'county',
    title: 'County',
    display: (x) => x.county,
    compare: (a, b) => a.county.localeCompare(b.county),
    width: 200,
  },
  {
    id: 'state',
    title: 'State',
    display: (x) => x.state,
    compare: (a, b) => {
      const stateCompare = a.state.localeCompare(b.state)
      return stateCompare === 0
        ? a.county.localeCompare(a.county)
        : stateCompare
    },
    width: 100,
  },
  {
    id: 'cases',
    title: 'Cases',
    display: (x) => x.cases.toFixed(0),
    compare: (a, b) => a.cases - b.cases,
    width: 70,
  },
  {
    id: 'deaths',
    title: 'Deaths',
    display: (x) => x.deaths.toFixed(0),
    compare: (a, b) => a.deaths - b.deaths,
    width: 70,
  },
]

export enum SortOrder {
  Asc = 1,
  Desc = -1,
}

export interface Sort {
  columnId: keyof County
  order: SortOrder
}

export interface SortWithCompare extends Sort {
  compareFn: Column['compare']
}
