import { DOCUMENT } from '@angular/common'
import { Directive, ElementRef, Inject, Output } from '@angular/core'
import { fromEvent } from 'rxjs'
import {
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators'

@Directive({
  selector: '[resizable]',
})
export class ResizableDirective {
  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  @Output()
  readonly resizable = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    'mousedown'
  ).pipe(
    tap((e) => e.preventDefault()),
    // switch map, not merge map!
    switchMap(() => {
      const { width, right } = this.elementRef.nativeElement
        .closest('div')
        .getBoundingClientRect()

      return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
        map((e) => width + e.clientX - right),
        distinctUntilChanged(),
        takeUntil(fromEvent(this.documentRef, 'mouseup'))
      )
    })
  )
}
