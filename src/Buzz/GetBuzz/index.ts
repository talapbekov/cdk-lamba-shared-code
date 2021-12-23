import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import {logger} from "./common/logger/logger";
import {SomeCommonType} from "./common/types/abc";

const lowerCaseKeys = (obj: any) => {
  return Object.keys(obj).reduce((res, key) => {
    res[key.toLowerCase()] = obj[key]
    return res
  },{} as any)
}

export const handler = async(event:APIGatewayProxyEventV2):Promise<APIGatewayProxyResultV2> => {
  const { authorization } = lowerCaseKeys(event.headers || {});
  const { page, sort } = event.queryStringParameters || {};

  // using shared linked type
  const value: SomeCommonType = {
    x: 23,
    y: 23,
  }

  // using shared linked code
  logger('HHHH')
  let statusCode = 200, resp = {
    hello: 'WORLD',
    value
  };

  return {
    statusCode,
    body: JSON.stringify(resp),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
