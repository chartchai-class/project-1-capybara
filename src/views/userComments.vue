<template>
  <div class="comments-section">
    <h2>Comment List</h2>
    <ul v-if="comments.length" class="comments-list">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <img :src="comment.avatar || require('@/assets/avatar.jpg')" alt="avatar" class="avatar"/>
        <div class="comment-content">
          <div class="comment-header">
            <strong class="username">{{ comment.username }}</strong>
            <span class="time">{{ comment.time }}</span>
          </div>
          <p>{{ comment.content }}</p>
          <button class="reply-btn" @click="openReplyModal(comment)">reply</button>

          <!-- secondary comment display -->
          <ul v-if="comment.replies && comment.replies.length" class="replies-list">
            <li v-for="reply in comment.replies" :key="reply.id" class="reply-item">
              <img :src="reply.avatar || require('@/assets/avatar.jpg')" alt="avatar" class="avatar"/>
              <div class="comment-content">
                <div class="comment-header">
                  <strong class="username">{{ reply.username }}</strong>
                  <span class="time">{{ reply.time }}</span>
                </div>
                <p>{{ reply.content }}</p>
<!--                <button class="reply-btn" @click="openReplyModal(reply)">reply</button>-->
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <p v-else>No comments available at the moment</p>

    <!-- Add Comment -->
    <button class="add-comment-btn" @click="openCommentModal">Add Comment</button>

    <!-- Comment pop-up window -->
    <div v-if="showCommentModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ isReplying ? 'Reply to comments' : 'Add Comment' }}</h3>
        <textarea v-model="commentContent" placeholder="Enter your comment content" class="comment-input"></textarea>
        <div class="modal-actions">
          <button @click="submitComment" class="comment-btn">submit</button>
          <button @click="closeModal" class="cancel-btn">cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from '@/store/users'

export default {
  name: 'userComments',
  data() {
    return {
      comments: [], // Comment List
      commentContent: '', // Comment or reply content
      showCommentModal: false, // Control pop-up display
      isReplying: false, // Is it in reply mode
      currentComment: null // Current comment to reply to
    }
  },
  methods: {
    fetchComments() {
      useUsersStore().fetchComments().then((res) => {
        this.comments = res
      })
    },
    openCommentModal() {
      this.isReplying = false;
      this.commentContent = '';
      this.showCommentModal = true;
    },
    openReplyModal(comment) {
      this.isReplying = true;
      this.currentComment = comment;
      this.commentContent = '';
      this.showCommentModal = true;
    },
    submitComment() {
      if (!this.commentContent.trim()) return;

      if (this.isReplying) {
        // Add Reply
        const reply = {
          id: Date.now(),
          username: 'myUser', // The unified username is myUser
          avatar: require('@/assets/avatar.jpg'), // Use local avatar
          content: this.commentContent,
          time: new Date().toLocaleString(),
          replies: [] // Reply can continue with sub replies
        };
        if (!this.currentComment.replies) {
          this.$set(this.currentComment, 'replies', []);
        }
        this.currentComment.replies.push(reply);
      } else {
        // Add new comment
        const newComment = {
          id: Date.now(),
          username: '新用户',
          avatar: require('@/assets/avatar.jpg'),
          content: this.commentContent,
          time: new Date().toLocaleString(),
          replies: [] // Initialize empty reply
        };
        this.comments.push(newComment);
      }

      this.closeModal(); // Close the pop-up window
    },
    closeModal() {
      this.showCommentModal = false;
      this.commentContent = '';
      this.currentComment = null;
    }
  },
  mounted() {
    this.fetchComments() // Retrieve comment data during component mounting
  }
}
</script>

<style scoped>
.comments-section {
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.comment-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.username {
  margin-right: 10px;
}

.time {
  font-size: 12px;
  color: #888;
}

.reply-btn {
  background: none;
  border: none;
  color: #007BFF;
  cursor: pointer;
  padding: 5px 0;
  margin-top: 10px;
  margin-left: auto;
}

.reply-btn:hover {
  text-decoration: underline;
}

.replies-list {
  margin-top: 10px;
  padding-left: 50px;
}

.reply-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f0f0f0;
}

.add-comment-btn {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-comment-btn:hover {
  background-color: #0056b3;
}

/* 模态窗口样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.comment-input {
  width: 100%;
  height: 80px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.comment-btn {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  padding: 8px 12px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.cancel-btn:hover {
  background-color: #5a6268;
}
</style>
