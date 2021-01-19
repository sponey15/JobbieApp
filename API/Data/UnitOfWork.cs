using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IOfferRepository OfferRepository => new OfferRepository(_context, _mapper);

        public IWorkRepository WorkRepository => new WorkRepository(_context, _mapper);
        
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}