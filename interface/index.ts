export interface Book {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  content: string;
  price: string;
  status: string;
  image: string;
}

export interface SelectedItem {
  qty: number;
  total: number;
  book: Book;
}
