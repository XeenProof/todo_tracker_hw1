'use strict'

/**
 * ToDoController //event handlers
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;
       
        
        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            appModel.view.confirmModal();
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        }  
        document.getElementById("close-list-button").onclick = function(){
            appModel.closeList();
        }
        this.checkButtons();
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }

    /**
     * Moves an item up on the list
     * 
     * @param {*} item the item to move up
     */
    moveItemUp(item){
        this.model.upTransaction(item);
    }

    /**
     * Moves an item down on the list
     * 
     * @param {*} item the item to move down
     */
    moveItemDown(item){
        this.model.downTransaction(item);
    }


    /**
     * Removes an Item from the current list
     * 
     * @param {*} item the item to remove
     */
    deleteItem(item){
        this.model.removeItemTransaction(item);
    }

    /**
     * Changes the description of an item
     * 
     * @param {*} item the item text to change
     * @param {*} newText the new description
     */
    editDescription(item, newText){
        this.model.editDescriptionTransaction(item, newText);
    }

    /**
     * Changes an item due date
     * 
     * @param {*} item the item date to change
     * @param {*} newDate the new due date
     */
    editDate(item, newDate){
        this.model.editDateTransaction(item, newDate);
    }

    /**
     * Changes an item's status
     * 
     * @param {*} item the item status to change
     * @param {*} newStatus the new status 
     */
    editStatus(item, newStatus){
        this.model.editStatusTransaction(item, newStatus);
    }

    /**
     * Removes the current list
     */
    deleteList(){
        this.model.removeCurrentList();
    }

    /**
     * Checks which button should be visiable after an action
     */
    checkButtons(){
        this.model.buttonCheck();
    }

    /**
     * Allows access to the current list
     */
    getCurrentList(){
        return this.model.getCurrentList();
    }
}