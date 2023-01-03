import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Calculator from './component/Calculator';
import FriendList from './component/FriendList';
import PurchaseAdder from './component/PurchaseAdder';
import PurchaseAdderButton from './component/PurchaseAdderButton';
import PurchaseList from './component/PurchaseList';

function App() {
  const [friends, setFriends] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [isAddingPurchase, setAddingPurchase] = useState(false);

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

  function onPurchaseAdderAdd(name, spender, amount) {
    setPurchases([...purchases, {
      "id": uuid(),
      "name": name,
      "spender": spender,
      "amount": amount,
      "exceptions": []
    }]);
    setAddingPurchase(false);
  }

  function onPurchaseAdderCancel() {
    setAddingPurchase(false);
  }

  function onPurchaseAdderClick() {
    setAddingPurchase(true);
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
      {
        isAddingPurchase ?
          <PurchaseAdder
            onAdd={onPurchaseAdderAdd}
            onCancel={onPurchaseAdderCancel}
            spenders={friends}
          /> :
          <PurchaseAdderButton
            onClick={onPurchaseAdderClick}
          />
      }

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
