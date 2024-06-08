import React, { useState } from 'react';
import { Avatar, Typography, Box, Button, TextField } from '@mui/material';
import Icon from '@mui/material/Icon';
import { TextareaAutosize } from '@material-ui/core';
import VuiButton from 'components/VuiButton';
import axios from 'axios';

const Comment = ({ author, avatar, date, text, children }) => (
  <Box display="flex" mb={2} alignItems="flex-start">
    <Avatar src={avatar} alt={author} />
    <Box ml={2} flex={1}>
      <Typography variant="subtitle1">{author}</Typography>
      <Typography variant="subtitle2" color="textSecondary">{date}</Typography>
      <Typography variant="body1">{text}</Typography>
      {children}
    </Box>
    <Box>
      <Button variant="text" color="error" startIcon={<Icon>delete</Icon>}>
        DELETE
      </Button>
      <Button variant="text" color="primary" startIcon={<Icon>edit</Icon>}>
        EDIT
      </Button>
    </Box>
  </Box>
);

const Comments = ({comments, setComments, boardId}) => { 
  console.log("Comments: ", comments);
  console.log("boardId: ", boardId);

  const [comment, setComment] = useState('');
  const userId = localStorage.getItem("userId");

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const submitComment = () => {
    console.log("작성 내용 : ", comment);
    axios.post("http://127.0.0.1:8080/board/comment", {
      boardId: boardId,
      userId: userId,
      content : comment
    })
    .then(response => {
      console.log(response.data);
      
      axios.post("http://127.0.0.1:8080/board/detail", {
          boardId: boardId
      })
      .then(response => {
          setComments(response.data.result.data.comments);
      })
      .catch(error => {
          console.log("error : ", error)
      })
    })
    .catch(error => {
      console.log("Error : ", error);
    });
  }


  return (
    <Box>
      <Box mb={4} display="flex">
        <TextareaAutosize onChange={handleComment} style={{ width: "90%", padding:2, borderRadius: "5px", border: "1px solid #0e456d"}} minRows={2} placeholder="Comments..." />
        <VuiButton sx={{ml:1}} variant="gradient" color="secondary" onClick={submitComment}>Send</VuiButton>
      </Box>
    <Box height="300px" sx={{ overflowY: "auto" }}>
      {comments.map((comment, index) => (
        <Box>
          <Comment 
            author={comment.userName}
            avatar="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
            date={comment.createDate}
            text={comment.content}
          />
        </Box> 
      ))}
  </Box>
  </Box>
  );
}

export default Comments;