import React from 'react';

const chat = (props) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            version="1.1" 
            x="0px" 
            y="0px" 
            viewBox="0 0 299.99 299.99" 
            style={{enableBackground: 'new 0 0 299.99 299.99'}}
            className={props.className}
            width="18px" 
            height="18px">
            <g>
                <path d="M149.995,0C67.158,0,0,67.156,0,149.995S67.158,299.99,149.995,299.99c82.839,0,149.995-67.156,149.995-149.995    S232.834,0,149.995,0z M89.481,211.219l-37.176,9.959l10.177-37.973c-7.01-12.05-11.051-26.05-11.051-40.997    c0-45.074,36.541-81.618,81.62-81.618c45.071,0,81.615,36.544,81.615,81.618c0,45.074-36.544,81.62-81.615,81.62    C117.023,223.832,102.091,219.199,89.481,211.219z M247.76,236.976l-33.818-9.059c-11.477,7.257-25.057,11.474-39.63,11.474    c-10.39,0-20.271-2.142-29.248-5.999c45.064-5.9,79.981-44.527,79.981-91.177c0-13.518-2.959-26.351-8.216-37.926    c19.182,13.427,31.73,35.67,31.73,60.853c0,13.596-3.673,26.33-10.05,37.293L247.76,236.976z" fill="#484848" />
            </g>
        </svg>
    );
}

export default chat;