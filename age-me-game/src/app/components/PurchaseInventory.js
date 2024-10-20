import React from 'react'

function PurchaseInventory({ purchaseProps }) {
    return (
      <div className="purchase-inventory">
        <h3>Purchased Items</h3>
        <div className="purchase-grid">
          {purchaseProps.map((purchase, index) => (
            <div key={index} className="purchase-i">
              <img src={purchase} alt={`purchase ${index}`} width={50} height={50} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default PurchaseInventory;
  
