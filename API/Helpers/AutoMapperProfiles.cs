using API.DTO;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<OfferToAddDto, Offer>();
            CreateMap<OfferCategoryDto, Offer>();
            CreateMap<PhotoDto, Photo>().ReverseMap();
        }
    }
}