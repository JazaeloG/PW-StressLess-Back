import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ id });
  }

  /*async findAll(){
        return await this.usuarioRepository.find();
      }

  async findOne(id: number){
    return await this.usuarioRepository.findOne(
        {where: {id}}
    );
    //this.usuarioRepository.findOneBy({ id });
  }*/
  


  create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, usuario: Usuario): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.usuarioRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
