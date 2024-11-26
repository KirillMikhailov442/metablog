type valueT = string | string[];

class LocalStorageService {
  public async get(key: string) {
    const isExists = await this.check(key);
    if (!isExists) {
      this.create(key, 'null');
    }
    let data = await localStorage.getItem(key);

    if (data) {
      data = await JSON.parse(data);
    }

    return await data;
  }

  public async create(key: string, value: valueT) {
    await localStorage.setItem(key, JSON.stringify(value));
    return 1;
  }

  public async check(key: string) {
    const isExists = (await localStorage.getItem(key)) ? true : false;
    return isExists;
  }

  public async has(key: string, value: valueT) {
    const isExists = await this.check(key);
    if (!isExists) {
      await this.create(key, value);
    }

    const isSimilar = (await this.get(key)) == value;
    return isSimilar;
  }

  public async change(key: string, value: valueT) {
    if (!(await this.check(key))) {
      await this.create(key, value);
    }

    await localStorage.setItem(key, JSON.stringify(value));
  }
}

export default new LocalStorageService();
