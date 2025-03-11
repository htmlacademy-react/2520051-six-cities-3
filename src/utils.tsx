import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Offer } from './types/main';
import { PlacesOption } from './transfers';
import { Comment } from './types/offer';
import { cities } from './constant';
dayjs.extend(duration);


export const getDatetimeFormat = (date: string | Date | number, format: string): string => dayjs(date).format(format);

export const getSortedOffers = ((data: Offer[], sortingType: string) => {
  const sortedData = [...data];
  switch (sortingType) {
    case PlacesOption.PRICE_UP:
      return sortedData.sort((a, b) => a.price - b.price);
    case PlacesOption.PRICE_DOWN:
      return sortedData.sort((a, b) => b.price - a.price);
    case PlacesOption.RATING:
      return sortedData.sort((a, b) => b.rating - a.rating);

    case PlacesOption.POPULAR:
    default:
      return (data);
  }
});

export const getRandomCity = () => (cities[Math.floor(Math.random() * cities.length)]);

export const sortByDateDescending = (data: Comment[]): Comment[] => data.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
