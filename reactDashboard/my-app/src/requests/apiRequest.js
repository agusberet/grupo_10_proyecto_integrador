import axios from "axios";
import defaults from "./defaults";

const url = 'products/total';

const totalRequest = {
    getTotal: function() {
        return axios({
            ...defaults,
            method: 'get',
            url: `${url}`,
        });
    },
};

export default totalRequest;

