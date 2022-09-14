import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false;

  }

    //reactive form creation
    myForm: FormGroup = new FormGroup({
      //we compare the id in de db and if the id exists we keep that id and if not we set id to null (this is the dialogbox to edit or delete the product)
      id: new FormControl(this.data?.id ?? null),
      title: new FormControl(this.data?.title ?? ''),
      price: new FormControl(this.data?.price ?? ''),
      water: new FormControl(this.data?.water ?? ''),
      tonic: new FormControl(this.data?.tonic ?? ''),
      humor: new FormControl(this.data?.humor ?? ''),
      fun: new FormControl(this.data?.fun ?? ''),
      other: new FormControl(this.data?.other ?? ''),
    });

    isNew: boolean = true;

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(){
    this.data ={
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: "assets/images/product.jpg",
      water: this.myForm.value.water,
      tonic: this.myForm.value.tonic,
      humor: this.myForm.value.humor,
      fun: this.myForm.value.fun,
      other: this.myForm.value.other

    };
    // console.log(this.myForm?.value);

    this.dialogRef.close(this.data);

  }

  ngOnInit(): void {
  }

}
