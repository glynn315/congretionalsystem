import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../../services/Dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  user: any = null;
  dashboardData: any = {};

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.loadDashboardData();
    }
  }

  loadDashboardData() {
    this.dashboardService.getDashboard(this.user.role).subscribe({
      next: (res) => {
        this.dashboardData = res;
      },
      error: (err) => {
        console.error('Failed to load dashboard data', err);
      }
    });
  }
}
