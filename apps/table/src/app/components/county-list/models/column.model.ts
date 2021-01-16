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
  filter: (county: County, filterValue: string) => boolean
  filterValue: string
  /** resizable column width, default is 100 */
  width: number
}

export const allColumns: Column[] = [
  {
    id: 'county',
    title: 'County',
    width: 200,
    display: (x) => x.county,
    compare: (a, b) => a.county.localeCompare(b.county),
    filter: (x, v) =>
      x.county.toLocaleLowerCase().includes(v.toLocaleLowerCase()),
    filterValue: '',
  },
  {
    id: 'state',
    title: 'State',
    width: 200,
    display: (x) => x.state,
    compare: (a, b) => {
      const stateCompare = a.state.localeCompare(b.state)
      // fallback sort by county if state is same
      return stateCompare === 0
        ? a.county.localeCompare(a.county)
        : stateCompare
    },
    filter: (x, v) =>
      x.state.toLocaleLowerCase().includes(v.toLocaleLowerCase()),
    filterValue: '',
  },
  {
    id: 'cases',
    title: 'Cases',
    width: 150,
    display: (x) => x.cases.toFixed(0),
    compare: (a, b) => a.cases - b.cases,
    filter: (x, v) => parseNumericFilter(v)(x.cases),
    filterValue: '',
  },
  {
    id: 'deaths',
    title: 'Deaths',
    width: 150,
    display: (x) => x.deaths.toFixed(0),
    compare: (a, b) => a.deaths - b.deaths,
    filter: (x, v) => parseNumericFilter(v)(x.deaths),
    filterValue: '',
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

// useful feature to support less / greater comparison in strings
function parseNumericFilter(filterText: string): (x: number) => boolean {
  const parts = filterText.split(' ')

  // case where there's not a space separated operator, or too many are provided, just bail
  if (parts.length !== 2) {
    return (x) => x === Number(filterText)
  }

  const value = Number(parts[1].trim())
  switch (parts[0].trim()) {
    case '<':
      return (x) => x < value
    case '>':
      return (x) => x > value
    case '<=':
      return (x) => x <= value
    case '>=':
      return (x) => x >= value
    default:
      return (x) => x === Number(filterText)
  }
}
