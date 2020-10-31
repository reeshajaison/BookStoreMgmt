using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookStore.Domain.Interfaces;
using BookStore.Domain.Models;
using BookStoreAPI.DTOs.Book;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : MainContoller
    {
        private readonly IMapper mapper;
        private readonly IBookService bookService;

        public BookController(IMapper mapper,IBookService bookService)
        {
            this.mapper = mapper;
            this.bookService = bookService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await bookService.GetAll();
            if (books == null)
                return NotFound();

            return Ok(mapper.Map<IEnumerable<BookResultDto>>(books));
        }


        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var book = await bookService.GetById(id);
            if (book == null)
                return NotFound();

            return Ok(mapper.Map<BookResultDto>(book));
        }
        [HttpGet]
        [Route("get-books-by-category/{categoryId:int}")]
        public async Task<IActionResult> GetBooksByCategory(int categoryId)
        {
            var books = await bookService.GetBooksByCategory(categoryId);
            if (!books.Any())
                return NotFound();
            

            return Ok(mapper.Map<IEnumerable<BookResultDto>>(books));
        }

        [HttpPost]
        public async Task<IActionResult> Add(BookAddDto bookAddDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var bookResult = await bookService.Add(mapper.Map<Book>(bookAddDto));

            if (bookResult == null)
                return BadRequest();

            return Ok(mapper.Map<BookResultDto>(bookResult));

        }

        
        [HttpPut("{id:int}")]

        public async Task<IActionResult> Update(int id,BookEditDto bookEditDto )
        {
            if (id != bookEditDto.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest();

            await bookService.Update(mapper.Map<Book>(bookEditDto));
            return Ok(bookEditDto);
        }

        [HttpDelete("{id:int}")]

        public async Task<IActionResult> Remove(int id)
        {
            var book = await bookService.GetById(id);
            if (book == null)
                return NotFound();

            await bookService.Remove(book);
            return Ok();
        }

        [Route("search/{bookName}")]
        [HttpGet]
        public async Task<IActionResult> Search(string bookName)
        {
            var books = mapper.Map<List<Book>>(await bookService.Search(bookName));
            if (books == null || books.Count == 0)
                return NotFound();
            return Ok(books);
        }


        [Route("search-book-by-category/{searchedValue}")]
        [HttpGet]
        public async Task<IActionResult> SearchBookByCategory(string searchedValue)
        {
            var books = mapper.Map<List<Book>>(await bookService.SearchBookWithCategory(searchedValue));
            if (!books.Any())
                return NotFound("None book was found");
            return Ok(mapper.Map<IEnumerable<BookResultDto>>(books));
        }
    }
}
