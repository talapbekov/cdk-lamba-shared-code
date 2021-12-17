import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import {logger} from "./common/logger/logger";

const lowerCaseKeys = (obj: any) => {
  return Object.keys(obj).reduce((res, key) => {
    res[key.toLowerCase()] = obj[key]
    return res
  },{} as any)
}

export const handler = async(event:APIGatewayProxyEventV2):Promise<APIGatewayProxyResultV2> => {
  const { authorization } = lowerCaseKeys(event.headers || {});
  const { page, sort } = event.queryStringParameters || {};

  logger('HHHH')
  let statusCode = 200, resp = {
    hello: 'WORLD'
  };

  return {
    statusCode,
    body: JSON.stringify(resp),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
