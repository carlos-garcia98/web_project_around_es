import type { CardData, CardFormData, UserFormData, AvatarFormData,UserData } from "../utils/constants.js";
interface ApiConfig {
  baseUrl: string;
  headers: {
    authorization: string;
    "Content-Type": string;
  }
}

export class Api {
  private _URL: string;
  private _TOKEN: string;

  constructor(configObj: ApiConfig) {
    this._URL = configObj.baseUrl;
    this._TOKEN = configObj.headers.authorization;
  }

  async getUserInfo(): Promise<UserData> {
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

  async updateUserInfo({name, about}: UserFormData): Promise<UserData> {
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
            about: about
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
  }

  async updateAvatar({avatar}: AvatarFormData): Promise<UserData> {
    const response: Response = await fetch(
      `${this._URL}/v1/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: this._TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatar: avatar
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  }

  async getCards(): Promise<CardData[]> {
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

  async addCard({name, link}: CardFormData): Promise<CardData> {
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

  async deleteCard(cardId: string): Promise<void> {
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

  async addLike(cardId: string): Promise<CardData> {
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

  async removeLike(cardId: string): Promise<CardData> {
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