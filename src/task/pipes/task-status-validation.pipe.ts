import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROCESS,
        TaskStatus.DONE,
    ];

    transform(value: any): any {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value} is invalid status`);
        }
    }

    private isStatusValid(status: any) {
        return -1 !== this.allowedStatuses.indexOf(status);
    }
}
