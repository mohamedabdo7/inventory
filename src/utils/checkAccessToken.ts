const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function checkAccessToken() {
  const userToken = localStorage.getItem("access_token");

  const hasToken = !!userToken;

  let isExpire;
  if (userToken) {
    const decodedJwt = parseJwt(userToken);

    isExpire = decodedJwt?.exp * 1000 < Date.now();
  }

  return { isExpire, hasToken };
}

export default checkAccessToken;
