import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { PaintingService } from "./painting.service";
import { PaintingController } from "./painting.controller";
import { CosNodeService } from "../cos/cos_node.service";
import { Painting, paintingSchema } from "./painting.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Painting.name,
        schema: paintingSchema,
      },
    ]),
  ],
  controllers: [PaintingController],
  providers: [PaintingService, CosNodeService],
})
export class PaintingModule {}
