import { Component, OnInit} from '@angular/core';
import { BeneficiariesService } from './beneficiaries.service';
import { MatTableDataSource } from '@angular/material';
import { paginatorFunction } from '../../shared/paginator.function';
import {PageEvent} from '@angular/material/typings/esm5/paginator';
import { Beneficiary } from '../../models/beneficiary';
import { Router } from '@angular/router';

let queryString = '';
@Component({
    selector: 'app-beneficiaries-component',
    templateUrl: './beneficiaries.component.html',
    styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiaryComponent implements OnInit {
    pageEvent: PageEvent;
    beneficiaries: Beneficiary[];
    beneficiariesCopy: Beneficiary[];
    editMode: any = false;
    columns: any;
    response: any = {};
    displayedColumns: string[] = ['id', 'firstname', 'lastname', 'county', 'active', 'idnumber', 'createdAt'];
    dataSource = new MatTableDataSource<Beneficiary>();
    pageSize: number;
    $data: any;
    isEdit = false;
    dataLength: number;
    createNewAgent = false;
    constructor( private beneficiaryService: BeneficiariesService, private router: Router) {}
    getBeneficiaries() {
        this.beneficiaryService.fetchBeneficiaries().subscribe(data => {
          this.response = data;
          if (this.response.response_status === true) {
            this.beneficiaries = data.response_message;
            this.beneficiariesCopy = data.response_message;
            this.dataLength = data.response_message.length;
            this.dataSource = new MatTableDataSource(this.beneficiaries);
            this.pageSize = 10;
          }
        }, error => {
          console.log('error', error);
        });
    }
    paginateValues(pageSize: number, pageIndex: number) {
        this.beneficiaries = paginatorFunction(this.beneficiariesCopy, pageSize, pageIndex) as Beneficiary[];
      }
      private filterBeneficiaries(text: string) {
        queryString = text;
        if (text.trim().length > 0) {
        this.beneficiaries = this.beneficiaries.filter(this.filterBeneficiary);
        } else {
            this.beneficiaries = this.beneficiariesCopy;
        }
    }
    private filterBeneficiary(beneficiary: Beneficiary): any {
    const patt = new RegExp(queryString, 'i');
    if (patt.test(beneficiary.firstname) || patt.test(beneficiary.middlename) || patt.test(beneficiary.lastname) ||
        patt.test(beneficiary.phone) || patt.test('' + beneficiary.status) ||
        patt.test(beneficiary.county) ||  patt.test('' + beneficiary.createdAt) || patt.test('' + beneficiary.updatedAt) ||
        patt.test('' + beneficiary.programvalidity) || patt.test(beneficiary.id.toString()) || patt.test(beneficiary.cardnumber)) {
        return beneficiary;
    }
    return;
    }
    onRowClicked(beneficiary) {
    this.router.navigate(['/home/beneficiaries/details', beneficiary]);
    }
    newAgent() {
    this.createNewAgent = true;
    }

    onFormExit(exit: boolean) {
    this.createNewAgent = !exit;
    }
    ngOnInit() {
        this.getBeneficiaries();
    }
}
