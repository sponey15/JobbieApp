using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public UserController(IUnitOfWork unitOfWork, IMapper mapper,
                                 IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpPost("getOffersFromCategory")]
        public async Task<ActionResult<IEnumerable<Offer>>> GetOffersFromCategory(OfferCategoryDto offerCategoryDto)
        {
            var offers = await _unitOfWork.OfferRepository.GetOffersFromCategory(offerCategoryDto);

            return Ok(offers);
        }
    }
}