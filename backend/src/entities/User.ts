import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    document!: string;

    @Column()
    password!: string;

    @OneToMany(() => Product, (product) => product.buyerUser)
    boughtProducts!: Product[];

    @OneToMany(() => Cart, (cart) => cart.user)
    cart!: Cart;
}
