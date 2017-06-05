const UserModel = require( '../models/user' )

exports.login = ( username, password ) => {
	return new Promise(( resolve, reject ) => {
		UserModel.findOne({ username: username, password: password }).then(( res, err ) => {
			if ( err ) {
				reject( err )
			} else {
				resolve( res )
			}
		})
	})
}
