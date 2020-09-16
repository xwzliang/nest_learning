import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks():Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    // Using DTO
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        return this.tasksService.createTask(createTaskDto);
    }

    // Retrive specific parameter from request body
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string,
    // ): Task{
    //     return this.tasksService.createTask(title, description);
    // }

    // Retrive all parameters from request body
    // createTask(@Body() body) {
    //     console.log('body', body);
    // }
}
