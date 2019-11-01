AccountsMixer = {};

Oauth.registerService("mixer", 2, null, query => {
  const response = getTokenResponse(query);
  const accessToken = response.access_token;
  const user = getUser(accessToken);
  const serviceData = Object.assign(user, { accessToken });

  return {
    serviceData,
    options: {
      profile: { name: user.username },
      services: { mixer: user }
    }
  };
});

var getTokenResponse = ({ code }) => {
  const config = ServiceConfiguration.configurations.findOne({
    service: "mixer"
  });

  if (!config) throw new ServiceConfiguration.ConfigError();

  let response;

  try {
    response = HTTP.post("https://mixer.com/api/v1/oauth/token", {
      params: {
        code,
        client_id: config.clientId,
        redirect_uri: OAuth._redirectUri("mixer", config),
        client_secret: OAuth.openSecret(config.secret),
        grant_type: "authorization_code"
      }
    });

    if (response.error) throw response.error;
    if (typeof response.content === "string")
      response.content = JSON.parse(response.content);
    if (response.content.error) throw response.content;
  } catch (err) {
    throw _.extend(
      new Error(
        `Failed to complete OAuth handshake with Mixer. ${err.message}`
      ),
      { response: err.response }
    );
  }
  return response.content;
};

const getUser = accessToken => {
  try {
    return HTTP.get("https://mixer.com/api/v1/users/current", {
      headers: { Authorization: `OAuth ${accessToken}` }
    }).data;
  } catch (err) {
    throw Object.assign(
      new Error(`Failed to fetch identity from Mixer. ${err.message}`),
      { response: err.response }
    );
  }
};

AccountsMixer.retrieveCredential = (credentialToken, credentialSecret) =>
  Oauth.retrieveCredential(credentialToken, credentialSecret);
