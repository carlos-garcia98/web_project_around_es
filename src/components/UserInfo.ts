interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
  avatarSelector: string;
}

interface UserData {
  name: string;
  job: string;
  avatar: string;
}

export class UserInfo {
  private _userNameElement: HTMLElement;
  private _userJobElement: HTMLElement;
  private _userAvatarElement: HTMLImageElement;

  constructor({ nameSelector, jobSelector, avatarSelector }: UserInfoSelectors) {
    this._userNameElement = document.querySelector(nameSelector) as HTMLElement;
    this._userJobElement = document.querySelector(jobSelector) as HTMLElement;
    this._userAvatarElement = document.querySelector(avatarSelector) as HTMLImageElement;
  }

  getUserInfo(): UserData {
    const userData: UserData = {
      name: this._userNameElement.textContent ?? "",
      job: this._userJobElement.textContent ?? "",
      avatar: this._userAvatarElement.src ?? ""
    }

    return userData;
  }

  setUserInfo({ name, job, avatar }: UserData) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
    this._userAvatarElement.src = avatar;
  }
}