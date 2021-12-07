import { TodoItem } from "./todo-item";

export class EditTodoItemData {
    isNew: boolean;
    item: TodoItem;

    constructor(isNew: boolean, item: TodoItem) {
        this.isNew = isNew;
        this.item = item;
    }
}