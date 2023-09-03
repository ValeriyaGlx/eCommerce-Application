import { store } from '../../../app/store/store';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

function getProfileData() {
  const profileStateInfo = store.getState().signup.signup;
  console.log(profileStateInfo);
  const data = {
    version: store.getState().profileVersion.version,
    actions: [
      {
        action: 'changeEmail',
        email: profileStateInfo.email.value,
      },
      {
        action: 'setFirstName',
        firstName: profileStateInfo.name.value,
      },
      {
        action: 'setLastName',
        lastName: profileStateInfo.surname.value,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: profileStateInfo.date.value,
      },
    ],
  };

  return data;
}

export async function updateProfile(token: string) {
  const urlRequest = `${host}/${project}/me`;

  const authHeader = 'Bearer ' + token;
  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(getProfileData()),
  });
  if (!response.ok) {
    return response.status;
  } else {
    return response.json();
  }
}
