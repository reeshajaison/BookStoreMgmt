import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import{Book} from '../_models/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {


  private baseUrl:string=environment.baseUrl+"api/"; 

  constructor(private http: HttpClient) { }


  public addBook(book: Book) {
    return this.http.post(this.baseUrl + 'book', book);
}

public updateBook(id: number, book: Book) {
    return this.http.put(this.baseUrl + 'book/' + id, book);
}

public getBooks(): Observable<Book[]> {

    console.log(this.baseUrl);
    return this.http.get<Book[]>(this.baseUrl + 'book');
}

public deleteBook(id: number) {
    return this.http.delete(this.baseUrl + 'book/' + id);
}

public getBookById(id): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'book/' + id);
}

public searchBooksWithCategory(searchedValue: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}book/search-book-by-category/${searchedValue}`);
}
}