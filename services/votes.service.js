const uuid = require('uuid')

const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

const profileServices = require('../services/profiles.service')
const profileService = new profileServices()
const rolesServices = require('../services/roles.service')
const rolesService = new rolesServices()

class VotesService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
      attributes: {
        exclude: [
          'VoteId',
          'ProfileId',
          'PublicationId',
          'created_at',
          'updated_at',
        ],
      },
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const votes = await models.Votes.findAndCountAll(options)
    return votes
  }

  async createOrRemoveVote({ publication_id, user_id }) {
    const transaction = await models.sequelize.transaction()
    const profiles = await profileService.findOwnProfileByUserID(user_id)
    const publicRole = await rolesService.findRoleByName('public')
    let profile = undefined
    try {
      for (let prof of profiles) {
        if (prof.role_id === publicRole.id) {
          profile = prof
        }
      }
      const isThereVotes = await models.Votes.findOne({
        where: {
          profile_id: profile.id
        }
      })

      if (!isThereVotes) {
        let newVote = await models.Votes.create(
          {
            id: uuid.v4() ,
            publication_id,
            profile_id: profile.id
          },
          { transaction }
        )

        await transaction.commit()
        return newVote
      } else if (isThereVotes) {
        const newVote = await models.Votes.destroy({
          where: {
            id : isThereVotes.id
          }
        } , {transaction})

        await transaction.commit()
        return newVote
      }

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getVoteOr404(id) {
    let vote = await models.Votes.findByPk(id)

    if (!vote) throw new CustomError('Not found Votes', 404, 'Not Found')

    return vote
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getVote(id) {
    let vote = await models.Votes.findByPk(id, { raw: true })
    return vote
  }

  async updateVote(id, { name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let vote = await models.Votes.findByPk(id)

      if (!vote) throw new CustomError('Not found vote', 404, 'Not Found')

      let updatedVote = await vote.update(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()

      return updatedVote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeVote(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let vote = await models.Votes.findByPk(id)

      if (!vote) throw new CustomError('Not found vote', 404, 'Not Found')

      await vote.destroy({ transaction })

      await transaction.commit()

      return vote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = VotesService
