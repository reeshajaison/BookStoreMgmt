﻿using BookStore.Domain.Interfaces;
using BookStore.Domain.Models;
using BookStore.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookStore.Infrastructure.Respositories
{
    public class CategoryRepository:Repository<Category>,ICategoryRepository
    {
        //Category Repository
        public CategoryRepository(BookStoreDbContext context) : base(context) { }
    }
}
