import jwt
from fastapi import Header, HTTPException
from jwt import DecodeError

from configs import salt


def get_info_token(authorization: str = Header()):
    try:
        user_data = jwt.decode(authorization, salt, algorithms=["HS256"])
    except DecodeError:
        raise HTTPException(401, "invalid token")
    return user_data["user_id"]
