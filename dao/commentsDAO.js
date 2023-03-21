import { ObjectId } from "mongodb";

let comments;

export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) {
      return;
    }
    try {
      comments = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("comments");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in commentsDAO: ${e}`
      );
    }
  }
  static async addComment(movieId, user, comment, date) {
    try {
      const commentDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        comment: comment,
        movie_id: new ObjectId(movieId),
      };
      return await comments.insertOne(commentDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
  static async updateComment(commentId, userId, comment, date) {
    try {
      const updateResponse = await comments.updateOne(
        { user_id: userId, _id: new ObjectId(commentId) },
        { $set: { comment: comment, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }
  static async deleteComment(commentId, userId) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: new ObjectId(commentId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
