import React from "react";

function TypeFilter({ types, selectedType, setSelectedType }) {
    return (
        <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        >
            <option value="All">All Types</option>
            {types.map((type) => (
                <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
            ))}
        </select>
    );
}

export default TypeFilter;