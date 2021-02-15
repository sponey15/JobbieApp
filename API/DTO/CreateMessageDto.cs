namespace API.DTO
{
    public class CreateMessageDto
    {
        public string RecipientUsername { get; set; }
        public int WorkId { get; set; }
        public string Content { get; set; }
    }
}