export class UserInfo {
    _userNameElement;
    _userJobElement;
    _userAvatarElement;
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userJobElement = document.querySelector(jobSelector);
        this._userAvatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        const userData = {
            name: this._userNameElement.textContent ?? "",
            job: this._userJobElement.textContent ?? "",
            avatar: this._userAvatarElement.src ?? ""
        };
        return userData;
    }
    setUserInfo({ name, job, avatar }) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = job;
        this._userAvatarElement.src = avatar;
    }
}
