import React, { PureComponent } from 'react';
// Worker function
import isElementInViewport from '../../shared/isInViewport';
// CSS
import classes from './Help.module.css';
// JSX
import Container from './Container/Container';
import SidePanel from './SidePanel/SidePanel';

const contactObj =  {
        basics: {
            1: ['How do I sign in?', 'To sign in, click the “Sign in” tab on the top right corner and you can choose to sign in with Facebook, a Google Account or with an Email. Choose your password and then click on the “Sign in” button below.'], 
            2: ['How do reviews work?', 'It is important to leave a review when you have received a service through Servify, in this way people could make their decision with the help of your own experience. To do a review simply go the “services tab” on the top right corner, select the profile where you would like to leave a review, then click the “write a review button” that is located below of the map, and finally you should choose the service’s rate, price rating and a brief description of your opinion about the service.'], 
            3: ['How does the price rating work?', 'In order to do a review, you must rate the price of the service you received. There are four dollar symbols which represent how low, similar or expensive this service was compared to similar services. Select the dollar symbol accordingly to what you considered the price was. From one $ symbol being the most affordable, and four $ symbols being the most expensive.'], 
            4: ['What do I need to publish my services?', 'Go to the “Publish” tab on the top right corner, and then click the “publish a service” button on the right side. Follow the steps in order to list your service with the required information about your business.'], 
        },
        publishing: {
            1: ['Can I publish multiple services?', 'Yes, as long as they are different categories or subcategories. You cannot publish the same service multiple times.'], 
            2: ['Can I remove a service?', 'You can always remove a service that you published, going directly to your profile, click on “My Services”, and then finally click the delete button to delete it. '], 
            3: ['How can I make my service be featured by Servify?', 'For now, featuring is not available.'], 
        },
        mobile: {
            1: ['Is there a mobile version of the platform?', 'Yes, there is a mobile version of Servify available in Android and iOS.'], 
            2: ['Can I manage everything from the application?', 'Yes, you can manage everything you need to publish, find, edit or review a service from the application.'], 
            3: ['How do I upload files from my smartphone or tablet to my publications?', 'You can upload files to your publications in the sixth step when you create the service, clicking the "Upload Image" button, or when you already havee created the service, but you would like to add more images, just go to your profile click on “My Services”, then upload the images you desire to add in the Edit page.'], 
        },
        account: {
            1: ['I forgot my password, how do I reset it?', 'If you forgot your password, go to the authentication page (or click the "Sign in" button above), click on “Forgot Password” then follow the instructions.'], 
            2: ['How can I change my account settings?', 'Go to your profile, click on "Edit Profile", and make your changes.'], 
        },
        privacy: {
            1: ['What do other users see on my profile?', 'First and foremost, your email address is kept private and can\'t be seen anywhere on the website. Other users will be able to see your profile image, your display name, your favorited services, and your reviews.'], 
            2: ['What information is needed to publish a service?', 'To publish a service you need your business category, subcategory if needed, service title, contact email, contact phone, a brief description of the service you are offering, and finally specify if your business has a physical location (If yes, you need to provide the address location), or if it is just delivery, or both!'], 
            3: ['Will my information be shared?', 'Not your personal information, just the "Contact Provider" information you provided while listing your service.'], 
        },
        contact: {
            1: ['How can I get in contact with Servify?', 'Go to our Contact page then select the most appropriate reason about why you want to get in contact with us, this is so that we may increase the time in which it may take us to respond.'], 
            2: ['I have a problem. How can I solve it?', 'To contact a service provider on Servify, just go to their service, click on “Contact Provider” which is located at the right side of the profile’s page. If you need to report an user, go to their user page then click the "Report this user" button. If you need to talk to us about something, go to the Contact page then follow the instructions.'], 
        }
}

class Help extends PureComponent {
    constructor (props) {
        super(props);
        this.myCategories = contactObj;
        Object.keys(contactObj).forEach( category => {
            Object.keys(category).forEach( question => {
                if (this.myCategories[category][question]) {
                    this.myCategories[category][question] = {
                        ...this.myCategories[category][question],
                        bIsOpen: false
                    }
                }
            });
        });
        this.state = {
            categories: this.myCategories,
        }
    }

    toggleAnswer = (category, question, id) => {
        this.setState( prevState => {
            return {
                categories: {
                    ...prevState.categories,
                    [category]: {
                        ...prevState.categories[category],
                        [question]: {
                            ...prevState.categories[category][question],
                            bIsOpen: !prevState.categories[category][question].bIsOpen 
                        }
                    }
                }
            }
        });
        if (document.getElementById(id) && !isElementInViewport(document.getElementById(id))) {
            const el = document.getElementById(id);
            window.scrollTo({
                top: el.offsetTop - 105,
                left: null,
                behavior: 'smooth'
            });
        }
    }

    filterCategories = (searchBarValue) => {
        const categories = Object.assign(contactObj);
        const filteredCategories = {}; // Declaring filtered categories object
        // Looping through each key of the categories object
        Object.keys(categories).forEach( key => {
            // Filtered category array
            const filteredArr =  (
                Object.values(categories[key]).filter( question => {
                    // Filter bool result
                    let bIsMatch = false;
                    // Declaring the question's title and question answer to be used for filtering
                    const questionTitle = question[0].toLowerCase();
                    const questionAnswer = question[1].toLowerCase();
                    // Search word array declaration. Splits each word into an array element. We will 
                    // be looping through each word and see if the questions have these words
                    const searchWords = searchBarValue.toLowerCase().split(/\s+/g)
                        .map(string => {
                            return string.trim();
                        });
                    // For loop for every word in the searchWords array
                    for (let i = 0; i < searchWords.length; i++) {
                        /**
                         * If the title of the answer of the question include the searched [i] word,
                         * bIsMatch is true, otherwise if it's not included then bIsMatch is false and
                         * the loop is broken.
                         */
                        if (questionTitle.includes(searchWords[i]) || questionAnswer.includes(searchWords[i])) {
                            bIsMatch = true;
                            continue;
                        } else {
                            bIsMatch = false;
                            break;
                        }
                    }
                    return bIsMatch;
                })
            );
            // If the array is not empty, then it will be returned into the filtered categories object. If it's empty, 
            // then it will simply not exist in the filtered object, therefore it won't be displayed in the sidepanel.
            if (filteredArr.length > 0) { filteredCategories[key] = filteredArr; }
        });
        this.setState( () => {
            return {
                categories: filteredCategories
            }
        });
    }

    render () {
        return (
            <div className={classes.Wrapper}>
                <SidePanel 
                    categories={this.state.categories}
                    filterCategories={this.filterCategories}
                    toggleAnswer={this.toggleAnswer} />
                <Container 
                    categories={this.state.categories}
                    toggleAnswer={this.toggleAnswer} />
            </div>
        )
    }
}

export default Help;