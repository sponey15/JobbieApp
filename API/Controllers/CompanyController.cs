using System.Threading.Tasks;
using API.DTO;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController
    {
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        public CompanyController(IMapper mapper, IPhotoService photoService)
        {
            _mapper = mapper;
            _photoService = photoService;
        }

        // [HttpPost("add-photo")]
        // public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        // {
        //     return Ok();
        // }
    }
}