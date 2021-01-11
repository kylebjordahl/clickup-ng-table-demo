import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { CountyListService } from './components/county-list/county-list.service'
import { Sort } from './components/county-list/models/column.model'
import { selectColumns } from './state/columns.selector'
import { retrievedCountiesList } from './state/counties.actions'
import { selectCounties } from './state/counties.selector'
import { setSortColumn } from './state/sort.actions'
import { selectSortWithCompare } from './state/sort.selector'

@Component({
  selector: 'table-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  counties$ = this.store.pipe(select(selectCounties))
  columns$ = this.store.pipe(select(selectColumns))
  sort$ = this.store.pipe(select(selectSortWithCompare))

  constructor(private store: Store, private countyService: CountyListService) {}

  ngOnInit() {
    this.countyService
      .getCounties()
      .subscribe((counties) =>
        this.store.dispatch(retrievedCountiesList({ counties }))
      )
  }

  onSort(sort: Sort) {
    this.store.dispatch(setSortColumn(sort))
  }
}
