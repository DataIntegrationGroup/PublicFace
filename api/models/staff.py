# ===============================================================================
# Copyright 2023 ross
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ===============================================================================
from datetime import datetime
from typing import Optional

from sqlalchemy import func
from sqlmodel import SQLModel, Field, Session


class Staff(SQLModel, table=True):
    slug: str = Field(default=None, primary_key=True)
    name: str
    email: Optional[str] = ''
    phone: Optional[str] = ''
    photo: Optional[str] = ''
    bio: Optional[str] = ''
    created_at: Optional[datetime] = Field(default=func.now())
    updated_at: Optional[datetime] = Field(default=func.now())
    active: bool = True

    @classmethod
    def get_by_slug(cls, db: Session, slug: str):
        return db.query(cls).filter(cls.slug == slug).first()

    @classmethod
    def get_all(cls, db: Session):
        return db.query(cls).all()

    @classmethod
    def create(cls, db: Session, **kwargs):
        staff = cls(**kwargs)
        db.add(staff)
        db.commit()
        db.refresh(staff)
        return staff

    @classmethod
    def update(cls, db: Session, id: int, **kwargs):
        staff = db.query(cls).filter(cls.id == id).first()
        for k, v in kwargs.items():
            setattr(staff, k, v)
        db.commit()
        db.refresh(staff)
        return staff

    @classmethod
    def delete(cls, db: Session, id: int):
        staff = db.query(cls).filter(cls.id == id).first()
        staff.active = False
        db.commit()
        db.refresh(staff)
        return staff
# ============= EOF =============================================
