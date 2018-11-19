const account = process.env.EOSIO_CONTRACT_ACCOUNT

function likepost (state, payload, blockInfo, context) {
  
  if (payload.data.to == account){
  	console.log("transfer: ", payload)
	
	  const post = {
	    _id: {
	      timestamp: payload.data.timestamp,
	      author: payload.data.author
	    }
	  }
	  context.socket.emit('likepost', post)
	}
}

export default likepost
