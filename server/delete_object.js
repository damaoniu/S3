var Future, e, errorMessage, future;

Future = Npm.require('fibers/future');

Meteor.methods({
    _s3_delete: function(path) {
        if(!S3.config.deleteAuthorize(path)){
            throw  new Meteor.Error('not allowed');
            return;
        } ;
        this.unblock();
        check(path, String),
        future = new Future();
        if(S3.config.denyDelete) {
            errorMessage = 'S3.denyDelete is true, so delete was blocked.';
            console.log(errorMessage);
            e = new Error(errorMessage);
            future.return(e);
        }else{
            console.log('deleting');
            S3.knox.deleteFile(path, function(e, r) {
                if (e) {
                    console.log(e);
                    return future.return(e);
                } else {
                    return future.return(true);
                }
            });
        }
        future.wait();
    }});