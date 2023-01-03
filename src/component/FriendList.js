import "./FriendList.css";

function FriendList({ friends, onDeleteFriend, onEditFriend }) {
    if (friends.length > 0) {
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
            </div>
        );
    }
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
                    onClick={() => onDeleteFriend(children)}>
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