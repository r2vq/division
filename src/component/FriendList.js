import { useRef, useState } from "react";
import "./FriendList.css";

function FriendList({ friends, onAddFriend, onDeleteFriend, onEditFriend }) {
    const [isAdding, setAdding] = useState(false);

    function onAdd(name) {
        if (friends.indexOf(name) < 0) {
            onAddFriend(name);
            setAdding(false);
        } else {
            window.alert(`Friend ${name} already exists. Check spelling and try again.`);
        }
    }

    function onCancel() {
        setAdding(false);
    }

    return (
        <div className="friendList">
            <div className="header">Friends</div>
            {friends.map(friend => (
                <FriendListItem
                    key={friend}
                    onDeleteFriend={onDeleteFriend}
                    onEditFriend={onEditFriend}>
                    {friend}
                </FriendListItem>
            ))}
            {isAdding && (
                <FriendListAdder
                    onAdd={onAdd}
                    onCancel={onCancel} />
            )}
            <div
                className="addButton"
                onClick={(e) => {
                    e.stopPropagation();
                    setAdding(true);
                }}>
                Add Friend
            </div>
        </div>
    );
}

function FriendListAdder({ onAdd, onCancel }) {
    const editNameInput = useRef();
    return <div className="editName">
        <input
            className="editNameInput"
            ref={editNameInput} />
        <div
            onClick={(e) => {
                e.stopPropagation();
                onAdd(editNameInput.current.value)
                editNameInput.current.value = "";
            }}
            className="control add">Add</div>
        <div
            onClick={(e) => {
                e.stopPropagation();
                onCancel()
                editNameInput.current.value = "";
            }}
            className="control cancel">Cancel</div>
    </div>;
}

function FriendListItem({ children, onDeleteFriend, onEditFriend }) {
    return (
        <>
            <div className="friendListItem">
                <div className="name">
                    {children}
                </div>
                <div
                    className="control delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFriend(children);
                    }}>
                    Delete
                </div>
                <div
                    className="control edit"
                    onClick={() => onEditFriend(children)}>
                    Edit
                </div>
            </div>
        </>
    );
}

export default FriendList;