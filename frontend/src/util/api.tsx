const request = (url: string, method: string, body: any = null): Promise<any> => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', 
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default request;