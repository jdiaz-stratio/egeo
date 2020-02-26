/*
 * © 2017 Stratio Big Data Inc., Sucursal en España. All rights reserved.
 *
 * This software – including all its source code – contains proprietary
 * information of Stratio Big Data Inc., Sucursal en España and
 * may not be revealed, sold, transferred, modified, distributed or
 * otherwise made available, licensed or sublicensed to third parties;
 * nor reverse engineered, disassembled or decompiled, without express
 * written authorization from Stratio Big Data Inc., Sucursal en España.
 */
import { Directive, ChangeDetectorRef, EventEmitter, ElementRef, Inject, OnInit, Output } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

@Directive({
   selector: '[stParentsScroll]'
})
export class StParentsScrollDirective implements OnInit {
   @Output('stParentsScroll')
   stParentsScroll$: EventEmitter<Event> = new EventEmitter();

   private readonly ready$: Subject<void> = new Subject<void>();
   private eventTargets: EventTarget[];
   private element: Element;
   private allScroll$: Observable<Event>;

   constructor(private _cd: ChangeDetectorRef,
      @Inject(ElementRef) { nativeElement }: ElementRef<Element>
   ) {
      this.element = nativeElement;
      this.eventTargets = [window, nativeElement];
   }

   ngOnInit(): void {

      while (this.element.parentElement) {
         this.element = this.element.parentElement;
         this.eventTargets.push(this.element);
      }
      this.allScroll$ = merge<Event>(
         ...this.eventTargets.map<Observable<Event>>(element => {
            return fromEvent(element, 'scroll');
         })
      );

      this.allScroll$.subscribe((scroll) => {
         this.stParentsScroll$.emit(scroll);
      });

      this.ready$.next(<any>this.allScroll$);


   }
}
