import React, { Component } from 'react';
// CSS
import classes from './FeedbackSlider.module.css';

/**
 * WORK IN PROGRESS
 */

const updateValue = (input) => {
    var transform = `scaleY(${((input.value-50) * .0125)+1 }) scaleX(${1-((input.value-50) * .006)}) translate(-${(input.value-50)*.3}%, -${(input.value-50) * .4}%)`;
    var gradient = `linear-gradient(to right, hsl(${input.value*.5}, 50%, 50%), hsl(${input.value}, 70%, 70%))`;
    input.style.background = gradient;
    document.querySelector('.happiness__header').style.background = gradient;
    document.querySelector('.happiness__emoji--eyeL').style.transform = `${(input.value<50 ) ? 'none': transform }`;
    document.querySelector('.happiness__emoji--eyeR').style.transform = `${(input.value<50 ) ? 'none': transform }`;
    document.querySelector('.happiness__emoji--eyeL .happiness__emoji--eyeBrew').style.height = `${30+((50-input.value)*.3)}%`;
    document.querySelector('.happiness__emoji--eyeR .happiness__emoji--eyeBrew').style.height = `${30+((50-input.value)*.3)}%`;
    document.querySelector('.happiness__emoji--eyeL .happiness__emoji--eyeBrew').style.opacity = `${((50-input.value)*.02)}`;
    document.querySelector('.happiness__emoji--eyeR .happiness__emoji--eyeBrew').style.opacity = `${((50-input.value)*.02)}`;
    document.querySelector('.happiness__emoji--mouth').style.transform = `scale(${(input.value-50) >= 0 ? 1 : -1})`;
    document.querySelector('.happiness__emoji--mouth').style.borderRadius = `0 0 ${Math.abs(input.value-50)}% ${Math.abs(input.value-50)}%`;
    document.querySelector('.happiness__emoji--mouth').style.bottom = `${30 - ((input.value-50)*.1)}%`;
}

const feedbackSlider = () => {
    return (
        <div class="happiness">
            <div class="happiness__modal">
                <div class="happiness__header">
                    <div class="happiness__emoji">
                        <span class="happiness__emoji--eyeL">
                            <span class="happiness__emoji--eyeBrew"></span>
                        </span>
                        <span class="happiness__emoji--eyeR">
                            <span class="happiness__emoji--eyeBrew"></span>
                        </span>
                        <span class="happiness__emoji--mouth"></span>
                    </div>
                    <span class="happiness__header--label">Your Feedback means the world to us</span>
                </div>
                <div class="happiness__main">
                    <div class="happiness__main--slider">
                        <label>Unsatisfied</label>
                        <input id="happinessSlider" type="range" step="1" min="0" max="100" oninput="updateValue(this)" />
                        <label>Very happy</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default feedbackSlider;