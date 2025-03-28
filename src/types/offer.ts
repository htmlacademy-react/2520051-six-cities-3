import { City, Location } from './main';

export type OfferInfo = {
  'id': string;
  'title': string;
  'type': string;
  'price': number;
  'city': City;
  'location': Location;
  'isFavorite': boolean;
  'isPremium': boolean;
  'rating': number;
  'description': string;
  'bedrooms': number;
  'goods': string[];
  'host': {
    'name': string;
    'avatarUrl': string;
    'isPro': boolean;
  };
  'images': string[];
  'maxAdults': number;
}

export type Comment = {
  'id': string;
  'date': string;
  'user': {
    'name': string;
    'avatarUrl': string;
    'isPro': boolean;
  };
  'comment': string;
  'rating': number;
};

