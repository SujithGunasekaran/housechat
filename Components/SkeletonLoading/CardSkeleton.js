import React from 'react';

export default function CardSkeleton({ cardCount = 3, columnSize = 8, lineCount = 2, isCircleNeeded = true }) {

    return (
        <>
            {
                [...Array(cardCount)].map((_, index) => (
                    <div className={`col-md-${columnSize} mx-auto`} key={index}>
                        <div className="card_skeleton">
                            {isCircleNeeded && <div className="circle"></div>}
                            {
                                [...Array(lineCount)].map((_, index) => (
                                    <div className="line" key={index}></div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>

    )
}
