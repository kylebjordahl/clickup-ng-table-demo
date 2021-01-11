import { County } from '../../../api.types'

/**
 * parse the csv format of
 * https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv
 * into the County type object
 */
export function parseCountyCsv(csv: string): Array<County> {
  try {
    const rows = csv.split('\n')
    const counties = rows.slice(1).map((r) => {
      const values = r.trim().split(',')
      const county = <County>{
        date: new Date(values[0]),
        county: values[1],
        state: values[2],
        fips: values[3],
        cases: Number(values[4]),
        deaths: Number(values[5]),
        confirmed_cases: Number(values[6]),
        confirmed_deaths: Number(values[7]),
        probable_cases: Number(values[8]),
        probable_deaths: Number(values[9]),
      }
      return county
    })
    return counties
  } catch {
    return []
  }
}
