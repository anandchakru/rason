import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewChecked, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.scss']
})
export class JsonViewComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {

  @Input() json: Array<any> | Object | any;
    @Input() expanded: boolean;
    items: Array<any> = [];
    @Input() parent:boolean;

    constructor() {
    }

    ngOnInit() {
        if (!_.isObject(this.json) && !_.isArray(this.json)) {
            return;
        }
        this.items = _.map(this.json, (v, k) => { return this.createItem(v, k); });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.items = _.map(this.json, (v, k) => { return this.createItem(v, k); });
    }
    ngAfterViewChecked(){

    }
    ngAfterViewInit(){
        if(this.parent){
            console.log('AfterViewInit');
        }
    }
    createItem(value: any, key: any) {
        const item: any = {
            key: (_.isUndefined(key) || _.isNull(key)) ? '""' : key,
            value: value,
            title: value,
            type: undefined,
            isOpened: this.expanded,
            isExpandable: false,
            valueClasses: {
                'item-title': true
            }
        };

        if (_.isString(item.value)) {
            item.type = 'string';
            item.title = `"${item.value}"`;
        } else if (_.isNumber(item.value)) {
            item.type = 'number';
        } else if (_.isBoolean(item.value)) {
            item.type = 'boolean';
        } else if (_.isDate(item.value)) {
            item.type = 'date';
        } else if (_.isArray(item.value)) {
            item.type = 'array';
            item.title = `[${item.value.length}]`;
            item.isExpandable = item.value.length !== 0;
        } else if (_.isFunction(item.value)) {
            item.type = 'function';
        } else if (_.isObject(item.value)) {
            item.type = 'object';

            if (_.keys(item.value).length > 0) {
                item.title = '{.}';
                item.isExpandable = true;
            } else {
                item.title = '{..}';
                item.isExpandable = false;
            }

        } else if (_.isNull(item.value)) {
            item.type = 'null';
        } else if (_.isUndefined(item.value)) {
            item.type = 'undefined';
        }

        item.valueClasses['obj-' + item.type] = true;

        return item;
    }

    toggleOpend(item: any) {
        if (item.isExpandable) {
            item.isOpened = !item.isOpened;
        }
    }

}
