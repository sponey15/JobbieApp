using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
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
        [HttpPost("offers")]
        public async Task<ActionResult<Offer>> CreateOffer(OfferToAddDto offerToAddDto)
        {
            var companyId = User.GetUserId();
            var company = await _unitOfWork.UserRepository.GetUserByIdAsync(companyId);

            if (company == null) return NotFound();

            var offer = _mapper.Map<Offer>(offerToAddDto);
            offer.CompanyName = company.UserName;

            _unitOfWork.OfferRepository.Add(offer);

            if (await _unitOfWork.SaveAll())
            {
                return CreatedAtRoute("offers", new { offerId = offer.Id }, offer);
            }

            return BadRequest("Adding offer didn't succeed");
        }

        [HttpPut("offers/{offerId}")]
        public async Task<ActionResult<Offer>> UptateOffer(int offerId, OfferToAddDto offerToAddDto)
        {
            var companyId = User.GetUserId();
            var company = await _unitOfWork.UserRepository.GetUserByIdAsync(companyId);
            var offerToUpdate = await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);

            if (offerToUpdate.CompanyName != company.UserName)
                return Unauthorized("You are not the creator of the offer");

            var offer = _mapper.Map(offerToAddDto, offerToUpdate);
            offer.CompanyName = company.UserName;

            if (await _unitOfWork.SaveAll())
            {
                return Ok(offer);
            }

            return BadRequest("Updating offer didn't succeed");
        }

        [HttpDelete("offers/{offerId}")]
        public async Task<ActionResult> DeleteOffer(int offerId)
        {
            var companyId = User.GetUserId();
            var company = await _unitOfWork.UserRepository.GetUserByIdAsync(companyId);
            var offerToDelete = await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);

            if (offerToDelete.CompanyName != company.UserName)
                return Unauthorized("You are not the creator of the offer");
            
            foreach (var photo in offerToDelete.Photos)
            {
                await DeleteOfferPhoto(offerId, photo.Id);
            }

            _unitOfWork.OfferRepository.Delete(offerToDelete);

            if (await _unitOfWork.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Deleting offer didn't succeed");
        }

        [HttpGet("offers/{offerId}", Name = "offers")]
        public async Task<ActionResult<Offer>> GetOffer(int offerId)
        {
            return await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);
        }

        // [HttpGet("category-offers/{offerCategory}")]
        // public async Task<ActionResult<IEnumerable<Offer>>> CategoryOffers(OfferCategory offerCategory,
        //     [FromQuery] PaginationParams paginationParams)
        // {
        //     var offers = await _unitOfWork.OfferRepository.GetOffersFromCategoryAsync(offerCategory, paginationParams);

        //     Response.AddPaginationHeader(offers.CurrentPage, offers.PageSize,
        //         offers.TotalCount, offers.TotalPages);

        //     return Ok(offers);
        // }

        [HttpGet("company-offers/{companyName}")]
        public async Task<ActionResult<IEnumerable<Offer>>> CompanyOffers(string companyName,
            [FromQuery] PaginationParams paginationParams)
        {
            var offers = await _unitOfWork.OfferRepository.GetOffersFromCompanyAsync(companyName, paginationParams);

            Response.AddPaginationHeader(offers.CurrentPage, offers.PageSize,
                offers.TotalCount, offers.TotalPages);

            return Ok(offers);
        }

        [HttpGet("company-offers/{companyName}/{offerCategory}")]
        public async Task<ActionResult<IEnumerable<Offer>>> CompanyOffersFromCategory(string companyName, 
            OfferCategory offerCategory, [FromQuery] PaginationParams paginationParams)
        {
            var offers = await _unitOfWork.OfferRepository.GetCompanyOffersFromCategoryAsync(companyName, offerCategory, paginationParams);

            Response.AddPaginationHeader(offers.CurrentPage, offers.PageSize,
                offers.TotalCount, offers.TotalPages);

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

            offer.Photos.Add(photo);

            if (await _unitOfWork.SaveAll())
            {
                return CreatedAtRoute("offers", new { offerId = offer.Id }, _mapper.Map<PhotoDto>(photo));
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

            //if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            offer.Photos.Remove(photo);

            if (await _unitOfWork.SaveAll()) return NoContent();

            return BadRequest("Failed to delete the photo");
        }
    }
}