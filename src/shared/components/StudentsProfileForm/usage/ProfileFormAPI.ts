const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

function getProfileObject(res) {
  console.log(res);
  const profileInfo = {
    name: res.firstName,
    surname: res.lastName,
    date: res.dateOfBirth,
    email: res.email,
  };

  return profileInfo;
}

export async function getProfile(token: string) {
  const urlRequestProfile = `${host}/${project}/me`;

  const responseProfile = await fetch(urlRequestProfile, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const products = await responseProfile.json();

  return getProfileObject(products);
}
