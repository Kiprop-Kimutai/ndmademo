import { Component, OnInit } from '@angular/core';
import { RegionsService } from './regions.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { paginatorFunction } from '../../shared/paginator.function';
import {PageEvent} from '@angular/material/typings/esm5/paginator';
import { Router } from '@angular/router';
import { Region } from '../../models/region';
let  queryString = '';
@Component({
    selector: 'app-regions-component',
    templateUrl: './regions.component.html',
    styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
    pageEvent: PageEvent;
    regions: Region[];
    regionsCopy: Region[];
    editMode: any = false;
    columns: any;
    response: any = {};
    displayedColumns: string[] = ['id', 'name', 'lat', 'longitude', 'deviceGroups'];
    dataSource = new MatTableDataSource<Region>();
    pageSize: number;
    $data: any;
    isEdit = false;
    dataLength: number;
    constructor(private regionsService: RegionsService, private router: Router) {}
    getRegions() {
        this.regionsService.fetchRegions().subscribe(data => {
          console.log(data);
          this.response = data;
          if (this.response.response_status === true) {
            this.regions = data.response_message;
            this.regionsCopy = data.response_message;
            this.dataLength = data.response_message.length;
            this.dataSource = new MatTableDataSource(this.regions);
            this.pageSize = 10;
          }
        }, error1 => {
          console.log('error', error1);
        });
    }
    paginateValues(pageSize: number, pageIndex: number) {
        this.regions = paginatorFunction(this.regionsCopy, pageSize, pageIndex) as Region[];
      }
      private filterRegions(text: string) {
        queryString = text;
        if (text.trim().length > 0) {
        this.regions = this.regions.filter(this.filterRegion);
        } else {
            this.regions = this.regionsCopy;
        }

    }
    private filterRegion(region: Region): any {
    const patt = new RegExp(queryString, 'i');
    if (patt.test(region.id.toString()) || patt.test('' + region.name) || patt.test('' + region.latitude) ||
        patt.test(region.longitude.toString())) {
        return region;
    }
    return;
    }
    onRowClicked(region) {
      this.router.navigate(['/home/regions/forms', region]);
    }
    newRegion() {
      // this.createNewDevice = true;
      this.router.navigate(['/home/regions/forms'], {});
    }
    onFormExit(exit: boolean) {
      // this.createNewDevice = !exit;
    }
    ngOnInit() {
        this.getRegions();
    }
}
