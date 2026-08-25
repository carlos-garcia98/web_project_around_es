interface UserInfoSelectors {
  nameSelector: string;
  aboutSelector: string;
  avatarSelector: string;
}

interface UserInfoData {
  name: string;
  about: string;
  avatar: string;
}

export class UserInfo {
  private _userNameElement: HTMLElement;
  private _userAboutElement: HTMLElement;
  private _userAvatarElement: HTMLImageElement;

  constructor({ nameSelector, aboutSelector, avatarSelector }: UserInfoSelectors) {
    this._userNameElement = document.querySelector(nameSelector) as HTMLElement;
    this._userAboutElement = document.querySelector(aboutSelector) as HTMLElement;
    this._userAvatarElement = document.querySelector(avatarSelector) as HTMLImageElement;
  }

  getUserInfo(): UserInfoData {
    const userData: UserInfoData = {
      name: this._userNameElement.textContent ?? "",
      about: this._userAboutElement.textContent ?? "",
      avatar: this._userAvatarElement.src ?? ""
    }

    return userData;
  }

  setUserInfo({ name, about, avatar }: UserInfoData) {
    this._userNameElement.textContent = name;
    this._userAboutElement.textContent = about;
    this._userAvatarElement.src = avatar;
  }
}