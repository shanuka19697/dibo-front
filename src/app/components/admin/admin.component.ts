import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Studata } from '../../models/studata.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: false,
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public rowIndex!: number;
  selectedProduct!: Studata;
  isLoading: boolean = false;
  public sdatas: Studata[] = [];
  public filteredData: Studata[] = [];
  public searchIndex: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public selectData(selectedRow: any, sdata: Studata) {
    this.rowIndex = selectedRow;
    this.selectedProduct = sdata;
  }

  getProducts() {
    this.isLoading = true;
    this.dataService.getSData().subscribe((res) => {
      this.sdatas = res.data;
      this.filteredData = this.sdatas;
      this.isLoading = false;
    });
  }

  filterData() {
    this.filteredData = this.sdatas.filter(student => 
      student.sIndexNum.toString().includes(this.searchIndex)
    );
  }

  deleteData(_id: string, sid: number) {
    if (window.confirm(`Are you sure you want to delete the student with Index Number ${sid}?`)) {
      this.isLoading = true;
      this.dataService.deleteSData(_id).subscribe({
        next: () => {
          this.getProducts();
          this.rowIndex = -1;
          this.selectedProduct = null!;
        },
        error: (err) => {
          console.error('Error deleting student data:', err);
          this.isLoading = false;
          alert('Failed to delete the student data. Please try again.');
        }
      });
    }
  }

  toggleActive(stdata: Studata) {
    if (window.confirm(`Are you sure you want to ${stdata.Isactive ? 'deactivate' : 'activate'} the student with Index Number ${stdata.sIndexNum}?`)) {
      // Toggle the local Isactive value
      stdata.Isactive = !stdata.Isactive;

      // Update the backend via DataService
      this.isLoading = true;
      this.dataService.updateSData(stdata._id, { ...stdata, Isactive: stdata.Isactive }).subscribe({
        next: (response) => {
          console.log('Student active status updated:', response);
          this.isLoading = false;
          // No need to refresh all data since we're updating locally
        },
        error: (err) => {
          console.error('Error updating student active status:', err);
          // Revert the change if the update fails
          stdata.Isactive = !stdata.Isactive;
          this.isLoading = false;
          alert('Failed to update the student status. Please try again.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}