import moment from 'moment'

export const parseDate = (dateValue) => moment(dateValue).format("YYYY-MM-DD")