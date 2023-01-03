import Purchase from "./Purchase";

function PurchaseList({ purchases, onDelete, onEdit, onSelect }) {
    return purchases.length > 0 &&
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
        </div>;
}

export default PurchaseList;