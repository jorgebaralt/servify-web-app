export const parseLogistic = (logistic) => {
    switch(true) {
        case logistic === 'physical':
            return 'Physical store only.';
        case logistic === 'delivery':
            return 'Deliveries only.';
        case logistic === 'both':
            return 'Physical store and deliveries.'
        default:
            return logistic;
    } 
}