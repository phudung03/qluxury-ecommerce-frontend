import React from "react";

const SimilarProductCard = () =>{
    return(
        <div><div className="group px-4 relative">
            <div className="card"
            
            >
                <img className="card-media object-top"
                 src={"https://qwatchluxury.com/wp-content/uploads/2024/03/dong-ho-nam-rolex-day-date-dinh-da-full-mat-ma-vang-cao-cap-nhat-rep-11-gm-40mm-1.jpg"} alt=""
                 
                 />
                
            </div>
            <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
                <div className="name">
                    <h1>Niky</h1>
                    <p>Blue Shirt</p>
                </div>
                <div className="price flex items-center gap-3">
                    <span className="font-sans text-gray-800">
                        400
                    </span>
                    <span className="thin-line-through text-gray-400">
                        999
                    </span>
                    <span className="text-[#00927c] font-semibold">
                        60%
                    </span>
                </div>
            </div>
        </div></div>
    )
}
export default SimilarProductCard