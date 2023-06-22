let { users, posts } = require('./mock');
const lodash = require('lodash');

const resolvers = {
  User: {
    posts: (parent) => {
        return posts.filter((post) => post.userId === parent.id);
    }
  },
  UserResult: {
    __resolveType(obj){
        if (obj.result) {
            return "UserSuccessfulResult";
        }
        if (obj.errorId) {
            return "UserErrorResult";
        }
        return null; 
    }
  },
  Query: {
    users: () => {
        if (users) return {result: users};
        return { errorId: 'NULL-DATA', errorMessage: 'list user is null'}
    },
    user: (_, args) => {
        const id = args.id;
        const user = lodash.find(users, {id: Number(id)});
        return user;
    },
  },
  Mutation: {
    createUser: (_, args) => {
        const user = args.input;
        const newUserId = users[users.length - 1].id + 1;
        user.id = newUserId;
        users.push(user);
        return user;
    },
    deleteUser: (_, args) => {
        const id = args.id;
        const newListUser = lodash.filter(users, (user) => user.id !== Number(id));
        users = newListUser;
        return true;
    },
    updateUser: (_, args) => {
        let result = false;
        const {id, ...restUser} = args.input;
        users = users.map((user) => {
            if (user.id === Number(id)) {
                result = true;
                return {...user, ...restUser};
            }
            return user;
        });
        return result;
    }
  }
};

module.exports = {
    resolvers
};