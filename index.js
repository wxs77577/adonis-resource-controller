'use strict'

const _ = require('lodash')

/**
 * Resourceful controller for interacting with resources
 */
class ResourceController {
  /**
   * Show a list of all resources.
   * GET resources
   */
  async index({ request, response, view, params, Model, auth }) {
    const query = JSON.parse(request.input('query', '{}'))
    const data = Model.query(query).paginate(query.page || 1, query.perPage || 10)
    return data
  }

  /**
   * Render a form to be used for creating a new resource.
   * GET resources/create
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new resource.
   * POST resources
   */
  async store({ request, response, Model }) {
    const model = await Model.create(request.all())
    return model
  }

  /**
   * Display a single resource.
   * GET resources/:id
   */
  async show({ params, request, response, view, Model, model }) {
    return model
  }

  /**
   * Render a form to update an existing resource.
   * GET resources/:id/edit
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update resource details.
   * PUT or PATCH resources/:id
   */
  async update({ params, request, response, Model, model }) {
    model.fill(request.all())
    await model.save()
    return model
  }

  /**
   * Delete a resource with id.
   * DELETE resources/:id
   */
  async destroy({ params, request, response, Model, model }) {
    await model.delete()
    return {}
  }

  async view({ Model }) {
    return {
      fields: _.omitBy(Model.fields, (field, name) => {
        return field.viewable === false
      })
    }
  }

  async grid({ Model }) {
    await Model.buildOptions()
    return {
      searchModel: {},
      searchFields: _.pickBy(Model.fields, 'searchable'),
      fields: _.omitBy(Model.fields, (field, name) => {
        return field.listable === false
      })
    }
  }

  async form({ Model }) {
    await Model.buildOptions()
    return {
      fields: _.omitBy(Model.fields, (field, name) => {
        return field.editable === false || ['_id', 'created_at', 'updated_at', '_actions'].includes(name)
      })
    }
  }
}

module.exports = ResourceController
