import { IsNotEmpty, IsString } from "class-validator"

export class DeletePaintingDto {
    @IsNotEmpty()
    @IsString()
    creator: string
    @IsNotEmpty()
    @IsString()
    paintingName: string
    @IsNotEmpty()
    @IsString()
    parentAlbums: string
}