import { ScrollingModule } from '@angular/cdk/scrolling'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'

import { CountyListComponent } from './county-list.component'
import { CellStylePipe } from './pipes/cell-style.pipe'
import { SortCountyDataPipe } from './pipes/sort.pipe'

describe('CountyListComponent', () => {
  let component: CountyListComponent
  let fixture: ComponentFixture<CountyListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountyListComponent, CellStylePipe, SortCountyDataPipe],
      imports: [ScrollingModule, FlexLayoutModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
