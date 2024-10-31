import apiFetch from "@wordpress/api-fetch";
import {addQueryArgs} from "@wordpress/url";

const fetchRequest  = (param, queryParams ) => {
    return apiFetch( { path: addQueryArgs(`/mopen_ai/v1/${param}`, queryParams )} );
};
export default fetchRequest
