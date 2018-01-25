class ProblemService {
  constructor(problems) {
    this.problems = problems;
    this.total = problems.length;
  }
  // @return Object
  getProblemItem(number) {
    for (let i = 0; i < this.total; i++) {
      if (this.problems[i].stat.frontend_question_id === number) {
        return this.problems[i];
      }
    }
    return null;
  }
  // @return String
  getProblemUrl(number) {
    const slug = this.getProblemProperty(number, 'slug');
    return leetcodeProblemUrl + slug;
  }
  // @return String, Number
  getProblemProperty(number, property) {
    const item = this.getProblemItem(number);
    const stat = item.stat;
    switch (property) {
      case 'level':
        return item.difficulty.level;
      case 'title':
        return stat.question__title;
      case 'slug':
        return stat.question__title_slug;
      case 'id':
        return stat.frontend_question_id;
      default:
        throw new Error('没有这个属性喔qwq');
    }
  }
  // @return Number
  getARandomProblemId() {
    const min = 1;
    const max = this.total;
    return Math.ceil(Math.random() * (max - min) + min);
  }
  getARandomProblemInfo() {
    const id = this.getARandomProblemId();
    console.log(id)
    return {
      id: id,
      level: this.getProblemProperty(id, 'level'),
      title: this.getProblemProperty(id, 'title'),
      slug: this.getProblemProperty(id, 'slug'),
    }
  }
}

module.exports = ProblemService;
