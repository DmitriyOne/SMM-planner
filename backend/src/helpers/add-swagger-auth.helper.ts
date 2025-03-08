import { OpenAPIObject } from '@nestjs/swagger'
import { ENDPOINT_PUBLIC } from '../constants/endpoint.constant'

export const addSwaggerAuthToPrivateEndpoints = (document: OpenAPIObject) => {
  Object.keys(document.paths).forEach((path) => {
    const pathItem = document.paths[path]

    Object.keys(pathItem).forEach((method) => {
      const operation = pathItem[method]

      const isPublic = Object.values(ENDPOINT_PUBLIC).some(
        (endpoint) => endpoint.path === path && endpoint.method === method,
      )

      if (!isPublic) {
        operation.security = [{ bearerAuth: [] }]
      }
    })
  })
}
