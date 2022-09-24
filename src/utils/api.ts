// TODO:api util functions
interface labelBody {
  name: string;
  color?: string;
}
interface newLabelBody {
  new_name?: string;
  color?: string;
  description?: string;
}
const api = {
  hostname: "https://api.github.com",
  owner: "LinHeMa",
  repo: "personal-project-github-issue",
  issueNumber: 1,

  async getListLabels() {
    try {
      const response = await fetch(
        `${this.hostname}/repos/${this.owner}/${this.repo}/issues/${this.issueNumber}`
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      throw "getListLabels有問題";
    } catch (error) {
      console.log(error);
    }
  },
  async createLabel(body: labelBody, token: string) {
    const headers = {
      accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${this.hostname}/repos/${this.owner}/${this.repo}/labels`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw "createLabel 有問題";
      }
    } catch (error) {
      console.log(error);
    }
  },
  async updateLabel(token: string, body: newLabelBody, labelName: string) {
    const headers = {
      accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${this.hostname}/repos/${this.owner}/${this.repo}/labels/${labelName}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(body),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      throw "createLabel有問題";
    } catch (error) {
      console.log(error);
    }
  },
  async deleteLabel(token: string, labelName: string) {
    const headers = {
      accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${this.hostname}/repos/${this.owner}/${this.repo}/labels/${labelName}`,
        {
          method: "DELETE",
          headers,
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      throw "createLabel有問題";
    } catch (error) {
      console.log(error);
    }
  },
};
export default api;
