import React from 'react';
import classes from './FlipCard.module.css';
import loading from '../../../assets/svg/loading.svg'

const flipCard = (props) => {
    let card = {
        front: {},
        back: {}
    };
    Object.keys(card).forEach (key => {
        if (!props[key]) {return}
            card[key].classes = [classes[key.charAt(0).toUpperCase() + key.slice(1)]];
            if(props[key].classes) {
                card[key].classes.push(props[key].classes);
            }
            if (props[key].card) {
                if (String(props[key].card).substring(props[key].card.length - 4) === '.mp4') {
                    card[key].height = 'auto';
                    card[key].content = (
                        <video 
                        width={props.width} height={"auto" } autoPlay loop muted playsInline>
                            <source src={props[key].card} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )
                    card[key].spinner = loading;
                } else {
                    card[key].height = props.height;
                    card[key].content = (
                        <img 
                            src={props[key].card} 
                            alt="" 
                            style={{
                                width: props.width, 
                                height: props.height,
                                opacity: props.opacity}} />)
                }
            }
    });
    return (
        <div className={classes.FlipCard} style={{width: props.width, height: props.height}}>
            <div 
            style={{animationDelay: Math.random()*Math.random()*4 + 's'}}
            className={classes.Inner}>
                {card.front ? 
                    <div className={card.front.classes.join(' ')}>
                        <div className={classes.Media} style={{
                            height: card.front.height, 
                            backgroundImage: `url(${card.front.spinner})`}}>
                            {card.front.content}
                        </div>
                        {props.front ? props.front.content : null}
                    </div>
                : null}
                {card.back ? 
                    <div className={card.back.classes.join(' ')}>
                        <div className={classes.Media} style={{
                            height: card.back.height,
                            // backgroundImage: `url(${card.back.spinner})`
                            }}>
                            {card.back.content}
                        </div>
                        {props.back ? props.back.content : null}
                    </div>
                : null}
            </div>
        </div>
    )
}

export default flipCard;