import { Injectable } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let filteredTasks = this.getAllTasks();

        if (status) {
            filteredTasks = filteredTasks.filter(task => task.status === status)
        }

        if (search) {
            filteredTasks = filteredTasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search)
            );
        }

        return filteredTasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
