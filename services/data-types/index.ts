export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BanksTypes {
  _id: string;
  name: string;
  bankName: string;
  noRekening: string;
}

export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BanksTypes[];
}

export interface NominalTypes {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface LocalFormTypes {
  name: string;
  username: string;
  password: string;
}

export interface PlayerTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: number;
  avatar: string;
}

export interface JWTPayloadTypes {
  player: PlayerTypes;
  iat: number;
}

export interface CountTypes {
  name: string;
  value: number;
  _id: string;
}

export interface DashboardOverviewTypes {
  _id: string;
  accountUser: string;
  category: CategoryTypes;
  historyPayment: PaymentTypes;
  historyUser: {
    name: string;
    phoneNumber: number;
  };
  historyVoucherTopup: {
    category: string;
    coinName: string;
    coinQuantity: string;
    gameName: string;
    price: number;
    thumbnail: string;
  };
  name: string;
  player: string;
  status: string;
  tax: number;
  user: string;
  value: number;
}

export interface TransactionDetailTypes {
  _id: string;
  accountUser: string;
  category: string;
  historyPayment: {
    bankName: string;
    noRekening: string;
    type: string;
  };
  historyUser: {
    name: string;
    phoneNumber: number;
  };
  historyVoucherTopup: {
    category: string;
    coinName: string;
    coinQuantity: string;
    gameName: string;
    price: number;
    thumbnail: string;
  };
  name: string;
  player: string;
  status: string;
  tax: number;
  user: string;
  value: number;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}
