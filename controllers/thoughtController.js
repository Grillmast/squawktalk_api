const { User, Thought} = require('../models');

module.exports = {
    // get all thoughts
   async getAllThoughts(req, res) {
       try {
        const dbThoughtData = await Thought.find({}).populate('reactions');
        res.json(dbThoughtData);
       } catch (err) {
        console.log(err)
        res.status(500).json(err)
       }
       },
    // get one thought by id
    async getThoughtById({ params }, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: params.id }).populate('reactions');
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            } else {
                res.json(dbThoughtData);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // createThought
    async createThought({ body }, res) {
        try {
            const dbThoughtData = await Thought.create(body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: dbThoughtData._id } },
                { new: true}
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
        },
    // update thought by id
    async updateThought({ params, body}, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
            );
            if (!updatedThought) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete thought
    async deleteThought({ params }, res) {  
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: params.id });
            if (!deletedThought) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }     
    },
    // add reaction
    async addReaction({ params, body}, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: params.id},
                { $push: {reactions: body } },
                { new: true, runValidators: true },
            );
            if (!updatedThought) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);       
        }
    },
    // delete reaction
    async deleteReaction({ params}, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: params.id },
                { $pull: { reactions: { reactionId: params.reactionId} } },
                { new: true, runValidators: true },
            );
            if (!updatedThought) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }   
    }
};

