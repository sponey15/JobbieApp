import { Photo } from "./photo";

export interface Offer {
    id?: number;
    title: string;
    description: string;
    price: number;
    companyName?: string;
    offerCategoryName: string;
    photoUrl?: string;
    photos?: Photo[];
}

export interface OfferCategory {
    [offerCategoryName: string]: string;
}

export enum OfferCategoryType {
    Renovation,
    Painting,
    Transport,
    Electrician,
    Assembly,
    Electronics,
    Plumber,
    Cleaning,
    Handyman
}