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
    }
    
}