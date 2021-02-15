using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
         void AddMessage(Message message);
         void DeleteMessage(Message message);
         Task<Message> GetMessageAsync(int id);
         Task<PagedList<MessageDto>> GetMessagesForUserAsync(MessageParams messageParams);
         Task<IEnumerable<MessageDto>> GetMessageThreadAsync(int currentUserId, int recipientId, int workId);
    }
}