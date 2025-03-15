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
  public sdata!:Studata;

  constructor(private route: ActivatedRoute,
    private dataService: DataService
   ) { }

  ngOnInit(): void {
    let selectDataId = this.route.snapshot.paramMap.get('_id');
    this.dataService.getSData().subscribe((res) => {
      this.sdata = res.data.find((data: Studata) => data._id === selectDataId) || {} as Studata;
    });
  }
}

