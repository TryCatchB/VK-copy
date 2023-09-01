import { FC, useState } from "react";
import vkLogo from "./vk-logo.png";
import styles from "./Header.module.css";
import { Search } from "@mui/icons-material";
import { useQuery } from "../../hooks/useQuery";

const Header: FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(true);
  const { query, setQuery } = useQuery();

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
          value={query || ""}
          onChange={(event) => setQuery(event.target.value)}
          onClick={() => setIsSearchActive(false)}
        />
      </div>
    </header>
  );
};

export default Header;
