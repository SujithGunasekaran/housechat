import React from 'react';

export default function CardSkeleton({ cardCount = 3, lineCount = 2 }) {

    return (
        <div>
            {
                [...Array(cardCount)].map(() => (
                    <div className="card_skeleton">
                        <div className="circle"></div>
                        {
                            [...Array(lineCount)].map(() => (
                                <div className="line"></div>
                            ))
                        }
                    </div>
                ))
            }
        </div>

    )
}
