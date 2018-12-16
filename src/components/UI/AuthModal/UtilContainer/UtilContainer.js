import React from 'react'
// CSS
import classes from './UtilContainer.module.css';
// JSX
import SVG from '../../../SVG/SVG';

const utilContainer = (props) => {
    let checked;
    if (props.bRememberMe) {
        checked = classes.Checked;
    }
    return (
        <div className={classes.UtilContainer}>
            <div className={classes.RememberPasswordWrapper}>
                <div className={classes.RememberPasswordContainer} onClick={props.toggleRememberMe}>
                    <div className={classes.RememberPassword}>
                        <div className={classes.RememberPasswordCheckbox}>
                            <div>
                                <input type="checkbox"
                                    aria-invalid="false" 
                                    id="AuthModal__LoginRememberMeCheckbox" 
                                    name="remember_me" 
                                    value="1" 
                                    defaultChecked={props.bRememberMe} />
                                <span className={checked}>
                                    <SVG svg='checkmark-nobg'/>
                                </span>
                            </div>
                        </div>
                        <div className={classes.RememberMeContainer}>
                            <span className={classes.RememberMe}>Remember me</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.ShowPasswordWrapper}>
                <button type="button"
                    onClick={props.toggleShowPassword}
                    className={classes.ShowPassword} 
                    aria-busy="false">{props.bShowPassword ? 'Hide password' : 'Show password'}</button>
            </div>
        </div>
    );
}

export default utilContainer