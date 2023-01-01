import { useEffect, useState } from 'react';
import './App.css';
import Purchase from './component/Purchase';
import sample from "./sample.json";

function App() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    setPurchases(sample.purchases);
  }, []);

  return (
    <>
      <div className="purchases">
        {purchases.map(purchase => (
          <Purchase
            key={purchase.id}
            name={purchase.name}
            amount={purchase.amount}
            spender={purchase.spender}
          />
        ))}
      </div>
    </>
  );
}

export default App;
