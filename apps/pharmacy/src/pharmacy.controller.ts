import { Controller, Get } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDto, UpdateDto } from './dto';

@Controller()
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}
  @EventPattern('create_pharmacy')
  async handleCreateClient(@Payload() clientDto: CreateDto) {
    return this.pharmacyService.create(clientDto);
  }

  @MessagePattern('get_all_pharmacies')
  async handleGetClients() {
    return this.pharmacyService.findAll();
  }

  @MessagePattern('get_pharmacy')
  async handleGetClient(@Payload() id: number) {
    return this.pharmacyService.findOne(id);
  }

  @EventPattern('update_pharmacy')
  async handleUpdateClient(
    @Payload() { id, clientDto }: { id: number; clientDto: UpdateDto },
  ) {
    return this.pharmacyService.update(id, clientDto);
  }

  @EventPattern('delete_pharmacyService')
  async handleDeleteClient(@Payload() id: number) {
    return this.pharmacyService.remove(id);
  }
}
