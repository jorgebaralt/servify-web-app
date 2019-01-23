import React, { PureComponent } from 'react';
import axios from 'axios';
// CSS
import classes from '../../Publish.module.css';
// JSX
import Separator from '../../../../components/UI/Separator/Separator';
import Button from '../../../../components/UI/Button/Button';

class StepFive extends PureComponent {
    constructor(props) {
        super(props);
        this.myTimer = null;
    }

    state = {
    }
    
    postService = async (e) => {
        console.log('this.props.data', this.props.data)
        return;
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.postService();
    }

    render () {
        return (
            <div className={classes.Container}>
                <div className={classes.FormWrapper}>
                    <div className={classes.Step}><span>S</span>tep 8: Confirm Information</div>
                    <h2>
                        You're done! All there is left if to confirm your information, you may click 
                        the submit button if everything is okay and then the service will be created 
                        in a bit.
                    </h2>
                    <Separator />
                    <form onSubmit={this.onSubmitHandler}>
                        <Button blockButton type='success' submit disabled={!this.props.dataIsValid}>Submit</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default StepFive;