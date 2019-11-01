Accounts.oauth.registerService("mixer");

if (Meteor.isClient) {
  Meteor.loginWithMixer = (options, callback) => {
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(
      callback
    );
    Mixer.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ["services.mixer"],
    forOtherUsers: ["services.mixer.username", "services.mixer.avatarUrl"]
  });
}
