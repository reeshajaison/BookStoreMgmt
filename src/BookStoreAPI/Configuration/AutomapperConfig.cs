using AutoMapper;
using BookStore.Domain.Models;
using BookStoreAPI.DTOs.Book;
using BookStoreAPI.DTOs.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<Category, AddCategoryDto>().ReverseMap();
            CreateMap<Category, EditCategoryDto>().ReverseMap();
            CreateMap<Category, CategoryResultDto>().ReverseMap();
            CreateMap<Book, BookAddDto>().ReverseMap();
            CreateMap<Book, BookEditDto>().ReverseMap();
            CreateMap<Book, BookResultDto>().ReverseMap();
        }
    }
}


//public class AutomapperConfig : Profile
//{
//    public AutomapperConfig()
//    {
//        CreateMap<Category, CategoryAddDto>().ReverseMap();
//        CreateMap<Category, CategoryEditDto>().ReverseMap();
//        CreateMap<Category, CategoryResultDto>().ReverseMap();
//        CreateMap<Book, BookAddDto>().ReverseMap();
//        CreateMap<Book, BookEditDto>().ReverseMap();
//        CreateMap<Book, BookResultDto>().ReverseMap();
//    }
//}