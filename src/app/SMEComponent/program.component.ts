import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../RMCreateNewPopupComponent/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Popup1Component } from '../SMEPopupComponent/popup1.component';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
})
export class ProgramComponent implements OnInit {
  faHome = faHome;
  faSearch = faSearch;
  faArrowDown = faArrowDown;
  faDownload = faDownload;
  currentLogInsme: any;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public router: Router
  ) {
     this.currentLogInsme = this.router.getCurrentNavigation()?.extras.state;
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;

  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = [
    'vamid',
    'resourceName',
    'techTrack',
    'program',
    'startDate',
    'endDate',
    'DelayDays',
    // 'Attach',
    'SMEaction',
  ];
  displayColums1: string[] = [
    'vamid',
    'resourceName',
    'program',
    'startDate',
    'endDate',
    'Delaydays',
    'smeStatus',
  ];
  Openpopup(id: any) {
    const _popup = this.dialog.open(Popup1Component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
      },
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.Getallcomapny().subscribe((response) => {
      this.companydata = response;
      var finaldata = this.companydata;
      var finaldata = this.companydata.filter(
        (item: any) => item.sme === this.currentLogInsme.name
      );
      this.finaldata = new MatTableDataSource<companymodel>(finaldata);
      // this.finaldata.paginator = this._paginator;
      // this.finaldata.sort = this._sort;
    });
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
  }
}


