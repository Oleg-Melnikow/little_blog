import React from 'react';
import {postType} from "../../state/blogReducer";
import Button from "@material-ui/core/Button";
import {NavLink, Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {Container} from "@material-ui/core";
import s from "./PostPage.module.css"

type PostPagePropsType = {
    posts: Array<postType>,
}

type PathParamsType = {
    postId: string
}

type PropsType = RouteComponentProps<PathParamsType> & PostPagePropsType;

const PostPage = (props: PropsType) => {

    let {posts, match} = props
    let postId: number = +match.params.postId;

    let post = posts.find(p => p.id === postId);

    if(!post){
       return <Redirect to={"/"}/>
    }


    return(
         <Container>
             {post && <div className={s.post}>
                 <header>
                     <h2 className={s.title}>{post.title}</h2>
                     <div className={s.info}>
                         <span>{post.dateAdd}</span>
                         <div className={s.author}>
                             <img src={post.author.avatar} alt="avatar"/>
                             <span>{post.author.name}</span>
                         </div>
                     </div>
                 </header>
                 <div className={s.description}>
                     {post.description}
                 </div>
             </div>}
                <NavLink to="/">
                    <Button variant="outlined" size="small" color="default" className={s.button}>
                        Back to home
                    </Button>
                </NavLink>
            </Container>
    )
}

export default withRouter(PostPage);