class Queue {
  constructor(dom, board) {
    this.data = [];
    this.words = {};
    this.verseWords = {};
    this.dom = dom;
    this.numberOfWords = 2;
    this.board = board;
  }

  get length() {
    return this.data.length;
  }

  moveWordToVerse(word) {
    this.verseWords[word.id] = word;
    delete this.words[word.id];
  }

  moveWordToQueue(word) {
    this.words[word.id] = word;
    delete this.verseWords[word.id];
  }

  addWords(count, offset, size) {
    console.log(`addWords: offset: ${offset}, size: ${size}`);
    for(let i = 0; i < count; i++){
      let random = Math.floor(Math.random() * this.data.length);

      // need offset and size
      let word = new Word(this.data[random], offset, size);

      this.words[word.id] = word;
      this.dom.appendChild(word.element);

      if(this.data[random].count > 0) {
        this.data[random].count = this.data[random].count - 1;
      } else {
        this.data.splice(random, 1);
      }
    }
    return words;
  }

  findWord(id) {
    console.log(`findWord: ${id}`);
    return this.words[id];
  }

  findVerseWord(id) {
    console.log(`findVerseWord: ${id}`);
    return this.verseWords[id];
  }
  //API Call
  fetchData() {
    console.log('fetching words')
    fetch('http://127.0.0.1:3000/books/1/words')
      .then(response => response.json())
      .then(json => {
        console.log('fetched');
        this.data = [...this.data, ...json];
        this.addWords(this.numberOfWords, 50, this.board.size);
      });
  }
}
