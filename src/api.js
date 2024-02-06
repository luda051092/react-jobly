import axios from "axios";
import localStorageService from "./localStorageService";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  // Static method for making a generic API request.
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    // Set up the URL for the API call 
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get"
        ? data
        : {};

    try {
      // Use Axios to make the API call and return the response data
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // Handle API errors and log details
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async login(credentials) {
    const res = await this.request("login", credentials, "post");
    
    // Set token in the class and localStorage
    this.token = res.token;
    localStorageService.setToken(res.token);
    
    return res.token;
    
  }
  /**
   * Log out the user by clearing the token from the class and localStorage
   */
  static async logout() {
    this.token = null;
    localStorageService.removeToken(); // Remove token from localStorage
  }
  /**
   * Register a new user witht the provided user data. 
   */
  static async register(userData) {
    const res = await this.request("users", userData, "post");
    this.token = res.token;
    return res.token;
  }
  /** Get a list of all companies */
  static async getCompanyList() {
    let res = await this.request("companies");
    return res.companies;
  }
  /**Get details on a specific company by its handle */
  static async getCompanyDetails(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  /**Search for companies based on query string */
  static async searchCompanies(query) {
    let res = await this.request(`companies`, { search: query });
    return res.companies;
  }
  /**  Get a list of all jobs */
  static async getJobList() {
    let res = await this.request("jobs");
    return res.jobs;
  }
  /**Get details on a job by its ID */
  static async getJobDetails(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }
  /**Searuch for jobs based on query string */
  static async searchJobs(query) {
    let res = await this.request(`jobs`, { search: query });
    return res.jobs;
  }
  /**Register a new user with the provided user data */
  static async registerUser(userData) {
    let res = await this.request("users", userData, "post");
    return res.token;
  }
  /**Get details on specific user by their username */
  static async getUserDetails(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  /**Update details of specific user */
  static async updateUserDetails(username, userData) {
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }
  /**Apply for job with given job ID */
  static async applyForJob(jobId) {
    try {
      let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
      return { success: true, message: res.message };
    } catch (error) {
      console.error("Error applying for job:", error);
      return { success: false, error: error.response.data.error.message };
    }
  }
  /**Update profile of specific user */
  static async updateUserProfile(username, userData) {
    let res = await this.request(`users/${username}`, userData, 'patch');
    return res.user;
  }


}


JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;