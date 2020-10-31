using BookStore.Domain.Interfaces;
using BookStore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Domain.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            this.bookRepository = bookRepository;
        }
        public async Task<Book> Add(Book book)
        {
            if (bookRepository.Search(c => c.Name == book.Name).Result.Any())
                return null;

            await bookRepository.Add(book);
            return book;
        }

        public void Dispose()
        {
            bookRepository?.Dispose();

        }

        public async Task<IEnumerable<Book>> GetAll()
        {
            return await bookRepository.GetAll();
        }

        public async Task<IEnumerable<Book>> GetBooksByCategory(int categoryId)
        {
            return await bookRepository.GetBooksByCategory(categoryId);
        }

        public async Task<Book> GetById(int Id)
        {
            return await bookRepository.GetById(Id);
        }

        public async Task<bool> Remove(Book book)
        {
            await bookRepository.Remove(book);
            return true;
           
        }

        public async Task<IEnumerable<Book>> Search(string bookname)
        {
            return await bookRepository.Search(b => b.Name.Contains(bookname));
        }

        public async Task<IEnumerable<Book>> SearchBookWithCategory(string searchedValue)
        {
            return await bookRepository.SearchBookWithCategory(searchedValue);
        }

        public async Task<Book> Update(Book book)
        {
            if (bookRepository.Search(b => b.Name == book.Name && b.Id != book.Id).Result.Any())
                return null;

            await bookRepository.Update(book);
            return book;
        }
    }
}


