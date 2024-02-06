import React, { useState, useEffect } from 'react';
import JoblyApi from './api'; 

const CompanyList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch list of companies from the backend
        const fetchCompanies = async () => {
            const companyList = await JoblyApi.getCompanies(); // this needs a getCompanies method
            setCompanies(companyList);
        };

        fetchCompanies();
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <h1>Company List</h1>
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={handleSearchChange}
            />  
            <div>
                {companies.map((company) => (
                    <CompanyCard key={company.handle} company={company} />
                ))}
            </div>
        </div>
    );
};

export default CompanyList;