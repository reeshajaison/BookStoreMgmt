using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookStore.Domain.Interfaces;
using BookStore.Domain.Models;
using BookStoreAPI.DTOs.Category;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController :MainContoller
    {
        private readonly IMapper mapper;
        private readonly ICategoryService categoryService;

        public CategoriesController(IMapper mapper,ICategoryService categoryService)
        {
            this.mapper = mapper;
            this.categoryService = categoryService;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await categoryService.GetAll();
            if (categories == null)
                return NotFound();

            return Ok(mapper.Map<IEnumerable<CategoryResultDto>>(categories));
        }

        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetById(int id)
        {
            var category = await categoryService.GetById(id);
            if (category == null)
                return NotFound();

            return Ok(mapper.Map<CategoryResultDto>(category));
        }


        [HttpPost]
        public async Task<IActionResult> Add(AddCategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var category = mapper.Map<Category>(categoryDto);

            var categoryResult = await categoryService.Add(category);
            if (categoryResult == null)
                return BadRequest();

            return Ok(mapper.Map<CategoryResultDto>(categoryResult));


        }


        [HttpPut("{id:int}")]

        public async Task<IActionResult> Update(int id,EditCategoryDto editCategoryDto)
        {
            if (id != editCategoryDto.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest();

            await categoryService.Update(mapper.Map<Category>(editCategoryDto));

            return Ok(editCategoryDto);
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Remove(int id)
        {
            var category = await categoryService.GetById(id);
            if (category == null) return NotFound();

            var result = await categoryService.Remove(category);

            if (!result) return BadRequest();

            return Ok();
        }

        [Route("search/{category}")]
        [HttpGet]
        public async Task<ActionResult<List<Category>>> Search(string category)
        {
            var categories = mapper.Map<List<Category>>(await categoryService.Search(category));

            if (categories == null || categories.Count == 0)
                return NotFound("None category was founded");

            return Ok(categories);
        }
    }
}



