using System;

namespace API.DTO
{
    public class WorkDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime WorkBegin { get; set; }
        public DateTime WorkEnd { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public int OfferId { get; set; }
    }
}