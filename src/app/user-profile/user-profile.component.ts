import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { readJsonConfigFile } from 'typescript';
export interface data {
  name: string;
  icon: string;
  value: number;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  constructor( private modalService: NgbModal,
    config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  userProfileName: string | undefined;
  accountName: string | undefined;
  btnLabel: string | undefined;
  headerModal: string | undefined;
  labelModal: string | undefined;
  dropdownIconSrc = './assets/tmp/arrow_down.svg';
  openOption = true;
  bankData:data[] = [
    {
      name: 'Bangkok Bank Public Co., Ltd.',
      icon: './assets/tmp/bbl.svg',
      value: 2
    },
    {
      name: 'Bank of Ayudhya Public Co., Ltd.',
      icon: './assets/tmp/bay.svg',
      value: 25
    },
    {
      name: 'KasikornBank Public Co., Ltd.',
      icon: './assets/tmp/kbank.svg',
      value: 4
    },
    {
      name: 'Krung Thai Bank Public Co., Ltd.',
      icon: './assets/tmp/ktb.svg',
      value: 6
    },
    {
      name: 'Siam Commercial Bank Public Co., Ltd.',
      icon: './assets/tmp/scb.svg',
      value: 14
    },
    {
      name: 'TMBThanachart Bank Public Co., Ltd.',
      icon: './assets/tmp/ttb.svg',
      value: 11
    }
  ];
  term: any;
  profileUrl: any;
  profileInvalid!: boolean;
  profileInvalidFormat!: boolean;
  profileInvalidSize!:boolean;
  sizeFile = 5*1024*1024;
  profileSelected: any;
  profilePrepareUpload!: boolean;
  invalidLabel: string | undefined;
  defaultDropdownSelected!: boolean;
  bankSelected!: data;
  confirmInvalid!: boolean;
  bankTextSelected: string| undefined;

  ngOnInit(): void {
    this.userProfileName = 'Mrcha';
    this.accountName = 'example@mail.com';
    //this.bankSelected = this.bankData[0].name;
    this.defaultDropdownSelected = true;
    this.profileInvalid = false;
    this.profileInvalidFormat = false;
    this.profileInvalidSize = false;
    this.profilePrepareUpload = false;
    
  }

  close(){
    console.log('close user profile')
    this.open(200)
  }

  confirm(){
    console.log('confirm');
    if(this.defaultDropdownSelected) {
      this.confirmInvalid = true;
      return;
    }
  }

  open(code: number) {
    this.headerModal = 'Discard';
    this.labelModal = 'Are you sure to discard data and return to “Login page” ?';
    this.btnLabel = 'Discard';
    this.modalService.open(this.content);
  }

  closeModal(){
    this.modalService.dismissAll();
  }
  discard(){
    this.modalService.dismissAll();
    console.log('discard');
  }

  openDropdown(open: boolean){
    if(this.confirmInvalid) {
      this.confirmInvalid = false;
    }
    if(open) {
      this.dropdownIconSrc = './assets/tmp/arrow_up.svg';
    }else {
      this.dropdownIconSrc = './assets/tmp/arrow_down.svg'
    }
    this.openOption = !this.openOption;
  }

  selectItem(item: data){
    setTimeout(() => { 
      console.log('select item '+ JSON.stringify(item));
      this.bankTextSelected = '';
      this.bankTextSelected = item.name;
      this.bankSelected = item;
      console.log('--> '+JSON.stringify(this.bankSelected));
      if(this.defaultDropdownSelected) {
        this.defaultDropdownSelected = false;
      }
      this.openDropdown(this.openOption);
    }, 500);
    this.confirmInvalid = false;

  }

  searchFilter(){
    console.log('search filter');
  }

  onProfileChanged(event: any){
    console.log(event);
    this.profileInvalid = false;
    this.profileInvalidFormat = false;
    this.profileInvalidSize = false;
    if (event.target.files.length > 0 && event.target.files[0]){
      if (event.target.files[0].size > this.sizeFile) {
        console.log('file large size 5mb');
        this.profileInvalid = true;
        this.profileInvalidSize = true;
        this.invalidLabel = 'Upload fail, the support maximum file 5mb.';
      }else
      if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png'){
        console.log('file format is invalid');
        this.profileInvalid = true;
        this.profileInvalidFormat = true;
        this.invalidLabel = 'Upload fail, the support file PNG and JPG.';
      }
      

      const file = event.target.files[0];
      this.profileSelected = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profileUrl = reader.result;
        this.profilePrepareUpload = true;
      }
    }
    
  }

}
