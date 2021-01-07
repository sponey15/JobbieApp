namespace API.DTO
{
    public class WorkStatusDto
    {
        private WorkStatus workStatusName;
        public enum WorkStatus
        {
            Pending, InProgress, Archive
        }
        public WorkStatus WorkStatusName
        {
            get { return workStatusName; }
            set { workStatusName = value; }
        }
    }
}