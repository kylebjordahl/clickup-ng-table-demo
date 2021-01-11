import { Pipe, PipeTransform } from '@angular/core'
import { County } from '../../../api.types'
import { SortWithCompare } from '../models/column.model'

@Pipe({
  name: 'sortCounties',
  pure: true,
})
export class SortCountyDataPipe implements PipeTransform {
  transform(data: County[], sort: SortWithCompare): County[] {
    // use slice here to get a shallow copy of the array, we don't want to mutate our data upstream of the pipe
    return (
      data?.slice().sort((a, b) => sort?.compareFn(a, b) * sort.order) ?? []
    )
  }
}
