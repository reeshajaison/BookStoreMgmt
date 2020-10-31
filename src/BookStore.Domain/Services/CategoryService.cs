using BookStore.Domain.Interfaces;
using BookStore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Domain.Services
{
   public  class CategoryService:ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IBookService bookService;

        public CategoryService(ICategoryRepository categoryRepository,IBookService bookService)
        {
            this.categoryRepository = categoryRepository;
            this.bookService = bookService;
        }

        public async Task<Category> Add(Category category)
        {
            if(categoryRepository.Search(c=>c.Name==category.Name).Result.Any())
            {
                return null;
            }

            await categoryRepository.Add(category);
            return category;
        }

        public void Dispose()
        {
           categoryRepository?.Dispose();
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await categoryRepository.GetAll();
        }

        public async Task<Category> GetById(int Id)
        {
            return await categoryRepository.GetById(Id);
        }

        public async Task<bool> Remove(Category category)
        {
            var books =await bookService.GetBooksByCategory(category.Id);
            if (books.Any())
                return false;

            await categoryRepository.Remove(category);
            return true;

        }

        public async Task<IEnumerable<Category>> Search(string categoryName)
        {
            return await categoryRepository.Search(c => c.Name.Contains(categoryName));
            
        }

        public async Task<Category> Update(Category category)
        {

            if (categoryRepository.Search(c => c.Name == category.Name && c.Id != category.Id).Result.Any())
                return null;

            await categoryRepository.Update(category);
            return category;
        }
    }
}                                                                                       
