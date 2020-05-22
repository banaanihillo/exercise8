//const {v4: uniqueID} = require("uuid")
const {ApolloServer, gql} = require("apollo-server")
require("dotenv").config()

const mongoose = require("mongoose")
const Author = require("./models/authorSchema")
const Book = require("./models/bookSchema")
mongoose.set("useFindAndModify", false)
const mongoAddress = process.env.MONGODB_URI
mongoose.connect(mongoAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Successfully connected to Mongo")
    })
    .catch((error) => {
        console.log(`Could not connect to Mongo: ${error}`)
    })

let authors = [
    {
        name: "Robert Martin",
        id: "aaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbb",
        born: 1952
    },
    {
        name: "Martin Fowler",
        id: "758972057792dyauf785209752",
        born: 1963
    },
    {
        name: "Fyodor Dostoyevski",
        id: "097673908673890752897529d8925758290",
        born: 1821
    },
    {
        name: "Joshua Kerievsky",
        id: "d7d76d6d67d6d6d6d798d678d6d"
    },
    {
        name: "Sandi Metz",
        id: "a888888888888888888a7686a77aaaa"
    }
]

let books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        id: "a7a7a7a7a7a7a7a7a7a7a",
        genres: [
            "refactoring"
        ]
    },
    {
        title: "Agile Software Development",
        published: 2002,
        author: "Robert Martin",
        id: "abbb8888888e88e8e8e8",
        genres: [
            "agile",
            "patterns",
            "design"
        ]
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        id: "88947025209757",
        genres: [
            "refactoring"
        ]
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        id: "98989898988898797a787a77a",
        genres: [
            "refactoring",
            "patterns"
        ]
    },
    {
        title: "Practical Object-Oriented Design, an Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        id: "10928202890282820982829289282892",
        genres: [
            "refactoring",
            "design"
        ]
    },
    {
        title: "Crime and Punishment",
        published: 1866,
        author: "Fyodor Dostoyevski",
        id: "785678262y276461063171d617631a",
        genres: [
            "crime"
        ]
    },
    {
        title: "The Demon",
        published: 1872,
        author: "Fyodor Dostoyevski",
        id: "5555555a555555b5555555555b55555555a555555a35343a3",
        genres: [
            "revolution"
        ]
    }
]

const typeDefs = gql`
    type Book {
        title: String
        published: Int
        author: String
        id: ID
        genres: [String]
    }
    type Author {
        name: String
        id: ID
        born: Int
        bookCount: Int
    }
    type Query {
        bookCount: Int
        authorCount: Int
        allBooks(author: String, genre: String): [Book],
        allAuthors: [Author]
    }
    type Mutation {
        addBook(
            title: String
            author: String
            published: Int
            genres: [String]
        ): Book
        addAuthor(
            name: String
            bookCount: Int
        ): Author
        editAuthor(
            name: String
            setBornTo: Int
        ): Author
    }
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (_root, _args) => {
            /*
            if (args.genre) {
                books = books.filter(book => {
                    return book.genres.includes(args.genre.toLowerCase())
                })
            }
            if (books.find(book => book.author === args.author)) {
                return books.filter(book => book.author === args.author)
            } else {
                return Book.find({})
            }*/
            return Book.find({})
        },
        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: (root) => books.filter(book => book.author === root.name).length
    },
    Mutation: {
        addAuthor: (_root, args) => {
            const author = new Author({...args})
            return author.save()
        },
        addBook: (_root, args) => {
            /*
            Book.find({author: args.author})
                .then(() =>
                    console.log("Yup, this author already exists")
                )
                .catch(() => {
                    const author = new Author({name: args.author, bookCount: 1})
                    return author.save()
                })
            */
            const book = new Book({...args})
            return book.save()
        },
        editAuthor: async (_root, args) => {
            if (!authors.find(author => author.name === args.name)) {
                return null
            } else {
                const author = await Author.findOne({name: args.name})
                author.born = args.setBornTo
                return author.save()
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(() => {
    console.log("The server is running somewhere")
})
