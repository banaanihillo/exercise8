const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
    PubSub
} = require("apollo-server")
const pajatso = require("jsonwebtoken")
require("dotenv").config()
const publishSubscription = new PubSub()

const mongoose = require("mongoose")
const Author = require("./models/authorSchema")
const Book = require("./models/bookSchema")
const User = require("./models/userSchema")
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

const JWT_SECRET = "shhhh please dont tell"

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
    type Author {
        name: String
        id: ID
        born: Int
        bookCount: Int
    }
    type User {
        userName: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
    }
    type Query {
        bookCount: Int
        authorCount: Int
        allBooks(author: String, genre: String): [Book],
        allAuthors: [Author]
        me: User
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
        createUser(
            userName: String!
            favoriteGenre: String!
        ): User
        login(
            userName: String!
            password: String!
        ): Token
    }
    type Subscription {
        bookAdded: Book!
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
        allAuthors: () => Author.find({}),
        me: (_root, _args, context) => {
            return context.currentlyLoggedIn
        }
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
        addAuthor: async (_root, args) => {
            const author = new Author({
                name: args.name,
                born: null
            })
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return author
        },
        addBook: async (_root, args, context) => {
            const currentlyLoggedIn = context.currentlyLoggedIn
            if (!currentlyLoggedIn) {
                throw new AuthenticationError("Log in first")
            }
            const author = await Author.findOne({name: args.name})
            let book = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres,
                author: author.id
            })
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            publishSubscription.publish("BOOK_ADDED", {
                bookAdded: book
            })
            return book
        },
        editAuthor: async (_root, args, context) => {
            const currentlyLoggedIn = context.currentlyLoggedIn
            if (!currentlyLoggedIn) {
                throw new AuthenticationError("Please log in")
            }
            const author = await Author.findOne({name: args.name})
            if (!author) {
                throw new UserInputError(
                    "Select a name first"
                )
            }
            author.born = args.setBornTo
            return author.save()
        },
        createUser: (_root, args) => {
            const user = new User({
                userName: args.userName,
                favoriteGenre: args.favoriteGenre
            })
            return user.save()
                .catch(error => {
                    throw new UserInputError(
                        `Some kind of mistake here: ${error}`
                    )
                })
        },
        login: async (_root, args) => {
            const user = await User.findOne({userName: args.userName})
            if (!user || args.password !== "ananas bananas") {
                throw new UserInputError("Incorrect log-in info")
            }

            const coinFlip = {
                userName: user.userName,
                id: user._id
            }
            return {value: pajatso.sign(coinFlip, JWT_SECRET)}
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => publishSubscription.asyncIterator(
                [
                    "BOOK_ADDED"
                ]
            )
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const authorization = (req)
            ? req.headers.authorization
            : null
        if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
            const decodedToken = pajatso.verify(
                authorization.substring(7), JWT_SECRET
            )
            const currentlyLoggedIn = await User.findById(decodedToken.id)
            return {currentlyLoggedIn}
        }
    }
})

server.listen().then(({url, subscriptionsUrl}) => {
    console.log(`The server is ready at ${url}`)
    console.log(`Subscriptions are ready at ${subscriptionsUrl}`)
})
