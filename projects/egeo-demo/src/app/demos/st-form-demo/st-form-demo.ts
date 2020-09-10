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
import { StToggleButton } from '@stratio/egeo';

@Component({
   selector: 'st-form-demo',
   templateUrl: 'st-form-demo.html',
   styleUrls: ['./st-form-demo.component.scss']
})
export class StFormDemoComponent {
   public activeOption: StToggleButton;
   public configDoc: any = {
      html: 'demo/st-form-demo/st-form-demo.html',
      ts: 'demo/st-form-demo/st-form-demo.ts',
      component: 'lib/st-form/st-form.component.ts'
   };

   public options: StToggleButton[] =
      [
         {
            id: 'demo',
            label: 'Demo',
            active: true
         },
         {
            id: 'cssProperties',
            label: 'Theme Customization'
         },
         {
            id: 'visualSectionImprovements',
            label: 'Visual Section improvements'
         },
         {
            id: 'visualFieldImprovements',
            label: 'Visual Field improvements'
         }];


   constructor() {
      this.activeOption = this.options[0];
   }

   public onChangeOption(selectedOption: StToggleButton): void {
      this.activeOption = selectedOption;
   }
}
