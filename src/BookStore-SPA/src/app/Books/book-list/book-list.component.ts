import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BookService } from 'src/app/_Services/book.service';
import { CategoryService } from 'src/app/_Services/category.service';
import { ConfirmationDialogService } from 'src/app/_Services/confirmation-dialog.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookList: any;
  searchTerm: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.getBooks();


    this.searchValueChanged.pipe(debounceTime(1000))
      .subscribe(value => {
        this.search();
      })
  }

  private getBooks() {
    this.bookService.getBooks().subscribe(books => {
      console.log(books);
      this.bookList = books;
    })
  }

  addBook() {
    this.router.navigate(['/book']);
  }

  editBook(id: number) {
    this.router.navigate(['/book/' + id]);
  }

  deleteBook(id: number) {
    this.confirmationDialogService.confirm("Delete Book", "Are you sure you want to delete this book?")
      .then(() => {

        this.categoryService.deleteCategory(id).subscribe((data) => {
          this.toastrService.success("Book Deleted Successfully");
          this.getBooks();
        },
          error => {
            this.toastrService.error("Failed to delete Book", error);
          }
        )

      })
      .catch((error) => {

      });

  }


  public searchBooks() {
      this.searchValueChanged.next();
  }

  private search() {
    if (this.searchTerm != '') {
      this.bookService.searchBooksWithCategory(this.searchTerm).subscribe(result => {
        this.bookList = result;
      },
        error => {
          this.bookList = [];
        }

      );
    }
    else {
        this.getBooks();
    }

  }

}
