using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get; }
        IOfferRepository OfferRepository {get; }
        // void Add<T>(T entity) where T: class;
        // void Delete<T>(T entity) where T: class;
        // void DeleteRange<T>(T entity) where T: class;
        Task<bool> SaveAll();
    }
}