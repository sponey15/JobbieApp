using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface IOfferRepository
    {
        void Add(Offer offer);
        void Delete(Offer offer);
        Task<Offer> GetOfferByIdAsync(int offerId);
        Task<IEnumerable<Offer>> GetOffersFromCategoryAsync(OfferCategoryDto offerCategoryDto);
        Task<IEnumerable<Offer>> GetOffersFromCompanyAsync(string companyName);
        Task<IEnumerable<Offer>> GetCompanyOffersFromCategory(string companyName, OfferCategoryDto offerCategoryDto);
    }
}