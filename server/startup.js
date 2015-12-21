var AWS, Knox;

Knox = Npm.require("knox");

AWS = Npm.require("aws-sdk");

this.S3 = {
    config: {},
    knox: {},
    aws: {}
};

Meteor.startup(function() {
    if (!_.has(S3.config, "key")) {
        console.log("S3: AWS key is undefined");
    }
    if (!_.has(S3.config, "secret")) {
        console.log("S3: AWS secret is undefined");
    }
    if (!_.has(S3.config, "bucket")) {
        console.log("S3: AWS bucket is undefined");
    }
    if (!_.isFunction(S3.config.uploadAuthorize)) {
        console.log("need to configure an authorize function");
    }
    if (!_.isFunction(S3.config.deleteAuthorize)) {
        console.log("need to configure an authorize function");
    }
    if (!_.has(S3.config, "bucket") || !_.has(S3.config, "secret") || !_.has(S3.config, "key")) {
        return;
    }
    _.defaults(S3.config, {
        region: "us-east-1",
        uploadAuthorize:function(){
            if(Meteor.userId()==null)
            return;
        },
        deleteAuthorize:function(path){
            if(Meteor.userId()==null)
                return;
        }
    });
    S3.knox = Knox.createClient(S3.config);
    return S3.aws = new AWS.S3({
        accessKeyId: S3.config.key,
        secretAccessKey: S3.config.secret,
        region: S3.config.region
    });
});

// ---
// generated by coffee-script 1.9.2