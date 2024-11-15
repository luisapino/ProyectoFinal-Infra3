import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column()
    imageUrl!: string;

    @Column({ default: false })
    bought!: boolean;

    @ManyToOne(() => User, (user) => user.boughtProducts, { nullable: true })
    buyerUser!: User | null;
}
