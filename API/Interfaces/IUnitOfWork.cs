using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get; }
        IOfferRepository OfferRepository {get; }
        IWorkRepository WorkRepository {get; }
        Task<bool> SaveAll();
    }
}