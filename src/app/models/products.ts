export interface IProducts {
  id: number,
  title: string,
  price: number,
  image?: string,
  ingredients: IProductsIngred,
  quantity: number;
}

export interface IProductsIngred {
  water: string,
  tonic: string,
  humor: string,
  fun: string,
  other: string,
}
