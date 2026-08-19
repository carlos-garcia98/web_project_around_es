export class UserInfo {
    _userNameElement;
    _userJobElement;
    constructor({ nameSelector, jobSelector }) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userJobElement = document.querySelector(jobSelector);
    }
    getUserInfo() {
        const userData = {
            name: this._userNameElement.textContent ?? "",
            job: this._userJobElement.textContent ?? ""
        };
        return userData;
    }
    setUserInfo({ name, job }) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = job;
    }
}
