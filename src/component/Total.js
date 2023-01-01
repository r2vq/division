import { useMemo } from "react";
import Money from "./Money";
import "./Total.css";

function calculateTotalSpent(purchases) {
    return purchases.reduce((acc, curr) => acc + curr.amount, 0);
}

function Total({ purchases }) {
    const totalSpent = useMemo(() => calculateTotalSpent(purchases), [purchases]);

    return (
        <div
            className="total"
        >
            <div
                className="header"
            >
                Total spent
            </div>
            <div
                className="amount"
            >
                <Money
                    amount={totalSpent}
                />
            </div>
        </div>
    );
}

export default Total;