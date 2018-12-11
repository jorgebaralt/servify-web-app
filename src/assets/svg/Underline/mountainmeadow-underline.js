import React from 'react';

const mountainMeadowUnderline = (props) => {
    return (
        <svg 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="xMidYMid meet" 
            viewBox="0 0 210 20" 
            width="210" 
            height="20"
            style={{fill: 'transparent'}}>
            <defs>
                <path d="" id="b6XFDCkjKV"></path>
                <path d="M45.17 16.5C153.27 4.18 206.19 0.97 203.93 6.86C201.66 12.75 135.02 13.02 4 7.66" id="aoEHCql77"></path>
            </defs>
            <g>
                <g>
                    <g>
                        <g>
                            <use xlinkHref="#b6XFDCkjKV" opacity="1" floodColor="0" stroke="#000000" strokeWidth="1" strokeOpacity="1"></use>
                        </g>
                    </g>
                    <g>
                        <g>
                            <filter id="shadow8138377" x="-7" y="-7" width="223" height="35.5" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse">
                                <feFlood></feFlood>
                                <feComposite in2="SourceAlpha" operator="in"></feComposite>
                                <feGaussianBlur stdDeviation="1.41"></feGaussianBlur>
                                <feOffset dx="1" dy="1" result="afterOffset"></feOffset>
                                <feFlood floodColor="#021d17" floodOpacity="0.5"></feFlood>
                                <feComposite in2="afterOffset" operator="in"></feComposite>
                                <feMorphology operator="dilate" radius="1"></feMorphology>
                                <feComposite in2="SourceAlpha" operator="out"></feComposite>
                            </filter>
                            <path d="M45.17 16.5C153.27 4.18 206.19 0.97 203.93 6.86C201.66 12.75 135.02 13.02 4 7.66" id="hDO2nCzzF" fill="none" stroke="white" filter="url(#shadow8138377)"></path>
                        </g>
                        <use xlinkHref="#aoEHCql77" opacity="1" fill="#23bd99" floodColor="0"></use>
                        <g>
                            <use xlinkHref="#aoEHCql77" opacity="1" floodColor="0" stroke="#23bd99" strokeWidth="5" strokeOpacity="1"></use>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default mountainMeadowUnderline;