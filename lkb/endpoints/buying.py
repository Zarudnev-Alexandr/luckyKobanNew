from fastapi import APIRouter, Depends, Request

from typing import List
from sqlalchemy.orm import Session
from yookassa import payment
from core.database import SessionLocal
from core import crud, payment
from core import schemas
from core.jwt_funcs import get_info_token

from core import smtp

router = APIRouter(tags=["Buying"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/buy/{case_id}', response_model=schemas.BuyOut)
async def get_url_for_buy(case_id, db: Session = Depends(get_db), user_id: str = Depends(get_info_token)):
    buy_data: schemas.BuyData = schemas.BuyData(user_id=user_id,
                                                case_id=case_id)
    user = crud.get_user(db, user_id)
    key = crud.add_case_to_user(buy_data, db)
    game = crud.get_game(key.game_id, db)
    smtp.send_key(key.code, user.email)
    return schemas.BuyOut(game_name=game.name, key=key.code)


@router.post('/buy/successful_pay', status_code=200, include_in_schema=False)
async def give_case(req: Request, db: Session = Depends(get_db)):
    data = await req.json()
    buy_data: schemas.BuyData = schemas.BuyData(user_id=data["object"]["metadata"]["user_id"],
                                                case_id=data["object"]["metadata"]["case_id"])
    crud.add_case_to_user(buy_data, db)

