import React from 'react';
import { Avatar, Typography, Box, Button, TextField } from '@mui/material';
import Icon from '@mui/material/Icon';
import { TextareaAutosize } from '@material-ui/core';

const Comment = ({ author, avatar, date, text, children }) => (
  <Box display="flex" mb={2} alignItems="flex-start">
    <Avatar src={avatar} alt={author} />
    <Box ml={2} flex={1}>
      <Typography variant="subtitle1">{author}</Typography>
      <Typography variant="subtitle2" color="textSecondary">{date}</Typography>
      <Typography variant="body1">{text}</Typography>
      <Button color="primary" size="small">Reply</Button>
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

const CommentExampleThreaded = () => (
  <Box>
    <Comment 
      author="Matt" 
      avatar="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
      date="Today at 5:42PM"
      text="How artistic!"
    />
    <Comment 
      author="Elliot Fu" 
      avatar="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
      date="Yesterday at 12:30AM"
      text="This has been very useful for my research. Thanks as well!"
    >
      <Box ml={8}>
        <Comment 
          author="Jenny Hess" 
          avatar="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
          date="Just now"
          text="Elliot you are always so right :)"
        />
      </Box>
    </Comment>
    <Box mt={2}>
      <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Comments..." />
      <Button variant="contained" color="primary" style={{ marginTop: 16, color: "white" }}>
        Add Reply
      </Button>
    </Box>
  </Box>
);

export default CommentExampleThreaded;