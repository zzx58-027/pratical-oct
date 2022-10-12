import { Controller } from '@nestjs/common';
import { PaintingService } from './painting.service';

@Controller('painting')
export class PaintingController {
  constructor(private readonly paintingService: PaintingService) {}
}
