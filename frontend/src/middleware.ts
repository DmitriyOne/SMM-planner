import { NextRequest, NextResponse } from 'next/server';
import { AUTH_BASE_INVALID_DATA, AUTH_BASE_WWW_HEADER_NAME, AUTH_BASE_WWW_HEADER_VALUE, AUTH_UNAUTHORIZED_CODE, AUTH_UNAUTHORIZED_MSG } from './constants/auth.constant';
import { HEADERS_AUTHORIZATION } from './constants/headers.constant';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get(HEADERS_AUTHORIZATION);

  if (!authHeader) {
    return new NextResponse(AUTH_UNAUTHORIZED_MSG, {
      status: AUTH_UNAUTHORIZED_CODE,
      headers: { [AUTH_BASE_WWW_HEADER_NAME]: AUTH_BASE_WWW_HEADER_VALUE },
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials).split(':');
  const [username, password] = credentials;

  const validUsername = process.env.BASIC_AUTH_USERNAME;
  const validPassword = process.env.BASIC_AUTH_PASSWORD;

  if (username !== validUsername || password !== validPassword) {
    console.warn(AUTH_BASE_INVALID_DATA(username, password));
    
    return new NextResponse(AUTH_UNAUTHORIZED_MSG, {
      status: AUTH_UNAUTHORIZED_CODE,
      headers: { [AUTH_BASE_WWW_HEADER_NAME]: AUTH_BASE_WWW_HEADER_VALUE },
    });
  }

  return NextResponse.next();
}


