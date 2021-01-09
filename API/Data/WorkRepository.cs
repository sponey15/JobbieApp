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
    public class WorkRepository : IWorkRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public WorkRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void Add(Work work)
        {
            _context.Works.Add(work);
        }

        public void AddWorkTask(WorkTask workTask)
        {
            _context.WorkTasks.Add(workTask);
        }

        public void Delete(Work work)
        {
            _context.Works.Remove(work);
        }

        public void Update(Work work)
        {
            _context.Works.Update(work);
        }

        public async Task<Work> GetWorkByIdAsync(int workId)
        {
            return await _context.Works
                            .Include(w => w.WorkTasks)
                            .SingleOrDefaultAsync(x => x.Id == workId);
        }

        public async Task<WorkTask> GetWorkTaskByIdAsync(int workTaskId)
        {
            return await _context.WorkTasks
                            .Include(w => w.Work)
                            .SingleOrDefaultAsync(x => x.Id == workTaskId);
        }

        public async Task<IEnumerable<Work>> GetCompanyWorksFromStatusAsync(string companyName, WorkStatusDto workStatusDto)
        {
            var workStatus = _mapper.Map<Work>(workStatusDto);

            return await _context.Works
                            .Include(w => w.WorkTasks)
                            .Include(w => w.Offer)
                            .Where(x => x.WorkStatusName == workStatus.WorkStatusName 
                                     && x.Offer.CompanyName == companyName)
                            .ToListAsync();
        }

        public async Task<IEnumerable<Work>> GetUserWorksFromStatusAsync(int userId, WorkStatusDto workStatusDto)
        {
            var workStatus = _mapper.Map<Work>(workStatusDto);

            return await _context.Works
                            .Include(w => w.WorkTasks)
                            .Include(w => w.Offer)
                            .Where(x => x.WorkStatusName == workStatus.WorkStatusName 
                                     && x.UserId == userId)
                            .ToListAsync();
        }
    }
}