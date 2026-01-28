import React from "react";

const ToastItem = React.memo(function ToastItem({ error, onClose }) {
    console.log("Render ToastItem:", error.id);

    return (
        <div className="toast">
            <span>Error: {error.message}</span>
            <button onClick={() => onClose(error.id)}>x</button>
        </div>
    );
});

export default ToastItem;
