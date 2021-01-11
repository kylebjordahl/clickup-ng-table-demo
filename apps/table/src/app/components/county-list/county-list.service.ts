import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { County } from '../../api.types'
import { parseCountyCsv } from './util/parse-county-csv.function'

/**
 * responsible for getting data from the NYT live covid data repo
 * https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv
 */
@Injectable({ providedIn: 'root' })
export class CountyListService {
  private readonly sourceUrl =
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv'

  constructor(private http: HttpClient) {}

  getCounties(): Observable<Array<County>> {
    return this.http
      .get(this.sourceUrl, { responseType: 'text' })
      .pipe(map(parseCountyCsv))
  }
}
