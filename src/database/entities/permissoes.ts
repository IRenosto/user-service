import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Role } from './roles';
import { Usuario } from './usuarios';

@Entity('permissoes')
export class Permissao {

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

    @ManyToMany(() => Usuario, (usuario) => usuario.permissoes)
    usuarios?: Usuario[];

    @ManyToMany(() => Role, (role) => role.permissoes)
    roles?: Role[];
}

