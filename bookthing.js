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
   
    






const typeDefs = gql`
    type Book {
        title: String
        published: Int
        author: Author
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
            name: String
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
        allBooks: (_root, args) => {
            if (args.genre) {
                return Book.find({genres: {$in: args.genre}})
            }/*
            if (args.author) {
                return Book.find({author: {$in: args.author}})
            }*/
            return Book.find({})
        },
        allAuthors: () => Author.find({})
    },
    Book: {
        author: async (root) => {
            const authorObject = await Author.findOne({_id: root.author})
            return {
                name: authorObject.name,
                born: authorObject.born,
                _id: authorObject._id
            }
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({author: root._id})
            return books.length
        }
    },
    Mutation: {
        addAuthor: (_root, args) => {
            const author = new Author({
                name: args.name,
                born: null,
                _id: new mongoose.Types.ObjectId()
            })
            return author.save()
                .catch(error => {
                    console.log(error)
                })
        },
        addBook: async (_root, args) => {
            const author = await Author.findOne({name: args.name})
            let book = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres,
                author: author._id
            })

            return book.save()
        },
        editAuthor: async (_root, args) => {
            const author = await Author.findOne({name: args.name})
            if (!author) {
                console.log("Nothin' here")
                return null
            }
            author.born = args.setBornTo
            return author.save()
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
