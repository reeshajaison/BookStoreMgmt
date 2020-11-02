
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_Services/category.service';
import { ConfirmationDialogService } from 'src/app/_Services/confirmation-dialog.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any;
  searchTerm:string;
  public searchValueChanged: Subject<string> = new Subject<string>();


  constructor(
    private categoryService: CategoryService,
    private toastrService:ToastrService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService

  ) { }

  ngOnInit(): void {

    this.getCategories();

    this.searchValueChanged.pipe(debounceTime(1000))
    .subscribe(value => {
      this.search();
    })
  }

  private getCategories(){
    this.categoryService.getCategories().subscribe(data => {
      this.categories=data;
    })
  }


  addCategory(){
    this.router.navigate(['/category']);
  }

  editCategory(id:number) {
    this.router.navigate(['/category/'+id]);
  }

  deleteCategory (id:number) {
    this.confirmationDialogService.confirm("Attention","Do you really want to delete this category?")
    .then(()=>
    this.categoryService.deleteCategory(id).subscribe((data)=>{
this.toastrService.success("Category deleted successfully");
this.getCategories();

    },
    error=>{
      this.toastrService.error("Failed to delete category");
    }
    )
    )
    .catch((error)=>{

    });
  }

  public searchCategories() {
    this.searchValueChanged.next();
  }

  resetSearch()
  {
    this.searchTerm='';
  }

  private search() {
    if (this.searchTerm !== '') {
      this.categoryService.search(this.searchTerm).subscribe(category => {
        this.categories = category;
      }, error => {
        this.categories = [];
      });
    } else {
      this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }
  }
}