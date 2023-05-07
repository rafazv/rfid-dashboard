import { ILike } from 'typeorm';

export class QueryUtil {
  static searchQuery(columns, search, specificSearch = {}) {
    if (!columns || columns.length <= 0) return {};

    let filter = [];

    if (search) {
      for (let i = 0; i < columns.length; i += 1) {
        filter.push({
          [columns[i].column]: this.buildQuery(columns[i], search),
        });
      }
    }

    for (const prop in specificSearch) {
      if (specificSearch[prop]) {
        if (filter.length === 0) filter.push({});

        filter = filter.map((obj) => {
          obj[prop] = specificSearch[prop];
          return obj;
        });
      }
    }

    return filter.length ? filter : {};
  }

  private static buildQuery(prop, search) {
    if (prop.type === 'number') {
      return Number(search) || undefined;
    }

    return ILike(`%${search}%`);
  }
}
