using System.Collections.Generic;
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
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public MessageController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("messages/{messageId}", Name = "messages")]
        public async Task<ActionResult<MessageDto>> GetMessage(int messageId)
        {
            var message = await _unitOfWork.MessageRepository.GetMessageAsync(messageId);
            
            return _mapper.Map<MessageDto>(message);
        }

        [HttpPost("messages")]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();

            if (username == createMessageDto.RecipientUsername.ToLower())
                return BadRequest("You cannot send messages to yourself");
            
            var sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await _unitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);
            var work = await _unitOfWork.WorkRepository.GetWorkByIdAsync(createMessageDto.WorkId);

            if (recipient == null || work == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content,
                WorkId = createMessageDto.WorkId
            };

            _unitOfWork.MessageRepository.AddMessage(message);

            if (await _unitOfWork.SaveAll())
            {
                return CreatedAtRoute("messages", new { messageId = message.Id }, _mapper.Map<MessageDto>(message));
            }

            return BadRequest("Failed to save message");
        }

        [HttpGet("user-messages")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] 
            MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await _unitOfWork.MessageRepository.GetMessagesForUserAsync(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize,
                messages.TotalCount, messages.TotalPages);
            
            return messages;
        }
    }
}