import {makeAutoObservable} from "mobx";


class Store {
    id
    product_name = "";
    sku = "";
    description = "";
    price_prod = "";
    constructor(){
        makeAutoObservable(this);
    }

    setData = (obj) =>{
        this.id = obj.id
        this.product_name = obj.product_name;
        this.sku = obj.sku;
        this.description = obj.description;
        this.price_prod = obj.price_prod
    }
    clearData = () =>{
        this.id = 0;
        this.product_name = "";
        this.sku = "";
        this.description = "";
        this.price_prod = "";
    }
    getData = () =>{
        return {
            product_name: this.product_name,
            sku : this.sku,
            description: this.description,
            price_prod: this.price_prod
        }
    }
}

export const store = new Store();