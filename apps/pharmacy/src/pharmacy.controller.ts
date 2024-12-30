import { Controller, Get } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';

@Controller()
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

}
