
class BookDTO {
    constructor(args) {
        this.bookName = args.bookName
        this.id = args.id
        this.img = args.img
        this.description = args.description
        this.count = args.count
        this.publicDate = args.publicDate
        this.isbn = args.isbn
    }
    /*id: number;
    bookName: string;
    img: string;
    description: string;
    count: number;
    publicDate: number;
    isbn: string;*/
}

module.exports = BookDTO
