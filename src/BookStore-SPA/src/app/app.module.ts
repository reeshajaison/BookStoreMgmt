import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BookService } from './_Services/book.service';
import { ConfirmationDialogService } from './_Services/confirmation-dialog.service';
import { CategoryService } from './_Services/category.service';
import { NgbdDatepickerPopup } from './datepicker/datepicker-popup';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './Categories/category-list/category-list.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CategoryComponent } from './Categories/category/category.component';
import { BookListComponent } from './Books/book-list/book-list.component';
import { BookComponent } from './Books/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CategoryListComponent,
    CategoryComponent,
    BookComponent,
    BookListComponent,
    ConfirmationDialogComponent,
    NgbdDatepickerPopup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    BookService,
    CategoryService,
    ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
