import Money from "./Money";
import PitchingList from "./PitchingList";
import "./Purchase.css";
import PurchaseControls from "./PurchaseControls";

function Purchase({ name, amount, spender, exceptions, isSelected, setSelected, onClickEdit, onClickDelete }) {
    return (
        <div
            className={`purchase-item${isSelected ? " selected" : " hidden"}`}
            onClick={(e) => {
                e.stopPropagation();
                setSelected();
            }}>
            <div className="top">
                <div className="left">
                    <div className="name">{name}</div>
                    <div className="spender">{spender}</div>
                </div>
                <div className="right">
                    <div className="amount"><Money amount={amount} /></div>
                </div>
            </div>
            <div className="bottom">
                <PurchaseControls
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                />
                <PitchingList
                    exceptions={exceptions}
                />
            </div>
        </div>
    );
}

export default Purchase;