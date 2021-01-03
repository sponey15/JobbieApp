using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
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

        public async Task<Offer> GetOfferByIdAsync(int offerId)
        {
            return await _context.Offers
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Id == offerId);
        }

        public async Task<IEnumerable<Offer>> GetOffersFromCategoryAsync(OfferCategoryDto offerCategoryDto)
        {
            var offerCategory = _mapper.Map<Offer>(offerCategoryDto);

            return await _context.Offers
                .Where(x => x.OfferCategoryName == offerCategory.OfferCategoryName)
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<IEnumerable<Offer>> GetOffersFromCompanyAsync(string companyName)
        {
            return await _context.Offers
                .Where(x => x.CompanyName == companyName)
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<IEnumerable<Offer>> GetCompanyOffersFromCategory(string companyName, OfferCategoryDto offerCategoryDto)
        {
            var offerCategory = _mapper.Map<Offer>(offerCategoryDto);

            return await _context.Offers
                .Where(x => x.OfferCategoryName == offerCategory.OfferCategoryName && x.CompanyName == companyName)
                .Include(p => p.Photos)
                .ToListAsync();
        }
    }
}