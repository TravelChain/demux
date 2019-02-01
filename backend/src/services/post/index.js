import { Post, Market, User } from '../../models'

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Post[]}
 */
export const listConfirmed = async (req, res) => {
  try {
  	
    const confirmedPosts = await Post.find({ owner: req.params.owner, data_id: req.params.data_id }).exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}

export const byowner = async (req, res) => {
  try {
  	console.log(req.params)
    const confirmedPosts = await Post.find({ owner: req.params.owner }).exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}
