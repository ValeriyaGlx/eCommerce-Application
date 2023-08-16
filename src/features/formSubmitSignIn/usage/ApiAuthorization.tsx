const url = process.env.REACT_APP_AUTH_URL;
const project = process.env.REACT_APP_PROJECT_KEY;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const host = process.env.REACT_APP_HOST;

// interface AccessToken {
//   access_token: string;
//   expires_in: number;
//   refresh_token: string;
//   scope: string;
//   token_type: string;
// }

export async function tokenRequest(email: string, password: string) {
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

export async function logInRequest(
  email: string,
  password: string,
  token: string,
) {
  const urlRequest = `${host}/final-app/login`;
  const authHeader = 'Bearer ' + token;
  try {
    const response = await fetch(urlRequest, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
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
