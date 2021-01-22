import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { WorkStatus } from 'src/app/_models/work';
import { WorkService } from 'src/app/_services/work.service';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {
  works: any;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  selectedCategory: string;
  category: string;
  options = [
    { workStatusName: "Pending", value: "Pending" },
    { workStatusName: "In progress", value: "In progress" },
    { workStatusName: "Archive", value: "Archive" },
  ];

  constructor(private workService: WorkService, private toastr: ToastrService) { }

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
    this.workService.getCompanyWorksFromStatus(this.category, this.pageNumber, this.pageSize).subscribe(works => {
      this.works = works.result;
      this.pagination = works.pagination;
      console.log(this.works);
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.getWorks();
  }
}
