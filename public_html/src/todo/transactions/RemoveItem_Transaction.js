'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemToRemove, index) {
        super();
        this.model = initModel;
        this.itemToRemove = itemToRemove;
        this.index = index;
        
    }

    doTransaction() {
        // MAKE A NEW ITEM
        //this.itemAdded = this.model.addNewItem();
        this.model.removeItem(this.itemToRemove);
    }

    undoTransaction() {
        //this.itemAdded = this.model.addNewItem();
        this.model.addReturningItem(this.itemToRemove, this.index);
        //this.model.removeItem(this.itemAdded.id);
    }
}