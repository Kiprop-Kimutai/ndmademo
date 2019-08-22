import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { paginatorFunction } from '../../../shared/paginator.function';
import {PageEvent} from '@angular/material/typings/esm5/paginator';
import { DeviceService } from '../devices.service';
import { Device } from '../../../models/device';
import { Router } from '@angular/router';
let queryString = '';
@Component({
    selector: 'app-devices-component',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
    pageEvent: PageEvent;
    devices: Device[];
    devicesCopy: Device[];
    editMode: any = false;
    columns: any;
    response: any = {};
    displayedColumns: string[] = ['id', 'serialno', 'model', 'kernel', 'firmware', 'status'];
    dataSource = new MatTableDataSource<Device>();
    pageSize: number;
    $data: any;
    isEdit = false;
    dataLength: number;
    createNewDevice = false;
    constructor(private deviceService: DeviceService, private router: Router) {}

  getDevices() {
    this.deviceService.fetchDevices().subscribe(data => {
      this.response = data;
      if (this.response.response_status === true) {
        this.devices = data.response_message;
        this.devicesCopy = data.response_message;
        this.dataLength = data.response_message.length;
        this.dataSource = new MatTableDataSource(this.devices);
        this.pageSize = 10;
      }
    }, error1 => {
      console.log('error', error1);
    });
  }
  paginateValues(pageSize: number, pageIndex: number) {
    this.devices = paginatorFunction(this.devicesCopy, pageSize, pageIndex) as Device[];
  }
  private filterDevices(text: string) {
    queryString = text;
    if (text.trim().length > 0) {
    this.devices = this.devices.filter(this.filterDevice);
    } else {
        this.devices = this.devicesCopy;
    }

}
private filterDevice(device: Device): any {
const patt = new RegExp(queryString, 'i');
if (patt.test(device.serialno) || patt.test('' + device.id) || patt.test(device.model) ||
    patt.test(device.kernel) || patt.test(device.group) ||
    patt.test(device.firmware) ||  patt.test(device.assigned_firmware)) {
    return device;
}
return;
}
onRowClicked(device) {
  this.router.navigate(['/home/devices/list', device.id]);
}
newDevice() {
  this.createNewDevice = true;
}
onFormExit(exit: boolean) {
  this.createNewDevice = !exit;
}
 ngOnInit(): void {
     this.getDevices();
 }
}

