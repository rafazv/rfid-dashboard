import { ILike } from 'typeorm';

export class QueryUtil {
  static searchQuery(columns, search) {
    if (!columns || columns.length <= 0) return {};

    const where = [];

    if (search) {
      where.pop();

      for (let i = 0; i < columns.length; i += 1) {
        where.push({
          [columns[i].column]: this.buildQuery(columns[i], search),
        });
      }
    }

    return where.length ? where : {};
  }

  private static buildQuery(prop, search) {
    if (prop.type === 'number') {
      return Number(search) || undefined;
    }

    return ILike(`%${search}%`);
  }
}
