import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Studata } from '../../models/studata.model';

@Component({
  selector: 'app-view-data',
  standalone: false,
  templateUrl: './view-data.component.html',
  styleUrl: './view-data.component.css'
})
export class ViewDataComponent implements OnInit {
  public sdata: Studata | null = null;
  public isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const selectDataId = params['_id'];
      if (selectDataId) {
        this.fetchData(selectDataId);
      }
    });
  }

  fetchData(id: string): void {
    this.isLoading = true;
    this.dataService.getSData().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.sdata = res.data.find((data: Studata) => data._id === id) || null;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching student data:', err);
        this.isLoading = false;
        this.sdata = null;
      }
    });
  }
}

