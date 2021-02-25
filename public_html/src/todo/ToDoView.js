'use strict'

//import ToDoModel from "./ToDoModel";

/**
 * ToDoView //anything to do with display
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));

        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }



    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE4
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];

            let newItem = this.itemToHTML(listItem);
            itemsListDiv.appendChild(newItem);
            //itemsListDiv.innerHTML += newItem;

        }
    }

    itemToHTML(listItem){
        let thisController = this.controller;
        let newItem = document.createElement("div");
        newItem.setAttribute("id", "todo-list-item-" + listItem.id);
        newItem.setAttribute("class", "list-item-card");

        //Description
        let info = document.createElement("input");
        info.setAttribute("type", "text");
        info.setAttribute("style", "color:white");
        info.setAttribute("style", "font-family:Lexend Exa");
        info.setAttribute("value", listItem.description);
        info.setAttribute("id", "edit-text-" + listItem.id + "-button")
        info.setAttribute("class", "task-col todo_button");
        newItem.appendChild(info);
        info.onchange = function(){
            thisController.editDescription(listItem, info.value);
        }

        //Date WIP
        let date = document.createElement("input");
        date.setAttribute("type", "date");
        date.setAttribute("style", "color:white");
        date.setAttribute("style", "font-family:Lexend Exa");
        date.setAttribute("id", "edit-date-" + listItem.id + "-button")
        date.setAttribute("class", "due-date-col todo_button");
        date.setAttribute("value", listItem.dueDate);
        newItem.appendChild(date);
        date.onchange = function(){
            thisController.editDate(listItem, date.value);
        }

        //Status
        let status = document.createElement("select");
        status.setAttribute("id", "edit-status-" + listItem.id + "-button")
        status.setAttribute("class", "status-col todo_button");
        status.setAttribute("style", "font-family:'Lexend Exa'");

        let complete = document.createElement("option");
        complete.setAttribute("value", "complete");
        complete.setAttribute("style", "color:blue");
        complete.appendChild(document.createTextNode("complete"));

        let incomplete = document.createElement("option");
        incomplete.setAttribute("value", "incomplete");
        incomplete.setAttribute("style", "color:orange");
        incomplete.appendChild(document.createTextNode("incomplete"));

        status.appendChild(complete);
        status.appendChild(incomplete);
        status.value = listItem.getStatus();

        //status.appendChild(document.createTextNode(listItem.status));
        newItem.appendChild(status);
        status.onchange = function(){
            thisController.editStatus(listItem, status.value);
        }

        //controls
        let controls = document.createElement("div");
        controls.setAttribute("class", "list-controls-col");

        //Move up
        let up = document.createElement("div");
        up.setAttribute("id", "move-item-" + listItem.id + "-up-button");
        up.setAttribute("class", "list-controls-col material-icons todo_button");
        up.appendChild(document.createTextNode("keyboard_arrow_up"));
        controls.appendChild(up);
        up.onclick = function(){
            thisController.moveItemUp(listItem)
        }

        //Move down
        let down = document.createElement("div");
        down.setAttribute("id", "move-item-" + listItem.id + "-down-button");
        down.setAttribute("class", "list-controls-col material-icons todo_button");
        down.appendChild(document.createTextNode("keyboard_arrow_down"));
        controls.appendChild(down);
        down.onclick = function(){
            thisController.moveItemDown(listItem)
        }

        //Delete Item
        let close = document.createElement("div");
        close.setAttribute("id", "delete-item-" + listItem.id + "-button");
        close.setAttribute("class", "list-controls-col material-icons todo_button");
        close.appendChild(document.createTextNode("close"));
        controls.appendChild(close);
        close.onclick = function(){
            thisController.deleteItem(listItem)
        }

        //empty space
        let space = document.createElement("div");
        space.setAttribute("class", "list-item-control");
        controls.appendChild(space);
        controls.appendChild(space);

        //ending
        newItem.appendChild(controls);
        return newItem;
    }

    


    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }

    confirmModal(){
        var location = document.getElementById("grid-container");
        
        var overlay = document.createElement("div");
        overlay.setAttribute("class", "modal-overlay");

        var modal = document.createElement("div");
        modal.setAttribute("class", "modal");
        overlay.appendChild(modal);

        var modalHeader = document.createElement("div");
        modal.appendChild(modalHeader);
        modalHeader.setAttribute("class", "modal-header header");

        var text = document.createElement("h3");
        modalHeader.appendChild(text);
        text.appendChild(document.createTextNode("Delete List?"));

        var select = document.createElement("div");
        modal.appendChild(select);
        select.setAttribute("class", "modal-header");

        var confirm = document.createElement("div");
        confirm.setAttribute("class", "modal_button");
        confirm.appendChild(document.createTextNode("Confirm"));
        select.appendChild(confirm);

        var cancel = document.createElement("div");
        cancel.setAttribute("class", "modal_button");
        cancel.appendChild(document.createTextNode("Cancel"));
        select.appendChild(cancel);

        let thisController = this.controller;

        confirm.onclick = function(){
            thisController.deleteList();
            location.removeChild(overlay);
        }
        cancel.onclick = function(){
            location.removeChild(overlay);
        }

        location.appendChild(overlay);
    }
}

