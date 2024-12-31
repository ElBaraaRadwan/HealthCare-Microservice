import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import { CreateDto, UpdateDto } from './dto';

@Controller()
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

  @EventPattern('create_employee')
  async handleCreateClient(@Payload() clientDto: CreateDto) {
    return this.EmployeeService.create(clientDto);
  }

  @MessagePattern('get_all_employees')
  async handleGetClients() {
    return this.EmployeeService.findAll();
  }

  @MessagePattern('get_employee')
  async handleGetClient(@Payload() id: number) {
    return this.EmployeeService.findOne(id);
  }

  @EventPattern('update_employee')
  async handleUpdateClient(
    @Payload() { id, clientDto }: { id: number; clientDto: UpdateDto },
  ) {
    return this.EmployeeService.update(id, clientDto);
  }

  @EventPattern('delete_employee')
  async handleDeleteClient(@Payload() id: number) {
    return this.EmployeeService.remove(id);
  }
}
