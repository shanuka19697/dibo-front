import { Component } from '@angular/core';
import { Studata } from '../../models/studata.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search-data',
  standalone: false,
  templateUrl: './search-data.component.html',
  styleUrl: './search-data.component.css'
})
export class SearchDataComponent {
  searchIndex: string = ''; // Bound to the search input
  filteredData: Studata[] = []; // Stores the search results
  searchSubmitted: boolean = false; // Flag to track search submission

  constructor(private dataService: DataService) {}

  searchData() {
    if (this.searchIndex.trim() === '') {
      this.filteredData = [];
      this.searchSubmitted = false; // Reset flag if input is empty
      return;
    }

    // Set the submission flag
    this.searchSubmitted = true;

    // Convert searchIndex to a number for comparison
    const indexNum = Number(this.searchIndex);

    // Fetch student data and filter by index number
    this.dataService.getSData().subscribe({
      next: (res) => {
        this.filteredData = res.data.filter((student: Studata) =>
          student.sIndexNum === indexNum
        );
      },
      error: (err) => {
        console.error('Error fetching student data:', err);
        this.filteredData = [];
        alert('Failed to fetch student data. Please try again.');
      }
    });

  }
}
