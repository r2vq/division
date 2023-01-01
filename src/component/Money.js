function Money({ amount }) {
    const formatter = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    });
    return (
        <>
            {formatter.format(amount/100)}
        </>
    );
}

export default Money;