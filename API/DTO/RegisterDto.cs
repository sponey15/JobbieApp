using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }
        
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Address { get; set; }
        [Required] public string City { get; set; }
        [Required] public string ZipCode { get; set; }
        [Required] public DateTime BirthDate { get; set; }
        //public string Description { get; set; }
        [Required] public string AccountType { get; set; }
    }
}