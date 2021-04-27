export type PizzaOptions = {
  flavor: string;
};

export type CardInfo = {
  cardNumber: string;
  month: number;
  year: number;
  cvv: string;
};

export type OrderInfo = {
  options: PizzaOptions
};