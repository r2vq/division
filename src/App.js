import { useEffect, useState } from 'react';
import './App.css';
import Calculator from './component/Calculator';
import Purchase from './component/Purchase';
import sample from "./sample.json";

function App() {
  const [friends, setFriends] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    setFriends(sample.friends);
    setPurchases(
      sample
        .purchases
        .map(purchase => {
          return {
            isSelected: false,
            isEditing: false,
            ...purchase
          };
        })
    );
  }, []);

  function onDelete(purchase) {
    setPurchases(purchases.filter(
      current => current.id !== purchase.id
    ));
  }

  function onEdit(purchase) {
    setPurchases(purchases.mapIf(
      current => ({
        ...current,
        isEditing: true
      }),
      current => current.id === purchase.id
    ));
  }

  function onSelect(purchase) {
    setPurchases(purchases.mapIf(
      current => ({
        ...current,
        isSelected: !current.isSelected,
        isEditing: false
      }),
      current => current.id === purchase.id
    ));
  }

  return (
    <>
      <div className="purchases">
        {purchases.map(purchase => (
          <Purchase
            key={purchase.id}
            name={purchase.name}
            amount={purchase.amount}
            spender={purchase.spender}
            exceptions={purchase.exceptions}
            isSelected={purchase.isSelected}
            setSelected={() => onSelect(purchase)}
            onClickEdit={() => onEdit(purchase)}
            onClickDelete={() => onDelete(purchase)}
          />
        ))}
      </div>
      <Calculator
        purchases={purchases}
        friends={friends}
      />
    </>
  );
}

// eslint-disable-next-line no-extend-native
Array.prototype.mapIf = function (mapper, conditional) {
  return this.map((item) => conditional(item) ? mapper(item) : item);
}

export default App;
