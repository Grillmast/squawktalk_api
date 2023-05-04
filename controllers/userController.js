const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({}).populate('friends').populate('thoughts');
            res.json(dbUserData);
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    // get one user by id
    async getUserById({ params }, res) {
        try {
            const dbUserData = await User.findOne({ _id: params.id }).populate('friends').populate('thoughts');
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            } else {
                res.json(dbUserData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // createUser
    async createUser( { body}, res) {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // updateUser
    async updateUser({ params, body}, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // deleteUser
    async deleteUser({ params }, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: params.id });
            if (!deletedUser) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // addFriend
    async addFriend({ params }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // deleteFriend
    async deleteFriend({ params }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};