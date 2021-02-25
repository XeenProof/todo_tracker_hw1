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
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }

    moveItemUp(item){
        this.model.upTransaction(item);
    }

    moveItemDown(item){
        this.model.downTransaction(item);
    }

    deleteItem(item){
        this.model.removeItemTransaction(item);
    }

    editDescription(item, newText){
        this.model.editDescriptionTransaction(item, newText);
    }

    editDate(item, newDate){
        this.model.editDateTransaction(item, newDate);
    }

    editStatus(item, newDate){
        this.model.editStatusTransaction(item, newDate);
    }

    deleteList(){
        this.model.removeCurrentList();
    }
}