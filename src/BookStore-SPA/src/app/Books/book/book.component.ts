import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/book';
import { Category } from 'src/app/_models/Category';
import { BookService } from 'src/app/_Services/book.service';
import { CategoryService } from 'src/app/_Services/category.service';
import { ConfirmationDialogService } from 'src/app/_Services/confirmation-dialog.service';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public formData: Book;
  public categories: any;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,

  ) { }

  ngOnInit(): void {

    this.resetform();

    let id;
    this.activatedRoute.params.subscribe(params => {
      id = params.id;
    });

    if (id != null) {
      this.bookService.getBookById(id).subscribe((book) => {
        this.formData = book;
        const publishDate = new Date(book.publishDate);
        this.formData.publishDate = { year: publishDate.getFullYear(), month: publishDate.getMonth(), day: publishDate.getDate() };

      }, error => {
        this.toastrService.error("An error occurred while retrieving Book.");
      });
    }
    else {
      this.resetform();
    }

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;

    }, error => {
      this.toastrService.error("An error occurred on get the category records.")
    }
    )

  }

  private resetform(bookform?: NgForm) {

    if (bookform != null) {
      bookform.form.reset();
    }
    this.formData = {

      id: 0,
      name: '',
      author: '',
      description: '',
      value: 0,
      publishDate: null,
      categoryId: null
    }

  }


  public Submit(bookform: NgForm) {

    bookform.value.categoryId = Number(bookform.value.categoryId);
    bookform.value.publishDate = this.convertStringToDate(bookform.value.publishDate);


    if (bookform.value.Id == 0) {
      this.insertRecord(bookform);
    }
    else {
this.updateRecord(bookform);
    }
  }


  insertRecord(bookform: NgForm) {

    this.bookService.addBook(bookform.form.value).subscribe(res => {
      this.toastrService.success("Book added successfully");
      this.resetform(bookform);
      this.router.navigate(['/books']);
    }, () => {
      this.toastrService.error("An error occurred while inserting Book");
    });

  }

  updateRecord(bookform: NgForm) {

    this.bookService.updateBook(bookform.form.value.id,bookform.form.value).subscribe(res => {
      this.toastrService.success("Book updated successfully");
      this.resetform(bookform);
      this.router.navigate(['/books']);
    }, () => {
      this.toastrService.error("An error occurred while updating Book");
    });

  }

  public cancel() {
    this.router.navigate(['/books']);
  }

  private convertStringToDate(date) {
    return new Date(`${date.year}-${date.month}-${date.day}`);
  }
}
