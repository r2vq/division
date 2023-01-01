import Total from "./Total";

function Calculator({ purchases, friends }) {

    return (
        <>
            <Total
                purchases={purchases}
            />
        </>
    );
}

export default Calculator;