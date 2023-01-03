function PurchaseControls({ onClickEdit, onClickDelete }) {
    return <div className="controls">
        <PurchaseControl onClick={onClickEdit}>Edit</PurchaseControl>
        <PurchaseControl onClick={onClickDelete}>Delete</PurchaseControl>
    </div>
}

function PurchaseControl({ onClick, children }) {
    return <div onClick={(e) => {
        e.stopPropagation();
        onClick();
    }}>{children}</div>
}

export default PurchaseControls;