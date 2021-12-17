import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import {withDep} from "./common/withDep/withDep";

const lowerCaseKeys = (obj: any) => {
  return Object.keys(obj).reduce((res, key) => {
    res[key.toLowerCase()] = obj[key]
    return res
  },{} as any)
}

export const handler = async(event:APIGatewayProxyEventV2):Promise<APIGatewayProxyResultV2> => {
  const { authorization } = lowerCaseKeys(event.headers || {});
  const { page, sort } = event.queryStringParameters || {};

  let statusCode = 200, resp = {
    fizz: 'buzz'
  };

  withDep()

  return {
    statusCode,
    body: JSON.stringify(resp),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
