
export const serverUrl = "https://www.adserving247.com";

export const sendLead = (endPoint, leadData) => {
    return postData(endPoint, leadData).then(res => {
        return res;
    });
};

export const postData = (url = '', data = {}) => {
    return fetch(serverUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: data,
    })
    .then(res => res.json())
    .catch(res => res);
};

export function csvJSON(csv) {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',')

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result
}