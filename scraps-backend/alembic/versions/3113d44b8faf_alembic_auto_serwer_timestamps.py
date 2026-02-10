"""alembic auto serwer timestamps

Revision ID: 3113d44b8faf
Revises: bb8a2289d959
Create Date: 2026-02-10 14:58:31.466463

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3113d44b8faf'
down_revision: Union[str, Sequence[str], None] = 'bb8a2289d959'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
            ALTER TABLE products
            ALTER COLUMN created_at SET DEFAULT NOW(),
            ALTER COLUMN updated_at SET DEFAULT NOW();
        """

    )
    op.execute(
            """
            CREATE OR REPLACE FUNCTION set_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trg_products_updated_at ON products;

            CREATE TRIGGER trg_products_updated_at
            BEFORE UPDATE ON products
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
"""
        )
    

def downgrade() -> None:
    op.execute(
        """
            ALTER TABLE products
            ALTER COLUMN created_at SET DEFAULT NULL,
            ALTER COLUMN updated_at SET DEFAULT NULL;
        """
    )
    op.execute(
        """
            DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
            DROP FUNCTION IF EXISTS set_updated_at();
        """
    )
