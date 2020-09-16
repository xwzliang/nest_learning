import { Injectable } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
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
}
