import React from 'react';

export default function CircleLineSkeleton({ lineCount = 2 }) {

    return (
        <div>
            <div className="circle"></div>
            {
                [...Array(lineCount)].map((_, index) => (
                    <div className="line" key={index}></div>
                ))
            }
        </div>

    )
}
