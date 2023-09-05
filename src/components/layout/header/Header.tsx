import { FC, useContext, useState } from "react";
import vkLogo from "./vk-logo.png";
import styles from "./Header.module.css";
import { Search } from "@mui/icons-material";
import { queryProvider } from "../../providers/QueryProvider";

const Header: FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(true);

  const { query, setQuery } = useContext(queryProvider);

  return (
    <header className={styles.header}>
      <div className={styles.imgWrapper}>
        <img src={vkLogo} alt="Logo" />
      </div>
      <div className={styles.wrapper}>
        {isSearchActive && <Search />}
        <input
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClick={() => setIsSearchActive(false)}
        />
      </div>
    </header>
  );
};

export default Header;
