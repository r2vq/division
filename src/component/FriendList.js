import { useState } from "react";
import "./FriendList.css";

function FriendList({ friends, onAddFriend, onDeleteFriend, onEditFriend }) {
    const [isAdding, setAdding] = useState(false);
    const [editName, setEditName] = useState("");

    function onAdd(name) {
        if (friends.indexOf(name) < 0) {
            onAddFriend(name);
            setAdding(false);
        } else {
            window.alert(`Friend ${name} already exists. Check spelling and try again.`);
        }
    }

    function onEdit(oldName, newName) {
        onEditFriend(oldName, newName);
        setEditName("");
    }

    function onCancel() {
        setAdding(false);
    }

    function onCancelEdit() {
        setEditName("");
    }

    return (
        <div className="friendList">
            <div className="header">Friends</div>
            {friends.map(friend => (
                editName === friend ?
                    <FriendListAdder
                        key={friend}
                        buttonText="Save"
                        defaultName={friend}
                        onAdd={newName => { onEdit(friend, newName) }}
                        onCancel={onCancelEdit} /> :
                    <FriendListItem
                        key={friend}
                        onDeleteFriend={onDeleteFriend}
                        onEditFriend={setEditName}>
                        {friend}
                    </FriendListItem>
            ))}
            {isAdding && (
                <FriendListAdder
                    buttonText="Add"
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

function FriendListAdder({ buttonText, defaultName, onAdd, onCancel }) {
    const [editNameValue, setEditNameValue] = useState(defaultName || "");
    function handleChange(event) {
        setEditNameValue(event.target.value);
    }

    return <div className="editName">
        <input
            value={editNameValue}
            className="editNameInput"
            onChange={handleChange} />
        <div
            onClick={(e) => {
                e.stopPropagation();
                onAdd(editNameValue)
                setEditNameValue("");
            }}
            className="control add">{buttonText}</div>
        <div
            onClick={(e) => {
                e.stopPropagation();
                onCancel()
                setEditNameValue("");
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