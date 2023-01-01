import "./Purchase.css";

function Purchase({ name, amount, spender }) {
    const dollars = Math.floor(amount / 100);
    const cents = String(amount % 100).padStart(2, 0);
    const formattedAmount = `$${dollars}.${cents}`;
    return (
        <div className="purchase-item">
            <div className="name">
                {name}
            </div>
            <div className="amount">
                {formattedAmount}
            </div>
            <div className="spender">
                {spender}
            </div>
        </div>
    );
}

export default Purchase;