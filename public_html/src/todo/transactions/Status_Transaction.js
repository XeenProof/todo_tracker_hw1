'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Text_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, newStatus) {
        super();
        this.model = initModel;
        this.newStatus = newStatus;
        this.item = item;
        this.oldStatus = item.getStatus();
    }

    doTransaction() {
        this.model.editStatus(this.item, this.newStatus);
    }

    undoTransaction() {
        this.model.editStatus(this.item, this.oldStatus);
    }
}