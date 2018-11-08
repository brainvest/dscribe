import { MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'dscribe-host-app-instance-management',
  templateUrl: './app-instance-management.component.html',
  styleUrls: ['./app-instance-management.component.css']
})
export class AppInstanceManagementComponent implements OnInit {

  displayedAppInstanceColumns = ['name', 'usage', 'singular', 'plural', 'code', 'displayName'];
  @ViewChild('entitiyTypesPaginator') AppInstancePaginator: MatPaginator;

  constructor() { }

  ngOnInit() { }

  getAppInstances() {

  }
}
