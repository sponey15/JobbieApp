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
    public class CompanyController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CompanyController(IUnitOfWork unitOfWork, IMapper mapper,
                                 IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoService = photoService;
        }

        [Authorize(Policy = "RequireCompanyRole")]
        [HttpPost("newOffer")]
        public async Task<ActionResult<Offer>> NewOffer(OfferToAddDto offerToAddDto)
        {
            var companyId = User.GetUserId();
            var company = await _unitOfWork.UserRepository.GetUserByIdAsync(companyId);

            if (company == null) return NotFound();

            var offer = _mapper.Map<Offer>(offerToAddDto);
            offer.CompanyName = company.UserName;

            _unitOfWork.OfferRepository.Add(offer);

            if (await _unitOfWork.SaveAll())
            {
                return Ok(offer);
            }

            return BadRequest("Adding offer didn't succeed");
        }

        //all offers from company
        [HttpGet("getOffer/{offerId}")]
        public async Task<ActionResult<Offer>> GetOffer(int offerId)
        {
            return await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);
        }

        [HttpGet("getOfferFromCategory")]
        public async Task<ActionResult<IEnumerable<Offer>>> GetOffersFromCategory(OfferCategoryDto offerCategoryDto)
        {
            var offers = await _unitOfWork.OfferRepository.GetOffersFromCategoryAsync(offerCategoryDto);

            return Ok(offers);
        }

        [HttpGet("getOfferFromCompany/{companyName}")]
        public async Task<ActionResult<IEnumerable<Offer>>> GetOffersFromCompany(string companyName)
        {
            var offers = await _unitOfWork.OfferRepository.GetOffersFromCompanyAsync(companyName);

            return Ok(offers);
        }

        [HttpPost("getCompanyOffersFromCategory/{companyName}")]
        public async Task<ActionResult<IEnumerable<Offer>>> GetCompanyOffersFromCategory(string companyName, OfferCategoryDto offerCategoryDto)
        {
            var offers = await _unitOfWork.OfferRepository.GetCompanyOffersFromCategory(companyName, offerCategoryDto);

            return Ok(offers);
        }

        [HttpPost("add-offer-photo/{offerId}")]
        public async Task<ActionResult<PhotoDto>> AddOfferPhoto(int offerId, IFormFile file)
        {
            var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (offer.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            var photoForReturn = _mapper.Map<PhotoDto>(photo);
            offer.Photos.Add(photo);

            if (await _unitOfWork.SaveAll())
            {
                return Ok(photoForReturn);
            }

            return BadRequest("Adding photo didn't succeed");
        }

        [HttpPut("set-offer-main-photo/{offerId}/{photoId}")]
        public async Task<ActionResult> SetOfferMainPhoto(int offerId, int photoId)
        {
            var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);

            var photo = offer.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already main photo of offer");

            var currentMain = offer.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _unitOfWork.SaveAll()) return Ok();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-offer-photo/{offerId}/{photoId}")]
        public async Task<ActionResult> DeleteOfferPhoto(int offerId, int photoId)
        {
            var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);
            var photo = offer.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            offer.Photos.Remove(photo);

            if (await _unitOfWork.SaveAll()) return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
}