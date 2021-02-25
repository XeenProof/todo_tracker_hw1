'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Text_Transaction extends jsTPS_Transaction {
    constructor(initModel, item, newText) {
        super();
        this.model = initModel;
        this.newText = newText;
        this.item = item;
        this.oldText = item.getDescription();
    }

    doTransaction() {
        this.model.editDescription(this.item, this.newText);
    }

    undoTransaction() {
        this.model.editDescription(this.item, this.oldText);
    }
}