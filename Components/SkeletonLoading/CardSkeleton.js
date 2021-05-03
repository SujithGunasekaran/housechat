import React from 'react';

export default function CardSkeleton({ cardCount = 3, lineCount = 2 }) {

    return (
        <div>
            {
                [...Array(cardCount)].map((_, index) => (
                    <div className="card_skeleton" key={index}>
                        <div className="circle"></div>
                        {
                            [...Array(lineCount)].map((_, index) => (
                                <div className="line" key={index}></div>
                            ))
                        }
                    </div>
                ))
            }
        </div>

    )
}
