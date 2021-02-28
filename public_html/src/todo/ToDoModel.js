'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import RemoveItem_Transaction from './transactions/RemoveItem_Transaction.js'
import Move_Transaction from './transactions/Move_Transaction.js'
import Text_Transaction from './transactions/Text_Transaction.js'
import Date_Transaction from './transactions/Date_Transaction.js'
import Status_Transaction from './transactions/Status_Transaction.js'

/**
 * ToDoModel //data in the back ground
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
        this.buttonCheck();
    }

    /**
     * Creates a new transaction for removing an item and adds it to the transaction stack.
     * @param {*} itemToRemove 
     */
    removeItemTransaction(itemToRemove){
        //console.log(this.currentList.getIndexOfItem(itemToRemove));
        let transaction = new RemoveItem_Transaction(this, itemToRemove, this.currentList.getIndexOfItem(itemToRemove));
        this.tps.addTransaction(transaction);
        this.buttonCheck();
    }

    /**
     * Creates a new transaction for moving an item up and adds it to the transaction stack.
     * @param {*} item item to move up
     */
    upTransaction(item){
        if(this.currentList.getIndexOfItem(item)-1 < 0){
            return;
        }
        let transaction = new Move_Transaction(this, this.currentList.getIndexOfItem(item), this.currentList.getIndexOfItem(item)-1);
        this.tps.addTransaction(transaction);
        this.buttonCheck();
    }

    /**
     * Creates a new transaction for moving an item down and adds it to the transaction stack.
     * @param {*} item 
     */
    downTransaction(item){
        if(this.currentList.getIndexOfItem(item)+1 >= this.currentList.length()){
            return;
        }
        let transaction = new Move_Transaction(this, this.currentList.getIndexOfItem(item), this.currentList.getIndexOfItem(item)+1);
        this.tps.addTransaction(transaction);
        this.buttonCheck();
    }

    /**
     * Creates a new transaction for editing the descrption of an item and adds it to the transaction stack.
     * @param {*} item 
     * @param {*} newText 
     */
    editDescriptionTransaction(item, newText){
        let transaction = new Text_Transaction(this, item, newText);
        this.tps.addTransaction(transaction);
        this.buttonCheck();
    }

    /**
     * Creates a new transaction for editing the due date of an item and adds it to the transaction stack.
     * @param {*} item 
     * @param {*} newDate 
     */
    editDateTransaction(item, newDate){
        let transaction = new Date_Transaction(this, item, newDate);
        this.tps.addTransaction(transaction);
        this.buttonCheck();
    }

    /**
     * Creates a new transaction for editing the status of an item and adds it to the transaction stack.
     * @param {*} item 
     * @param {*} newStatus 
     */
    editStatusTransaction(item, newStatus){
        let transaction = new Status_Transaction(this, item, newStatus);
        this.tps.addTransaction(transaction);
        this.buttonCheck();
    }

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.refreshLists(this.toDoLists);
        this.buttonCheck();
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    /**
     * #student made
     * This function adds a previously deleted item to it's original index.
     * 
     * @param {*} item The returning item
     * @param {*} index the index to return to
     */
    addReturningItem(item, index){
        this.currentList.returnItem(item, index);
        this.view.viewList(this.currentList);
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     * DO-THIS:
     * Empty Transaction Stack - completed
     */
    loadList(listId) {
        //finds list
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        //loads this list
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.setCurrentList(listToLoad);
            //this.currentList = listToLoad;//change to set current list
            this.view.viewList(this.currentList);
            this.view.refreshLists(this.toDoLists);
            //set currentlist 
        }
        this.tps.clearAllTransactions();
        this.buttonCheck();
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
        this.buttonCheck();
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
        this.buttonCheck();
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * switches 2 items on the current list
     * @param {*} a 
     * @param {*} b 
     */
    swapItemByIndex(a, b){
        this.currentList.swapItemAtIndex(a,b);
        this.view.viewList(this.currentList);
    }

    /**
     * Sets the current list variable and 
     * @param {*} list 
     */
    setCurrentList(list){
        this.currentList = list;
        var index = this.toDoLists.indexOf(this.currentList);
        if(index > -1){
            this.toDoLists.splice(index, 1);
            this.toDoLists.unshift(this.currentList);
        }
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
        this.buttonCheck();
    } 

    /**
     * edits the Description of the item
     * @param {*} item 
     * @param {*} newText 
     */
    editDescription(item, newText){
        item.setDescription(newText);
        this.view.viewList(this.currentList);
    }

    /**
     * edits the due date of the item
     * @param {*} item 
     * @param {*} newDate 
     */
    editDueDate(item, newDate){
        item.setDueDate(newDate);
        this.view.viewList(this.currentList);
    }

    /**
     * edits the status of the item
     * @param {*} item 
     * @param {*} newStatus 
     */
    editStatus(item, newStatus){
        item.setStatus(newStatus);
        this.view.viewList(this.currentList);
    }

    /**
     * When X is clicked
     */
    closeList(){
        this.view.clearItemsList();//
        this.tps.clearAllTransactions();//temp
        this.currentList = null;
        this.view.refreshLists(this.toDoLists);
        this.buttonCheck();
    }

    /**
     * checks which button should be visible and which should not
     */
    buttonCheck(){
        this.visibility(document.getElementById("add-list-button"), this.currentList == null);
        this.visibility(document.getElementById("undo-button"), this.tps.hasTransactionToUndo());
        this.visibility(document.getElementById("redo-button"), this.tps.hasTransactionToRedo());
        this.visibility(document.getElementById("delete-list-button"), !(this.currentList == null));
        this.visibility(document.getElementById("add-item-button"), !(this.currentList == null));
        this.visibility(document.getElementById("close-list-button"), !(this.currentList == null));
    }

    /**
     * returns the current list
     */
    getCurrentList(){
        return this.currentList;
    }

    /**
     * sets the visibility of the button
     * @param {*} button 
     * @param {*} bool 
     */
    visibility(button, bool){
        if(bool){
            button.style.visibility = "visible";
        }
        else{
            button.style.visibility = "hidden";
        }
    }
}