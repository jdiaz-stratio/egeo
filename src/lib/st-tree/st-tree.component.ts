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
   HostBinding,
   Input,
   Output,
   OnInit
} from '@angular/core';
import {
   cloneDeep as _cloneDeep,
   isEqual as _isEqual,
   map as _map
} from 'lodash';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StTreeEvent, StTreeNode } from './st-tree.model';

/**
 * @description {Component} [Tree]
 *
 * The tree is a component for representing information in a hierarchical way.
 * It allows navigating between the different nodes and visualizing the parent-child relationships between nodes.
 *
 * @model
 *
 *   [Node of tree] {./st-tree.model.ts#StTree}
 *   [Object emited on changes] {./st-tree.model.ts#StTreeEvent}
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-tree
 *    [tree]="treeA"
 *    (toogleNode)="onToogleNode($event)"
 *    (selectNode)="onSelectNode($event)">
 * </st-tree>
 * ```
 */
@StEgeo()
@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   selector: 'st-tree',
   styleUrls: ['./st-tree.component.scss'],
   templateUrl: './st-tree.component.html'
})
export class StTreeComponent implements OnInit {

   /** @Input {boolean} [collapseChildrenBranch=false] TRUE: Collapse all child nodes. FALSE: Only collapse the selected node */
   @Input() collapseChildrenBranch: boolean = false;
   /** @Input {StTree} [node] Current node (for recursion purpose) */
   @Input() node: StTreeNode;

   /** @Input {StTree} [^tree] Tree root node */
   @Input()
   set tree(tree: StTreeNode) {
      if (!_isEqual(tree, this._tree)) {
         this._tree = _cloneDeep(tree);
         this.node = _cloneDeep(tree);
         this._cd.markForCheck();
      }
   }
   get tree(): StTreeNode {
      return this._tree;
   }

   /** @Output {StTreeEvent} [selectNode] Notify any node selection */
   @Output() selectNode: EventEmitter<StTreeEvent> = new EventEmitter<StTreeEvent>();
   /** @Output {StTreeEvent} [toggleNode] Notify any node expansion or collapsed */
   @Output() toggleNode: EventEmitter<StTreeEvent> = new EventEmitter<StTreeEvent>();

   @HostBinding('class.sth-tree') classTtree: boolean = true;

   public hasChildrenValue: boolean = false;

   private _tree: StTreeNode;

   private _delay: number = 150;
   private _prevent: boolean = false;
   private _timer: any = 0;

   constructor(private _cd: ChangeDetectorRef, private _elementRef: ElementRef) {}

   ngOnInit(): void {
      this.hasChildrenValue = this.hasChildren();
   }
   hasChildren(): boolean {
      return this.node && this.node.children && this.node.children.length > 0;
   }

   idSuffix(suffix?: string): string {
      return this._elementRef.nativeElement.id ? this._elementRef.nativeElement.id + suffix : undefined;
   }

   onClick(event: MouseEvent, type: string): void {
      if (type === 'select') {
         this._timer = setTimeout(() => {
            if (!this._prevent) {
               this.select();
            }
            this._prevent = false;
         }, this._delay);
      } else if (type === 'toggle') {
         this.toggle();
      }
   }

   onDoubleClick(event: MouseEvent): void {
      clearTimeout(this._timer);
      this._prevent = true;
      this.toggle();
   }

   onSelectNode(event: StTreeEvent): void {
      if (this.tree) {
         this.removePropertyDeep(this.node, 'selected');
         event.node.selected = true;
         event.tree = this.node;
      }
      this.selectNode.emit(event);
   }

   onToggleNode(event: StTreeEvent): void {
      if (this.tree) {
         if (event.node.expanded) {
            if (this.collapseChildrenBranch) {
               this.removePropertyDeep(event.node, 'expanded');
            } else {
               delete event.node.expanded;
            }
         } else {
            event.node.expanded = true;
         }
         event.tree = this.node;
      }
      this.toggleNode.emit(event);
   }

   select(): void {
      if (!this.node.selected) {
         let event: StTreeEvent = {
            node: this.node,
            tree: null
         };
         this.onSelectNode(event);
      }
   }

   toggle(): void {
      let event: StTreeEvent = {
         node: this.node,
         tree: null
      };
      this.onToggleNode(event);
   }

   private removePropertyDeep(node: StTreeNode, property: string): StTreeNode {
      delete node[property];
      if (node.children) {
         node.children = _map(node.children, (n) => this.removePropertyDeep(n, property));
      }
      return node;
   }
}
