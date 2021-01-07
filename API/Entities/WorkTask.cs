namespace API.Entities
{
    public class WorkTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsComplete { get; set; }
        public Work Work { get; set; }
        public int WorkId { get; set; }
    }
}