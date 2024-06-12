import { length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Productos{
    @PrimaryColumn()
    id:number;
    @Column({length:50,nullable:false})
    nombre:string;
    @Column()
    precio:number;
    @Column()
    stock:number;
    @Column()
    categoria:number;
    @Column({default:true})
    estado:boolean;
}
