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
from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import sessionmaker, declarative_base, declared_attr
from sqlmodel import Session, SQLModel

from settings import settings
print(settings.SQLALCHEMY_DATABASE_URL)
engine = create_engine(settings.SQLALCHEMY_DATABASE_URL)
session_factory = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()
from models.staff import Staff


def reset_database():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)

    # add defaults
    with Session(engine) as session:
        session.add_all(
            [
                Staff(slug="jake_ross", name="Jake Ross"),
                Staff(slug="julia_ricci", name="Julia Ricci"),
            ]
        )
        session.commit()



class Slugged:
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    @declared_attr
    def slug(cls):
        return Column(
            String(128), primary_key=True, unique=True, nullable=False, index=True
        )

    @declared_attr
    def name(cls):
        return Column(String(128), nullable=False, index=True)


def get_session():
    with Session(engine) as session:
        yield session


# ============= EOF =============================================
