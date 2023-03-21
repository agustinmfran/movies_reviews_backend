import CommentsDAO from "../dao/commentsDAO.js";

export default class CommentsController {
  static async apiPostComment(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const comment = req.body.comment;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const CommentResponse = await CommentsDAO.addComment(
        movieId,
        userInfo,
        comment,
        date
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateComment(req, res, next) {
    try {
      const commentId = req.body.comment_id;
      const comment = req.body.comment;
      const date = new Date();

      const CommentResponse = await CommentsDAO.updateComment(
        commentId,
        req.body.user_id,
        comment,
        date
      );

      var { error } = CommentResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (CommentResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeleteComment(req, res, next) {
    try {
      const commentId = req.body.comment_id;
      const userId = req.body.user_id;
      const CommentResponse = await CommentsDAO.deleteComment(
        commentId,
        userId
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
