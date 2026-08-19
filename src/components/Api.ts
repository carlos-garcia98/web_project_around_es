export class Api {
  private _URL: string;
  private _TOKEN: string;

  constructor() {
    this._URL = "https://around-api.es.tripleten-services.com";
    this._TOKEN = "65f7b6bc-80d5-4e30-8b61-55dcc05ca3fc";
  }

  async getUserInfo(endpoint: string) {
    try {
      const response = await fetch(
        this._URL + endpoint,
        {
          method: "GET",
          headers: {
            authorization: this._TOKEN
          }
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }
}