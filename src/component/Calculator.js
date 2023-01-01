import { useMemo } from "react";
import Calculation from "./Calculation";
import "./Calculator.css";
import Total from "./Total";

function calculateFriendSplit(purchases, friends) {
    const spends = friends.reduce((all, friend) => {
        all[friend] = 0;
        return all;
    }, {});
    purchases.forEach(purchase => {
        spends[purchase.spender] = Number(spends[purchase.spender]) + purchase.amount;
    });

    return friends.map(friend => {
        const total = -spends[friend] + purchases
            .map(purchase => {
                return {
                    exceptions: purchase.exceptions,
                    split: purchase.amount / (friends.length - purchase.exceptions.length)
                };
            })
            .reduce((acc, item) => {
                return acc + (item.exceptions.includes(friend) ? 0 : item.split);
            }, 0);
        return {
            name: friend,
            total: total
        }
    });
}

function Calculator({ purchases, friends }) {
    const friendSplits = useMemo(() => calculateFriendSplit(purchases, friends), [purchases, friends]);

    return (
        <>
            <Total
                purchases={purchases}
            />
            <div
                className="calculations"
            >
                {
                    friendSplits.map(friendSplit => (
                        <Calculation
                            key={friendSplit.name}
                            name={friendSplit.name}
                            total={friendSplit.total}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default Calculator;