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
import { Role } from './roles';

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number;

    @Column({ type: 'text', nullable: false })
    nome!: string

    @Column({ type: 'text', nullable: false })
    sobrenome!: string

    @Column({ default: true })
    ativo!: boolean

    @Column({ type: 'text', nullable: false, unique: true })
    email!: string

    @Column()
    senha!: string;

    @Column({ type: 'text', nullable: true })
    usuario_atualizador?: string;

    @Column({ type: 'text', nullable: true })
    usuario_cadastrador?: string;

    @Column({ nullable: true, type: 'timestamp' }) 
    ultimo_login?: Date

    @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    data_criacao!: Date

    @UpdateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) 
    data_atualizacao!: Date

    @ManyToMany(() => Permissao, (permissao) => permissao.usuarios, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'usuarios_permissoes',
        joinColumns: [{ name: 'usuario_id' }],
        inverseJoinColumns: [{ name: 'permissao_id' }],
    })
    permissoes?: Permissao[];

    @ManyToMany(() => Role, (role) => role.usuarios, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'usuarios_roles',
        joinColumns: [{ name: 'usuario_id' }],
        inverseJoinColumns: [{ name: 'role_id' }],
    })
    roles?: Role[]; 
}
