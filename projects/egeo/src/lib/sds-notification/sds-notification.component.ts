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
import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   HostListener,
   Input,
   OnChanges,
   OnInit,
   Output,
   Renderer2,
   SimpleChanges,
   ViewChild
} from '@angular/core';
import {
   SdsNotificationDisplayOptions,
   SdsNotificationIcon,
   SdsNotificationPosition,
   SdsNotificationTriggerOptions,
   SdsNotificationType
} from './sds-notification.model';
import {Subject} from 'rxjs';
import {SdsNotificationService} from './sds-notification.service';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SdsAlertType} from '../sds-alert/sds-alert.model';

@Component({
   selector: 'sds-notification',
   templateUrl: 'sds-notification.component.html',
   styleUrls: ['sds-notification.scss'],
   animations: [
      trigger('notificationFade', [
         state('*', style({opacity: 1})),
         state('void', style({opacity: 0})),
         transition(':enter', [
            style({opacity: 0}),
            animate(400, style({opacity: 1}))
         ]),
         transition(':leave', [
            style({opacity: 1}),
            animate(400, style({opacity: 0}))
         ])
      ])
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * @description {Component} [Foreground notifications]
 *
 * Foreground notifications are made to let the user know info about a process she is performing in real time.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <sds-notification [config]="config" [hotRender]="false"></sds-notification>
 *
 * ```
 */


export class SdsNotificationComponent implements OnInit, OnChanges {

   /** @Input {isDisabled} [isDisabled=false'] If true, disables positioning and animation */
   @Input() isDisabled: boolean;

   /** @Input {hotRender} [hotRender=false'] If true, enables hot render */
   @Input() hotRender: boolean;

   /** @Input {config} [config={}'] Notification's config */
   @Input() config: SdsNotificationDisplayOptions;

   /** @output {autoClose} [EventEmitter] Event emitted when user clicks on close icon */
   @Output() autoClose: EventEmitter<void> = new EventEmitter();

   /** @output {close} [EventEmitter] Event emitted when notification was closed by timeout */
   @Output() close: EventEmitter<void> = new EventEmitter();

   @ViewChild('sdsNotification', {static: false}) stNotification: ElementRef;

   public showNotification: boolean;
   public message: string;
   public closeIcon: boolean;
   public notificationType: SdsNotificationType;
   public notificationIcon: SdsNotificationIcon | string;
   public position: SdsNotificationPosition;
   public positionReference: string;
   public notificationTimeout: number;
   public multipleTimeout: number;
   public margin: number;
   public maxWidth: string;
   public stNotificationType: typeof SdsNotificationType;
   public stNotificationIcon: typeof SdsNotificationIcon;

   private isMultiple: boolean;
   private visibilityTimeout: number;
   private componentDestroyed$: Subject<void>;

   @HostListener('mouseover')
   public onMouseOver(): void {
      if (this.visibilityTimeout) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
      }
   }

   @HostListener('mouseout')
   public onMouseOut(): void {
      if (!this.isDisabled) {
         const timeout = this.getTimeoutToApply(this.isMultiple);
         if (timeout) {
            this.setNotificationsTimeout(timeout);
         }
      }
   }

   constructor(
      private cd: ChangeDetectorRef,
      private elemRef: ElementRef,
      private renderer: Renderer2,
      private _notifications: SdsNotificationService
   ) {
      this.stNotificationIcon = SdsNotificationIcon;
      this.stNotificationType = SdsNotificationType;
      this.config = {};
      this.showNotification = false;
      this.hotRender = false;
      this.isDisabled = false;
      this.componentDestroyed$ = new Subject();
   }

   public ngOnInit(): void {
      this.processConfiguration();
      if (this.isDisabled) {
         this.showNotification = true;
         this.cd.detectChanges();
      } else {
         this.initTriggerSubscription();
         this.initCancelTimeoutSubscription();
      }
   }

   public ngOnChanges(changes: SimpleChanges): void {
      if (this.hotRender && changes && changes.config && changes.config.currentValue) {
         this.processConfiguration(changes.config.currentValue);
      }
   }

   public onCloseClick(): void {
      if (!this.isDisabled) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
         this.removeNotification(this.close);
      } else {
         this.close.emit();
      }


   }

   private removeNotification(emitter: EventEmitter<void>): void {
      this.showNotification = false;
      this.cd.detectChanges();

      if (this.visibilityTimeout) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
      }

      // This timeout is needed because we must wait until notification dissapear.
      setTimeout(() => {
         this._notifications.removeNotification();
         emitter.emit();
      }, 400);
   }

   private initTriggerSubscription(): void {
      this._notifications.trigger$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(this.triggerNotification.bind(this));
   }

   private initCancelTimeoutSubscription(): void {
      this._notifications.cancelTimeout$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            this.isMultiple = true;

            const timeout = this.getTimeoutToApply(this.isMultiple);
            clearTimeout(this.visibilityTimeout);
            this.visibilityTimeout = null;

            if (timeout) {
               this.setNotificationsTimeout(timeout);
            }
         });
   }

   private triggerNotification(triggerOptions: SdsNotificationTriggerOptions): void {
      const {notificationOptions, isMultiple} = triggerOptions;
      this.isMultiple = isMultiple;
      this.showNotification = true;
      this.cd.detectChanges();

      if (!!notificationOptions) {
         this.processConfiguration(notificationOptions);
      }

      const timeoutToApply = this.getTimeoutToApply(this.isMultiple);
      if (timeoutToApply) {
         this.setNotificationsTimeout(timeoutToApply);
      }
   }

   private setNotificationsTimeout(timeout: number): void {
      this.visibilityTimeout = <any>setTimeout(() => {
         this.removeNotification(this.autoClose);
      }, timeout);
   }

   private setNotificationPosition(): void {
      const notificationClientRect = this.stNotification.nativeElement.getBoundingClientRect();
      const referenceElement = document.querySelector(this.positionReference);
      const referenceClientRect = (referenceElement as Element).getBoundingClientRect();
      const [verticalPosition, horizontalPosition] = this.position.split('_');
      let resizedHeight = false;
      let resizedWidth = false;

      if (notificationClientRect.height >= referenceClientRect.height) {
         const width = referenceClientRect.height - (this.margin * 2);
         this.renderer.setStyle(this.stNotification.nativeElement, 'height', width + 'px');
         resizedHeight = true;
      }

      if (notificationClientRect.width >= referenceClientRect.width) {
         const width = referenceClientRect.width - (this.margin * 2);
         this.renderer.setStyle(this.stNotification.nativeElement, 'width', width + 'px');
         resizedWidth = true;
      }

      const topValue = this.getTopValue(verticalPosition, referenceClientRect, resizedHeight);
      const leftValue = this.getLeftValue(horizontalPosition, referenceClientRect, resizedWidth);
      this.renderer.setStyle(this.stNotification.nativeElement, 'top', topValue + 'px');
      this.renderer.setStyle(this.stNotification.nativeElement, 'left', leftValue + 'px');
   }

   private getTopValue(position: string, referenceClientRect: ClientRect, resized: boolean): number {
      const stNotification = this.stNotification.nativeElement;
      const stNotificationClientRect = stNotification.getBoundingClientRect() as ClientRect;
      const height = referenceClientRect.height > window.innerHeight ? window.innerHeight : referenceClientRect.height;
      let topValue = 0;

      if (position === 'top') {
         topValue = referenceClientRect.top + this.margin;
      } else if (position === 'bottom') {
         topValue = referenceClientRect.bottom - stNotificationClientRect.height - this.margin;
      } else if (position === 'center') {
         topValue = referenceClientRect.top + (height / 2) - (stNotificationClientRect.height / 2);

         if (!resized) {
            topValue += this.margin;
         }
      }

      return topValue;
   }

   private getLeftValue(position: string, referenceClientRect: ClientRect, resized: boolean): number {
      const stNotification = this.stNotification.nativeElement;
      const stNotificationClientRect = stNotification.getBoundingClientRect() as ClientRect;
      const windowWidth = window.innerWidth - (this.margin * 2);
      const width = referenceClientRect.width > window.innerWidth ? windowWidth : referenceClientRect.width;
      let leftValue = 0;

      if (position === 'left') {
         leftValue = referenceClientRect.left + this.margin;
      } else if (position === 'right') {
         leftValue = referenceClientRect.right - stNotificationClientRect.width - this.margin;
      } else if (position === 'center') {
         leftValue = referenceClientRect.left + (width / 2) - (stNotificationClientRect.width / 2);

         if (!resized) {
            leftValue += this.margin;
         }
      }

      return leftValue;
   }

   private processConfiguration(config: SdsNotificationDisplayOptions = this.config): void {
      const defaultConfig = this._notifications.DEFAULT_CONFIG;

      this.message = config?.message ? config.message : defaultConfig.message;
      this.notificationType = config?.notificationType ? config.notificationType : defaultConfig.notificationType;
      this.notificationIcon = config?.notificationIcon ? config.notificationIcon : defaultConfig.notificationIcon;
      this.closeIcon = !!config?.closeIcon;
      this.position = config?.position ? config.position : defaultConfig.position;
      this.positionReference = config?.positionReference ? config.positionReference : defaultConfig.positionReference;
      this.margin = config?.margin ? config.margin : defaultConfig.margin;
      this.maxWidth = config?.maxWidth ? config.maxWidth : defaultConfig.maxWidth;

      this.notificationTimeout = config?.timeout ? config.timeout : defaultConfig.timeout;
      this.multipleTimeout = config?.multipleTimeout ? config.multipleTimeout : 0;

      const auxMap = {
         [SdsNotificationType.INFO]: config?.infoTimeout ? config.infoTimeout : this.notificationTimeout,
         [SdsNotificationType.SUCCESS]: config?.successTimeout ? config.successTimeout : this.notificationTimeout,
         [SdsNotificationType.WARNING]: config?.warningTimeout ? config.warningTimeout : this.notificationTimeout,
         [SdsNotificationType.CRITICAL]: config?.criticalTimeout ? config.criticalTimeout : 0
      };
      this.notificationTimeout = auxMap[this.notificationType];

      this.cd.detectChanges();

      if (!this.isDisabled && this.stNotification) {
         this.renderer.setStyle(this.stNotification.nativeElement, 'max-width', this.maxWidth);
         this.renderer.removeStyle(this.stNotification.nativeElement, 'width');
         this.setNotificationPosition();
      }
   }

   private getTimeoutToApply(isMultiple: boolean): number {
      const timeout: number = isMultiple ? this.multipleTimeout : this.notificationTimeout;
      if (!timeout) {
         this.closeIcon = true;
      }

      return timeout;
   }
}

