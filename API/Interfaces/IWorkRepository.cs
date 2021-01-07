using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;

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
        Task<IEnumerable<Work>> GetCompanyWorksFromStatusAsync(string companyName, WorkStatusDto workStatusDto);
        Task<IEnumerable<Work>> GetUserWorksFromStatusAsync(int userId, WorkStatusDto workStatusDto);
    }
}