import { Component, OnInit } from '@angular/core';
import { WorkStatus } from 'src/app/_models/work';
import { WorkService } from 'src/app/_services/work.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  works: any;
  selectedCategory: string;
  category: string;
  options = [
    { workStatusName: "Pending", value: "Pending" },
    { workStatusName: "In progress", value: "In progress" },
    { workStatusName: "Archive", value: "Archive" },
  ];

  constructor(private workService: WorkService) { }

  ngOnInit(): void {
    this.selectedCategory = 'Pending';
    this.getWorks();
  }

  getWorks() {
    if (this.selectedCategory === "In progress") {
      this.category = "InProgress";
    }
    else {
      this.category = this.selectedCategory;
    }
    let workStatus: WorkStatus = {
      workStatusName: this.category
    };
    this.workService.getUserWorksFromStatus(workStatus).subscribe(works => {
      this.works = works;
      console.log(this.works);
    });
  }
}
