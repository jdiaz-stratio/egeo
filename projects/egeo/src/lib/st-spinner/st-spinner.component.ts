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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * @description {Component} Spinner
 *
 * This component shows a spinner when something is being loaded
 *
 * @example
 *
 * {html}
 *
 * ```
 *    <st-spinner theme="secondary">
 *    </st-spinner>
 * ```
 */
@Component({
   selector: 'st-spinner',
   templateUrl: './st-spinner.component.html',
   styleUrls: ['./st-spinner.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StSpinnerComponent {
   constructor() {}
}
