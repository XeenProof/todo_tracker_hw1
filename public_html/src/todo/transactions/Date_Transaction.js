'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Text_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, newText) {
        super();
        this.model = initModel;
        this.newDate = newText;
        this.item = item;
        this.oldDate = item.getDueDate();
    }

    doTransaction() {
        this.model.editDueDate(this.item, this.newDate);
    }

    undoTransaction() {
        this.model.editDueDate(this.item, this.oldDate);
    }
}