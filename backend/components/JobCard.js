import React from 'react';
import JoblyApi from './api';

const JobCard = ({ job, handleApply, hasApplied }) => {
    return (
        <div>
            {/* Display Job Information */}
            <h3>{job.title}</h3>
            <p>Company: {job.companyName}</p>
            <p>Description: {job.description}</p>
            <p>Salary: ${job.salary}</p>
            {/* Apply Button */}
            <button onClick={() => handleApply(job.id)} disabled={hasApplied}>
                {hasApplied ? 'Applied' : 'Apply'}
            </button>
        </div>
    );
};

export default JobCard;