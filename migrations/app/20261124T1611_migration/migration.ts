#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3acda02874fa8a3347092986ceafd22e963bed00497793651d6c5c74296738ff/contract';
import startContract from '../../snapshots/3acda02874fa8a3347092986ceafd22e963bed00497793651d6c5c74296738ff/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d0049e13f8b8ae0e77ccc32ff19beed0103e2a0f69b846f5eccd7e4b692e671b/contract';
import endContract from '../../snapshots/d0049e13f8b8ae0e77ccc32ff19beed0103e2a0f69b846f5eccd7e4b692e671b/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Report',
        columns: [
          col('cancelledOrders', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('deliverDate', 'date', { notNull: true, codecRef: { codecId: 'pg/date-string@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('isDeleted', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('ordersDelivered', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('riderId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('totalHours', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Report_status_check_a4e4cb09',
            sql`"status" IN ('PENDING', 'COMPLETED', 'REJECTED')`,
          ),
        ],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Report',
        index: 'Report_riderId_deliverDate_isDeleted_idx_6455cdcc',
        columns: ['riderId', 'deliverDate', 'isDeleted'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Report',
        index: 'Report_riderId_idx_966752c5',
        columns: ['riderId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Report',
        foreignKey: {
          name: 'Report_riderId_fkey',
          columns: ['riderId'],
          references: { schema: 'public', table: 'Rider', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
