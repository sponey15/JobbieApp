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
            CreateMap<WorkDto, Work>();
            CreateMap<WorkTaskDto, WorkTask>();
            CreateMap<WorkUpdateDto, Work>();
            CreateMap<WorkStatusDto, Work>();
            CreateMap<MessageDto, Message>();
            CreateMap<Message, MessageDto>();
        }
    }
}