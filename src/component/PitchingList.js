function PitchingList({ exceptions }) {
    return exceptions.length > 0 &&
        <div className="exceptions">
            <div className="header">Not Pitching In</div>
            {
                exceptions.map(exception => (
                    <PitchingListItem key={exception}>{exception}</PitchingListItem>
                ))
            }
        </div>;
}

function PitchingListItem({ children }) {
    return <div className="exception">{children}</div>
}

export default PitchingList;