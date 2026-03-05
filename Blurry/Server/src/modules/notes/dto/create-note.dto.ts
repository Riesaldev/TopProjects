import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  contact_id?: number;

  @IsString()
  content: string;
}
