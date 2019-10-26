import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../devices/devices.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { paginatorFunction } from '../../shared/paginator.function';
import {PageEvent} from '@angular/material/typings/esm5/paginator';
import { DeviceGroup } from '../../models/devicegroup';
import { ApiResponse } from '../../models/apiresponse';

let queryString = '';
@Component({
    selector: 'app-device-group-component',
    templateUrl: './device-group.component.html',
    styleUrls: ['./device-group.component.css']
})
export class DeviceGroupComponent implements OnInit {
    pageEvent: PageEvent;
    deviceGroups: DeviceGroup[];
    devicesGroupsCopy: DeviceGroup[];
    editMode: any = false;
    displayedColumns: string[] = ['id', 'name', 'model', 'firmware', 'firmware_history', 'createdAt'];
    dataSource = new MatTableDataSource<DeviceGroup>();
    pageSize: number;
    response: ApiResponse;
    isEdit = false;
    dataLength: number;
    constructor( private deviceService: DeviceService, private router: Router) {}
    getDeviceGroups() {
        this.deviceService.fetchDeviceGroups().subscribe(data => {
          this.response = data;
          if (this.response.response_status === true) {
            this.deviceGroups = data.response_message;
            this.devicesGroupsCopy = data.response_message;
            this.dataLength = data.response_message.length;
            this.dataSource = new MatTableDataSource(this.deviceGroups);
            this.pageSize = 10;
          }
        }, error1 => {
          console.log('error', error1);
        });
      }
      paginateValues(pageSize: number, pageIndex: number) {
        this.deviceGroups = paginatorFunction(this.devicesGroupsCopy, pageSize, pageIndex) as DeviceGroup[];
      }
      private filterDevices(text: string) {
        queryString = text;
        if (text.trim().length > 0) {
        this.deviceGroups = this.deviceGroups.filter(this.filterDevice);
        } else {
            this.deviceGroups = this.devicesGroupsCopy;
        }
    }
    private filterDevice(devicegroup: DeviceGroup): any {
    const patt = new RegExp(queryString, 'i');
    if (patt.test('' + devicegroup.id) || patt.test('' + devicegroup.regionId) || patt.test(devicegroup.name) ||
        patt.test(devicegroup.firmware) || patt.test(devicegroup.firmwareHistory) ||
        patt.test('' + devicegroup.createdAt) ||  patt.test('' + devicegroup.updatedAt)) {
        return devicegroup;
    }
    return;
    }
    onRowClicked(device) {
      this.router.navigate(['/home/devices/groups/forms', device]);
    }
    newDevice() {
      // his.createNewDevice = true;
      this.router.navigate(['/home/devices/groups/forms']);
    }
     ngOnInit(): void {
         this.getDeviceGroups();
     }
}
