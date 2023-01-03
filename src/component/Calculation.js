import Money from "./Money";
import "./Calculation.css";

function Calculation({ name, total }) {

    const totalFormatted = total > 0 ?
        <div><Money amount={total} /></div> :
        total === 0 ?
            <div>-</div> :
            <div className="negative">Owed (<Money amount={-total} />)</div>;

    return (
        <div className="calculation">
            <div>
                {name}
            </div>
            {totalFormatted}
        </div>
    );
}

export default Calculation;