import React from 'react';
// CSS
import classes from './StarsRating.module.css';
// JSX
import Star from './Star/Star';

const starsRating = (props) => {
    // Declaring initial variables, the amount of stars rendered by default is 5
    const amountOfStars = props.amount ? props.amount : 5;
    // Boolean that allows the loop to keep spreading the rating or not depending if it's necessary
    let bRatingReached = false;
    let stars = [];
    /**
     * For loop starting from 1 (first star) to the amount of stars, default amount is 5,
     * the total amount of loops is always equal to the amount of stars.
     */
    for (let i = 1; i <= amountOfStars; i++) {
        /**
         * If statement that determines if the rating needs to be spread still
         * between the remaining stars to be looped, if not needed, they will
         * return with a rating of 0%.
         */
        if (!bRatingReached) {
            /**
             * The following if statement checks if the rating is less than the current star 
             * divided by the total amount of stars, if true, it means it's the last star that will 
             * be filled with color, it's relative to the total rating. If it's false it will push 
             * a star with a fill of 100%.
             */
            if (props.rating < i/amountOfStars) {
                /**
                 * We have reached the last star that needs to be filled with color, therefore
                 * the boolean is set to true to avoid further stars from being filled, instead
                 * they will be rendered as stars with 0% fill, if there are any left.
                 */
                bRatingReached = true;
                /**
                 * The rating now has to be relative to the current star, inside its own bracket. For example,
                 * if the rating is 70%, and there are 5 stars, the fourth star will have 50% of it's length 
                 * filled. First, we need to multiply the total rating times the amount of stars, to make the 
                 * result be relative to the star's fill percentage. Then, we calculate the difference between 
                 * the relative rating and the current bracket, the current bracket is the current star minus 1. 
                 * The result of the difference is then divided by the total amount of stars and we have our float.
                 * We need a string percentage for the SVG though, so we multiply by 100 and concatenate a '%' 
                 * character string.
                 */
                const rating = (props.rating*amountOfStars - (i-1)) * 100 + '%';
                stars.push(<Star key={i} fill={rating}/>);
                /**
                 * Continue to break the current loop and return the rest of the stars with 0% of fill, if any.
                 */
                continue;
            }
            // Stars with 100% of fill if we have not reached the last star.
            stars.push(<Star key={i} />);
            // Continue to break the current loop and avoid returning extra stars.
            continue;
        }
        // Stars with 0% of fill.
        stars.push(<Star key={i} fill={'0%'} />);
    }
    return (
        <span className={classes.Stars}>
            {stars}
        </span>
    );
}

export default starsRating;