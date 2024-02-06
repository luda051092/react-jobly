import React from 'react';

const CompanyCard = ({ company }) => {
    return (
        <div>
            <h3>{company.name}</h3>
            <p>{company.description}</p>
        </div>
    );
};

export default CompanyCard;