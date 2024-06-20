import React from "react";
import Painting from "./Painting";

function PaintingsList ({paintings}) {
    const gallery = paintings.map((painting) => {
        return <Painting 
        key={painting.id}
        id={painting.id} 
        image={painting.image} 
        title={painting.title}
        sale_price={painting.sale_price}
        height={painting.height}
        width={painting.width}
        materials={painting.materials}
        sold={painting.sold}
        />
    })
    return ( 
        <div className="ui grid">
            <div className="ui centered stackable three link cards">
                {gallery}
            </div>
        </div>
    )
}

export default PaintingsList