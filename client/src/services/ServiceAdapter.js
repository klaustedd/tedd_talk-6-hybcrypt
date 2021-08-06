import axios from "axios";

const ServiceAdapter = axios.create({
    baseURL : "http://localhost:8000",
    timeout : 10000
});

export default ServiceAdapter;