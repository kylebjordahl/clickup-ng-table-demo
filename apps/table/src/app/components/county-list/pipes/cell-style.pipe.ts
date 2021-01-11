import { Pipe, PipeTransform } from '@angular/core'
import { Column } from '../models/column.model'

@Pipe({
  name: 'cellStyle',
  pure: true,
})
export class CellStylePipe implements PipeTransform {
  transform(columnDef: Column): { [klass: string]: string } {
    return {
      'width.px': columnDef.width.toFixed(0),
      'max-width.px': columnDef.width.toFixed(0),
      'min-width.px': columnDef.width.toFixed(0),
    }
  }
}
