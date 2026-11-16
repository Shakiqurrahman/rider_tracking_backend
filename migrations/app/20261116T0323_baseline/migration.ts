#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3acda02874fa8a3347092986ceafd22e963bed00497793651d6c5c74296738ff/contract';
import endContract from '../../snapshots/3acda02874fa8a3347092986ceafd22e963bed00497793651d6c5c74296738ff/contract.json' with { type: 'json' };
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

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Rider',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('telephone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('Rider_status_check_ee520df2', sql`"status" IN ('ACTIVE', 'INACTIVE')`),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'RidingAccount',
        columns: [
          col('accountEmail', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('accountPassword', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('deputyEmail', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('deputyPassword', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('documentNumber', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('riderId', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('telephone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'RidingAccount_status_check_ee520df2',
            sql`"status" IN ('ACTIVE', 'INACTIVE')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'RidingAccountAssignment',
        columns: [
          col('assignedAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('riderId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('ridingAccountId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('unassignedAt', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('isDeleted', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('USER'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('username', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('User_role_check_5b1978b5', sql`"role" IN ('ADMIN', 'USER')`),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'RidingAccount',
        constraint: 'RidingAccount_riderId_key',
        columns: ['riderId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_username_key',
        columns: ['username'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Rider',
        index: 'Rider_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'RidingAccountAssignment',
        index: 'RidingAccountAssignment_riderId_assignedAt_idx_4838f490',
        columns: ['riderId', 'assignedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'RidingAccountAssignment',
        index: 'RidingAccountAssignment_riderId_idx_966752c5',
        columns: ['riderId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'RidingAccountAssignment',
        index: 'RidingAccountAssignment_ridingAccountId_assignedAt_idx_692d188a',
        columns: ['ridingAccountId', 'assignedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'RidingAccountAssignment',
        index: 'RidingAccountAssignment_ridingAccountId_idx_3400c710',
        columns: ['ridingAccountId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'User',
        index: 'User_role_idx_2c1ddf83',
        columns: ['role'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Rider',
        foreignKey: {
          name: 'Rider_id_fkey',
          columns: ['id'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'RidingAccount',
        foreignKey: {
          name: 'RidingAccount_riderId_fkey',
          columns: ['riderId'],
          references: { schema: 'public', table: 'Rider', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'RidingAccountAssignment',
        foreignKey: {
          name: 'RidingAccountAssignment_ridingAccountId_fkey',
          columns: ['ridingAccountId'],
          references: { schema: 'public', table: 'RidingAccount', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'RidingAccountAssignment',
        foreignKey: {
          name: 'RidingAccountAssignment_riderId_fkey',
          columns: ['riderId'],
          references: { schema: 'public', table: 'Rider', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
