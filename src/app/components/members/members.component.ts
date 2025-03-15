import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Member {
  Name: string;
  Role: string;
  PhoneNumber: string;
}


@Component({
  selector: 'app-members',
  standalone: false,
  
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
  members: Member[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Generate 10 mock members
    this.members = [
      { Name: "Amal Wijesinghe", Role: "Principal", PhoneNumber: "077-4567890" },
      { Name: "Kumara Perera", Role: "Teacher", PhoneNumber: "077-1234567" },
      { Name: "Nadeeka Perera", Role: "Teacher", PhoneNumber: "071-8901234" },
      { Name: "Ruwan Dissanayake", Role: "Teacher", PhoneNumber: "071-5678901" },
      { Name: "Chathura Bandara", Role: "Staff", PhoneNumber: "077-7890123" },
      { Name: "Sunil Fernando", Role: "Staff", PhoneNumber: "076-3456789" },
      { Name: "Nimal Silva", Role: "Student", PhoneNumber: "071-2345678" },
      { Name: "Saman Kumara", Role: "Student", PhoneNumber: "076-6789012" },
      { Name: "Lalith Gunawardena", Role: "Student", PhoneNumber: "076-9012345" },
      { Name: "Tharindu Jayasuriya", Role: "Admin", PhoneNumber: "077-0123456" }
    ];
  }

  goBack(): void {
    this.router.navigate(['/admin']); // Adjust to your admin route
  }
}
