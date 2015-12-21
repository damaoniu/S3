Package.describe({
	name:"maoniu:s3",
	summary: "Upload files to S3. Allows use of Knox Server-Side. this is a fork of lepozepo:s3 with authorization configuration",
	version:"1.0.0",
	git:"https://github.com/damaoniu/S3.git"
});

Npm.depends({
	knox: "0.9.2",
	"stream-buffers":"2.1.0",
	"aws-sdk":"2.1.14"
});

Package.on_use(function (api) {
	api.versionsFrom('METEOR@1.0');

	api.use(["meteor-base@1.0.1","service-configuration"], ["client", "server"]);
	api.use(["check","random"], ["client","server"]);

	// Client
	api.add_files("client/functions.js", "client");

	// Server
	api.add_files("server/startup.js", "server");
	api.add_files("server/sign_request.js", "server");
	api.add_files("server/delete_object.js", "server");

	//Allows user access to Knox
	api.export && api.export("Knox","server");

	//Allows user access to AWS-SDK
	api.export && api.export("AWS","server");
});
