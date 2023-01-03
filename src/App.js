import { useEffect, useState } from 'react';
import './App.css';
import Calculator from './component/Calculator';
import FriendList from './component/FriendList';
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

  function onAddFriend(friend) {
    setFriends([...friends, friend]);
  }

  function onDelete(purchase) {
    setPurchases(purchases.filter(
      current => current.id !== purchase.id
    ));
  }

  function onDeleteFriend(friend) {
    const confirmation = window.confirm(`Delete ${friend}? This will remove all their expenses too.`);
    if (confirmation) {
      setPurchases(purchases.filter(purchase => purchase.spender !== friend));
      setFriends(friends.filter(current => current !== friend));
    }
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

  function onEditFriend(oldName, newName) {
    setPurchases(purchases.mapIf(
      current => ({
        ...current,
        spender: newName
      }),
      current => current.spender === oldName
    ));
    setFriends(friends.mapIf(
      () => newName,
      current => current === oldName
    ))
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
    <div className="container">
      <FriendList
        friends={friends}
        onAddFriend={onAddFriend}
        onDeleteFriend={onDeleteFriend}
        onEditFriend={onEditFriend}
      />
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
    </div>
  );
}

// eslint-disable-next-line no-extend-native
Array.prototype.mapIf = function (mapper, conditional) {
  return this.map((item) => conditional(item) ? mapper(item) : item);
}

export default App;
