Package.describe({
  name: "lorikarikari:accounts-mixer",
  version: "1.0.0",
  summary: "A login service for Mixer",
  git: "https://github.com/LoriKarikari/meteor-accounts-mixer",
  documentation: "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom("1.8.1");
  api.use("ecmascript");
  api.mainModule("accounts-mixer.js");

  api.use("accounts-base", ["client", "server"]);
  api.imply("accounts-base");
  api.use("accounts-oauth", ["client", "server"]);

  api.use("oauth", ["client", "server"]);
  api.use("oauth2", ["client", "server"]);
  api.use("http", ["server"]);
  api.use("random", "client");
  api.use("service-configuration", ["client", "server"]);

  api.addFiles("accounts-mixer-client.js", "client");
  api.addFiles("accounts-mixer-server.js", "server");

  api.export("Mixer");
});
