export interface Book {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  content: string;
  price: string;
  status: string;
  imageURL: string;
}

export interface SelectedItem {
  index: number;
  qty: number;
  originalPrice: number;
  total: number;
  book: Book;
}
