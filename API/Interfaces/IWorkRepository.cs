using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IWorkRepository
    {
        void Add(Work work);
        void AddWorkTask(WorkTask workTask);
        void Delete(Work work);
        void Update(Work work);
        Task<Work> GetWorkByIdAsync(int workId);
        Task<WorkTask> GetWorkTaskByIdAsync(int workTaskId);
        Task<PagedList<Work>> GetCompanyWorksFromStatusAsync(string companyName, WorkStatus workStatus,
            PaginationParams paginationParams);
        Task<PagedList<Work>> GetUserWorksFromStatusAsync(int userId, WorkStatus workStatus,
            PaginationParams paginationParams);
    }
}