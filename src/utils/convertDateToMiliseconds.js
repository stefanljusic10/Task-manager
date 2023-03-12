import moment from 'moment'

export const convertDateToMiliseconds = (value) => {
    return moment(new Date(value)).valueOf()
}