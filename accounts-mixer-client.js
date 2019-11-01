Mixer = {};

Mixer.requestCredential = (options, credentialRequestCompleteCallback) => {
  if (!credentialRequestCompleteCallback && typeof options === "function") {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  const config = ServiceConfiguration.configurations.findOne({
    service: "mixer"
  });
  if (!config) {
    credentialRequestCompleteCallback &&
      credentialRequestCompleteCallback(
        new ServiceConfiguration.ConfigError("Service not configured")
      );
    return;
  }

  const credentialToken = Random.secret();
  const loginStyle = OAuth._loginStyle("mixer", config, options);
  const requiredScope = ["channel:details:self"];

  let scope = (options && options.requestPermissions) || [
    "channel:details:self",
    "user:details:self"
  ];

  scopeSet = new Set(scope, requiredScope);
  scope = Array.from(scopeSet);

  const flatScope = scope.map(value => value).join("+");

  const loginUrl = `https://mixer.com/oauth/authorize?response_type=code&client_id=${
    config.clientId
  }&redirect_uri=${OAuth._redirectUri(
    "mixer",
    config
  )}&state=${OAuth._stateParam(
    loginStyle,
    credentialToken
  )}&scope=${flatScope}`;

  OAuth.launchLogin({
    loginService: "mixer",
    loginStyle,
    loginUrl,
    credentialRequestCompleteCallback,
    credentialToken
  });
};
