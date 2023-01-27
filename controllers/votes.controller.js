const VotesService = require('../services/votes.service')
const PublicationsService = require('../services/publications.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const votesService = new VotesService()
const publicationsService = new PublicationsService()

const getVotes = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let votes = await votesService.findAndCount(query)
    const results = getPagingData(votes, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addVote = async (request, response, next) => {
  try {
    const user_id = request.user.id
    const publication_id = request.params.publication_id
    let vote = await votesService.createOrRemoveVote({user_id , publication_id})
    if (vote !== 1) {
      return response.status(201).json({ results: vote })
    } else {
      return response.status(200).json({message: `Vote from user:${request.user.username}, deleted`})
    }
  } catch (error) {
    next(error)
  }
}

const getVote = async (request, response, next) => {
  try {
    let { id } = request.params
    let votes = await votesService.getVoteOr404(id)
    return response.json({ results: votes })
  } catch (error) {
    next(error)
  }
}

const updateVote = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let vote = await votesService.updateVote(id, body)
    return response.json({ results: vote })
  } catch (error) {
    next(error)
  }
}

const removeVote = async (request, response, next) => {
  try {
    let { id } = request.params
    let vote = await votesService.removeVote(id)
    return response.json({ results: vote, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getVotes,
  addVote,
  getVote,
  updateVote,
  removeVote,
}
