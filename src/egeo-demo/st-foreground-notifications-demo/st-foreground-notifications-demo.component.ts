/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { Component } from '@angular/core';

import { StNotificationElement} from '@stratio/egeo';

@Component({
   selector: 'st-foreground-notifications-demo',
   templateUrl: './st-foreground-notifications-demo.component.html',
   styleUrls: ['./st-foreground-notifications-demo.component.scss']
})
export class StForegroundNotificationsDemoComponent {
   items: any[] = [
      [{
         status: 'critical',
         visible: true,
         html: '<p>Stratio audit failed to connect to Postgres database.  <a part="some-box">Check the database</a> <a part="some-box">Check the database 2</a></p>',
         nameEvents: ['doCheckDatabase', 'doCheckDatabaseSecond']
      }],
      [{
         text: 'The server couldn’t be reached on port 8080, change it to another value.',
         status: 'warning',
         visible: true
      }],
      [{
         text: 'The connection has been sucessful.',
         status: 'success',
         visible: true
      }],
      [{
         text: 'The process is still running.',
         status: 'running',
         visible: true
      }],
      [{
         text: 'This is a neutral informational notification',
         status: '',
         visible: true
      }],
      [{
         text: 'This is a success error feedback notification with autoclose',
         status: 'success',
         visible: true,
         autoCloseTime: 3000
      }]
   ];

   multiLine: StNotificationElement[] = [
      {
         text: `The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why.
               This code is used when requests are being denied due to update limits . Other reasons for this status being returned are listed
               alongside the error codes in the table below.The request is understood, but it has been refused or access is not allowed.
               An accompanying error message will explain why. This code is used when requests are being denied due to update limits .
               Other reasons for this status being returned are listed alongside the error codes in the table below.
               The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why.
               This code is used when requests are being denied due to update limits . Other reasons for this status being returned are
               listed alongside the error codes in the table below.`,
         status: 'success',
         visible: true
      }];

   multiNotification: StNotificationElement[] = [
      {
         text: `The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why.
               This code is used when requests are being denied due to update limits . Other reasons for this status being returned are listed
               alongside the error codes in the table below.The request is understood, but it has been refused or access is not allowed.
               An accompanying error message will explain why. This code is used when requests are being denied due to update limits .
               Other reasons for this status being returned are listed alongside the error codes in the table below.
               The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why.
               This code is used when requests are being denied due to update limits . Other reasons for this status being returned are
               listed alongside the error codes in the table below.`,
         status: 'success',
         visible: true
      },
      {
         text: `Stratio audit failed to connect to Postgres database / second page.The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why.
         This code is used when requests are being denied due to update limits . Other reasons for this status being returned are listed
         alongside the error codes in the table below.The request is understood, but it has been refused or access is not allowed.
         An accompanying error message will explain why. This code is used when requests are being denied due to update limits .`,
         status: 'critical',
         visible: true
      },
      {
         text: 'Stratio audit failed to connect to Postgres database / third page',
         status: 'warning',
         visible: true
      },
      {
         text: 'Stratio audit failed to connect to Postgres database / fourth page',
         visible: true
      }
   ];

   public configDoc: any = {
      html: 'demo/st-foreground-notifications-demo/st-foreground-notifications-demo.component.html',
      ts: 'demo/st-foreground-notifications-demo/st-foreground-notifications-demo.component.ts',
      component: 'lib/st-foreground-notifications/st-foreground-notifications.ts'
   };

   public toggleNotifications(index: number): void {
      this.items[index].visible = !this.items[index].visible;
   }

   doCheckDatabase(): void {
      console.log('throwing check database from parent');
   }

   doCheckDatabaseSecond(): void {
      console.log('throwing check database second from parent');
   }

   onClickLinkTemplate(event: any): void {
      switch (event) {
         case 'doCheckDatabase' :
            this.doCheckDatabase();
            break;
         case 'doCheckDatabaseSecond' :
            this.doCheckDatabaseSecond();
            break;
         default:
            break;
      }
   }
}
