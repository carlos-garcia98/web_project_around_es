export class Api {
  private _URL: string;
  private _TOKEN: string;

  constructor() {
    this._URL = "https://around-api.es.tripleten-services.com";
    this._TOKEN = "65f7b6bc-80d5-4e30-8b61-55dcc05ca3fc";
  }

  async getUserInfo() {
    const response: Response = await fetch(
      `${this._URL}/v1/users/me`,
      {
        method: "GET",
        headers: {
          authorization: this._TOKEN
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  }

  async updateUserInfo(name: string, job: string, avatar: string) {
    try {
      const response: Response = await fetch(
      `${this._URL}/v1/users/me`,
      {
        method: "PATCH",
        headers: {
          authorization: this._TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          about: job,
          avatar: avatar
        })
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



  async getCards() {
    const response: Response = await fetch(
      `${this._URL}/v1/cards`,
      {
        method: "GET",
        headers: {
          authorization: this._TOKEN
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  }

  async addCard(name: string, link: string) {
    const response: Response = await fetch(
      `${this._URL}/v1/cards`,
      {
        method: "POST",
        headers: {
          authorization: this._TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  }

  async deleteCard(cardId: string) {
    const response: Response = await fetch(
      `${this._URL}/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._TOKEN,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  }

  async addLike(cardId: string) {
    const response: Response = await fetch(
      `${this._URL}/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  }

  async removeLike(cardId: string) {
    const response: Response = await fetch(
      `${this._URL}/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  }
}