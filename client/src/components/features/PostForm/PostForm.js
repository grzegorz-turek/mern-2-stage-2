import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import TextField from '../../common/TextField/TextField';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Button from '../../common/Button/Button';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';


import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './PostForm.scss';

class PostForm extends React.Component {

    state = {
        post: {
            title: '',
            author: '',
            content: ''
        }
    }

    componentWillUnmount() {
        const { resetRequest } = this.props;
        resetRequest();
    }

    render() {
        const { post } = this.state;
        const { handleChange, handleEditor, addPost } = this;
        const { request } = this.props;

        if(request.error) return <Alert variant="error">{request.error}</Alert>
        else if(request.success) return <Alert variant="success">Post has been added!</Alert>
        else if(request.pending) return <Spinner />
        else return (
            <form onSubmit={addPost}>
                <TextField label='Title' value={post.title} onChange={handleChange} name='title' />
                <TextField label="Author" value={post.author} onChange={handleChange} name='author'/>
                <SectionTitle>Edit post content</SectionTitle>
                <Editor
                    className='content-editor'
                    text={post.content}
                    options={{ placeholder: false, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'] } }}
                    onChange={handleEditor}
                />
                <Button variant='primary'>Add post</Button>
            </form>
        );
    }

    handleChange = (e) => {
        const { post } = this.state;
        this.setState({ post: { ...post, [e.target.name]: e.target.value }});
    }

    handleEditor = (text) => {
        const { post } = this.state;
        this.setState({ post: { ...post, content: text }});
    }

    addPost = (e) => {
        const { addPost } = this.props;
        const { post } = this.state;
        e.preventDefault();
        addPost(post);
    }
};

PostForm.propTypes = {
    request: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
};

export default PostForm;