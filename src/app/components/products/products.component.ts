import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  products: IProducts[];
  productsSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;


  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit(): void {

        //user rights verification should be here and if it's ok then
        this.canEdit = true;

    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent);
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

}
