import { Component, EventEmitter, Input, Output } from '@angular/core'
import { County } from '../../api.types'
import { allColumns, Column, Sort, SortOrder } from './models/column.model'

@Component({
  selector: 'table-demo-county-list',
  templateUrl: './county-list.component.html',
  styleUrls: ['./county-list.component.scss'],
})
export class CountyListComponent {
  public readonly ORDER = SortOrder
  @Input() counties: Array<County>

  @Input() columns: Column[] = allColumns
  @Input() sort: Sort = null

  @Output()
  sortChange = new EventEmitter<Sort>()

  setSort(columnId: keyof County, sort?: Sort) {
    if (columnId === sort?.columnId) {
      this.sortChange.emit({ columnId, order: sort.order * -1 })
    } else {
      this.sortChange.emit({ columnId, order: SortOrder.Asc })
    }
  }
}
