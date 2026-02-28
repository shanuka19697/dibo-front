import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Studata } from '../../models/studata.model';
import { DataService } from '../../services/data.service';
import { AppwriteService } from '../../services/appwrite.service';

@Component({
  selector: 'app-add-data',
  standalone: false,
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent implements OnInit {
  addDataForm: any;
  imageUrl: string | null = null;
  isDataUploading = false;
  
  @Output() cancelAddView: EventEmitter<void> = new EventEmitter<void>();
  @Output() stdataEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private adddataService: DataService,
    private appwriteService: AppwriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addDataForm = this.fb.group({
      Date: ['', Validators.required],
      StudentName: ['', Validators.required],
      StudentPhoto: [''],
      Class: ['', Validators.required],
      sIndexNum: ['', [Validators.required, Validators.min(11111)]],
      Reason: ['', Validators.required],
      TeacherID: ['', Validators.required],
      Agreement: ['', Validators.required],
      AgreementEndDate: ['', Validators.required],
      ObserverTeacherID: ['', Validators.required],
      Isactive: [true],
    });
  }

  get f() {
    return this.addDataForm.controls;
  }

  async onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const bucketId = '6814c7a0002a2f1094e7';
      const fileId = 'unique()';

      const response = await this.appwriteService.storage.createFile(bucketId, fileId, file);
      const fileUrl = this.appwriteService.storage.getFileView(bucketId, response.$id);
      this.addDataForm.patchValue({ StudentPhoto: fileUrl });
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
    }
  }

  onSubmit() {
    if (this.addDataForm.invalid) return;

    const values = this.addDataForm.value as Studata;
    this.isDataUploading = true;
    this.adddataService.addSData(values).subscribe({
      next: (res) => {
        this.stdataEvent.emit();
        this.isDataUploading = false;
        this.addDataForm.reset();
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.isDataUploading = false;
        console.error('Error adding data:', err);
      }
    });
  }

  cancel() {
    this.cancelAddView.emit();
  }
}
