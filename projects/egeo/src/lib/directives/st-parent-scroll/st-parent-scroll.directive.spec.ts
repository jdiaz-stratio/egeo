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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Component
import { Component } from '@angular/core';
import { StParentsScrollDirective } from './st-parent-scroll.directive';

let component: TestParentScrollComponent;
let fixture: ComponentFixture<any>;
let compiled: any;

@Component({
   template: `<div class='parent' [ngStyle]="{'overflow-y': 'scroll', 'height': '1px'}">
                  <input st-parents-scroll (stParentsScroll)="onParentScroll()">
              </div>`
})
class TestParentScrollComponent {

   onParentScroll(event: Event): void {
      console.log('called');
   }
}

describe('StParentsScroll', () => {
   beforeEach(
      async(() => {
         TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestParentScrollComponent, StParentsScrollDirective]
         }).compileComponents();
      })
   );

   beforeEach(() => {
      fixture = TestBed.createComponent(TestParentScrollComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
   });

   it('Elements with this directive should listen parent scroll events', () => {
      spyOn(component, 'onParentScroll');
      const container = fixture.debugElement.query(By.css('.parent'));
      container.nativeElement.dispatchEvent(new CustomEvent('scroll'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
         expect(component.onParentScroll).toHaveBeenCalled();
      });
   });
});
