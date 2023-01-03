import "./PurchaseAdderButton.css";

function PurchaseAdderButton({ onClick }) {
    return <div
        className="purchaseAdderButton"
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}>
        Add Purchase
    </div>
}

export default PurchaseAdderButton;