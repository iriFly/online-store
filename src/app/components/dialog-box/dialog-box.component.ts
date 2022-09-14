import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  //reactive form creation
  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    water: new FormControl(''),
    tonic: new FormControl(''),
    humor: new FormControl(''),
    fun: new FormControl(''),
    other: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.data ={
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
