import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';

  getProducts(){
    return this.http.get<IProducts[]>(this.url);

  }

  getProduct(id: number){
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  postProduct(product: IProducts){
    return this.http.post<IProducts>(this.url, product)
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  updateProduct(product: IProducts) {
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product);
  }

  postProductToBasket(product: IProducts){
    return this.http.post<IProducts>(this.urlBasket, product)
  }

  //return all products not just single one from urlBasket and not the regular url
  getProductFromBasket(){
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  updateProductToBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<any>(`${this.urlBasket}/${id}`)
  }



}
