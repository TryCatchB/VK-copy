import { FC } from "react";
import { IUseSearchProps } from "../../../types";
import styles from "./PostInfo.module.css";

interface IPostInfoProps {
  post: IUseSearchProps;
}

const PostInfo: FC<IPostInfoProps> = ({ post }) => {
  return (
    <div>
      <div className={styles.name}>{post.name}</div>
      <div className={styles.createdAt}>{post.createdAt}</div>
    </div>
  );
};

export default PostInfo;
