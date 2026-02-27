const API_URL = 'https://carambar-jokes-j6nh.onrender.com/api/v1';

export const getRandomJoke = async () => {
    const response = await fetch(API_URL + '/jokes/random');
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(`${jsonResponse.message}: ${jsonResponse.data}`);
    };
    return jsonResponse.data;
};

export const getAllJokes = async () => {
    const response = await fetch(API_URL + '/jokes');
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(`${jsonResponse.message}: ${jsonResponse.data}`);
    };
    return jsonResponse.data;
};

export const getOneJoke = async (id) => {
    const response = await fetch(API_URL + `/jokes/${id}`);
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(`${jsonResponse.message}: ${jsonResponse.data}`);
    };
    return jsonResponse.data;
};

export const addJoke = async (joke) => {
    const response = await fetch(API_URL + '/jokes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(joke)
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(`${jsonResponse.message}: ${JSON.stringify(jsonResponse.data)}`);
    };
    return jsonResponse.data;
};