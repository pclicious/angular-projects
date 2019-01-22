import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
            ReactiveFormsModule,
            Ng2SearchPipeModule,
            FormsModule
  ],
  declarations: [
        AppComponent,
		ArticleComponent
  ],
  providers: [
        ArticleService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
