interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private _userNameElement: HTMLElement;
  private _userJobElement: HTMLElement;

  constructor({ nameSelector, jobSelector}: UserInfoSelectors) {
    this._userNameElement = document.querySelector(nameSelector) as HTMLElement;
    this._userJobElement = document.querySelector(jobSelector) as HTMLElement;
  }

  getUserInfo(): UserData {
    const userData: UserData = {
      name: this._userNameElement.textContent ?? "",
      job: this._userJobElement.textContent ?? ""
    }

    return userData;
  }

  setUserInfo({ name, job }: UserData) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
  }
}