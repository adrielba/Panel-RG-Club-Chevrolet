import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../statistics.service';

@Component({
  selector: 'app-statistics',
  standalone: false,
  
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  statistics: any;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(
      (data) => {
        this.statistics = data;
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }

}
