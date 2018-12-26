/* tslint:disable:no-unused-variable */
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { StDocsModule } from './st-docs.module';
import { StHorizontalTabsModule } from '../st-horizontal-tabs/st-horizontal-tabs.module';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

import { StDocsComponent } from './st-docs.component';

beforeAll(() => {
   TestBed.resetTestEnvironment();
   TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
 });


describe('StDocsComponent', () => {
  let component: StDocsComponent;
  let fixture: ComponentFixture<StDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StHorizontalTabsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StDocsComponent);
    component = fixture.componentInstance;
    component.htmlFile = 'demo/st-alert-demo/st-alerts-demo.html';
    component.componentFile = 'lib/st-alerts/st-alerts.component.ts';
    component.tsFile = 'demo/st-alert-demo/st-alerts-demo.ts';
    fixture.detectChanges();
  });


});
