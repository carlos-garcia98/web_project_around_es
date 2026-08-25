export class UserInfo {
    _userNameElement;
    _userAboutElement;
    _userAvatarElement;
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userAboutElement = document.querySelector(aboutSelector);
        this._userAvatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        const userData = {
            name: this._userNameElement.textContent ?? "",
            about: this._userAboutElement.textContent ?? "",
            avatar: this._userAvatarElement.src ?? ""
        };
        return userData;
    }
    setUserInfo({ name, about, avatar }) {
        this._userNameElement.textContent = name;
        this._userAboutElement.textContent = about;
        this._userAvatarElement.src = avatar;
    }
}
