import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FileModel } from 'src/shared/models/FileModel';
import { FileService } from 'src/shared/services/file.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  grossSalaries: Array<number> = [];
  netSalaries: Array<number> = [];
  charges: Array<number> = [];
  dates: Array<string> = [];
  chartWidth: string = '100%';

  chartDatasets: ChartDataSets[] = [
    { data: this.grossSalaries, label: 'Salaire Brut' },
    { data: this.netSalaries, label: 'Salaire Net' },
    { data: this.charges, label: 'Charges' },
  ];
  chartLabels: Label[] = this.dates;
  chartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  chartType = 'line';
  chartOptions = {
    maintainAspectRatio: false
  };

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    this.fileService.getAll()
      .subscribe((files: FileModel[]) => {
        let dates = [];
        files.forEach(file => {
          if (file.isFichePaie() && file.documentDate) {
            dates.push(file.documentDate);
            this.grossSalaries.push(file.grossSalary);
            this.netSalaries.push(file.netSalary);
            this.charges.push(file.grossSalary - file.netSalary);
          }
        });
        dates.sort((a, b) => a.getTime() - b.getTime());
        dates.forEach(date => {
          this.dates.push(this.formatDate(date));
        })
        this.chartWidth = this.dates.length * 100 + 'px';        
      });
  }

  formatDate(date: Date): string {
    if (date) {
      return ('0' + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
    }
  }
}
