'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Move_Transaction extends jsTPS_Transaction {
    constructor(initModel, a, b) {
        super();
        this.model = initModel;
        this.a = a;
        this.b = b;
    }

    doTransaction() {
        this.model.swapItemByIndex(this.a,this.b);
    }

    undoTransaction() {
        this.model.swapItemByIndex(this.a,this.b);
    }
}