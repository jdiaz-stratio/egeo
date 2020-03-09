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
import { Component, Input, TemplateRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { cloneDeep as _cloneDeep, get as _get } from 'lodash';

import { StTableHeader } from '../../shared/table-header.interface';

@Component({
   selector: 'st-popover-filter',
   templateUrl: './st-popover-filter.component.html',
   styleUrls: ['./st-popover-filter.component.scss']
})
export class StPopoverFilterComponent {

   /** @Input {StTableHeader} [field=''] field displayed in the header */
   @Input() field: StTableHeader;

   /** @Input {boolean} [field=''] field to show popover */
   @Input() hidden: boolean;

   /** @Input {number} [index=''] index of field displayed in the header */
   @Input() index: number;

   /** @Input {boolean} [filtered=''] Status filter by column, needed with templateContentFilter to change filtered icon */
   @Input() filtered: boolean;

   /** @Input {TemplateRef} [templateContentFilter=undefined] Reference to paint a custom template inside popover content */
   @Input() templateContentFilter?: TemplateRef<any>;

   /** @Output {} [filter=''] Event emitted  when user interacts with filter button without a custom template */
   @Output() filter: EventEmitter<any> = new EventEmitter();

   constructor(private _cd: ChangeDetectorRef) { }

   public checkFilterIcon(): void {
      this.filtered = this.field.filters.filterConfig.filter((conf) => conf.selected).length > 0;
      this._cd.markForCheck();
   }

   public getConfigField(field: StTableHeader, config: string): any {
      return _get(field, `filters.${config}`);
   }

   public getFilteredIcon(filtered: boolean): string {
      return (filtered) ? 'icon-facets-2' : 'icon-arrow4_down';
   }

   public onChangeFilter(indexFilter: number, event: Event): void {
      this.field.filters.filterConfig[indexFilter].selected = (<any>event).checked;
   }

   public onFilter(): void {
      this.filter.emit();
   }
}
