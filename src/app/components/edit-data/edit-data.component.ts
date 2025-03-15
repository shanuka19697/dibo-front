// edit-data.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Studata } from '../../models/studata.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-data',
  standalone: false,
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  isDataUploading: boolean = false;
  sdata: Studata = {} as Studata;
  addDataForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!confirm('Are you sure you want to edit this data?')) {
      window.location.href = '/admin';
      return;
    }
    this.initializeForm();
    const selectDataId = this.route.snapshot.paramMap.get('_id');
    
    if (selectDataId) {
      this.dataService.getSData().subscribe({
        next: (res) => {
          const foundData = res.data.find((data: Studata) => data._id === selectDataId);
          if (foundData) {
            this.sdata = foundData;
            this.patchFormValues();
          }
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
    }
  }

  private initializeForm(): void {
    this.addDataForm = this.fb.group({
      Date: ['', Validators.required],
      StudentName: ['', Validators.required],
      Class: ['', Validators.required],
      sIndexNum: ['', [Validators.required, Validators.min(11111)]],
      Reason: ['', Validators.required],
      TeacherID: ['', Validators.required],
      Agreement: [''],
      AgreementEndDate: [''],
      ObserverTeacherID: ['']
    });
  }

  // Helper function to format date to YYYY-MM-DD
  private formatDate(date: string | Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return ''; // Handle invalid dates
    return d.toISOString().split('T')[0];
  }

  private patchFormValues(): void {
    this.addDataForm.patchValue({
      Date: this.formatDate(this.sdata.Date),
      StudentName: this.sdata.StudentName,
      Class: this.sdata.Class,
      sIndexNum: this.sdata.sIndexNum,
      Reason: this.sdata.Reason,
      TeacherID: this.sdata.TeacherID,
      Agreement: this.sdata.Agreement,
      AgreementEndDate: this.formatDate(this.sdata.AgreementEndDate),
      ObserverTeacherID: this.sdata.ObserverTeacherID
    });
  }

  onSubmit(): void {
    if (this.addDataForm.valid) {
      this.isDataUploading = true;
      const formData = {
        ...this.addDataForm.value,
        // Ensure dates are in correct format for backend
        Date: new Date(this.addDataForm.value.Date).toISOString(),
        AgreementEndDate: this.addDataForm.value.AgreementEndDate 
          ? new Date(this.addDataForm.value.AgreementEndDate).toISOString() 
          : undefined
      };
      
      this.dataService.updateSData(this.sdata._id, formData).subscribe({
        next: (response) => {
          this.isDataUploading = false;
          console.log('Data updated successfully', response);
        },
        error: (err) => {
          this.isDataUploading = false;
          console.error('Error updating data:', err);
        }
      });
    }
    // Navigate to the admin panel after successful submission
    this.isDataUploading = false;
    window.location.href = '/admin';
  }
}