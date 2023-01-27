const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

class PublicationsTagsService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
      attributes: {
        exclude: ['updated_at', 'created_at'],
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

    const publicationsTags = await models.Publications_tags.findAndCountAll(
      options
    )
    return publicationsTags
  }

  async createPublicationTag({ name }) {
    const transaction = await models.sequelize.transaction()

    try {
      let newPublicationTag = await models.Publications_tags.create(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()
      return newPublicationTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getPublicationTagOr404(id) {
    let publicationTag = await models.Publications_tags.findByPk(id)

    if (!publicationTag)
      throw new CustomError('Not found publicationTag', 404, 'Not Found')

    return publicationTag
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getPublicationTag(id) {
    let publicationTag = await models.Publications_tags.findByPk(id, {
      raw: true,
    })
    return publicationTag
  }

  async updatePublicationTag(id, { name }) {
    const transaction = await models.sequelize.transaction()

    try {
      let publicationTag = await models.Publications_tags.findByPk(id)

      if (!publicationTag)
        throw new CustomError('Not found publicationTag', 404, 'Not Found')

      let updatedPublicationTag = await publicationTag.update(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()

      return updatedPublicationTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removePublicationTag(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let publicationTag = await models.Tags.findByPk(id)

      if (!publicationTag)
        throw new CustomError('Not found publicationTag', 404, 'Not Found')

      await publicationTag.destroy({ transaction })

      await transaction.commit()

      return publicationTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = PublicationsTagsService
