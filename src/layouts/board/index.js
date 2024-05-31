import React, { useState } from 'react';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';

// Vision UI Dashboard React layouts
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import VuiInput from 'components/VuiInput';
import VuiButton from 'components/VuiButton';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setContent('');
  };

  const handleSubmit = () => {
    setPosts([...posts, { title, content }]);
    handleClose();
  };

  return (
    <VuiBox display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <VuiTypography variant="h4" gutterBottom>
        게시판
      </VuiTypography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={index}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <VuiButton variant="contained" color="primary" onClick={handleOpen}>
        새 글 작성
      </VuiButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 글 작성</DialogTitle>
        <DialogContent>
          <VuiInput
            autoFocus
            margin="dense"
            label="제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <VuiInput
            margin="dense"
            label="내용"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={handleClose}>취소</VuiButton>
          <VuiButton onClick={handleSubmit}>작성</VuiButton>
        </DialogActions>
      </Dialog>
    </VuiBox>
  );
};

export default Board;