class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileDescription);
    }

    getUserInfo() {
      this._userData = {
        userName: this._name.textContent,
        userInfo: this._about.textContent,
      }
      return this._userData;
    }

    setUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.job;
    }

}

export default UserInfo;