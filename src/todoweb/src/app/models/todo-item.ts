import { TodoState } from "./todo-state";

export class TodoItem {
    id: number;
    description: string;
    dateCreated: Date;
    dateTarget: Date;
    dateCompleted?: Date | undefined;
    state: TodoState;

    constructor(
        id: number,
        description: string,
        dateTarget: Date) {
        this.id = id;
        this.description = description;
        this.dateCreated = new Date();
        this.dateTarget = dateTarget;
        this.state = TodoState.InProgress;
    }
}