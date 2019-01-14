import React from 'react';
// CSS
import classes from './MarketingPrompt.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const marketingPrompt = (props) => {
    let checked;
    if (props.bMarketingPrompt) {
        checked = classes.Checked;
    }
    return (
        <div className={classes.UtilContainer}>
            <div className={classes.PromptWrapper}>
                <div className={classes.PromptContainer} onClick={props.toggleMarketingPrompt}>
                    <div className={classes.Prompt}>
                        <div className={classes.PromptCheckbox}>
                            <div>
                                <input type="checkbox"
                                    aria-invalid="false" 
                                    id="AuthModal__MarketingPromptCheckbox" 
                                    name="marketing_prompt" 
                                    value="1" 
                                    defaultChecked={props.bMarketingPrompt} />
                                <span className={checked}>
                                    <SVG svg='checkmark-nobg'/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.Info}>
                I don’t want to receive promotional emails from Servify. I can also opt out of receiving promotional emails at any given moment in the account settings or via a prompt displayed at the bottom of the emails.
            </div>
        </div>
    )
}

export default marketingPrompt;