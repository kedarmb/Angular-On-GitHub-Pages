import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
// import { FileUploader } from 'ng2-file-upload'

import { ActivatedRoute, Router } from '@angular/router';

import * as uuid from 'uuid';
import { DndDropEvent } from 'ngx-drag-drop';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, AfterViewInit {

    pdfSrc: any;
    start = 0;
    end = 0;
    matrix = [];
    scale = [];
    tables = [];
    noOfColumns = 0;
    tableObject: any;
    tableResult = [];
    show = false;
    pdfPages = 0;
    loading = false;
    sections = [];
    headers = [];

    @ViewChild(ContextMenuComponent, { static: false }) public basicMenu: ContextMenuComponent;
    public previewSrc: string = null;

    constructor(private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router,
        private ngZone: NgZone) { }

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        const containers = document.getElementsByClassName('nav-item');
        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];
            container.addEventListener('dragover', this.dragover)
            container.addEventListener('dragenter', this.dragenter)
            container.addEventListener('drop', this.drop)
        }
    }

    public setPreviewFromFile(files: FileList) {
        this.loading = true;
        const reader = new FileReader();
        this.start = 0;
        this.end = 0;
        this.matrix = [];
        this.scale = [];
        this.tables = [];
        this.noOfColumns = 0;
        this.tableObject = {};

        reader.onloadend = (e: any) => {
            this.pdfSrc = e.target.result;
        };

        reader.readAsArrayBuffer(files.item(0));
    }

    afterLoadComplete($event) {
        this.pdfPages = $event._pdfInfo.numPages;



    }
    textLayerRendered($event) {

        this.parseHTML($event.source);
        if ($event.pageNumber === this.pdfPages) {
            this.createTables();
        }

    }

    save() {
        const uid = uuid.v4();

    }

    cancel() {
        this.router.navigateByUrl('/tender');
    }

    dragover(e) {

        e.preventDefault();
    }
    dragenter(e) {

        e.preventDefault();
    }

    drop = (e) => {

        this.ngZone.run(() => {
            const id = e.dataTransfer.getData('text')
            const value = e.dataTransfer.getData('value');
            document.getElementById(id).remove();
        })
    }

    dragstart(e) {
        e.dataTransfer.setData('text', e.target.id);
        e.dataTransfer.setData('value', e.target.innerHTML);


    }


    parseHTML(source) {


        var lastLeft = -1;
        var lastTop = -1;
        var obj = {};
        source.textDivs.forEach((elem) => {
            var left = parseInt(this.getPropertyValue('left', $(elem).attr('style')));
            var top = parseInt(this.getPropertyValue('top', $(elem).attr('style')));
            var height = parseInt($(elem).innerHeight() + '');
            var width = parseInt($(elem).innerWidth() + '');
            var text = $(elem).text();
            if (left === lastLeft) {
                obj[lastTop].push({ left: left, top: top, text: text, height: height, width: width, right: left + width });
                lastLeft = left;
            } else {

                if (left == 0 && top == 0 && height === 0 && width == 0) {

                } else {
                    if (!obj[top])
                        obj[top] = [];
                    obj[top].push({ left: left, top: top, text: text, height: height, width: width, right: left + width });
                    lastLeft = left;
                    lastTop = top;
                }

            }

        })


        for (var i in obj) {
            var object = {};
            for (var j in obj[i]) {
                if (!object[obj[i][j].left]) {
                    object[obj[i][j].left] = obj[i][j];
                } else {
                    if (object[obj[i][j].left].width < obj[i][j].width)
                        object[obj[i][j].left].width = obj[i][j].width;
                    object[obj[i][j].left].text += obj[i][j].text;
                    object[obj[i][j].left].height += obj[i][j].height;
                }
            }
            obj[i] = this.mergeColumns(Object.keys(object).map(key => object[key]));
        }

        for (var i in obj) {
            this.matrix.push(obj[i]);
        }




    }

    populateTables() {

        for (var i = 0; i < this.tables.length; i++) {
            var table = this.tables[i];
            this.tableObject[i] = [];
            this.sections[i] = '';
            this.headers[i] = [];
            for (var k = 0; k < table.scale.length; k++) {
                this.headers[i].push('');
            }
            for (var j = table.start; j <= table.end; j++) {
                this.tableObject[i].push(this.copyRow(table.scale, this.matrix[j]));
            }
        }
        this.tableResult = Object.keys(this.tableObject).map(key => this.tableObject[key]);
        this.show = true;
        this.loading = false;

    }
    copyRow(scale, row) {

        var newRow = [];
        var left = [];
        var right = [];
        var text = [];
        for (var i = 0; i < scale.length; i++) {
            left.push(scale[i].left);
            right.push(scale[i].left + scale[i].width);
            text.push('');
        }
        for (var i = 0; i < row.length; i++) {
            var isFound = false;
            for (var j = 0; j < left.length; j++) {
                if (row[i].left < left[j]) {
                    var isFound = true;
                    break;
                }
            }
            text[j - 1] = row[i].text;
        }
        /*for(var i=0;i<scale.length;i++){
            var isBreak=false;
            for(var j=0;j<row.length;j++){
                if(row[j].left >= scale[i].left && row[j].left+row[j].width<=scale[i].left+scale[i].width){
                    newRow.push(row[j].text);
                    isBreak=true;
                    break;
                }
            }
            if(!isBreak){
                newRow.push('');
            }
        }*/

        return text;
    }



    getPropertyValue(name, string) {
        var object = {}
        if (string) {
            string = string.split(";");

            for (var i = 0; i < string.length; i++) {
                var temp = string[i].split(":");
                if (temp[1] !== undefined) {
                    let value = temp[1].trim();
                    let key = temp[0].trim();
                    if (key === 'left' || key === 'top' || key === 'height' || key === 'width') {
                        value = parseFloat(value.substring(0, value.length - 2));
                    }
                    object[key] = value;
                }

            }

            return object[name];
        } else {
            return 0;
        }

    }


    placedElement(array, element) {
        var isLargerfound = false;
        for (var i = 0; i < array.length; i++) {
            var elem = array[i];
            if (elem.left > element.left) {
                isLargerfound = true;
                break;
            }
        }

        if (isLargerfound) {
            if (i == 0 && element.left + element.width <= array[i].left) {
                console.log('case0');
                array.splice(i, 0, element);
                return true;
            } else if (i == 0 && element.left + element.width > array[i].left) {
                return false;
            }
            else if (element.left >= array[i - 1].left
                && element.left <= array[i - 1].left + array[i - 1].width
                && element.left + element.width >= array[i - 1].left
                && element.left + element.width <= array[i - 1].left + array[i - 1].width
            ) {
                console.log('case1');
                return true;
            } else if (element.left >= array[i - 1].left + array[i - 1].width
                && element.left <= array[i].left
                && element.left + element.width >= array[i - 1].left + array[i - 1].width
                && element.left + element.width <= array[i].left
            ) {
                console.log('case2');
                array.splice(i, 0, element);
                return true;
            }
            else if (element.left >= array[i - 1].left
                && element.left <= array[i - 1].left + array[i - 1].width
                && element.left + element.width >= array[i - 1].left + array[i - 1].width
                && element.left + element.width <= array[i].left
            ) {
                array[i - 1].width = element.left + element.width;
                console.log('case 3');
                return true;
            } else if (element.left >= array[i - 1].left + array[i - 1].width
                && element.left <= array[i].left
                && element.left + element.width >= array[i].left
                && element.left + element.width <= array[i].left + array[i].width
            ) {
                console.log('case 4');
                array[i].width = array[i].left + array[i].width - element.left;
                array[i].left = element.left;


                return true;
            } else if (element.left >= array[i - 1].left + array[i - 1].width
                && element.left <= array[i].left
                && element.left + element.width > array[i].left + array[i].width
            ) {
                if (array[i + 1] && element.left + element.width <= array[i + 1].left) {
                    console.log('case 5.1');
                    array[i].left = element.left;
                    array[i].width = element.width;
                    return true;
                } else if (array[i + 1] && element.left + element.width > array[i + 1].left) {
                    console.log('case 5.2');
                    return false;
                }
                else {
                    console.log('case 5.3');
                    array[i].width = element.width;
                    array[i].left = element.left;
                    return true;
                }


                return true;
            } else {
                console.log('case 7');
                return false;
            }
        } else {
            if (!array[i - 1]) {
                array.push(element);
                return true;
            }
            else if (array[i - 1].left <= element.left && element.left < array[i - 1].left + array[i - 1].width) {
                if (array[i - 1].width + array[i - 1].left >= element.left + element.width) {
                    return true;
                } else {
                    element.width = element.left - array[i - 1].left + element.width;
                    element.left = array[i - 1].left;
                    array.splice(i - 1, 1, element);
                    return true;
                }
            }
            else if (array[i - 1].left + array[i - 1].width <= element.left) {
                array.splice(i, 0, element);
                return true;
            } else {

                return false;
            }

        }
    }

    updateScale(row) {
        var isPlaced = true;
        if (this.scale.length < row.length) {
            return false;
        }
        var array = JSON.parse(JSON.stringify(this.scale));
        for (var i = 0; i < row.length; i++) {
            var isPlaced = this.placedElement(array, row[i]);
            if (!isPlaced) {
                break;
            }
        }
        if (!isPlaced) {
            return false;
        } else {
            this.scale = array;
            return true;
        }
    }

    initializeScale(row) {
        this.scale = row;
    }

    createTables() {
        for (var i = 0; i < this.matrix.length; i++) {
            var isScaleUpdated = this.updateScale(this.matrix[i]);
            if (isScaleUpdated) {
                this.end = i;
            } else {
                this.tables.push({ start: this.start, end: this.end, scale: JSON.parse(JSON.stringify(this.scale)) });
                this.initializeScale(this.matrix[i]);
                this.start = i;
                this.end = i;
            }
        }
        this.tables.push({ start: this.start, end: this.end, scale: JSON.parse(JSON.stringify(this.scale)) });
        this.populateTables();
    }


    mergeColumns(row) {

        var element = row[0];
        var newRow = [];

        for (var i = 1; i < row.length; i++) {
            var newElement = row[i];
            if (element.right + 5 >= newElement.left) {
                element = {
                    left: element.left, width: element.width + newElement.width,
                    top: element.top,
                    text: element.text + newElement.text,
                    right: element.right + newElement.width
                };

            } else {
                newRow.push(JSON.parse(JSON.stringify(element)));
                element = newElement;
            }
        }
        newRow.push(element);
        console.log('************', newRow);
        return newRow;
    }





    draggable = {
        // note that data is handled with JSON.stringify/JSON.parse
        // only set simple data or POJO's as methods will be lost
        data: { table: -1, row: -1, column: -1 },
        effectAllowed: "all",
        disable: false,
        handle: false
    };

    onDragStart(event: DragEvent, table, row, column) {
        this.draggable.data = { table: table, row: row, column: column };
        console.log("drag started", JSON.stringify(event, null, 2));
    }

    onDragEnd(event: DragEvent, table, row, column) {


        console.log("drag ended", JSON.stringify(event, null, 2), table, row, column);
    }

    onDraggableCopied(event: DragEvent) {

        console.log("draggable copied", JSON.stringify(event, null, 2));
    }

    onDraggableLinked(event: DragEvent) {

        console.log("draggable linked", JSON.stringify(event, null, 2));
    }

    onDraggableMoved(event: DragEvent) {

        console.log("draggable moved", JSON.stringify(event, null, 2));
    }

    onDragCanceled(event: DragEvent) {

        console.log("drag cancelled", JSON.stringify(event, null, 2));
    }

    onDragover(event: DragEvent) {

        console.log("dragover", JSON.stringify(event, null, 2));
    }

    onDrop(event: DndDropEvent, table, row, column) {
        this.tableResult[table][row][column] = this.tableResult[this.draggable.data.table][this.draggable.data.row][this.draggable.data.column];
        console.log("dropped", JSON.stringify(event, null, 2), table, row, column);
    }
    showMessage(message: any) {
        console.log(message);
    }

    deleteTable($event) {
        this.tableResult.splice($event.item.table, 1);
    }
    deleteRow($event) {
        this.tableResult[$event.item.table].splice($event.item.row, 1);
    }

    insertRowBefore($event) {
        var table = this.tableResult[$event.item.table];
        if (table.length > 0) {
            var firstRow = table[0];
            var newRow = [];
            for (var i = 0; i < firstRow.length; i++) {
                newRow.push('');
            }
            table.splice($event.item.row, 0, newRow);
        }

    }

    insertRowAfter($event) {
        var table = this.tableResult[$event.item.table];
        if (table.length > 0) {
            var firstRow = table[0];
            var newRow = [];
            for (var i = 0; i < firstRow.length; i++) {
                newRow.push('');
            }
            table.splice($event.item.row + 1, 0, newRow);
        }

    }
    deleteColumn($event) {
        var table = this.tableResult[$event.item.table];
        for (var i = 0; i < table.length; i++) {
            table[i].splice($event.item.column, 1);
        }
    }
    addColumnBefore($event) {
        var table = this.tableResult[$event.item.table];
        for (var i = 0; i < table.length; i++) {
            table[i].splice($event.item.column, 0, '');
        }
    }
    addColumnAfter($event) {
        var table = this.tableResult[$event.item.table];
        for (var i = 0; i < table.length; i++) {
            table[i].splice($event.item.column + 1, 0, '');
        }
    }

    saveTable(event, tableIndex) {

        event.preventDefault();
        var section = this.sections[tableIndex];
        var headers = this.headers[tableIndex];
        var table = this.tableResult[tableIndex];
        var lineItems = [];
        for (var i = 0; i < table.length; i++) {
            var obj = {};
            for (var j = 0; j < headers.length; j++) {
                if (headers[j] !== '')
                    obj[headers[j]] = table[i][j];
            }
            lineItems.push(obj);
        }

        var sectionObj = { name: section, line_items: lineItems };
        console.log('******saveTable********', sectionObj);


    }
    changeContentEditable(table, row, column, content) {
        this.tableResult[table][row][column] = content;
    }

    showTable(table) {

        if (table[0]) {
            if (table[0].length > 2) {
                return true;
            }

        }
        return false;
    }

    fillTable(event, table) {
        event.preventDefault();
        var row = table[0];

        for (var i = 1; i < table.length; i++) {

            for (var j = 0; j < table[i].length; j++) {

                if (table[i][j] === '') {
                    table[i][j] = row[j];
                }
            }
            row = table[i];
        }
    }

    delete(event, table) {
        event.preventDefault();
        this.tableResult.splice(table, 1);
    }

    handleChange(text, table, row, column) {
        this.tableResult[table][row][column] = text;
    }
    toggle() {
        this.show = !this.show;
    }
    setHeader(event, key, table, column) {
        event.preventDefault();
        this.headers[table][column] = key;
    }
}
