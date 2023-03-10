import { useState } from "react";
import "./PurchaseAdder.css";

function PurchaseAdder({ defaultAmount, defaultExcluded, defaultPurchase, defaultSpender, onAdd, onCancel, spenders }) {
    const [purchaseState, setPurchaseState] = useState(defaultPurchase || "");
    const [spenderState, setSpenderState] = useState(defaultSpender || (spenders.length > 0 ? spenders[0] : ""));
    const [amountState, setAmountState] = useState((defaultAmount / 100) || "");
    const [excludedState, setExcludedState] = useState(defaultExcluded || []);

    function onUpdateExcludedState(name, excluded) {
        const index = excludedState.indexOf(name);
        if (!excluded) {
            if (index < 0) {
                setExcludedState([...excludedState, name]);
            }
        } else {
            if (index >= 0) {
                setExcludedState(excludedState.filter(
                    current => current !== name
                ));
            }
        }
    }

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

        if (excludedState.length >= spenders.length) {
            window.alert("Somebody has to pay for this...");
            return;
        }

        onAdd(purchaseState, spenderState, Math.floor(amountState * 100), excludedState);
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
            <ExcludedList
                excluded={excludedState}
                onExclude={onUpdateExcludedState}
                spenders={spenders} />
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

function ExcludedList({ spenders, excluded, onExclude }) {
    function handleChange(e, spender) {
        e.stopPropagation();
        onExclude(spender, excluded.indexOf(spender) >= 0);
    }

    return (
        <div className="excludedList">
            <div className="header">Pitching In (for this purchase):</div>
            {
                spenders.map(spender => (
                    <div
                        key={spender}
                        onClick={(e) => { handleChange(e, spender) }}>
                        <input
                            type="checkbox"
                            checked={excluded.indexOf(spender) < 0}
                            onChange={(e) => { handleChange(e, spender) }}
                        />
                        {spender}
                    </div>
                ))
            }
        </div>
    );
}

export default PurchaseAdder;