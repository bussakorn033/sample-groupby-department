export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

export interface Hair {
    color: string;
    type: string;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

export interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}

export interface DepartmentGroup {
    [key: string]: User[];
}


export interface UserResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface DepartmentSummary {
    male: number;
    female: number;
    ageRange: string;
    hair: { [color: string]: number };
    addressUser: { [name: string]: string };
}

export interface DepartmentGroupSummary {
    [department: string]: DepartmentSummary;
}
