import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/_models/Category';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_Services/category.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public formData: Category;

  constructor(public service: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();

    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    if (id != null) {
      this.service.getCategoryById(id).subscribe(category => {
        this.formData = category;
      }, error => {
        this.toastr.error('An error occurred on get the record.');
      });
    } else {
      this.resetForm();
    }
  }

 private resetForm(categoryForm?: NgForm) {
    if (categoryForm != null) {
      categoryForm.form.reset();
    }

    this.formData = {
      id: 0,
      name: ''
    };
  }

  public saveCategory(categoryForm: NgForm) {

  
    if (categoryForm.value.id === 0) {
      
      this.insertRecord(categoryForm);
    } else {
      this.updateRecord(categoryForm);
    }
  }

  public insertRecord(categoryForm: NgForm) {
    this.service.addCategory(categoryForm.form.value).subscribe(() => {
      this.toastr.success('Registration successful');
      this.resetForm(categoryForm);
      this.router.navigate(['/categories']);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });
  }

  public updateRecord(categoryForm: NgForm) {

    console.log(categoryForm.value);

    this.service.updateCategory(categoryForm.form.value.id, categoryForm.form.value).subscribe(() => {
      this.toastr.success('Updated successful');
      this.resetForm(categoryForm);
      this.router.navigate(['/categories']);
    }, () => {
      this.toastr.error('An error occurred on update the record.');
    });
  }

  public cancel() {
    this.router.navigate(['/categories']);
  }
}