async function profUpdate (state, payload, blockInfo, context) {

const User = state.user

  try {
    console.log("on profupdate", payload)
    let user = await User.findOne(
        {username: payload.data.username,
          blockchain: process.env.BC
        }
    ).exec()
    console.log(user)
    
    if (user){
      user.meta = payload.data.meta
      await user.save()
  
    }
    
  } catch (err) {
    console.error(err)
  }
}

export default profUpdate
