import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { StDocsService } from './st-docs.service';
import { StHorizontalTab } from '../st-horizontal-tabs/st-horizontal-tabs.model';
import { zip } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
   selector: 'st-docs',
   templateUrl: './st-docs.component.html',
   styleUrls: ['./st-docs.component.scss']
})
export class StDocsComponent implements OnInit {

   @Input() htmlFile?: string;
   @Input() tsFile?: string;
   @Input() componentFile?: string;

   public htmlCode: string;
   public demoTsCode: string;
   public componentTsCode: string;

   public statusShowCode: boolean = true;

   public options: StHorizontalTab[] = [
      {id: 'demo', text: 'Overview'},
      {id: 'html', text: 'Html'},
      {id: 'implementation', text: 'Implementation'},
      {id: 'component', text: 'Component'}
   ];

   public active: StHorizontalTab = this.options[0];

   constructor(private elemRef: ElementRef, private docsService: StDocsService) {}

   ngOnInit(): void {
      this.getFile(this.htmlFile).pipe(zip(this.getFile(this.tsFile), this.getFile(this.componentFile), (htmlCode, tsCode, componentCode) =>
      ({ htmlCode, tsCode, componentCode }))).subscribe((data) => {
         this.htmlCode = data.htmlCode;
         this.demoTsCode = data.tsCode;
         this.componentTsCode = data.componentCode;
      });
   }

   /* To copy Text from Textbox */
   copyCode(element: any): void {
      element.select();
      document.execCommand('copy');
      element.setSelectionRange(0, 0);
   }

   onChangeOption(event: Event): void {
      this.active = <any> event;
   }


   private getFile(file?: string): Observable<any> {
      return this.docsService.getFile(file);
   }

}
