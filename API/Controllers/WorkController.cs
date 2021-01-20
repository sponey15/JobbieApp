using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public WorkController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpPost("works")]
        public async Task<ActionResult<Work>> CreateWork(WorkDto workDto)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(workDto.OfferId);

            if (offer == null) return NotFound("There is no offer");

            var workToAdd = _mapper.Map<Work>(workDto);
            workToAdd.UserId = userId;
            workToAdd.WorkStatusName = WorkStatus.Pending;

            _unitOfWork.WorkRepository.Add(workToAdd);

            if (await _unitOfWork.SaveAll())
            {
                return CreatedAtRoute("works", new { workId = workToAdd.Id, offerId = offer.Id}, workToAdd);
            }

            return BadRequest("Saving work didn't succeed");
        }

        [HttpGet("works/{workId}/{offerId}", Name = "works")]
        public async Task<ActionResult<Work>> ChoosenWork(int workId, int offerId)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);
            var work = await _unitOfWork.WorkRepository.GetWorkByIdAsync(workId);

            if (offer == null) return NotFound("There is no offer with given id");
            if (work == null) return NotFound("There is no work with given id");

            return Ok(work);
        }

        [HttpPost("work-tasks")]
        public async Task<ActionResult<WorkTask>> CreateWorkTask(WorkTaskDto workTaskDto)
        {
            var work = await _unitOfWork.WorkRepository.GetWorkByIdAsync(workTaskDto.WorkId);

            if (work == null) return BadRequest("There is no work with given id");

            var workTaskToAdd = _mapper.Map<WorkTask>(workTaskDto);

            _unitOfWork.WorkRepository.AddWorkTask(workTaskToAdd);

            if (await _unitOfWork.SaveAll())
            {
                return CreatedAtRoute("work-tasks", new { workTaskId = workTaskToAdd.Id, workId = work.Id}, workTaskToAdd);
            }

            return BadRequest("Saving work task didn't succeed");
        }

        [HttpGet("work-tasks/{workTaskId}/{workId}", Name = "work-tasks")]
        public async Task<ActionResult<WorkTask>> GetWorkTask(int workTaskId, int workId)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var workTask = await _unitOfWork.WorkRepository.GetWorkTaskByIdAsync(workTaskId);

            if (workTask == null) return NotFound("There is no work with given id");

            return Ok(workTask);
        }

        [HttpPut("work-tasks/{workTaskId}/{isComplete}")]
        public async Task<ActionResult<WorkTask>> UpdateWorkTask(int workTaskId, bool isComplete)
        {
            var workTask = await _unitOfWork.WorkRepository.GetWorkTaskByIdAsync(workTaskId);

            if (workTask == null) return NotFound("There is no work task with given id");

            workTask.IsComplete = isComplete;

            if (await _unitOfWork.SaveAll())
            {
                return Ok(workTask);
            }

            return BadRequest("Saving work task didn't succeed");
        }

        [HttpPut("works/{workId}")]
        public async Task<ActionResult<Work>> UpdateWork(int workId, WorkUpdateDto workUpdateDto)
        {
            var work = await _unitOfWork.WorkRepository.GetWorkByIdAsync(workId);

            if (work == null) return NotFound("There is no work with given id");

            var workToUpdate = _mapper.Map(workUpdateDto, work);

            if (await _unitOfWork.SaveAll())
            {
                return Ok(workToUpdate);
            }

            return BadRequest("Saving work didn't succeed");
        }

        [Authorize(Policy = "RequireCompanyRole")]
        [HttpGet("company-works/status")]
        public async Task<ActionResult<WorkTask>> GetCompanyWorksFromStatus(WorkStatus workStatus,
            [FromQuery] PaginationParams paginationParams)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var works = await _unitOfWork.WorkRepository.GetCompanyWorksFromStatusAsync(user.UserName, workStatus, paginationParams);

            if (works == null) return BadRequest("There is no works");

            Response.AddPaginationHeader(works.CurrentPage, works.PageSize,
                works.TotalCount, works.TotalPages);

            foreach (var work in works)
            {
                var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(work.OfferId);
                work.Offer = offer;
            }

            return Ok(works);
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpGet("user-works/status")]
        public async Task<ActionResult<WorkTask>> GetUserWorksFromStatus(WorkStatus workStatus,
            [FromQuery] PaginationParams paginationParams)
        {
            var userId = User.GetUserId();
            var works = await _unitOfWork.WorkRepository.GetUserWorksFromStatusAsync(userId, workStatus, paginationParams);

            if (works == null) return BadRequest("There is no works");

            Response.AddPaginationHeader(works.CurrentPage, works.PageSize,
                works.TotalCount, works.TotalPages);

            foreach (var work in works)
            {
                var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(work.OfferId);
                work.Offer = offer;
            }

            return Ok(works);
        }
    }
}