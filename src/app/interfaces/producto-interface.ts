
export interface CategoryInterface{
  id: number,
  name: string,
  image: string
}


export interface ProductoInterface {
  id: number,
  title: string,
  price: string,
  description: string,
  category: CategoryInterface,
  images: string,
}
