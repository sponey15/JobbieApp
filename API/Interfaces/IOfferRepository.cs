using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IOfferRepository
    {
        void Add(Offer offer);
        void Delete(Offer offer);
        void Update(Offer offer);
        Task<Offer> GetOfferByIdAsync(int offerId);
        Task<PagedList<Offer>> GetOffersFromCategoryAsync(OfferCategory offerCategory, OfferParams offerParams);
        Task<PagedList<Offer>> GetOffersFromCompanyAsync(string companyName, PaginationParams paginationParams);
        Task<PagedList<Offer>> GetCompanyOffersFromCategoryAsync(string companyName, OfferCategory offerCategory,
            PaginationParams paginationParams);
    }
}