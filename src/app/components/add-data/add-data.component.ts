import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Studata } from '../../models/studata.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-data',
  standalone: false,
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent implements OnInit {
  addDataForm: any;
  ngOnInit(): void {
    this.addDataForm = this.fb.group({
      Date: ['', Validators.required],
      StudentName: ['', Validators.required],
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
    private adddataService: DataService
  ) {}

  get f() {
    return this.addDataForm.controls;
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
  }

  cancel() {
    this.cancelAddView.emit();
  }
}
