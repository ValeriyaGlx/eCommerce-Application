const url = process.env.REACT_APP_AUTH_URL;
const project = process.env.REACT_APP_PROJECT_KEY;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export async function authorize(email: string, password: string) {
  const urlRequest = `${url}/oauth/${project}/customers/token`;
  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', email);
  body.append('password', password);
  const authHeader = 'Basic ' + btoa(clientId + ':' + clientSecret);
  try {
    const response = await fetch(urlRequest, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });
    if (!response.ok) {
      return response.status;
    } else {
      return await response.json();
    }
  } catch (error) {
    throw error;
  }
}
