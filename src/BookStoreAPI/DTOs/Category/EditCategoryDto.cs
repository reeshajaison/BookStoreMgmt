using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.DTOs.Category
{
    public class EditCategoryDto
    {
       [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(150, ErrorMessage = "The field {0} must be between {2} and {1} characters", MinimumLength = 2)]
        public string CategoryName { get; set; }
    }
}
