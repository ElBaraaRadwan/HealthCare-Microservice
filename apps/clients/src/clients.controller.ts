import { Controller } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateDto, UpdateDto } from './dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @EventPattern('create_client')
  async handleCreateClient(@Payload() clientDto: CreateDto) {
    return this.clientsService.create(clientDto);
  }

  @MessagePattern('get_all_clients')
  async handleGetClients() {
    return this.clientsService.findAll();
  }

  @MessagePattern('get_client')
  async handleGetClient(@Payload() id: number) {
    return this.clientsService.findOne(id);
  }

  @EventPattern('update_client')
  async handleUpdateClient(
    @Payload() { id, clientDto }: { id: number; clientDto: UpdateDto },
  ) {
    return this.clientsService.update(id, clientDto);
  }

  @EventPattern('delete_client')
  async handleDeleteClient(@Payload() id: number) {
    return this.clientsService.remove(id);
  }
}
