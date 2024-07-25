import axios from 'axios';
import { useState } from 'react';

export const useRequest = ({ url, method, body }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            return response.data;
        } catch (error) {
            console.error(error);
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops...</h4>
                    <ul className="my-0">
                        {error.map(e => <li key={e.message}>{e.message}</li>)}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};