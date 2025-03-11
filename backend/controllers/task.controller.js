import Task from "../models/task.model.js";


export const createTasks = async (req,res) => {
    try{
        const {title, description } = req.body;
        const createdBy = req.user._id

        if(!title) {
            res.status(400).json({message:"Title is required"});
        };


        const task = await Task.create({
            user:req.user._id,
            title,
            description,
            assignedTo: req.user._id,
            createdBy: req.user._id,
        });
        

        res.status(200).json({ message: "Task Created successfully", task});
    } catch (error) {
        console.error(`Error in createTasks: ${error.message}`, error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getAllTasks = async (req,res) => {
    try{

        const tasks = await Task.find();

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }

        res.status(200).json({ message: "getAllTasks controller working!",tasks });
    } catch (error) {
        console.error(`Error in getAllTasks: ${error.message}`, error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const updateTasks = async (req,res) => {
    try{

        const { id } = req.params;
        const { title, description, status } = req.body;

        // Find and update the task if it belongs to the logged-in user
        const task = await Task.findOneAndUpdate(
            { _id: id, assignedTo: req.user._id },
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }


        res.status(200).json({ message: "Task updated successfully" });


    } catch (error) {
        console.error(`Error in updateTasks: ${error.message}`, error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const deleteTasks = async (req,res) => {
    try{
        const { id } = req.params;

        // Find and delete the task if it belongs to the logged-in user
        const task = await Task.findOneAndDelete({
            _id: id,
            assignedTo: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task deleted successfully" });
        }

        res.status(200).json({ message: "deleteTasks controller working!" });
    } catch (error) {
        console.error(`Error in deleteTasks: ${error.message}`, error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}; 