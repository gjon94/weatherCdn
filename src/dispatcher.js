class Dispatcher {
  /**
   * Variables
   */
  defaultUrl = "";
  params = "";

  /**
   * Methods
   */
  setKey(key) {
    if (!key) {
      throw new Error("missed paramete for setting apikey");
    }

    this.defaultUrl += `&appid=${key}`;
  }

  /**
   *
   * @returns object
   */
  async search(obj) {
    this.searchConfig(obj);

    let finalUrl = (this.defaultUrl += this.params);

    const res = await fetch(finalUrl);
    const finalResult = {};
    finalResult.result = res.ok;
    finalResult.data = await res.json();
    this.params = "";
    console.log(finalResult);
    return finalResult;
  }

  searchConfig(obj) {
    for (const keyValue of Object.entries(obj)) {
      this.attachUrlParams(keyValue);
    }
  }

  attachUrlParams(keyValue) {
    const [key, val] = keyValue;

    switch (key) {
      case "city":
        this.params += `&q=${val}`;
        break;
      case "language":
        this.params += `&lang=${val}`;
      default:
        break;
    }
  }
}

export default Dispatcher;