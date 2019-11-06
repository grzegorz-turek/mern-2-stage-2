import React from 'react';
import { PropTypes } from 'prop-types';
import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class Posts extends React.Component {

    componentDidMount() {
        const { loadPosts } = this.props;
        loadPosts();
    }

    componentWillUnmount() {
        const { resetRequest } = this.props;
        resetRequest();
    }

    render() {
        const { posts, request } = this.props;
            if(!request.pending && request.success && posts.length > 0) {
                return (
                    <div>
                        <PostsList posts={posts} />
                    </div>
                )
            }
            if(request.pending || request.success === null) {
                return (
                    <div>
                        <Spinner />
                    </div>
                )
            }
            if(!request.pending && request.error !== null) {
                return (
                    <div>
                        <Alert variant='error'>{request.error}</Alert>
                    </div>
                )
            }
            if(!request.pending && request.success && posts.length === 0) {
                return (
                    <div>
                        <Alert variant='info'>No posts</Alert>
                    </div>
                )
            }
    }
};

Posts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired
        })
    ),
    loadPosts: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
};

export default Posts;