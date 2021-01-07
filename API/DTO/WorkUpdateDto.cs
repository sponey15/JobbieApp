using System;

namespace API.DTO
{
    public class WorkUpdateDto
    {
        public int Price { get; set; }
        public bool IsPaid { get; set; }
        public DateTime WorkBegin { get; set; }
        public DateTime WorkEnd { get; set; }
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