import { IsNotEmpty, Length, IsString, IsInt } from '@nestjs/class-validator';

export class createPostDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 1000)
  readonly content: string;

  @IsNotEmpty()
  readonly authorId: number;
}
