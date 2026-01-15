import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Studata } from '../../models/studata.model';
import { DataService } from '../../services/data.service';
import { createClient } from '@supabase/supabase-js';
import ImageKit from "imagekit-javascript";
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

  ngOnInit(): void {
    this.addDataForm = this.fb.group({
      Date: ['', Validators.required],
      StudentName: ['', Validators.required],
      StudentPhoto: [''],
      Class: ['', Validators.required],
      sIndexNum: ['', [Validators.required,Validators.min(11111)]],
      Reason: ['', Validators.required],
      TeacherID: ['', Validators.required],
      Agreement: ['', Validators.required],
      AgreementEndDate: ['', Validators.required],
      ObserverTeacherID: ['', Validators.required],
      Isactive: [true],
      
    });
  }
  isDataUploading = false;
  @Output() cancelAddView: EventEmitter<void> = new EventEmitter<void>();
  @Output() stdataEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private adddataService: DataService,
    private appwriteService: AppwriteService,
  ) {}

  get f() {
    return this.addDataForm.controls;
  }
  // onFileSelected(event: any) {
  //   const file = event.target.files?.[0];
  //   if (!file) {
  //     console.error('No file selected');
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     console.log('File content:', reader.result);
  //     this.addDataForm.patchValue({ StudentPhoto: reader.result });
  //   };
  // }

  
  async onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    try {
      const bucketId = '6814c7a0002a2f1094e7'; // Replace with your Appwrite bucket ID
      const fileId = 'unique()'; // Appwrite can generate a unique ID
  
      // Upload file to Appwrite storage
      const response = await this.appwriteService.storage.createFile(bucketId, fileId, file);
      console.log('Upload success:', response);
  
      // Get public URL
      const fileUrl = this.appwriteService.storage.getFileView(bucketId, response.$id);
      console.log('Public file URL:', fileUrl);
  
      // Patch form with URL
      this.addDataForm.patchValue({ StudentPhoto: fileUrl });
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
    }
  }
  


  onSubmit() {
    const values = this.addDataForm.value as Studata;
    console.log(values);
    this.isDataUploading = true;
    this.adddataService.addSData(values as Studata).subscribe((res) => {
      this.stdataEvent.emit();
      this.isDataUploading = false;
      this.addDataForm.reset();
    });
    window.location.reload();
    this.isDataUploading = false;
    window.location.href = '/admin';
  }

  cancel() {
    this.cancelAddView.emit();
  }
}
