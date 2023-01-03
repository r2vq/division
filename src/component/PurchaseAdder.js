import { useState } from "react";
import "./PurchaseAdder.css";

function PurchaseAdder({ onAdd, onCancel, spenders }) {
    const [purchaseState, setPurchaseState] = useState("");
    const [spenderState, setSpenderState] = useState(spenders.length > 0 ? spenders[0] : "");
    const [amountState, setAmountState] = useState("");

    function onUpdatePurchaseState(e) {
        setPurchaseState(e.target.value);
    }

    function onUpdateSpenderState(e) {
        setSpenderState(e.target.value);
    }

    function onUpdateAmountState(e) {
        if (!isNaN(e.target.value)) {
            setAmountState(e.target.value);
        }
    }

    function onSaveClick() {
        if (purchaseState === "") {
            window.alert("Missing Purchase name");
            return;
        }

        if (spenderState === "") {
            window.alert("Missing spender name");
            return;
        }

        if (amountState === "") {
            window.alert("Missing amount");
            return;
        }

        onAdd(purchaseState, spenderState, Math.floor(amountState * 100));
    }

    return (
        <div className="purchaseAdder">
            <input
                onChange={onUpdatePurchaseState}
                placeholder="Purchase"
                value={purchaseState}
            />
            <select
                onChange={onUpdateSpenderState}
                value={spenderState}
            >
                {spenders.map(spender => (
                    <option key={spender}>{spender}</option>
                ))}
            </select>
            <input
                onChange={onUpdateAmountState}
                placeholder="Amount"
                value={amountState}
            />
            <div
                className="control"
                onClick={onSaveClick}>
                Save
            </div>
            <div
                className="control"
                onClick={onCancel}>
                Cancel
            </div>
        </div>
    );
}

export default PurchaseAdder;