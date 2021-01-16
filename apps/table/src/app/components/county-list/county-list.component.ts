import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { County } from '../../api.types'
import { allColumns, Column, Sort, SortOrder } from './models/column.model'
import { FilterValueChange } from './models/output.interfaces'

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

  @Output()
  filterChange = new EventEmitter<FilterValueChange>()

  @Output()
  columnOrderChange = new EventEmitter<Column['id'][]>()

  // for style changes while dragging
  isDraggingColumn = false
  startDragging() {
    this.isDraggingColumn = true
  }
  stopDragging() {
    this.isDraggingColumn = false
  }

  // trackBy fn for columns
  trackColumns(_, column: Column) {
    return column.id
  }

  // output wrappers
  setSort(columnId: Column['id'], sort?: Sort) {
    if (columnId === sort?.columnId) {
      this.sortChange.emit({ columnId, order: sort.order * -1 })
    } else {
      this.sortChange.emit({ columnId, order: SortOrder.Asc })
    }
  }

  setFilter(columnId: Column['id'], event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.filterChange.emit({ columnId, filterValue })
  }

  columnDrop(event: CdkDragDrop<Column[]>) {
    // make a new list of current column id positions, so we don't mutate our input in place!
    const currentIds = this.columns.map((c) => c.id)
    // while convenient, this function mutates it's inputs, thus the fresh array of ids
    moveItemInArray(currentIds, event.previousIndex, event.currentIndex)
    this.columnOrderChange.emit(currentIds)
  }
}
