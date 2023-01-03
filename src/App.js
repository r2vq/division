import { useEffect, useState } from 'react';
import './App.css';
import Calculator from './component/Calculator';
import PurchaseList from './component/PurchaseList';
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
      <PurchaseList
        purchases={purchases}
        onDelete={onDelete}
        onEdit={onEdit}
        onSelect={onSelect}
      />
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
