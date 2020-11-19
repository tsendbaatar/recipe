export default class Likes {
  constructor() {
    this.Likes = [];
  }

  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };

    this.Likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.Likes.findIndex((el) => el.id === id);

    this.Likes.splice(index, 1);
  }

  isLike(id) {
    //if (this.likes.findIndex((el) => el.id === id) === -1) return false;
    //else return true;

    return this.Likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumberOfLikes() {
    return this.Likes.length;
  }
}
