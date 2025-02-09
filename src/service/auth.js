export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async signup(nickname, password, name, email, url) {
    return await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        nickname,
        password,
        name,
        email,
        url,
      }),
    });
  }
  async login(nickname, password) {
    return await this.http.fetch(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ nickname, password }),
    });
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
    });
  }

  async logout() {
    return this.http.fetch('/auth/logout', {
      method: 'POST',
    });
  }

  async csrfToken() {
    const res = await this.http.fetch('/auth/csrf-token', {
      method: 'GET',
    });
    return res.csrfToken;
  }
}
