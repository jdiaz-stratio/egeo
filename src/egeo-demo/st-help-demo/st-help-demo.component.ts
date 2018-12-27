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

@Component({
   templateUrl: './st-help-demo.component.html',
   styleUrls: ['./st-help-demo.component.scss']
})
export class StHelpDemoComponent {
   public configDoc: any = {
      html: 'demo/st-help-demo/st-help-demo.component.html',
      ts: 'demo/st-help-demo/st-help-demo.component.ts',
      component: 'lib/st-help/st-help.component.ts'
   };

   text: string = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
   Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
   nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
   Nulla consequat massa quis enim.`;
}
