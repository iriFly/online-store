import { DialogConfig } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  products: IProducts[];
  productsSubscription: Subscription;
  basket: IProducts[];
  basketSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  ngOnInit(): void {

        //user rights verification should be here and if it's ok then
        this.canEdit = true;

    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.products = data;
    })
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) this.updateToBasket(findItem)
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts){
    this.ProductsService.postProductToBasket(product).subscribe( (data) =>
    // console.log(data));
    this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts){
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {})
  }


  deleteItem(id: number){
    console.log(id);
    this.ProductsService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      // (data) => console.log(data));
      if (id === item.id) {
        let idx = this.products.findIndex( (data) => data.id === id)
        this.products.splice(idx, 1);
      }
    }));
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {

      if (data) {

      //if we add any information to create a product then post otherwise cancel
      if (data && data.id)
      this.updateData(data);
      else
      this.postData(data);
      }

    });
  }


  updateData(product: IProducts){
    this.ProductsService.updateProduct(product).subscribe((data) => {
    this.products = this.products.map((product) => {
      if (product.id === data.id) return data;
      else return product;
    });
  });
}

  postData(data: IProducts){
    // console.log(data);
     // console.log(this.myForm?.value);
    this.ProductsService.postProduct(data).subscribe((data) => this.products.push(data));
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();


  }

}
