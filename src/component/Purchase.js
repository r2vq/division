import Money from "./Money";
import "./Purchase.css";

function Purchase({ name, amount, spender, exceptions }) {
    return (
        <div className="purchase-item">
            <div className="name">
                {name}
            </div>
            <div className="amount">
                <Money
                    amount={amount}
                />
            </div>
            <div className="spender">
                {spender}
            </div>
        </div>
    );
}

export default Purchase;