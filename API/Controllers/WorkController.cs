using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extensions;
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
        [HttpPost("newWork")]
        public async Task<ActionResult<Work>> NewWork(WorkDto workDto)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(workDto.OfferId);

            if (offer == null) return BadRequest("There is no offer");

            var workToAdd = _mapper.Map<Work>(workDto);
            //workToAdd.Offer = offer;
            workToAdd.UserId = userId;
            workToAdd.WorkStatusName = Work.WorkStatus.Pending;

            _unitOfWork.WorkRepository.Add(workToAdd);

            if (await _unitOfWork.SaveAll())
            {
                return Ok(workToAdd);
            }

            return BadRequest("Saving work didn't succeed");
        }

        [HttpGet("getWork/{workId}/{offerId}")]
        public async Task<ActionResult<Work>> GetWork(int workId, int offerId)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var offer = await _unitOfWork.OfferRepository.GetOfferByIdAsync(offerId);
            var work = await _unitOfWork.WorkRepository.GetWorkByIdAsync(workId);

            if (offer == null) return BadRequest("There is no offer with given id");
            if (work == null) return BadRequest("There is no work with given id");

            return Ok(work);
        }

        [HttpPost("newWorkTask")]
        public async Task<ActionResult<WorkTask>> NewWorkTask(WorkTaskDto workTaskDto)
        {
            var work = await _unitOfWork.WorkRepository.GetWorkByIdAsync(workTaskDto.WorkId);

            if (work == null) return BadRequest("There is no work with given id");

            var workTaskToAdd = _mapper.Map<WorkTask>(workTaskDto);

            _unitOfWork.WorkRepository.AddWorkTask(workTaskToAdd);

            if (await _unitOfWork.SaveAll())
            {
                return Ok(workTaskToAdd);
            }

            return BadRequest("Saving work task didn't succeed");
        }

        [HttpPut("updateWorkTask/{workTaskId}/{isComplete}")]
        public async Task<ActionResult<WorkTask>> UpdateWorkTask(int workTaskId, bool isComplete)
        {
            var workTask = await _unitOfWork.WorkRepository.GetWorkTaskByIdAsync(workTaskId);

            if (workTask == null) return BadRequest("There is no work task with given id");

            // var workTaskToUpdate = _mapper.Map(workTaskDto, workTask);
            workTask.IsComplete = isComplete;

            if (await _unitOfWork.SaveAll())
            {
                return Ok(workTask);
            }

            return BadRequest("Saving work task didn't succeed");
        }

        [HttpPut("updateWork/{workId}")]
        public async Task<ActionResult<Work>> UpdateWork(int workId, WorkUpdateDto workUpdateDto)
        {
            var work = await _unitOfWork.WorkRepository.GetWorkByIdAsync(workId);

            if (work == null) return BadRequest("There is no work with given id");

            var workToUpdate = _mapper.Map(workUpdateDto, work);

            if (await _unitOfWork.SaveAll())
            {
                return Ok(workToUpdate);
            }

            return BadRequest("Saving work didn't succeed");
        }

        [Authorize(Policy = "RequireCompanyRole")]
        [HttpPost("getCompanyWorksFromStatus")]
        public async Task<ActionResult<WorkTask>> GetCompanyWorksFromStatus(WorkStatusDto workStatusDto)
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var works = await _unitOfWork.WorkRepository.GetCompanyWorksFromStatusAsync(user.UserName, workStatusDto);

            if (works == null) return BadRequest("There is no works");

            return Ok(works);
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpPost("getUserWorksFromStatus")]
        public async Task<ActionResult<WorkTask>> GetUserWorksFromStatus(WorkStatusDto workStatusDto)
        {
            var userId = User.GetUserId();
            var works = await _unitOfWork.WorkRepository.GetUserWorksFromStatusAsync(userId, workStatusDto);

            if (works == null) return BadRequest("There is no works");

            return Ok(works);
        }
    }
}