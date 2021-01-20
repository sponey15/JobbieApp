using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OfferRepository : IOfferRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OfferRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void Add(Offer offer)
        {
            _context.Offers.Add(offer);
        }

        public void Delete(Offer offer)
        {
            _context.Offers.Remove(offer);
        }

        public void Update(Offer offer)
        {
            _context.Offers.Update(offer);
        }

        public async Task<Offer> GetOfferByIdAsync(int offerId)
        {
            return await _context.Offers
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Id == offerId);
        }

        public async Task<PagedList<Offer>> GetOffersFromCategoryAsync(OfferCategory offerCategory,
            PaginationParams paginationParams)
        {
            var query = _context.Offers
                .Where(x => x.OfferCategoryName == offerCategory)
                .Include(p => p.Photos)
                .OrderBy(x => x.Id)
                .AsNoTracking();
            return await PagedList<Offer>.CreateAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<PagedList<Offer>> GetOffersFromCompanyAsync(string companyName, PaginationParams paginationParams)
        {
            var query = _context.Offers
                .Where(x => x.CompanyName == companyName)
                .Include(p => p.Photos)
                .OrderBy(x => x.Id)
                .AsNoTracking();
            return await PagedList<Offer>.CreateAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<PagedList<Offer>> GetCompanyOffersFromCategoryAsync(string companyName, OfferCategory offerCategory,
            PaginationParams paginationParams)
        {
            var query = _context.Offers
                .Where(x => x.OfferCategoryName == offerCategory && x.CompanyName == companyName)
                .Include(p => p.Photos)
                .OrderBy(x => x.Id)
                .AsNoTracking();
            return await PagedList<Offer>.CreateAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
        }
    }
}