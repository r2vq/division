import "./PurchaseControls.css";

function PurchaseControls({ onClickEdit, onClickDelete }) {
    return <div className="purchaseControls">
        <PurchaseControl onClick={onClickEdit}>Edit</PurchaseControl>
        <PurchaseControl onClick={onClickDelete}>Delete</PurchaseControl>
    </div>
}

function PurchaseControl({ onClick, children }) {
    return (
        <div
            className="control"
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}>
            {children}
        </div>
    )
}

export default PurchaseControls;