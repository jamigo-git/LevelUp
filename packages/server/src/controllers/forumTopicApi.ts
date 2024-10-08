import { z } from 'zod'
import type { NextFunction, Request, Response } from 'express'
import forumTopicService from '../services/forumTopicService'
import BadRequestError from '../errors/BadRequestError'

interface TopicListOptions {
  offset?: string
  limit?: string
}

const forumTopicSchema = z.object({
  userId: z.number(),
  title: z.string().min(1),
  message: z.string().optional(),
})

const DEFAULT_LIMIT = 10
const DEFAULT_OFFSET = 0

class ForumTopicAPI {
  public static createTopic = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const forumTopic = forumTopicSchema.parse(request.body)
      const result = await forumTopicService.createTopic(forumTopic)
      return response.json(result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new BadRequestError(JSON.stringify({ error: error.errors })))
      }
      next(error)
    }
    return undefined
  }

  public static getTopic = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const topicId = parseInt(request.params.id, 10)
      const topic = await forumTopicService.getTopicById(topicId)
      return response.json(topic)
    } catch (error) {
      next(error)
    }
    return undefined
  }

  public static getTopicList = async (
    request: Request<unknown, unknown, unknown, TopicListOptions>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const limit = request.query.limit ? parseInt(request.query.limit, 10) : DEFAULT_LIMIT
      const offset = request.query.offset ? parseInt(request.query.offset, 10) : DEFAULT_OFFSET

      const data = await forumTopicService.getTopicList({ limit, offset })
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
    return undefined
  }
}

export default ForumTopicAPI
