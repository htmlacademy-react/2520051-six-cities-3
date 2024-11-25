import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


export const getDatetimeFormat = (date: string | Date | number, format: string): string => dayjs(date).format(format);
