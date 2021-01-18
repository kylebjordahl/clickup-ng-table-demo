import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { countiesReducer } from './state/counties.reducer'
import { CountyListComponent } from './components/county-list/county-list.component'
import { HttpClientModule } from '@angular/common/http'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FlexLayoutModule } from '@angular/flex-layout'
import { CellStylePipe } from './components/county-list/pipes/cell-style.pipe'
import { AppState } from './state/app.state'
import { columnsReducer } from './state/columns.reducer'
import { sortReducer } from './state/sort.reducer'
import { SortCountyDataPipe } from './components/county-list/pipes/sort.pipe'
import { ResizableDirective } from './components/county-list/directives/resizable.directive'

@NgModule({
  declarations: [
    AppComponent,
    CountyListComponent,
    CellStylePipe,
    SortCountyDataPipe,
    ResizableDirective,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FlexLayoutModule,
    HttpClientModule,
    ScrollingModule,
    StoreModule.forRoot<AppState>(
      { counties: countiesReducer, columns: columnsReducer, sort: sortReducer },
      {}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
