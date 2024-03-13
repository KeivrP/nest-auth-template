import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable() // El decorador @Injectable indica que la clase puede ser inyectada como dependencia
export class UsersService {
  constructor(
    @InjectRepository(User) // Inyecta el repositorio de usuarios proporcionado por TypeORM
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para crear un nuevo usuario
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // Método para encontrar un usuario por su correo electrónico
  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  // Método para encontrar un usuario por su correo electrónico con la contraseña
  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  // Método para encontrar todos los usuarios
  findAll() {
    return this.userRepository.find();
  }

  // Método para encontrar un usuario por su ID
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // Método para actualizar un usuario por su ID
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // Método para eliminar un usuario por su ID
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
