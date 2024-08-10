import React, { useEffect, useState } from 'react'

export default function Subtotal({ iteam }) {

    const [price, setprice] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [iteam]);

    const totalAmount = () => {
        let price = 0;
        iteam.map((item) => {
            price += item.price.cost;
        });

        setprice(price);

    }
    return (
        <div className="sub_item">
            <h3>Subtotal  {iteam.length} iteams :<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong></h3>
        </div>
    )
}
