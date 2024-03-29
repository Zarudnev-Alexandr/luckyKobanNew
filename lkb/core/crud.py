from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func, text
from core import models, schemas, smtp

import random
import string
import jwt

import hashlib
from configs import salt, cases_photo_path, games_photo_path


def create_case(name, price, photo, db: Session):
    try:
        case = models.Cases(name=name, price=price)
        db.add(case)
        db.flush()
    except IntegrityError:
        raise HTTPException(400, "this name is used")
    path = cases_photo_path + str(case.id) + ".png"
    with open(path, 'wb') as f:
        f.write(photo)
    db.commit()


def create_game(name, photo, db: Session):
    try:
        game = models.Games(name=name)
        db.add(game)
        db.flush()
    except IntegrityError:
        raise HTTPException(400, "this name is used")
    path = games_photo_path + str(game.id) + ".png"
    with open(path, 'wb') as f:
        f.write(photo)
    db.commit()


def add_games_to_case(games_data: schemas.GamesToCase, db: Session):
    for game in games_data.games_id:
        case_game = models.CaseGame(case_id=games_data.case_id, game_id=game)
        db.execute(case_game)
    db.commit()


def add_keys(keys_data: schemas.Keys, db: Session):
    for key in keys_data.keys:
        new_key = models.Keys(game_id=keys_data.game_id, code=key, is_buy=False)
        db.add(new_key)
    db.commit()


def get_cases(db: Session):
    return db.query(models.Cases).all()


def get_case(case_id, db: Session):
    case = db.query(models.Cases).filter(models.Cases.id == case_id).first()
    if case is None:
        raise HTTPException(400, "invalid case id")
    return case


def get_game(game_id, db: Session):
    game = db.query(models.Games).filter(models.Games.id == game_id).first()
    if game is None:
        raise HTTPException(400, "invalid game id")
    return game


def add_case_to_user(buy_data: schemas.BuyData, db: Session):
    game_id = db.query(models.CaseGame.game_id).filter(models.CaseGame.case_id == buy_data.case_id).order_by(
        func.random()).first()[0]
    key = db.query(models.Keys).filter(models.Keys.game_id == game_id).first()
    db.query(models.Keys).filter(models.Keys.id == key.id).update({"is_buy": True})
    purchase = models.Purchases(user_id=buy_data.user_id, case_id=buy_data.case_id, key_id=key.id, is_open=False)
    db.add(purchase)
    db.commit()
    return key


def gen_code():
    letters = string.ascii_uppercase
    return ''.join(random.choice(letters) for i in range(5))


def check_code(code, user_id, db: Session):
    if code == db.query(models.Users.code).filter(models.Users.id == user_id).first()[0]:
        db.query(models.Users).filter(models.Users.id == user_id).update({"is_activate": True})
        db.commit()
        return
    raise HTTPException(400, "invalid code")


def change_code(user_id, db: Session):
    code = gen_code()
    db.query(models.Users).filter(models.Users.id == user_id).update({"code": code})
    db.commit()
    email = db.query(models.Users.email).filter(models.Users.id == user_id).first()[0]
    smtp.send_code(code, email)


def add_user(db: Session, user_data: schemas.UserCreate):
    md5 = hashlib.md5()
    md5.update((user_data.password + salt).encode('utf-8'))
    password_hash = md5.hexdigest()
    code = gen_code()
    try:
        user = models.Users(email=user_data.email, password_hash=password_hash, balance=0, is_activate=False, code=code)
        db.add(user)
        db.flush()
        token = jwt.encode({"user_id": user.id}, salt, algorithm="HS256")
        db.commit()

    except IntegrityError:
        raise HTTPException(400, "this email is already taken")
    smtp.send_code(code, user_data.email)
    return token


def sign_user(db: Session, user_data: schemas.UserCreate):
    md5 = hashlib.md5()
    md5.update((user_data.password + salt).encode('utf-8'))
    password_hash = md5.hexdigest()
    hash_in_db = db.query(models.Users.password_hash).filter(models.Users.email == user_data.email).first()
    if hash_in_db is None:
        raise HTTPException(401, "invalid email")
    if password_hash == hash_in_db[0]:
        user_id = db.query(models.Users.id).filter(models.Users.email == user_data.email).first()[0]
        token = jwt.encode({"user_id": user_id}, salt, algorithm="HS256")
        return token
    raise HTTPException(401, "invalid password")


def get_user(db: Session, user_id) -> schemas.UserInfo:
    user = db.query(models.Users.id, models.Users.email, models.Users.balance, models.Users.is_activate,
                    func.count(models.Purchases.id).label("cases_count")).join(models.Purchases, isouter=True).filter(
        models.Users.id == user_id).group_by(models.Users.id).first()
    if user is None:
        raise HTTPException(404, "user not found")
    return user


def check_email(db: Session, email):
    return db.query(models.Users.email).filter(models.Users.email == email).first() is not None
