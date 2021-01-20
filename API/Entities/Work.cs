using System;
using System.Collections.Generic;

namespace API.Entities
{
    public enum WorkStatus
    {
        Pending, InProgress, Archive
    }
    public class Work
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public bool IsPaid { get; set; }
        public DateTime WorkBegin { get; set; }
        public DateTime WorkEnd { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public Offer Offer { get; set; }
        public int OfferId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        private WorkStatus workStatusName;
        public WorkStatus WorkStatusName
        {
            get { return workStatusName; }
            set { workStatusName = value; }
        }
        public ICollection<WorkTask> WorkTasks { get; set; }
    }
}