import { Approve } from '../../models'

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Post[]}
 */
export const listConfirmed = async (req, res) => {
  try {
  	
    const confirmedPosts = await Approve.find({ owner: req.params.owner, buyer: req.params.buyer, data_id: req.params.data_id }).exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}

export const bybuyer = async (req, res) => {
  try {
  	
    const confirmedPosts = await Approve.find({ buyer: req.params.buyer }).exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}
