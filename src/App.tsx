import React, {useReducer} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import {Header} from "./components/Header";
import {MainPage} from "./components/MainPage/MainPage";
import {addPost, nextPage, blogReducer, initialState} from "./state/blogReducer";
import PostPage from "./components/PostPage/PostPage";
import {FormType, NewPostPage} from "./components/NewPostPage";

function App() {

    let [state, dispatchPosts] = useReducer(blogReducer, initialState);
    let {posts, currentPage, pageSize} = state;

    const addNewPost = (post: FormType) => {
        dispatchPosts(addPost(post));
    }

    const handlerNextPage = (page: number) => {
        dispatchPosts(nextPage(page));
    }

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path="/" render={() => <MainPage posts={posts} pageSize={pageSize}
                                                              handlerNextPage={handlerNextPage}
                                                              currentPage={currentPage}/>}/>
                <Route path="/post/:postId?" render={() => <PostPage posts={posts}/>}/>
                <Route path="/add-post" render={() => <NewPostPage addNewPost={addNewPost}/>}/>
            </Switch>
        </div>
    );
}

export default App;
