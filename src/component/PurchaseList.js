import Purchase from "./Purchase";
import PurchaseAdder from "./PurchaseAdder";

function PurchaseList({ friends, purchases, onDelete, onEdit, onEditComplete, onSelect }) {
    return purchases.length > 0 &&
        <div className="purchases">
            {purchases.map(purchase => (
                purchase.isEditing ?
                    <PurchaseAdder
                        key={purchase.id}
                        defaultAmount={purchase.amount}
                        defaultExcluded={purchase.exceptions}
                        defaultPurchase={purchase.name}
                        defaultSpender={purchase.spender}
                        onAdd={(name, spender, amount, exceptions) => { onEditComplete({
                            "id": purchase.id,
                            "name": name,
                            "spender": spender,
                            "amount": amount,
                            "exceptions": exceptions
                        }) }}
                        onCancel={() => { onEdit(purchase, false) }}
                        spenders={friends}
                    /> :
                    <Purchase
                        key={purchase.id}
                        name={purchase.name}
                        amount={purchase.amount}
                        spender={purchase.spender}
                        exceptions={purchase.exceptions}
                        isSelected={purchase.isSelected}
                        setSelected={() => onSelect(purchase)}
                        onClickEdit={() => onEdit(purchase, true)}
                        onClickDelete={() => onDelete(purchase)}
                    />
            ))}
        </div>;
}

export default PurchaseList;