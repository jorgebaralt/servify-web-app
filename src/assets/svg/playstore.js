import React from 'react';

const playstore = (props) => {
    return (
        <svg 
            x='0px' 
            y='0px' 
            viewBox='0 0 512 512'
            style={props.style ? props.style : { enableBackground: 'new 0 0 512 512' }}
            className={props.class}
            width={props.width ? props.width : '26px'} 
            height={props.height ? props.height : '26px'}>
            <g>
                <path fill='#32BBFF' d="M382.369,175.623C322.891,142.356,227.427,88.937,79.355,6.028   C69.372-0.565,57.886-1.429,47.962,1.93l254.05,254.05L382.369,175.623z" />
                <path fill='#32BBFF' d="M47.962,1.93c-1.86,0.63-3.67,1.39-5.401,2.308C31.602,10.166,23.549,21.573,23.549,36v439.96   c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314L302.012,255.98L47.962,1.93z" />
                <path fill='#32BBFF' d="M302.012,255.98L47.956,510.035c9.927,3.384,21.413,2.586,31.399-4.103   c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L302.012,255.98z" />
            </g>
            <path fill='#2C9FD9' d="M23.549,255.98v219.98c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314  L302.012,255.98H23.549z" />
            <path fill='#29CC5E' d="M79.355,6.028C67.5-1.8,53.52-1.577,42.561,4.239l255.595,255.596l84.212-84.212  C322.891,142.356,227.427,88.937,79.355,6.028z" />
            <path fill='#D93F21' d="M298.158,252.126L42.561,507.721c10.96,5.815,24.939,6.151,36.794-1.789  c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L298.158,252.126z" />
            <path fill='#FFD500' d="M488.45,255.98c0-12.19-6.151-24.492-18.342-31.314c0,0-22.799-12.721-92.682-51.809l-83.123,83.123  l83.204,83.205c69.116-38.807,92.6-51.892,92.6-51.892C482.299,280.472,488.45,268.17,488.45,255.98z" />
            <path fill='#FFAA00' d="M470.108,287.294c12.191-6.822,18.342-19.124,18.342-31.314H294.303l83.204,83.205  C446.624,300.379,470.108,287.294,470.108,287.294z" />
        </svg>
    );
}

export default playstore;