// src/app/studinfo/studinfo.component.ts
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-studinfo',
  templateUrl: './studinfo.component.html',
  styleUrls: ['./studinfo.component.css'],
})
export class StudInfoComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }
}
