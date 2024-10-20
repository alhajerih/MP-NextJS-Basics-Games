import React from 'react'

function PurchaseMenu({netWorth, handlePurchase}) {
const purchaseItems = [
    { id: 1, name: 'Car', price: 100000, img: 'Purchases/car-svgrepo-com.svg' },
    { id: 2, name: 'Dog', price: 1000, img: 'Purchases/dog-svgrepo-com.svg' },
    { id: 3, name: 'Watch', price: 10000, img: 'Purchases/watch-round-svgrepo-com.svg' },
    { id: 4, name: 'Laptop', price: 5000, img: 'Purchases/laptop-minimalistic-svgrepo-com.svg' },
    { id: 5, name: 'House', price: 500000, img: 'Purchases/house-svgrepo-com.svg' },
    ];

  return (
    <div className="purchase-menu">
      <h3>~ RETAIL THERAPY~</h3>
      {purchaseItems.map((item) => (
        <div key={item.id} className="purchase-item">
          <img src={item.img} alt={item.name} width={50} height={50} />
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <button
            onClick={() => handlePurchase(item)}
            disabled={netWorth < item.price}
            style={{ cursor: netWorth < item.price ? 'not-allowed' : 'pointer' }}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}

export default PurchaseMenu
