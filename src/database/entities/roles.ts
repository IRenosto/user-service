import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Permissao } from './permissoes';
import { Usuario } from './usuarios';

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    nome!: string;

    @Column({ type: 'varchar', nullable: true })
    descricao?: string;

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    data_criacao!: Date

    @UpdateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) 
    data_atualizacao!: Date

    @ManyToMany(() => Permissao, (permissao) => permissao.roles, {
      cascade: true,
      onDelete: 'CASCADE',
  })
  @JoinTable({
      name: 'roles_permissoes',
      joinColumns: [{ name: 'role_id' }],
      inverseJoinColumns: [{ name: 'permissao_id' }],
  })
  permissoes!: Permissao[];

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios!: Usuario[];
}