const uuid = require('uuid')

const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

const profileServices = require('../services/profiles.service')
const profileService = new profileServices()
const rolesServices = require('../services/roles.service')
const rolesService = new rolesServices()

class PublicationsService {
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

    const publications = await models.Publications.findAndCountAll(options)
    return publications
  }

  async createPublication({
    profile_id,
    publication_type_id,
    title,
    description,
    content,
    picture,
    city_id,
    image_url,
  } , userId) {
    const transaction = await models.sequelize.transaction()
    const profiles = await profileService.findOwnProfileByUserID(userId)
    const publicRole = await rolesService.findRoleByName('public')
    let profile = undefined
    for (let prof of profiles) {
      if (prof.role_id === publicRole.id) {
        profile = prof
      }
    }
    try {
      let newPublication = await models.Publications.create(
        {
          id: uuid.v4(),
          profile_id: profile.id,
          publication_type_id,
          title,
          description,
          content,
          picture,
          city_id,
          image_url,
        },
        { transaction }
      )

      await transaction.commit()
      return newPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getPublicationOr404(id) {
    let publication = await models.Publications.findByPk(id , {
      include: [
        {
          model: models.Profiles ,
          attributes: ['id' , 'image_url' , 'phone' , 'code_phone'] ,
          include: {
            model: models.Users ,
            as: 'User' ,
            attributes: ['id' , 'first_name' , 'last_name' , 'username']
          }
        } ,
        {
          model: models.Publications_types ,
          attributes: ['name']
        } ,
        {
          model: models.Cities ,
          attributes: ['name']
        }
      ]
    })

    return publication
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getPublication(id) {
    let publication = await models.Publications.findByPk(id, {
      raw: true,
    })
    return publication
  }

  async updatePublication(id, { name }) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication)
        throw new CustomError('Not found publication', 404, 'Not Found')

      let updatedPublication = await publication.update(
        {
          name,
        },
        { transaction }
      )

      await transaction.commit()

      return updatedPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removePublication(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication)
        throw new CustomError('Not found publication', 404, 'Not Found')

      await publication.destroy({ transaction })

      await transaction.commit()

      return publication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = PublicationsService
