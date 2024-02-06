import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';

const JobList = ({ handleApply, applications }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobList = await JoblyApi.getJobs();
        setJobs(jobList);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job List</h1>
      <div>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            handleApply={handleApply}
            hasApplied={applications.includes(job.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
