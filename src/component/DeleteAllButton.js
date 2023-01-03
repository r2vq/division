import "./DeleteAllButton.css";

function DeleteAllButton({ onDeleteAll }) {

    function onClick(e) {
        e.stopPropagation();
        const confirmation = window.confirm("Are you sure? This will delete everything!");
        if (confirmation) {
            onDeleteAll();
        }
    }

    return <div
        className="deleteAll"
        onClick={onClick}
    >
        Delete All
    </div>
}

export default DeleteAllButton;