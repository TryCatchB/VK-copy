import { FC, useContext, useEffect, useState } from "react";
import { IPost } from "../../../types";
import { useAuth } from "../../providers/useAuth";
import ServiceAPI from "../../services/service";
import { useSearch } from "../../hooks/useSearch";
import { queryProvider } from "../../providers/QueryProvider";
import PostsList from "./PostsList";
import Loader from "../../ui/Loader/Loader";

const Posts: FC = () => {
  const { db } = useAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const { query } = useContext(queryProvider);

  const searchedPosts = useSearch(posts, query);

  useEffect(() => {
    const dataToGet = { db, setFunction: setPosts, typeGetData: "posts" };

    const unsubscribe = ServiceAPI.getPosts(dataToGet);

    return () => unsubscribe();
  }, [db]);

  if (!posts.length) {
    return <Loader />;
  }

  return <PostsList posts={searchedPosts} />;
};

export default Posts;
