import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgCircleProgressModule } from 'ng-circle-progress';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgCircleProgressModule.forRoot({
      backgroundColor:"#F1F1F1",
      backgroundPadding:-22,
      radius:87,
      toFixed:2,
      maxPercent:100,
      outerStrokeWidth:10,
      outerStrokeColor:"#FF6347",
      innerStrokeColor:"#32CD32",
      innerStrokeWidth:1
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
