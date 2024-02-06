import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api'; 

const CompanyDetails = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        // Fetch details of the specific company from the backend
        const fetchCompanyDetails = async () => {
            const companyDetails = await JoblyApi.getCompany(handle);
            setCompany(companyDetails);
        };

        fetchCompanyDetails();
    }, [handle]);

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{company.name}</h1>
            <p>Description: {company.description}</p>
        </div>
    );
};

export default CompanyDetails;