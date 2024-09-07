import moment from 'moment';

export enum DateFormat {
  Standard,
  HTMlDateTime,
}
export const formatDate = (
  date: Date,
  format = DateFormat.Standard
): string => {
  switch (format) {
    case DateFormat.Standard:
      return moment(date).format('MMMM Do, YYYY');
    case DateFormat.HTMlDateTime:
      return moment(date).format('YYYY-MM-DD');
  }
};
