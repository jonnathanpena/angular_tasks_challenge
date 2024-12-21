import {firestore} from "firebase-admin";
import {ITaskRepository} from "../interfaces/task-repository.interface";
import {Task} from "../models/task.model";
import {Database} from "../config/database";

/**
 * TaskRespository class
 */
export class TaskRepository implements ITaskRepository {
  private collection = "tasks";
  private db: firestore.Firestore;

  /**
   * TaskRepository constructor
   */
  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * Get all tasks by owner email
   * @param {string} email Owner email param
   * @return {Promise<Task[]>} Return all tasks by owner email
   */
  async getAll(email: string): Promise<Task[]> {
    const tasks: Task[] = [];

    await this.db
      .collection(this.collection)
      .where("owner", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            owner: doc.data().owner,
            status: doc.data().status,
            cratedAt: doc.data().cratedAt,
            updatedAt: doc.data().updatedAt,
          } as Task);
        });
      });


    return tasks;
  }

  /**
   * Create a new task
   * @param {Task} task Task to create
   * @return {Promise<Task>} Task recently created
   */
  async create(task: Task): Promise<Task> {
    const docRef =
      await this
        .db
        .collection(this.collection)
        .add({
          title: task.title,
          description: task.description,
          owner: task.owner,
          status: task.status,
          cratedAt: task.cratedAt,
          updatedAt: task.updatedAt,
        });

    task.id = docRef.id;

    return task;
  }

  /**
   * Update a task
   * @param {Task} task Task to update
   * @return {Promise<Task>} Task recently updated
   */
  async update(task: Task): Promise<Task> {
    await this.db
      .collection(this.collection)
      .doc(task.id ?? "")
      .update({
        title: task.title,
        description: task.description,
        status: task.status,
        updatedAt: task.updatedAt,
      })
      .then(() => {
        return task;
      })
      .catch((error) => {
        throw new Error(error);
      });

    return task;
  }

  /**
   * Delete a task
   * @param {string} id Task id to delete
   * @return {Promise<void>} Task recently deleted
   */
  async delete(id: string): Promise<void> {
    await this.db
      .collection(this.collection)
      .doc(id).delete();
  }
}
