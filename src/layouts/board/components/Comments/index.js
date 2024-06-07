import React from 'react';
import { Avatar, Typography, Box, Button, TextField } from '@mui/material';
import Icon from '@mui/material/Icon';
import { TextareaAutosize } from '@material-ui/core';
import VuiButton from 'components/VuiButton';

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

const Comments = ({comments}) => { 
  console.log("Comments: ", comments);

  return (
    <Box>
      <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Comments..." />
      <VuiButton variant="gradient" color="secondary" fullWidth>Send</VuiButton>
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