import * as fs from "fs"
import * as remove from "lodash/remove"
import * as orderBy from "lodash/orderBy"

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name: string){
    super(name);

    const productsJson = fs
    .readFileSync(__dirname + "/products.json")
    .toString();
    const productsOfTheFile = JSON.parse(productsJson);
    productsOfTheFile.forEach((p)=> {
      this.addProduct(p);

    });

  }

  addProduct(product: Product){
    this.add(product);

  }

  getProduct(id: number){
  const cosas = this.getCosas();
  return cosas.find((i)=> i.id == id);

}
removeProduct(id: number){
  remove(this.cosas, (c)=> c.id == id);

}
getSortedByPrice(order: "asc" | "desc"){
  return orderBy(this.cosas, ["price"], [order]);

}
  
}

export { ListaDeProductos, Product };
