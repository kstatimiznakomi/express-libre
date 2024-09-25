export class SearchParams {
    constructor(bookName,authorId,genreId,publisherId,date) {
        this.bookName = bookName
        this.authorId = authorId
        this.genreId = genreId
        this.publisherId = publisherId
        this.date = date
    }
}